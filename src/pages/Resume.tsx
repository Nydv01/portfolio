import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  CheckCircle,
  Award,
  Shield,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import GlowCard from "@/components/effects/GlowCard";

// Hacker text scramble reveal animation
function GlitchText({ text }: { text: string }) {
  const [displayValue, setDisplayValue] = useState(text);
  
  useEffect(() => {
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const interval = setInterval(() => {
      setDisplayValue(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 25);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return <span className="font-mono tracking-tight">{displayValue}</span>;
}

// Live animated SVG Oscilloscope Waveform
function Oscilloscope({ active }: { active: boolean }) {
  return (
    <div className="h-12 w-full overflow-hidden relative border border-primary/15 rounded-lg bg-muted/30 dark:bg-black/40 flex items-center justify-center">
      <svg width="100%" height="40" className="opacity-70">
        <motion.path
          d="M 0 20 Q 20 20, 40 20 T 80 20 T 120 20 T 160 20 T 200 20 T 240 20 T 280 20 T 320 20"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.5}
          animate={active ? {
            d: [
              "M 0 20 Q 15 5, 30 20 T 60 20 T 90 35 T 120 5 T 150 20 T 180 20 T 210 20 T 240 5 T 270 20 T 300 20 T 330 20",
              "M 0 20 Q 15 35, 30 20 T 60 5 T 90 20 T 120 20 T 150 35 T 180 20 T 210 5 T 240 20 T 270 20 T 300 20 T 330 20",
              "M 0 20 Q 15 5, 30 20 T 60 20 T 90 35 T 120 5 T 150 20 T 180 20 T 210 20 T 240 5 T 270 20 T 300 20 T 330 20"
            ]
          } : {
            d: [
              "M 0 20 Q 20 18, 40 20 T 80 20 T 120 18 T 160 20 T 200 20 T 240 18 T 280 20 T 320 20",
              "M 0 20 Q 20 22, 40 20 T 80 20 T 120 22 T 160 20 T 200 20 T 240 22 T 280 20 T 320 20",
              "M 0 20 Q 20 18, 40 20 T 80 20 T 120 18 T 160 20 T 200 20 T 240 18 T 280 20 T 320 20"
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
      <div className="absolute right-2 top-1 text-[7px] font-mono text-primary/60 uppercase">SIGNAL WAVE</div>
    </div>
  );
}

function RadarChart({
  data,
  size = 380,
  hoveredIndex,
  setHoveredIndex,
}: {
  data: { label: string; value: number; fullName?: string; items?: string[] }[];
  size?: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const center = size / 2;
  const radius = size * 0.30;
  const angleStep = (2 * Math.PI) / data.length;

  // Track cursor tracking projection
  const [localMouse, setLocalMouse] = useState<{ x: number; y: number; azimuth: number; range: number } | null>(null);

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Relative coordinates to center
    const dx = x - center;
    const dy = y - center;
    
    // Calculate polar azimuth angle (0 to 360)
    let azimuthRad = Math.atan2(dy, dx);
    let azimuthDeg = (azimuthRad * 180) / Math.PI + 90;
    if (azimuthDeg < 0) azimuthDeg += 360;
    
    // Normalized range (0 to 100)
    const dist = Math.sqrt(dx * dx + dy * dy);
    const range = Math.min(100, Math.round((dist / radius) * 100));
    
    setLocalMouse({ x, y, azimuth: Math.round(azimuthDeg), range });
  };

  const handleSvgMouseLeave = () => {
    setLocalMouse(null);
    setHoveredIndex(null);
  };

  // Derive points. If a vertex is hovered, dynamically boost its coordinate radius for spring-morphing!
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const isHovered = hoveredIndex === i;
    const multiplier = isHovered ? 1.08 : 1.0;
    const r = (d.value / 100) * radius * multiplier;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      axisX: center + radius * Math.cos(angle),
      axisY: center + radius * Math.sin(angle),
      labelX: center + (radius + 40) * Math.cos(angle),
      labelY: center + (radius + 40) * Math.sin(angle),
      label: d.label,
      value: d.value,
    };
  });

  // Construct Framer Motion spring path D parameter
  const pathD = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        onMouseMove={handleSvgMouseMove}
        onMouseLeave={handleSvgMouseLeave}
        className="mx-auto overflow-visible cursor-crosshair"
      >
        {/* DEFINITIONS FOR GRADIENTS & FILTERS */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
            <stop offset="70%" stopColor="hsl(var(--primary) / 0.2)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.45)" />
          </radialGradient>
          <radialGradient id="activeSectorGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.5)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.0)" />
          </radialGradient>
          <radialGradient id="centerCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.6)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.0)" />
          </radialGradient>
          <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.22)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.0)" />
          </linearGradient>
          
          {/* Cyber Glow Filter */}
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ─── BACKGROUND DRIFTING STAR PARTICLES ─── */}
        {Array.from({ length: 15 }).map((_, idx) => {
          const angle = (idx * 2 * Math.PI) / 15;
          const r = radius * (0.35 + 0.6 * Math.random());
          const px = center + r * Math.cos(angle);
          const py = center + r * Math.sin(angle);
          
          return (
            <motion.circle
              key={`bit-${idx}`}
              cx={px}
              cy={py}
              r={1}
              fill="hsl(var(--primary))"
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 2.2, 1],
                y: [py, py - 12, py]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
              className="pointer-events-none"
            />
          );
        })}

        {/* ─── COMPASS RINGS (SCI-FI SONAR HUD) ─── */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius + 15}
          fill="none"
          stroke="hsl(var(--primary) / 0.12)"
          strokeWidth={1}
          strokeDasharray="4 8"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius + 22}
          fill="none"
          stroke="hsl(var(--primary) / 0.25)"
          strokeWidth={1}
          strokeDasharray="40 140"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Outer compass ticks */}
        {Array.from({ length: 24 }).map((_, idx) => {
          const tickAngle = (idx * Math.PI) / 12;
          const isMajor = idx % 6 === 0;
          const len = isMajor ? 8 : 4;
          const x1 = center + (radius + 12) * Math.cos(tickAngle);
          const y1 = center + (radius + 12) * Math.sin(tickAngle);
          const x2 = center + (radius + 12 + len) * Math.cos(tickAngle);
          const y2 = center + (radius + 12 + len) * Math.sin(tickAngle);
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth={isMajor ? 1.2 : 0.8}
            />
          );
        })}

        {/* Center Crosshairs */}
        <line x1={center - 8} y1={center} x2={center + 8} y2={center} stroke="hsl(var(--primary) / 0.4)" strokeWidth={1} />
        <line x1={center} y1={center - 8} x2={center} y2={center + 8} stroke="hsl(var(--primary) / 0.4)" strokeWidth={1} />
        <circle cx={center} cy={center} r={3} fill="none" stroke="hsl(var(--primary))" strokeWidth={1} />
        
        {/* Pulsing center core glow */}
        <circle
          cx={center}
          cy={center}
          r={radius * 0.15}
          fill="url(#centerCoreGradient)"
          className="animate-pulse pointer-events-none"
        />

        {/* Concentric Grid Pentagons (Aligned with 5 axis structure) */}
        {[20, 40, 60, 80, 100].map((level) => {
          const levelPoints = data.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (level / 100) * radius;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(" ");
          
          return (
            <polygon
              key={level}
              points={levelPoints}
              fill="none"
              stroke="hsl(var(--border) / 0.18)"
              strokeWidth={1}
            />
          );
        })}

        {/* Active sector highlight wedge */}
        {hoveredIndex !== null && (
          <path
            d={(() => {
              const angle1 = (hoveredIndex - 0.5) * angleStep - Math.PI / 2;
              const angle2 = (hoveredIndex + 0.5) * angleStep - Math.PI / 2;
              const x1 = center + radius * Math.cos(angle1);
              const y1 = center + radius * Math.sin(angle1);
              const x2 = center + radius * Math.cos(angle2);
              const y2 = center + radius * Math.sin(angle2);
              return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
            })()}
            fill="url(#activeSectorGradient)"
            opacity={0.22}
            className="pointer-events-none"
          />
        )}

        {/* Dynamic Sweeping Sonar Laser Cone */}
        <motion.path
          d={`M ${center} ${center} L ${center} ${center - radius} A ${radius} ${radius} 0 0 1 ${
            center + radius * Math.sin(Math.PI / 6)
          } ${center - radius * Math.cos(Math.PI / 6)} Z`}
          fill="url(#radarSweepGradient)"
          style={{ transformOrigin: `${center}px ${center}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* Radial Axes */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.axisX}
            y2={p.axisY}
            stroke="hsl(var(--border) / 0.25)"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
        ))}

        {/* Axis Ticks */}
        {points.map((p, i) => {
          return [25, 50, 75].map((lvl, k) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = (lvl / 100) * radius;
            const tx = center + r * Math.cos(angle);
            const ty = center + r * Math.sin(angle);
            const tickSize = 3;
            const tickX1 = tx - tickSize * Math.sin(angle);
            const tickY1 = ty + tickSize * Math.cos(angle);
            const tickX2 = tx + tickSize * Math.sin(angle);
            const tickY2 = ty - tickSize * Math.cos(angle);
            return (
              <line
                key={`${i}-${k}`}
                x1={tickX1}
                y1={tickY1}
                x2={tickX2}
                y2={tickY2}
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth={1}
              />
            );
          });
        })}

        {/* Degree markers */}
        {points.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const degree = Math.round((i * 360) / data.length);
          const x = center + (radius + 18) * Math.cos(angle);
          const y = center + (radius + 18) * Math.sin(angle);
          return (
            <text
              key={`deg-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[7px] font-mono fill-muted-foreground/35 pointer-events-none"
            >
              {String(degree).padStart(3, "0")}°
            </text>
          );
        })}

        {/* Spring-Morphing Neon Polygon Glow Layer */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={4.5}
          filter="url(#radarGlow)"
          className="opacity-60 pointer-events-none"
          animate={{ d: pathD }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* Spring-Morphing Main Polygon Layer */}
        <motion.path
          d={pathD}
          fill="url(#radarGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          animate={{ d: pathD }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />

        {/* Interactive nodes and Synced Pulse Rings */}
        {points.map((p, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g key={i} className="pointer-events-none">
              {/* Radar sweep trigger pulse */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={10}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={1}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 2.2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 5 * (i / data.length),
                  ease: "easeInOut",
                }}
              />

              {/* Ping glow on hover */}
              {isHovered && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={12}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={1.5}
                  className="animate-ping"
                />
              )}

              {/* Core Node Dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 6 : 4}
                fill={isHovered ? "hsl(var(--foreground))" : "hsl(var(--primary))"}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                className="transition-all duration-200"
              />
            </g>
          );
        })}

        {/* SVG Digital HUD Badges for Labels */}
        {points.map((p, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g key={i} className="pointer-events-none">
              {/* Badge Background Capsule */}
              <rect
                x={p.labelX - 48}
                y={p.labelY - 14}
                width={96}
                height={26}
                rx={6}
                fill="hsl(var(--card) / 0.85)"
                stroke={isHovered ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)"}
                strokeWidth={isHovered ? 1.5 : 1}
                className="transition-all duration-300 backdrop-blur-md"
              />
              {/* Domain Name */}
              <text
                x={p.labelX}
                y={p.labelY - 3}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-[8px] font-mono font-bold transition-colors duration-200 ${
                  isHovered ? "fill-primary" : "fill-foreground/80"
                }`}
              >
                {p.label}
              </text>
              {/* Score label */}
              <text
                x={p.labelX}
                y={p.labelY + 6}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-[7px] font-mono font-semibold transition-colors duration-200 ${
                  isHovered ? "fill-primary/80" : "fill-muted-foreground/60"
                }`}
              >
                LEVEL: {p.value}%
              </text>
            </g>
          );
        })}

        {/* ─── Real-Time Mouse-Tracking Sonar Sweep Target line ─── */}
        {localMouse && (
          <g className="pointer-events-none">
            {/* Project dotted vector line */}
            <line
              x1={center}
              y1={center}
              x2={localMouse.x}
              y2={localMouse.y}
              stroke="hsl(var(--primary) / 0.35)"
              strokeWidth={1}
              strokeDasharray="2 3"
            />
            {/* Targeting crosshair ring */}
            <circle
              cx={localMouse.x}
              cy={localMouse.y}
              r={7}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={1.2}
            />
            {/* Dynamic Coordinates HUD readout text */}
            <text
              x={localMouse.x + 12}
              y={localMouse.y - 12}
              className="text-[8px] font-mono font-bold fill-primary shadow-sm"
            >
              AZIMUTH: {localMouse.azimuth}° | RANGE: {localMouse.range}%
            </text>
          </g>
        )}

        {/* Hover Wedges (Pie slices for easy hovering) */}
        {points.map((p, i) => {
          const angle1 = (i - 0.5) * angleStep - Math.PI / 2;
          const angle2 = (i + 0.5) * angleStep - Math.PI / 2;
          const x1 = center + (radius + 35) * Math.cos(angle1);
          const y1 = center + (radius + 35) * Math.sin(angle1);
          const x2 = center + (radius + 35) * Math.cos(angle2);
          const y2 = center + (radius + 35) * Math.sin(angle2);
          const wedgePath = `M ${center} ${center} L ${x1} ${y1} A ${radius + 35} ${radius + 35} 0 0 1 ${x2} ${y2} Z`;

          return (
            <path
              key={`wedge-${i}`}
              d={wedgePath}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => {
                setHoveredIndex(i);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
              }}
            />
          );
        })}
      </motion.svg>
    </div>
  );
}

export default function Resume() {
  const isMobile = useIsMobile();
  const { content } = useContentStore();
  const { profile, timeline, skills, certifications } = content;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Derive education list
  const educationList = timeline
    .filter(t => t.institution)
    .map(t => `${t.title} – ${t.institution}`);

  const fallbackEducation = [
    "B.Tech in Computer Science Engineering – VIT Bhopal",
    "Class 10: 90% (Strong academic foundation)",
    "Class 12: 80% (Science stream)",
  ];
  const finalEducation = educationList.length > 0 ? educationList : fallbackEducation;

  // Derive skills highlights
  const skillsHighlights = skills.slice(0, 4).map(cat => 
    `${cat.title} (${cat.items.slice(0, 3).map(i => i.name).join(", ")})`
  );
  const fallbackSkills = [
    "Full-Stack Development (React, FastAPI, Node.js)",
    "Cybersecurity & Ethical Hacking fundamentals",
    "AI-powered application development (OpenAI APIs)",
    "Strong CS fundamentals: DSA, OS, DBMS, CN",
  ];
  const finalSkills = skillsHighlights.length > 0 ? skillsHighlights : fallbackSkills;

  // Derive certifications
  const certsList = certifications.map(c => `${c.title} (${c.issuer})`);
  const fallbackCerts = [
    "Google Cybersecurity Professional Certificate",
    "Google Generative AI Certification",
    "Industrial IoT Markets & Security (Coursera)",
    "Multiple verified Credly skill badges",
  ];
  const finalCerts = certsList.length > 0 ? certsList : fallbackCerts;

  // Calculate radar data dynamically from skills
  const radarData = skills.map(cat => {
    const avg = cat.items.reduce((sum, item) => sum + item.level, 0) / (cat.items.length || 1);
    return {
      label: cat.title.split(" ")[0], // Short label for radar axis
      value: Math.round(avg),
      fullName: cat.title,
      items: cat.items.map(i => i.name)
    };
  });

  const fallbackRadar = [
    { label: "Full-Stack", value: 90, fullName: "Full-Stack Development", items: ["React", "FastAPI", "Node.js"] },
    { label: "AI", value: 85, fullName: "AI / GenAI Engineering", items: ["OpenAI APIs", "Whisper", "LLM Apps"] },
    { label: "Cybersecurity", value: 75, fullName: "Cybersecurity & Cryptography", items: ["Ethical Hacking", "Web Security"] },
    { label: "Design", value: 80, fullName: "System Design", items: ["REST APIs", "Microservices"] },
    { label: "DSA", value: 70, fullName: "Data Structures & Algorithms", items: ["C++", "Python", "Problem Solving"] },
  ];
  const finalRadar = radarData.length > 0 ? radarData : fallbackRadar;

  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden min-h-[calc(100vh-4rem)]">
        <div className="absolute inset-0 -z-10 bg-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="relative z-10">
          <SectionHeading
            title="Resume"
            subtitle="Academic foundation, engineering skills, and verified credentials"
          />

          {/* ================= DOWNLOAD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-20"
          >
            <GlowCard glowColor="violet" enableTilt className="p-10 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-primary" />
              </div>

              <h3 className="text-3xl font-bold mb-3">
                {profile.name} — Resume
              </h3>

              <p className="text-muted-foreground mb-8">
                ATS-optimized resume highlighting full-stack engineering,
                cybersecurity exposure, AI projects, and strong CS fundamentals.
              </p>

              <Button asChild size="lg" className="gap-2 glow hover-lift">
                <a
                  href={profile.resumeUrl}
                  download="Nitin-ydv-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-5 w-5" />
                  Download Resume (PDF)
                </a>
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Last updated: May 2026
              </p>
            </GlowCard>
          </motion.div>

          {/* ================= FLOATING SECTIONS ================= */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">

            {/* ================= EDUCATION ================= */}
            <motion.div
              animate={isMobile ? { y: [0, -6, 0] } : { y: [0, -14, 0] }}
              transition={{
                duration: isMobile ? 6 : 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full"
            >
              <GlowCard glowColor="violet" enableTilt className="h-full p-8 flex flex-col">
                <Award className="h-8 w-8 text-primary mb-4" />
                <h4 className="font-semibold mb-4 text-foreground">
                  Education
                </h4>
                <div className="space-y-4">
                  {finalEducation.map((e) => (
                    <p key={e} className="flex gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {e}
                      </span>
                    </p>
                  ))}
                </div>
              </GlowCard>
            </motion.div>

            {/* ================= SKILLS ================= */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
              className="h-full"
            >
              <GlowCard glowColor="cyan" enableTilt className="h-full p-8 flex flex-col">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h4 className="font-semibold mb-4 text-foreground">
                  Core Skills
                </h4>
                <div className="space-y-4">
                  {finalSkills.map((s) => (
                    <p key={s} className="flex gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {s}
                      </span>
                    </p>
                  ))}
                </div>
              </GlowCard>
            </motion.div>

            {/* ================= CERTIFICATIONS ================= */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1.2 }}
              className="h-full"
            >
              <GlowCard glowColor="amber" enableTilt className="h-full p-8 flex flex-col">
                <Brain className="h-8 w-8 text-primary mb-4" />
                <h4 className="font-semibold mb-4 text-foreground">
                  Certifications
                </h4>
                <div className="space-y-4">
                  {finalCerts.map((c) => (
                    <p key={c} className="flex gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {c}
                      </span>
                    </p>
                  ))}
                </div>
              </GlowCard>
            </motion.div>

          </div>

          {/* ================= WHY HIRE ME ================= */}
          <div className="max-w-4xl mx-auto mb-24">
            <GlowCard glowColor="violet" enableTilt className="p-12 text-center">
              <h3 className="text-2xl font-bold mb-6">
                Why Hire Me?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I don’t just write code — I build systems. With a strong academic
                base, real-world full-stack projects, exposure to cybersecurity,
                and hands-on AI development, I bring a problem-first engineering
                mindset. I learn fast, execute cleanly, and ship solutions that
                scale.
              </p>
            </GlowCard>
          </div>

          {/* ================= SKILL RADAR ================= */}
          <div className="max-w-6xl mx-auto mb-24">
            <h3 className="text-2xl font-bold text-center mb-10">
              Skill Proficiency Radar
            </h3>

            <GlowCard glowColor="violet" enableTilt={false} className="p-8 md:p-10 relative overflow-hidden">
              {/* Corner coordinate readouts to look extra starstruck/holographic */}
              <div className="absolute top-4 left-4 text-[8px] font-mono text-primary/35 uppercase tracking-wider hidden sm:block">// RADAR SYSTEM STATUS: ACTIVE</div>
              <div className="absolute top-4 right-4 text-[8px] font-mono text-primary/35 uppercase tracking-wider hidden sm:block">COORDS: 23.25N | 77.41E</div>
              <div className="absolute bottom-4 left-4 text-[8px] font-mono text-primary/35 uppercase tracking-wider hidden sm:block">REF_SYS: VIT-BHOPAL</div>
              <div className="absolute bottom-4 right-4 text-[8px] font-mono text-primary/35 uppercase tracking-wider hidden sm:block">DIAG_V: 2.0.26</div>

              <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-8 items-center pt-4 sm:pt-6">
                {/* Left Column: Radar SVG */}
                <div className="flex justify-center items-center w-full">
                  <RadarChart 
                    data={finalRadar} 
                    hoveredIndex={hoveredIndex} 
                    setHoveredIndex={setHoveredIndex} 
                  />
                </div>
                
                {/* Right Column: Dynamic holographic detail console display */}
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    {hoveredIndex === null ? (
                      <motion.div
                        key="default-hud"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative overflow-hidden p-6 rounded-2xl border border-primary/20 bg-primary/5 min-h-[340px] flex flex-col justify-between"
                      >
                        {/* Decorative HUD Corners */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/40" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/40" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/40" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/40" />

                        {/* Faint scanning scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.02)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />

                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-widest text-primary/60 uppercase">// RADAR SCANNER ACTIVE</span>
                            <span className="text-[9px] font-mono text-emerald-500 animate-pulse flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ONLINE
                            </span>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-foreground">Interactive Competency Analyzer</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Hover over different sectors of the radar chart to initiate a real-time diagnostic scan of Nitin's verified skill proficiencies, framework expertise, and tools.
                            </p>
                          </div>

                          {/* Passive idle Oscilloscope Wave */}
                          <Oscilloscope active={false} />

                          {/* Diagnostic parameters grid */}
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/20">
                            <div>
                              <div className="text-[9px] font-mono text-muted-foreground uppercase">// SCAN FREQ</div>
                              <div className="text-sm font-mono font-bold text-foreground">1024 Hz</div>
                            </div>
                            <div>
                              <div className="text-[9px] font-mono text-muted-foreground uppercase">// SECURITY</div>
                              <div className="text-sm font-mono font-bold text-foreground">SHA-256</div>
                            </div>
                          </div>
                        </div>

                        <div className="text-[9px] font-mono text-primary/40 uppercase mt-6 relative z-10">// HOVER OVER RADAR NODES TO INITIATE DEEP SCAN</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={hoveredIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="relative overflow-hidden p-6 rounded-2xl border border-primary/40 bg-primary/10 min-h-[340px] flex flex-col justify-between shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
                      >
                        {/* Glowing corners */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

                        {/* Active scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />

                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-widest text-primary uppercase">// DIAGNOSTIC ACTIVE</span>
                            <span className="text-[9px] font-mono text-primary animate-pulse flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> SCAN CODE: 0{hoveredIndex + 1}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-end justify-between gap-4">
                              {/* Decrypting scramble text animation */}
                              <h4 className="text-xl font-bold text-foreground tracking-tight">
                                <GlitchText text={finalRadar[hoveredIndex].fullName} />
                              </h4>
                              <div className="text-right">
                                <span className="text-xl font-mono font-bold text-primary">{finalRadar[hoveredIndex].value}%</span>
                              </div>
                            </div>

                            {/* Level indicator progress bar */}
                            <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${finalRadar[hoveredIndex].value}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="h-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
                              />
                            </div>
                          </div>

                          {/* Active running Oscilloscope Wave */}
                          <Oscilloscope active={true} />

                          <div className="space-y-2 pt-1">
                            <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">// DETECTED STACK:</div>
                            <div className="flex flex-wrap gap-1.5">
                              {finalRadar[hoveredIndex].items.map((item, idx) => (
                                <motion.span
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.04 }}
                                  key={idx}
                                  className="text-[10px] font-mono px-2 py-1 rounded bg-primary/5 border border-primary/20 text-foreground hover:border-primary/50 transition-colors"
                                >
                                  {item}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-[9px] font-mono text-primary/60 uppercase mt-6 relative z-10">// ENCRYPTED SECTOR VERIFIED | STATUS: OPTIMAL</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* ================= LINKS ================= */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link
              to="/projects"
              className="group"
            >
              <GlowCard glowColor="violet" enableTilt className="p-8 h-full">
                <h4 className="font-semibold flex items-center gap-2 group-hover:text-primary transition-colors">
                  View Projects <ArrowRight className="h-4 w-4" />
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Real-world engineering work
                </p>
              </GlowCard>
            </Link>

            <Link
              to="/contact"
              className="group"
            >
              <GlowCard glowColor="cyan" enableTilt className="p-8 h-full">
                <h4 className="font-semibold flex items-center gap-2 group-hover:text-primary transition-colors">
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Open to roles and collaborations
                </p>
              </GlowCard>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
