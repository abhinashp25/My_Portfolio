'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@/lib/hooks/useChat';
import { XMarkIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are an AI assistant for Abhinash Pradhan's portfolio website. You help visitors learn about Abhinash.

About Abhinash Pradhan:
- Full Stack Developer & AI/ML Enthusiast from India
- Passionate about building intelligent web experiences at the intersection of software engineering and AI

Skills & Tech Stack:
- Languages: Python, JavaScript, TypeScript, HTML, CSS
- Frontend: React, Next.js, TailwindCSS
- Backend: Node.js, Express.js, Flask
- ML/AI: Machine Learning, Deep Learning, scikit-learn, TensorFlow, Pandas, NumPy, Matplotlib
- Databases: MongoDB, SQL
- Tools: Git, GitHub, Streamlit, OCR

Projects:
1. Payment Date Prediction - ML model with 87% accuracy predicting invoice payment dates using gradient boosting
2. Global Currency Detection AI - Computer vision system identifying 50+ world currencies using CNN + transfer learning
3. AI Course Recommender - Collaborative filtering recommendation engine for online courses built with Streamlit
4. Plant Disease Prediction - AI/ML project for detecting plant diseases from images (GitHub: github.com/abhinashp25/Plant_Disease_Prediction)
5. Realtime Chat Application (Chatify) - Full-stack real-time messaging app with React + Socket.io (GitHub: github.com/abhinashp25/chatify)
6. Factory Telemetry Analysis - Industrial IoT data analytics dashboard, reduced downtime by 30%

Experience:
- Python Internship Certificate
- 5+ Machine Learning projects
- Full Stack development experience

Contact:
- GitHub: github.com/abhinashp25
- Currently available for new opportunities

Be concise, friendly, and professional. Keep responses under 120 words unless asked for details.`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Abhinash's AI assistant powered by DeepSeek V3.2. Ask me anything about his skills, projects, or experience! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { response, isLoading, error, sendMessage } = useChat('NVIDIA', 'deepseek-ai/deepseek-v3.2', true);

  // Track if we've already added the current streaming response
  const streamingMsgRef = useRef<boolean>(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, response]);

  useEffect(() => {
    if (error) {
      toast.error('AI assistant error. Please try again.');

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content) {
          return [
            ...prev.slice(0, -1),
            {
              role: 'assistant',
              content: 'The AI request timed out. Please try again in a moment.',
              timestamp: new Date(),
            },
          ];
        }
        return prev;
      });

      streamingMsgRef.current = false;
    }
  }, [error]);

  // Handle streaming response updates
  useEffect(() => {
    if (isLoading && response) {
      // Update the streaming message in real-time
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && streamingMsgRef.current) {
          return [
            ...prev.slice(0, -1),
            { role: 'assistant', content: response, timestamp: new Date() },
          ];
        }
        return prev;
      });
    }
  }, [response, isLoading]);

  // When streaming completes
  useEffect(() => {
    if (!isLoading && response && streamingMsgRef.current) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return [
            ...prev.slice(0, -1),
            { role: 'assistant', content: response, timestamp: new Date() },
          ];
        }
        return prev;
      });
      streamingMsgRef.current = false;
    }
  }, [isLoading, response]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');

    const newUserMsg: Message = { role: 'user', content: userMessage, timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMsg]);

    // Add placeholder for streaming response
    streamingMsgRef.current = true;
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '', timestamp: new Date() },
    ]);

    const apiMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.slice(-8).map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user' as const, content: userMessage },
    ];

    sendMessage(apiMessages, { max_tokens: 250 });
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)',
        }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-80 md:w-96 rounded-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: '0 0 50px rgba(99, 102, 241, 0.2), 0 25px 50px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.1))', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">AI Assistant</p>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
              <p className="text-slate-400 text-xs font-mono">{isLoading ? 'Thinking...' : 'DeepSeek V3.2 · Online'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <XMarkIcon className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              {msg.role === 'assistant' && (
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 mt-0.5 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                >
                  <SparklesIcon className="w-3 h-3 text-white" />
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user' ? 'text-white rounded-br-sm' : 'text-slate-200 rounded-bl-sm'
                }`}
                style={{
                  background:
                    msg.role === 'user' ?'linear-gradient(135deg, #6366f1, #4f46e5)' :'rgba(255,255,255,0.06)',
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                {msg.content || (
                  <div className="flex gap-1 py-1">
                    {[0, 1, 2].map((j) => (
                      <div
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: `${j * 0.15}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="px-3 py-3 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask about Abhinash..."
            disabled={isLoading}
            className="flex-1 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors font-mono disabled:opacity-60"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            <PaperAirplaneIcon className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Quick prompts */}
        <div
          className="px-3 pb-3 flex flex-wrap gap-1.5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}
        >
          {['About Abhinash', 'His projects', 'Tech skills', 'Contact info'].map((prompt) => (
            <button
              key={prompt}
              onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
              disabled={isLoading}
              className="text-xs px-2 py-1 rounded-lg font-mono text-slate-400 hover:text-white transition-colors disabled:opacity-40"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
