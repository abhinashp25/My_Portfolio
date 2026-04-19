'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@/lib/hooks/useChat';
import { XMarkIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';

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

  const { response, isLoading, error, sendMessage } = useChat(
    'NVIDIA', 
    'meta/llama-3.1-8b-instruct', 
    true
  );

  // Track if we've already added the current streaming response
  const streamingMsgRef = useRef<boolean>(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, response]);

  useEffect(() => {
    if (error) {
      // Instead of an intimidating error, provide a professional portfolio fallback
      const fallbackMessage = "I'm currently in offline mode due to high traffic, but I'd love to help! Abhinash is a Full Stack Developer & AI/ML Enthusiast. Feel free to explore the projects and experience sections, or reach out via the Contact form!";

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content) {
          return [
            ...prev.slice(0, -1),
            {
              role: 'assistant',
              content: fallbackMessage,
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
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{
          background: 'rgba(20, 20, 20, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <SparklesIcon className="w-6 h-6 text-white" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-pulse border-2 border-dark-900" />
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-[350px] md:w-[400px] rounded-[24px] overflow-hidden transition-all duration-400 ease-out origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8 pointer-events-none'
        }`}
        style={{
          background: 'rgba(10, 10, 10, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
          backdropFilter: 'blur(30px) saturate(150%)',
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center gap-3 backdrop-blur-md"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-10 h-10 rounded-[14px] flex items-center justify-center border border-white/10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-[15px] font-medium tracking-wide">AI Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-white/50 animate-pulse' : 'bg-emerald-400'}`} />
              <p className="text-white/40 text-[11px] font-mono tracking-widest uppercase">{isLoading ? 'Processing' : 'Connected'}</p>
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
        <div className="h-[340px] overflow-y-auto p-5 space-y-4 smooth-scroll">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              {msg.role === 'assistant' && (
                <div
                  className="w-7 h-7 rounded-[10px] flex items-center justify-center mr-3 mt-1 flex-shrink-0 border border-white/10"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <SparklesIcon className="w-3.5 h-3.5 text-white/80" />
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-[18px] px-4 py-3 text-[14px] leading-relaxed font-sans ${
                  msg.role === 'user' ? 'text-dark-900 rounded-br-[4px]' : 'text-slate-300 rounded-bl-[4px]'
                }`}
                style={{
                  background:
                    msg.role === 'user' ? '#ffffff' : 'rgba(255,255,255,0.04)',
                  border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {msg.content || (
                  <div className="flex gap-1.5 py-1.5 items-center">
                    {[0, 1, 2].map((j) => (
                      <div
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-slate-400/80 animate-pulse"
                        style={{ animationDelay: `${j * 0.2}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div
          className="px-4 py-4 flex items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="flex-1 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-all font-sans disabled:opacity-60"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed bg-white"
          >
            <PaperAirplaneIcon className="w-4 h-4 text-dark-900 ml-0.5" />
          </button>
        </div>

        <div
          className="px-4 pb-4 flex flex-wrap gap-2"
        >
          {['About Abhinash', 'View Projects', 'Skills overview', 'Contact info'].map((prompt) => (
            <button
              key={prompt}
              onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
              disabled={isLoading}
              className="text-[11px] px-3 py-1.5 rounded-full font-mono text-white/50 hover:text-white transition-all duration-300 disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
