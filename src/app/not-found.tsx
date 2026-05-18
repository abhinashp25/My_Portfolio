'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-dark-900 px-6">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', top: '20%', left: '20%' }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', bottom: '20%', right: '20%' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* 404 number */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold font-jakarta"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </h1>
        </div>

        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl glass neon-border flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <span className="text-2xl font-bold gradient-text font-jakarta">AP</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 font-mono text-sm">
          Looks like this page got lost in the void. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl font-semibold glass neon-border text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:shadow-glow transition-all duration-300 hover:scale-105 font-mono text-sm"
          >
            ← Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl font-semibold text-slate-900 dark:text-white transition-all duration-300 hover:shadow-glow-lg hover:scale-105 font-mono text-sm"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
