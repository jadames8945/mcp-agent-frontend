import React from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { User } from '@/types';
import { THEME, BRAND } from '@/utils/constants';
import Logo from './Logo';

interface HeaderProps {
  user: User;
  isConnected: boolean;
  onLogout: () => void;
  onToggleSidePanel: () => void;
}

export default function Header({ user, isConnected, onLogout, onToggleSidePanel }: HeaderProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: '100%',
        height: THEME.dimensions.headerHeight,
        backgroundColor: THEME.colors.white,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, sm: 3, md: 4 },
        pl: { xs: 0, sm: 0, md: 0 },
        mb: 3,
        position: 'relative',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
        <Box>
          <Logo size="large" variant={isConnected ? 'chat' : 'dashboard'} isConnected={isConnected} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ textAlign: 'right', mr: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {user.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isConnected ? 'Connected' : 'Disconnected'}
          </Typography>
        </Box>
        
        <IconButton
          sx={{
            backgroundColor: BRAND.primary,
            color: 'white',
            width: '40px',
            height: '40px',
            '&:hover': {
              backgroundColor: BRAND.primaryDark,
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
            },
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)',
          }}
          onClick={onLogout}
        >
          <LogoutIcon sx={{ fontSize: '20px' }} />
        </IconButton>
      </Box>
    </Paper>
  );
} 