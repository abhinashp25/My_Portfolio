'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline';

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
    description: 'ML model predicting invoice payment dates with 87% accuracy.',
    longDescription:
      'Built a machine learning pipeline that analyzes historical invoice data to predict payment dates. Uses feature engineering on customer behavior, invoice amounts, and seasonal patterns. Achieved 87% accuracy using gradient boosting with XGBoost. Deployed as a REST API with Flask for real-time predictions.',
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
    longDescription:
      'An intelligent plant disease detection system that analyzes leaf images to identify diseases with high accuracy. Built using Convolutional Neural Networks (CNN) with transfer learning. Helps farmers and agricultural professionals quickly diagnose crop diseases, potentially saving significant crop losses. The model is trained on thousands of plant images across multiple disease categories.',
    tech: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Deep Learning', 'Flask'],
    color: '#4ade80',
    github: 'https://github.com/abhinashp25/Plant_Disease_Prediction',
    category: 'Computer Vision',
    featured: true,
    stats: 'AI Powered',
  },
  {
    title: 'Chatify — Realtime Chat App',
    description: 'Full-stack real-time messaging application with modern UI and Socket.io.',
    longDescription:
      'A production-ready real-time chat application built with React and Socket.io. Features include instant messaging, user authentication, room management, typing indicators, and a clean modern interface. Built for sub-100ms message delivery latency. The backend uses Node.js with Express and MongoDB for message persistence.',
    tech: ['React', 'Node.js', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
    color: '#818cf8',
    github: 'https://github.com/abhinashp25/chatify',
    category: 'Full Stack',
    stats: 'Real-time',
  },
  {
    title: 'Global Currency Detection AI',
    description: 'AI system detecting world currencies from images using deep learning.',
    longDescription:
      'Developed a computer vision system that identifies and classifies currency notes from 50+ countries. Uses a custom CNN architecture with transfer learning from ResNet. Integrated OCR for serial number extraction and denomination recognition. Achieves high accuracy across diverse lighting conditions and image qualities.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'OCR', 'ResNet', 'Deep Learning'],
    color: '#06b6d4',
    github: 'https://github.com/abhinashp25',
    category: 'Computer Vision',
    stats: '50+ Currencies',
  },
  {
    title: 'AI Course Recommender',
    description: 'Intelligent course recommendation system powered by collaborative filtering.',
    longDescription:
      'A collaborative filtering and content-based recommendation engine for online courses. Analyzes user learning patterns, skill gaps, and course content to provide personalized recommendations. Built with Streamlit for rapid deployment and an intuitive UI. Uses NLP for course content analysis and similarity matching.',
    tech: ['Python', 'ML', 'Streamlit', 'NLP', 'Pandas', 'scikit-learn'],
    color: '#f472b6',
    github: 'https://github.com/abhinashp25',
    category: 'Recommendation System',
    stats: 'Personalized AI',
  },
  {
    title: 'Factory Telemetry Analysis',
    description: 'Industrial IoT data analytics dashboard for factory monitoring.',
    longDescription:
      'Comprehensive analytics platform for factory floor telemetry data. Processes sensor readings from 200+ IoT devices, detects anomalies using statistical methods, and provides predictive maintenance alerts. Features real-time dashboards with Plotly visualizations. Reduced equipment downtime by 30% in testing environments.',
    tech: ['Python', 'SQL', 'Pandas', 'Plotly', 'IoT', 'Data Analytics'],
    color: '#22d3ee',
    github: 'https://github.com/abhinashp25',
    category: 'Data Analytics',
    stats: '30% Less Downtime',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Machine Learning', 'Computer Vision', 'Full Stack', 'Data Analytics', 'Recommendation System'];

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-pink-500" />
            <span className="text-pink-400 font-mono text-sm tracking-widest uppercase">Projects Universe</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            What I've{' '}
            <span style={{ color: '#f472b6', textShadow: '0 0 20px rgba(244,114,182,0.6)' }}>Built</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            From ML models to full-stack applications — click any card to explore the details.
          </p>
        </div>

        {/* Category filters */}
        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '100ms' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                filter === cat ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
              style={{
                background: filter === cat ? 'rgba(244,114,182,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filter === cat ? 'rgba(244,114,182,0.5)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${project.featured && i < 2 ? 'lg:col-span-1' : ''}`}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${project.color}20`,
                transitionDelay: `${i * 80}ms`,
                boxShadow: `0 0 0 rgba(0,0,0,0)`,
              }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${project.color}20, 0 0 0 1px ${project.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 rgba(0,0,0,0)';
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}12 0%, transparent 60%)` }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)` }}
              />

              <div className="relative z-10 p-6">
                {/* Category badge + stats */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-mono px-2 py-1 rounded-full"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
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
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded font-mono text-slate-400"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded font-mono text-slate-500">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className={`mt-12 grid grid-cols-3 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { label: 'Projects Built', value: '6+', color: '#6366f1' },
            { label: 'ML Models', value: '5+', color: '#06b6d4' },
            { label: 'GitHub Repos', value: '10+', color: '#f472b6' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${stat.color}20` }}
            >
              <div className="text-2xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            style={{ animation: 'fadeIn 0.2s ease' }}
          />
          <div
            className="relative z-10 max-w-lg w-full rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(15,23,42,0.98)',
              border: `1px solid ${selectedProject.color}30`,
              boxShadow: `0 0 80px ${selectedProject.color}20, 0 40px 80px rgba(0,0,0,0.6)`,
              animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent */}
            <div
              className="h-1"
              style={{ background: `linear-gradient(90deg, ${selectedProject.color}, transparent)` }}
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
                      <StarIcon className="w-3.5 h-3.5" style={{ color: selectedProject.color }} />
                      <span className="text-xs font-mono" style={{ color: selectedProject.color }}>{selectedProject.stats}</span>
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

              <p className="text-slate-300 leading-relaxed mb-6">{selectedProject.longDescription}</p>

              <div className="mb-6">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Tech Stack</p>
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
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${selectedProject.color}30, ${selectedProject.color}15)`,
                    border: `1px solid ${selectedProject.color}40`,
                  }}
                >
                  <CodeBracketIcon className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
