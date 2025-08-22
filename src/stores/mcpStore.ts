import { create } from "zustand";
import { Message, MultiMCPConfig, ToolSummary, WebSocketMessage } from "@/types";

interface MCPState {
  messages: Message[];
  chatHistories: { id: string; title: string; timestamp: Date }[];
  currentChatId: string | null;
  showChatInterface: boolean;
  
  isConnected: boolean;
  sessionId: string | null;
  
  configs: MultiMCPConfig[];
  selectedConfig: MultiMCPConfig | null;
  
  tools: Record<string, ToolSummary[]>;
  
  isLoading: boolean;
  error: string | null;
  streamingContent: string;
  streamingAgent: string;
  
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setChatHistories: (histories: { id: string; title: string; timestamp: Date }[]) => void;
  setCurrentChatId: (id: string | null) => void;
  setShowChatInterface: (show: boolean) => void;
  
  setConnected: (connected: boolean) => void;
  setSessionId: (id: string | null) => void;
  
  setConfigs: (configs: MultiMCPConfig[]) => void;
  setSelectedConfig: (config: MultiMCPConfig | null) => void;
  
  setTools: (tools: Record<string, ToolSummary[]>) => void;
  
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setWebSocketMessage: (message: WebSocketMessage) => void;
  setStreamingState: (content: string, agent: string) => void;
  
  clearMessages: () => void;
  clearError: () => void;
  clearForNewChat: () => void;
  clearForLogout: () => void;
  clearForNavigation: () => void;
}

export const useMCPStore = create<MCPState>((set, get) => ({
  messages: [],
  chatHistories: [],
  currentChatId: null,
  showChatInterface: false,
  
  isConnected: false,
  sessionId: null,
  
  configs: [],
  selectedConfig: null,
  
  tools: {},
  
  isLoading: false,
  error: null,
  streamingContent: "",
  streamingAgent: "",
  
  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
  
  setMessages: (messages: Message[]) => {
    set({ messages });
  },
  
  setChatHistories: (histories) => {
    set({ chatHistories: histories });
  },
  
  setCurrentChatId: (id) => {
    set({ currentChatId: id });
  },
  
  setShowChatInterface: (show) => {
    set({ showChatInterface: show });
  },
  
  setConnected: (connected) => {
    set({ isConnected: connected });
  },
  
  setSessionId: (id) => {
    set({ sessionId: id });
  },
  
  setConfigs: (configs) => {
    set({ configs });
  },
  
  setSelectedConfig: (config) => {
    set({ selectedConfig: config });
  },
  
  setTools: (tools) => {
    set({ tools });
  },
  
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  
  setError: (error) => {
    set({ error });
  },
  
  setWebSocketMessage: (message: WebSocketMessage) => {
    const { addMessage, setLoading } = get();
    
    console.log("WebSocket message received:", message);
    
    if (message.progress === "streaming" && message.chunk) {
      set((state) => ({
        streamingContent: state.streamingContent + message.chunk,
        streamingAgent: message.agent_name || "",
        isLoading: true,
      }));
    } else if (message.progress === "complete") {
      const currentState = get();
      const content = currentState.streamingContent;
      
      addMessage({
        id: Date.now().toString(),
        type: "assistant",
        content: content || "Tool execution completed successfully!",
        timestamp: new Date(),
      });
      
      set({ 
        streamingContent: "", 
        streamingAgent: "", 
        isLoading: false 
      });
    } else if (message.error) {
      set({ error: message.error, isLoading: false });
    }
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
  
  clearForNewChat: () => {
    set({
      messages: [],
      currentChatId: null,
      showChatInterface: false,
      error: null,
      isLoading: false,
      streamingContent: "",
      streamingAgent: "",
    });
  },
  
  clearForLogout: () => {
    set({
      messages: [],
      chatHistories: [],
      currentChatId: null,
      showChatInterface: false,
      isConnected: false,
      sessionId: null,
      configs: [],
      selectedConfig: null,
      tools: {},
      isLoading: false,
      error: null,
      streamingContent: "",
      streamingAgent: "",
    });
  },

  clearForNavigation: () => {
    set({
      messages: [],
      currentChatId: null,
      showChatInterface: false,
      isConnected: false,
      sessionId: null,
      tools: {},
      isLoading: false,
      error: null,
      streamingContent: "",
      streamingAgent: "",
    });
  },
})); 