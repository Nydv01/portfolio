/* =========================================================
   INTERACTIVE 3D CANVAS AVATAR
   - Canvas2D rendered face with isometric depth shading
   - Cursor-tracking eyes across full viewport
   - Smile morphing on hover
   - Holographic aura rings with glow
   - Breathing idle animation
   - Full dark/light mode adaptive
========================================================= */

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AvatarCanvasProps {
  isHovered: boolean;
  size?: number;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function AvatarCanvas({ isHovered, size = 176 }: AvatarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const eyeRef = useRef({ lx: 0, ly: 0, rx: 0, ry: 0 });
  const smileRef = useRef(0);
  const breathRef = useRef(0);
  const timeRef = useRef(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const faceR = size * 0.38;

    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      // Breathing
      breathRef.current = Math.sin(t * 1.2) * 0.012;
      const breathScale = 1 + breathRef.current;

      // Smile interpolation
      const targetSmile = isHovered ? 1 : 0;
      smileRef.current = lerp(smileRef.current, targetSmile, 0.06);
      const smile = smileRef.current;

      // Eye tracking
      const rect = canvas.getBoundingClientRect();
      const canvasCX = rect.left + rect.width / 2;
      const canvasCY = rect.top + rect.height / 2;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Vector from canvas center to mouse, capped at pupil max travel
      const dx = mx - canvasCX;
      const dy = my - canvasCY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const maxEyeTravel = faceR * 0.22;
      const eyeStrength = Math.min(dist / 300, 1);
      const ex = (dx / dist) * maxEyeTravel * eyeStrength;
      const ey = (dy / dist) * maxEyeTravel * eyeStrength;

      eyeRef.current.lx = lerp(eyeRef.current.lx, ex, 0.08);
      eyeRef.current.ly = lerp(eyeRef.current.ly, ey, 0.08);
      eyeRef.current.rx = lerp(eyeRef.current.rx, ex, 0.08);
      eyeRef.current.ry = lerp(eyeRef.current.ry, ey, 0.08);

      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(breathScale, breathScale);
      ctx.translate(-cx, -cy);

      // ─── Outer holographic aura ring (animated) ───────────────
      const auraGrad = ctx.createRadialGradient(cx, cy, faceR * 0.8, cx, cy, faceR * 1.55);
      const auraAlpha = 0.12 + Math.sin(t * 2) * 0.04 + (isHovered ? 0.08 : 0);
      if (isDark) {
        auraGrad.addColorStop(0, `rgba(190, 172, 148, ${auraAlpha})`);
        auraGrad.addColorStop(0.5, `rgba(150, 140, 130, ${auraAlpha * 0.5})`);
        auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      } else {
        auraGrad.addColorStop(0, `rgba(29, 29, 31, ${auraAlpha * 0.6})`);
        auraGrad.addColorStop(0.5, `rgba(60, 60, 70, ${auraAlpha * 0.3})`);
        auraGrad.addColorStop(1, 'rgba(0,0,0,0)');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, faceR * 1.55, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // ─── Rotating dashed aura rings ──────────────────────────
      const ringColors = isDark
        ? [`rgba(190,172,148,${0.18 + (isHovered ? 0.08 : 0)})`, `rgba(255,255,255,0.08)`, `rgba(160,155,150,0.10)`]
        : [`rgba(29,29,31,0.12)`, `rgba(0,0,0,0.06)`, `rgba(50,50,60,0.07)`];

      [[faceR * 1.28, 3, 4, t * 0.4], [faceR * 1.42, 5, 6, -t * 0.25], [faceR * 1.56, 8, 9, t * 0.15]].forEach(([r, dash, gap, rot], i) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot as number);
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx, cy, r as number, 0, Math.PI * 2);
        ctx.setLineDash([dash as number, gap as number]);
        ctx.strokeStyle = ringColors[i];
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // ─── Face base with gradient depth shading ───────────────
      const faceGrad = ctx.createRadialGradient(cx - faceR * 0.2, cy - faceR * 0.25, 0, cx, cy, faceR);
      if (isDark) {
        faceGrad.addColorStop(0, 'hsl(30, 8%, 22%)');
        faceGrad.addColorStop(0.4, 'hsl(25, 7%, 17%)');
        faceGrad.addColorStop(0.8, 'hsl(20, 6%, 13%)');
        faceGrad.addColorStop(1, 'hsl(15, 5%, 9%)');
      } else {
        faceGrad.addColorStop(0, 'hsl(28, 25%, 88%)');
        faceGrad.addColorStop(0.4, 'hsl(25, 22%, 82%)');
        faceGrad.addColorStop(0.8, 'hsl(22, 18%, 74%)');
        faceGrad.addColorStop(1, 'hsl(20, 15%, 65%)');
      }

      ctx.beginPath();
      ctx.arc(cx, cy, faceR, 0, Math.PI * 2);
      ctx.fillStyle = faceGrad;
      ctx.fill();

      // Face border glow
      ctx.beginPath();
      ctx.arc(cx, cy, faceR, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? `rgba(190,172,148,${0.25 + (isHovered ? 0.15 : 0)})` : `rgba(100,80,60,0.20)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ─── Forehead highlight (3D effect) ───────────────────────
      const highlightGrad = ctx.createRadialGradient(cx - faceR * 0.15, cy - faceR * 0.45, 0, cx - faceR * 0.15, cy - faceR * 0.45, faceR * 0.55);
      highlightGrad.addColorStop(0, isDark ? 'rgba(255,245,235,0.14)' : 'rgba(255,250,240,0.45)');
      highlightGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, faceR, 0, Math.PI * 2);
      ctx.fillStyle = highlightGrad;
      ctx.fill();

      // ─── Hair ─────────────────────────────────────────────────
      const hairGrad = ctx.createLinearGradient(cx - faceR, cy - faceR, cx + faceR * 0.3, cy - faceR * 0.5);
      hairGrad.addColorStop(0, isDark ? '#2a2218' : '#3d2b1f');
      hairGrad.addColorStop(0.5, isDark ? '#1a1410' : '#2a1a0f');
      hairGrad.addColorStop(1, isDark ? '#110e08' : '#1a0f08');

      ctx.beginPath();
      ctx.ellipse(cx, cy - faceR * 0.55, faceR * 0.92, faceR * 0.7, 0, Math.PI, 0);
      ctx.fillStyle = hairGrad;
      ctx.fill();

      // Hair highlight
      ctx.beginPath();
      ctx.ellipse(cx - faceR * 0.15, cy - faceR * 0.85, faceR * 0.35, faceR * 0.18, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(180,160,120,0.08)' : 'rgba(120,80,50,0.12)';
      ctx.fill();

      // ─── Eyebrows ─────────────────────────────────────────────
      const browY = cy - faceR * 0.28;
      const browLift = smile * faceR * 0.04;
      const browColor = isDark ? 'rgba(180,155,110,0.9)' : 'rgba(60,35,18,0.85)';

      [[-faceR * 0.32, faceR * 0.12], [faceR * 0.20, faceR * 0.12]].forEach(([xOff]) => {
        ctx.beginPath();
        ctx.moveTo(cx + (xOff as number) - faceR * 0.12, browY - browLift);
        ctx.quadraticCurveTo(cx + (xOff as number) + faceR * 0.01, browY - browLift - faceR * 0.06, cx + (xOff as number) + faceR * 0.12, browY - browLift + faceR * 0.01);
        ctx.strokeStyle = browColor;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      // ─── Eyes (whites + irises + pupils + highlights) ─────────
      const eyeY = cy - faceR * 0.12;
      const eyeOffsets = [[-faceR * 0.27, eyeRef.current.lx, eyeRef.current.ly], [faceR * 0.27, eyeRef.current.rx, eyeRef.current.ry]];

      eyeOffsets.forEach(([xOff, ex2, ey2]) => {
        const ex3 = cx + (xOff as number);
        const er = faceR * 0.155;

        // Eye white with subtle shadow at bottom
        const eyeWhiteGrad = ctx.createRadialGradient(ex3 - er * 0.2, eyeY - er * 0.3, 0, ex3, eyeY, er);
        eyeWhiteGrad.addColorStop(0, isDark ? 'rgba(240,235,225,0.95)' : 'rgba(250,248,244,0.98)');
        eyeWhiteGrad.addColorStop(0.7, isDark ? 'rgba(215,205,190,0.9)' : 'rgba(240,235,230,0.95)');
        eyeWhiteGrad.addColorStop(1, isDark ? 'rgba(180,165,145,0.8)' : 'rgba(220,210,200,0.9)');

        ctx.beginPath();
        ctx.ellipse(ex3, eyeY, er, er * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = eyeWhiteGrad;
        ctx.fill();

        // Iris
        const irisX = ex3 + (ex2 as number) * 0.7;
        const irisY = eyeY + (ey2 as number) * 0.7;
        const irisR = er * 0.58;
        const irisGrad = ctx.createRadialGradient(irisX - irisR * 0.3, irisY - irisR * 0.3, 0, irisX, irisY, irisR);
        irisGrad.addColorStop(0, isDark ? '#5a7a9a' : '#3d6080');
        irisGrad.addColorStop(0.4, isDark ? '#3d5f7a' : '#2a4a65');
        irisGrad.addColorStop(0.8, isDark ? '#1e3a55' : '#162d45');
        irisGrad.addColorStop(1, '#0a1520');
        ctx.beginPath();
        ctx.arc(irisX, irisY, irisR, 0, Math.PI * 2);
        ctx.fillStyle = irisGrad;
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.arc(irisX, irisY, irisR * 0.42, 0, Math.PI * 2);
        ctx.fillStyle = '#050a0f';
        ctx.fill();

        // Eye catchlight (3D sparkle)
        ctx.beginPath();
        ctx.arc(irisX - irisR * 0.28, irisY - irisR * 0.32, irisR * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(irisX + irisR * 0.12, irisY - irisR * 0.4, irisR * 0.09, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();

        // Eyelid shadow
        const lidGrad = ctx.createLinearGradient(ex3, eyeY - er, ex3, eyeY + er * 0.3);
        lidGrad.addColorStop(0, 'rgba(0,0,0,0.18)');
        lidGrad.addColorStop(0.4, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.ellipse(ex3, eyeY, er, er * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = lidGrad;
        ctx.fill();
      });

      // ─── Nose (subtle) ─────────────────────────────────────────
      const noseY = cy + faceR * 0.12;
      ctx.beginPath();
      ctx.moveTo(cx, cy - faceR * 0.05);
      ctx.bezierCurveTo(cx - faceR * 0.04, noseY - faceR * 0.06, cx - faceR * 0.12, noseY, cx - faceR * 0.09, noseY + faceR * 0.02);
      ctx.bezierCurveTo(cx - faceR * 0.06, noseY + faceR * 0.04, cx + faceR * 0.06, noseY + faceR * 0.04, cx + faceR * 0.09, noseY + faceR * 0.02);
      ctx.bezierCurveTo(cx + faceR * 0.12, noseY, cx + faceR * 0.04, noseY - faceR * 0.06, cx, cy - faceR * 0.05);
      ctx.strokeStyle = isDark ? 'rgba(100,75,50,0.5)' : 'rgba(130,90,60,0.45)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // ─── Mouth / Smile morphing ─────────────────────────────────
      const mouthY = cy + faceR * 0.34;
      const mouthW = faceR * 0.42;
      const smileCurve = smile * faceR * 0.2;
      const mouthOpenness = smile * faceR * 0.08;

      if (smile > 0.05) {
        // Open mouth with teeth when smiling
        ctx.beginPath();
        ctx.moveTo(cx - mouthW, mouthY);
        ctx.bezierCurveTo(cx - mouthW * 0.5, mouthY + smileCurve + mouthOpenness, cx + mouthW * 0.5, mouthY + smileCurve + mouthOpenness, cx + mouthW, mouthY);
        ctx.bezierCurveTo(cx + mouthW * 0.5, mouthY + smileCurve * 0.3, cx - mouthW * 0.5, mouthY + smileCurve * 0.3, cx - mouthW, mouthY);
        ctx.fillStyle = isDark ? '#1a0e08' : '#2a1208';
        ctx.fill();

        // Teeth
        const teethGrad = ctx.createLinearGradient(cx, mouthY, cx, mouthY + smileCurve * 0.5);
        teethGrad.addColorStop(0, 'rgba(255,252,248,0.95)');
        teethGrad.addColorStop(1, 'rgba(230,225,218,0.85)');
        ctx.beginPath();
        ctx.moveTo(cx - mouthW * 0.75, mouthY + smileCurve * 0.1);
        ctx.bezierCurveTo(cx - mouthW * 0.35, mouthY + smileCurve * 0.4, cx + mouthW * 0.35, mouthY + smileCurve * 0.4, cx + mouthW * 0.75, mouthY + smileCurve * 0.1);
        ctx.lineTo(cx + mouthW * 0.75, mouthY + smileCurve * 0.15);
        ctx.bezierCurveTo(cx + mouthW * 0.35, mouthY + smileCurve * 0.5, cx - mouthW * 0.35, mouthY + smileCurve * 0.5, cx - mouthW * 0.75, mouthY + smileCurve * 0.15);
        ctx.closePath();
        ctx.fillStyle = teethGrad;
        ctx.fill();

        // Smile cheek blush
        [[-faceR * 0.52], [faceR * 0.52]].forEach(([blushX]) => {
          const blushGrad = ctx.createRadialGradient(cx + (blushX as number), mouthY - faceR * 0.1, 0, cx + (blushX as number), mouthY - faceR * 0.1, faceR * 0.2);
          blushGrad.addColorStop(0, isDark ? `rgba(200,100,90,${0.12 * smile})` : `rgba(220,120,100,${0.18 * smile})`);
          blushGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(cx + (blushX as number), mouthY - faceR * 0.1, faceR * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = blushGrad;
          ctx.fill();
        });
      } else {
        // Neutral mouth line
        ctx.beginPath();
        ctx.moveTo(cx - mouthW * 0.6, mouthY);
        ctx.bezierCurveTo(cx - mouthW * 0.2, mouthY + smileCurve, cx + mouthW * 0.2, mouthY + smileCurve, cx + mouthW * 0.6, mouthY);
        ctx.strokeStyle = isDark ? 'rgba(120,90,65,0.7)' : 'rgba(100,70,50,0.65)';
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // ─── Cyber HUD scan line (dark only) ─────────────────────
      if (isDark) {
        const scanY = (Math.sin(t * 0.8) * 0.5 + 0.5) * size;
        const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
        scanGrad.addColorStop(0, 'rgba(190,172,148,0)');
        scanGrad.addColorStop(0.5, 'rgba(190,172,148,0.06)');
        scanGrad.addColorStop(1, 'rgba(190,172,148,0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 2, size, 4);
      }

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered, size, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="rounded-full cursor-pointer"
      aria-label="Interactive 3D Avatar"
    />
  );
}
