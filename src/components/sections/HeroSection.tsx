'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useMousePosition } from '@/hooks/useMousePosition';
import dynamic from 'next/dynamic';

const ProfilePhoto = dynamic(() => import('@/components/ui/ProfilePhoto'), { ssr: false });

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const { x, y } = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);

  const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle magnetic cursor effect calculation
  const px = (x / windowSize.w - 0.5) * 50;
  const py = (y / windowSize.h - 0.5) * 50;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-dark-900">
      
      {/* High-end ambient background glow following cursor gently */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
            top: '50%', left: '50%',
            marginTop: '-400px', marginLeft: '-400px', // Center it
            transform: `translate(${px}px, ${py}px)`,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 200 }}
        />
        {/* Subtle grid pattern barely visible */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-16 pt-32 lg:pt-20 pb-16 lg:pb-0 min-h-screen">
        
        {/* Left: Typography Focus */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 sm:space-y-8 max-w-2xl w-full order-2 lg:order-1"
        >
          {/* Subtle Availability Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium text-slate-900 dark:text-white/70 tracking-wide uppercase">
                Available for full-time roles
              </span>
            </div>
          </motion.div>

          {/* Massive, clean headline */}
          <motion.div variants={item} className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-900 dark:text-white leading-[1.05] tracking-tight">
              Abhinash Pradhan.
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-medium text-slate-900 dark:text-white/40 leading-[1.1] tracking-tight">
              Crafting scalable systems & AI solutions.
            </h2>
          </motion.div>

          {/* Refined Bio */}
          <motion.p variants={item} className="text-slate-900 dark:text-white/50 text-base sm:text-lg md:text-xl leading-relaxed max-w-[500px] font-light mx-auto lg:mx-0">
            I engineer production-grade applications that merge modern full-stack development with applied machine learning to solve complex problems and deliver exceptional user experiences.
          </motion.p>

          {/* Polished Call to action */}
          <motion.div variants={item} className="pt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <button
              onClick={() => scrollTo('projects')}
              className="group relative px-6 py-3 rounded-full bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-medium text-sm overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto flex justify-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Work
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <a
              href="/resume.pdf"
              download="Abhinash_Pradhan_Resume.pdf"
              className="group relative px-6 py-3 rounded-full border border-black/20 dark:border-white/20 bg-transparent text-slate-900 dark:text-white font-medium text-sm transition-all hover:bg-black/10 dark:bg-white/10 hover:border-white/40 active:scale-[0.98] flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <svg className="w-4 h-4 text-slate-900 dark:text-white/70 group-hover:text-slate-900 dark:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Premium Glass Profile Photo */}
        <motion.div
          className="flex flex-1 justify-center lg:justify-end w-full lg:w-auto relative z-20 order-1 lg:order-2 mb-8 lg:mb-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full lg:h-full flex items-center justify-center lg:justify-end lg:pr-10">
            <div className="relative z-10 w-full flex items-center justify-center">
               <ProfilePhoto />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}