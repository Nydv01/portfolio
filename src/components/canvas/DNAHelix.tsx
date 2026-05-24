/* =========================================================
   DNA HELIX PARTICLE CANVAS — ACTIVE THEORY CALIBER
   A living, breathing, cursor-reactive particle network 
   with dual DNA helix strands, flowing energy pulses,
   organic connections, and ambient depth particles.
   
   Inspired by Active Theory's WebGL mastery — adapted
   for Canvas2D for broader device support.
========================================================= */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useReducedMotion, useIsMobile } from '@/hooks/usePortfolio';

// ─── Types ───────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  z: number; // Depth for parallax
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  phase: number;
  speed: number;
  helixSide: number; // -1 = ambient, 0/1 = helix strand
  pulsePhase: number;
  life: number;
  maxLife: number;
}

interface EnergyPulse {
  progress: number; // 0 to 1
  speed: number;
  side: number;
  alpha: number;
  width: number;
}

interface Props {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  primaryColor?: [number, number, number]; // RGB
  secondaryColor?: [number, number, number]; // RGB
  accentColor?: [number, number, number]; // RGB
  interactive?: boolean;
  showPulses?: boolean;
  intensity?: number; // 0-1, overall visual intensity
}

// ─── Utility: Smooth lerp ────────────────────────────
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── Utility: Distance ───────────────────────────────
function dist(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// ─── Utility: Map range ──────────────────────────────
function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export default function DNAHelix({
  className = '',
  particleCount = 180,
  connectionDistance = 150,
  primaryColor = [139, 92, 246], // violet
  secondaryColor = [59, 210, 246], // cyan
  accentColor = [236, 72, 153], // rose
  interactive = true,
  showPulses = true,
  intensity = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<EnergyPulse[]>([]);
  const timeRef = useRef(0);
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  // Performance-adjusted counts
  const config = useMemo(() => {
    if (isMobile) {
      return {
        count: Math.floor(particleCount * 0.35),
        connDist: connectionDistance * 0.5,
        helixTwists: 4,
        ambientRatio: 0.3,
        pulseCount: 2,
        glowMultiplier: 0.5,
      };
    }
    return {
      count: particleCount,
      connDist: connectionDistance,
      helixTwists: 6,
      ambientRatio: 0.35,
      pulseCount: 5,
      glowMultiplier: 1,
    };
  }, [isMobile, particleCount, connectionDistance]);

  // ─── Initialize Particles ──────────────────────────
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      const centerX = width / 2;
      const helixAmplitude = Math.min(width * 0.22, 280);
      const helixCount = Math.floor(config.count * (1 - config.ambientRatio));
      const ambientCount = config.count - helixCount;

      // Helix particles
      for (let i = 0; i < helixCount; i++) {
        const t = i / helixCount;
        const yPos = t * height;
        const phase = t * Math.PI * 2 * config.helixTwists;
        const side = i % 2;
        const strandX =
          centerX + Math.cos(phase + side * Math.PI) * helixAmplitude;
        const depthZ = Math.sin(phase + side * Math.PI) * 0.5 + 0.5; // 0-1 depth

        particles.push({
          x: strandX,
          y: yPos,
          z: depthZ,
          baseX: strandX,
          baseY: yPos,
          vx: 0,
          vy: 0,
          radius: mapRange(depthZ, 0, 1, 0.8, 2.5),
          alpha: 0,
          targetAlpha: mapRange(depthZ, 0, 1, 0.2, 0.7) * intensity,
          phase,
          speed: Math.random() * 0.3 + 0.15,
          helixSide: side,
          pulsePhase: Math.random() * Math.PI * 2,
          life: 0,
          maxLife: Infinity,
        });
      }

      // Ambient depth particles — scattered across the field
      for (let i = 0; i < ambientCount; i++) {
        const z = Math.random(); // Random depth
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          baseX: 0,
          baseY: 0,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.15 - 0.1, // Slight upward drift
          radius: mapRange(z, 0, 1, 0.3, 1.8),
          alpha: 0,
          targetAlpha: mapRange(z, 0, 1, 0.05, 0.25) * intensity,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.2 + 0.05,
          helixSide: -1,
          pulsePhase: Math.random() * Math.PI * 2,
          life: 0,
          maxLife: Infinity,
        });
      }

      return particles;
    },
    [config, intensity]
  );

  // ─── Initialize Energy Pulses ──────────────────────
  const initPulses = useCallback(() => {
    const pulses: EnergyPulse[] = [];
    for (let i = 0; i < config.pulseCount; i++) {
      pulses.push({
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        side: i % 2,
        alpha: 0.4 + Math.random() * 0.3,
        width: 30 + Math.random() * 40,
      });
    }
    return pulses;
  }, [config.pulseCount]);

  // ─── Color interpolation ──────────────────────────
  const getColor = useCallback(
    (t: number, alpha: number): string => {
      // Blend between primary, secondary, and accent based on position
      const r = Math.round(lerp(primaryColor[0], secondaryColor[0], t));
      const g = Math.round(lerp(primaryColor[1], secondaryColor[1], t));
      const b = Math.round(lerp(primaryColor[2], secondaryColor[2], t));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    [primaryColor, secondaryColor]
  );

  // ─── Main Effect ───────────────────────────────────
  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Resize handler with DPR
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      particlesRef.current = initParticles(rect.width, rect.height);
      if (showPulses) pulsesRef.current = initPulses();
    };

    resize();

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener('resize', debouncedResize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive && !isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // ─── Animation Loop ──────────────────────────────
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 0.006;
      const time = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse position
      const mouse = mouseRef.current;
      const sm = smoothMouseRef.current;
      if (mouse.active) {
        sm.x = lerp(sm.x, mouse.x, 0.08);
        sm.y = lerp(sm.y, mouse.y, 0.08);
      } else {
        sm.x = lerp(sm.x, -9999, 0.03);
        sm.y = lerp(sm.y, -9999, 0.03);
      }

      const particles = particlesRef.current;
      const centerX = w / 2;
      const helixAmplitude = Math.min(w * 0.22, 280);

      // ── Update & Draw Particles ────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Fade in
        p.alpha = lerp(p.alpha, p.targetAlpha, 0.02);

        if (p.helixSide >= 0) {
          // Helix particles — rotate around center axis
          const newPhase = p.phase + time * 0.4;
          const depthZ = Math.sin(newPhase + p.helixSide * Math.PI) * 0.5 + 0.5;
          p.x = centerX + Math.cos(newPhase + p.helixSide * Math.PI) * helixAmplitude;
          p.y = p.baseY + Math.sin(time * 1.5 + p.phase * 0.5) * 4;
          p.z = depthZ;
          p.radius = mapRange(depthZ, 0, 1, 0.8, 2.8);

          // Alpha based on depth (front particles brighter)
          p.targetAlpha = mapRange(depthZ, 0, 1, 0.15, 0.65) * intensity;
        } else {
          // Ambient particles — gentle drift
          p.x += p.vx;
          p.y += p.vy;

          // Gentle sine wave motion
          p.x += Math.sin(time + p.phase) * 0.3;

          // Wrap
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }

        // Cursor interaction — magnetic repulsion
        if (sm.x > -999) {
          const d = dist(p.x, p.y, sm.x, sm.y);
          const interactionRadius = 180;
          if (d < interactionRadius) {
            const force = Math.pow((interactionRadius - d) / interactionRadius, 2);
            const angle = Math.atan2(p.y - sm.y, p.x - sm.x);
            p.x += Math.cos(angle) * force * 4;
            p.y += Math.sin(angle) * force * 4;

            // Brighten nearby particles
            p.targetAlpha = Math.min(
              p.targetAlpha * 1.5 + force * 0.3,
              0.9
            );
          }
        }

        // Pulse glow
        const pulseAlpha = Math.sin(time * 3 + p.pulsePhase) * 0.08;
        const drawAlpha = Math.max(0.02, p.alpha + pulseAlpha);

        // Color based on vertical position
        const colorT = p.y / h;
        const particleColor = getColor(colorT, drawAlpha);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Outer glow for prominent particles
        if (p.radius > 1.5 && config.glowMultiplier > 0) {
          const glowRadius = p.radius * 4 * config.glowMultiplier;
          const gradient = ctx.createRadialGradient(
            p.x, p.y, p.radius * 0.5,
            p.x, p.y, glowRadius
          );
          gradient.addColorStop(0, getColor(colorT, drawAlpha * 0.3));
          gradient.addColorStop(1, getColor(colorT, 0));
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      // ── Draw Connections ───────────────────────────
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        // Only check subset for performance
        const checkLimit = Math.min(particles.length, i + 30);
        for (let j = i + 1; j < checkLimit; j++) {
          const b = particles[j];
          const d = dist(a.x, a.y, b.x, b.y);

          if (d < config.connDist) {
            const opacity = Math.pow(1 - d / config.connDist, 1.5);

            // DNA rungs: cross-strand connections
            if (
              a.helixSide >= 0 &&
              b.helixSide >= 0 &&
              a.helixSide !== b.helixSide
            ) {
              // Brighter, wider rungs
              const rungAlpha = opacity * 0.25 * intensity;
              const midY = (a.y + b.y) / 2 / h;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = getColor(midY, rungAlpha);
              ctx.lineWidth = mapRange(opacity, 0, 1, 0.3, 1.2);
              ctx.stroke();
            } else if (opacity > 0.1) {
              // Ambient connections
              const connAlpha = opacity * 0.08 * intensity;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = getColor(
                (a.y + b.y) / 2 / h,
                connAlpha
              );
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }

      // ── Energy Pulses traveling along helix ────────
      if (showPulses) {
        const pulses = pulsesRef.current;
        for (const pulse of pulses) {
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) pulse.progress = 0;

          const pulseY = pulse.progress * h;
          const pulsePhase =
            pulse.progress * Math.PI * 2 * config.helixTwists +
            time * 0.4;
          const pulseX =
            centerX +
            Math.cos(pulsePhase + pulse.side * Math.PI) * helixAmplitude;

          // Draw pulse glow
          const gradient = ctx.createRadialGradient(
            pulseX, pulseY, 0,
            pulseX, pulseY, pulse.width * config.glowMultiplier
          );
          const pulseColor = pulse.side === 0 ? primaryColor : secondaryColor;
          gradient.addColorStop(
            0,
            `rgba(${pulseColor[0]}, ${pulseColor[1]}, ${pulseColor[2]}, ${pulse.alpha * 0.4 * intensity})`
          );
          gradient.addColorStop(1, `rgba(${pulseColor[0]}, ${pulseColor[1]}, ${pulseColor[2]}, 0)`);

          ctx.beginPath();
          ctx.arc(
            pulseX, pulseY,
            pulse.width * config.glowMultiplier,
            0, Math.PI * 2
          );
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      // ── Cursor Glow ────────────────────────────────
      if (sm.x > -999 && !isMobile) {
        const cursorGradient = ctx.createRadialGradient(
          sm.x, sm.y, 0,
          sm.x, sm.y, 200
        );
        cursorGradient.addColorStop(
          0,
          `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, 0.04)`
        );
        cursorGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, 200, 0, Math.PI * 2);
        ctx.fillStyle = cursorGradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      if (interactive && !isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [
    prefersReduced,
    config,
    primaryColor,
    secondaryColor,
    interactive,
    isMobile,
    initParticles,
    initPulses,
    showPulses,
    getColor,
    intensity,
  ]);

  // ─── Reduced Motion Fallback ───────────────────────
  if (prefersReduced) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-cyan-950/10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-[120px]" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
      style={{ pointerEvents: interactive ? 'auto' : 'none' }}
    />
  );
}
