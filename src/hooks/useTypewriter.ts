'use client';

import { useState, useEffect } from 'react';

interface TypewriterOptions {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  texts,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: TypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        return;
      }
      const deleteTimer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(deleteTimer);
    }

    if (displayText.length === currentText.length) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayText(currentText.slice(0, displayText.length + 1));
    }, typeSpeed);
    return () => clearTimeout(typeTimer);
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typeSpeed, deleteSpeed, pauseDuration]);

  return { displayText, isTyping: !isPaused };
}
