import { create } from 'zustand';
import { Message, WebSocketMessage } from '@/types';

interface ChatState {
  messages: Message[];
  isConnected: boolean;
  error: string | null;
  isLoading: boolean;
  websocket: WebSocket | null;
  sessionId: string | null;
  conversationId: string | null;
  
  addMessage: (message: Message) => void;
  updateMessage: (conversationId: string, updates: Partial<Message>) => void;
  setConnected: (connected: boolean) => void;
  setSessionId: (sessionId: string | null) => void;
  setConversationId: (conversationId: string | null) => void;
  setError: (error: string | null) => void;
  setWebSocketMessage: (message: WebSocketMessage) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
  clearError: () => void;
  clearForNewChat: () => void;
  clearForLogout: () => void;
  clearForNavigation: () => void;
  setWebSocket: (ws: WebSocket | null) => void;
  closeWebSocket: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isConnected: false,
  error: null,
  isLoading: false,
  websocket: null,
  sessionId: null,
  conversationId: null,

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  updateMessage: (conversationId: string, updates: Partial<Message>) => {
    set((state) => ({
      messages: state.messages.map(msg =>
        msg.conversationId === conversationId ? { ...msg, ...updates } : msg
      ),
    }));
  },

  setConnected: (connected: boolean) => {
    set({ isConnected: connected });
  },

  setSessionId: (sessionId: string | null) => {
    set({ sessionId });
  },

  setConversationId: (conversationId: string | null) => {
    set({ conversationId });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setWebSocketMessage: (message: WebSocketMessage) => {
    const { conversationId, updateMessage, setLoading, setConversationId } = get();

    if (message.progress === 'started') {
    } else if (message.progress === 'streaming' && message.chunk) {
      if (conversationId) {
        const currentMessage = get().messages.find(msg => msg.conversationId === conversationId);
        const newContent = message.chunk;
        updateMessage(conversationId, {
          content: newContent,
          status: 'progress',
          spinner: true
        });
      }
    } else if (message.progress === 'progress_update') {
      if (conversationId) {
        const progressMessage = message.chunk || "Progress update";
        updateMessage(conversationId, {
          content: progressMessage,
          status: 'progress',
          spinner: true
        });
      }
    } else if (message.progress === 'complete') {
      if (conversationId) {
        updateMessage(conversationId, {
          status: 'complete',
          spinner: false
        });
        setLoading(false);
        setConversationId(null);
      }
    } else if (message.error) {
      if (conversationId) {
        updateMessage(conversationId, {
          content: message.error,
          status: 'complete',
          spinner: false
        });
        setLoading(false);
        setConversationId(null);
      }
      set({ error: message.error });
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  clearError: () => {
    set({ error: null });
  },

  clearForNewChat: () => {
    set({
      messages: [],
      error: null,
      isLoading: false,
      conversationId: null,
    });
  },

  clearForLogout: () => {
    const { websocket } = get();
    if (websocket) {
      websocket.close();
    }
    set({
      messages: [],
      isConnected: false,
      error: null,
      isLoading: false,
      websocket: null,
      sessionId: null,
      conversationId: null,
    });
  },

  clearForNavigation: () => {
    const { websocket } = get();
    if (websocket) {
      websocket.close();
    }
    set({
      messages: [],
      isConnected: false,
      error: null,
      isLoading: false,
      websocket: null,
      sessionId: null,
      conversationId: null,
    });
  },

  setWebSocket: (ws: WebSocket | null) => {
    set({ websocket: ws });
  },

  closeWebSocket: () => {
    const { websocket } = get();
    if (websocket) {
      websocket.close();
      set({ websocket: null, isConnected: false });
    }
  },
}));
