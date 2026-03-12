'use client';

import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  description: string;
  color: string;
  size: number;
  x: number;
  y: number;
}

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
  { name: 'SQL', description: 'Database design & complex queries', color: '#67e8f9', size: 56 },
  { name: 'TailwindCSS', description: 'Utility-first responsive styling', color: '#c084fc', size: 55 },
  { name: 'Pandas', description: 'Data manipulation & analysis', color: '#34d399', size: 54 },
  { name: 'NumPy', description: 'Numerical computing & arrays', color: '#60a5fa', size: 52 },
  { name: 'Matplotlib', description: 'Data visualization & plotting', color: '#f472b6', size: 52 },
  { name: 'Flask', description: 'Lightweight Python web framework', color: '#94a3b8', size: 50 },
  { name: 'Git', description: 'Version control & branching', color: '#fb7185', size: 50 },
  { name: 'GitHub', description: 'Code hosting & collaboration', color: '#e2e8f0', size: 50 },
  { name: 'Streamlit', description: 'Rapid ML app deployment', color: '#ff4b4b', size: 48 },
  { name: 'OCR', description: 'Optical character recognition systems', color: '#fbbf24', size: 46 },
];

const skillCategories = [
  { label: 'Languages', skills: ['Python', 'JavaScript', 'HTML', 'CSS'], color: '#6366f1' },
  { label: 'Frontend', skills: ['React', 'Next.js', 'TailwindCSS'], color: '#f472b6' },
  { label: 'Backend', skills: ['Node.js', 'Flask', 'Express.js'], color: '#06b6d4' },
  { label: 'ML / AI', skills: ['Machine Learning', 'Deep Learning', 'Pandas', 'NumPy', 'Matplotlib', 'Streamlit', 'OCR'], color: '#22d3ee' },
  { label: 'Databases', skills: ['MongoDB', 'SQL'], color: '#4ade80' },
  { label: 'Tools', skills: ['Git', 'GitHub'], color: '#fb7185' },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState<(typeof skillsData[0] & { x: number; y: number })[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const placed: { x: number; y: number; size: number }[] = [];
    const containerW = 900;
    const containerH = 520;

    const positioned = skillsData.map((skill) => {
      let x = 0, y = 0;
      let attempts = 0;
      do {
        x = skill.size / 2 + 20 + Math.random() * (containerW - skill.size - 40);
        y = skill.size / 2 + 20 + Math.random() * (containerH - skill.size - 40);
        attempts++;
      } while (
        attempts < 150 &&
        placed.some((p) => {
          const dx = p.x - x;
          const dy = p.y - y;
          return Math.sqrt(dx * dx + dy * dy) < (p.size + skill.size) / 2 + 15;
        })
      );
      placed.push({ x, y, size: skill.size });
      return { ...skill, x, y };
    });
    setSkills(positioned);
  }, []);

  const isHighlighted = (skillName: string) => {
    if (!activeCategory) return true;
    const cat = skillCategories.find((c) => c.label === activeCategory);
    return cat ? cat.skills.includes(skillName) : true;
  };

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Skills Galaxy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Technology{' '}
            <span style={{ color: '#06b6d4', textShadow: '0 0 20px rgba(6,182,212,0.6)' }}>Universe</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            Hover over each skill orb to explore my expertise. Filter by category below.
          </p>
        </div>

        {/* Category filters */}
        <div
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '100ms' }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
              !activeCategory ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
            style={{
              background: !activeCategory ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${!activeCategory ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            All Skills
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                activeCategory === cat.label ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
              style={{
                background: activeCategory === cat.label ? `${cat.color}30` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeCategory === cat.label ? `${cat.color}60` : 'rgba(255,255,255,0.08)'}`,
                color: activeCategory === cat.label ? cat.color : undefined,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills galaxy container */}
        <div
          className={`relative w-full rounded-3xl overflow-hidden transition-all duration-700 ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            height: '520px',
            transitionDelay: '200ms',
            background: 'rgba(15,23,42,0.8)',
            border: '1px solid rgba(99,102,241,0.15)',
            boxShadow: '0 0 60px rgba(99,102,241,0.05), inset 0 0 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* Space background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-dark-900 to-slate-900" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(99,102,241,0.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Skill orbs */}
          {skills.map((skill, i) => {
            const isHovered = hoveredSkill === skill.name;
            const highlighted = isHighlighted(skill.name);
            const floatDelay = `${(i * 0.5) % 6}s`;
            const floatDuration = `${5 + (i % 4)}s`;

            return (
              <div
                key={skill.name}
                className="absolute transition-all duration-500"
                style={{
                  left: `${(skill.x / 900) * 100}%`,
                  top: `${(skill.y / 520) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isHovered ? 20 : 10,
                  opacity: highlighted ? 1 : 0.2,
                }}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-xl px-3 py-2 whitespace-nowrap z-30 pointer-events-none"
                    style={{
                      background: 'rgba(15,23,42,0.95)',
                      border: `1px solid ${skill.color}50`,
                      boxShadow: `0 0 20px ${skill.color}30`,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <p className="text-white text-xs font-semibold">{skill.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5 max-w-[180px] whitespace-normal">{skill.description}</p>
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: `5px solid ${skill.color}50`,
                      }}
                    />
                  </div>
                )}

                {/* Orb */}
                <div
                  className="rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                  style={{
                    width: skill.size,
                    height: skill.size,
                    background: `radial-gradient(circle at 35% 35%, ${skill.color}50, ${skill.color}15)`,
                    border: `1px solid ${skill.color}${isHovered ? '90' : '35'}`,
                    boxShadow: isHovered
                      ? `0 0 30px ${skill.color}70, 0 0 60px ${skill.color}30, inset 0 0 20px ${skill.color}20`
                      : `0 0 12px ${skill.color}25`,
                    transform: isHovered ? 'scale(1.35)' : 'scale(1)',
                    animation: `float ${floatDuration} ease-in-out infinite`,
                    animationDelay: floatDelay,
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <span
                    className="font-bold font-mono text-center px-1 leading-tight"
                    style={{
                      color: skill.color,
                      fontSize: skill.size > 65 ? '11px' : skill.size > 50 ? '9px' : '8px',
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Corner label */}
          <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-600 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
            Hover to explore
          </div>
          <div className="absolute top-4 left-4 text-xs font-mono text-slate-700">
            {skillsData.length} skills
          </div>
        </div>

        {/* Skill tags grid */}
        <div
          className={`mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {skillCategories.map((cat) => (
            <div
              key={cat.label}
              className="rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${cat.color}20`,
              }}
            >
              <div
                className="text-xs font-mono font-bold mb-3 tracking-widest uppercase"
                style={{ color: cat.color }}
              >
                {cat.label}
              </div>
              <div className="space-y-1.5">
                {cat.skills.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: cat.color, boxShadow: `0 0 4px ${cat.color}` }}
                    />
                    <span className="text-xs text-slate-400 font-mono">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
