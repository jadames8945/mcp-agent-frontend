import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { THEME, ACTION_CARDS } from '@/utils/constants';

interface WelcomeContainerProps {
  userName: string;
  onSuggestionClick: (suggestion: string) => void;
}

const WelcomeContainer: React.FC<WelcomeContainerProps> = ({ 
  userName, 
  onSuggestionClick
}) => {
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
              >
                <CardActionArea
                  onClick={() => onSuggestionClick(card.action)}
                  sx={{ height: '100%', p: 0 }}
                >
                  <CardContent sx={{ 
                    p: 3, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ 
                        fontSize: '2rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {card.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: '#333',
                          fontSize: '1.1rem'
                        }}
                      >
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666',
                        lineHeight: 1.4,
                        fontSize: '0.9rem'
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WelcomeContainer; 