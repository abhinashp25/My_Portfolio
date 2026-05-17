'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  XMarkIcon,
  StarIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

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
  video?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: 'Career AI Platform',
    description: 'An AI-powered application for career mapping and intelligent roadmap generation.',
    longDescription:
      'I developed this intelligent career assistant to generate personalized roadmaps, analyze resumes, and identify skill gaps using advanced LLMs. The goal was to build a robust backend coupled with a modern, glassmorphic UI that provides actionable career progression advice.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'TailwindCSS'],
    color: '#ffffff',
    github: 'https://github.com/abhinashp25/Career_Ai_App',
    category: 'Full Stack',
    featured: true,
    video: '/project_videos/Career AI Platform.mp4',
  },
  {
    title: 'Aakash Weather',
    description: 'A React & Three.js weather app with 3D WebGL particle effects and an AI advisor.',
    longDescription:
      'I built Aakash Weather to go beyond standard forecast apps. I integrated Three.js particle systems for dynamic rain and snow effects directly on the canvas. It features a Time Travel mode using seeded algorithms and an AI advisor to recommend clothing based on current conditions. I handcrafted the entire UI with vanilla CSS glassmorphism, keeping it completely responsive and translated into multiple languages.',
    tech: ['React 19', 'Three.js', 'Vite', 'OpenWeatherMap API'],
    color: '#38bdf8',
    github: 'https://github.com/abhinashp25/Weather-App',
    demo: 'https://weather-app-ten-rho-qjyqf83mdu.vercel.app',
    category: 'Frontend',
    featured: true,
    video: '/project_videos/Aakash Weather.mp4',
  },
  {
    title: 'Event Management System',
    description: 'A comprehensive platform for organizing, managing, and tracking events.',
    longDescription:
      'I built this application to handle the complexities of event coordination. It provides tools for both organizers and attendees, focusing on seamless scheduling, ticketing, and real-time event updates all wrapped into an intuitive dashboard interface.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    color: '#f59e0b',
    github: 'https://github.com/abhinashp25/Event-Management-System-App',
    category: 'Full Stack',
    video: '/project_videos/Event Management System.mp4',
  },
  {
    title: 'Vigil System Dashboard',
    description: 'A full-stack operational safety monitoring platform with live dashboards.',
    longDescription:
      'Vigil is designed to be a real-time safety monitor. I built the frontend with React to display live dashboards that process incoming safety-critical signals. It connects to a robust backend using Express and MongoDB. The system dispatches real-time alerts efficiently to users, prioritizing speed and UI clarity for incident tracking.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    color: '#e2e8f0',
    github: 'https://github.com/abhinashp25/vigil-web',
    demo: 'https://vigil-web-three.vercel.app',
    category: 'Full Stack',
    featured: true,
    video: '/project_videos/Vigil System Dashboard.mp4',
  },
  {
    title: 'TASKOPS Dashboard',
    description: 'A real-time to-do dashboard featuring instantaneous synchronization.',
    longDescription:
      'I wanted to try implementing real-time database syncing, so I built TASKOPS. It uses Supabase Realtime to push project and task updates instantly across clients. It seamlessly handles simulated agent-based updates and features a heavily optimized deployment pipeline on Vercel.',
    tech: ['TypeScript', 'React', 'Supabase Realtime'],
    color: '#a855f7',
    github: 'https://github.com/abhinashp25/Todo-dashboard',
    demo: 'https://todo-dashboard-kohl.vercel.app',
    category: 'Full Stack',
    video: '/project_videos/TASKOPS Dashboard.mp4',
  },
  {
    title: 'Real-time Chat App',
    description:
      'A low-latency messaging platform utilizing web sockets for instant communication.',
    longDescription:
      'To deepen my understanding of real-time protocols, I built Chatify. It features instant messaging, user authentication, live typing indicators, and room management. I engineered the backend with Node.js and Socket.io to achieve sub-100ms message delivery speeds.',
    tech: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    color: '#10b981',
    github: 'https://github.com/abhinashp25/Real-time-Chat-App',
    demo: 'https://chatify-zeta-steel.vercel.app',
    category: 'Full Stack',
    video: '/project_videos/Real-time Chat App.mp4',
  },
  {
    title: 'Invoice Payment Prediction',
    description: 'A predictive ML pipeline forecasting B2B invoice payment dates.',
    longDescription:
      'I engineered this machine learning pipeline to analyze historical financial behaviors and seasonal patterns to predict payment delays accurately. Using XGBoost, the deployed model provides businesses with crucial cash flow visibility through a RESTful API integration.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'XGBoost', 'Flask'],
    color: '#3b82f6',
    github: 'https://github.com/abhinashp25/invoice-payment-prediction',
    demo: 'https://invoice-payment-prediction.vercel.app',
    category: 'Machine Learning',
    featured: true,
    image: '/project_images/Invoice Payment Prediction.png',
  },
  {
    title: 'Plant Disease Prediction',
    description: 'A machine learning vision system that detects plant leaf diseases.',
    longDescription:
      'Seeing the impact of crop loss, I built a deep learning model to predict plant diseases from leaf imagery. It leverages Convolutional Neural Networks (CNNs) trained on thousands of plant images to help agricultural professionals diagnose diseases early with high accuracy.',
    tech: ['Python', 'TensorFlow', 'CNN', 'OpenCV'],
    color: '#84cc16',
    github: 'https://github.com/abhinashp25/Plant_Disease_Prediction',
    category: 'Computer Vision',
    image: '/project_images/Plant Disease Prediction.png',
  },
];

const categories = ['All', 'Machine Learning', 'Computer Vision', 'Full Stack', 'Frontend'];

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
    ref.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
  };

  return { ref, onMove, onLeave };
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
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
        className="group relative h-full rounded-2xl overflow-hidden flex flex-col backdrop-blur-xl bg-white/5 border shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer"
        style={{
          borderColor: hovered ? `${project.color}50` : 'rgba(255,255,255,0.1)',
          boxShadow: hovered
            ? `inset 0 0 20px rgba(255,255,255,0.02), 0 0 40px ${project.color}20, 0 20px 60px rgba(0,0,0,0.4)`
            : 'inset 0 0 20px rgba(255,255,255,0.02), 0 8px 32px 0 rgba(0,0,0,0.3)',
        }}
      >
        {/* Media Header */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#0a0a0a] shrink-0 border-b border-white/10">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
          ) : null}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />

          {/* Category Badge positioned over media */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full backdrop-blur-md"
              style={{
                background: `${project.color}25`,
                color: '#fff',
                border: `1px solid ${project.color}50`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Buttons overlay (visible on hover) */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md text-white hover:scale-110 transition-transform"
              style={{
                background: `${project.color}40`,
                border: `1px solid ${project.color}60`,
              }}
            >
              <CodeBracketIcon className="w-4 h-4" />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md text-white hover:scale-110 transition-transform"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <PlayIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div className="relative z-10 p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
            {project.stats && (
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <StarIcon className="w-3.5 h-3.5" style={{ color: project.color }} />
                {project.stats}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mb-5 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded font-mono text-slate-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded font-mono text-slate-500">
                +{project.tech.length - 4}
              </span>
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
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-white/50" />
            <span className="text-white/60 font-mono text-sm tracking-widest uppercase">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Impact-Focused{' '}
            <span style={{ color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
              Case Studies
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            A curated set of engineering and AI projects with measurable outcomes, architecture
            decisions, and delivery focus.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${filter === cat ? 'text-white' : 'text-slate-400 hover:text-white'}`}
              style={{
                background: filter === cat ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === cat ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Shipped Applications', value: '5+', color: '#ffffff' },
            { label: 'Peak ML Accuracy', value: '98%', color: '#e2e8f0' },
            { label: 'Real-Time Latency', value: '<100ms', color: '#cbd5e1' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}20` }}
            >
              <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>
                {s.value}
              </div>
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
              <div
                className="h-1"
                style={{
                  background: `linear-gradient(90deg, ${selectedProject.color}, transparent)`,
                }}
              />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span
                      className="text-xs font-mono px-2 py-1 rounded-full mb-3 inline-block"
                      style={{
                        background: `${selectedProject.color}15`,
                        color: selectedProject.color,
                        border: `1px solid ${selectedProject.color}30`,
                      }}
                    >
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                    {selectedProject.stats && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <StarIcon
                          className="w-3.5 h-3.5"
                          style={{ color: selectedProject.color }}
                        />
                        <span
                          className="text-xs font-mono"
                          style={{ color: selectedProject.color }}
                        >
                          {selectedProject.stats}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {selectedProject.longDescription}
                </p>

                <div className="mb-6">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="text-sm px-3 py-1 rounded-lg font-mono"
                        style={{
                          background: `${selectedProject.color}15`,
                          color: selectedProject.color,
                          border: `1px solid ${selectedProject.color}30`,
                        }}
                      >
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
                    style={{
                      background: `linear-gradient(135deg, ${selectedProject.color}30, ${selectedProject.color}15)`,
                      border: `1px solid ${selectedProject.color}40`,
                    }}
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
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
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
