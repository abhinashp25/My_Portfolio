'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data generator for a premium active GitHub year
const generateMockData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (364 - i));
    
    // Create professional looking mock activity
    // Higher probability of activity on weekdays
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    let intensity = 0;
    
    if (Math.random() > (isWeekend ? 0.7 : 0.3)) {
      intensity = Math.floor(Math.random() * 4) + 1; // 1 to 4
    }
    
    // Add artificial streaks (e.g., big project pushes)
    if (i > 300 && i < 330) intensity = Math.floor(Math.random() * 3) + 2; // High activity zone
    
    data.push({
      date: date.toISOString().split('T')[0],
      count: intensity === 0 ? 0 : intensity * 3 + Math.floor(Math.random() * 5),
      intensity
    });
  }
  return data;
};

export default function GithubHeatmap() {
  const [contributions, setContributions] = useState<any[]>([]);
  const [hoveredDay, setHoveredDay] = useState<any | null>(null);

  useEffect(() => {
    setContributions(generateMockData());
  }, []);

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return 'bg-white/5 border-white/5';
      case 1: return 'bg-emerald-500/20 border-emerald-500/30';
      case 2: return 'bg-emerald-400/40 border-emerald-400/50';
      case 3: return 'bg-emerald-400/60 border-emerald-400/70';
      case 4: return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)] border-emerald-300';
      default: return 'bg-white/5 border-white/5';
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Calculate total contributions
  const totalContributions = contributions.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-400" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Activity Heatmap
          </h3>
          <p className="text-sm text-slate-400 font-mono mt-1">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="min-w-[700px]">
          <div className="flex text-xs font-mono text-slate-500 mb-2 gap-10 opacity-70">
            {months.map(month => (
              <span key={month} className="flex-1">{month}</span>
            ))}
          </div>

          <div 
            className="flex gap-1"
            onMouseLeave={() => setHoveredDay(null)}
          >
            {/* Split data into weeks for rendering as a grid */}
            {Array.from({ length: 52 }).map((_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1">
                {contributions.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day, dayIdx) => (
                  <motion.div
                    key={`${weekIdx}-${dayIdx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (weekIdx * 0.01) + (dayIdx * 0.005) }}
                    className={`w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-colors duration-300 border ${getIntensityColor(day.intensity)}`}
                    onMouseEnter={() => setHoveredDay(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500">
        <a href="https://github.com/abhinashp25" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
          @abhinashp25
        </a>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-3 h-3 rounded-[2px] border ${getIntensityColor(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Floating Premium Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute top-6 right-6 pointer-events-none z-50 flex items-center gap-3 px-4 py-2.5 rounded-lg border border-white/10 bg-dark-800/90 backdrop-blur-xl shadow-2xl"
          >
            <div className={`w-3 h-3 rounded-full ${getIntensityColor(hoveredDay.intensity)} shadow-glow`} />
            <div>
              <p className="text-white text-sm font-semibold">
                {hoveredDay.count} contributions
              </p>
              <p className="text-slate-400 text-xs font-mono">
                {new Date(hoveredDay.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
