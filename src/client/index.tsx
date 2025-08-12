import { createRoot } from "react-dom/client";
import { usePartySocket } from "partysocket/react";
import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router";
import { nanoid } from "nanoid";

import { names, type ChatMessage, type Message } from "../shared";

// Send icon SVG component
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chat bubble component
const ChatBubble = ({ message, isOwnMessage }: { message: ChatMessage; isOwnMessage: boolean }) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${isOwnMessage ? 'own-message' : ''}`}>
      <div className="message-avatar">
        {message.user.charAt(0).toUpperCase()}
      </div>
      <div className="message-content">
        <div className="message-user">{message.user}</div>
        <div className="message-text">{message.content}</div>
        <div className="message-time">
          {formatTime(message.timestamp || Date.now())}
        </div>
      </div>
    </div>
  );
};

// Welcome screen component
const WelcomeScreen = () => (
  <div className="welcome-screen">
    <h1>🚀 CloudChat</h1>
    <p>
      Experience real-time messaging powered by Cloudflare Pages and Durable Objects. 
      Create a new room or join an existing one to start chatting with others instantly.
    </p>
    <div style={{ fontSize: '14px', opacity: 0.8 }}>
      Built with React, PartyKit, and Cloudflare Workers
    </div>
  </div>
);

// Main chat app component
function ChatApp() {
  const [name] = useState(names[Math.floor(Math.random() * names.length)]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { room } = useParams();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const socket = usePartySocket({
    party: "chat",
    room,
    onMessage: (evt) => {
      const message = JSON.parse(evt.data as string) as Message;
      if (message.type === "add") {
        const foundIndex = messages.findIndex((m) => m.id === message.id);
        if (foundIndex === -1) {
          // Add new message with timestamp
          setMessages((messages) => [
            ...messages,
            {
              id: message.id,
              content: message.content,
              user: message.user,
              role: message.role,
              timestamp: Date.now(),
            },
          ]);
        } else {
          // Update existing message
          setMessages((messages) => {
            return messages
              .slice(0, foundIndex)
              .concat({
                id: message.id,
                content: message.content,
                user: message.user,
                role: message.role,
                timestamp: Date.now(),
              })
              .concat(messages.slice(foundIndex + 1));
          });
        }
      } else if (message.type === "update") {
        setMessages((messages) =>
          messages.map((m) =>
            m.id === message.id
              ? {
                  id: message.id,
                  content: message.content,
                  user: message.user,
                  role: message.role,
                  timestamp: Date.now(),
                }
              : m,
          ),
        );
      } else if (message.type === "all") {
        // Add timestamps to loaded messages
        setMessages(message.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp || Date.now()
        })));
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const chatMessage: ChatMessage = {
      id: nanoid(8),
      content: inputValue.trim(),
      user: name,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((messages) => [...messages, chatMessage]);
    socket.send(
      JSON.stringify({
        type: "add",
        ...chatMessage,
      } satisfies Message),
    );

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1>
          💬 CloudChat
        </h1>
        <div className="room-info">
          <div className="room-id">Room: {room}</div>
          <div className="user-info">
            <div className="user-avatar">
              {name.charAt(0).toUpperCase()}
            </div>
            <span>{name}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isOwnMessage={message.user === name}
          />
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="input-container" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <textarea
            className="message-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={`Hello ${name}! Type a message...`}
            autoComplete="off"
            rows={1}
          />
        </div>
        <button 
          type="submit" 
          className="send-button"
          disabled={!inputValue.trim()}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

// Main app component with routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/:room" element={<ChatApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

// Render the app
createRoot(document.getElementById("root")!).render(<App />);
