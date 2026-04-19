'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, CpuChipIcon, ChartBarIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

const GithubHeatmap = dynamic(() => import('@/components/ui/GithubHeatmap'), { ssr: false });

const journey = [
  {
    year: '2023',
    title: 'Started Learning Python',
    subtitle: 'The Beginning',
    description: 'Dove into Python programming, mastering fundamentals, data structures, and automation. Built small projects to solidify understanding.',
    icon: AcademicCapIcon,
    color: '#ffffff',
    tags: ['Python', 'Algorithms', 'Automation'],
    size: 'col-span-2 row-span-1',
  },
  {
    year: '2024',
    title: 'Machine Learning Projects',
    subtitle: 'AI Exploration',
    description: 'Built 5+ ML models solving real‑world problems. Explored scikit‑learn, pandas, and deep learning frameworks.',
    icon: CpuChipIcon,
    color: '#e2e8f0',
    tags: ['ML', 'TensorFlow', 'Pandas', 'scikit-learn'],
    size: 'col-span-1 row-span-2',
  },
  {
    year: '2024',
    title: 'Full Stack Web Development',
    subtitle: 'Building Products',
    description: 'Mastered React, Node.js, and Express. Built complete web applications with real‑time features.',
    icon: CodeBracketIcon,
    color: '#cbd5e1',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    size: 'col-span-1 row-span-1',
  },
  {
    year: '2025',
    title: 'AI & Data Analytics',
    subtitle: 'Intelligent Systems',
    description: 'Combined web development with AI/ML to build intelligent applications. AI internship at OCAC Bhubaneswar — OCR, prediction models, data analytics dashboards.',
    icon: ChartBarIcon,
    color: '#94a3b8',
    tags: ['OCR', 'Analytics', 'Streamlit', 'SQL'],
    size: 'col-span-2 row-span-1',
  },
];

const stats = [
  { label: 'Projects Built', value: 10, suffix: '+', color: '#ffffff' },
  { label: 'ML Models', value: 5, suffix: '+', color: '#e2e8f0' },
  { label: 'Technologies', value: 15, suffix: '+', color: '#cbd5e1' },
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-brand-500" />
            <span className="text-brand-400 font-mono text-sm tracking-widest uppercase">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Developer{' '}
            <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Bio — the human story */}
        <motion.div
          className="mb-12 p-6 rounded-2xl glass neon-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
        >
          <div className="flex items-center gap-2 mb-4">
            <SparklesIcon className="w-5 h-5 text-brand-400" />
            <span className="text-brand-400 font-mono text-xs tracking-widest uppercase">Who I Am</span>
          </div>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              I am a <span className="text-white font-medium">full stack engineer</span> focused on building
              reliable products from idea to deployment, with hands-on ownership across frontend, backend, and data workflows.
            </p>
            <p>
              My core strength is combining <span className="text-white font-medium">application engineering</span>{' '}
              with <span className="text-white font-medium">applied machine learning</span> to solve practical
              business problems with measurable outcomes.
            </p>
            <p>
              I currently work with <span className="text-white font-medium">React/Next.js</span>,{' '}
              <span className="text-white font-medium">Node.js</span>, and Python ML tooling, and I prioritize
              clean architecture, maintainable code, and fast iteration.
            </p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
          {journey.map((item, i) => {
            const Icon = item.icon;
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={i}
                className={`${item.size} relative rounded-2xl glass neon-border overflow-hidden cursor-pointer group`}
                style={{ borderColor: `${item.color}30` }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}12 0%, transparent 70%)` }}
                />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-1 rounded-full"
                      style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: item.color }}>
                      {item.subtitle}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-mono"
                            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}20` }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {!isExpanded && <p className="text-slate-500 text-xs mt-1">Click to expand →</p>}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20"
                  style={{ background: `radial-gradient(circle at 100% 100%, ${item.color} 0%, transparent 70%)` }} />
              </motion.div>
            );
          })}

          {/* Stats card */}
          <motion.div
            className="col-span-1 row-span-1 rounded-2xl glass neon-border p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Stats</p>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                  <span className="font-bold text-lg" style={{ color: stat.color }}>
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GitHub Heatmap Premium Feature */}
        <motion.div
          className="mt-16 w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <GithubHeatmap />
        </motion.div>
      </div>
    </section>
  );
}
