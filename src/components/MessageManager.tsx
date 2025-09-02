import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Fab,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { Message } from "@/types";
import { useChatStore } from "@/stores/chatStore";
import { THEME } from "@/utils/constants";
import MarkdownMessage from "./MarkdownMessage";

interface MessageManagerProps {
  messages: Message[];
  streamingContent?: string;
  streamingAgent?: string;
  isLoading: boolean;
}

export default function MessageManager({
  messages,
  streamingContent,
  streamingAgent,
  isLoading,
}: MessageManagerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setShowScrollTop(target.scrollTop > 200);
  };

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box
      onScroll={handleScroll}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.3)',
          },
        },
      }}
    >
      
      {messages.length === 0 && !streamingContent && (
        <Box
          sx={{
            alignSelf: "flex-start",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: THEME.colors.primary,
                color: "white",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "14px", fontWeight: 600 }}
              >
                AI
              </Typography>
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                padding: 3,
                backgroundColor: "white",
                borderRadius: "20px",
                boxShadow: [
                  "0 1px 3px rgba(0, 0, 0, 0.05)",
                  "0 4px 12px rgba(0, 0, 0, 0.08)",
                  "0 8px 24px rgba(0, 0, 0, 0.06)",
                ].join(", "),
                border: "1px solid rgba(0, 0, 0, 0.05)",
                wordWrap: "break-word",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#2c3e50",
                  textAlign: "left",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                Hello! I'm your MCP Agent. I can help you with research, calculations, and more. What would you like to know today?
              </Typography>
            </Paper>
          </Box>
        </Box>
      )}

      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              width: '100%',
              flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: message.type === 'user' ? THEME.colors.primary : 
                         message.type === 'progress' ? '#ff9800' : '#f8f9fa',
                color: message.type === 'user' ? 'white' : 
                       message.type === 'progress' ? 'white' : THEME.colors.primary,
                fontSize: '14px',
                fontWeight: 600,
                border:
                  message.type === 'user' ? 'none' : `2px solid ${THEME.colors.primary}`,
                boxShadow:
                  message.type === 'user'
                    ? '0 2px 8px rgba(0, 123, 255, 0.3)'
                    : '0 2px 8px rgba(0, 123, 255, 0.1)',
              }}
            >
              {message.type === 'user' ? 'U' : 
               message.type === 'progress' ? '⚡' : 'AI'}
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                padding: 3,
                wordWrap: 'break-word',
                backgroundColor:
                  message.type === 'user' ? THEME.colors.primary : 'white',
                color: message.type === 'user' ? 'white' : '#2c3e50',
                borderRadius:
                  message.type === 'user'
                    ? '20px 20px 4px 20px'
                    : message.type === 'progress'
                    ? '12px'
                    : '20px 20px 20px 4px',
                boxShadow:
                  message.type === 'user'
                    ? [
                        '0 1px 3px rgba(0, 123, 255, 0.2)',
                        '0 4px 12px rgba(0, 123, 255, 0.15)',
                        '0 8px 24px rgba(0, 123, 255, 0.1)',
                      ].join(', ')
                    : [
                        '0 1px 3px rgba(0, 0, 0, 0.05)',
                        '0 4px 12px rgba(0, 0, 0, 0.08)',
                        '0 8px 24px rgba(0, 0, 0, 0.06)',
                      ].join(', '),
                border: '1px solid rgba(0, 0, 0, 0.05)',
                position: 'relative',
                '&::before':
                  message.type === 'user'
                    ? {
                        content: '""',
                        position: 'absolute',
                        right: '-8px',
                        top: '12px',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: `8px solid ${THEME.colors.primary}`,
                      }
                    : {
                        content: '""',
                        position: 'absolute',
                        left: '-8px',
                        top: '12px',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderTop: '8px solid white',
                      },
              }}
            >
              {message.type === 'user' ? (
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    textAlign: 'left',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
                    fontWeight: 400,
                    color: '#ffffff',
                    letterSpacing: '0.01em',
                  }}
                >
                  {message.content}
                </Typography>
              ) : message.type === 'progress' ? (
                <Box sx={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
                  fontWeight: 500,
                  color: '#e65100',
                  letterSpacing: '0.01em',
                  backgroundColor: '#fff3e0',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ffcc02',
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    {message.toolName && `🛠️ ${message.toolName}`}
                  </Typography>
                  <Typography variant="body2">
                    {message.content}
                  </Typography>
                  {message.progressStep && message.totalSteps && (
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ color: '#f57c00' }}>
                        Progress: {message.progressStep} of {message.totalSteps}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
                  fontWeight: 400,
                  color: '#2c3e50',
                  letterSpacing: '0.01em',
                }}>
                  <MarkdownMessage content={message.content} />
                </Box>
              )}
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.7,
                  display: 'block',
                  mt: 1.5,
                  textAlign: 'left',
                  fontSize: '11px',
                  fontWeight: 500,
                }}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Paper>
          </Box>
        </Box>
      ))}

      {streamingContent && streamingAgent === "chat_agent" && (
        <Box sx={{ alignSelf: "flex-start", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#f8f9fa",
                color: THEME.colors.primary,
                fontSize: "14px",
                fontWeight: 600,
                border: `2px solid ${THEME.colors.primary}`,
                boxShadow: "0 2px 8px rgba(0, 123, 255, 0.1)",
              }}
            >
              AI
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                padding: 3,
                backgroundColor: "white",
                borderRadius: "20px 20px 20px 4px",
                boxShadow: [
                  "0 1px 3px rgba(0, 0, 0, 0.05)",
                  "0 4px 12px rgba(0, 0, 0, 0.08)",
                  "0 8px 24px rgba(0, 0, 0, 0.06)",
                ].join(", "),
                border: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "-8px",
                  top: "12px",
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "8px solid white",
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <CircularProgress size={18} sx={{ color: THEME.colors.primary }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#666", fontSize: "13px", fontWeight: 500 }}
                >
                  Generating response...
                </Typography>
              </Box>
              <Box sx={{
                color: "#2c3e50",
                fontSize: "15px",
                lineHeight: 1.6,
                fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
              }}>
                <MarkdownMessage content={streamingContent} />
                <span
                  style={{
                    animation: "blink 1s infinite",
                    color: THEME.colors.primary,
                    fontWeight: "bold",
                  }}
                >
                  |
                </span>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      {isLoading && !streamingContent && (
        <Box sx={{ alignSelf: "flex-start", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#f8f9fa",
                color: THEME.colors.primary,
                fontSize: "14px",
                fontWeight: 600,
                border: `2px solid ${THEME.colors.primary}`,
                boxShadow: "0 2px 8px rgba(0, 123, 255, 0.1)",
              }}
            >
              AI
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                padding: 3,
                backgroundColor: "white",
                borderRadius: "20px 20px 20px 4px",
                boxShadow: [
                  "0 1px 3px rgba(0, 0, 0, 0.05)",
                  "0 4px 12px rgba(0, 0, 0, 0.08)",
                  "0 8px 24px rgba(0, 0, 0, 0.06)",
                ].join(", "),
                border: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "-8px",
                  top: "12px",
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: "8px solid white",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CircularProgress size={18} sx={{ color: THEME.colors.primary }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#666", fontSize: "13px", fontWeight: 500 }}
                >
                  Generating content...
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      <div ref={messagesEndRef} />
      
      {showScrollTop && (
        <Fab
          size="small"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#2C3E50',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Box>
  );
} 