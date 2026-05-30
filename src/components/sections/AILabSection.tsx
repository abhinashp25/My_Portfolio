'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BeakerIcon, CpuChipIcon, CommandLineIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

const MODELS = [
  { id: 'dnn', name: 'Deep Neural Network', time: 2000, baseAccuracy: 94 },
  { id: 'gbm', name: 'Gradient Boosting', time: 1500, baseAccuracy: 91 },
  { id: 'rf', name: 'Random Forest', time: 1000, baseAccuracy: 88 },
];

const LOG_MESSAGES = [
  "Initializing tensors...",
  "Loading model weights...",
  "Applying layer normalization...",
  "Optimizing loss function...",
  "Computing forward pass...",
  "Applying dropout...",
  "Generating final logits...",
  "Prediction complete."
];

export default function AILabSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  // State
  const [income, setIncome] = useState(65000);
  const [creditScore, setCreditScore] = useState(720);
  const [invoiceAmount, setInvoiceAmount] = useState(15000);
  const [activeModel, setActiveModel] = useState(MODELS[0]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<{ label: string; value: number; color: string }[] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const runPrediction = () => {
    setIsLoading(true);
    setResult(null);
    setLogs([]);

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < LOG_MESSAGES.length) {
        setLogs(prev => [...prev, LOG_MESSAGES[logIndex]]);
        logIndex++;
      }
    }, activeModel.time / LOG_MESSAGES.length);

    setTimeout(() => {
      clearInterval(logInterval);
      
      const incomeRatio = Math.min(income / 150000, 1);
      const creditRatio = Math.min((creditScore - 300) / 550, 1);
      const invoiceRatio = Math.min(invoiceAmount / 50000, 1);
      const modelVariance = (activeModel.baseAccuracy - 90) / 100;
      
      const score = incomeRatio * 0.35 + creditRatio * 0.45 + (1 - invoiceRatio) * 0.2 + modelVariance;

      const onTime = Math.min(Math.round(score * 75 + 10), 98);
      const late30 = Math.max(Math.round((1 - score) * 35 + 5), 1);
      const late60 = Math.max(Math.round((1 - score) * 20 + 2), 0);
      const late90 = Math.max(0, 100 - onTime - late30 - late60);

      setResult([
        { label: 'On Time', value: onTime, color: '#38bdf8' },
        { label: '< 30 days', value: late30, color: '#818cf8' },
        { label: '30-60 days', value: late60, color: '#a78bfa' },
        { label: '> 60 days', value: late90, color: '#475569' },
      ]);
      setIsLoading(false);
    }, activeModel.time);
  };

  return (
    <section id="ailab" ref={sectionRef} className="relative py-20 px-6 overflow-hidden">
      {/* Subtle realistic ambient lighting for the glass */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
        <div className="w-[500px] h-[300px] bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeading 
          title="Developer" 
          highlight="Laboratory" 
          badge="AI Lab" 
          align="center"
        />
        <motion.div 
          className="mb-12 text-center -mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Interactive AI Engine. Configure parameters, select a model architecture, and stream real-time prediction logits.
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '150ms' }}>
          
          {/* Input Panel (Liquid Glass) */}
          <div className="rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-black/10 dark:border-white/10 flex flex-col bg-white/80 dark:bg-white/[0.04]">
            
            <div className="relative z-10 flex flex-col flex-1 gap-6">
              <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/10 dark:border-white/10">
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">Parameters</h3>
                </div>
              </div>

              {/* Model Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest">Model Architecture</label>
                <div className="flex flex-wrap gap-2">
                  {MODELS.map(model => (
                    <button
                      key={model.id}
                      onClick={() => !isLoading && setActiveModel(model)}
                      disabled={isLoading}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                        activeModel.id === model.id 
                          ? 'bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-blue-200' 
                          : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-black/10 dark:bg-white/10 hover:text-slate-900 dark:text-white'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Monthly Income */}
                <div className="space-y-2.5 p-4 rounded-xl bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/5 backdrop-blur-md">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Monthly Income</label>
                    <span className="text-xs font-mono text-blue-400">₹{income.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={20000} max={200000} step={5000}
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    disabled={isLoading}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer disabled:opacity-50"
                    style={{ background: `linear-gradient(to right, #38bdf8 0%, #38bdf8 ${((income - 20000) / 180000) * 100}%, rgba(0,0,0,0.12) ${((income - 20000) / 180000) * 100}%, rgba(0,0,0,0.12) 100%)` }}
                  />
                </div>

                {/* Credit Score */}
                <div className="space-y-2.5 p-4 rounded-xl bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/5 backdrop-blur-md">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Credit Score</label>
                    <span className="text-xs font-mono text-purple-400">{creditScore}</span>
                  </div>
                  <input
                    type="range"
                    min={300} max={850} step={10}
                    value={creditScore}
                    onChange={(e) => setCreditScore(Number(e.target.value))}
                    disabled={isLoading}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer disabled:opacity-50"
                    style={{ background: `linear-gradient(to right, #a78bfa 0%, #a78bfa ${((creditScore - 300) / 550) * 100}%, rgba(0,0,0,0.12) ${((creditScore - 300) / 550) * 100}%, rgba(0,0,0,0.12) 100%)` }}
                  />
                </div>

                {/* Invoice Amount */}
                <div className="space-y-2.5 p-4 rounded-xl bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/5 backdrop-blur-md">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block">Invoice Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">₹</span>
                    <input
                      type="number"
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                      disabled={isLoading}
                      className="w-full bg-slate-100 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-lg pl-8 pr-3 py-2 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-blue-400/50 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Predict button */}
              <button
                onClick={runPrediction}
                disabled={isLoading}
                className="w-full mt-auto py-3 rounded-xl font-semibold transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm">Processing...</span>
                  </>
                ) : (
                  <>
                    <CpuChipIcon className="w-4 h-4" />
                    <span className="text-sm">Execute Model</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel (Terminal & Chart) */}
          <div className="flex flex-col gap-6">
            
            {/* Live Terminal Stream */}
            <div className="rounded-3xl overflow-hidden backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-black/10 dark:border-white/10 flex flex-col h-40"
                 style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)' }}>
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <CommandLineIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-mono text-slate-300">engine.log</span>
                </div>
              </div>
              <div className="p-4 font-mono text-[11px] sm:text-xs flex-1 overflow-hidden relative flex flex-col justify-end">
                {!isLoading && logs.length === 0 && !result && (
                  <div className="absolute inset-0 p-4">
                    <p className="text-slate-400">awaiting signal...</p>
                  </div>
                )}
                <div className="space-y-1.5">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="text-emerald-400/90"
                    >
                      <span className="text-slate-500 mr-2">[{new Date().toISOString().substring(11, 23)}]</span>
                      {log}
                    </motion.div>
                  ))}
                </div>
                {isLoading && (
                  <div className="mt-1 text-emerald-400/50 animate-pulse">_</div>
                )}
              </div>
            </div>

            {/* Results Chart */}
            <div className="rounded-3xl p-6 sm:p-8 flex-1 relative overflow-hidden backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-black/10 dark:border-white/10 flex flex-col bg-white/80 dark:bg-white/[0.04]">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">Prediction Matrix</h3>
                </div>
                {result && (
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest">Confidence</p>
                    <p className="text-base font-bold text-emerald-400">{activeModel.baseAccuracy}%</p>
                  </div>
                )}
              </div>

              {!result && !isLoading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                  <BeakerIcon className="w-12 h-12 text-slate-600 dark:text-slate-400 mb-3" />
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">Awaiting Data</p>
                </div>
              )}

              {isLoading && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
                </div>
              )}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="h-48 md:h-full min-h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} dy={5} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                        <Tooltip
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                          contentStyle={{
                            background: 'rgba(15,23,42,0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '12px'
                          }}
                          itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                          formatter={(value: number) => [`${value}%`, 'Prob.']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                          {result.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Summary Callout */}
                  <div className="mt-4 p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider mb-0.5">Primary Outcome</p>
                      <p className="text-base font-bold text-slate-900 dark:text-white">{result[0].label}</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg text-sm font-bold" 
                         style={{ background: `${result[0].color}20`, color: result[0].color, border: `1px solid ${result[0].color}40` }}>
                      {result[0].value}%
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
