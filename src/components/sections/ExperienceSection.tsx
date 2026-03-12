'use client';

import { useEffect, useRef, useState } from 'react';
import { AcademicCapIcon, CpuChipIcon, CodeBracketIcon } from '@heroicons/react/24/outline';


const experiences = [
  {
    title: 'Python Internship',
    subtitle: 'Certificate of Completion',
    year: '2022',
    organization: 'Tech Institute',
    description: 'Completed intensive Python development internship covering advanced programming, automation, and data processing.',
    skills: ['Python', 'Automation', 'Data Processing', 'OOP'],
    icon: AcademicCapIcon,
    color: '#6366f1',
    type: 'Certificate',
  },
  {
    title: 'Machine Learning Projects',
    subtitle: '5+ Real-World Models',
    year: '2022-2023',
    organization: 'Self-Directed',
    description: 'Built and deployed multiple ML models solving real business problems including payment prediction, currency detection, and course recommendation.',
    skills: ['scikit-learn', 'TensorFlow', 'Pandas', 'Feature Engineering'],
    icon: CpuChipIcon,
    color: '#06b6d4',
    type: 'Project Portfolio',
  },
  {
    title: 'Full Stack Development',
    subtitle: 'Production Applications',
    year: '2023-2024',
    organization: 'Freelance & Personal',
    description: 'Developed complete web applications with React frontend, Node.js backend, and real-time features using Socket.io.',
    skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
    icon: CodeBracketIcon,
    color: '#f472b6',
    type: 'Experience',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-neon-500" />
            <span className="text-neon-400 font-mono text-sm tracking-widest uppercase">Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Certificates &{' '}
            <span className="text-glow-pink" style={{ color: '#f472b6' }}>Experience</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            Hover over each card to flip and see the details.
          </p>
        </div>

        {/* Flip cards grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {experiences?.map((exp, i) => {
            const Icon = exp?.icon;
            return (
              <div
                key={exp?.title}
                className={`flip-card h-72 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flip-card-inner relative w-full h-full">
                  {/* Front */}
                  <div
                    className="flip-card-front absolute inset-0 rounded-2xl glass overflow-hidden flex flex-col items-center justify-center p-6 text-center"
                    style={{ border: `1px solid ${exp?.color}30` }}
                  >
                    {/* Background glow */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${exp?.color} 0%, transparent 70%)` }}
                    />

                    <div
                      className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${exp?.color}20`, border: `1px solid ${exp?.color}40` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: exp?.color }} />
                    </div>

                    <span
                      className="relative z-10 text-xs font-mono px-3 py-1 rounded-full mb-3"
                      style={{
                        background: `${exp?.color}15`,
                        color: exp?.color,
                        border: `1px solid ${exp?.color}30`,
                      }}
                    >
                      {exp?.type}
                    </span>

                    <h3 className="relative z-10 text-lg font-bold text-white mb-1">{exp?.title}</h3>
                    <p className="relative z-10 text-slate-400 text-sm">{exp?.subtitle}</p>

                    <p className="relative z-10 text-xs font-mono text-slate-600 mt-4">Hover to flip →</p>
                  </div>

                  {/* Back */}
                  <div
                    className="flip-card-back absolute inset-0 rounded-2xl glass overflow-hidden flex flex-col justify-between p-6"
                    style={{ border: `1px solid ${exp?.color}40` }}
                  >
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${exp?.color} 0%, transparent 60%)` }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono" style={{ color: exp?.color }}>{exp?.year}</span>
                        <span className="text-xs font-mono text-slate-500">{exp?.organization}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{exp?.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{exp?.description}</p>
                    </div>

                    <div className="relative z-10">
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp?.skills?.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-0.5 rounded font-mono"
                            style={{
                              background: `${exp?.color}15`,
                              color: exp?.color,
                              border: `1px solid ${exp?.color}20`,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
