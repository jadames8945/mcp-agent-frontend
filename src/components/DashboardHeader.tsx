import React from 'react';
import { Box, Typography } from '@mui/material';
import MCPInfoTooltip from './MCPInfoTooltip';

interface DashboardHeaderProps {
  username: string;
}

export default function DashboardHeader({ username }: DashboardHeaderProps) {
  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.9) 100%)',
      borderRadius: '24px',
      p: 6,
      mb: 6,
      color: '#2C3E50',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03)',
      backdropFilter: 'blur(10px)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%)',
      }
    }}>
      <Box sx={{ 
        position: 'absolute', 
        top: -50, 
        right: -50, 
        width: 200, 
        height: 200, 
        background: 'rgba(0, 0, 0, 0.04)', 
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -30, 
        left: -30, 
        width: 150, 
        height: 150, 
        background: 'rgba(0, 0, 0, 0.03)', 
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />
      
      <Box sx={{ 
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 80,
        height: 80,
        background: 'rgba(0, 0, 0, 0.025)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        animation: 'float 10s ease-in-out infinite'
      }} />
      
      <Box sx={{ 
        position: 'absolute',
        bottom: '15%',
        right: '25%',
        width: 60,
        height: 60,
        background: 'rgba(0, 0, 0, 0.03)',
        borderRadius: '50%',
        filter: 'blur(15px)',
        animation: 'float 7s ease-in-out infinite reverse'
      }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              position: 'relative',
              zIndex: 1,
              textShadow: '0 2px 4px rgba(44, 62, 80, 0.1)'
            }}
          >
            MCP Server Dashboard
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 0, 
              opacity: 0.9,
              fontWeight: 400,
              maxWidth: '600px',
              position: 'relative',
              zIndex: 1
            }}
          >
            Welcome back, <strong>{username}</strong>! 🚀
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1, 
              opacity: 0.8,
              fontSize: '1.1rem',
              position: 'relative',
              zIndex: 1
            }}
          >
            Select a configuration to start chatting with your MCP tools and unlock powerful AI capabilities.
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          flexShrink: 0,
          position: 'relative',
          zIndex: 1
        }}>
          <MCPInfoTooltip />
        </Box>
      </Box>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
} 