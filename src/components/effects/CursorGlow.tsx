import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/usePortfolio';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const isMobile = useIsMobile();

  // Theme state
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Smooth springs for cursor position
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(-1000, springConfig);
  const cursorY = useSpring(-1000, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width of the glow (400px / 2 = 200)
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  // Only show glow if mouse is actually on screen
  const isVisible = mousePosition.x > -1000;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        mixBlendMode: isDark ? 'screen' : 'normal',
        background: isDark
          ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0) 70%)'
          : 'radial-gradient(circle, rgba(29, 29, 31, 0.04) 0%, rgba(29, 29, 31, 0) 70%)',
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.5 } }}
    />
  );
}
