export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9889";
export const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_BASE_URL || "ws://localhost:9889";

export const BRAND = {
  primary: "#000000",
  primaryDark: "#333333",
  secondary: "#666666",
} as const;

export const ICONS = {
  sidebar: "/sidebar.svg",
  sidebarReverse: "/sidebar_reverse.svg",
} as const;

export const ACTION_CARDS = [
  {
    title: "Learn about MCP",
    description: "Ask the agent about Model Context Protocol",
    icon: "🤖",
    action: "What is Model Context Protocol (MCP) and how does it work?",
  },
  {
    title: "Financial Research",
    description: "Get information about mutual funds and tickers",
    icon: "💰",
    action: "Get information on ticker SWLSX",
  },
  {
    title: "General Chat",
    description: "Ask the agent any general question",
    icon: "💬",
    action: "Hello! How can you help me today?",
  },
  {
    title: "Math Calculator",
    description: "Use the calculation tool for math problems",
    icon: "🧮",
    action: "Calculate 15 * 23 + 7",
  },
] as const;

export const THEME = {
  colors: {
    primary: "#000000",
    primaryDark: "#333333",
    secondary: "#666666",
    background: "#f5f5f5",
    white: "#FFFFFF",
    border: "#e0e0e0",
    headerBg: "#D9D9D9",
    chatBg: "#E3E3E3",
    success: "#4caf50",
    error: "#f44336",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
  dimensions: {
    headerHeight: "85px",
    sidebarWidth: "300px",
    borderRadius: "8px",
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: "32px",
      fontWeight: 600,
      lineHeight: "140%",
    },
    h4: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "140%",
    },
    body: {
      fontSize: "14px",
      lineHeight: 1.6,
    },
    caption: {
      fontSize: "12px",
      opacity: 0.6,
    },
  },
} as const; 