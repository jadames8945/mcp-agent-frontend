# MCP Agent Frontend

A modern, beautiful frontend for interacting with MCP (Model Context Protocol) servers, combining the functionality of the MCP Agent Client with the beautiful UI design of the PayPal app.

## Features

- **Modern UI Design**: Beautiful Material-UI based interface inspired by the PayPal app
- **MCP Integration**: Full support for MCP server connections and tool execution
- **Real-time Chat**: WebSocket-based chat interface for tool invocation
- **Authentication**: JWT-based authentication system
- **Responsive Design**: Works on desktop and mobile devices
- **Tool Management**: Visual display of available MCP tools organized by server

## Architecture

This frontend combines:
- **MCP Agent Client functionality**: Chat, tool integration, configuration management
- **PayPal app UI**: Modern design, suggestion containers, right-side panels
- **New MCP Backend integration**: JWT auth, WebSocket connections, tool APIs

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Header (Logo, User Info, Connection Status)                │
├─────────────┬─────────────────────────────┬─────────────────┤
│ Side Panel  │        Chat Area            │ MCP Tools      │
│ (Chat       │   (Messages + Input)        │ Container      │
│  History)   │                             │ (Right Panel)  │
└─────────────┴─────────────────────────────┴─────────────────┘
```

## Key Components

- **Header**: Logo, user info, connection status, logout
- **Side Panel**: Chat history, new chat button, collapsible
- **Chat Area**: Message display, input field, send button
- **Suggestions Container**: Welcome message, action cards, quick start
- **MCP Tools Container**: Available tools organized by server

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MCP Agent Backend running on port 8000

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set environment variables:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_WS_BASE_URL=ws://localhost:8000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Integration

This frontend integrates with the new MCP Agent Backend:

- **Authentication**: `/auth/login` and `/auth/register` endpoints
- **Tool Summaries**: `/tool-summary` endpoint for fetching available tools
- **WebSocket**: `/tool-summary/ws/{session_id}` for real-time communication
- **Session Management**: Uses JWT tokens as session IDs

## Development

### Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
├── hooks/              # Custom React hooks
└── api/                # API service functions
```

### Key Technologies

- **Next.js 14**: React framework with app router
- **Material-UI**: Component library for consistent design
- **Zustand**: Lightweight state management
- **TypeScript**: Type-safe development
- **WebSocket**: Real-time communication with MCP servers

## Configuration

The frontend can be configured through environment variables:

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL
- `NEXT_PUBLIC_WS_BASE_URL`: WebSocket base URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the MCP Agent ecosystem. 