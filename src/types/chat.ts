export interface Message {
  id: string;
  conversationId: string;
  type: "user" | "assistant" | "progress";
  content: string;
  timestamp: Date;
  progressStep?: number;
  totalSteps?: number;
  toolName?: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

export interface ChatState {
  messages: Message[];
  currentChatId: string | null;
  chatHistories: ChatHistoryItem[];
  isLoading: boolean;
  error: string | null;
} 