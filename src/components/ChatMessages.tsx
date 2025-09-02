import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Message } from '@/types';
import { useChatStore } from '@/stores/chatStore';
import MessageManager from './MessageManager';

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const { isLoading } = useChatStore();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      p: 4,
      width: '100%',
      maxWidth: '800px',
      mx: 'auto'
    }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: 3 }}>
        <MessageManager
          messages={messages}
          
          
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
} 