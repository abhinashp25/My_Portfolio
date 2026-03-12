'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BeakerIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function AILabSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [income, setIncome] = useState(50000);
  const [creditScore, setCreditScore] = useState(700);
  const [invoiceAmount, setInvoiceAmount] = useState(10000);
  const [isLoading, setIsLoading] = useState(false);
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

    setTimeout(() => {
      // Simulated prediction logic
      const incomeRatio = Math.min(income / 100000, 1);
      const creditRatio = Math.min((creditScore - 300) / 550, 1);
      const invoiceRatio = Math.min(invoiceAmount / 50000, 1);

      const score = incomeRatio * 0.3 + creditRatio * 0.5 + (1 - invoiceRatio) * 0.2;

      const onTime = Math.round(score * 70 + 10);
      const late30 = Math.round((1 - score) * 40 + 5);
      const late60 = Math.round((1 - score) * 25 + 3);
      const late90 = Math.max(0, 100 - onTime - late30 - late60);

      setResult([
        { label: 'On Time', value: onTime, color: '#06b6d4' },
        { label: '< 30 days', value: late30, color: '#6366f1' },
        { label: '30-60 days', value: late60, color: '#f472b6' },
        { label: '> 60 days', value: late90, color: '#ef4444' },
      ]);
      setIsLoading(false);
    }, 1800);
  };

  return (
    <section id="ailab" ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-cyber-500" />
            <span className="text-cyber-400 font-mono text-sm tracking-widest uppercase">AI Lab</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Developer{' '}
            <span className="text-glow-cyan" style={{ color: '#06b6d4' }}>Laboratory</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            Live demo of Invoice Payment Prediction — enter parameters and watch the AI predict.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {/* Input Panel */}
          <div className="rounded-2xl glass neon-border-cyan overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-dark-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-500">invoice_predictor.py</span>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <BeakerIcon className="w-5 h-5 text-cyber-400" />
                <h3 className="text-white font-semibold">Input Parameters</h3>
              </div>

              {/* Monthly Income */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-mono text-slate-400">Monthly Income</label>
                  <span className="text-sm font-mono text-cyber-400">₹{income.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((income - 10000) / 190000) * 100}%, #334155 ${((income - 10000) / 190000) * 100}%, #334155 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs font-mono text-slate-600">
                  <span>₹10K</span><span>₹2L</span>
                </div>
              </div>

              {/* Credit Score */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-mono text-slate-400">Credit Score</label>
                  <span className="text-sm font-mono text-brand-400">{creditScore}</span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={850}
                  step={10}
                  value={creditScore}
                  onChange={(e) => setCreditScore(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((creditScore - 300) / 550) * 100}%, #334155 ${((creditScore - 300) / 550) * 100}%, #334155 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs font-mono text-slate-600">
                  <span>300 (Poor)</span><span>850 (Excellent)</span>
                </div>
              </div>

              {/* Invoice Amount */}
              <div className="space-y-2">
                <label className="text-sm font-mono text-slate-400 block">Invoice Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">₹</span>
                  <input
                    type="number"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                    className="w-full bg-dark-800 border border-dark-700 rounded-xl pl-8 pr-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-brand-500 focus:shadow-glow transition-all"
                    placeholder="Enter invoice amount"
                  />
                </div>
              </div>

              {/* Predict button */}
              <button
                onClick={runPrediction}
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-glow-cyan hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="font-mono text-sm">Running Model...</span>
                  </>
                ) : (
                  <>
                    <CpuChipIcon className="w-4 h-4" />
                    <span>Run Prediction</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="rounded-2xl glass neon-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-dark-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-500">prediction_output.json</span>
            </div>

            <div className="p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <CpuChipIcon className="w-5 h-5 text-brand-400" />
                Prediction Results
              </h3>

              {!result && !isLoading && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-2xl glass neon-border flex items-center justify-center mb-4 animate-pulse-glow">
                    <CpuChipIcon className="w-8 h-8 text-brand-400" />
                  </div>
                  <p className="text-slate-500 font-mono text-sm">Enter parameters and run prediction</p>
                  <p className="text-slate-600 font-mono text-xs mt-1">Results will appear here</p>
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-500/20 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-cyber-500/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                    <div className="absolute inset-4 rounded-full bg-brand-500/20 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-cyber-400 font-mono text-sm">Processing data...</p>
                    <p className="text-slate-600 font-mono text-xs mt-1">Running gradient boosting model</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  {/* Primary prediction */}
                  <div
                    className="rounded-xl p-4"
                    style={{ background: `${result[0].color}10`, border: `1px solid ${result[0].color}30` }}
                  >
                    <p className="text-xs font-mono text-slate-500 mb-1">Most Likely Outcome</p>
                    <p className="text-2xl font-bold" style={{ color: result[0].color }}>
                      {result[0].label}
                    </p>
                    <p className="text-sm font-mono text-slate-400 mt-1">
                      {result[0].value}% probability
                    </p>
                  </div>

                  {/* Chart */}
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                        <Tooltip
                          contentStyle={{
                            background: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                            fontFamily: 'JetBrains Mono',
                            fontSize: '12px',
                          }}
                          formatter={(value: number) => [`${value}%`, 'Probability']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {result.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <p className="text-xs font-mono text-slate-600 text-center">
                    * Simulated prediction for demo purposes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
