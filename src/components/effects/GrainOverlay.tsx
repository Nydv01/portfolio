/* =========================================================
   GRAIN OVERLAY — SVG Film Grain Effect
   Renders an ultra-subtle animated noise texture across the 
   entire viewport using an SVG feTurbulence filter. Creates
   a cinematic, premium feel without impacting interactivity.
   
   - Fixed position, pointer-events: none
   - z-index: 9999 to layer above all content
   - Animated transform to prevent static pattern appearance
   - Hidden when prefers-reduced-motion is active
========================================================= */

import { useReducedMotion } from '@/hooks/usePortfolio';

/**
 * GrainOverlay — SVG-based film grain texture overlay.
 *
 * Renders a full-viewport noise texture using an inline SVG
 * feTurbulence filter. The overlay is ultra-subtle (opacity ~0.035)
 * and uses CSS animation to shift the noise pattern, preventing
 * a static/frozen appearance.
 *
 * Completely non-interactive (pointer-events: none) and hidden
 * for users who prefer reduced motion.
 *
 * @example
 * // Place once at the root of your app
 * <GrainOverlay />
 */
export default function GrainOverlay() {
  const prefersReduced = useReducedMotion();

  // Respect reduced motion — hide the grain entirely
  if (prefersReduced) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {/* 
        The SVG is positioned larger than viewport and animated
        with the grain keyframes to shift the noise pattern.
        This prevents visible tiling or static banding.
      */}
      <svg
        className="absolute animate-grain opacity-[0.035]"
        style={{
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          mixBlendMode: 'overlay',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#grain-noise)"
          opacity="1"
        />
      </svg>
    </div>
  );
}
