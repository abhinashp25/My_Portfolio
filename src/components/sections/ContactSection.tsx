'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import Image from 'next/image';
import { PaperAirplaneIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{ name: form.name, email: form.email, message: form.message }]);

      if (error) throw error;
      
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting form to Supabase:', err);
      const subject = encodeURIComponent('Portfolio Contact from ' + form.name);
      const body = encodeURIComponent('Hi Abhinash,\n\nName: ' + form.name + '\nEmail: ' + form.email + '\n\nMessage:\n' + form.message);
      window.open('mailto:abhinashpradhan7658@gmail.com?subject=' + subject + '&body=' + body, '_blank');
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/abhinashp25', image: '/logos/github_logo.webp', color: 'from-indigo-400 to-cyan-400', username: '@abhinashp25' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhinash-pradhan-74b389294/', image: '/logos/Linkedin_logo.avif', color: 'from-sky-400 to-blue-500', username: 'Abhinash Pradhan' },
    { label: 'Email', href: 'mailto:abhinashpradhan7658@gmail.com', image: '/logos/gmail_icon.webp', color: 'from-rose-400 to-pink-500', username: 'abhinash...7658@gmail.com' },
  ];

  const InputField = ({ id, label, type = 'text', isTextArea = false }: any) => {
    const isFocused = focused === id;
    const hasValue = form[id as keyof typeof form].length > 0;
    const error = errors[id];

    return (
      <div className="relative group">
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
            isFocused || hasValue
              ? '-top-2.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-slate-900 dark:text-white/70 px-2 py-0.5 rounded backdrop-blur-md bg-slate-50 dark:bg-dark-900/60 border border-white/5'
              : 'top-4 text-sm text-slate-900 dark:text-white/40'
          }`}
        >
          {label}
        </label>
        
        {isTextArea ? (
          <textarea
            id={id}
            rows={5}
            value={form[id as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [id]: e.target.value })}
            onFocus={() => setFocused(id)}
            onBlur={() => setFocused(null)}
            className={`w-full bg-slate-100/80 dark:bg-white/[0.02] backdrop-blur-xl rounded-2xl px-4 py-4 text-slate-900 dark:text-white text-sm outline-none transition-all duration-300 resize-none
              ${isFocused ? 'border-indigo-400/60 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20'} 
              ${error ? 'border-red-500/50' : 'border'}
            `}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={form[id as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [id]: e.target.value })}
            onFocus={() => setFocused(id)}
            onBlur={() => setFocused(null)}
            className={`w-full bg-slate-100/80 dark:bg-white/[0.02] backdrop-blur-xl rounded-2xl px-4 py-4 text-slate-900 dark:text-white text-sm outline-none transition-all duration-300
              ${isFocused ? 'border-indigo-400/60 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:border-white/20'}
              ${error ? 'border-red-500/50' : 'border'}
            `}
          />
        )}
        {error && <p className="absolute -bottom-5 left-2 text-red-400 text-[10px] uppercase tracking-wider">{error}</p>}
      </div>
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      
      {/* Liquid Glass Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-sky-500/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading 
          title="Let's build something" 
          highlight="together." 
          badge="Contact" 
          align="center"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start mt-8">
          
          {/* Main Form Capsule */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-[2.5rem] p-6 sm:p-10 overflow-hidden bg-white/80 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
              {/* Internal Glass Sheen */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <CheckCircleIcon className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Message Sent</h3>
                  <p className="text-slate-900 dark:text-white/50 text-base max-w-sm">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white transition-all duration-300"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <InputField id="name" label="Your Name" />
                    <InputField id="email" label="Email Address" type="email" />
                  </div>
                  <InputField id="message" label="Your Message" isTextArea />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-4 rounded-2xl font-semibold text-slate-900 dark:text-white transition-all duration-300 overflow-hidden disabled:opacity-50"
                  >
                    {/* Glass Button Background */}
                    <div className="absolute inset-0 bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 rounded-2xl transition-all duration-300 group-hover:bg-white/15" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending securely...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <PaperAirplaneIcon className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 flex flex-col gap-4 sm:gap-6"
          >
            <div className="rounded-[2rem] p-8 bg-slate-100/80 dark:bg-white/[0.01] border border-black/10 dark:border-white/10 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <h3 className="text-slate-900 dark:text-white text-lg font-medium mb-3 flex items-center gap-2">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-500"></span>
                </span>
                Available for Roles
              </h3>
              <p className="text-slate-900 dark:text-white/50 text-sm leading-relaxed font-light">
                I am actively exploring opportunities in full stack engineering and AI product development. Let's discuss how my skills align with your goals.
              </p>
            </div>

            {socialLinks.map((link, i) => {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-5 p-5 rounded-[2rem] bg-slate-100/80 dark:bg-white/[0.01] border border-black/10 dark:border-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/20"
                >
                  {/* Subtle hover gradient sheen */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.4)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <Image 
                      src={link.image} 
                      alt={link.label} 
                      fill 
                      sizes="40px"
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-medium text-base">{link.label}</p>
                    <p className="text-slate-900 dark:text-white/50 text-[11px] font-mono mt-1 group-hover:text-slate-900 dark:text-white/80 transition-colors">{link.username}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
