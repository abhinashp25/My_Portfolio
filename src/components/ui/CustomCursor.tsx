'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target or its parents are clickable elements
      const isClickable = target.closest('a, button, input, textarea, select, [role="button"]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide custom cursor on mobile devices or before hydration
  if (!isMounted || (typeof window !== 'undefined' && window.innerWidth <= 768)) {
    return null;
  }

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      opacity: 0.5,
      backgroundColor: '#f8fafc', // Adjust to a nice glowing highlight
      mixBlendMode: 'difference' as any,
    },
  };

  return (
    <>
      {/* Small dot that exactly follows the cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-slate-200 pointer-events-none z-[9999]"
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{
          x: { duration: 0, type: 'tween' },
          y: { duration: 0, type: 'tween' },
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.2 }
        }}
        style={{
          boxShadow: isHovering ? '0 0 20px rgba(248, 250, 252, 0.4)' : 'none',
        }}
      />

      {/* Larger trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-slate-500/50 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
    </>
  );
}