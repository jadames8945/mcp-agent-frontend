import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Chat as ChatIcon,
  History as HistoryIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { THEME, BRAND } from '@/utils/constants';
import { useMCPStore } from '@/stores/mcpStore';

interface SidePanelProps {
  onStartNewChat: () => void;
  onLogout: () => void;
  sessionId: string | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function SidePanel({
  onStartNewChat,
  onLogout,
  sessionId,
  isCollapsed = false,
  onToggleCollapse,
}: SidePanelProps) {
  const { messages, chatHistories, currentChatId, setCurrentChatId } = useMCPStore();
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);

  const handleStartNewChat = () => {
    onStartNewChat();
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const chatHistoryTitles = chatHistories.map(chat => chat.title);

  return (
    <Paper
      elevation={3}
      sx={{
        width: isCollapsed ? 60 : THEME.dimensions.sidebarWidth,
        height: '100%',
        backgroundColor: THEME.colors.white,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${THEME.colors.border}`,
        transition: 'width 0.3s ease',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: isCollapsed ? 1 : 2,
        }}
      >


        {!isCollapsed ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                minHeight: 48,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: BRAND.primary }}>
                Chat History
              </Typography>
              
              <IconButton
                onClick={onToggleCollapse}
                size="small"
                sx={{
                  color: BRAND.primary,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  },
                }}
              >
                <img src="/sidebar.svg" alt="Collapse sidebar" style={{ width: '20px', height: '20px' }} />
              </IconButton>
            </Box>

            <Box
              onClick={onStartNewChat}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                p: 2,
                mt: 2,
                borderRadius: 1,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  border: '2px solid #666',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AddIcon sx={{ color: '#666', fontSize: 14 }} />
              </Box>
              <Typography
                sx={{ color: '#333', fontWeight: 500, fontSize: '0.875rem' }}
              >
                Start new chat
              </Typography>
            </Box>

            <Divider sx={{ mx: 2, my: 1, borderColor: '#e0e0e0', borderWidth: '1px' }} />

            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                p: 1,
                cursor: 'pointer'
              }}
              onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
            >
              <Typography sx={{ color: '#333', fontWeight: 600, fontSize: '0.875rem' }}>
                Recent Conversations
              </Typography>
              {isHistoryCollapsed ? (
                <ExpandLessIcon sx={{ color: '#666', fontSize: 20 }} />
              ) : (
                <ExpandMoreIcon sx={{ color: '#666', fontSize: 20 }} />
              )}
            </Box>

            {!isHistoryCollapsed && (
              <>
                {chatHistoryTitles.length === 0 ? (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography sx={{ color: '#999', fontSize: '0.875rem' }}>
                      No history
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ flex: 1, overflow: 'auto' }}>
                    {chatHistoryTitles.map((title, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 1,
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: '#f5f5f5' },
                          borderRadius: 1,
                        }}
                      >
                        <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                          {title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                p: 2,
                mt: 1,
                borderRadius: 1,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
              onClick={onToggleCollapse}
            >
              <img src="/sidebar_reverse.svg" alt="Expand sidebar" style={{ width: '24px', height: '24px' }} />
            </Box>

            <Divider sx={{ mx: 1, my: 1, borderColor: '#e0e0e0', borderWidth: '1px' }} />
            
            <Box
              onClick={onStartNewChat}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                p: 2,
                mt: 1,
                borderRadius: 1,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  border: '2px solid #666',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AddIcon sx={{ color: '#666', fontSize: 14 }} />
              </Box>
            </Box>
          </>
        )}

        {!isCollapsed && sessionId && (
          <Box sx={{ p: 3, mt: 'auto', display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                backgroundColor: THEME.colors.primary,
                color: 'white',
                padding: '8px 16px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: 500,
                textAlign: 'center',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Session ID: {sessionId}
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
} 