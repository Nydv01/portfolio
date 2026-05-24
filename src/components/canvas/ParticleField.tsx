/* =========================================================
   PARTICLE FIELD — Atmospheric Reactive Particle Mesh
   A living, breathing particle network with depth-based 
   parallax, organic mesh connections, cursor-reactive 
   magnetic repulsion, and a violet-to-cyan color gradient.
   
   Designed to fill its container as an ambient backdrop.
   Canvas2D for broad device support, DPR-aware rendering.
========================================================= */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useReducedMotion, useIsMobile } from '@/hooks/usePortfolio';

// ─── Types ───────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  phase: number;
  speed: number;
}

interface ParticleFieldProps {
  /** Number of particles to render (default: 120) */
  particleCount?: number;
  /** Max distance for mesh connections in px (default: 130) */
  connectionDistance?: number;
  /** Enable mouse interaction (default: true) */
  interactive?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ─── Utilities ───────────────────────────────────────
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * ParticleField — Atmospheric reactive particle mesh canvas.
 *
 * Renders a full-container Canvas2D particle system with:
 * - Floating particles with z-depth parallax sizing
 * - Organic mesh connections between nearby particles
 * - Cursor-reactive magnetic repulsion field
 * - Violet-to-cyan gradient coloring based on y-position
 * - Ambient cursor glow
 * - Performance optimized: rAF loop, DPR-aware, mobile reduction
 *
 * @example
 * <div className="relative h-screen">
 *   <ParticleField particleCount={120} interactive />
 * </div>
 */
export default function ParticleField({
  particleCount = 120,
  connectionDistance = 130,
  interactive = true,
  className = '',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  // Performance-adjusted config
  const config = useMemo(() => {
    const mobileScale = 0.4;
    return {
      count: isMobile ? Math.floor(particleCount * mobileScale) : particleCount,
      connDist: isMobile ? connectionDistance * 0.6 : connectionDistance,
      cursorRadius: isMobile ? 0 : 180,
      glowRadius: isMobile ? 0 : 220,
    };
  }, [isMobile, particleCount, connectionDistance]);

  // ─── Color Interpolation ────────────────────────────
  const getColor = useCallback(
    (yNormalized: number, alpha: number, isDark: boolean): string => {
      const SILVER = isDark ? [215, 215, 220] : [80, 80, 85];
      const TITANIUM_GOLD = isDark ? [190, 172, 148] : [100, 90, 75];
      const r = Math.round(lerp(SILVER[0], TITANIUM_GOLD[0], yNormalized));
      const g = Math.round(lerp(SILVER[1], TITANIUM_GOLD[1], yNormalized));
      const b = Math.round(lerp(SILVER[2], TITANIUM_GOLD[2], yNormalized));
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    []
  );

  // ─── Initialize Particles ──────────────────────────
  const initParticles = useCallback(
    (width: number, height: number): Particle[] => {
      const particles: Particle[] = [];

      for (let i = 0; i < config.count; i++) {
        const z = Math.random(); // 0 = far, 1 = near
        const x = Math.random() * width;
        const y = Math.random() * height;

        particles.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.15 - 0.08, // slight upward drift
          radius: lerp(0.4, 2.2, z),
          alpha: 0,
          targetAlpha: lerp(0.08, 0.5, z),
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.2 + 0.08,
        });
      }

      return particles;
    },
    [config.count]
  );

  // ─── Main Animation Effect ─────────────────────────
  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // ── Resize with DPR ──────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener('resize', debouncedResize);

    // ── Mouse Tracking ───────────────────────────────
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

    // ── Animation Loop ───────────────────────────────
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 0.005;
      const time = timeRef.current;
      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, w, h);

      // Smooth mouse position with lerp
      const mouse = mouseRef.current;
      const sm = smoothMouseRef.current;
      if (mouse.active) {
        sm.x = lerp(sm.x, mouse.x, 0.07);
        sm.y = lerp(sm.y, mouse.y, 0.07);
      } else {
        sm.x = lerp(sm.x, -9999, 0.04);
        sm.y = lerp(sm.y, -9999, 0.04);
      }

      // ── Draw Warped HUD Space-Time Grid ──────────────
      const GRID_SPACING = 55;
      const warpRadius = 240;
      const warpStrength = -32; // Pull points toward the cursor for gravitational sink
      const cols = Math.ceil(w / GRID_SPACING) + 1;
      const rows = Math.ceil(h / GRID_SPACING) + 1;
      
      const points: {x: number, y: number}[][] = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const ix = c * GRID_SPACING;
          const iy = r * GRID_SPACING;
          
          let px = ix;
          let py = iy;
          
          if (sm.x > -999) {
            const dx = ix - sm.x;
            const dy = iy - sm.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < warpRadius) {
              const force = Math.sin((1 - d / warpRadius) * Math.PI / 2) * warpStrength;
              const angle = Math.atan2(dy, dx);
              px = ix + Math.cos(angle) * force;
              py = iy + Math.sin(angle) * force;
            }
          }
          points[r][c] = { x: px, y: py };
        }
      }
      
      // Draw Grid Lines (Subtle titanium/slate lines)
      ctx.strokeStyle = isDark ? "rgba(190, 172, 148, 0.035)" : "rgba(100, 90, 75, 0.06)"; 
      ctx.lineWidth = 0.5;
      
      // Vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          if (r === 0) ctx.moveTo(points[r][c].x, points[r][c].y);
          else ctx.lineTo(points[r][c].x, points[r][c].y);
        }
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          if (c === 0) ctx.moveTo(points[r][c].x, points[r][c].y);
          else ctx.lineTo(points[r][c].x, points[r][c].y);
        }
        ctx.stroke();
      }

      // Draw minor crosshair tick marks at intersections (Soft silver / dark grey)
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = points[r][c];
          if (pt.x > 0 && pt.x < w && pt.y > 0 && pt.y < h) {
            ctx.fillRect(pt.x - 1.5, pt.y - 0.5, 3, 1);
            ctx.fillRect(pt.x - 0.5, pt.y - 1.5, 1, 3);
          }
        }
      }

      const particles = particlesRef.current;

      // ── Update Particles ─────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Fade in slowly
        p.alpha = lerp(p.alpha, p.targetAlpha, 0.015);

        // Organic drift
        p.x += p.vx + Math.sin(time * 2 + p.phase) * 0.2 * p.speed;
        p.y += p.vy + Math.cos(time * 1.5 + p.phase * 0.7) * 0.15 * p.speed;

        // Wrap around edges with margin
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        // Cursor repulsion — magnetic field
        if (sm.x > -999 && config.cursorRadius > 0) {
          const d = dist(p.x, p.y, sm.x, sm.y);
          if (d < config.cursorRadius) {
            const force = Math.pow(
              (config.cursorRadius - d) / config.cursorRadius,
              2
            );
            const angle = Math.atan2(p.y - sm.y, p.x - sm.x);
            p.x += Math.cos(angle) * force * 3.5;
            p.y += Math.sin(angle) * force * 3.5;

            // Brighten nearby particles
            p.targetAlpha = Math.min(
              lerp(0.08, 0.5, p.z) * 1.6 + force * 0.25,
              0.85
            );
          } else {
            // Reset target alpha
            p.targetAlpha = lerp(0.08, 0.5, p.z);
          }
        }

        // Subtle pulse
        const pulse = Math.sin(time * 2.5 + p.phase) * 0.06;
        const drawAlpha = Math.max(0.02, p.alpha + pulse);

        // Color based on vertical position
        const colorT = Math.min(Math.max(p.y / h, 0), 1);
        const particleColor = getColor(colorT, drawAlpha, isDark);

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Glow halo for near-depth (z > 0.6) particles
        if (p.z > 0.6 && !isMobile) {
          const glowSize = p.radius * 4;
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            p.radius * 0.3,
            p.x,
            p.y,
            glowSize
          );
          gradient.addColorStop(0, getColor(colorT, drawAlpha * 0.25, isDark));
          gradient.addColorStop(1, getColor(colorT, 0, isDark));
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      // ── Draw Mesh Connections ────────────────────
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        // Limit check window for perf — only compare nearby indices + spatial proximity
        const checkLimit = Math.min(particles.length, i + 25);
        for (let j = i + 1; j < checkLimit; j++) {
          const b = particles[j];
          const d = dist(a.x, a.y, b.x, b.y);

          if (d < config.connDist) {
            const opacity = Math.pow(1 - d / config.connDist, 1.8);
            if (opacity > 0.05) {
              const midY = (a.y + b.y) / 2 / h;
              const connAlpha = opacity * 0.12;

              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${connAlpha})` : `rgba(0, 0, 0, ${connAlpha})`;
              ctx.lineWidth = lerp(0.2, 0.8, opacity);
              ctx.stroke();

              // Faint colored line layered underneath for vibrancy
              if (opacity > 0.3) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = getColor(midY, connAlpha * 0.4, isDark);
                ctx.lineWidth = lerp(0.3, 1.0, opacity);
                ctx.stroke();
              }
            }
          }
        }
      }

      // ── Cursor Ambient Glow ────────────────────────
      if (sm.x > -999 && config.glowRadius > 0) {
        const cursorGradient = ctx.createRadialGradient(
          sm.x,
          sm.y,
          0,
          sm.x,
          sm.y,
          config.glowRadius
        );
        // Determine glow color based on cursor y-position
        const cursorYNorm = Math.min(Math.max(sm.y / h, 0), 1);
        cursorGradient.addColorStop(0, getColor(cursorYNorm, 0.06, isDark));
        cursorGradient.addColorStop(0.5, getColor(cursorYNorm, 0.02, isDark));
        cursorGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, config.glowRadius, 0, Math.PI * 2);
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
    interactive,
    isMobile,
    initParticles,
    getColor,
  ]);

  // ─── Reduced Motion Fallback ───────────────────────
  if (prefersReduced) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-cyan-950/15" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />
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
