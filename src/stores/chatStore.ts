import { create } from 'zustand';
import { Message, WebSocketMessage } from '@/types';

interface ChatState {
  messages: Message[];
  isConnected: boolean;
  error: string | null;
  isLoading: boolean;
  streamingContent: string;
  streamingAgent: string;
  websocket: WebSocket | null;
  sessionId: string | null;
  
  addMessage: (message: Message) => void;
  setConnected: (connected: boolean) => void;
  setSessionId: (sessionId: string | null) => void;
  setError: (error: string | null) => void;
  setWebSocketMessage: (message: WebSocketMessage) => void;
  setLoading: (loading: boolean) => void;
  setStreamingState: (content: string, agent: string) => void;
  clearMessages: () => void;
  clearError: () => void;
  clearStore: () => void;
  clearForNewChat: () => void;
  clearForLogout: () => void;
  setWebSocket: (ws: WebSocket | null) => void;
  closeWebSocket: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isConnected: false,
  error: null,
  isLoading: false,
  streamingContent: '',
  streamingAgent: '',
  websocket: null,
  sessionId: null,

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setConnected: (connected: boolean) => {
    set({ isConnected: connected });
  },

  setSessionId: (sessionId: string | null) => {
    set({ sessionId });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setWebSocketMessage: (message: WebSocketMessage) => {
    const {
      streamingContent,
      streamingAgent,
      addMessage,
      setLoading,
    } = get();

    console.log('WebSocket message received:', message);

    if (message.progress === 'started') {
      set({
        streamingContent: '',
        streamingAgent: message.agent_name || '',
        isLoading: true,
      });
    } else if (message.progress === 'streaming' && message.chunk) {
      set({
        streamingContent: streamingContent + message.chunk,
        streamingAgent: message.agent_name || '',
        isLoading: true,
      });
    } else if (message.progress === 'complete') {
      const content = streamingContent;
      const agentName = message.agent_name || '';

      addMessage({
        id: Date.now().toString(),
        type: 'assistant',
        content: content,
        timestamp: new Date(),
      });

      set({ 
        streamingContent: '', 
        streamingAgent: '', 
        isLoading: false 
      });
    } else if (message.error) {
      set({ error: message.error, isLoading: false });
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setStreamingState: (content: string, agent: string) => {
    set({ streamingContent: content, streamingAgent: agent });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  clearError: () => {
    set({ error: null });
  },

  clearStore: () => {
    set({
      messages: [],
      isConnected: false,
      error: null,
      isLoading: false,
      streamingContent: '',
      streamingAgent: '',
      websocket: null,
      sessionId: null,
    });
  },

  clearForNewChat: () => {
    set({
      messages: [],
      error: null,
      isLoading: false,
      streamingContent: '',
      streamingAgent: '',
      sessionId: null,
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
      streamingContent: '',
      streamingAgent: '',
      websocket: null,
      sessionId: null,
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