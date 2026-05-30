import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ 
  title, 
  highlight, 
  badge, 
  align = 'left'
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  
  return (
    <div className={`flex flex-col ${alignClass} mb-12 relative z-10 block`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative group"
      >
        <div className={`flex flex-col ${alignClass} px-6 py-5 md:px-10 md:py-8 rounded-3xl backdrop-blur-xl bg-white/30 dark:bg-black/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-colors duration-500 hover:bg-white/40 dark:hover:bg-white/5`}>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>

          {badge && (
            <div className="flex items-center gap-3 mb-4 relative z-10">
              {align === 'center' && <div className="h-px w-8 sm:w-10 bg-slate-300 dark:bg-white/20" />}
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-white/60 tracking-[0.2em] uppercase">
                {badge}
              </span>
              <div className="h-px w-8 sm:w-10 bg-slate-300 dark:bg-white/20" />
            </div>
          )}

          <h2 className="relative z-10 text-3xl md:text-5xl lg:text-[3.5rem] font-black text-slate-800 dark:text-white/90 tracking-tight leading-tight">
            {title}{' '}
            {highlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-500">
                {highlight}
              </span>
            )}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}