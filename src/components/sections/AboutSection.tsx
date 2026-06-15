'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBracketIcon, CpuChipIcon, ChartBarIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { SectionHeading } from '../ui/SectionHeading';

const journey = [
  {
    year: '2023',
    title: 'Started Learning Python',
    subtitle: 'The Beginning',
    description: 'Dove into Python programming, mastering fundamentals, data structures, and automation. Built small projects to solidify understanding.',
    icon: AcademicCapIcon,
    color: '#6366f1',
    tags: ['Python', 'Algorithms', 'Automation'],
    size: 'col-span-2 row-span-1',
  },
  {
    year: '2024',
    title: 'Machine Learning Projects',
    subtitle: 'AI Exploration',
    description: 'Built 5+ ML models solving real‑world problems. Explored scikit‑learn, pandas, and deep learning frameworks.',
    icon: CpuChipIcon,
    color: '#06b6d4',
    tags: ['ML', 'TensorFlow', 'Pandas', 'scikit-learn'],
    size: 'col-span-1 row-span-2',
  },
  {
    year: '2024',
    title: 'Full Stack Web Development',
    subtitle: 'Building Products',
    description: 'Mastered React, Node.js, and Express. Built complete web applications with real‑time features.',
    icon: CodeBracketIcon,
    color: '#f472b6',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    size: 'col-span-1 row-span-1',
  },
  {
    year: '2025',
    title: 'AI & Data Analytics',
    subtitle: 'Intelligent Systems',
    description: 'Combined web development with AI/ML to build intelligent applications. AI internship at OCAC Bhubaneswar — OCR, prediction models, data analytics dashboards.',
    icon: ChartBarIcon,
    color: '#10b981',
    tags: ['OCR', 'Analytics', 'Streamlit', 'SQL'],
    size: 'col-span-2 row-span-1',
  },
];

const stats = [
  { label: 'Projects Built', value: 10, suffix: '+', color: '#6366f1' },
  { label: 'ML Models', value: 5, suffix: '+', color: '#06b6d4' },
  { label: 'Technologies', value: 15, suffix: '+', color: '#f472b6' },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [to]);

  return <>{count}{suffix}</>;
}

export default function AboutSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <SectionHeading title="Developer" highlight="Journey" badge="About Me" />

        {/* ── Bio card — Apple liquid glass ── */}
        <motion.div
          className="about-card-glass mb-10 p-6 rounded-3xl relative overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Top specular edge */}
          <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-white/85 to-transparent pointer-events-none" />

          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
              <SparklesIcon className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <span className="text-indigo-500 font-mono text-xs tracking-widest uppercase">Who I Am</span>
          </div>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a <span className="text-slate-900 dark:text-white font-semibold">full stack engineer</span> focused on building
              reliable products from idea to deployment, with hands-on ownership across frontend, backend, and data workflows.
            </p>
            <p>
              My core strength is combining <span className="text-slate-900 dark:text-white font-semibold">application engineering</span>{' '}
              with <span className="text-slate-900 dark:text-white font-semibold">applied machine learning</span> to solve practical
              business problems with measurable outcomes.
            </p>
            <p>
              I currently work with <span className="text-slate-900 dark:text-white font-semibold">React/Next.js</span>,{' '}
              <span className="text-slate-900 dark:text-white font-semibold">Node.js</span>, and Python ML tooling, and I prioritize
              clean architecture, maintainable code, and fast iteration.
            </p>
          </div>

          {/* Ambient corner glow */}
          <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none opacity-30"
            style={{ background: 'radial-gradient(circle at 100% 100%, rgba(99,102,241,0.18) 0%, transparent 65%)' }} />
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-3 gap-4 auto-rows-[210px]">
          {journey.map((item, i) => {
            const Icon = item.icon;
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={i}
                className={`${item.size} about-card-glass relative rounded-3xl overflow-hidden cursor-pointer group`}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 280, damping: 24 } }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                style={{ willChange: 'transform' }}
              >
                {/* Top specular */}
                <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />

                {/* Color hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}12 0%, transparent 68%)` }}
                />

                {/* Content */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}35`,
                        boxShadow: `0 2px 8px ${item.color}18`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                      style={{
                        background: `${item.color}12`,
                        color: item.color,
                        border: `1px solid ${item.color}28`,
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-end mt-3">
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-1 font-semibold" style={{ color: item.color }}>
                      {item.subtitle}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">{item.title}</h3>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] px-2 py-0.5 rounded-full font-mono"
                                style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}22` }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <motion.p
                        className="text-slate-400 dark:text-slate-500 text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Tap to expand →
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Accent corner gradient */}
                <div
                  className="absolute bottom-0 right-0 w-20 h-20 opacity-15 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 100% 100%, ${item.color}, transparent 70%)` }}
                />
              </motion.div>
            );
          })}

          {/* Stats card */}
          <motion.div
            className="col-span-1 row-span-1 about-card-glass rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform' }}
          >
            {/* Top specular */}
            <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />

            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-mono uppercase tracking-widest">At a Glance</p>
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</span>
                  <span className="font-bold text-xl tabular-nums" style={{ color: stat.color }}>
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Background accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 100% 100%, #6366f1, transparent 70%)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
