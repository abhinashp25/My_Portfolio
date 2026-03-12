import React from 'react';
import type { Metadata } from 'next';
import '../styles/index.css';
import '../styles/tailwind.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Abhinash Pradhan | Full Stack Developer & AI/ML Enthusiast',
  description: 'Portfolio of Abhinash Pradhan - Full Stack Developer and AI/ML Enthusiast building intelligent web experiences.',
  keywords: ['Full Stack Developer', 'AI/ML', 'React', 'Node.js', 'Python', 'Machine Learning'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fabhinashpo7524back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></head>
      <body className="bg-dark-900 text-slate-200 font-jakarta antialiased overflow-x-hidden">
        {children}
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: 'rgba(15,23,42,0.95)',
              color: '#e2e8f0',
              border: '1px solid rgba(99,102,241,0.3)',
              backdropFilter: 'blur(20px)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
            },
            error: {
              iconTheme: { primary: '#f472b6', secondary: '#0f172a' },
            },
          }}
        />
      </body>
    </html>
  );
}
