import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, TextField, IconButton } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { THEME, ACTION_CARDS } from '@/utils/constants';

interface WelcomeContainerProps {
  userName: string;
  messages: any[];
  onSuggestionClick: (suggestion: string) => void;
  onSendMessage: (message: string) => Promise<void>;
}

const WelcomeContainer: React.FC<WelcomeContainerProps> = ({ 
  userName, 
  messages, 
  onSuggestionClick,
  onSendMessage
}) => {
  const [inputValue, setInputValue] = useState('');

  if (messages.length > 0) {
    return null;
  }

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
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      p: 4,
      maxWidth: '800px',
      mx: 'auto'
    }}>
      <Box sx={{ 
        textAlign: 'center',
        mb: 6,
        mt: 2
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: THEME.colors.primary,
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Hi {userName}! 👋
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: THEME.colors.secondary,
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          How can I help you today? Choose a suggestion below or type your message.
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Grid container spacing={3} justifyContent="center">
          {ACTION_CARDS.map((card, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card 
                sx={{ 
                  height: '140px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E8E8',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: THEME.colors.primary,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={() => onSuggestionClick(card.action)}
              >
                <CardContent sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                      fontSize: '2rem',
                      lineHeight: 1
                    }}>
                      {card.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: THEME.colors.primary,
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '1.1rem'
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: THEME.colors.secondary,
                          lineHeight: 1.4,
                          fontSize: '0.9rem'
                        }}
                      >
                        {card.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ 
        mt: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '20px',
        border: '1px solid #E8E8E8',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
      }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TextField
            multiline
            maxRows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            variant="standard"
            fullWidth
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            pt: 2,
            borderTop: '1px solid #F0F0F0'
          }}
        >
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
    </Box>
  );
};

export default WelcomeContainer; 