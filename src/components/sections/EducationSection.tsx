'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AcademicCapIcon, MapPinIcon, CalendarIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

const education = [
  {
    level: 'Bachelor of Technology',
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'GIFT Autonomous (Gandhi Institute For Technology)',
    affiliation: 'Affiliated to Biju Patnaik University of Technology (BPUT)',
    location: 'Bhubaneswar, Odisha',
    period: '2023 – 2027',
    status: 'Pursuing',
    color: '#38bdf8',
    icon: BuildingLibraryIcon,
    highlights: ['Computer Science Core', 'AI & Machine Learning', 'Data Structures & Algorithms', 'Web Technologies'],
    statusColor: '#7dd3fc',
    images: ['/Education_images/gift collage.webp'],
  },
  {
    level: 'Intermediate — Class XII',
    degree: 'Science (PCM)',
    institution: 'Godavarish Higher Secondary School',
    affiliation: 'CHSE Board, Odisha',
    location: 'Banpur, Odisha',
    period: '2021 – 2023',
    status: 'Completed',
    color: '#818cf8',
    icon: AcademicCapIcon,
    highlights: ['Physics', 'Chemistry', 'Mathematics'],
    statusColor: '#a5b4fc',
    images: [
      '/Education_images/Godavarish banpur.jpg',
      '/Education_images/Godavarish collage banpur.jpg'
    ],
  },
  {
    level: 'Matriculation — Class X',
    degree: 'Secondary Education',
    institution: 'Patita Paban Nodal Banimandir',
    affiliation: 'BSE Odisha Board',
    location: 'Gambharimunda, Odisha',
    period: 'Completed 2021',
    status: 'Completed',
    color: '#a78bfa',
    icon: AcademicCapIcon,
    highlights: ['Science', 'Mathematics', 'English'],
    statusColor: '#c4b5fd',
    images: [
      '/Education_images/10 th school.jpg',
      '/Education_images/10th school.jpg'
    ],
  },
];

function EducationCard({ edu, index }: { edu: any; index: number }) {
  const Icon = edu.icon;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!edu.images || edu.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % edu.images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [edu.images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-1"
    >
      {/* Background Image Carousel (Full width & height) */}
      {edu.images && edu.images.length > 0 ? (
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={edu.images[currentImageIndex]}
              alt={`${edu.institution} image`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </AnimatePresence>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-white/0" />
      )}

      {/* The Liquid Glass Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
        style={{
          background: `linear-gradient(to right, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.9) 45%, rgba(5,5,5,0.2) 75%, transparent 100%)`,
        }}
      />
      <div 
        className="absolute inset-0 z-10 pointer-events-none md:hidden"
        style={{
          background: `linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.9) 60%, rgba(5,5,5,0.2) 100%)`,
        }}
      />
      
      {/* Additional backdrop blur layer for the text area specifically */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[65%] z-10 backdrop-blur-xl hidden md:block" 
           style={{ maskImage: 'linear-gradient(to right, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[80%] z-10 backdrop-blur-xl md:hidden" 
           style={{ maskImage: 'linear-gradient(to top, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)' }} />

      {/* Main Content Container */}
      <div
        className="relative z-20 flex flex-col justify-end md:justify-center p-6 sm:p-8 md:p-12 min-h-[420px] md:min-h-[340px] border border-white/10 group-hover:border-white/20 rounded-[2rem] transition-colors duration-500"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}40`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.1)`;
        }}
      >
        <div className="md:w-[65%] flex flex-col h-full justify-center">
          {/* Header Row */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg backdrop-blur-lg"
              style={{
                background: `linear-gradient(135deg, ${edu.color}30, rgba(0,0,0,0.5))`,
                border: `1px solid ${edu.color}40`,
                boxShadow: `inset 0 0 20px ${edu.color}20`
              }}
            >
              <Icon className="w-6 h-6" style={{ color: edu.color }} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md"
                style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
              >
                {edu.level}
              </span>
              <span
                className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md"
                style={{
                  background: `${edu.statusColor}10`,
                  color: edu.statusColor,
                  border: `1px solid ${edu.statusColor}25`,
                }}
              >
                {edu.status}
              </span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 leading-tight tracking-tight drop-shadow-md">
            {edu.degree}
          </h3>
          <p className="text-base sm:text-lg font-medium mb-1 drop-shadow-md" style={{ color: edu.color }}>
            {edu.institution}
          </p>
          <p className="text-slate-300 text-xs sm:text-sm font-mono mb-5 drop-shadow-md">
            {edu.affiliation}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 mb-6">
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <MapPinIcon className="w-4 h-4" style={{ color: edu.color }} />
              {edu.location}
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <CalendarIcon className="w-4 h-4" style={{ color: edu.color }} />
              {edu.period}
            </span>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {edu.highlights.map((h: string) => (
              <span
                key={h}
                className="text-[10px] sm:text-xs px-3 py-1.5 rounded-xl font-medium text-slate-200 transition-colors duration-300 hover:text-white hover:bg-white/10 backdrop-blur-md shadow-sm"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        {edu.images && edu.images.length > 1 && (
          <div className="absolute top-6 right-6 md:bottom-8 md:top-auto flex gap-1.5 z-30 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            {edu.images.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentImageIndex 
                    ? 'bg-white w-5 shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                    : 'bg-white/40 w-1.5 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
          style={{ background: '#38bdf8' }}
        />
        <div
          className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
          style={{ background: '#a78bfa' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
            <span className="text-white/80 font-mono text-sm tracking-widest uppercase">
              Academic Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white/60 drop-shadow-sm mb-6">
            Education & Qualifications
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Building the foundations of technology, engineering, and problem-solving through continuous learning.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-12">
          {education.map((edu, i) => (
            <EducationCard key={edu.institution} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
