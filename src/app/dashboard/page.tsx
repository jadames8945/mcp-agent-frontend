'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMCPStore } from '@/stores/mcpStore';
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';
import { Header, DashboardHeader, MCPInfoTooltip, SearchBar, ConfigurationsSection } from '@/components';
import ConfigCreationModal from '@/components/ConfigCreationModal';
import { configAPI } from '@/api';
import { MultiMCPConfig, Transport } from '@/types/mcpConfig';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [configs, setConfigs] = useState<MultiMCPConfig[]>([]);
  const [isLoadingConfigs, setIsLoadingConfigs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<MultiMCPConfig | null>(null);
  
  const { error, setError, clearError } = useMCPStore();
  const { user, logout, isHydrated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isHydrated) {
      if (!user) {
        router.push('/login');
        return;
      }
      setIsAuthenticated(true);
      loadConfigs();
    }
  }, [user, router, isHydrated]);

  useEffect(() => {
    return () => {
      useChatStore.getState().closeWebSocket();
    };
  }, []);

  const loadConfigs = async () => {
    if (!user) return;
    
    setIsLoadingConfigs(true);
    
    try {
      const userConfigs = await configAPI.getConfigs(user.id);
      
      if (userConfigs.length === 0) {
        const defaultConfig: MultiMCPConfig = {
          user_id: user.id,
          name: 'Default Configuration',
          description: 'Default MCP server configuration',
          connections: [
            {
              name: 'default',
              connected: true,
              url: 'http://default-mcp-server:9000/sse',
              transport: Transport.SSE,
              description: 'Default MCP server connection',
            }
          ]
        };
        
        const createdConfig = await configAPI.createConfig(defaultConfig);
        setConfigs([createdConfig]);
      } else {
        setConfigs(userConfigs);
      }
    } catch (error) {
      console.error('Failed to load configs:', error);
      setError('Failed to load configurations');
    } finally {
      setIsLoadingConfigs(false);
    }
  };

  const handleConfigSelect = async (config: MultiMCPConfig) => {
    try {
      useChatStore.getState().closeWebSocket();
      router.push(`/chat?config=${config.id}`);
    } catch (error) {
      console.error('Failed to navigate to chat:', error);
    }
  };

  const handleCreateConfig = async (configData: Partial<MultiMCPConfig>) => {
    if (!user) return;
    
    try {
      const configWithUser = {
        ...configData,
        user_id: user.id,
        connections: configData.connections || []
      };
      
      if (editingConfig) {
        await configAPI.updateConfig(editingConfig.id!, configWithUser);
      } else {
        await configAPI.createConfig(configWithUser as MultiMCPConfig);
      }
      
      setIsConfigModalOpen(false);
      setEditingConfig(null);
      loadConfigs();
    } catch (error) {
      console.error('Failed to save config:', error);
      setError('Failed to save configuration');
    }
  };

  const handleDeleteConfig = async (configId: string) => {
    try {
      await configAPI.deleteConfig(configId);
      loadConfigs();
    } catch (error) {
      console.error('Failed to delete config:', error);
      setError('Failed to delete configuration');
    }
  };

  const handleEditConfig = (config: MultiMCPConfig) => {
    setEditingConfig(config);
    setIsConfigModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      useChatStore.getState().closeWebSocket();
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      router.push('/login');
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <span>Checking authentication...</span>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <span>Loading user...</span>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Header
        user={user}
        isConnected={false}
        onLogout={handleLogout}
        onToggleSidePanel={() => {}}
      />

      <Container maxWidth="xl" sx={{ flex: 1, py: 6 }}>
        <DashboardHeader username={user.username} />
        
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%, transparent 100%)',
            }
          }}
        >
          <Box sx={{ p: 6 }}>
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
            />
            
            <ConfigurationsSection
              configs={configs}
              searchTerm={searchTerm}
              isLoading={isLoadingConfigs}
              onCreateConfig={() => setIsConfigModalOpen(true)}
              onSelectConfig={handleConfigSelect}
              onDeleteConfig={handleDeleteConfig}
              onEditConfig={handleEditConfig}
            />
          </Box>
        </Paper>
      </Container>

      <ConfigCreationModal
        open={isConfigModalOpen}
        onClose={() => {
          setIsConfigModalOpen(false);
          setEditingConfig(null);
        }}
        onSubmit={handleCreateConfig}
        editingConfig={editingConfig}
      />
    </Box>
  );
} 