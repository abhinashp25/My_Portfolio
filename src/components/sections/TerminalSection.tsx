'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

const commands: Record<string, string[]> = {
  help: [
    '╔══════════════════════════════════════╗',
    '║         AVAILABLE COMMANDS           ║',
    '╠══════════════════════════════════════╣',
    '║  about     → About Abhinash          ║',
    '║  skills    → Tech stack & expertise  ║',
    '║  projects  → Portfolio projects      ║',
    '║  contact   → Get in touch            ║',
    '║  clear     → Clear terminal          ║',
    '║  help      → Show this menu          ║',
    '╚══════════════════════════════════════╝',
  ],
  about: [
    '> Loading profile...',
    '',
    '  Name    : Abhinash Pradhan',
    '  Role    : Full Stack Developer + AI/ML Enthusiast',
    '  Location: India',
    '  Status  : Available for opportunities',
    '',
    '  Passionate about building intelligent web experiences',
    '  at the intersection of software engineering and AI.',
    '',
    '  Currently working on ML-powered web applications.',
  ],
  skills: [
    '> Scanning tech stack...',
    '',
    '  ◆ Languages   : Python, JavaScript, TypeScript, SQL',
    '  ◆ Frontend    : React, Next.js, TailwindCSS',
    '  ◆ Backend     : Node.js, Express.js, REST APIs',
    '  ◆ ML/AI       : scikit-learn, TensorFlow, Pandas',
    '  ◆ Databases   : MongoDB, PostgreSQL, MySQL',
    '  ◆ Tools       : Git, Docker, Streamlit, OCR',
    '',
    '  Proficiency: ████████████████████ 85%',
  ],
  projects: [
    '> Fetching repositories...',
    '',
    '  [1] Payment Date Prediction',
    '      → ML model | Python, XGBoost | 87% accuracy',
    '',
    '  [2] Global Currency Detection AI',
    '      → Computer Vision | TensorFlow, OCR | 50+ currencies',
    '',
    '  [3] AI Course Recommender',
    '      → Recommendation System | Python, Streamlit',
    '',
    '  [4] Realtime Chat Application',
    '      → Full Stack | React, Node.js, Socket.io',
    '',
    '  [5] Factory Telemetry Analysis',
    '      → Data Analytics | Python, SQL, Plotly',
  ],
  contact: [
    '> Loading contact info...',
    '',
    '  ✉  Email   : abhinash@example.com',
    '  ⚡ GitHub  : github.com/abhinashpradhan',
    '  💼 LinkedIn: linkedin.com/in/abhinashpradhan',
    '',
    '  Feel free to reach out for collaborations,',
    '  job opportunities, or just to say hello!',
  ],
};

export default function TerminalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: '╔══════════════════════════════════════════╗' },
    { type: 'output', content: '║   Abhinash Pradhan — Developer Terminal  ║' },
    { type: 'output', content: '╚══════════════════════════════════════════╝' },
    { type: 'output', content: '' },
    { type: 'output', content: "Type 'help' to see available commands." },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', content: `$ ${cmd}` },
    ];

    if (trimmed === 'clear') {
      setLines([
        { type: 'output', content: "Terminal cleared. Type 'help' for commands." },
        { type: 'output', content: '' },
      ]);
    } else if (commands[trimmed]) {
      commands[trimmed].forEach((line) => {
        newLines.push({ type: 'output', content: line });
      });
      newLines.push({ type: 'output', content: '' });
      setLines(newLines);
    } else if (trimmed === '') {
      setLines([...lines, { type: 'input', content: '$' }]);
    } else {
      newLines.push({
        type: 'error',
        content: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
      });
      newLines.push({ type: 'output', content: '' });
      setLines(newLines);
    }

    setHistory((prev) => [cmd, ...prev.slice(0, 19)]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    }
  };

  return (
    <section id="terminal" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-brand-500" />
            <span className="text-brand-400 font-mono text-sm tracking-widest uppercase">Terminal Mode</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Developer{' '}
            <span className="gradient-text-brand">Console</span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg">
            Interact with my portfolio like a developer. Try: <code className="text-cyber-400 font-mono text-sm bg-dark-800 px-2 py-0.5 rounded">about</code>, <code className="text-cyber-400 font-mono text-sm bg-dark-800 px-2 py-0.5 rounded">skills</code>, <code className="text-cyber-400 font-mono text-sm bg-dark-800 px-2 py-0.5 rounded">projects</code>
          </p>
        </div>

        {/* Terminal window */}
        <div
          className={`rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            background: '#0a0f1a',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.1)',
            transitionDelay: '200ms',
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: '#111827' }}>
            <div className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-400 transition-colors cursor-pointer" />
            <span className="ml-3 text-xs font-mono text-slate-500">abhinash@portfolio:~</span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-6 h-80 overflow-y-auto font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={`leading-relaxed whitespace-pre ${
                  line.type === 'input' ?'text-cyber-400'
                    : line.type === 'error' ?'text-red-400' :'text-green-400/80'
                }`}
              >
                {line.content}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-cyber-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-400 outline-none font-mono text-sm caret-cyber-400"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="w-2 h-4 bg-cyber-400 animate-blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
