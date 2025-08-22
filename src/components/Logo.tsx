import React from 'react';
import { Box, Typography } from '@mui/material';
import { THEME, BRAND } from '@/utils/constants';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  isConnected?: boolean;
  variant?: 'dashboard' | 'chat';
}

export default function Logo({ size = 'medium', isConnected = false, variant = 'chat' }: LogoProps) {
  const sizeMap = {
    small: { fontSize: '16px', fontWeight: 600, dotSize: '4px', barHeight: '16px', gap: 0.3, subtitleSize: '8px' },
    medium: { fontSize: '20px', fontWeight: 600, dotSize: '5px', barHeight: '20px', gap: 0.35, subtitleSize: '12px' },
    large: { fontSize: '24px', fontWeight: 600, dotSize: '6px', barHeight: '24px', gap: 0.4, subtitleSize: '12px' },
  };

  const { fontSize, fontWeight, dotSize, barHeight, gap, subtitleSize } = sizeMap[size];
  
  const shouldShowGreen = variant === 'dashboard' ? true : isConnected;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
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
            backgroundColor: shouldShowGreen ? '#86BC24' : '#FF0000',
            flexShrink: 0,
            alignSelf: 'flex-end',
            mb: 0.7,
            ml: -0.3
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
            color: '#000000',
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
          color: '#666666',
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