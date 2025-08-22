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
        transition: 'all 0.2s ease',
        border: '1px solid #E8E8E8',
        borderRadius: '12px',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          borderColor: THEME.colors.primary,
        },
      }}
      onClick={() => onSelect(config)}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: THEME.colors.primary, flex: 1, fontWeight: 600 }}>
            {config.name || 'Unnamed Config'}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<ChatIcon />}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(config);
              }}
              sx={{
                backgroundColor: BRAND.primary,
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: BRAND.primaryDark,
                },
              }}
            >
              Chat
            </Button>
            
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{ color: THEME.colors.secondary }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ color: THEME.colors.secondary, mb: 3, lineHeight: 1.5 }}>
          {config.description || 'No description available'}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ color: THEME.colors.secondary, mb: 1, display: 'block' }}>
            Servers ({config.connections?.length || 0})
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {config.connections?.map((conn: Connection, idx: number) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  borderRadius: '6px',
                  backgroundColor: conn.connected ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  border: `1px solid ${conn.connected ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                }}
              >
                {getConnectionStatusIcon(conn.connected)}
                <Typography
                  variant="body2"
                  sx={{
                    color: conn.connected ? 'success.main' : 'error.main',
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  {conn.name}
                </Typography>
                <Chip
                  label={conn.transport}
                  size="small"
                  variant="outlined"
                  color={getConnectionStatusColor(conn.connected)}
                  sx={{ fontSize: '0.7rem', height: '20px' }}
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