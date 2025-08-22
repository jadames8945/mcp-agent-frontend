import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Build as BuildIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { ToolSummary, Connection } from '@/types';
import { THEME, BRAND } from '@/utils/constants';
import ServerManager from './ServerManager';
import ToolsAccordion from './ToolsAccordion';

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
  const [activeTab, setActiveTab] = useState(0);

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
          <ToolsAccordion tools={tools} />
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