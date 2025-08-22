import { BASE_URL } from "@/utils/constants";
import { MultiMCPConfig } from "@/types";

export const configAPI = {
  async getConfigs(userId: string): Promise<MultiMCPConfig[]> {
    const token = localStorage.getItem('mcp_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/configs/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch configs');
    }

    return response.json();
  },

  async getConfig(userId: string, configId: string): Promise<MultiMCPConfig> {
    const token = localStorage.getItem('mcp_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/configs/${userId}/${configId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch config');
    }

    return response.json();
  },

  async createConfig(config: MultiMCPConfig): Promise<MultiMCPConfig> {
    const token = localStorage.getItem('mcp_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/configs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Failed to create config');
    }

    return response.json();
  },

  async updateConfig(configId: string, config: MultiMCPConfig): Promise<MultiMCPConfig> {
    const token = localStorage.getItem('mcp_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/configs/${configId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Failed to update config');
    }

    return response.json();
  },

  async deleteConfig(configId: string): Promise<void> {
    const token = localStorage.getItem('mcp_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/configs/${configId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete config');
    }
  },
}; 