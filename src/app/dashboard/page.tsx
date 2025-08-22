'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  IconButton,
  Paper,
  Container,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useMCPStore } from '@/stores/mcpStore';
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';
import { Header } from '@/components';
import ConfigCreationModal from '@/components/ConfigCreationModal';
import { THEME, BRAND } from '@/utils/constants';
import { configAPI } from '@/api';
import { MultiMCPConfig, Transport } from '@/types/mcpConfig';
import ConfigCard from '@/components/ConfigCard';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [configs, setConfigs] = useState<MultiMCPConfig[]>([]);
  const [isLoadingConfigs, setIsLoadingConfigs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<MultiMCPConfig | null>(null);
  
  const {
    error,
    setError,
    clearError,
  } = useMCPStore();

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
    console.log('Loading configs for user:', user.id);
    
    try {
      const userConfigs = await configAPI.getConfigs(user.id);
      console.log('Configs loaded successfully:', userConfigs);
      
      if (userConfigs.length === 0) {
        console.log('No configs found, creating default config...');
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
        
        console.log('Creating default config via API:', defaultConfig);
        
        try {
          const createdConfig = await configAPI.createConfig(defaultConfig);
          console.log('Default config created successfully:', createdConfig);
          setConfigs([createdConfig]);
        } catch (createError) {
          console.error('Failed to create default config:', createError);
          setError('Failed to create default configuration');
          setConfigs([]);
        }
      } else {
        setConfigs(userConfigs);
      }
    } catch (error) {
      console.error('Failed to load configs:', error);
      if (error instanceof Error) {
        setError(`Failed to load configurations: ${error.message}`);
      } else {
        setError('Failed to load configurations');
      }
    } finally {
      setIsLoadingConfigs(false);
    }
  };

  const handleConfigSelect = (config: MultiMCPConfig) => {
    useChatStore.getState().closeWebSocket();
    router.push(`/chat?config=${config.id}`);
  };

  const handleCreateConfig = async (newConfig: MultiMCPConfig) => {
    if (!user) return;
    
    try {
      if (editingConfig && editingConfig.id) {
        await configAPI.updateConfig(editingConfig.id, {
          ...newConfig,
          user_id: user.id,
        });
      } else {
        await configAPI.createConfig({
          ...newConfig,
          user_id: user.id,
        });
      }
      
      await loadConfigs();
      
      if (!editingConfig) {
        router.push(`/chat?config=${newConfig.id}`);
      }
    } catch (error) {
      console.error('Failed to save config:', error);
      setError('Failed to save configuration');
    }
  };

  const handleDeleteConfig = async (configId: string) => {
    try {
      await configAPI.deleteConfig(configId);
      await loadConfigs();
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>Checking authentication...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: THEME.colors.background,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {user && (
        <Header
          user={user}
          isConnected={false}
          onLogout={handleLogout}
          onToggleSidePanel={() => {}}
        />
      )}

      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        <Typography variant="h3" sx={{ mb: 3, color: THEME.colors.primary }}>
          MCP Server Dashboard
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: THEME.colors.secondary, maxWidth: '600px' }}>
          Welcome back, {user?.username}! Select a configuration to start chatting with your MCP tools.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ color: THEME.colors.primary }}>
            Saved Configurations
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsConfigModalOpen(true)}
            sx={{
              backgroundColor: BRAND.primary,
              color: 'white',
              '&:hover': {
                backgroundColor: BRAND.primaryDark,
              },
            }}
          >
            Create New Config
          </Button>
        </Box>

        <TextField
          fullWidth
          placeholder="Search configurations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {isLoadingConfigs ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : configs.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: THEME.colors.white,
              border: `1px solid ${THEME.colors.border}`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: THEME.colors.secondary }}>
              No configurations found
            </Typography>
            <Typography variant="body2" sx={{ color: THEME.colors.secondary }}>
              Create your first MCP configuration to get started
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {configs
              .filter(config => 
                config.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                config.description?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((config, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ConfigCard
                    config={config}
                    onSelect={handleConfigSelect}
                    onDelete={handleDeleteConfig}
                    onEdit={handleEditConfig}
                  />
                </Grid>
              ))}
          </Grid>
        )}
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

      {error && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={clearError}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1001,
            maxWidth: '400px',
          }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
} 