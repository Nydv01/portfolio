/* =========================================================
   ANIMATION SYSTEM — Centralized Framer Motion Variants
   All shared animation configurations for the portfolio.
   Import these instead of defining one-off variants.
========================================================= */

import type { Variants, Transition } from 'framer-motion';

// ─── Spring Configs ──────────────────────────────────
export const springs = {
  /** Snappy response for buttons/interactive elements */
  snappy: { type: 'spring', stiffness: 400, damping: 25 } as Transition,
  /** Smooth, flowing transitions for content reveals */
  smooth: { type: 'spring', stiffness: 100, damping: 20 } as Transition,
  /** Gentle, slow transitions for ambient motion */
  gentle: { type: 'spring', stiffness: 60, damping: 15 } as Transition,
  /** Bouncy spring for playful interactions */
  bouncy: { type: 'spring', stiffness: 300, damping: 15 } as Transition,
} as const;

// ─── Easing Curves ───────────────────────────────────
export const easings = {
  /** Premium ease-out curve (used in Apple/Studio sites) */
  premium: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Smooth deceleration */
  decel: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
  /** Cinematic slow-in, smooth-out */
  cinematic: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  /** Sharp ease for quick reveals */
  sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

// ─── Fade Variants ───────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easings.premium },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easings.premium },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: easings.premium },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easings.premium },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easings.premium },
  },
};

// ─── Container Variants ──────────────────────────────

/** Stagger children with configurable delay */
export const staggerContainer = (
  staggerDelay = 0.1,
  childDelay = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childDelay,
    },
  },
});

/** Stagger children from the center outward */
export const staggerFromCenter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      staggerDirection: 1,
    },
  },
};

// ─── Hero Variants ───────────────────────────────────

/** Cinematic hero text reveal with blur + y translation */
export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(20px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: easings.premium },
  },
};

/** Hero badge entrance */
export const heroBadge: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

/** Hero CTA buttons entrance */
export const heroCTA: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easings.premium },
  },
};

// ─── Card Variants ───────────────────────────────────

/** Card hover — subtle lift with glow enhancement */
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: easings.premium },
  },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: 0.3, ease: easings.premium },
  },
};

/** Card entrance with index-based delay */
export const cardEntrance = (index: number): Variants => ({
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: index * 0.1,
      ease: easings.premium,
    },
  },
});

// ─── Navigation Variants ─────────────────────────────

/** Mobile menu overlay */
export const menuOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.2 } },
};

/** Mobile menu panel */
export const menuPanel: Variants = {
  hidden: { clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' },
  visible: {
    clipPath: 'circle(150% at calc(100% - 2rem) 2rem)',
    transition: { duration: 0.6, ease: easings.premium },
  },
  exit: {
    clipPath: 'circle(0% at calc(100% - 2rem) 2rem)',
    transition: { duration: 0.4, ease: easings.sharp },
  },
};

/** Mobile menu link entrance */
export const menuLink = (index: number): Variants => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.1 + index * 0.06, ease: easings.premium },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2, delay: index * 0.03 },
  },
});

// ─── Section Reveal ──────────────────────────────────

/** Section heading reveal */
export const sectionHeading: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: easings.premium },
  },
};

/** Section subheading reveal */
export const sectionSubheading: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15, ease: easings.premium },
  },
};

// ─── Scroll Indicator ────────────────────────────────

export const scrollIndicator: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 2.5, duration: 1 },
  },
};

export const scrollBounce = {
  animate: { y: [0, 8, 0] },
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
};

// ─── Page Transition ─────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easings.premium },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: easings.sharp },
  },
};

// ─── Utility Variants ────────────────────────────────

/** Shimmer sweep effect for cards */
export const shimmerSweep = {
  initial: { x: '-100%' },
  hover: {
    x: '100%',
    transition: { duration: 0.8, ease: 'linear' as const },
  },
};

/** Pulse glow for status indicators */
export const pulseGlow = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};
