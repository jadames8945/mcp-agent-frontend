export interface Message {
  id: string;
  conversationId: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "generating" | "starting" | "progress" | "complete";
  spinner?: boolean;
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
