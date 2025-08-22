import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/stores/chatStore';
import { useMCPStore } from '@/stores/mcpStore';
import { THEME, BRAND } from '@/utils/constants';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  isConnected?: boolean;
  variant?: 'dashboard' | 'chat';
}

export default function Logo({ size = 'medium', isConnected = false, variant = 'chat' }: LogoProps) {
  const router = useRouter();
  const { clearForNavigation: clearChatStore } = useChatStore();
  const { clearForNavigation: clearMCPStore } = useMCPStore();
  
  const sizeMap = {
    small: { fontSize: '16px', fontWeight: 600, dotSize: '4px', barHeight: '16px', gap: 0.3, subtitleSize: '8px' },
    medium: { fontSize: '20px', fontWeight: 600, dotSize: '5px', barHeight: '20px', gap: 0.35, subtitleSize: '12px' },
    large: { fontSize: '24px', fontWeight: 600, dotSize: '6px', barHeight: '24px', gap: 0.4, subtitleSize: '12px' },
  };

  const { fontSize, fontWeight, dotSize, barHeight, gap, subtitleSize } = sizeMap[size];
  
  const shouldShowGreen = variant === 'dashboard' ? true : isConnected;

  const handleLogoClick = () => {
    clearChatStore();
    clearMCPStore();
    router.push('/dashboard');
  };

  return (
    <Box
      onClick={handleLogoClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        cursor: 'pointer',
        padding: '12px 16px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.8) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
        '&:hover': {
          opacity: 0.9,
          transform: 'scale(1.02)',
          boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1), 0 3px 12px rgba(0, 0, 0, 0.06)',
        },
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: gap,
          ml: -3.5,
        }}
      >
        <Typography
          sx={{
            fontSize,
            fontWeight,
            color: '#000000',
            fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
            lineHeight: 1.2,
          }}
        >
          Deloitte
        </Typography>
        
        <Box
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: shouldShowGreen ? '#86BC24' : '#FF6B6B',
            flexShrink: 0,
            alignSelf: 'flex-end',
            mb: 0.7,
            ml: -0.3,
            boxShadow: '0 2px 8px rgba(134, 188, 36, 0.3)',
          }}
        />
        
        <Box
          sx={{
            width: '1.5px',
            height: barHeight,
            backgroundColor: '#E0E0E0',
            flexShrink: 0,
          }}
        />
        
        <Typography
          sx={{
            fontSize,
            fontWeight,
            color: '#2C3E50',
            fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
            lineHeight: 1.2,
          }}
        >
          MCP Agent
        </Typography>
      </Box>
      
      <Typography
        sx={{
          fontSize: subtitleSize,
          fontWeight: 400,
          color: '#5A6C7D',
          fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
          lineHeight: 1.4,
          alignSelf: 'flex-start',
        }}
      >
        Connect to MCP servers and manage your tools
      </Typography>
    </Box>
  );
} 