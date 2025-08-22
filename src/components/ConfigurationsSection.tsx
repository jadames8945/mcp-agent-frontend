import React from 'react';
import { Box, Typography, Button, Paper, Grid, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { MultiMCPConfig } from '@/types/mcpConfig';
import ConfigCard from './ConfigCard';
import { THEME } from '@/utils/constants';

interface ConfigurationsSectionProps {
  configs: MultiMCPConfig[];
  searchTerm: string;
  isLoading: boolean;
  onCreateConfig: () => void;
  onSelectConfig: (config: MultiMCPConfig) => void;
  onDeleteConfig: (configId: string) => void;
  onEditConfig: (config: MultiMCPConfig) => void;
}

export default function ConfigurationsSection({
  configs,
  searchTerm,
  isLoading,
  onCreateConfig,
  onSelectConfig,
  onDeleteConfig,
  onEditConfig
}: ConfigurationsSectionProps) {
  const filteredConfigs = configs.filter(config => 
    config.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 5,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              color: THEME.colors.primary,
              fontWeight: 700,
              mb: 1
            }}
          >
            Saved Configurations
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: THEME.colors.secondary,
              opacity: 0.8
            }}
          >
            Manage your MCP server connections and configurations
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateConfig}
          sx={{
            background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: '16px',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #333333 0%, #666666 100%)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Create New Config
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          py: 12 
        }}>
          <CircularProgress 
            size={80} 
            sx={{ 
              color: THEME.colors.primary,
              mb: 3
            }} 
          />
          <Typography variant="h6" sx={{ color: THEME.colors.secondary }}>
            Loading your configurations...
          </Typography>
        </Box>
      ) : filteredConfigs.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            border: '2px dashed rgba(0, 0, 0, 0.15)',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: 200, 
            height: 200, 
            background: 'rgba(0, 0, 0, 0.02)', 
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} />
          
          <Typography variant="h4" sx={{ mb: 3, color: THEME.colors.primary, fontWeight: 600 }}>
            🎯 No configurations yet
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: THEME.colors.secondary, opacity: 0.8 }}>
            Create your first MCP configuration to get started
          </Typography>
          <Typography variant="body1" sx={{ color: THEME.colors.secondary, opacity: 0.7, mb: 4 }}>
            Connect to MCP servers and unlock powerful AI tools for your workflow
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateConfig}
            sx={{
              background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
              color: 'white',
              px: 4,
              py: 2,
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #333333 0%, #666666 100%)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Create Your First Config
          </Button>
        </Paper>
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ 
            position: 'absolute',
            top: -20,
            left: -20,
            right: -20,
            bottom: -20,
            background: 'radial-gradient(circle at 30% 20%, rgba(0, 0, 0, 0.02) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: -1,
          }} />
          <Grid container spacing={4}>
            {filteredConfigs.map((config, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <ConfigCard
                  config={config}
                  onSelect={onSelectConfig}
                  onDelete={onDeleteConfig}
                  onEdit={onEditConfig}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
} 