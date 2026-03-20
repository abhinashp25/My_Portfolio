'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useMousePosition } from '@/hooks/useMousePosition';
import dynamic from 'next/dynamic';

const ProfilePhoto = dynamic(() => import('@/components/ui/ProfilePhoto'), { ssr: false });

const texts = [
  'Full Stack Developer',
  'AI / ML Enthusiast',
  'Building Intelligent Web Apps',
  'Open to Opportunities',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.35 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const { displayText, isTyping } = useTypewriter({ texts, typeSpeed: 70, deleteSpeed: 35, pauseDuration: 2200 });
  const { x, y } = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);

  const px = (x / (typeof window !== 'undefined' ? window.innerWidth : 1) - 0.5) * 18;
  const py = (y / (typeof window !== 'undefined' ? window.innerHeight : 1) - 0.5) * 18;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #6366f130 0%, transparent 70%)',
            top: '5%', left: '10%',
            transform: `translate(${px * 0.25}px, ${py * 0.25}px)`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #06b6d420 0%, transparent 70%)',
            bottom: '10%', right: '5%',
            transform: `translate(${-px * 0.2}px, ${-py * 0.2}px)`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.4, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #f472b618 0%, transparent 70%)',
            top: '45%', right: '28%',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { cls: 'w-14 h-14 border border-brand-500/30 rotate-45', style: { top: '14%', right: '9%' }, anim: 'animate-float' },
          { cls: 'w-7 h-7 border border-cyber-500/40 rotate-12', style: { top: '72%', left: '7%' }, anim: 'animate-float-slow' },
          { cls: 'w-10 h-10 border border-neon-500/30 rounded-full', style: { top: '28%', left: '4%' }, anim: 'animate-float-fast' },
          { cls: 'w-5 h-5 bg-brand-500/20 rounded-sm rotate-45', style: { bottom: '22%', right: '18%' }, anim: 'animate-float' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className={`absolute ${s.cls} ${s.anim}`}
            style={s.style as React.CSSProperties}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.2, duration: 1 }}
          />
        ))}
      </div>

      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.95fr] gap-10 items-start pt-8">

          {/* ─── Left: Text ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-7"
          >
            {/* Status badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass neon-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs font-mono text-green-400 tracking-widest uppercase">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={item}>
              <p className="text-cyber-400 font-mono text-sm tracking-[0.25em] uppercase mb-3">
                Hello, I'm
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.05] tracking-tight">
                Abhinash
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #f472b6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Pradhan
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={item} className="h-9 flex items-center gap-2">
              <span className="w-1.5 h-7 rounded-full bg-brand-500 opacity-80" />
              <span className="text-xl text-slate-300 font-mono">
                {displayText}
                <span
                  className={`inline-block w-0.5 h-5 bg-cyber-400 ml-0.5 align-middle ${isTyping ? 'animate-blink' : 'opacity-0'}`}
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item} className="text-slate-400 text-lg leading-relaxed max-w-[480px]">
              Crafting intelligent web experiences at the intersection of{' '}
              <span className="text-brand-400 font-medium">full‑stack development</span> and{' '}
              <span className="text-cyber-400 font-medium">machine learning</span>.
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={item} className="flex flex-wrap gap-2">
              {['Python', 'React', 'Node.js', 'ML / AI', 'Next.js'].map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-full text-xs font-mono glass neon-border text-slate-300 hover:text-white hover:shadow-glow-cyan cursor-default transition-colors duration-300"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              {/* View Projects */}
              <motion.button
                onClick={() => scrollTo('projects')}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.6)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-7 py-3.5 rounded-xl font-semibold text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowDownIcon className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-brand-400 to-cyber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              {/* Download Resume */}
              <motion.a
                href="/resume.pdf"
                download="Abhinash_Pradhan_Resume.pdf"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(6,182,212,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold glass neon-border text-slate-300 hover:text-white hover:shadow-glow-cyan transition-colors duration-300"
              >
                <ArrowDownTrayIcon className="w-4 h-4 text-cyber-400" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Quick info row */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/abhinashp25"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-brand-400 transition-colors"
              >
                <span style={{ color: '#6366f1' }}>▸</span> github.com/abhinashp25
              </a>
              <span className="text-slate-700">·</span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                <span style={{ color: '#06b6d4' }}>▸</span> Bhubaneswar, Odisha
              </span>
            </motion.div>
          </motion.div>

          {/* ─── Right: Profile Photo ─── */}
          <motion.div
            className="hidden lg:flex items-start justify-center pt-4"
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProfilePhoto />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border border-slate-600 flex items-start justify-center p-1 group-hover:border-brand-500 transition-colors">
              <div className="w-1 h-2 bg-brand-400 rounded-full animate-bounce-soft" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
