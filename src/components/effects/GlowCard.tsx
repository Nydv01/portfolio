/* =========================================================
   GLOW CARD — Premium Cursor-Reactive Card Component
   Frosted glass card that captures mouse coordinates to render
   a dynamic radial glow spotlight and border highlight that
   follows the user's cursor.
   
   Also features 3D perspective tilt hover feedback.
   All interaction respects prefers-reduced-motion.
========================================================= */

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/usePortfolio';

interface GlowCardProps {
  children: React.ReactNode;
  /** Extra CSS classes */
  className?: string;
  /** Accent glow color family */
  glowColor?: 'violet' | 'cyan' | 'amber';
  /** Enable 3D tilt interaction (default: true) */
  enableTilt?: boolean;
  /** Enable radial spotlight (default: true) */
  enableGlow?: boolean;
  /** CSS styles overlay */
  style?: React.CSSProperties;
}

const colorMap = (isDark: boolean) => ({
  violet: isDark ? 'rgba(190, 181, 162, 0.08)' : 'rgba(39, 20, 32, 0.06)',
  cyan: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(100, 100, 100, 0.06)',
  amber: isDark ? 'rgba(160, 160, 170, 0.05)' : 'rgba(150, 140, 130, 0.05)',
});

/**
 * GlowCard — Glassmorphic card with mouse-reactive radial spotlight glow
 * and 3D card tilt effect.
 */
export default function GlowCard({
  children,
  className = '',
  glowColor = 'violet',
  enableTilt = true,
  enableGlow = true,
  style = {},
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Mouse coordinate states
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  
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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });

      if (enableTilt && !prefersReduced) {
        // Calculate tilt percentages relative to center (-0.5 to 0.5)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * 4; // Max 4 degrees tilt
        const rotateY = ((x - centerX) / centerX) * 4;
        setTilt({ rotateX, rotateY });
      }
    },
    [enableTilt, prefersReduced]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const showGlow = enableGlow && !prefersReduced && isHovered;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 800,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`glass-card relative overflow-hidden group ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* ─── Border Highlight (Cursor direction) ────────── */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-300"
          style={{
            border: '1px solid transparent',
            background: isDark
              ? `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.18), transparent 70%)`
              : `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(0, 0, 0, 0.12), transparent 70%)`,
            WebkitMask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* ─── Radial Spotlight Glow ─────────────────────── */}
      {showGlow && (
        <div
          className="absolute pointer-events-none blur-[40px] rounded-full w-56 h-56 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 z-0"
          style={{
            left: coords.x,
            top: coords.y,
            background: `radial-gradient(circle, ${colorMap(isDark)[glowColor]}, transparent 70%)`,
          }}
        />
      )}

      {/* ─── Noise Texture overlay inside card ──────────── */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay opacity-[0.25] pointer-events-none" />

      {/* ─── Content Wrapper ───────────────────────────── */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
