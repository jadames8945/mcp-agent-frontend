import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { Message } from '@/types';
import { THEME, BRAND, ACTION_CARDS } from '@/utils/constants';
import { useChatStore } from '@/stores/chatStore';
import MessageManager from './MessageManager';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
  isConnected: boolean;
  userName?: string;
}

export default function ChatContainer({ messages, onSendMessage, isConnected, userName }: ChatContainerProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const { streamingContent, streamingAgent, isLoading } = useChatStore();

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;
    
    setIsSending(true);
    try {
      await onSendMessage(inputValue.trim());
      setInputValue('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
      }}
    >
      <MessageManager
        messages={messages}
        streamingContent={streamingContent}
        streamingAgent={streamingAgent}
        isLoading={isLoading}
      />

      <Box
        sx={{
          padding: 3,
          backgroundColor: 'white',
          borderTop: '1px solid #e0e0e0',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected || isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: THEME.colors.primary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: THEME.colors.primary,
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!inputValue.trim() || !isConnected || isLoading}
            sx={{
              borderRadius: '24px',
              minWidth: '48px',
              height: '56px',
              backgroundColor: THEME.colors.primary,
              '&:hover': {
                backgroundColor: THEME.colors.primary,
                opacity: 0.9,
              },
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
} 