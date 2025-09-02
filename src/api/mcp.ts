import { BASE_URL } from "@/utils/constants";
import { MultiMCPConfig, ToolSummary, MCPConfigRequest } from "@/types";

export const mcpAPI = {
  async getToolSummaries(request: MCPConfigRequest): Promise<Record<string, ToolSummary[]>> {
    const response = await fetch(`${BASE_URL}/tool-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tool summaries');
    }

    return response.json();
  },

  getWebSocketUrl(): string {
    return `${BASE_URL.replace('http', 'ws')}/tool-summary/ws`;
  },

  getChatWebSocketUrl(sessionId: string): string {
    return `${BASE_URL.replace('http', 'ws')}/chat/ws/${sessionId}`;
  },
}; 