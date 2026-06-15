'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
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
  images?: string[]; // multi-image slideshow
}

// ─── Image Slideshow (looks like video) ───────────────────────────────────────
function ImageSlideshow({
  images,
  alt,
  className = '',
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.85, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none z-10" />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: 'AI Resume Analyzer',
    description: 'An AI-powered resume analysis platform that matches resumes to job descriptions with intelligent scoring.',
    longDescription:
      'ResuMatch is an intelligent resume analysis platform I built to help job seekers understand how well their resume matches a target job description. It leverages advanced NLP and AI to parse resumes, extract key skills, and score alignment with JD requirements. The platform provides actionable feedback, keyword gap analysis, and improvement suggestions — all wrapped in a clean, responsive UI deployed on Render.',
    tech: ['Python', 'FastAPI', 'NLP', 'React', 'AI/ML'],
    color: '#a855f7',
    github: 'https://github.com/abhinashp25/ResuMatch',
    demo: 'https://resumatch-app.onrender.com/',
    category: 'AI / Full Stack',
    featured: true,
    images: [
      '/project_images/ResuMatch_1.png',
      '/project_images/ResuMatch_2.png',
      '/project_images/ResuMatch_3.png',
      '/project_images/ResuMatch_4.png',
    ],
  },
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
    demo: 'https://real-time-chat-app-t40f.onrender.com/',
    category: 'Full Stack',
    images: [
      '/project_images/Chat_app_1.png',
      '/project_images/Chat_app_2.png',
      '/project_images/Chat_app_3.png',
      '/project_images/Chat_app_4.png',
    ],
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
    image: '/project_images/invoice_payment_prediction.png',
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
    image: '/project_images/plant_disease_prediction.png',
  },
];

const categories = ['All', 'AI / Full Stack', 'Machine Learning', 'Computer Vision', 'Full Stack', 'Frontend'];

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{
        y: -6,
        transition: { type: 'spring', stiffness: 280, damping: 24 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full rounded-[1.75rem] overflow-hidden"
    >
      <div
        onClick={onClick}
        className="project-card-glass group relative h-full rounded-[1.75rem] overflow-hidden flex flex-col cursor-pointer transition-all duration-500"
      >
        {/* Top accent line on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />

        {/* Color tinted glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}12 0%, transparent 65%)` }}
        />


        {/* Specular top-edge highlight */}
        <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/90 to-transparent z-20 pointer-events-none" />

        {/* Media — fixed height */}
        <div className="relative w-full h-48 overflow-hidden shrink-0 border-b border-black/[0.07] dark:border-white/[0.06]"
          style={{ background: '#0a0a0a' }}>
          {project.images ? (
            <ImageSlideshow images={project.images} alt={project.title} />
          ) : project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              loop muted playsInline preload="metadata"
              className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-all duration-500 ease-out"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-all duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${project.color}20, rgba(0,0,0,0.8))` }} />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-30">
            <span
              className="text-[9px] font-semibold font-mono px-2.5 py-1 rounded-full backdrop-blur-md tracking-wider uppercase"
              style={{ background: 'rgba(0,0,0,0.42)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              {project.category}
            </span>
          </div>

          {/* Action buttons on hover */}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1.5 group-hover:translate-y-0 z-30">
            <a
              href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md text-white hover:scale-110 active:scale-95 transition-transform duration-200"
              style={{ background: `${project.color}50`, border: `1px solid ${project.color}70` }}
            >
              <CodeBracketIcon className="w-4 h-4" />
            </a>
            {project.demo && (
              <a
                href={project.demo} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md text-white hover:scale-110 active:scale-95 transition-transform duration-200"
                style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }}
              >
                <PlayIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 relative z-10">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-slate-800 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
              {project.title}
            </h3>
            {project.featured && (
              <span className="shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded-full font-mono tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400">
                Featured
              </span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3 font-normal">
            {project.description}
          </p>

          <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] my-4" />

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[9px] px-2.5 py-1 rounded-lg font-mono font-medium text-slate-600 dark:text-slate-300 bg-black/[0.05] dark:bg-white/[0.05] border border-black/[0.07] dark:border-white/[0.07]"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[9px] px-2 py-1 rounded-lg font-mono text-slate-400 bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06]">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal Slideshow ───────────────────────────────────────────────────────────
function ModalMedia({ project }: { project: Project }) {
  if (project.images) {
    return (
      <div className="relative w-full h-48 sm:h-72 shrink-0 bg-[#0a0a0a] border-b border-white/5 overflow-hidden">
        <ImageSlideshow
          images={project.images}
          alt={project.title}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: 0.8 }}
        />
      </div>
    );
  }
  if (project.video) {
    return (
      <div className="relative w-full h-48 sm:h-72 shrink-0 bg-[#0a0a0a] border-b border-white/5">
        <video src={project.video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: 0.8 }} />
      </div>
    );
  }
  if (project.image) {
    return (
      <div className="relative w-full h-48 sm:h-72 shrink-0 bg-[#0a0a0a] border-b border-white/5">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: 0.8 }} />
      </div>
    );
  }
  return <div className="relative w-full h-48 sm:h-72 shrink-0 bg-slate-900 border-b border-white/5" />;
}

// ─── Main Section ─────────────────────────────────────────────────────────────
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
        <SectionHeading
          title="Impact-Focused"
          highlight="Case Studies"
          badge="Selected Work"
        />
        <motion.div
          className="mb-10 -mt-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-lg">
            A curated set of engineering and AI projects with measurable outcomes, architecture
            decisions, and delivery focus.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
                filter === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-black/10 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { label: 'Shipped Applications', value: '6+', color: '#6366f1' },
            { label: 'Peak ML Accuracy', value: '98%', color: '#3b82f6' },
            { label: 'Real-Time Latency', value: '<100ms', color: '#8b5cf6' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-4 sm:p-5 text-center bg-white dark:bg-white/[0.02] border border-black/8 dark:border-white/8"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-1.5 font-mono">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-md" />
            <motion.div
              className="relative z-10 max-w-2xl w-full rounded-3xl overflow-hidden flex flex-col max-h-[90vh] bg-slate-50/90 dark:bg-dark-900/40"
              style={{
                border: `1px solid rgba(255, 255, 255, 0.1)`,
                boxShadow: `inset 0 0 32px rgba(255,255,255,0.02), 0 0 80px ${selectedProject.color}15, 0 32px 64px rgba(0,0,0,0.6)`,
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Hero */}
              <div className="relative">
                <ModalMedia project={selectedProject} />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-xl bg-black/40 text-white hover:bg-black/60 hover:scale-110 transition-all border border-white/20 z-30"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                      style={{
                        background: `${selectedProject.color}15`,
                        color: selectedProject.color,
                        border: `1px solid ${selectedProject.color}30`,
                      }}
                    >
                      {selectedProject.category}
                    </span>
                    {selectedProject.stats && (
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <StarIcon className="w-3 h-3" style={{ color: selectedProject.color }} />
                        {selectedProject.stats}
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
                    About Project
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1.5 rounded-lg font-mono bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-200"
                        style={{
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.02)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-900 dark:text-white transition-all shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${selectedProject.color}40, ${selectedProject.color}20)`,
                      border: `1px solid ${selectedProject.color}50`,
                      boxShadow: `0 10px 30px ${selectedProject.color}20`,
                    }}
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    Source Code
                  </motion.a>
                  {selectedProject.demo && (
                    <motion.a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-900 dark:text-white transition-all backdrop-blur-md"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Live Project
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
