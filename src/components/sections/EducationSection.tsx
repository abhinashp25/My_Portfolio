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
      className="group relative"
    >
      <div
        className="relative rounded-[2rem] overflow-hidden backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col md:flex-row"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px -10px ${edu.color}30, 0 8px 32px 0 rgba(0,0,0,0.4)`;
          (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}50`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.3)';
          (e.currentTarget as HTMLElement).style.borderColor = `rgba(255,255,255,0.1)`;
        }}
      >
        {/* Glow behind content */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${edu.color}15, transparent 70%)` }} 
        />

        {/* Content Side */}
        <div className="relative z-10 p-8 md:p-12 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${edu.color}20, transparent)`,
                border: `1px solid ${edu.color}40`,
                boxShadow: `inset 0 0 20px ${edu.color}10`
              }}
            >
              <Icon className="w-7 h-7" style={{ color: edu.color }} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                  style={{ background: `${edu.color}20`, color: edu.color, border: `1px solid ${edu.color}30` }}
                >
                  {edu.level}
                </span>
                <span
                  className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                  style={{
                    background: `${edu.statusColor}15`,
                    color: edu.statusColor,
                    border: `1px solid ${edu.statusColor}30`,
                  }}
                >
                  {edu.status}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight tracking-tight">
            {edu.degree}
          </h3>
          <p className="text-lg font-medium mb-1" style={{ color: edu.color }}>
            {edu.institution}
          </p>
          <p className="text-slate-400 text-sm font-mono mb-6">
            {edu.affiliation}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 mb-8">
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
              <MapPinIcon className="w-4 h-4" style={{ color: edu.color }} />
              {edu.location}
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-sm">
              <CalendarIcon className="w-4 h-4" style={{ color: edu.color }} />
              {edu.period}
            </span>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {edu.highlights.map((h: string) => (
              <span
                key={h}
                className="text-xs px-3 py-1.5 rounded-xl font-medium text-slate-300 transition-colors duration-300 hover:text-white"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Image Side - Carousel */}
        {edu.images && edu.images.length > 0 && (
          <div className="relative w-full md:w-[45%] min-h-[250px] md:min-h-full overflow-hidden shrink-0 border-t md:border-t-0 md:border-l border-white/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={edu.images[currentImageIndex]}
                alt={`${edu.institution} image`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {/* Seamless Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-[#0a0a0a]/20 md:to-[#0a0a0a]/90 pointer-events-none" />

            {/* Image indicators */}
            {edu.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
                {edu.images.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentImageIndex 
                        ? 'bg-white w-6 shadow-[0_0_10px_rgba(255,255,255,0.8)]' 
                        : 'bg-white/40 w-2 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
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
