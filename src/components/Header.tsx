import React, { useState } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { User } from '@/types/ui';
import { THEME, BRAND } from '@/utils/constants';
import Logo from './Logo';

interface HeaderProps {
  user: User;
  isConnected: boolean;
  onLogout: () => void;
  onToggleSidePanel: () => void;
}

export default function Header({ user, isConnected, onLogout, onToggleSidePanel }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        height: THEME.dimensions.headerHeight,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
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
        border: 'none',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%, transparent 100%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 2, position: 'relative', zIndex: 1 }}>
        <Box>
          <Logo size="large" variant={isConnected ? 'chat' : 'dashboard'} isConnected={isConnected} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          textAlign: 'right', 
          mr: 1,
          display: { xs: 'none', sm: 'block' }
        }}>
          <Typography variant="body2" sx={{ color: '#333333', fontWeight: 500, fontSize: '0.9rem' }}>
            {user.username}
          </Typography>
          <Typography variant="caption" sx={{ 
            color: isConnected ? '#4caf50' : '#f44336',
            fontWeight: 500,
            fontSize: '0.75rem'
          }}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Typography>
        </Box>
        
        <IconButton
          onClick={handleProfileClick}
          sx={{
            background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
            color: '#ffffff',
            width: '40px',
            height: '40px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              background: 'linear-gradient(135deg, #333333 0%, #666666 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            transition: 'all 0.2s ease',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <PersonIcon sx={{ fontSize: '20px' }} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 8,
          sx: {
            mt: 1,
            minWidth: '200px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            '& .MuiMenuItem-root': {
              py: 1.5,
              px: 2,
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountIcon fontSize="small" sx={{ color: '#666666' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Account" 
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
          />
        </MenuItem>
        
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" sx={{ color: '#666666' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Settings" 
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
          />
        </MenuItem>
        
        <Divider sx={{ my: 1, mx: 2 }} />
        
        <MenuItem onClick={handleLogout} sx={{ color: '#f44336' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: '#f44336' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
          />
        </MenuItem>
      </Menu>
    </Paper>
  );
} 