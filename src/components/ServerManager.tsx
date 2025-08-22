import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { Connection, Transport } from '@/types/mcpConfig';
import { THEME, BRAND } from '@/utils/constants';

interface ServerManagerProps {
  connections: Connection[];
  onConnectionsChange: (connections: Connection[]) => void;
}

export default function ServerManager({ connections, onConnectionsChange }: ServerManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null);
  const [newConnection, setNewConnection] = useState<Partial<Connection>>({
    name: '',
    description: '',
    transport: Transport.SSE,
    url: '',
    connected: true,
  });

  const handleAddServer = () => {
    if (newConnection.name && newConnection.url) {
      const connection: Connection = {
        name: newConnection.name,
        description: newConnection.description || '',
        transport: newConnection.transport || Transport.SSE,
        url: newConnection.url,
        connected: newConnection.connected || false,
      };
      
      onConnectionsChange([...connections, connection]);
      setNewConnection({
        name: '',
        description: '',
        transport: Transport.SSE,
        url: '',
        connected: true,
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditServer = () => {
    if (editingConnection && newConnection.name && newConnection.url) {
      const updatedConnections = connections.map(conn =>
        conn.name === editingConnection.name
          ? {
              ...conn,
              name: newConnection.name!,
              description: newConnection.description || '',
              transport: newConnection.transport || Transport.SSE,
              url: newConnection.url!,
              connected: newConnection.connected || false,
            }
          : conn
      );
      
      onConnectionsChange(updatedConnections);
      setEditingConnection(null);
      setNewConnection({
        name: '',
        description: '',
        transport: Transport.SSE,
        url: '',
        connected: true,
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteServer = (connectionName: string) => {
    const updatedConnections = connections.filter(conn => conn.name !== connectionName);
    onConnectionsChange(updatedConnections);
  };

  const handleToggleConnection = (connectionName: string) => {
    const updatedConnections = connections.map(conn =>
      conn.name === connectionName
        ? { ...conn, connected: !conn.connected }
        : conn
    );
    onConnectionsChange(updatedConnections);
  };

  const openEditDialog = (connection: Connection) => {
    setEditingConnection(connection);
    setNewConnection({
      name: connection.name,
      description: connection.description,
      transport: connection.transport,
      url: connection.url,
      connected: connection.connected,
    });
    setIsEditDialogOpen(true);
  };

  const getConnectionStatusColor = (connected: boolean) => {
    return connected ? 'success' : 'error';
  };

  const getConnectionStatusIcon = (connected: boolean) => {
    return connected ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />;
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        borderBottom: `1px solid ${THEME.colors.border}`,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        flexShrink: 0,
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: BRAND.primary,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <BuildIcon />
          Server Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {connections.length} server{connections.length !== 1 ? 's' : ''} configured
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 1, minHeight: 0 }}>
        {connections.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              textAlign: 'center',
              p: 3,
            }}
          >
            <BuildIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No servers configured
            </Typography>
            <Typography variant="body2">
              Add your first MCP server to get started
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {connections.map((connection, index) => (
              <ListItem
                key={connection.name}
                sx={{
                  borderBottom: `1px solid ${THEME.colors.border}`,
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                  backgroundColor: connection.connected ? 'rgba(76, 175, 80, 0.05)' : 'rgba(244, 67, 54, 0.05)',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getConnectionStatusIcon(connection.connected)}
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {connection.name}
                        </Typography>
                        <Chip
                          label={connection.transport}
                          size="small"
                          variant="outlined"
                          color={getConnectionStatusColor(connection.connected)}
                          sx={{ fontSize: '0.7rem', height: '20px' }}
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Switch
                          checked={connection.connected}
                          onChange={() => handleToggleConnection(connection.name)}
                          color="success"
                          size="small"
                        />
                        <IconButton
                          size="small"
                          onClick={() => openEditDialog(connection)}
                          sx={{ color: 'primary.main' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteServer(connection.name)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {connection.description || 'No description'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                        {connection.url}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${THEME.colors.border}`, flexShrink: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setIsAddDialogOpen(true)}
          sx={{
            borderColor: BRAND.primary,
            color: BRAND.primary,
            '&:hover': {
              borderColor: BRAND.primaryDark,
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Add Server
        </Button>
      </Box>

      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Server</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Server Name"
              value={newConnection.name}
              onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newConnection.description}
              onChange={(e) => setNewConnection({ ...newConnection, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="URL"
              value={newConnection.url}
              onChange={(e) => setNewConnection({ ...newConnection, url: e.target.value })}
              fullWidth
              required
              placeholder="http://localhost:9000/sse"
            />
            <FormControl fullWidth>
              <InputLabel>Transport</InputLabel>
              <Select
                value={newConnection.transport}
                onChange={(e) => setNewConnection({ ...newConnection, transport: e.target.value as Transport.SSE | Transport.STREAMABLE_HTTP })}
                label="Transport"
              >
                <MenuItem value={Transport.SSE}>SSE</MenuItem>
                <MenuItem value={Transport.STREAMABLE_HTTP}>Streamable HTTP</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddServer} variant="contained" disabled={!newConnection.name || !newConnection.url}>
            Add Server
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Server</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Server Name"
              value={newConnection.name}
              onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newConnection.description}
              onChange={(e) => setNewConnection({ ...newConnection, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="URL"
              value={newConnection.url}
              onChange={(e) => setNewConnection({ ...newConnection, url: e.target.value })}
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Transport</InputLabel>
              <Select
                value={newConnection.transport}
                onChange={(e) => setNewConnection({ ...newConnection, transport: e.target.value as Transport.SSE | Transport.STREAMABLE_HTTP })}
                label="Transport"
              >
                <MenuItem value={Transport.SSE}>SSE</MenuItem>
                <MenuItem value={Transport.STREAMABLE_HTTP}>Streamable HTTP</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditServer} variant="contained" disabled={!newConnection.name || !newConnection.url}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 