'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useChat, ChatConfig } from '@/lib/hooks/useChat';
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon, BoltIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Strip markdown bold/italic so output looks clean in the chat bubble
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .trim();
}

const SYSTEM_PROMPT = `You are an AI assistant for Abhinash Pradhan's portfolio. Answer concisely and professionally, no markdown formatting.

Abhinash Pradhan — Full Stack Developer & AI/ML Enthusiast from India.

Skills: Python, JavaScript, TypeScript, React, Next.js, TailwindCSS, Node.js, Express.js, Flask, TensorFlow, scikit-learn, Pandas, NumPy, MongoDB, SQL, Git, Streamlit, OCR.

Projects:
1. Payment Date Prediction — ML model, 87% accuracy, gradient boosting
2. Global Currency Detection AI — CNN + transfer learning, 50+ currencies
3. AI Course Recommender — collaborative filtering, Streamlit
4. Plant Disease Prediction — image-based AI/ML (github.com/abhinashp25/Plant_Disease_Prediction)
5. Chatify — real-time chat, React + Socket.io (github.com/abhinashp25/chatify)
6. Factory Telemetry Dashboard — IoT analytics, 30% downtime reduction

Experience: Python Internship at Moniba Tech, AI/ML Internship at OCAC Bhubaneswar.
GitHub: github.com/abhinashp25. Available for full-time roles.

Reply in plain text. Be warm, concise (under 100 words unless asked for detail).`;

// Stable configs — defined outside component to keep useMemo dep stable
const CHAT_CONFIGS: ChatConfig[] = [
  { provider: 'GROQ',   model: 'llama-3.3-70b-versatile' },
  { provider: 'GEMINI', model: 'gemini-2.0-flash' },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Abhinash's AI assistant. Ask me about his skills, projects, or experience! ⚡",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [activeProvider, setActiveProvider] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingMsgRef = useRef<boolean>(false);

  // Stable reference so useCallback deps don't change on every render
  const { response, isLoading, error, sendMessage } = useChat(CHAT_CONFIGS, true);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, response]);

  // Sync streaming response into the last message in real-time
  useEffect(() => {
    if (!streamingMsgRef.current) return;
    if (response) {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return [...prev.slice(0, -1), { ...last, content: stripMarkdown(response) }];
        }
        return prev;
      });
    }
  }, [response]);

  // Finalize message once loading completes
  useEffect(() => {
    if (!isLoading && streamingMsgRef.current) {
      streamingMsgRef.current = false;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content.trim()) {
          return [...prev.slice(0, -1), { ...last, content: 'I could not generate a response. Please try again.' }];
        }
        return prev;
      });
    }
  }, [isLoading]);

  // Handle offline / error fallback
  useEffect(() => {
    if (!error) return;
    streamingMsgRef.current = false;
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last?.role === 'assistant' && !last.content.trim()) {
        return [...prev.slice(0, -1), {
          ...last,
          content: "I'm currently in offline mode. Abhinash is a Full Stack Developer & AI/ML engineer. Check the portfolio sections or use the Contact form to reach him directly!",
        }];
      }
      return prev;
    });
  }, [error]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userText, timestamp: new Date() }]);

    // Placeholder for streaming response
    streamingMsgRef.current = true;
    setMessages(prev => [...prev, { role: 'assistant', content: '', timestamp: new Date() }]);

    const apiMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.slice(-8).map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user' as const, content: userText },
    ];

    sendMessage(apiMessages, { max_tokens: 250 });
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <button
        id="chatbot-toggle"
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
        style={{
          background: 'rgba(15, 15, 15, 0.85)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
          backdropFilter: 'blur(24px)',
        }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <XMarkIcon className="w-5 h-5 text-white/80" />
        ) : (
          <SparklesIcon className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
        )}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black animate-pulse" />
        )}
      </button>

      {/* ── Chat Window ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] md:w-[400px] rounded-[20px] overflow-hidden
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-6 pointer-events-none'}`}
        style={{
          background: 'rgba(8, 8, 8, 0.92)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset',
          backdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        {/* Header */}
        <div className="px-5 py-3.5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <SparklesIcon className="w-4 h-4 text-white/80" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold tracking-wide leading-none">AI Assistant</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              <p className="text-white/35 text-[10px] font-mono uppercase tracking-widest">
                {isLoading ? 'Generating…' : 'Groq · Gemini'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <BoltIcon className="w-3 h-3 text-amber-400/70" />
            <span className="text-[10px] font-mono text-amber-400/70">Ultra-fast</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-1 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
          >
            <XMarkIcon className="w-4 h-4 text-white/40" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[320px] overflow-y-auto p-4 space-y-3 scroll-smooth">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div
                  className="w-6 h-6 rounded-[8px] flex items-center justify-center flex-shrink-0 mb-0.5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <SparklesIcon className="w-3 h-3 text-white/60" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-[16px] px-3.5 py-2.5 text-[13.5px] leading-[1.55] font-sans ${
                  msg.role === 'user'
                    ? 'rounded-br-[4px] text-[#111] font-medium'
                    : 'rounded-bl-[4px] text-slate-300'
                }`}
                style={{
                  background: msg.role === 'user'
                    ? '#ffffff'
                    : 'rgba(255,255,255,0.045)',
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                {msg.content || (
                  /* Typing indicator */
                  <span className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(j => (
                      <span
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                        style={{ animationDelay: `${j * 0.15}s`, animationDuration: '0.8s' }}
                      />
                    ))}
                  </span>
                )}
                {/* Blinking cursor while streaming */}
                {msg.role === 'assistant' && isLoading && msg.content && i === messages.length - 1 && (
                  <span className="inline-block w-0.5 h-3.5 bg-white/50 ml-0.5 animate-blink align-middle" />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <input
            ref={inputRef}
            id="chatbot-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask anything about Abhinash…"
            disabled={isLoading}
            className="flex-1 rounded-full px-4 py-2 text-[13px] text-white/90 placeholder-white/25 outline-none transition-all font-sans disabled:opacity-50"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
          <button
            id="chatbot-send"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-4 h-4 text-black ml-0.5" />
          </button>
        </div>

        {/* Quick prompts */}
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {['About Abhinash', 'Show projects', 'Tech stack', 'Contact info'].map(prompt => (
            <button
              key={prompt}
              onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
              disabled={isLoading}
              className="text-[11px] px-2.5 py-1 rounded-full font-mono text-white/40 hover:text-white/70 transition-all duration-200 disabled:opacity-30"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
