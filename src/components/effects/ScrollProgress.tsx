/* =========================================================
   SCROLL PROGRESS — Premium Scroll Progress Indicator
   A thin, fixed progress bar at the top of the viewport 
   showing page scroll position. Features a violet-to-cyan 
   gradient with a glowing leading edge for premium feel.
   
   Uses Framer Motion's useScroll + useSpring for smooth,
   spring-physics–based progress interpolation.
========================================================= */

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/usePortfolio';

/**
 * ScrollProgress — Premium scroll progress indicator.
 *
 * Renders a 3px-height fixed bar at the top of the viewport
 * that smoothly tracks the user's scroll position through
 * the page. The bar uses a violet-to-cyan gradient and
 * includes a subtle glowing leading edge.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  // Spring-smoothed progress for buttery animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Map progress (0 -> 1) to translation percentage (-100% -> 0%)
  const xVal = useTransform(smoothProgress, [0, 1], ['-100%', '0%']);

  // Opacity that fades in once user starts scrolling
  const opacityVal = useTransform(scrollYProgress, [0, 0.005, 0.01], [0, 0.5, 1]);
  const smoothOpacity = useSpring(opacityVal, {
    stiffness: 150,
    damping: 25,
  });

  if (prefersReduced) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] w-full overflow-hidden pointer-events-none">
      {/* Background track for the progress line - super subtle */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px]" />
      
      {/* Sliding Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          x: xVal,
          opacity: smoothOpacity,
          background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.8) 50%, rgba(59, 210, 246, 1) 100%)',
        }}
      >
        {/* Glow tail leading edge */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-cyan-400/50 blur-sm pointer-events-none" />

        {/* Floating Neon Pulse Particle (The AI Spark) */}
        <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Inner core */}
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_2px_#3bd2f6,0_0_20px_6px_#8b5cf6]" />
          {/* Ring flare */}
          <div className="absolute w-5 h-5 rounded-full border border-cyan-300/60 animate-ping opacity-75" />
          {/* Outer glow aura */}
          <div className="absolute w-8 h-8 rounded-full bg-cyan-400/30 blur-md pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
