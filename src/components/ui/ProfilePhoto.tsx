'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ProfilePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Elegant, heavy spring for premium "Apple-like" feel
  const springCfg = { stiffness: 120, damping: 25, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg);
  
  // Dynamic light glare effect
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']), springCfg);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']), springCfg);

  const onMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    mouseX.set((clientX - r.left) / r.width - 0.5);
    mouseY.set((clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[420px] mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* Intense Ambient Glow behind the card */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(56, 189, 248, 0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ 
          scale: hovered ? 1.1 : 1,
          opacity: hovered ? 1 : 0.7 
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 2000 }}
        onMouseMove={onMove}
        onTouchMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onTouchStart={() => setHovered(true)}
        onMouseLeave={onLeave}
        onTouchEnd={onLeave}
        className="relative z-10 w-full aspect-[4/5] cursor-pointer"
      >
        {/* The Premium Glass Card */}
        <div 
          className="relative w-full h-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden"
          style={{
            background: 'rgba(10, 10, 15, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: hovered 
              ? '0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3)'
              : '0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
            transition: 'box-shadow 0.5s ease, border 0.5s ease',
          }}
        >
          {/* Inner Image Container with perfect masking */}
          <div className="absolute inset-[6px] sm:inset-[8px] rounded-[2.2rem] sm:rounded-[2.6rem] overflow-hidden bg-[#050505]">
            <Image
              src="/assets/images/abhinash.jpg"
              alt="Abhinash Pradhan"
              fill
              className="object-cover object-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              style={{
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                filter: 'brightness(0.95) contrast(1.05)',
              }}
              quality={100}
              priority
              sizes="(max-width: 768px) 300px, 400px"
            />
            
            {/* Dynamic Glare/Light Reflection Layer */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                opacity: hovered ? 1 : 0,
              }}
            />
            
            {/* Bottom Gradient for Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

            {/* Name & Title inside the glass */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col items-center justify-end z-30 pointer-events-none">
              <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight drop-shadow-lg">
                Abhinash Pradhan
              </h3>
              <p className="text-white/70 font-mono text-[10px] sm:text-xs tracking-[0.2em] mt-1.5 uppercase drop-shadow-md">
                Full Stack Engineer
              </p>
            </div>
          </div>
        </div>

        {/* Floating "Available" Badge - Popping out in 3D space */}
        <motion.div
          className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-40 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
          style={{ transform: 'translateZ(50px)' }} // Pops out of the card
        >
          <div className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-slate-50 dark:bg-dark-900/80 backdrop-blur-xl border border-black/20 dark:border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]">
            <span className="relative flex w-2 h-2 sm:w-2.5 sm:h-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-900 dark:text-white/90 font-semibold font-mono text-[9px] sm:text-[10px] tracking-widest uppercase">
              Available
            </span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
