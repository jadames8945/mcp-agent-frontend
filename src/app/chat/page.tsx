"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Paper } from '@mui/material';
import { useAuthStore } from '@/stores/authStore';
import { useMCPStore } from '@/stores/mcpStore';
import { useChatStore } from '@/stores/chatStore';
import useWebSocket from '@/hooks/useWebSocket';
import { mcpAPI, configAPI } from '@/api';
import { THEME } from '@/utils/constants';
import Header from '@/components/Header';
import SidePanel from '@/components/SidePanel';
import WelcomeContainer from '@/components/WelcomeContainer';
import ChatContainer from '@/components/ChatContainer';
import MCPToolsContainer from '@/components/MCPToolsContainer';

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const configId = searchParams.get('config');
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { 
    tools, 
    setTools, 
    error: mcpError, 
    setError: setMCPError, 
    clearError: clearMCPError,
  } = useMCPStore();
  
  const {
    messages,
    addMessage,
    error: chatError,
    setError: setChatError,
    clearError: clearChatError,
    streamingContent,
    streamingAgent,
    isLoading,
    setLoading,
    setConnected,
    setWebSocketMessage,
  } = useChatStore();
  
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [isSidePanelCollapsed, setIsSidePanelCollapsed] = useState(false);

  const { connect, disconnect, sendMessage: wsSendMessage, isConnected } = useWebSocket(
    (message: any) => {
      console.log('🔔 WebSocket message received in chat page:', message);
      setWebSocketMessage(message);
    }
  );

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected, setConnected]);

  useEffect(() => {
    if (configId && user) {
      loadConfig();
    }
  }, [configId, user]);



  useEffect(() => {
    if (selectedConfig && user) {
      const token = localStorage.getItem('mcp_token');
      console.log('🔌 Attempting to connect WebSocket...');
      console.log('🔑 Token:', token ? 'Present' : 'Missing');
      console.log('⚙️ Config:', selectedConfig);
      console.log('👤 User:', user);
      
      if (token) {
        try {
          connect(token, selectedConfig);
          console.log('✅ WebSocket connect() called');
          fetchTools();
        } catch (error) {
          console.error('❌ Failed to connect WebSocket:', error);
          setChatError('Failed to connect to chat service');
        }
      } else {
        console.error('❌ No token found in localStorage');
        setChatError('Authentication token not found');
      }
    }
    
    return () => {
      disconnect();
      useChatStore.getState().closeWebSocket();
    };
  }, [selectedConfig, user]);

  const loadConfig = async () => {
    try {
      const config = await configAPI.getConfig(user!.id, configId!);
      setSelectedConfig(config);
    } catch (error) {
      console.error('Failed to load config:', error);
      setChatError('Failed to load configuration');
    }
  };

  const fetchTools = async () => {
    if (!selectedConfig || !user) return;
    
    try {
      const token = localStorage.getItem('mcp_token');
      if (!token) return;
      
      const toolsData = await mcpAPI.getToolSummaries({
        session_id: token,
        mcp_config: selectedConfig,
      });
      
      setTools(toolsData);
    } catch (error) {
      console.error('Failed to fetch tools:', error);
      setMCPError('Failed to fetch available tools');
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedConfig || !isConnected) {
      setChatError('Please wait for connection to be established');
      return;
    }
    
    console.log('📤 Sending message:', message);
    console.log('📋 Selected config:', selectedConfig);
    console.log('🔌 WebSocket connected:', isConnected);
    
    setLoading(true);
    
    addMessage({
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      type: 'user',
    });
    
    try {
      wsSendMessage(message, selectedConfig);
      console.log('✅ Message sent via WebSocket');
    } catch (error) {
      console.error('❌ Failed to send message via WebSocket:', error);
      setChatError('Failed to send message');
      setLoading(false);
    }
  };

  const handleStartNewChat = () => {
    useChatStore.getState().clearForNewChat();
    useChatStore.getState().closeWebSocket();
    clearMCPError();
  };

  const toggleSidePanel = () => {
    setIsSidePanelCollapsed(!isSidePanelCollapsed);
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

  useEffect(() => {
    return () => {
      useChatStore.getState().closeWebSocket();
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <span>Checking authentication...</span>
      </Box>
    );
  }

  if (!selectedConfig) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <span>Loading configuration...</span>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', backgroundColor: THEME.colors.background, display: 'flex', flexDirection: 'column' }}>
      {user && (
        <Header
          user={user}
          isConnected={isConnected}
          onLogout={handleLogout}
          onToggleSidePanel={toggleSidePanel}
        />
      )}
      
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        gap: 3, 
        px: 0, 
        pb: 4,
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <SidePanel
          onStartNewChat={handleStartNewChat}
          onLogout={handleLogout}
          sessionId={localStorage.getItem('mcp_token') || ''}
          isCollapsed={isSidePanelCollapsed}
          onToggleCollapse={toggleSidePanel}
        />
        
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            border: '1px solid #e0e0e0',
            position: 'relative',
            minHeight: 0,
            minWidth: { xs: '400px', sm: '500px' },
          }}
        >
          {messages.length === 0 ? (
            <WelcomeContainer
              userName={user?.username || 'User'}
              messages={messages}
              onSuggestionClick={(suggestion: string) => {
                if (isConnected) {
                  handleSendMessage(suggestion);
                }
              }}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <ChatContainer
              messages={messages}
              onSendMessage={handleSendMessage}
              isConnected={isConnected}
              userName={user?.username}
            />
          )}
        </Paper>
        
        <Paper
          elevation={3}
          sx={{
            width: '350px',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            border: '1px solid #e0e0e0',
            position: 'relative',
            minHeight: 0,
            flexShrink: 0,
          }}
        >
          <MCPToolsContainer
            tools={tools}
            connections={selectedConfig?.connections || []}
            onToolSelect={(tool: any) => {
              handleSendMessage(`Use the ${tool.name} tool`);
            }}
            onConnectionsChange={(connections) => {
              if (selectedConfig) {
                const updatedConfig = { ...selectedConfig, connections };
                setSelectedConfig(updatedConfig);
              }
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
} 