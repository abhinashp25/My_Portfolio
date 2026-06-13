'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const certs = [
  {
    title: 'Affective Computing',
    issuer: 'NPTEL — IIT Kharagpur',
    issuerFull: 'National Programme on Technology Enhanced Learning, IIT Kharagpur (SWAYAM)',
    period: 'Jan–Apr 2026',
    duration: '12-week course',
    score: 68,
    scoreDetail: 'Assignments: 24.06/25 · Proctored Exam: 43.5/75',
    rollNo: 'NPTEL26CS61S252500818',
    coordinator: 'NPTEL Coordinator',
    description:
      'Earned Elite certification in Affective Computing — exploring the intersection of human emotions, cognitive science, and artificial intelligence. 68% consolidated score among 4,768 certified candidates.',
    skills: ['Affective Computing', 'AI', 'Cognitive Science', 'Emotion Recognition'],
    color: '#10b981',
    badge: '🧠',
    eliteBadge: true,
    verified: true,
    credentialUrl: '/Affective Computing.pdf',
    totalCertified: '4,768',
    image: '/certificates/affective_computing.png',
    issuerLogo: '/logos/nptel_logo.png',
  },
  {
    title: 'Introduction to Industry 4.0 and Industrial Internet of Things',
    issuer: 'NPTEL — IIT Kharagpur',
    issuerFull: 'National Programme on Technology Enhanced Learning, IIT Kharagpur (SWAYAM)',
    period: 'Jul–Oct 2024',
    duration: '12-week course',
    score: 60,
    scoreDetail: 'Assignments: 24.16/25 · Proctored Exam: 35.5/75',
    rollNo: 'NPTEL24CS95S2350100373',
    coordinator: 'Prof. Haimanti Banerji',
    description:
      'Earned Elite certification in Industry 4.0 and Industrial IoT — covering cyber-physical systems, smart manufacturing, IIoT architecture, and emerging industrial technologies. 60% consolidated score among 15,725 certified candidates.',
    skills: ['Industry 4.0', 'IIoT', 'Cyber-Physical Systems', 'Smart Manufacturing', 'IoT Architecture'],
    color: '#06b6d4',
    badge: '🏭',
    eliteBadge: true,
    verified: true,
    credentialUrl: '/introduction to industry 4.0 and industrial internet of things certificate.pdf',
    totalCertified: '15,725',
    image: '/certificates/industry_4_0.png',
    issuerLogo: '/logos/nptel_logo.png',
  },
  {
    title: 'Computer Networks and Internet Protocol',
    issuer: 'NPTEL — IIT Kharagpur',
    issuerFull: 'National Programme on Technology Enhanced Learning, IIT Kharagpur (SWAYAM)',
    period: 'Jan–Apr 2025',
    duration: '12-week course',
    score: 56,
    scoreDetail: 'Assignments: 24.22/25 · Proctored Exam: 31.5/75',
    rollNo: 'NPTEL25CS15S1142901050',
    coordinator: 'Prof. Haimanti Banerji',
    description:
      'Completed NPTEL certification in Computer Networks and Internet Protocol — covering TCP/IP, network layers, routing protocols, subnetting, and internet architecture. Scored 56% among 6,290 certified candidates.',
    skills: ['TCP/IP', 'Computer Networks', 'Routing Protocols', 'Internet Architecture', 'Subnetting'],
    color: '#6366f1',
    badge: '🌐',
    eliteBadge: false,
    verified: true,
    credentialUrl: '/Computer Networks And Internet Protocol.pdf',
    totalCertified: '6,290',
    image: '/certificates/computer_networks.png',
    issuerLogo: '/logos/nptel_logo.png',
  },
  {
    title: 'Programming with Python',
    issuer: 'Moniba Technology & Innovations',
    issuerFull: 'Moniba Technology & Innovations, Kolkata',
    period: '1 Jul – 29 Jul 2024',
    duration: '4-week course',
    score: null,
    scoreDetail: null,
    rollNo: '20240905MON0030',
    coordinator: 'Monisha Ghosh (Delivery Manager)',
    description:
      'Internship certification for successfully completing "Programming with Python" at Moniba Technology & Innovations, Kolkata. Covered Python fundamentals, data structures, OOP, and practical scripting for automation and development.',
    skills: ['Python', 'OOP', 'Data Structures', 'Automation', 'Scripting', 'Problem Solving'],
    color: '#f472b6',
    badge: '🐍',
    eliteBadge: false,
    verified: true,
    credentialUrl: '/Moniba Technology.pdf',
    totalCertified: null,
    image: '/certificates/moniba_technology.png',
    issuerLogo: '/logos/python_logo.webp',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte Australia',
    issuerFull: 'Deloitte Australia Technology Virtual Experience Program via Forage',
    period: '2024',
    duration: 'Virtual Experience',
    score: null,
    scoreDetail: null,
    rollNo: 'Forage-Deloitte-2024',
    coordinator: 'Deloitte Virtual Experience Program',
    description:
      'Completed a practical job simulation focusing on Data Analytics. Advised a hypothetical client by cleaning, modeling, and analyzing diverse datasets. Built scalable dashboards to uncover actionable insights regarding content trends and user engagement.',
    skills: ['Data Analytics', 'Data Cleaning', 'Data Modeling', 'Data Visualization', 'Business Insights'],
    color: '#86bc25',
    badge: '📊',
    eliteBadge: false,
    verified: true,
    credentialUrl: '/Data Analytics Job Simulation certificate.pdf',
    totalCertified: null,
    image: '/certificates/data_analytics.png',
    issuerLogo: '/logos/deloitte_logo.png',
  },
  {
    title: 'AI / ML Internship Certification',
    issuer: 'OCAC Bhubaneswar',
    issuerFull: 'Odisha Computer Application Centre',
    period: '2024',
    duration: 'Internship Program',
    score: null,
    scoreDetail: null,
    rollNo: '2024-OCAC-AIML',
    coordinator: 'OCAC Training Division',
    description:
      'Earned certification for successfully completing an AI/ML internship. Designed and deployed predictive models and OCR-driven document pipelines tailored for public-sector digital workflows, translating technical architecture into operational value.',
    skills: ['AI/ML', 'OCR', 'Computer Vision', 'Deep Learning', 'Predictive Modeling'],
    color: '#8b5cf6',
    badge: '🤖',
    eliteBadge: false,
    verified: true,
    credentialUrl: '/ai internship certificate.jpeg',
    totalCertified: null,
    image: '/certificates/ai_internship.jpeg',
    issuerLogo: '/logos/ocac_logo.jpeg',
  },
  {
    title: 'Cyber Security Job Simulation',
    issuer: 'Deloitte Australia',
    issuerFull: 'Cyber Security Job Simulation via Forage',
    period: '2024',
    duration: 'Virtual Experience',
    score: null,
    scoreDetail: null,
    rollNo: 'Forage-Cyber-2024',
    coordinator: 'Forage Virtual Experience Program',
    description:
      'Completed a practical job simulation focusing on Cyber Security. Gained hands-on experience in identifying vulnerabilities, analyzing threats, and implementing security protocols.',
    skills: ['Cyber Security', 'Threat Analysis', 'Vulnerability Assessment', 'Security Protocols'],
    color: '#0ea5e9',
    badge: '🛡️',
    eliteBadge: false,
    verified: true,
    credentialUrl: '/Cyber job Deloitte certificate.pdf',
    totalCertified: null,
    image: '/certificates/cyber_job.png',
    issuerLogo: '/logos/deloitte_logo.png',
  },
  {
    title: 'Technology Job Simulation',
    issuer: 'Deloitte Australia',
    issuerFull: 'Technology Job Simulation via Forage',
    period: '2024',
    duration: 'Virtual Experience',
    score: null,
    scoreDetail: null,
    rollNo: 'Forage-Tech-2024',
    coordinator: 'Forage Virtual Experience Program',
    description:
      'Completed a practical job simulation focusing on Technology. Developed software solutions, analyzed system architectures, and collaborated on technical problem-solving.',
    skills: ['Software Development', 'System Architecture', 'Problem Solving', 'Technology'],
    color: '#f59e0b',
    badge: '💻',
    eliteBadge: false,
    verified: true,
    credentialUrl: '/Technology Job certificate.pdf',
    totalCertified: null,
    image: '/certificates/technology_job.png',
    issuerLogo: '/logos/deloitte_logo.png',
  },
];

// ─── Score Ring SVG ────────────────────────────────────────────────────────────
function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg width="64" height="64" className="-rotate-90">
        {/* Track */}
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="4" stroke="rgba(255,255,255,0.08)" />
        {/* Progress */}
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="4"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - dash }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 4px ${color}90)` }}
        />
      </svg>
      <span className="absolute text-[13px] font-bold font-mono" style={{ color }}>
        {score}%
      </span>
    </div>
  );
}

// ─── Cert Card ─────────────────────────────────────────────────────────────────
function CertCard({
  cert,
  index,
  onClick,
}: {
  cert: typeof certs[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 18,
        mass: 0.8,
        delay: (index % 3) * 0.08,
        filter: { duration: 0.5, ease: 'easeOut' },
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 350, damping: 22 },
      }}
      onClick={onClick}
      className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
      style={{ willChange: 'transform, opacity, filter' }}
    >
      <div
        className="relative h-full flex flex-col bg-white/[0.02] dark:bg-white/[0.025] border border-white/10 dark:border-white/10 backdrop-blur-2xl overflow-hidden"
        style={{
          borderRadius: '1.5rem',
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${cert.color}15, transparent 65%)` }}
          transition={{ duration: 0.4 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: (index % 3) * 0.08 + 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Certificate image */}
        <div className="relative w-full h-44 overflow-hidden bg-black/10 dark:bg-black/20 shrink-0">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <AcademicCapIcon className="w-12 h-12 opacity-20 text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent pointer-events-none" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex flex-col justify-end p-5">
            <motion.div
              className="translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-out"
            >
              <p className="text-slate-200 text-xs leading-relaxed mb-3 line-clamp-4">
                {cert.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {cert.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-mono"
                    style={{ background: `${cert.color}20`, color: cert.color, border: `1px solid ${cert.color}35` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Card body */}
        <div className="relative z-10 p-5 flex flex-col flex-1 justify-between gap-4">
          {/* Issuer row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Circular issuer logo */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md"
                style={{ background: `${cert.color}18`, border: `2px solid ${cert.color}40` }}
              >
                {cert.issuerLogo ? (
                  <img src={cert.issuerLogo} alt={cert.issuer} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-lg">{cert.badge}</span>
                )}
              </div>
              <div>
                <p className="text-[11px] font-mono font-bold uppercase tracking-wider" style={{ color: cert.color }}>
                  {cert.issuer}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <CalendarIcon className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] font-mono text-slate-400">{cert.period}</span>
                </div>
              </div>
            </div>

            {/* Score ring or badges */}
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              {cert.score !== null ? (
                <ScoreRing score={cert.score} color={cert.color} />
              ) : (
                <div className="flex flex-col gap-1">
                  {cert.verified && (
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                    >
                      <CheckBadgeIcon className="w-3 h-3" style={{ color: cert.color }} />
                      <span className="text-[9px] font-mono" style={{ color: cert.color }}>Verified</span>
                    </div>
                  )}
                </div>
              )}
              {cert.eliteBadge && (
                <motion.div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.45)' }}
                  animate={{ boxShadow: ['0 0 0px rgba(251,191,36,0)', '0 0 10px rgba(251,191,36,0.4)', '0 0 0px rgba(251,191,36,0)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <StarIcon className="w-3 h-3 text-yellow-400" />
                  <span className="text-[9px] font-mono text-yellow-400">Elite</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="flex items-start gap-2.5">
            <div
              className="mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}35` }}
            >
              <AcademicCapIcon className="w-3.5 h-3.5" style={{ color: cert.color }} />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{cert.title}</h3>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{ borderColor: `${cert.color}18` }}
          >
            <div>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Roll / Cert ID</p>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate max-w-[130px]">{cert.rollNo}</p>
            </div>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[10px] font-mono transition-all group/link hover:gap-1.5"
              style={{ color: cert.color }}
            >
              <span className="group-hover/link:underline">Verify</span>
              <ArrowTopRightOnSquareIcon className="w-2.5 h-2.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ──────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }: { cert: typeof certs[0]; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <motion.div
        className="relative z-10 max-w-lg w-full rounded-3xl overflow-hidden flex flex-col max-h-[88vh]"
        style={{
          background: 'rgba(10,10,15,0.85)',
          border: `1px solid ${cert.color}30`,
          boxShadow: `0 0 80px ${cert.color}20, 0 30px 60px rgba(0,0,0,0.7)`,
          backdropFilter: 'blur(40px)',
        }}
        initial={{ scale: 0.93, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative w-full h-52 shrink-0 overflow-hidden">
          {cert.image && (
            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover object-top" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-black/30 to-transparent" />
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-xl bg-black/40 text-white hover:bg-black/60 hover:scale-110 transition-all border border-white/20 z-20"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Title + badges */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden border-2"
                  style={{ borderColor: `${cert.color}50` }}
                >
                  {cert.issuerLogo && (
                    <img src={cert.issuerLogo} alt={cert.issuer} className="w-full h-full object-cover" />
                  )}
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: cert.color }}>
                  {cert.issuer}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">{cert.title}</h3>
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              {cert.score !== null && <ScoreRing score={cert.score} color={cert.color} />}
              {cert.eliteBadge && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)' }}>
                  <StarIcon className="w-3 h-3 text-yellow-400" />
                  <span className="text-[10px] font-mono text-yellow-400">Elite</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed mb-5">{cert.description}</p>

          {/* Score detail */}
          {cert.scoreDetail && (
            <div className="mb-4 p-3 rounded-xl text-xs font-mono text-slate-400"
              style={{ background: `${cert.color}08`, border: `1px solid ${cert.color}20` }}>
              {cert.scoreDetail}
            </div>
          )}

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1 rounded-xl font-mono"
                style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Credential ID</p>
              <p className="text-xs font-mono text-slate-300 mt-0.5">{cert.rollNo}</p>
            </div>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${cert.color}30, ${cert.color}15)`,
                color: cert.color,
                border: `1px solid ${cert.color}40`,
                boxShadow: `0 4px 20px ${cert.color}20`,
              }}
            >
              View Certificate
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function CertificationsSection() {
  const [selected, setSelected] = useState<typeof certs[0] | null>(null);

  return (
    <section id="certifications" className="relative py-24 px-6 overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Certifications &"
          highlight="Achievements"
          badge="Credentials"
        />

        <motion.div
          className="mb-12 -mt-4"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl text-lg">
            NPTEL certifications from IIT Kharagpur and professional internship credentials.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <CertCard key={cert.rollNo} cert={cert} index={i} onClick={() => setSelected(cert)} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs font-mono text-slate-500">
            NPTEL certifications are IIT-issued, funded by Ministry of Education, Govt. of India (SWAYAM platform) · IIT Kharagpur
          </p>
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}