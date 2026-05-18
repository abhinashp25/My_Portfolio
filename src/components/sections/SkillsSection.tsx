'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = [
  { name: 'Python', description: 'Primary language for ML & automation', color: '#6366f1', size: 80 },
  { name: 'Machine Learning', description: 'scikit-learn, TensorFlow, model building', color: '#06b6d4', size: 75 },
  { name: 'React', description: 'Modern UI with hooks & state management', color: '#f472b6', size: 70 },
  { name: 'Node.js', description: 'Server-side JavaScript & REST APIs', color: '#818cf8', size: 68 },
  { name: 'Deep Learning', description: 'Neural networks & computer vision', color: '#22d3ee', size: 65 },
  { name: 'JavaScript', description: 'ES6+, async/await, DOM manipulation', color: '#f9a8d4', size: 60 },
  { name: 'MongoDB', description: 'NoSQL database design & aggregation', color: '#4ade80', size: 62 },
  { name: 'Next.js', description: 'Full-stack React framework & SSR', color: '#a78bfa', size: 60 },
  { name: 'HTML', description: 'Semantic markup & accessibility', color: '#fb923c', size: 58 },
  { name: 'CSS', description: 'Responsive design & animations', color: '#38bdf8', size: 58 },
  { name: 'Supabase', description: 'Open source Firebase alternative', color: '#3ecf8e', size: 56 },
  { name: 'TailwindCSS', description: 'Utility-first responsive styling', color: '#c084fc', size: 55 },
  { name: 'Pandas', description: 'Data manipulation & analysis', color: '#34d399', size: 54 },
  { name: 'NumPy', description: 'Numerical computing & arrays', color: '#60a5fa', size: 52 },
  { name: 'Matplotlib', description: 'Data visualization & plotting', color: '#f472b6', size: 52 },
  { name: 'Flask', description: 'Lightweight Python web framework', color: '#94a3b8', size: 50 },
  { name: 'Git', description: 'Version control & branching', color: '#fb7185', size: 50 },
  { name: 'GitHub', description: 'Code hosting & collaboration', color: '#64748b', size: 50 },
  { name: 'Streamlit', description: 'Rapid ML app deployment', color: '#ff4b4b', size: 48 },
  { name: 'OCR', description: 'Optical character recognition systems', color: '#fbbf24', size: 46 },
  { name: 'TypeScript', description: 'Typed JavaScript for scalable apps', color: '#3b82f6', size: 54 },
  { name: 'Java', description: 'Object-oriented programming language', color: '#f89820', size: 52 },
  { name: 'Express.js', description: 'Fast Node.js web framework', color: '#64748b', size: 52 },
  { name: 'FastAPI', description: 'High-performance Python API framework', color: '#10b981', size: 50 },
  { name: 'REST APIs', description: 'RESTful API design & integration', color: '#a78bfa', size: 50 },

  { name: 'Keras', description: 'High-level deep learning API', color: '#f43f5e', size: 46 },
];

const skillCategories = [
  { label: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'HTML', 'CSS'], color: '#6366f1' },
  { label: 'Frontend', skills: ['React', 'Next.js', 'TailwindCSS'], color: '#f472b6' },
  { label: 'Backend', skills: ['Node.js', 'Flask', 'Express.js', 'FastAPI', 'REST APIs'], color: '#06b6d4' },
  { label: 'ML / AI', skills: ['Machine Learning', 'Deep Learning', 'Keras', 'Pandas', 'NumPy', 'Matplotlib', 'Streamlit', 'OCR'], color: '#22d3ee' },
  { label: 'Databases', skills: ['MongoDB', 'Supabase'], color: '#4ade80' },
  { label: 'Tools', skills: ['Git', 'GitHub'], color: '#fb7185' },
];

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState<(typeof skillsData[0] & { x: number; y: number })[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const placed: { x: number; y: number; size: number }[] = [];
    const W = 900, H = 520;
    const positioned = skillsData.map((skill) => {
      let x = 0, y = 0, attempts = 0;
      do {
        x = skill.size / 2 + 20 + Math.random() * (W - skill.size - 40);
        y = skill.size / 2 + 20 + Math.random() * (H - skill.size - 40);
        attempts++;
      } while (
        attempts < 150 &&
        placed.some((p) => {
          const dx = p.x - x, dy = p.y - y;
          return Math.sqrt(dx * dx + dy * dy) < (p.size + skill.size) / 2 + 15;
        })
      );
      placed.push({ x, y, size: skill.size });
      return { ...skill, x, y };
    });
    setSkills(positioned);
  }, []);

  const isHighlighted = (name: string) => {
    if (!activeCategory) return true;
    const cat = skillCategories.find((c) => c.label === activeCategory);
    return cat ? cat.skills.includes(name) : true;
  };

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Skills Galaxy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Technology{' '}
            <span style={{ color: '#06b6d4', textShadow: '0 0 20px rgba(6,182,212,0.6)' }}>Universe</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-xl text-lg">
            Hover over each skill orb to explore. Filter by category below.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <motion.button
            onClick={() => setActiveCategory(null)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${!activeCategory ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'}`}
            style={{
              background: !activeCategory ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${!activeCategory ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            All Skills
          </motion.button>
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.label}
              onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${activeCategory === cat.label ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'}`}
              style={{
                background: activeCategory === cat.label ? `${cat.color}30` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeCategory === cat.label ? `${cat.color}60` : 'rgba(255,255,255,0.08)'}`,
                color: activeCategory === cat.label ? cat.color : undefined,
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Galaxy */}
        <motion.div
          className="relative w-full rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900"
          style={{
            height: '520px',
            border: '1px solid rgba(99,102,241,0.15)',
            boxShadow: '0 0 60px rgba(99,102,241,0.05), inset 0 0 60px rgba(0,0,0,0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-900 dark:via-dark-900 dark:to-slate-900" />
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(rgba(99,102,241,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <AnimatePresence>
            {skills.map((skill, i) => {
              const isHovered = hoveredSkill === skill.name;
              const highlighted = isHighlighted(skill.name);

              return (
                <motion.div
                  key={skill.name}
                  className="absolute"
                  style={{ left: `${(skill.x / 900) * 100}%`, top: `${(skill.y / 520) * 100}%`, transform: 'translate(-50%, -50%)' }}
                  animate={{ opacity: highlighted ? 1 : 0.15 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-xl px-3 py-2 whitespace-nowrap z-30 pointer-events-none bg-white/95 dark:bg-[#0f172a]/96"
                        style={{
                          border: `1px solid ${skill.color}50`,
                          boxShadow: `0 0 20px ${skill.color}30`,
                          backdropFilter: 'blur(10px)',
                        }}
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-slate-900 dark:text-white text-xs font-semibold">{skill.name}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5 max-w-[180px] whitespace-normal">{skill.description}</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                          style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${skill.color}50` }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Orb */}
                  <motion.div
                    className="rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      width: skill.size,
                      height: skill.size,
                      background: `radial-gradient(circle at 35% 35%, ${skill.color}50, ${skill.color}15)`,
                      border: `1px solid ${skill.color}${isHovered ? '90' : '35'}`,
                      animation: `float ${5 + (i % 4)}s ease-in-out infinite`,
                      animationDelay: `${(i * 0.5) % 6}s`,
                    }}
                    animate={{
                      scale: isHovered ? 1.35 : 1,
                      boxShadow: isHovered
                        ? `0 0 30px ${skill.color}70, 0 0 60px ${skill.color}30, inset 0 0 20px ${skill.color}20`
                        : `0 0 12px ${skill.color}25`,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span
                      className="font-bold font-mono text-center px-1 leading-tight select-none"
                      style={{ color: skill.color, fontSize: skill.size > 65 ? '11px' : skill.size > 50 ? '9px' : '8px' }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-600 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
            Hover to explore
          </div>
          <div className="absolute top-4 left-4 text-xs font-mono text-slate-700">{skillsData.length} skills</div>
        </motion.div>

        {/* Category grid */}
        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.label}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-4 transition-all duration-300 bg-black/5 dark:bg-white/5"
              style={{ border: `1px solid ${cat.color}20` }}
            >
              <div className="text-xs font-mono font-bold mb-3 tracking-widest uppercase" style={{ color: cat.color }}>
                {cat.label}
              </div>
              <div className="space-y-1.5">
                {cat.skills.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: cat.color, boxShadow: `0 0 4px ${cat.color}` }} />
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
