import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Build as BuildIcon,
  Info as InfoIcon,
  PlayArrow as PlayIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { ToolSummary, Connection } from '@/types';
import { THEME, BRAND } from '@/utils/constants';
import ServerManager from './ServerManager';

interface MCPToolsContainerProps {
  tools: Record<string, ToolSummary[]>;
  connections: Connection[];
  onToolSelect: (tool: ToolSummary) => void;
  onConnectionsChange: (connections: Connection[]) => void;
}

export default function MCPToolsContainer({ 
  tools, 
  connections, 
  onToolSelect, 
  onConnectionsChange 
}: MCPToolsContainerProps) {
  const [expandedServer, setExpandedServer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleServerToggle = (server: string) => {
    setExpandedServer(expandedServer === server ? null : server);
  };

  const serverNames = Object.keys(tools);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
          Available Tools
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {serverNames.length} server{serverNames.length !== 1 ? 's' : ''} connected
        </Typography>
      </Box>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        sx={{ 
          borderBottom: `1px solid ${THEME.colors.border}`,
          flexShrink: 0,
        }}
      >
        <Tab 
          label="Tools" 
          icon={<BuildIcon />} 
          iconPosition="start"
          sx={{ minHeight: '48px' }}
        />
        <Tab 
          label="Servers" 
          icon={<SettingsIcon />} 
          iconPosition="start"
          sx={{ minHeight: '48px' }}
        />
      </Tabs>

      <Box sx={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {activeTab === 0 && (
          <Box sx={{ height: '100%', overflow: 'auto', p: 1 }}>
            {serverNames.length === 0 ? (
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
                  No tools available
                </Typography>
                <Typography variant="body2">
                  Connect to an MCP server to see available tools
                </Typography>
              </Box>
            ) : (
              serverNames.map((serverName) => {
                const serverTools = tools[serverName];
                
                return (
                  <Accordion
                    key={serverName}
                    expanded={expandedServer === serverName}
                    onChange={() => handleServerToggle(serverName)}
                    sx={{
                      mb: 1,
                      '&:before': {
                        display: 'none',
                      },
                      '&.Mui-expanded': {
                        margin: '8px 0',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        backgroundColor: 'rgba(33, 150, 243, 0.05)',
                        borderRadius: 1,
                        '&.Mui-expanded': {
                          minHeight: 48,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BuildIcon sx={{ color: BRAND.primary, fontSize: 20 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {serverName}
                        </Typography>
                        <Chip
                          label={serverTools.length}
                          size="small"
                          sx={{
                            backgroundColor: BRAND.primary,
                            color: 'white',
                            fontSize: '0.75rem',
                            height: 20,
                          }}
                        />
                      </Box>
                    </AccordionSummary>
                    
                    <AccordionDetails sx={{ p: 0 }}>
                      <List dense sx={{ p: 0 }}>
                        {serverTools.map((tool, index) => (
                          <ListItem
                            key={`${serverName}-${index}`}
                            sx={{
                              borderBottom: `1px solid ${THEME.colors.border}`,
                              '&:last-child': {
                                borderBottom: 'none',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <InfoIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                            </ListItemIcon>
                            
                            <ListItemText
                              primary={
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {tool.name}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary">
                                  {tool.description}
                                </Typography>
                              }
                              sx={{ mr: 1 }}
                            />
                            
                            <Tooltip title="Use this tool">
                              <IconButton
                                size="small"
                                onClick={() => onToolSelect(tool)}
                                sx={{
                                  color: BRAND.primary,
                                  '&:hover': {
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                  },
                                }}
                              >
                                <PlayIcon />
                              </IconButton>
                            </Tooltip>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <ServerManager 
            connections={connections}
            onConnectionsChange={onConnectionsChange}
          />
        )}
      </Box>
    </Box>
  );
} 