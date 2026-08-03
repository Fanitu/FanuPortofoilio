import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hi there! 👋 I'm Fanuel's AI assistant. Ask me anything about his experience, projects, or skills!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const chatWindowRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Handle viewport height changes (mobile keyboard)
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    // VisualViewport API for better mobile keyboard handling
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth <= 480;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const openChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const systemPrompt = `You are Fanuel Bahta's AI assistant. You help visitors learn about Fanuel's work and experience.

ABOUT FANUEL:
- Full-stack developer from Ethiopia (MERN Stack: MongoDB, Express, React, Node.js)
- 3+ years of experience building web applications
- Currently running 2 SaaS products in production
- 15+ active businesses use his software daily

PROJECTS:
1. Restaurant Management System - Serving 13+ restaurants. Order tracking, real-time COGS calculation, profit analytics, daily reporting, monthly expense management. Tech: React, Node.js, MongoDB, Express, Vercel
2. Barber Shop Management System - Worker cashier, automatic commission splitting per service, debt deduction, payable calculations, admin revenue dashboard (daily/weekly/monthly). Tech: React, Node.js, MongoDB, Express
3. Multiplayer Bingo Game - Real-time online Bingo with 200+ boards per game. Socket.io live updates, instant winner validation, multi-game sessions. Tech: React, Socket.io, Node.js, Express
4. Restaurant Ordering App - QR code menu, WhatsApp integration, order tracking. Tech: React Native, Firebase, Node.js
5. Inventory Management Dashboard - Stock tracking, barcode scanning, low stock alerts, supplier management. Tech: Next.js, PostgreSQL, Prisma, Tailwind
6. E-commerce REST API - JWT auth, product management, cart system, order processing. Tech: Node.js, Express, MongoDB, JWT, Redis

SKILLS:
- Frontend: React, Next.js, Vue.js, Tailwind CSS, JavaScript, TypeScript
- Backend: Node.js, Express, REST APIs, WebSockets (Socket.io)
- Database: MongoDB, PostgreSQL, MySQL, Redis, Prisma ORM
- DevOps: Git, GitHub, Docker, AWS (EC2, S3), Vercel, Netlify
- Other: Redux, JWT Auth, Figma, Postman, Generative AI, Groq API

EDUCATION:
- Generative AI Course (completed)
- Self-taught developer with hands-on project experience

SERVICES:
- Custom web application development
- SaaS product development
- Restaurant/Shop management systems
- Real-time applications with Socket.io
- API development
- Business automation solutions

RULES:
- Only answer questions about Fanuel, his work, skills, and services
- If asked something unrelated, politely say you can only discuss Fanuel's portfolio
- Keep answers friendly, professional, and concise (2-4 sentences max)
- Use emojis occasionally
- If someone wants to hire Fanuel, encourage them to use the contact form
- Do not make up information`;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    const newUserMessage = { role: 'user', content: userInput };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: systemPrompt }
      ];

      messages.forEach(msg => {
        const role = msg.role === 'assistant' ? 'assistant' : 
                     msg.role === 'user' ? 'user' : 'assistant';

        apiMessages.push({
          role: role,
          content: msg.content
        });
      });

      apiMessages.push({
        role: 'user',
        content: userInput
      });

      const apiKey = import.meta.env.VITE_APP_GROQ_API_KEY;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Groq API Error:', errorData);
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 
        "I apologize, but I'm having trouble responding right now.";

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again or reach Fanuel through the contact form. 📧" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-widget ${isOpen ? 'open' : ''}`}>
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chatbot-window" 
          ref={chatWindowRef}
          style={{ height: `${viewportHeight}px` }}
        >
          {/* Header - Fixed */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <span>🤖</span>
                <div className="chatbot-status"></div>
              </div>
              <div>
                <h4>Fanuel's AI Assistant</h4>
                <p>Ask me anything!</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={closeChat} aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages - Scrollable */}
          <div className="chatbot-messages" ref={messagesContainerRef}>
            <div className="messages-wrapper">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'ai'}`}>
                  {msg.role !== 'user' && (
                    <div className="message-avatar ai-avatar">🤖</div>
                  )}
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="message-avatar user-avatar">👤</div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="message ai">
                  <div className="message-avatar ai-avatar">🤖</div>
                  <div className="message-bubble loading-bubble">
                    <div className="typing-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input - Fixed at bottom */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete="off"
            />
            <button 
              className="chatbot-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M2 10L18 2L10 18L8 12L2 10Z" 
                  fill="currentColor"
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        className="chatbot-toggle-btn"
        onClick={openChat}
        style={{ display: isOpen ? 'none' : 'flex' }}
        aria-label="Open chat"
      >
        <div className="chatbot-greeting">
          <span>Hey there, any questions? Ask me.</span>
          <div className="greeting-dot"></div>
        </div>
        <div className="chatbot-icon">
          <span className="chatbot-emoji">💬</span>
        </div>
      </button>
    </div>
  );
}

export default ChatBot;