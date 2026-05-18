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
    images: ['/Education_images/gift_college.webp'],
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
      '/Education_images/godavarish_banpur.jpg',
      '/Education_images/godavarish_college.jpg'
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
      '/Education_images/10th_school_1.jpg',
      '/Education_images/10th_school_2.jpg'
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
      className="group relative w-full h-[280px] sm:h-[320px] md:h-[350px] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform duration-1000 hover:-translate-y-2 border border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20"
    >
      {/* Background Image Carousel (Full width & height) */}
      {edu.images && edu.images.length > 0 ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={edu.images[currentImageIndex]}
              alt={`${edu.institution} image`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-110"
            />
          </AnimatePresence>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-white/0" />
      )}

      {/* Persistent Bottom Gradient for Title Readability in Default State */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-1000 group-hover:opacity-0" />

      {/* Default State Content (Visible when not hovering) */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 flex items-end gap-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-8 group-hover:opacity-0">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl backdrop-blur-md"
          style={{
            background: `linear-gradient(135deg, ${edu.color}40, rgba(0,0,0,0.6))`,
            border: `1px solid ${edu.color}50`,
            boxShadow: `inset 0 0 20px ${edu.color}30`
          }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: edu.color }} />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight drop-shadow-lg mb-0.5">
            {edu.institution}
          </h3>
          <p className="text-xs sm:text-sm font-semibold drop-shadow-lg" style={{ color: edu.color }}>
            {edu.degree}
          </p>
        </div>
      </div>

      {/* Hover State: Liquid Glass Overlay */}
      <div 
        className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-[1200ms] ease-in-out flex flex-col justify-end p-5 sm:p-8 backdrop-blur-2xl"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 60%, rgba(10,10,10,0.6) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col h-full justify-center">
          
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-black/10 dark:border-white/10"
              style={{ background: `${edu.color}20`, color: edu.color }}
            >
              {edu.level}
            </span>
            <span
              className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-black/10 dark:border-white/10"
              style={{ background: `${edu.statusColor}15`, color: edu.statusColor }}
            >
              {edu.status}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight tracking-tight">
            {edu.degree}
          </h3>
          <p className="text-sm sm:text-base font-medium mb-2" style={{ color: edu.color }}>
            {edu.institution}
          </p>
          <p className="text-slate-300 text-xs sm:text-sm font-mono mb-4">
            {edu.affiliation}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200 mb-5">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <MapPinIcon className="w-3.5 h-3.5" style={{ color: edu.color }} />
              {edu.location}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <CalendarIcon className="w-3.5 h-3.5" style={{ color: edu.color }} />
              {edu.period}
            </span>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {edu.highlights.map((h: string) => (
              <span
                key={h}
                className="text-[10px] sm:text-xs px-3 py-1.5 rounded-lg font-medium text-slate-200 transition-all duration-500 hover:text-white hover:bg-white/10 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] cursor-default"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                {h}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Carousel Indicators (Always visible at the top) */}
      {edu.images && edu.images.length > 1 && (
        <div className="absolute top-5 right-5 flex gap-1.5 z-40 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-md border border-black/10 dark:border-white/10 opacity-70 hover:opacity-100 transition-opacity duration-700">
          {edu.images.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(idx);
              }}
              className={`h-1 rounded-full transition-all duration-700 ${
                idx === currentImageIndex 
                  ? 'bg-white w-4 shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                  : 'bg-white/40 w-1.5 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
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
          
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-400 to-violet-500 drop-shadow-sm mb-6">
            Education & Qualifications
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
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
