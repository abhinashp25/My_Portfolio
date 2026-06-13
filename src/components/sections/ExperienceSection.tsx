'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { SectionHeading } from '../ui/SectionHeading';

const timelineItems = [
  {
    year: 'Jul 2024',
    side: 'left' as const,
    type: 'Internship',
    title: 'Python Internship',
    company: 'Moniba Technology & Innovations',
    location: 'Kolkata, West Bengal',
    description: 'Automated internal workflows by developing Python scripts, reducing manual data entry efforts by 30%. Engineered highly testable logic and applied clean OOP design principles to ensure long-term codebase scalability.',
    skills: ['Python', 'OOP', 'Automation', 'Data Structures', 'Scripting'],
    image: '/logos/MONIBATECH.png',
    color: '#6366f1',
    certId: '20240905MON0030',
  },
  {
    year: '2024',
    side: 'right' as const,
    type: 'Internship',
    title: 'AI / ML Internship',
    company: 'OCAC — Odisha Computer Application Centre',
    location: 'Bhubaneswar, Odisha',
    description: 'Accelerated public-sector digital workflows by engineering accurate OCR-driven document pipelines. Designed and deployed interactive Streamlit analytics dashboards, translating complex predictive models into actionable insights for operational teams.',
    skills: ['Python', 'AI/ML', 'OCR', 'Computer Vision', 'Streamlit', 'SQL', 'Deep Learning', 'Data Analytics'],
    image: '/logos/ocac_logo.jpeg',
    color: '#818cf8',
    certId: null,
  },
  {
    year: '2024–2025',
    side: 'left' as const,
    type: 'Development',
    title: 'Full Stack Development',
    company: 'Freelance & Personal Projects',
    location: 'India',
    description: 'Led end-to-end development of robust full-stack products including Chatify, achieving sub-100ms real-time messaging latency using Socket.io and React. Designed scalable Node.js/MongoDB backend architectures with secure JWT auth flows.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'TypeScript', 'REST APIs'],
    image: '/assets/images/abhinash.jpg',
    color: '#f472b6',
    certId: null,
  },
  {
    year: '2024–2026',
    side: 'right' as const,
    type: 'Research & Projects',
    title: 'Machine Learning & AI Development',
    company: 'Self-Directed / Academic',
    location: 'India',
    description: 'Delivered an invoice payment date prediction model achieving 87% accuracy using Gradient Boosting. Built scalable OCR and computer-vision pipelines, significantly reducing processing times for real-world image datasets.',
    skills: ['Python', 'scikit-learn', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Feature Engineering', 'CNN', 'OCR'],
    image: '/assets/images/abhinash.jpg',
    color: '#06b6d4',
    certId: null,
  },
];

// Individual Timeline Card with iOS-quality spring animation
function TimelineCard({
  item,
  index,
}: {
  item: typeof timelineItems[0];
  index: number;
}) {
  const isLeft = item.side === 'left';

  return (
    <div
      className={`relative md:flex md:items-center gap-8 lg:gap-16 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Card */}
      <div className={`flex-1 flex ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
        <motion.div
          initial={{
            opacity: 0,
            x: isLeft ? -60 : 60,
            y: 20,
            scale: 0.94,
            filter: 'blur(8px)',
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 18,
            mass: 0.9,
            delay: index * 0.05,
            filter: { duration: 0.5, ease: 'easeOut' },
          }}
          whileHover={{
            y: -6,
            scale: 1.012,
            transition: {
              type: 'spring',
              stiffness: 350,
              damping: 25,
            },
          }}
          className="group relative w-full md:max-w-lg rounded-[2rem] p-6 sm:p-8 bg-white/[0.01] border border-black/10 dark:border-white/10 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-opacity-30 transition-colors duration-500 overflow-hidden will-change-transform"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {/* Animated background glow on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 mix-blend-screen"
            style={{
              background: `radial-gradient(circle at ${isLeft ? '100% 0%' : '0% 0%'}, ${item.color}18, transparent 65%)`,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Top accent line that animates in */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)` }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: index * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative z-10 flex flex-col gap-5">
            {/* Header: Logo + Title */}
            <div className="flex items-center gap-4">
              <motion.div
                className="relative w-14 h-14 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
                whileHover={{ scale: 1.08, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Image
                  src={item.image}
                  alt={item.company}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </motion.div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold mt-0.5" style={{ color: item.color }}>
                  {item.company}
                </p>
              </div>
            </div>

            {/* Meta: Type, Year, Location */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[10px] sm:text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
              >
                {item.type}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-white/50">{item.year}</span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-white/30 hidden sm:inline-block">•</span>
              <span className="text-[11px] font-mono text-slate-400 dark:text-white/35">{item.location}</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-white/60 text-sm sm:text-[15px] leading-relaxed font-light">
              {item.description}
            </p>

            {/* Cert ID */}
            {item.certId && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-white/30 font-mono">
                  Credential ID:
                </span>
                <span className="text-xs font-mono text-slate-600 dark:text-white/60">{item.certId}</span>
              </div>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {item.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 18,
                    delay: index * 0.04 + si * 0.03 + 0.25,
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-lg font-mono bg-black/5 dark:bg-white/5 text-slate-700 dark:text-white/70 border border-black/8 dark:border-white/8"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Center node (desktop only) */}
      <div className="hidden md:flex w-12 h-12 flex-shrink-0 items-center justify-center relative z-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            delay: index * 0.05 + 0.1,
          }}
          className="relative"
        >
          {/* Outer pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${item.color}`, transform: 'scale(1)' }}
            animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
          />
          {/* Inner dot */}
          <div
            className="w-4 h-4 rounded-full border-2 bg-slate-50 dark:bg-[#0a0a0a]"
            style={{
              borderColor: item.color,
              boxShadow: `0 0 16px ${item.color}70, 0 0 6px ${item.color}50`,
            }}
          />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Buttery spring-smoothed line draw
  const rawLineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineHeight = useSpring(rawLineHeight, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  return (
    <section id="experience" ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Experience &"
          highlight="Timeline"
          badge="Career Journey"
          align="center"
        />

        <motion.div
          className="mb-24 text-center max-w-2xl mx-auto -mt-4"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-slate-500 dark:text-white/50 text-lg leading-relaxed font-light">
            A vertical journey through internships, specialized projects, and full stack milestones.
          </p>
        </motion.div>

        <div className="relative">
          {/* Static background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5 -translate-x-1/2 hidden md:block" />

          {/* Spring-driven glowing progress line */}
          <motion.div
            className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 hidden md:block z-10 rounded-full origin-top"
            style={{
              height: lineHeight,
              background: 'linear-gradient(to bottom, #6366f1, #818cf8, #f472b6, #06b6d4)',
              boxShadow: '0 0 12px rgba(129, 140, 248, 0.6), 0 0 30px rgba(129, 140, 248, 0.25)',
            }}
          />

          <div className="space-y-12 md:space-y-24">
            {timelineItems.map((item, i) => (
              <TimelineCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}