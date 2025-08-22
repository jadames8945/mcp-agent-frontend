import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Message } from "@/types";
import { useChatStore } from "@/stores/chatStore";
import { THEME } from "@/utils/constants";

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

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#FAFAFA',
        minHeight: 0,
      }}
    >
      {messages.length === 0 && !streamingContent && (
        <Box
          sx={{
            alignSelf: "flex-start",
            maxWidth: "85%",
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
                maxWidth: "100%",
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

      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            justifyContent: message.type === "user" ? "flex-end" : "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              maxWidth: "85%",
              flexDirection: message.type === "user" ? "row-reverse" : "row",
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: message.type === "user" ? THEME.colors.primary : "#f8f9fa",
                color: message.type === "user" ? "white" : THEME.colors.primary,
                fontSize: "14px",
                fontWeight: 600,
                border:
                  message.type === "user" ? "none" : `2px solid ${THEME.colors.primary}`,
                boxShadow:
                  message.type === "user"
                    ? "0 2px 8px rgba(0, 123, 255, 0.3)"
                    : "0 2px 8px rgba(0, 123, 255, 0.1)",
              }}
            >
              {message.type === "user" ? "U" : "AI"}
            </Avatar>
            <Paper
              elevation={0}
              sx={{
                padding: 3,
                maxWidth: "100%",
                wordWrap: "break-word",
                backgroundColor:
                  message.type === "user" ? THEME.colors.primary : "white",
                color: message.type === "user" ? "white" : "#2c3e50",
                borderRadius:
                  message.type === "user"
                    ? "20px 20px 4px 20px"
                    : "20px 20px 20px 4px",
                boxShadow:
                  message.type === "user"
                    ? [
                        "0 1px 3px rgba(0, 123, 255, 0.2)",
                        "0 4px 12px rgba(0, 123, 255, 0.15)",
                        "0 8px 24px rgba(0, 123, 255, 0.1)",
                      ].join(", ")
                    : [
                        "0 1px 3px rgba(0, 0, 0, 0.05)",
                        "0 4px 12px rgba(0, 0, 0, 0.08)",
                        "0 8px 24px rgba(0, 0, 0, 0.06)",
                      ].join(", "),
                border: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
                "&::before":
                  message.type === "user"
                    ? {
                        content: '""',
                        position: "absolute",
                        right: "-8px",
                        top: "12px",
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: `8px solid ${THEME.colors.primary}`,
                      }
                    : {
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
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
                  fontWeight: 400,
                  color: message.type === "user" ? "#ffffff" : "#2c3e50",
                  letterSpacing: "0.01em",
                }}
              >
                {message.content}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.7,
                  display: "block",
                  mt: 1.5,
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          </Box>
        </Box>
      ))}

      {streamingContent && streamingAgent === "chat_agent" && (
        <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
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
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  color: "#2c3e50",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
                }}
              >
                {streamingContent}
                <span
                  style={{
                    animation: "blink 1s infinite",
                    color: THEME.colors.primary,
                    fontWeight: "bold",
                  }}
                >
                  |
                </span>
              </Typography>
            </Paper>
          </Box>
        </Box>
      )}

      {isLoading && !streamingContent && (
        <Box sx={{ alignSelf: "flex-start", maxWidth: "85%" }}>
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
    </Box>
  );
} 