'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, AcademicCapIcon, CodeBracketIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const timelineItems = [
  {
    year: 'Jul 2024',
    side: 'left' as const,
    type: 'Internship',
    title: 'Python Internship',
    company: 'Moniba Technology & Innovations',
    location: 'Kolkata, West Bengal',
    description: 'Completed intensive training in Python engineering fundamentals including OOP design, data structures, scripting automation, and practical application development. Built and refined solutions with clean coding practices and testable logic.',
    skills: ['Python', 'OOP', 'Automation', 'Data Structures', 'Scripting'],
    icon: CodeBracketIcon,
    color: '#6366f1',
    accentColor: '#4f46e5',
    certId: '20240905MON0030',
  },
  {
    year: '2024–2026',
    side: 'right' as const,
    type: 'Research & Projects',
    title: 'Machine Learning & AI Development',
    company: 'Self-Directed / Academic',
    location: 'India',
    description: 'Designed and shipped ML solutions for prediction, classification, and recommendation use cases. Delivered an invoice payment model with 87% accuracy and built computer-vision and OCR pipelines for real-world datasets. Strong focus on feature engineering, model iteration, and practical deployment.',
    skills: ['Python', 'scikit-learn', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Feature Engineering', 'CNN', 'OCR'],
    icon: CpuChipIcon,
    color: '#06b6d4',
    accentColor: '#0891b2',
    certId: null,
  },
  {
    year: '2024–2025',
    side: 'left' as const,
    type: 'Development',
    title: 'Full Stack Development',
    company: 'Freelance & Personal Projects',
    location: 'India',
    description: 'Engineered full-stack products with real-time capabilities and robust API architecture. Delivered chat and monitoring platforms using React, Node.js, and MongoDB with secure auth flows, socket-based updates, and scalable backend structure.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'TypeScript', 'REST APIs'],
    icon: BriefcaseIcon,
    color: '#f472b6',
    accentColor: '#db2777',
    certId: null,
  },
  {
    year: '2024',
    side: 'right' as const,
    type: 'Internship',
    title: 'AI / ML Internship',
    company: 'OCAC — Odisha Computer Application Centre',
    location: 'Bhubaneswar, Odisha',
    description: 'Contributed to AI/ML initiatives at OCAC for public-sector digital workflows. Built OCR-driven document pipelines, prediction models, and analytics dashboards, translating technical concepts into reliable, usable systems for operational teams.',
    skills: ['Python', 'AI/ML', 'OCR', 'Computer Vision', 'Streamlit', 'SQL', 'Deep Learning', 'Data Analytics'],
    icon: AcademicCapIcon,
    color: '#818cf8',
    accentColor: '#7c3aed',
    certId: null,
  },
];

export default function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!lineRef.current || !sectionRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 30%',
            scrub: 1.2,
          },
        }
      );

      const cards = sectionRef.current.querySelectorAll('.tl-card');
      cards.forEach((card) => {
        const isLeft = card.classList.contains('tl-left');
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 82%' },
          }
        );
      });

      const dots = sectionRef.current.querySelectorAll('.tl-dot');
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
            scrollTrigger: { trigger: dot, start: 'top 82%' },
          }
        );
      });

      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    };

    init();
    return () => cleanup?.();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-500" />
            <span className="text-neon-400 font-mono text-sm tracking-widest uppercase">Career</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experience &{' '}
            <span style={{ color: '#f472b6', textShadow: '0 0 20px rgba(244,114,182,0.5)' }}>Timeline</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
            A vertical journey through internships, projects, and professional milestones.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />
          {/* Animated line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, #6366f1, #06b6d4, #f472b6, #818cf8)',
              transformOrigin: 'top center',
            }}
          />

          <div className="space-y-16 md:space-y-0">
            {timelineItems.map((item, i) => {
              const Icon = item.icon;
              const isLeft = item.side === 'left';

              return (
                <div
                  key={item.title}
                  className={`tl-card ${isLeft ? 'tl-left' : 'tl-right'} relative md:flex md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:mb-16`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-2xl p-6 inline-block w-full md:max-w-sm relative overflow-hidden group"
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: `1px solid ${item.color}25`,
                        transition: 'box-shadow 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${item.color}20, 0 20px 40px rgba(0,0,0,0.3)`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${item.color}50`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        (e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`;
                      }}
                    >
                      {/* Top accent */}
                      <div
                        className="absolute top-0 h-0.5 left-0 right-0 opacity-60"
                        style={{ background: `linear-gradient(${isLeft ? '270deg' : '90deg'}, transparent, ${item.color})` }}
                      />
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at ${isLeft ? '100% 0%' : '0% 0%'}, ${item.color}10, transparent 60%)` }}
                      />

                      <div className={`relative z-10 flex items-start gap-4 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: item.color }} />
                        </div>

                        <div className={`flex-1 ${isLeft ? 'md:text-right' : ''}`}>
                          <div className={`flex items-center gap-2 mb-1 flex-wrap ${isLeft ? 'md:justify-end' : ''}`}>
                            <span
                              className="text-xs font-mono px-2 py-0.5 rounded-full"
                              style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
                            >
                              {item.type}
                            </span>
                            <span className="text-xs font-mono text-slate-500">{item.year}</span>
                          </div>

                          <h3 className="text-lg font-bold text-white mb-0.5">{item.title}</h3>
                          <p className="text-sm font-medium mb-0.5" style={{ color: item.color }}>{item.company}</p>
                          <p className="text-xs font-mono text-slate-500 mb-3">{item.location}</p>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

                          {item.certId && (
                            <p className="text-xs font-mono text-slate-600 mb-3">
                              Cert ID: {item.certId}
                            </p>
                          )}

                          <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : ''}`}>
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs px-2 py-0.5 rounded font-mono"
                                style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="tl-dot hidden md:flex w-12 h-12 flex-shrink-0 items-center justify-center relative z-10">
                    <div
                      className="w-4 h-4 rounded-full border-2"
                      style={{
                        background: item.color,
                        borderColor: item.accentColor,
                        boxShadow: `0 0 16px ${item.color}80, 0 0 32px ${item.color}30`,
                      }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
