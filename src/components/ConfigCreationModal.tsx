import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { MultiMCPConfig, Connection, Transport } from '@/types/mcpConfig';
import { THEME, BRAND } from '@/utils/constants';

interface ConfigCreationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (config: MultiMCPConfig) => void;
  editingConfig?: MultiMCPConfig | null;
}

export default function ConfigCreationModal({ open, onClose, onSubmit, editingConfig }: ConfigCreationModalProps) {
  const [config, setConfig] = useState<MultiMCPConfig>({
    name: '',
    description: '',
    connections: [],
  });

  const [newConnection, setNewConnection] = useState({
    name: '',
    description: '',
    url: '',
    transport: Transport.SSE as Transport.SSE | Transport.STREAMABLE_HTTP,
  });

  useEffect(() => {
    if (editingConfig) {
      setConfig({
        ...editingConfig,
        connections: editingConfig.connections || [],
      });
    } else {
      setConfig({
        name: '',
        description: '',
        connections: [],
      });
    }
  }, [editingConfig]);

  const handleAddConnection = () => {
    if (newConnection.name && newConnection.url) {
      const connection: Connection = {
        name: newConnection.name,
        description: newConnection.description,
        connected: false,
        transport: newConnection.transport,
        url: newConnection.url,
      };

      setConfig(prev => ({
        ...prev,
        connections: [...prev.connections, connection],
      }));

      setNewConnection({
        name: '',
        description: '',
        url: '',
        transport: Transport.SSE,
      });
    }
  };

  const handleRemoveConnection = (index: number) => {
    setConfig(prev => ({
      ...prev,
      connections: prev.connections.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (config.name && config.name.trim() && config.connections.length > 0) {
      const submitConfig = editingConfig ? { ...editingConfig, ...config } : config;
      onSubmit(submitConfig);
      handleClose();
    }
  };

  const handleClose = () => {
    setConfig({
      name: '',
      description: '',
      connections: [],
    });
    setNewConnection({
      name: '',
      description: '',
      url: '',
      transport: Transport.SSE,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundColor: THEME.colors.white,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: THEME.colors.primary, fontWeight: 600 }}>
            {editingConfig ? 'Edit MCP Configuration' : 'Create New MCP Configuration'}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: THEME.colors.secondary,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 0 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Configuration Name"
            value={config.name}
            onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
            required
          />
          
          <TextField
            fullWidth
            label="Description (Optional)"
            value={config.description}
            onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
            multiline
            rows={2}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2, color: THEME.colors.primary }}>
          MCP Server Connections
        </Typography>

        {/* Existing Connections */}
        {config.connections.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 2, color: THEME.colors.secondary }}>
              {config.connections.length} connection{config.connections.length !== 1 ? 's' : ''} configured
            </Typography>
            {config.connections.map((connection, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  border: `1px solid ${THEME.colors.border}`,
                  borderRadius: 1,
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {connection.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: THEME.colors.secondary }}>
                    {connection.url}
                  </Typography>
                  {connection.description && (
                    <Typography variant="caption" sx={{ color: THEME.colors.secondary }}>
                      {connection.description}
                    </Typography>
                  )}
                </Box>
                <Chip
                  label={connection.transport}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveConnection(index)}
                  sx={{ color: THEME.colors.error }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* Add New Connection */}
        <Box sx={{ p: 2, border: `1px dashed ${THEME.colors.border}`, borderRadius: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: THEME.colors.primary }}>
            Add New Connection
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Connection Name"
              value={newConnection.name}
              onChange={(e) => setNewConnection(prev => ({ ...prev, name: e.target.value }))}
              size="small"
              sx={{ flex: 1 }}
              required
            />
            <TextField
              select
              label="Transport"
              value={newConnection.transport}
              onChange={(e) => setNewConnection(prev => ({ ...prev, transport: e.target.value as Transport.SSE | Transport.STREAMABLE_HTTP }))}
              size="small"
              sx={{ minWidth: 120 }}
              SelectProps={{
                native: true,
              }}
            >
              <option value={Transport.SSE}>SSE</option>
              <option value={Transport.STREAMABLE_HTTP}>HTTP</option>
            </TextField>
          </Box>
          
          <TextField
            fullWidth
            label="Server URL"
            value={newConnection.url}
            onChange={(e) => setNewConnection(prev => ({ ...prev, url: e.target.value }))}
            size="small"
            sx={{ mb: 2 }}
            placeholder="e.g., http://localhost:9000/sse"
            required
          />
          
          <TextField
            fullWidth
            label="Description (Optional)"
            value={newConnection.description}
            onChange={(e) => setNewConnection(prev => ({ ...prev, description: e.target.value }))}
            size="small"
            multiline
            rows={1}
          />
          
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddConnection}
            disabled={!newConnection.name || !newConnection.url}
            sx={{
              mt: 2,
              borderColor: BRAND.primary,
              color: BRAND.primary,
              '&:hover': {
                borderColor: BRAND.primaryDark,
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Add Connection
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} sx={{ color: THEME.colors.secondary }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!config.name || !config.name.trim() || config.connections.length === 0}
          sx={{
            backgroundColor: BRAND.primary,
            color: 'white',
            '&:hover': {
              backgroundColor: BRAND.primaryDark,
            },
            '&:disabled': {
              backgroundColor: THEME.colors.border,
              color: THEME.colors.secondary,
            },
          }}
        >
          {editingConfig ? 'Save Changes' : 'Create Configuration'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 