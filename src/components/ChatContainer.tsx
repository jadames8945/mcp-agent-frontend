import React from 'react';
import { Box } from '@mui/material';
import { Message } from '@/types';
import { useChatStore } from '@/stores/chatStore';
import MessageManager from './MessageManager';

interface ChatContainerProps {
  messages: Message[];
}

export default function ChatContainer({ messages }: ChatContainerProps) {
  const { streamingContent, streamingAgent, isLoading } = useChatStore();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        p: 4,
      }}
    >
      <MessageManager
        messages={messages}
        streamingContent={streamingContent}
        streamingAgent={streamingAgent}
        isLoading={isLoading}
      />
    </Box>
  );
} 