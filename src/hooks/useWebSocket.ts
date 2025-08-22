import { useCallback, useRef, useEffect } from 'react';
import { MultiMCPConfig } from '@/types/mcpConfig';
import { mcpAPI } from '@/api';
import { useChatStore } from '@/stores/chatStore';

export default function useWebSocket(onMessage: (message: any) => void) {
  const wsRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);
  const { setWebSocket, setConnected, setSessionId } = useChatStore();

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const connect = useCallback((sessionId: string, config: MultiMCPConfig) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const url = mcpAPI.getWebSocketUrl(sessionId);
      console.log('Connecting to WebSocket URL:', url);
      
      const websocket = new WebSocket(url);

      websocket.onopen = () => {
        console.log('✅ WebSocket connected successfully');
        setConnected(true);
        setSessionId(sessionId);
        setWebSocket(websocket);
      };

      websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('📨 WebSocket message received:', message);
          onMessageRef.current(message);
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      websocket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code);
        setConnected(false);
        setWebSocket(null);
        wsRef.current = null;

        if (event.code !== 1000 && event.code !== 1001) {
          console.log('🔄 Attempting to reconnect in 3 seconds...');
          setTimeout(() => {
            connect(sessionId, config);
          }, 3000);
        }
      };

      websocket.onerror = (event) => {
        console.error('WebSocket error:', event);
      };

      wsRef.current = websocket;
    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
    }
  }, [setConnected, setSessionId, setWebSocket]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }
    setConnected(false);
    setSessionId(null);
    setWebSocket(null);
  }, [setConnected, setSessionId, setWebSocket]);

  const sendMessage = useCallback(
    (message: string, config: MultiMCPConfig) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const messageData = {
          user_input: message,
          mcp_config: config,
        };
        console.log('📤 Sending WebSocket message:', messageData);
        wsRef.current.send(JSON.stringify(messageData));
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    isConnected: useChatStore.getState().isConnected,
    sessionId: useChatStore.getState().sessionId,
    connect,
    disconnect,
    sendMessage,
  };
} 