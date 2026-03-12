'use client';

import { CodeBracketIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';


export default function Footer() {
  const socialLinks = [
    { href: 'https://github.com/abhinashpradhan', icon: CodeBracketIcon, label: 'GitHub', color: '#6366f1' },
    { href: 'https://linkedin.com/in/abhinashpradhan', icon: UserIcon, label: 'LinkedIn', color: '#06b6d4' },
    { href: 'mailto:abhinash@example.com', icon: EnvelopeIcon, label: 'Email', color: '#f472b6' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Wave SVG */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: '80px' }}
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z"
            fill="url(#waveGrad)"
          />
          <path
            d="M0,50 C240,20 480,70 720,50 C960,30 1200,70 1440,50 L1440,80 L0,80 Z"
            fill="rgba(99,102,241,0.1)"
          />
        </svg>
      </div>

      <div className="bg-dark-900 border-t border-white/5 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & tagline */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl glass neon-border flex items-center justify-center">
                <span className="text-lg font-bold gradient-text font-jakarta">AP</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Abhinash Pradhan</p>
                <p className="text-slate-500 text-xs font-mono">Full Stack Developer & AI/ML Enthusiast</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: `1px solid ${link.color}20`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${link.color}40`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${link.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                      (e.currentTarget as HTMLElement).style.borderColor = `${link.color}20`;
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: link.color }} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-sm text-center">
              Built with passion and modern web technologies.
            </p>
            <p className="text-slate-600 text-xs font-mono">
              © 2024 Abhinash Pradhan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
