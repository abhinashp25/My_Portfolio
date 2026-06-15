'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ProfilePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, slightly dampened spring — Apple's "settling" feel
  const springCfg = { stiffness: 110, damping: 30, mass: 1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springCfg);

  const onMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    let cx: number, cy: number;
    if ('touches' in e) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
    } else {
      cx = (e as React.MouseEvent).clientX;
      cy = (e as React.MouseEvent).clientY;
    }
    mouseX.set((cx - r.left) / r.width - 0.5);
    mouseY.set((cy - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[400px] mx-auto p-4 sm:p-6">

      {/* 3D tilt card */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 2400 }}
        onMouseMove={onMove}
        onTouchMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onTouchStart={() => setHovered(true)}
        onMouseLeave={onLeave}
        onTouchEnd={onLeave}
        className="relative z-10 w-full aspect-[4/5] cursor-pointer"
      >
        {/* Glass card frame — clean, no RGB */}
        <div
          className="relative w-full h-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.40)',
            boxShadow: hovered
              ? '0 2px 0 rgba(255,255,255,0.7) inset, 0 32px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06)'
              : '0 2px 0 rgba(255,255,255,0.6) inset, 0 20px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
            transition: 'box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Inner image — inset bezel */}
          <div className="absolute inset-[4px] sm:inset-[5px] rounded-[2.2rem] sm:rounded-[2.7rem] overflow-hidden bg-slate-900">
            <Image
              src="/assets/images/abhinash.jpg"
              alt="Abhinash Pradhan"
              fill
              className="object-cover object-center"
              style={{
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)',
                filter: 'brightness(0.92) contrast(1.05)',
              }}
              quality={90}
              priority
              sizes="(max-width: 768px) 300px, 400px"
            />

            {/* Bottom gradient for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />

            {/* Name & title */}
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col items-center z-20 pointer-events-none">
              <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                Abhinash Pradhan
              </h3>
              <p className="text-white/60 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] mt-1 uppercase">
                Full Stack Engineer
              </p>
            </div>
          </div>

          {/* Top specular line */}
          <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30" />
        </div>

        {/* Available badge — dark in dark mode, light in light mode */}
        <motion.div
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-40"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 260, damping: 22 }}
        >
          {/* Light mode: white pill. Dark mode: dark pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-slate-200/80 dark:border-neutral-800/80 shadow-[0_4px_16px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
            </span>
            <span className="text-slate-900 dark:text-white font-semibold font-mono text-[9px] sm:text-[10px] tracking-widest uppercase">
              Available
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
