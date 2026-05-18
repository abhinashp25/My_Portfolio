import React from 'react';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '../styles/index.css';
import '../styles/tailwind.css';
import { Toaster } from 'react-hot-toast';
import ClientConsole from '@/components/ui/ClientConsole';


const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-jakarta' 
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains' 
});


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
    <html lang="en" className={`scroll-smooth ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-slate-200 font-sans antialiased overflow-x-hidden">
        <ClientConsole />
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