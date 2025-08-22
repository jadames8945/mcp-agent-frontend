import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { MultiMCPConfig, Connection } from '@/types/mcpConfig';
import { THEME, BRAND } from '@/utils/constants';

interface ConfigCardProps {
  config: MultiMCPConfig;
  onSelect: (config: MultiMCPConfig) => void;
  onDelete: (configId: string) => void;
  onEdit: (config: MultiMCPConfig) => void;
}

export default function ConfigCard({ config, onSelect, onDelete, onEdit }: ConfigCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    if (config.id) {
      onDelete(config.id);
    }
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(config);
  };

  const getConnectionStatusColor = (connected: boolean) => {
    return connected ? 'success' : 'error';
  };

  const getConnectionStatusIcon = (connected: boolean) => {
    return connected ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />;
  };

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: 'none',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
          '& .card-glow': {
            opacity: 1,
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #000000 0%, #333333 100%)',
          borderRadius: '20px 20px 0 0',
        },
      }}
      onClick={() => onSelect(config)}
    >
      <Box 
        className="card-glow"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 0, 0, 0.03) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />
      
      <CardContent sx={{ p: 4, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: THEME.colors.primary, 
                fontWeight: 700,
                mb: 1,
                fontSize: '1.25rem',
                lineHeight: 1.3
              }}
            >
              {config.name || 'Unnamed Config'}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: THEME.colors.secondary, 
                lineHeight: 1.6,
                opacity: 0.8,
                fontSize: '0.95rem'
              }}
            >
              {config.description || 'No description available'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<ChatIcon sx={{ fontSize: '1.1rem' }} />}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(config);
              }}
              sx={{
                background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                color: 'white',
                textTransform: 'none',
                px: 2.5,
                py: 1,
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #333333 0%, #666666 100%)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Chat
            </Button>
            
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{ 
                color: THEME.colors.secondary,
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: THEME.colors.primary,
                },
                transition: 'all 0.2s ease',
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mb: 2,
            p: 1.5,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '10px',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: THEME.colors.secondary, 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.75rem'
              }}
            >
              Servers ({config.connections?.length || 0})
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {config.connections?.map((conn: Connection, idx: number) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: conn.connected 
                    ? 'rgba(76, 175, 80, 0.08)' 
                    : 'rgba(244, 67, 54, 0.08)',
                  border: `1px solid ${conn.connected 
                    ? 'rgba(76, 175, 80, 0.2)' 
                    : 'rgba(244, 67, 54, 0.2)'}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: conn.connected 
                      ? 'rgba(76, 175, 80, 0.12)' 
                      : 'rgba(244, 67, 54, 0.12)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: conn.connected 
                    ? 'rgba(76, 175, 80, 0.15)' 
                    : 'rgba(244, 67, 54, 0.15)',
                }}>
                  {getConnectionStatusIcon(conn.connected)}
                </Box>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: conn.connected ? 'success.main' : 'error.main',
                    fontWeight: 600,
                    flex: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  {conn.name}
                </Typography>
                
                <Chip
                  label={conn.transport}
                  size="small"
                  variant="outlined"
                  color={getConnectionStatusColor(conn.connected)}
                  sx={{ 
                    fontSize: '0.7rem', 
                    height: '24px',
                    fontWeight: 600,
                    borderWidth: '1.5px',
                    '& .MuiChip-label': {
                      px: 1,
                    }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Config</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Config</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
} 