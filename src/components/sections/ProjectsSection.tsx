'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, XMarkIcon, StarIcon, PlayIcon } from '@heroicons/react/24/outline';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  color: string;
  github: string;
  demo?: string;
  category: string;
  featured?: boolean;
  stats?: string;
}

const projects: Project[] = [
  {
    title: 'Payment Date Prediction',
    description: 'Deployed ML pipeline to predict invoice payment dates with 87% accuracy.',
    longDescription: 'Built a machine learning pipeline that analyzes historical invoice data to predict payment dates. Uses feature engineering on customer behavior, invoice amounts, and seasonal patterns. Achieved 87% accuracy using gradient boosting with XGBoost. Deployed as a REST API with Flask for real-time predictions.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'XGBoost', 'Flask'],
    color: '#6366f1',
    github: 'https://github.com/abhinashp25',
    category: 'Machine Learning',
    featured: true,
    stats: '87% Accuracy',
  },
  {
    title: 'Plant Disease Prediction',
    description: 'AI/ML system detecting plant diseases from leaf images using deep learning.',
    longDescription: 'An intelligent plant disease detection system that analyzes leaf images to identify diseases with high accuracy. Built using Convolutional Neural Networks (CNN) with transfer learning. Helps farmers and agricultural professionals quickly diagnose crop diseases. Trained on thousands of plant images across multiple disease categories.',
    tech: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Deep Learning', 'Flask'],
    color: '#4ade80',
    github: 'https://github.com/abhinashp25/Plant_Disease_Prediction',
    category: 'Computer Vision',
    featured: true,
    stats: 'AI Powered',
  },
  {
    title: 'Chatify — Realtime Chat',
    description: 'Production-style real-time messaging platform with low-latency Socket events.',
    longDescription: 'A production-ready real-time chat application built with React and Socket.io. Features instant messaging, user authentication, room management, typing indicators, and a clean modern interface. Built for sub-100ms message delivery latency. Backend uses Node.js with Express and MongoDB for message persistence.',
    tech: ['React', 'Node.js', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
    color: '#818cf8',
    github: 'https://github.com/abhinashp25/chatify',
    category: 'Full Stack',
    stats: 'Real-time',
  },
  {
    title: 'Vigil — Safety & Alert System',
    description: 'Operational safety monitoring platform with live dashboards and alert workflows.',
    longDescription: 'Vigil is a full-stack web application for real-time safety monitoring and intelligent alerting. Built collaboratively with AI assistance, it features a React frontend with live dashboards, a Node.js/Express backend, and REST API integration. The platform monitors safety-critical events, processes incoming signals, and dispatches real-time alerts to users. Designed with a clean, responsive UI and robust backend architecture for reliable incident tracking and notification management.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'TypeScript'],
    color: '#06b6d4',
    github: 'https://github.com/abhinashp25/vigil',
    category: 'Full Stack',
    featured: true,
    stats: 'Real-time Alerts',
  },
  {
    title: 'AI Course Recommender',
    description: 'Intelligent course recommendation system powered by collaborative filtering.',
    longDescription: 'A collaborative filtering and content-based recommendation engine for online courses. Analyzes user learning patterns, skill gaps, and course content to provide personalized recommendations. Built with Streamlit for rapid deployment. Uses NLP for course content analysis and similarity matching.',
    tech: ['Python', 'ML', 'Streamlit', 'NLP', 'Pandas', 'scikit-learn'],
    color: '#f472b6',
    github: 'https://github.com/abhinashp25',
    category: 'Recommendation System',
    stats: 'Personalized AI',
  },

];

const categories = ['All', 'Machine Learning', 'Computer Vision', 'Full Stack', 'Recommendation System'];

// 3D tilt handlers
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transition = 'transform 0.1s ease';
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(8px) scale(1.025)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
  };

  return { ref, onMove, onLeave };
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const { ref, onMove, onLeave } = useTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={onClick}
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? project.color + '50' : project.color + '20'}`,
          boxShadow: hovered ? `0 0 40px ${project.color}20, 0 20px 60px rgba(0,0,0,0.4)` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}${hovered ? 'cc' : '50'}, transparent)`,
            boxShadow: hovered ? `0 0 10px ${project.color}80` : 'none',
          }}
        />

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(ellipse at 50% 0%, ${project.color}10, transparent 65%)`,
          }}
        />

        <div className="relative z-10 p-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-mono px-2 py-1 rounded-full"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
            >
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              {project.stats && (
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <StarIcon className="w-3 h-3" style={{ color: project.color }} />
                  {project.stats}
                </span>
              )}
              <ArrowTopRightOnSquareIcon
                className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors"
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 leading-tight">{project.title}</h3>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded font-mono text-slate-400"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded font-mono text-slate-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Quick action buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white transition-colors"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
            >
              <CodeBracketIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <PlayIcon className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-pink-500" />
            <span className="text-pink-400 font-mono text-sm tracking-widest uppercase">Selected Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Impact-Focused <span style={{ color: '#f472b6', textShadow: '0 0 20px rgba(244,114,182,0.5)' }}>Case Studies</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            A curated set of engineering and AI projects with measurable outcomes, architecture decisions, and delivery focus.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${filter === cat ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              style={{
                background: filter === cat ? 'rgba(244,114,182,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === cat ? 'rgba(244,114,182,0.5)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div className="mt-12 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          {[
            { label: 'Featured Projects', value: '5', color: '#6366f1' },
            { label: 'Best Model Accuracy', value: '87%', color: '#06b6d4' },
            { label: 'Tech Stack Breadth', value: '15+', color: '#f472b6' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}20` }}>
              <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-mono">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 max-w-lg w-full rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(15,23,42,0.98)',
                border: `1px solid ${selectedProject.color}30`,
                boxShadow: `0 0 80px ${selectedProject.color}20, 0 40px 80px rgba(0,0,0,0.6)`,
                backdropFilter: 'blur(20px)',
              }}
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${selectedProject.color}, transparent)` }} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-mono px-2 py-1 rounded-full mb-3 inline-block"
                      style={{ background: `${selectedProject.color}15`, color: selectedProject.color, border: `1px solid ${selectedProject.color}30` }}>
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                    {selectedProject.stats && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <StarIcon className="w-3.5 h-3.5" style={{ color: selectedProject.color }} />
                        <span className="text-xs font-mono" style={{ color: selectedProject.color }}>{selectedProject.stats}</span>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <XMarkIcon className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">{selectedProject.longDescription}</p>

                <div className="mb-6">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="text-sm px-3 py-1 rounded-lg font-mono"
                        style={{ background: `${selectedProject.color}15`, color: selectedProject.color, border: `1px solid ${selectedProject.color}30` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                    style={{ background: `linear-gradient(135deg, ${selectedProject.color}30, ${selectedProject.color}15)`, border: `1px solid ${selectedProject.color}40` }}
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    View on GitHub
                  </motion.a>
                  {selectedProject.demo && (
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      <PlayIcon className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
