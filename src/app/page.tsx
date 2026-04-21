'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const LoadingScreen    = dynamic(() => import('@/components/ui/LoadingScreen'),                       { ssr: false });
const Navigation       = dynamic(() => import('@/components/ui/Navigation'),                          { ssr: false });
const HeroSection      = dynamic(() => import('@/components/sections/HeroSection'));
const AboutSection     = dynamic(() => import('@/components/sections/AboutSection'));
const EducationSection = dynamic(() => import('@/components/sections/EducationSection'));
const SkillsSection    = dynamic(() => import('@/components/sections/SkillsSection'));
const ProjectsSection  = dynamic(() => import('@/components/sections/ProjectsSection'));
const AILabSection     = dynamic(() => import('@/components/sections/AILabSection'));
const TerminalSection  = dynamic(() => import('@/components/sections/TerminalSection'));
const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'));
const CertificationsSection = dynamic(() => import('@/components/sections/CertificationsSection'));
const ContactSection   = dynamic(() => import('@/components/sections/ContactSection'));
const ChatBot          = dynamic(() => import('@/components/ui/ChatBot'),                             { ssr: false });
const Footer           = dynamic(() => import('@/components/ui/Footer'));

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500); // Reduced delay for faster initial load
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-dark-900 overflow-x-hidden">
      <LoadingScreen />
      <Navigation />

      <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AILabSection />
        <TerminalSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </div>

      <ChatBot />
    </main>
  );
}
