export enum Transport {
  SSE = 'sse',
  STREAMABLE_HTTP = 'streamable_http',
  STDIO = 'stdio',
}

export interface Connection {
  name: string;
  description?: string;
  connected: boolean;
  transport: Transport.SSE | Transport.STREAMABLE_HTTP;
  url: string;
}

export interface StdioConnection {
  name: string;
  connected: boolean;
  transport: Transport.STDIO;
  command: string[];
  cwd?: string;
  env?: Record<string, unknown>;
}

export interface MultiMCPConfig {
  id?: string;
  user_id?: string;
  name?: string;
  description?: string;
  connections: Connection[];
}

export interface MCPConfigRequest {
  session_id: string;
  mcp_config: MultiMCPConfig;
} 