'use client';

import { useState, useEffect, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  // Smooth active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'experience', 'projects', 'contact'];

      let current = '';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (
          rect.top <= window.innerHeight * 0.4 &&
          rect.bottom >= window.innerHeight * 0.4
        ) {
          current = section;
          break;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //Move pill smoothly
  useEffect(() => {
    const index = navLinks.findIndex(
      (link) => link.href.slice(1) === activeSection
    );

    const el = itemRefs.current[index];
    const parent = navRef.current;

    if (el && parent) {
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      setPill({
        left: elRect.left - parentRect.left,
        width: elRect.width,
      });
    }
  }, [activeSection]);

  // 🔥 Smooth scroll with offset
  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    const el = document.querySelector(href);
    if (!el) return;

    const yOffset = -80;

    const y =
      (el as HTMLElement).getBoundingClientRect().top +
      window.scrollY +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      
      {/* Desktop Nav */}
      <motion.div
        className={`pointer-events-auto hidden md:flex items-center justify-between gap-8 px-6 rounded-full border backdrop-blur-2xl transition-all duration-500 ${
          scrolled
            ? 'py-2 bg-black/60 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
            : 'py-3 bg-white/5 border-white/5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-0.5 group"
        >
          <span className="text-xl font-semibold text-white tracking-tight">
            ABHINASH
          </span>
          <span className="text-indigo-500 text-xl font-bold group-hover:scale-125 transition-transform duration-300">
            .
          </span>
        </button>

        {/* NAV LINKS */}
        <div ref={navRef} className="relative flex items-center gap-1">

          {/* SINGLE MOVING PILL */}
          <motion.div
            animate={{
              left: pill.left,
              width: pill.width,
              opacity: activeSection ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 25,
              mass: 0.8,
            }}
            className="absolute top-0 bottom-0 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"
          />

          {navLinks.map((link, index) => {
            const isActive = activeSection === link.href.slice(1);

            return (
              <button
                key={link.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleNavClick(link.href)}
                className={`relative z-10 px-4 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* GitHub Button */}
        <a
          href="https://github.com/abhinashp25"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-full bg-white text-black text-[13px] font-semibold hover:scale-105 active:scale-95 transition-all duration-300"
        >
          GitHub
        </a>
      </motion.div>

      {/* Mobile Nav */}
      <div
        className={`pointer-events-auto md:hidden w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-xl border border-white/10'
            : 'bg-transparent'
        }`}
      >
        <span className="text-white font-semibold text-lg">ABHINASH.</span>

        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto md:hidden absolute top-24 left-4 right-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-3 rounded-xl text-left text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}