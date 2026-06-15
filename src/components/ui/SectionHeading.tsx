'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  badge?: string; // Kept in interface to prevent compilation errors
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  highlight,
  align = 'left',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      className={`mb-6 flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
        className={`text-xl md:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-slate-800 dark:text-white/90`}
      >
        {title}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-500">
            {highlight}
          </span>
        )}
      </h2>
    </motion.div>
  );
}