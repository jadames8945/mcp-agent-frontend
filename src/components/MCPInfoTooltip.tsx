import React, { useState } from 'react';
import { Box, Typography, Tooltip, Paper } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

export default function MCPInfoTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  const tooltipContent = (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        maxWidth: '400px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#000000' }}>
        What is MCP?
      </Typography>
      <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#666666' }}>
        Model Context Protocol (MCP) enables AI models to interact with external data sources and tools through a standardized interface, making AI more powerful and contextually aware.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.6, color: '#666666' }}>
        This app creates a unified conversational interface for connecting to multiple MCP servers, discovering available tools, and invoking them seamlessly using natural language.
      </Typography>
    </Paper>
  );

  return (
    <Tooltip
      title={tooltipContent}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      placement="bottom-start"
      arrow
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': {
            backgroundColor: 'transparent',
            padding: 0,
            maxWidth: 'none',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 2,
          borderRadius: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            borderColor: 'rgba(0, 0, 0, 0.25)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <InfoIcon sx={{ fontSize: '1.2rem', color: '#2C3E50' }} />
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#2C3E50' }}>
          What is MCP?
        </Typography>
      </Box>
    </Tooltip>
  );
} 