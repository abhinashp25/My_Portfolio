'use client';

import { useEffect, useRef, useState } from 'react';
import { EnvelopeIcon, CodeBracketIcon, UserIcon } from '@heroicons/react/24/outline';


export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/abhinashpradhan',
      icon: CodeBracketIcon,
      color: '#6366f1',
      username: '@abhinashpradhan',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/abhinashpradhan',
      icon: UserIcon,
      color: '#06b6d4',
      username: 'Abhinash Pradhan',
    },
    {
      label: 'Email',
      href: 'mailto:abhinash@example.com',
      icon: EnvelopeIcon,
      color: '#f472b6',
      username: 'abhinash@example.com',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-brand-500" />
            <span className="text-brand-400 font-mono text-sm tracking-widest uppercase">Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Let's{' '}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl text-lg">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form — 3 cols */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl glass neon-border">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow"
                  style={{ background: '#6366f120', border: '1px solid #6366f140' }}>
                  <EnvelopeIcon className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-4 py-2 rounded-lg glass neon-border text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono text-sm ${
                      focused === 'name' || form.name
                        ? '-top-2.5 text-xs text-brand-400 bg-dark-900 px-1' :'top-3.5 text-slate-500'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-dark-800 rounded-xl px-4 py-3.5 text-white font-mono text-sm outline-none transition-all duration-300 ${
                      focused === 'name' ?'border border-brand-500 shadow-glow'
                        : errors.name
                        ? 'border border-red-500/50' :'border border-dark-700 hover:border-dark-600'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs font-mono mt-1 ml-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono text-sm ${
                      focused === 'email' || form.email
                        ? '-top-2.5 text-xs text-cyber-400 bg-dark-900 px-1' :'top-3.5 text-slate-500'
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-dark-800 rounded-xl px-4 py-3.5 text-white font-mono text-sm outline-none transition-all duration-300 ${
                      focused === 'email' ?'border border-cyber-500 shadow-glow-cyan'
                        : errors.email
                        ? 'border border-red-500/50' :'border border-dark-700 hover:border-dark-600'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs font-mono mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono text-sm ${
                      focused === 'message' || form.message
                        ? '-top-2.5 text-xs text-neon-400 bg-dark-900 px-1' :'top-3.5 text-slate-500'
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    className={`w-full bg-dark-800 rounded-xl px-4 py-3.5 text-white font-mono text-sm outline-none transition-all duration-300 resize-none ${
                      focused === 'message' ?'border border-neon-500 shadow-glow-pink'
                        : errors.message
                        ? 'border border-red-500/50' :'border border-dark-700 hover:border-dark-600'
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-xs font-mono mt-1 ml-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <EnvelopeIcon className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info — 2 cols */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="rounded-2xl glass neon-border p-6">
              <h3 className="text-white font-semibold mb-2">Open to Opportunities</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm actively looking for full-stack developer and ML engineer roles. Let's build something amazing together.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-mono">Available for hire</span>
              </div>
            </div>

            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl glass group transition-all duration-300 hover:-translate-y-1"
                  style={{ border: `1px solid ${link.color}20` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300"
                    style={{ background: `${link.color}20`, border: `1px solid ${link.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: link.color }} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{link.label}</p>
                    <p className="text-slate-500 text-xs font-mono">{link.username}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
