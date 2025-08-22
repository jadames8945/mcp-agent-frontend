import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { THEME } from '@/utils/constants';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isConnected: boolean;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isConnected, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    try {
      await onSendMessage(inputValue.trim());
      setInputValue('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ 
      mt: 'auto',
      mb: 3,
      backgroundColor: '#FFFFFF',
      borderRadius: '24px',
      padding: '20px',
      border: '1px solid #E8E8E8',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      flexShrink: 0,
      width: '100%',
      maxWidth: '800px',
      mx: 'auto'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <TextField
          multiline
          maxRows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          variant="standard"
          fullWidth
          disabled={!isConnected || isLoading}
          sx={{
            '& .MuiInput-root': {
              '&:before': { display: 'none' },
              '&:after': { display: 'none' },
              '& input': {
                color: '#000000',
                fontSize: '16px',
                padding: '12px 0',
              },
              '& textarea': {
                color: '#000000',
                fontSize: '16px',
                padding: '12px 0',
                resize: 'none',
              },
            },
            '& .MuiInputBase-root': {
              padding: 0,
            },
          }}
        />

        {inputValue.trim() && (
          <IconButton
            onClick={handleSend}
            disabled={isLoading}
            sx={{
              backgroundColor: THEME.colors.primary,
              color: 'white',
              width: '48px',
              height: '48px',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: THEME.colors.primaryDark,
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            <SendIcon sx={{ fontSize: '20px' }} />
          </IconButton>
        )}
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 2,
        pt: 2,
        borderTop: '1px solid #F0F0F0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: '#999',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            💡
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: '#999',
            fontSize: '12px',
          }}
        >
          Press Enter to send, Shift+Enter for new line
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatInput; 