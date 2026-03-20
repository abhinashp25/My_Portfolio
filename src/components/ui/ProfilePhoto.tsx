'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ProfilePhoto() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springCfg);
  const glowX   = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), springCfg);
  const glowY   = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), springCfg);

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
    <div className="relative flex items-center justify-center"
         style={{ width: 440, height: 480 }}>

      {/* ── SVG Filters ── */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="liqglass" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018"
              numOctaves="4" seed="5" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise"
              scale="7" xChannelSelector="R" yChannelSelector="G" result="disp"/>
            <feGaussianBlur in="disp" stdDeviation="0.3" result="soft"/>
            <feComposite in="soft" in2="SourceGraphic" operator="atop"/>
          </filter>
        </defs>
      </svg>

      {/* ── Outer ambient glow ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(6,182,212,0.18) 45%, transparent 70%)',
          filter: 'blur(28px)',
        }}
        animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.5 }}
      />

      {/* ── Slow-spin rings ── */}
      {[380, 410, 440].map((sz, i) => (
        <motion.div
          key={sz}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: sz, height: sz,
            border: `1px solid ${['#6366f1','#06b6d4','#f472b6'][i]}`,
            opacity: 0.18 - i * 0.04,
          }}
          animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 20 + i * 7, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* ── Orbiting color dots ── */}
      {[
        { c: '#6366f1', r: 200, dur: 5,  start: 0   },
        { c: '#06b6d4', r: 200, dur: 7,  start: 120 },
        { c: '#f472b6', r: 200, dur: 6,  start: 240 },
      ].map((dot, i) => (
        <motion.div key={i}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{ background: dot.c, boxShadow: `0 0 14px ${dot.c}, 0 0 28px ${dot.c}60` }}
          animate={{
            x: [0,1,2,3].map(s => Math.cos(((dot.start + s*90)*Math.PI)/180)*dot.r),
            y: [0,1,2,3].map(s => Math.sin(((dot.start + s*90)*Math.PI)/180)*dot.r),
          }}
          transition={{ duration: dot.dur, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* ── Main 3D card ── */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        className="relative cursor-pointer"
        // Large rounded rectangle — not tiny circle
        // 320 × 400 → tall portrait frame
      >
        {/* Photo frame — large portrait */}
        <div
          className="relative overflow-hidden"
          style={{
            width: 300,
            height: 380,
            borderRadius: '28px',
            filter: 'url(#liqglass)',
          }}
        >
          <Image
            src="/assets/images/abhinash.jpg"
            alt="Abhinash Pradhan"
            fill
            className="object-cover object-top"
            priority
            sizes="300px"
          />

          {/* Glass sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: hovered
                ? 'linear-gradient(145deg, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.07) 50%, rgba(244,114,182,0.08) 100%)'
                : 'linear-gradient(145deg, rgba(99,102,241,0.05) 0%, transparent 60%)',
              transition: 'background 0.4s',
            }}
          />

          {/* Top-left light catch — glass feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, transparent 38%, rgba(255,255,255,0.04) 100%)',
            }}
          />

          {/* Dynamic mouse highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]: number[]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18) 0%, transparent 55%)`
              ),
            }}
          />

          {/* Bottom gradient for name tag readability */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%)',
            }}
          />

          {/* Name inside frame at bottom */}
          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
            <p className="text-white font-bold text-sm tracking-wide font-jakarta">Abhinash Pradhan</p>
            <p className="font-mono text-[10px] tracking-widest mt-0.5" style={{ color: '#06b6d4' }}>
              DEVELOPER · AI / ML
            </p>
          </div>
        </div>

        {/* Glass border frame */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '28px',
            boxShadow: `
              inset 0 0 0 1.5px rgba(255,255,255,0.20),
              inset 0 0 0 3px rgba(99,102,241,0.30),
              0 0 50px rgba(99,102,241,0.45),
              0 0 100px rgba(6,182,212,0.20),
              0 30px 60px rgba(0,0,0,0.5)
            `,
          }}
        />

        {/* Status badge — top right corner */}
        <motion.div
          className="absolute -top-3 -right-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(15,23,42,0.90)',
              border: '1px solid rgba(74,222,128,0.5)',
              boxShadow: '0 0 16px rgba(74,222,128,0.25)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-mono text-[10px] tracking-wider">OPEN TO WORK</span>
          </div>
        </motion.div>

        {/* 3D depth shadow layer */}
        <motion.div
          className="absolute -inset-3 rounded-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.3), transparent 70%)',
            filter: 'blur(20px)',
            transform: 'translateZ(-12px)',
            opacity: hovered ? 0.9 : 0.5,
          }}
        />
      </motion.div>

      {/* ── Floating skill chips ── */}
      {[
        { label: 'Python',  color: '#6366f1', x: -165, y: -80  },
        { label: 'React',   color: '#06b6d4', x:  170, y: -60  },
        { label: 'ML / AI', color: '#f472b6', x: -175, y:  80  },
        { label: 'Node.js', color: '#818cf8', x:  168, y:  90  },
      ].map((chip, i) => (
        <motion.div
          key={chip.label}
          className="absolute font-mono text-[11px] font-bold px-3 py-1.5 rounded-xl pointer-events-none"
          style={{
            left: `calc(50% + ${chip.x}px)`,
            top:  `calc(50% + ${chip.y}px)`,
            transform: 'translate(-50%, -50%)',
            background: `${chip.color}18`,
            border: `1px solid ${chip.color}55`,
            color: chip.color,
            boxShadow: `0 0 12px ${chip.color}35`,
          }}
          animate={{ y: [0, -7, 0], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          {chip.label}
        </motion.div>
      ))}
    </div>
  );
}
