'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => setVisible(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-900 transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-500/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl glass neon-border flex items-center justify-center animate-pulse-glow">
            <span className="text-4xl font-bold gradient-text font-jakarta">AP</span>
          </div>
          <div className="absolute -inset-2 rounded-2xl border border-brand-500/20 animate-spin-slow" />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white font-jakarta tracking-wide">
            Abhinash Pradhan
          </h1>
          <p className="text-cyber-400 text-sm font-mono mt-1 tracking-widest uppercase">
            Initializing Portfolio...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64">
          <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 via-cyber-500 to-neon-500 rounded-full transition-all duration-200"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-500 font-mono">Loading assets</span>
            <span className="text-xs text-brand-400 font-mono">{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {[0, 1, 2]?.map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-brand-500 animate-bounce-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
