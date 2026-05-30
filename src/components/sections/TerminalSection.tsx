'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { SectionHeading } from '../ui/SectionHeading';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system' | 'success';
  content: string;
}

const BOOT_SEQUENCE = [
  "Initializing Kernel AbhinashOS v1.0.4...",
  "Loading portfolio modules... [OK]",
  "Mounting virtual filesystem... [OK]",
  "Starting display server... [OK]",
  "Establishing secure connection... [OK]",
  "System ready."
];

const THEMES: Record<string, string> = {
  default: 'text-green-400',
  matrix: 'text-[#00FF41]',
  neon: 'text-pink-400',
  cyber: 'text-cyan-400',
  hacker: 'text-amber-400',
  light: 'text-slate-800 dark:text-slate-200'
};

const commands: Record<string, string[]> = {
  help: [
    '╭───────────────────────────────────────────────────╮',
    '│                 AVAILABLE COMMANDS                │',
    '├───────────────────────────────────────────────────┤',
    '│  about     → Display developer profile            │',
    '│  skills    → List technical expertise             │',
    '│  projects  → Show featured repositories           │',
    '│  contact   → Display connection endpoints         │',
    '│  theme     → Change UI color (e.g., theme neon)   │',
    '│  analyze   → Run system diagnostics               │',
    '│  gui       → Exit terminal mode                   │',
    '│  clear     → Clear console output                 │',
    '│  help      → Show this menu                       │',
    '╰───────────────────────────────────────────────────╯',
  ],
  about: [
    '> Fetching user profile...',
    '',
    '  IDENTITY: Abhinash Pradhan',
    '  ROLE    : Full Stack Developer + AI/ML Enthusiast',
    '  BASE    : India',
    '  STATUS  : Ready for new challenges',
    '',
    '  Passionate about building intelligent web experiences',
    '  at the intersection of software engineering and AI.',
  ],
  skills: [
    '> Scanning technical capabilities...',
    '',
    '  [LANGUAGES] : Java, Python, JavaScript, TypeScript',
    '  [FRONTEND]  : React, Next.js, TailwindCSS, Framer Motion',
    '  [BACKEND]   : Node.js, Express.js, REST APIs',
    '  [AI/ML]     : scikit-learn, TensorFlow, Pandas',
    '  [DATABASES] : MongoDB, MySQL, Supabase',
    '',
    '  SYSTEM PROFICIENCY: [██████████████████░░] 90%',
  ],
  projects: [
    '> Accessing project database...',
    '',
    '  1. Career AI Platform       [Next.js, Node.js, LLMs]',
    '  2. Aakash Weather App       [React 19, Three.js]',
    '  3. Vigil System Chatbot     [React, Node.js, NLP]',
    '  4. Invoice AI Predictor     [Python, XGBoost]',
    '  5. TASKOPS Dashboard        [React, Supabase]',
    '  6. Plant Disease Predictor  [TensorFlow, CNN]',
    '',
    '  Type `clear` to return to clean workspace.',
  ],
  contact: [
    '> Establishing secure comms...',
    '',
    '  [EMAIL]    abhinashpradhan7658@gmail.com',
    '  [GITHUB]   github.com/abhinashp25',
    '  [LINKEDIN] linkedin.com/in/abhinash-pradhan-74b389294',
    '',
    '  Awaiting transmission...',
  ],
  gui: [
    '> Initiating GUI Mode...',
    '  Just kidding! You are already in the GUI.',
    '  Scroll up or down to explore the rest of the portfolio.',
  ]
};

export default function TerminalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState('default');
  
  const [lines, setLines] = useState<Array<TerminalLine>>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<string>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible && booting) {
      let currentLine = 0;
      setLines([]);
      
      const interval = setInterval(() => {
        if (currentLine < BOOT_SEQUENCE.length) {
          setLines(prev => [...prev, { type: 'system', content: BOOT_SEQUENCE[currentLine] }]);
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setLines([
              { type: 'output', content: '╭───────────────────────────────────────────────╮' },
              { type: 'output', content: '│      ABHINASH OS - DEVELOPER CONSOLE v2.0     │' },
              { type: 'output', content: '╰───────────────────────────────────────────────╯' },
              { type: 'output', content: '' },
              { type: 'output', content: "Type 'help' to see available commands or 'theme' to change colors." },
              { type: 'output', content: '' },
            ]);
            setBooting(false);
          }, 500);
        }
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [visible, booting]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, isAnalyzing]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setLines(prev => [...prev, { type: 'input', content: `$ analyze` }]);
    
    const steps = [
      "Running memory diagnostics...",
      "Analyzing DOM nodes...",
      "Measuring render performance...",
      "Calculating neural efficiency..."
    ];
    
    for (const step of steps) {
      setLines(prev => [...prev, { type: 'system', content: `> ${step}` }]);
      await new Promise(r => setTimeout(r, 600));
    }
    
    setLines(prev => [
      ...prev,
      { type: 'success', content: ' ' },
      { type: 'success', content: 'DIAGNOSTICS COMPLETE [100%]' },
      { type: 'output', content: '  Performance : Outstanding' },
      { type: 'output', content: '  Security    : Optimal' },
      { type: 'output', content: '  Creativity  : Maximum Capacity' },
      { type: 'output', content: ' ' }
    ]);
    setIsAnalyzing(false);
  };

  const handleCommand = (cmd: string) => {
    if (isAnalyzing || booting) return;
    
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(' ');
    const baseCmd = args[0];

    if (baseCmd === 'analyze') {
      handleAnalyze();
      setInput('');
      setHistory(prev => [cmd, ...prev.slice(0, 19)]);
      setHistoryIndex(-1);
      return;
    }

    const newLines: Array<TerminalLine> = [
      ...lines,
      { type: 'input', content: `$ ${cmd}` },
    ];

    if (baseCmd === 'clear') {
      setLines([
        { type: 'output', content: "Terminal cleared. Type 'help' for commands." },
        { type: 'output', content: '' },
      ]);
    } else if (baseCmd === 'theme') {
      const selected = args[1];
      if (selected && THEMES[selected]) {
        setTheme(selected);
        newLines.push({ type: 'success', content: `> Theme updated to '${selected}'` });
      } else {
        newLines.push({ type: 'output', content: `Usage: theme <color>` });
        newLines.push({ type: 'output', content: `Available: ${Object.keys(THEMES).join(', ')}` });
      }
      newLines.push({ type: 'output', content: '' });
      setLines(newLines);
    } else if (commands[baseCmd]) {
      commands[baseCmd].forEach((line) => {
        newLines.push({ type: 'output', content: line });
      });
      newLines.push({ type: 'output', content: '' });
      setLines(newLines);
    } else if (trimmed === '') {
      setLines([...lines, { type: 'input', content: '$' }]);
    } else {
      newLines.push({
        type: 'error',
        content: `Command not found: '${baseCmd}'. Type 'help' for available commands.`,
      });
      newLines.push({ type: 'output', content: '' });
      setLines(newLines);
    }

    if (trimmed) {
      setHistory((prev) => [cmd, ...prev.slice(0, 19)]);
    }
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isAnalyzing || booting) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = [...Object.keys(commands), 'theme', 'analyze'];
      const currentInput = input.trim().toLowerCase();
      
      if (!currentInput) return;
      
      const matches = availableCommands.filter(c => c.startsWith(currentInput));
      
      if (matches.length === 1) {
        setInput(matches[0] + ' ');
      } else if (matches.length > 1) {
        setLines(prev => [
          ...prev,
          { type: 'input', content: `$ ${input}` },
          { type: 'output', content: matches.join('    ') },
          { type: 'output', content: '' }
        ]);
      }
    }
  };

  const textColorClass = THEMES[theme] || THEMES.default;

  return (
    <section id="terminal" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
        <div className="w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading 
          title="Developer" 
          highlight="Console" 
          badge="Interactive Shell" 
          align="center"
        />
        <motion.div 
          className="mb-12 text-center -mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            Execute commands to explore my technical footprint. Try <code className="text-indigo-300 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded font-mono text-sm border border-black/10 dark:border-white/10">theme neon</code> or press <code className="text-indigo-300 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded font-mono text-sm border border-black/10 dark:border-white/10">Tab</code> to autocomplete.
          </p>
        </motion.div>

        <div
          className={`rounded-[24px] overflow-hidden backdrop-blur-3xl transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'opacity-0 translate-y-12'}`}
          style={{
            background: 'linear-gradient(145deg, rgba(15,23,42,0.8) 0%, rgba(2,6,23,0.95) 100%)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.5)',
            transitionDelay: '150ms',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <div className="flex gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-inner" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-inner" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-inner" />
            </div>
            
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-black/30 border border-white/5 shadow-inner">
              <SparklesIcon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="text-xs font-mono text-slate-700 dark:text-slate-300">abhinash@portfolio ~ -zsh</span>
            </div>
            
            <div className="w-12" />
          </div>

          <div
            ref={terminalRef}
            className="p-6 md:p-8 h-[450px] overflow-y-auto font-mono text-sm sm:text-base cursor-text scroll-smooth"
          >
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`leading-relaxed whitespace-pre font-medium mb-1 ${
                  line.type === 'input' ? 'text-white'
                  : line.type === 'error' ? 'text-red-400'
                  : line.type === 'system' ? 'text-slate-400'
                  : line.type === 'success' ? 'text-emerald-400'
                  : textColorClass
                }`}
              >
                {line.content}
              </motion.div>
            ))}

            {!booting && (
              <div className={`flex items-center gap-3 mt-2 ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`}>
                <span className="text-indigo-400 font-bold">➜</span>
                <span className="text-cyan-400 font-bold">~</span>
                <div className="flex-1 relative flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isAnalyzing}
                    className={`w-full bg-transparent outline-none font-mono text-white caret-transparent ${isAnalyzing ? 'cursor-not-allowed' : ''}`}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span 
                    className={`absolute h-5 bg-white mix-blend-difference pointer-events-none ${isAnalyzing ? '' : 'animate-blink'}`}
                    style={{
                      width: '10px',
                      left: `${input.length}ch`,
                    }}
                  />
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}
