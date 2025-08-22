import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { ACTION_CARDS, THEME, BRAND } from '@/utils/constants';

interface SuggestionsContainerProps {
  welcomeInput: string;
  onWelcomeInputChange: (value: string) => void;
  onWelcomeSend: () => void;
  onWelcomeKeyPress: (event: React.KeyboardEvent) => void;
  onActionCardClick: (title: string) => void;
}

export default function SuggestionsContainer({
  welcomeInput,
  onWelcomeInputChange,
  onWelcomeSend,
  onWelcomeKeyPress,
  onActionCardClick,
}: SuggestionsContainerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 3,
      }}
    >
      {/* Welcome Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: BRAND.primary,
            mb: 2,
          }}
        >
          Welcome to MCP Agent! 🤖
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            mb: 3,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          I'm here to help you interact with MCP servers and tools. What would you like to do today?
        </Typography>

        {/* Welcome Input */}
        <Box sx={{ maxWidth: '500px', mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Type your message here..."
            value={welcomeInput}
            onChange={(e) => onWelcomeInputChange(e.target.value)}
            onKeyPress={onWelcomeKeyPress}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={onWelcomeSend}
                  disabled={!welcomeInput.trim()}
                  sx={{
                    minWidth: 'auto',
                    p: 1,
                    color: BRAND.primary,
                    '&:disabled': {
                      color: 'text.disabled',
                    },
                  }}
                >
                  <SendIcon />
                </Button>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: THEME.colors.border,
                },
                '&:hover fieldset': {
                  borderColor: BRAND.primary,
                },
                '&.Mui-focused fieldset': {
                  borderColor: BRAND.primary,
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Action Cards */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Quick Actions
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {ACTION_CARDS.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => onActionCardClick(card.title)}
                  sx={{
                    height: '100%',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      mb: 2,
                      fontSize: '3rem',
                    }}
                  >
                    {card.icon}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 1,
                    }}
                  >
                    {card.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.5,
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
} 