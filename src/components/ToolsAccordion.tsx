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
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Build as BuildIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { ToolSummary } from '@/types';
import { THEME, BRAND } from '@/utils/constants';

interface ToolsAccordionProps {
  tools: Record<string, ToolSummary[]>;
}

export default function ToolsAccordion({ tools }: ToolsAccordionProps) {
  const [expandedServer, setExpandedServer] = useState<string | null>(null);

  const handleServerToggle = (server: string) => {
    setExpandedServer(expandedServer === server ? null : server);
  };

  const serverNames = Object.keys(tools);

  if (serverNames.length === 0) {
    return (
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
    );
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 1 }}>
      {serverNames.map((serverName) => {
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
              borderRadius: 1,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'rgba(33, 150, 243, 0.05)',
                borderRadius: '4px 4px 0 0',
                '&.Mui-expanded': {
                  minHeight: 48,
                },
                px: 2,
                py: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <BuildIcon sx={{ color: BRAND.primary, fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
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
                    fontWeight: 600,
                  }}
                />
              </Box>
            </AccordionSummary>
            
            <AccordionDetails sx={{ p: 0 }}>
              <List dense sx={{ p: 0 }}>
                {serverTools.map((tool, index) => (
                  <React.Fragment key={`${serverName}-${index}`}>
                    <ListItem
                      sx={{
                        py: 1.5,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <InfoIcon sx={{ color: BRAND.primary, fontSize: 16 }} />
                        </Box>
                      </ListItemIcon>
                      
                      <ListItemText
                        primary={
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 600, 
                              color: 'text.primary',
                              mb: 0.5,
                              fontSize: '0.9rem',
                            }}
                          >
                            {tool.tool_name}
                          </Typography>
                        }
                        secondary={
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ 
                              lineHeight: 1.4,
                              fontSize: '0.8rem',
                            }}
                          >
                            {tool.description}
                          </Typography>
                        }
                        sx={{ mr: 1 }}
                      />
                    </ListItem>
                    {index < serverTools.length - 1 && (
                      <Divider sx={{ mx: 2, opacity: 0.2 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
} 