'use client';

import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  CalendarIcon,
  ArrowTopRightOnSquareIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const certs = [
  {
    title: 'Affective Computing',
    issuer: 'NPTEL — IIT Kharagpur',
    issuerFull: 'National Programme on Technology Enhanced Learning, IIT Kharagpur (SWAYAM)',
    period: 'Jan–Apr 2026',
    duration: '12-week course',
    score: '68%',
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
    score: '60%',
    scoreDetail: 'Assignments: 24.16/25 · Proctored Exam: 35.5/75',
    rollNo: 'NPTEL24CS95S2350100373',
    coordinator: 'Prof. Haimanti Banerji',
    description:
      'Earned Elite certification in Industry 4.0 and Industrial IoT — covering cyber-physical systems, smart manufacturing, IIoT architecture, and emerging industrial technologies. 60% consolidated score among 15,725 certified candidates.',
    skills: [
      'Industry 4.0',
      'IIoT',
      'Cyber-Physical Systems',
      'Smart Manufacturing',
      'IoT Architecture',
    ],
    color: '#06b6d4',
    badge: '🏭',
    eliteBadge: true,
    verified: true,
    credentialUrl:
      '/introduction to industry 4.0 and industrial internet of things certificate.pdf',
    totalCertified: '15,725',
    image:
      '/certificates/industry_4_0.png',
    issuerLogo: '/logos/nptel_logo.png',
  },
  {
    title: 'Computer Networks and Internet Protocol',
    issuer: 'NPTEL — IIT Kharagpur',
    issuerFull: 'National Programme on Technology Enhanced Learning, IIT Kharagpur (SWAYAM)',
    period: 'Jan–Apr 2025',
    duration: '12-week course',
    score: '56%',
    scoreDetail: 'Assignments: 24.22/25 · Proctored Exam: 31.5/75',
    rollNo: 'NPTEL25CS15S1142901050',
    coordinator: 'Prof. Haimanti Banerji',
    description:
      'Completed NPTEL certification in Computer Networks and Internet Protocol — covering TCP/IP, network layers, routing protocols, subnetting, and internet architecture. Scored 56% among 6,290 certified candidates.',
    skills: [
      'TCP/IP',
      'Computer Networks',
      'Routing Protocols',
      'Internet Architecture',
      'Subnetting',
    ],
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
    skills: [
      'Data Analytics',
      'Data Cleaning',
      'Data Modeling',
      'Data Visualization',
      'Business Insights',
    ],
    color: '#86bc25', // Deloitte Green
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

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-cyber-500" />
            <span className="text-cyber-400 font-mono text-sm tracking-widest uppercase">
              Credentials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Certifications &{' '}
            <span style={{ color: '#06b6d4', textShadow: '0 0 20px rgba(6,182,212,0.5)' }}>
              Achievements
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-lg">
            NPTEL certifications from IIT Kharagpur and professional internship credentials.
          </p>
        </motion.div>

        {/* Cert cards — 3 column on large, 1 on mobile */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative h-full rounded-2xl overflow-hidden flex flex-col backdrop-blur-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                {/* Certificate Image Top Half */}
                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 shrink-0">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <AcademicCapIcon className="w-12 h-12 opacity-20" />
                    </div>
                  )}
                  {/* Overlay gradient for seamless blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

                  {/* Hover Overlay with Description & Skills (No Layout Shift) */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col justify-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col h-full justify-end">
                      <p className="text-slate-300 text-xs leading-relaxed mb-4">
                        {cert.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 rounded font-mono"
                            style={{
                              background: `${cert.color}15`,
                              color: cert.color,
                              border: `1px solid ${cert.color}30`,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 overflow-hidden"
                          style={{
                            background: `${cert.color}15`,
                            border: `1px solid ${cert.color}30`,
                          }}
                        >
                          {cert.issuerLogo ? (
                            <img
                              src={cert.issuerLogo}
                              alt={cert.issuer}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            cert.badge
                          )}
                        </div>
                        <div>
                          <p
                            className="text-xs font-mono font-bold uppercase tracking-wider"
                            style={{ color: cert.color }}
                          >
                            {cert.issuer}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <CalendarIcon className="w-3 h-3 text-slate-500" />
                            <span className="text-xs font-mono text-slate-500">{cert.period}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        {cert.verified && (
                          <div
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                            style={{
                              background: `${cert.color}15`,
                              border: `1px solid ${cert.color}30`,
                            }}
                          >
                            <CheckBadgeIcon className="w-3 h-3" style={{ color: cert.color }} />
                            <span className="text-[10px] font-mono" style={{ color: cert.color }}>
                              Verified
                            </span>
                          </div>
                        )}
                        {cert.eliteBadge && (
                          <div
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                            style={{
                              background: 'rgba(251,191,36,0.15)',
                              border: '1px solid rgba(251,191,36,0.4)',
                            }}
                          >
                            <StarIcon className="w-3 h-3 text-yellow-400" />
                            <span className="text-[10px] font-mono text-yellow-400">Elite</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex items-start gap-2.5">
                      <div
                        className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${cert.color}15`,
                          border: `1px solid ${cert.color}30`,
                        }}
                      >
                        <AcademicCapIcon className="w-3.5 h-3.5" style={{ color: cert.color }} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{cert.title}</h3>
                    </div>
                  </div>

                  {/* Footer row (ALWAYS VISIBLE) */}
                  <div
                    className="flex items-center justify-between mt-6 pt-4 border-t"
                    style={{ borderColor: `${cert.color}15` }}
                  >
                    <div>
                      <p className="text-[9px] font-mono text-slate-700 uppercase tracking-wider">
                        Roll / Cert ID
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">{cert.rollNo}</p>
                    </div>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] font-mono transition-colors group/link"
                      style={{ color: cert.color }}
                    >
                      <span className="group-hover/link:underline">Verify</span>
                      <ArrowTopRightOnSquareIcon className="w-2.5 h-2.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* NPTEL powered by swayam note */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs font-mono text-slate-600">
            NPTEL certifications are IIT-issued, funded by Ministry of Education, Govt. of India
            (SWAYAM platform) · IIT Kharagpur
          </p>
        </motion.div>
      </div>
    </section>
  );
}
