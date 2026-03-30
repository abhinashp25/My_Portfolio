'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ProfilePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springCfg);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <div className="relative flex items-center justify-center p-8">
      
      {/* Extremely subtle backdrop glow */}
      <motion.div
        className="absolute w-[400px] h-[500px] rounded-[40px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{ scale: hovered ? 1.05 : 1, opacity: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      />

      {/* Main 3D premium card */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="relative cursor-pointer z-10"
      >
        <div
          className="relative overflow-hidden group"
          style={{
            width: 340,
            height: 440,
            borderRadius: '24px',
            backgroundColor: '#050505',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: hovered 
              ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.05)'
              : '0 20px 40px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.4s ease-out, border 0.4s ease-out',
          }}
        >
          {/* Unfiltered, perfectly crisp professional image */}
          <div className="absolute inset-x-2 top-2 bottom-16 rounded-xl overflow-hidden bg-dark-900 border border-white/5">
            <Image
              src="/assets/images/abhinash.jpg"
              alt="Abhinash Pradhan"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              quality={100}
              priority
              sizes="340px"
            />
          </div>

          {/* Minimalist name tag at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-white font-medium text-[15px] tracking-wide font-jakarta">Abhinash Pradhan</p>
            <p className="text-white/40 font-mono text-[10px] tracking-[0.2em] mt-0.5 uppercase">
              Full Stack Engineer
            </p>
          </div>
        </div>

        {/* Minimalist 'Open to Work' badge */}
        <motion.div
          className="absolute -top-3 -right-3 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-900/90 border border-white/10 shadow-glass backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/80 font-medium text-[10px] tracking-widest uppercase">Available</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
