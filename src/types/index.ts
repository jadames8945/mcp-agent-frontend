export * from "./mcpConfig";
export * from "./chat";
export * from "./ui";

export interface WebSocketMessage {
  agent_name?: string;
  progress?: string;
  chunk?: string;
  result?: string;
  error?: string;
  status?: string;
  result_channel?: string;
  session_id?: string;
  tool_name?: string;
  progress_step?: number;
  tool_len?: number;
  message?: string;
}

export interface ChatInterfaceProps {
  messages: import("./chat").Message[];
  onSendMessage: (message: string) => Promise<void>;
  isConnected: boolean;
}

export interface ToolDisplayProps {
  tools: ToolSummary[];
  onToolSelect?: (tool: ToolSummary) => void;
}

export interface ToolSummary {
  tool_name: string;
  description: string;
  parameters: Parameter[];
}

export interface Parameter {
  param_name: string;
  type: string;
} 