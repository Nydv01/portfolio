/* =========================================================
   MAGNETIC BUTTON — Premium Interactive Button Component
   A polished, cursor-reactive button with magnetic hover,
   shimmer sweep, and variant-based styling. Uses Framer
   Motion for smooth animations.
   
   Renders as <a> when href is provided, <button> otherwise.
   Supports primary, secondary, ghost, and outline variants.
========================================================= */

import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion, useIsMobile } from '@/hooks/usePortfolio';

// ─── Types ───────────────────────────────────────────
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface MagneticButtonProps {
  children: ReactNode;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** If provided, renders as an anchor tag */
  href?: string;
  /** Click handler (for button mode) */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional icon to render before children */
  icon?: ReactNode;
  /** HTML anchor target */
  target?: string;
  /** HTML anchor rel */
  rel?: string;
}

// ─── Variant Styles ──────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-to-r from-neutral-800 to-neutral-950 text-white border border-neutral-700/50 shadow-lg shadow-black/10 dark:from-white dark:to-[#cccccc] dark:text-black dark:border-white/50 dark:shadow-white/5 font-semibold',
  ].join(' '),
  secondary: [
    'bg-black/[0.06] text-black border border-black/[0.12] shadow-lg shadow-black/5 dark:bg-white/[0.06] dark:text-white dark:border-white/[0.12] dark:shadow-black/20 backdrop-blur-md font-medium',
  ].join(' '),
  ghost: [
    'bg-transparent text-black/80 dark:text-white/80 font-medium border-none',
  ].join(' '),
  outline: [
    'bg-transparent text-black border border-black/20 dark:text-white dark:border-white/20 font-medium',
  ].join(' '),
};

const getVariantHoverGlow = (isDark: boolean): Record<ButtonVariant, string> => ({
  primary: isDark
    ? '0 0 25px -5px rgba(255, 255, 255, 0.35), 0 0 50px -15px rgba(255, 255, 255, 0.15)'
    : '0 0 25px -5px rgba(0, 0, 0, 0.12), 0 0 50px -15px rgba(0, 0, 0, 0.05)',
  secondary: isDark
    ? '0 0 25px -5px rgba(255, 255, 255, 0.08), 0 0 50px -15px rgba(255, 255, 255, 0.05)'
    : '0 0 25px -5px rgba(0, 0, 0, 0.04), 0 0 50px -15px rgba(0, 0, 0, 0.02)',
  ghost: 'none',
  outline: isDark
    ? '0 0 20px -5px rgba(255, 255, 255, 0.15)'
    : '0 0 20px -5px rgba(0, 0, 0, 0.06)',
});

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-7 py-3 text-base rounded-2xl gap-2',
  lg: 'px-9 py-4 text-lg rounded-2xl gap-2.5',
};

/**
 * MagneticButton — Premium interactive button with cursor-following magnetic effect.
 */
export default function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  icon,
  target,
  rel,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();
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

  const enableMagnetic = !prefersReduced && !isMobile && !disabled;

  // ── Magnetic Mouse Tracking ─────────────────────
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableMagnetic || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.25;
      const deltaY = (e.clientY - centerY) * 0.25;

      setMagneticOffset({ x: deltaX, y: deltaY });
    },
    [enableMagnetic]
  );

  const handleMouseLeave = useCallback(() => {
    setMagneticOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // ── Shared motion props ──────────────────────────
  const motionProps: HTMLMotionProps<'button'> & HTMLMotionProps<'a'> = {
    animate: {
      x: magneticOffset.x,
      y: magneticOffset.y,
      scale: 1,
    },
    whileHover: prefersReduced
      ? {}
      : {
          scale: 1.03,
          boxShadow: getVariantHoverGlow(isDark)[variant],
        },
    whileTap: disabled
      ? {}
      : { scale: 0.97 },
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 18,
      mass: 0.6,
    },
  };

  // ── Build class names ────────────────────────────
  const baseClasses = [
    'relative inline-flex items-center justify-center',
    'overflow-hidden cursor-pointer select-none',
    'transition-colors duration-200',
    variantStyles[variant],
    sizeStyles[size],
    disabled ? 'opacity-50 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // ── Shimmer + Ghost underline + Outline fill inner elements ──
  const innerContent = (
    <>
      {/* Shimmer sweep overlay */}
      {!prefersReduced && isHovered && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Outline variant: fill on hover */}
      {variant === 'outline' && (
        <motion.span
          className="absolute inset-0 rounded-[inherit] bg-black/[0.04] dark:bg-white/[0.06] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-[inherit]">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>

      {/* Ghost variant: underline on hover */}
      {variant === 'ghost' && (
        <motion.span
          className="absolute bottom-1.5 left-1/2 h-px bg-black/60 dark:bg-white/60 pointer-events-none"
          initial={{ width: 0, x: '-50%' }}
          animate={{
            width: isHovered ? '60%' : '0%',
            x: '-50%',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-hidden="true"
        />
      )}
    </>
  );

  // ── Render container with magnetic tracking area ─
  return (
    <div
      ref={containerRef}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {href && !disabled ? (
        <motion.a
          href={href}
          className={baseClasses}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          {...motionProps}
        >
          {innerContent}
        </motion.a>
      ) : (
        <motion.button
          type="button"
          onClick={disabled ? undefined : onClick}
          className={baseClasses}
          disabled={disabled}
          aria-disabled={disabled}
          {...motionProps}
        >
          {innerContent}
        </motion.button>
      )}
    </div>
  );
}
