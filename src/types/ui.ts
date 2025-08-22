import { MultiMCPConfig } from './mcpConfig';
import { ToolSummary } from './index';

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ConfigState {
  configs: MultiMCPConfig[];
  selectedConfig: MultiMCPConfig | null;
  isLoading: boolean;
}

export interface ToolState {
  tools: Record<string, ToolSummary[]>;
  isLoading: boolean;
} 