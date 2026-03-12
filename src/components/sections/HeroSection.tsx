'use client';

import { useRef } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useMousePosition } from '@/hooks/useMousePosition';
import { ArrowDownIcon, BeakerIcon } from '@heroicons/react/24/outline';

const texts = [
  "Hi, I'm Abhinash Pradhan",
  'Full Stack Developer',
  'Machine Learning Enthusiast',
  'I build intelligent web experiences.',
];

export default function HeroSection() {
  const { displayText, isTyping } = useTypewriter({ texts, typeSpeed: 70, deleteSpeed: 35, pauseDuration: 2200 });
  const { x, y } = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);

  const parallaxX = (x / (typeof window !== 'undefined' ? window.innerWidth : 1) - 0.5) * 20;
  const parallaxY = (y / (typeof window !== 'undefined' ? window.innerHeight : 1) - 0.5) * 20;

  const handleExplore = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLab = () => {
    document.getElementById('ailab')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            top: '10%',
            left: '20%',
            transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            bottom: '20%',
            right: '15%',
            transform: `translate(${-parallaxX * 0.2}px, ${-parallaxY * 0.2}px)`,
            transition: 'transform 0.1s ease-out',
            animationDelay: '1.5s',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)',
            top: '50%',
            right: '30%',
            transform: `translate(${parallaxX * 0.15}px, ${parallaxY * 0.15}px)`,
            transition: 'transform 0.1s ease-out',
            animationDelay: '3s',
          }}
        />
      </div>
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hexagon */}
        <div
          className="absolute w-16 h-16 border border-brand-500/30 rotate-45 animate-float"
          style={{ top: '15%', right: '10%', animationDelay: '0s' }}
        />
        <div
          className="absolute w-8 h-8 border border-cyber-500/40 rotate-12 animate-float-slow"
          style={{ top: '70%', left: '8%', animationDelay: '2s' }}
        />
        <div
          className="absolute w-12 h-12 border border-neon-500/30 rounded-full animate-float-fast"
          style={{ top: '30%', left: '5%', animationDelay: '1s' }}
        />
        <div
          className="absolute w-6 h-6 bg-brand-500/20 rounded-sm rotate-45 animate-float"
          style={{ bottom: '25%', right: '20%', animationDelay: '3s' }}
        />
        <div
          className="absolute w-20 h-20 border border-cyber-500/20 rounded-full animate-spin-slow"
          style={{ top: '60%', right: '5%' }}
        />
        {/* Grid dots */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>
      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border">
              <div className="w-2 h-2 rounded-full bg-cyber-400 animate-pulse" />
              <span className="text-xs font-mono text-cyber-400 tracking-widest uppercase">
                Available for opportunities
              </span>
            </div>

            {/* Typewriter */}
            <div className="space-y-2">
              <div className="h-16 md:h-20 flex items-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  <span className="gradient-text">{displayText}</span>
                  <span
                    className={`inline-block w-0.5 h-10 bg-cyber-400 ml-1 align-middle ${
                      isTyping ? 'animate-blink' : 'opacity-0'
                    }`}
                  />
                </h1>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                Crafting intelligent web experiences at the intersection of{' '}
                <span className="text-brand-400">full-stack development</span> and{' '}
                <span className="text-cyber-400">machine learning</span>.
              </p>
            </div>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'React', 'Node.js', 'ML/AI', 'Next.js']?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono glass neon-border text-slate-300 hover:text-white hover:shadow-glow-cyan transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleExplore}
                className="group relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-glow-lg hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore My Work
                  <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-cyber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={handleLab}
                className="group px-6 py-3 rounded-xl font-semibold glass neon-border text-slate-300 hover:text-white hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <BeakerIcon className="w-4 h-4 text-cyber-400" />
                  Enter Developer Lab
                </span>
              </button>
            </div>
          </div>

          {/* Right: Visual element */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="relative w-80 h-80"
              style={{
                transform: `translate(${parallaxX * 0.1}px, ${parallaxY * 0.1}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* Central orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full glass-strong neon-border animate-pulse-glow flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text font-jakarta">AP</div>
                    <div className="text-xs font-mono text-cyber-400 mt-1 tracking-widest">DEVELOPER</div>
                  </div>
                </div>
              </div>

              {/* Orbiting elements */}
              {[
                { label: 'Python', color: '#6366f1', delay: '0s', size: 'w-12 h-12' },
                { label: 'React', color: '#06b6d4', delay: '-5s', size: 'w-10 h-10' },
                { label: 'ML', color: '#f472b6', delay: '-10s', size: 'w-11 h-11' },
                { label: 'Node', color: '#818cf8', delay: '-15s', size: 'w-9 h-9' },
              ]?.map((item, i) => (
                <div
                  key={item?.label}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    animation: `orbit ${15 + i * 3}s linear infinite`,
                    animationDelay: item?.delay,
                  }}
                >
                  <div
                    className={`${item?.size} rounded-xl glass flex items-center justify-center text-xs font-mono font-bold`}
                    style={{
                      border: `1px solid ${item?.color}40`,
                      color: item?.color,
                      boxShadow: `0 0 10px ${item?.color}30`,
                    }}
                  >
                    {item?.label}
                  </div>
                </div>
              ))}

              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-brand-500/10 animate-spin-slow" />
              <div
                className="absolute inset-4 rounded-full border border-cyber-500/10"
                style={{ animation: 'spin 15s linear infinite reverse' }}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border border-slate-600 flex items-start justify-center p-1 group-hover:border-brand-500 transition-colors">
              <div className="w-1 h-2 bg-brand-400 rounded-full animate-bounce-soft" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
