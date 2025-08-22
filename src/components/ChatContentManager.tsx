import React from 'react';
import { Box } from '@mui/material';
import WelcomeContainer from './WelcomeContainer';
import ChatContainer from './ChatContainer';
import { Message } from '@/types';

interface ChatContentManagerProps {
  messages: Message[];
  userName: string;
  onSuggestionClick: (suggestion: string) => void;
  streamingContent?: string;
  streamingAgent?: string;
  isLoading: boolean;
}

const ChatContentManager: React.FC<ChatContentManagerProps> = ({
  messages,
  userName,
  onSuggestionClick,
  streamingContent,
  streamingAgent,
  isLoading,
}) => {
  // Show welcome container when no messages, chat container when messages exist
  if (messages.length === 0) {
    return (
      <WelcomeContainer
        userName={userName}
        onSuggestionClick={onSuggestionClick}
      />
    );
  }

  return (
    <ChatContainer
      messages={messages}
      streamingContent={streamingContent}
      streamingAgent={streamingAgent}
      isLoading={isLoading}
    />
  );
};

export default ChatContentManager; 