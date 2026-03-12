'use client';

import { useEffect, useRef, useState } from 'react';
import { CodeBracketIcon, CpuChipIcon, ChartBarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';



const journey = [
  {
    year: '2021',
    title: 'Started Learning Python',
    subtitle: 'The Beginning',
    description:
      'Dove into Python programming, mastering fundamentals, data structures, and automation. Built small projects to solidify understanding.',
    icon: AcademicCapIcon,
    color: '#6366f1',
    tags: ['Python', 'Algorithms', 'Automation'],
    size: 'col-span-2 row-span-1',
  },
  {
    year: '2022',
    title: 'Machine Learning Projects',
    subtitle: 'AI Exploration',
    description:
      'Built 5+ ML models solving real-world problems. Explored scikit-learn, pandas, and deep learning frameworks.',
    icon: CpuChipIcon,
    color: '#06b6d4',
    tags: ['ML', 'TensorFlow', 'Pandas', 'scikit-learn'],
    size: 'col-span-1 row-span-2',
  },
  {
    year: '2023',
    title: 'Full Stack Web Development',
    subtitle: 'Building Products',
    description:
      'Mastered React, Node.js, and Express. Built complete web applications with real-time features.',
    icon: CodeBracketIcon,
    color: '#f472b6',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    size: 'col-span-1 row-span-1',
  },
  {
    year: '2024',
    title: 'AI & Data Analytics',
    subtitle: 'Intelligent Systems',
    description:
      'Combined web development with AI/ML to build intelligent applications. Worked on OCR, prediction models, and data analytics dashboards.',
    icon: ChartBarIcon,
    color: '#818cf8',
    tags: ['OCR', 'Analytics', 'Streamlit', 'SQL'],
    size: 'col-span-2 row-span-1',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-brand-500" />
            <span className="text-brand-400 font-mono text-sm tracking-widest uppercase">About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Developer{' '}
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            From Python scripts to full-stack AI applications — a story of continuous learning and building.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-4 auto-rows-[200px]">
          {journey?.map((item, i) => {
            const Icon = item?.icon;
            const isExpanded = expanded === i;
            return (
              <div
                key={i}
                className={`${item?.size} relative rounded-2xl glass neon-border overflow-hidden cursor-pointer group transition-all duration-500 hover:shadow-glow ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  borderColor: `${item?.color}30`,
                }}
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${item?.color}10 0%, transparent 70%)`,
                  }}
                />
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${item?.color}20`, border: `1px solid ${item?.color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item?.color }} />
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-1 rounded-full"
                      style={{
                        background: `${item?.color}15`,
                        color: item?.color,
                        border: `1px solid ${item?.color}30`,
                      }}
                    >
                      {item?.year}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: item?.color }}>
                      {item?.subtitle}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-2">{item?.title}</h3>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-slate-400 text-sm mb-3">{item?.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item?.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full font-mono"
                            style={{
                              background: `${item?.color}15`,
                              color: item?.color,
                              border: `1px solid ${item?.color}20`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {!isExpanded && (
                      <p className="text-slate-500 text-xs mt-1">Click to expand →</p>
                    )}
                  </div>
                </div>
                {/* Corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 100% 100%, ${item?.color} 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}

          {/* Stats card */}
          <div
            className={`col-span-1 row-span-1 rounded-2xl glass neon-border p-6 flex flex-col justify-between transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Stats</p>
            <div className="space-y-3">
              {[
                { label: 'Projects Built', value: '10+', color: '#6366f1' },
                { label: 'ML Models', value: '5+', color: '#06b6d4' },
                { label: 'Technologies', value: '15+', color: '#f472b6' },
              ]?.map((stat) => (
                <div key={stat?.label} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">{stat?.label}</span>
                  <span className="font-bold text-lg" style={{ color: stat?.color }}>
                    {stat?.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
