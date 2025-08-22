import { BASE_URL } from "@/utils/constants";
import { ChatHistoryItem } from "@/types";

export const chatAPI = {
  async getChatHistories(): Promise<ChatHistoryItem[]> {
    const response = await fetch(`${BASE_URL}/chat/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chat histories');
    }

    return response.json();
  },

  async createChatHistory(title: string): Promise<ChatHistoryItem> {
    const response = await fetch(`${BASE_URL}/chat/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error('Failed to create chat history');
    }

    return response.json();
  },

  async updateChatHistory(chatId: string, messages: any[]): Promise<void> {
    const response = await fetch(`${BASE_URL}/chat/history/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to update chat history');
    }
  },
}; 