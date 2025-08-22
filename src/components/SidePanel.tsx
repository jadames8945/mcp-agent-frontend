import React from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Chat as ChatIcon,
  History as HistoryIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
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
  isCollapsed,
  onToggleCollapse,
}: SidePanelProps) {
  const { chatHistories, currentChatId, setCurrentChatId } = useMCPStore();

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
  };

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            minHeight: 48,
          }}
        >
          {!isCollapsed && (
            <Typography variant="h6" sx={{ fontWeight: 600, color: BRAND.primary }}>
              Chat History
            </Typography>
          )}
          
          <IconButton
            onClick={onToggleCollapse}
            size="small"
            sx={{
              color: BRAND.primary,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        {!isCollapsed && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onStartNewChat}
            sx={{
              mb: 2,
              backgroundColor: BRAND.primary,
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: BRAND.primaryDark,
              },
            }}
          >
            New Chat
          </Button>
        )}

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          {!isCollapsed && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Recent Chats
            </Typography>
          )}
          
          <List sx={{ p: 0 }}>
            {chatHistories.map((chat) => (
              <ListItem
                key={chat.id}
                button
                selected={currentChatId === chat.id}
                onClick={() => handleChatSelect(chat.id)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.15)',
                    },
                  },
                }}
              >
                {isCollapsed ? (
                  <ChatIcon sx={{ color: BRAND.primary }} />
                ) : (
                  <>
                    <ChatIcon sx={{ color: BRAND.primary, mr: 1, fontSize: 20 }} />
                    <ListItemText
                      primary={chat.title}
                      secondary={new Date(chat.timestamp).toLocaleDateString()}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: currentChatId === chat.id ? 600 : 400,
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                      }}
                    />
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        {!isCollapsed && sessionId && (
          <Box
            sx={{
              p: 1,
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Session ID
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
              {sessionId.substring(0, 8)}...
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
} 