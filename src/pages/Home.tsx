import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Code,
  Brain,
  Shield,
  Layers,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";
import { useIsMobile } from "@/hooks/use-mobile";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import ParticleField from "@/components/canvas/ParticleField";
import GlowCard from "@/components/effects/GlowCard";
import MagneticButton from "@/components/effects/MagneticButton";
import TextReveal from "@/components/effects/TextReveal";

// Hacker text scramble decrypter
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

// Avatar Hologram Canvas removed

// Blinking avatar float animation
const floatAvatar = {
  animate: { y: [0, -14, 0] },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: [0.42, 0, 0.58, 1],
  },
} as any;

// Interactive Journey Curve coordinates with rich cybersecurity specs
const journeyPoints = [
  {
    x: 35,
    y: 250,
    year: "2022",
    label: "BASICS & SAFETY",
    desc: "Foundations of C++, Python, and secure code layout. Built base algorithms with rigorous memory boundaries.",
    status: "NOMINAL",
    integrity: "99.8%",
    port: "80",
    address: "0x7FFF10",
    details: ["Memory safety check: PASS", "Buffer overflow guard: ACTIVE", "Algorithm validation: 100%"]
  },
  {
    x: 215,
    y: 195,
    year: "2023",
    label: "FULL-STACK SECURITY",
    desc: "React, Node.js, FastAPI. Engineered secure database channels, encrypted credential storage, and session auth models.",
    status: "SECURED",
    integrity: "99.9%",
    port: "8080",
    address: "0x7FFF3C",
    details: ["SSL/TLS Handshake: VERIFIED", "Token auth validation: JWT", "SQL injection sanitization: ENABLED"]
  },
  {
    x: 395,
    y: 150,
    year: "2024",
    label: "COGNITIVE AI HARDENING",
    desc: "Applied GenAI engineering. Designed OpenAI API gateways, secure local LLM prompt filters, and model misuse protection protocols.",
    status: "COMPLIANT",
    integrity: "100%",
    port: "8443",
    address: "0x7FFF8A",
    details: ["Prompt injection filter: RUNNING", "Model output sanitization: PASS", "API rate limiting: ENFORCED"]
  },
  {
    x: 575,
    y: 95,
    year: "2025",
    label: "ADVANCED SECURE DEV",
    desc: "Ethical hacking, API hardening, threat modeling, OWASP top 10 compliance audits. Signed and encrypted production payloads.",
    status: "ARMORED",
    integrity: "100%",
    port: "3000",
    address: "0x8EAF9F",
    details: ["Vulnerability scans: 0 VULNS", "Threat model verification: NOMINAL", "Encryption standard: AES-GCM-256"]
  },
  {
    x: 765,
    y: 35,
    year: "2026",
    label: "ENTERPRISE & INTERNSHIP",
    desc: "B.Tech CSE completion and Software Engineering Internship at Frigoglass. Optimized build setups, engineered dynamic dashboards, and developed real-time telemetry systems.",
    status: "PRO_READY",
    integrity: "100%",
    port: "443",
    address: "0x9FDF2A",
    details: ["Production release: DEPLOYED", "Real-time telemetry: RUNNING", "Enterprise framework integration: PASS"]
  }
];

// Rolling Counter component
function RollingCounter({ value, duration = 1.2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const isNumeric = /^\d+/.test(value);
  const target = isNumeric ? parseInt(value.match(/^\d+/)![0]) : 0;
  const suffix = isNumeric ? value.replace(/^\d+/, "") : value;

  useEffect(() => {
    if (!isNumeric) return;
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMilliseconds = duration * 1000;
    const stepTime = Math.max(15, Math.floor(totalMilliseconds / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, target, isNumeric]);

  if (!isNumeric) return <span>{value}</span>;
  return <span>{count}{suffix}</span>;
}

export default function Home() {
  const isMobile = useIsMobile();
  const { content } = useContentStore();
  const { profile, hero, about, socialLinks } = content;

  // State to track custom interactivity
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [hoveredJourneyNode, setHoveredJourneyNode] = useState<number | null>(null);
  const [activeNode, setActiveNode] = useState(4);

  const getSocialUrl = (platform: string, fallback: string) => {
    const link = socialLinks.find(s => s.platform.toLowerCase() === platform.toLowerCase());
    return link ? link.url : fallback;
  };

  return (
    <PageTransition>
      <section className="relative overflow-hidden min-h-screen">
        {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0 -z-10 bg-background" />
        {/* Repeating Cyber Blueprint Grid Pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="homeGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#homeGridPattern)" />
          </svg>
        </div>
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
          <ParticleField particleCount={isAvatarHovered ? 140 : 80} interactive />
        </div>
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[80px] md:blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-zinc-300/20 dark:bg-zinc-800/15 rounded-full blur-[80px] md:blur-[160px] pointer-events-none" />

        <div className="container-custom px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-40">

          {/* ================= HERO ================= */}
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-32">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {hero.statusBadge || "Open to Internships & Full-Time Roles"}
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">
                <TextReveal text={hero.headline || "Building "} as="span" splitBy="word" delay={0.1} />
                {" "}
                <TextReveal text={hero.highlightedText || "Scalable Software"} as="span" className="gradient-text" splitBy="word" delay={0.3} />
                <br />
                <TextReveal text={hero.subheadline || "& Intelligent Systems"} as="span" splitBy="word" delay={0.6} />
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {profile.bio[0] || "Computer Science Engineer focused on full-stack development, backend systems, GenAI, and security-aware engineering."}
              </p>

              <p className="text-muted-foreground max-w-xl mb-10">
                {profile.bio[1] || "I believe in writing code that survives production, scales with users, and solves real problems — not just demos."}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <MagneticButton variant="primary" size="lg" href="/projects" icon={<ArrowRight className="h-4 w-4" />}>
                  View Projects
                </MagneticButton>

                <MagneticButton
                  variant="outline"
                  size="lg"
                  href={profile.resumeUrl}
                  icon={<Download className="h-4 w-4" />}
                >
                  Resume
                </MagneticButton>

                <MagneticButton
                  variant="ghost"
                  size="lg"
                  href="/contact"
                  icon={<Mail className="h-4 w-4" />}
                >
                  Contact
                </MagneticButton>
              </div>
            </motion.div>

            {/* ================= RIGHT AVATAR ================= */}
            <div 
              onMouseEnter={() => setIsAvatarHovered(true)} 
              onMouseLeave={() => setIsAvatarHovered(false)}
              className="relative flex items-center justify-center cursor-default group"
            >
              <motion.div
                {...floatAvatar}
                className="relative flex items-center justify-center"
              >
                {/* OUTER ROTATING AURA */}
                <motion.div
                  animate={isMobile ? {} : { rotate: 360 }}
                  transition={{ duration: isAvatarHovered ? 8 : 18, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <div className="w-72 h-72 rounded-full 
                    bg-gradient-to-r from-primary via-zinc-400 to-zinc-600
                    blur-xl md:blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  />
                </motion.div>

                {/* PULSE RING */}
                <motion.div
                  animate={{ scale: isAvatarHovered ? [1.1, 1.25, 1.1] : [1, 1.12, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute"
                >
                  <div className="w-60 h-60 rounded-full 
                    border border-primary/50 
                    shadow-[0_0_40px_-10px_hsl(var(--primary))] md:shadow-[0_0_120px_-20px_hsl(var(--primary))]"
                  />
                </motion.div>

                {/* DASHED ROTATING RING */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: isAvatarHovered ? 12 : 30, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <div className="w-64 h-64 rounded-full border border-dashed border-primary/30" />
                </motion.div>

                {/* AVATAR CORE — Dynamic Cybersecurity Target */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex flex-col items-center justify-center
                    w-44 h-44 rounded-full overflow-hidden
                    bg-card/40 dark:bg-black/40 backdrop-blur-xl
                    border border-primary/20 dark:border-primary/15
                    shadow-[0_0_30px_-8px_rgba(99,102,241,0.6)] md:shadow-[0_0_80px_-10px_rgba(99,102,241,0.7)]"
                >
                  {/* Sonar sweep overlay */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none rounded-full"
                  >
                    <div className="w-full h-full origin-center bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
                  </motion.div>



                  {/* BLINKING EMOJI */}
                  <motion.div className="text-[4.5rem] relative z-10">
                    <span className="text-[4.5rem] select-none transition-transform duration-300 transform group-hover:scale-110 block">
                      🧔🏻
                    </span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.85] }}
                    transition={{ delay: 1.2 }}
                    className="text-xs text-muted-foreground mt-1 relative z-10 font-mono"
                  >
                    {isAvatarHovered ? "SYS_ACTIVE" : "Hi, I’m Nitin"}
                  </motion.p>
                </motion.div>

                {/* Floating Telemetry readout HUD tags on hover */}
                <AnimatePresence>
                  {isAvatarHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 pointer-events-none z-20"
                    >
                      <div className="absolute top-0 -left-12 text-[8px] font-mono text-primary bg-zinc-950/90 dark:bg-black/90 px-2 py-0.5 rounded border border-primary/20 shadow-lg">
                        SYS_STATUS: ACTIVE
                      </div>
                      <div className="absolute bottom-4 -right-16 text-[8px] font-mono text-cyan-400 bg-zinc-950/90 dark:bg-black/90 px-2 py-0.5 rounded border border-cyan-400/20 shadow-lg">
                        SEC_LEVEL: LVL_5
                      </div>
                      <div className="absolute -bottom-6 left-6 text-[8px] font-mono text-violet-400 bg-zinc-950/90 dark:bg-black/90 px-2 py-0.5 rounded border border-violet-400/20 shadow-lg">
                        SCAN_FREQ: 110rpm
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* ================= ENGINEERING IDENTITY ================= */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 md:mb-32">
            {[
              {
                icon: Code,
                title: "Full-Stack Engineer",
                desc: "Architecting frontend + backend systems with clean, scalable design.",
                color: "violet" as const,
              },
              {
                icon: Brain,
                title: "AI / GenAI Builder",
                desc: "LLMs, OpenAI APIs, Whisper, LangChain & applied AI systems.",
                color: "cyan" as const,
              },
              {
                icon: Shield,
                title: "Security-Aware Developer",
                desc: "Ethical hacking basics, secure APIs & threat-aware design.",
                color: "amber" as const,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="h-full"
              >
                <GlowCard glowColor={item.color} enableTilt className="p-10 h-full flex flex-col justify-start group">
                  <div className="group-hover:scale-110 group-hover:translate-x-2 transition-transform duration-300 w-fit">
                    <item.icon className="h-10 w-10 text-primary mb-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.desc}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* ================= ENGINEERING PHILOSOPHY ================= */}
          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="group max-w-4xl mx-auto mb-20 md:mb-32 h-full"
          >
            <GlowCard glowColor="violet" enableTilt className="p-12 relative overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary/30" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary/30" />

              <h2
                className="
                  text-2xl font-bold mb-6 text-center
                  transition-all duration-500
                  group-hover:text-primary
                  group-hover:tracking-wide
                "
              >
                Engineering Philosophy
              </h2>

              <p
                className="
                  text-muted-foreground leading-relaxed text-center
                  transition-colors duration-500
                  group-hover:text-primary/95
                "
              >
                {about.philosophy || "I approach software engineering as a problem-solving discipline. My focus is on clarity, scalability, and long-term maintainability. I value clean architecture, thoughtful trade-offs, and continuous learning over shortcuts and hype."}
              </p>
            </GlowCard>
          </motion.div>

          {/* ================= JOURNEY HUD DASHBOARD ================= */}
          <div className="max-w-6xl mx-auto mb-20 md:mb-32">
            <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
              My Engineering Growth Journey
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Console: The SVG HUD Radar Grid (Col 7/12) */}
              <div className="lg:col-span-7 bg-card/40 dark:bg-black/40 border border-border/30 dark:border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                {/* Cyber Brackets overlay */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

                <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/60 select-none uppercase tracking-widest pb-3 border-b border-border/30 dark:border-white/5">
                  <span>HUD: SYSTEMS_GROWTH_SURFACE</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    SECTOR_ACTIVE
                  </span>
                </div>

                <div className="relative flex-1 flex items-center justify-center my-4 overflow-visible">
                  <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible">
                    {/* Horizontal grid guide lines */}
                    {[50, 100, 150, 200, 250].map((yVal) => (
                      <line
                        key={yVal}
                        x1="20"
                        y1={yVal}
                        x2="780"
                        y2={yVal}
                        stroke="currentColor"
                        className="text-primary/10"
                        strokeWidth="0.8"
                        strokeDasharray="2 4"
                      />
                    ))}

                    {/* Vertical guidelines */}
                    {journeyPoints.map((p) => (
                      <line
                        key={p.year}
                        x1={p.x}
                        y1="30"
                        x2={p.x}
                        y2="280"
                        stroke="currentColor"
                        className="text-primary/10"
                        strokeWidth="0.8"
                        strokeDasharray="2 4"
                      />
                    ))}

                    {/* Main bezier curve line (Digital Silver Laser) */}
                    <motion.path
                      d="M35 250 C150 220, 280 180, 395 150 C510 120, 630 75, 765 35"
                      fill="none"
                      stroke="url(#grad)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    />

                    {/* Neon pulse tracer line */}
                    <motion.path
                      d="M35 250 C150 220, 280 180, 395 150 C510 120, 630 75, 765 35"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="40 180"
                      animate={{ strokeDashoffset: [-220, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="opacity-75 blur-[0.5px]"
                    />

                    {/* Glowing Laser Traveler with Sonar Ripple */}
                    <g>
                      {/* Outer pulse ring */}
                      <circle r="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2 3">
                        <animateMotion
                          dur="6s"
                          repeatCount="indefinite"
                          path="M35 250 C150 220, 280 180, 395 150 C510 120, 630 75, 765 35"
                        />
                      </circle>
                      {/* Core laser point */}
                      <circle r="4.5" fill="hsl(var(--primary))" className="shadow-[0_0_12px_hsl(var(--primary))]">
                        <animateMotion
                          dur="6s"
                          repeatCount="indefinite"
                          path="M35 250 C150 220, 280 180, 395 150 C510 120, 630 75, 765 35"
                        />
                      </circle>
                    </g>

                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="hsl(var(--foreground))" />
                      </linearGradient>
                    </defs>

                    {/* Interactive targeting nodes */}
                    {journeyPoints.map((p, i) => {
                      const isSelected = activeNode === i;
                      const isHovered = hoveredJourneyNode === i;
                      const isTargeted = isSelected || isHovered;

                      return (
                        <g key={i} className="cursor-pointer" onClick={() => setActiveNode(i)}>
                          {/* Cybersecurity HUD Targeting Crosshair plus sign */}
                          <line x1={p.x - 6} y1={p.y} x2={p.x + 6} y2={p.y} stroke="hsl(var(--primary))" strokeWidth="1" className="transition-all duration-300 pointer-events-none" />
                          <line x1={p.x} y1={p.y - 6} x2={p.x} y2={p.y + 6} stroke="hsl(var(--primary))" strokeWidth="1" className="transition-all duration-300 pointer-events-none" />
                          
                          {/* Animated Radar/Sonar Target Rings */}
                          {isTargeted && (
                            <>
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r={14}
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="0.8"
                                strokeDasharray="3 3"
                                className="animate-spin-slow pointer-events-none"
                              />
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r={22}
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="0.5"
                                opacity="0.3"
                                className="animate-ping pointer-events-none"
                              />
                            </>
                          )}
                          
                          {/* Core node dot */}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={isTargeted ? 5 : 3.5}
                            fill={isTargeted ? "hsl(var(--background))" : "hsl(var(--primary))"}
                            className="transition-all duration-300 pointer-events-none"
                          />
                          
                          {/* Hover bounds */}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={24}
                            fill="transparent"
                            onMouseEnter={() => setHoveredJourneyNode(i)}
                            onMouseLeave={() => setHoveredJourneyNode(null)}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="flex justify-between text-[9px] font-mono text-muted-foreground/50 border-t border-border/30 dark:border-white/5 pt-3 select-none">
                  {journeyPoints.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveNode(i)}
                      className={`hover:text-primary transition-colors ${activeNode === i ? 'text-primary font-bold' : ''}`}
                    >
                      {p.year} // {p.status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Console: Operations Telemetry & Diagnostics (Col 5/12) */}
              <div className="lg:col-span-5 flex flex-col">
                <GlowCard
                  glowColor="violet"
                  enableTilt={false}
                  className="p-6 relative overflow-hidden flex-1 flex flex-col justify-between"
                >
                  {/* Cyber grid overlays */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

                  {/* Header */}
                  <div className="border-b border-border/30 dark:border-white/5 pb-4 mb-4 select-none">
                    <div className="flex justify-between items-center text-[8px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1.5">
                      <span>PROCESSOR: NITIN_CORE_JOURNEY</span>
                      <span>ADDR: {journeyPoints[hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode].address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                        <span className="text-primary">//</span>
                        {journeyPoints[hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode].label}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono border border-primary/30 text-primary bg-primary/5 animate-pulse font-semibold">
                        {journeyPoints[hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode].status}
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic details */}
                  <div className="flex-1 space-y-4">
                    <div className="p-3 bg-card/50 dark:bg-black/40 border border-border/30 dark:border-white/5 rounded-xl font-mono text-[11px] leading-relaxed text-foreground/80">
                      <div className="text-[9px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 select-none">// SYSTEM COMPILER spec logs</div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="min-h-[80px]"
                        >
                          {journeyPoints[hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode].desc}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/30 dark:bg-black/20 border border-border/30 dark:border-white/5 rounded-xl font-mono text-center">
                        <div className="text-[8px] text-muted-foreground/60 uppercase mb-0.5 select-none">NODE INTEGRITY</div>
                        <div className="text-sm font-bold text-emerald-500 dark:text-emerald-400">
                          {journeyPoints[hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode].integrity}
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-black/20 border border-border/30 dark:border-white/5 rounded-xl font-mono text-center">
                        <div className="text-[8px] text-muted-foreground/60 uppercase mb-0.5 select-none">PORT CONNECTION</div>
                        <div className="text-sm font-bold text-primary">
                          {journeyPoints[hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode].port}/TCP
                        </div>
                      </div>
                    </div>

                    {/* Operational Checklists */}
                    <div className="space-y-1.5">
                      <div className="text-[8px] font-mono text-muted-foreground/60 uppercase tracking-wider select-none mb-2">// INTELLIGENCE READOUT</div>
                      {journeyPoints[hoveredJourneyNode !== null ? hoveredJourneyNode : activeNode].details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer selector (For Mobile Tapping) */}
                  <div className="mt-6 border-t border-border/30 dark:border-white/5 pt-4 flex gap-2 justify-between">
                    {journeyPoints.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveNode(idx)}
                        className={`flex-1 py-1.5 text-center font-mono text-[10px] rounded transition-all border ${
                          activeNode === idx
                            ? 'bg-primary/10 text-primary border-primary/30 font-bold'
                            : 'bg-transparent text-muted-foreground border-border/30 hover:border-border dark:border-white/5 dark:hover:border-white/20'
                        }`}
                      >
                        {p.year}
                      </button>
                    ))}
                  </div>
                </GlowCard>
              </div>

            </div>
          </div>



          {/* ================= CINEMATIC DIAGNOSTIC HUD STATS ================= */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 md:mb-32">
            
            {/* Card 1: Production Modules HUD (6+ Projects) */}
            <GlowCard glowColor="violet" enableTilt className="p-6 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
              {/* Cyber Brackets overlay */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

              {/* Active vector sweep scanner line */}
              <motion.div
                className="absolute inset-x-0 h-[1.5px] bg-primary/10 pointer-events-none"
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Top HUD Header */}
              <div className="flex justify-between items-center border-b border-border/30 dark:border-white/5 pb-3">
                <span className="font-mono text-[9px] text-muted-foreground/60 tracking-wider">SYS_ENG_PRD_01</span>
                <div className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-500 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SYS_OK // PRD</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="my-4 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground/50 select-none">// STABLE ARCHITECTURES</span>
                    <div className="text-4xl font-mono font-bold tracking-tight text-foreground flex items-baseline gap-1 mt-1">
                      <RollingCounter value="6" />
                      <span className="text-xl text-primary font-semibold font-sans">+</span>
                    </div>
                  </div>
                  <motion.div
                    animate={isMobile ? {} : { rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-primary"
                  >
                    <Code className="h-5 w-5" />
                  </motion.div>
                </div>

                {/* Simulated build console */}
                <div className="mt-4 p-3 bg-black/40 dark:bg-black/60 border border-border/30 dark:border-white/5 rounded-xl font-mono text-[10px] space-y-1 text-muted-foreground">
                  <div className="flex items-center justify-between text-[8px] text-muted-foreground/40 border-b border-border/20 dark:border-white/5 pb-1 mb-1.5 select-none">
                    <span>CONSOLE READOUT</span>
                    <span>TTY_01</span>
                  </div>
                  <div className="text-emerald-400/90 font-semibold select-none flex items-center gap-1">
                    <span className="text-primary font-bold">{">"}</span> npm run build:prod
                  </div>
                  <div className="text-foreground/75 truncate select-none">✔ Compiled 6 core modules.</div>
                  <div className="text-foreground/55 truncate select-none">⚡ Deploying telemetry artifacts...</div>
                  <div className="flex items-center gap-1 select-none">
                    <span className="text-primary/70">{">"}</span>
                    <span className="w-1.5 h-3 bg-primary animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[8px] text-muted-foreground/70 uppercase">
                  <span>Deployment status</span>
                  <span>100% active</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 dark:bg-zinc-950/60 rounded-full overflow-hidden border border-border/20 dark:border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-neutral-400 dark:to-neutral-500 rounded-full"
                  />
                </div>
              </div>
            </GlowCard>

            {/* Card 2: Enterprise Stack Core (Full-Stack) */}
            <GlowCard glowColor="cyan" enableTilt className="p-6 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
              {/* Cyber Brackets overlay */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

              {/* Active vector sweep scanner line */}
              <motion.div
                className="absolute inset-x-0 h-[1.5px] bg-primary/10 pointer-events-none"
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Top HUD Header */}
              <div className="flex justify-between items-center border-b border-border/30 dark:border-white/5 pb-3">
                <span className="font-mono text-[9px] text-muted-foreground/60 tracking-wider">SYS_ENG_FST_02</span>
                <div className="flex items-center gap-1.5 font-mono text-[8px] text-cyan-400 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>TUNNEL_SECURE // AES</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="my-4 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground/50 select-none">// ARCHITECTURE LAYER</span>
                    <div className="text-3xl font-mono font-bold tracking-tight text-foreground mt-1">
                      FULL-STACK
                    </div>
                  </div>
                  <motion.div
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-primary"
                  >
                    <Layers className="h-5 w-5" />
                  </motion.div>
                </div>

                {/* Double Node Node flow simulation */}
                <div className="mt-4 p-3 bg-black/40 dark:bg-black/60 border border-border/30 dark:border-white/5 rounded-xl font-mono text-[10px] flex items-center justify-between">
                  <div className="flex flex-col items-center justify-center p-1.5 bg-primary/5 border border-primary/20 rounded-md w-[45%] text-center">
                    <span className="text-[8px] text-muted-foreground/50 select-none">FRONTEND</span>
                    <span className="text-foreground/90 font-bold font-mono">React/Next</span>
                    <span className="text-[7px] text-emerald-400 mt-0.5 select-none">ACTIVE</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative px-2">
                    <div className="h-[1px] w-full bg-primary/20 relative">
                      <motion.div
                        animate={{ left: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-2px] w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1.5 bg-primary/5 border border-primary/20 rounded-md w-[45%] text-center">
                    <span className="text-[8px] text-muted-foreground/50 select-none">BACKEND</span>
                    <span className="text-foreground/90 font-bold font-mono">Node/FastAPI</span>
                    <span className="text-[7px] text-emerald-400 mt-0.5 select-none">ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Double health metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-[9px]">
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[7px] text-muted-foreground/60 uppercase">
                    <span>REST / GraphQL</span>
                    <span>99% UP</span>
                  </div>
                  <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-primary" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[7px] text-muted-foreground/60 uppercase">
                    <span>DB QUERY TIME</span>
                    <span>45ms</span>
                  </div>
                  <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-primary" />
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Card 3: Computational Core (DSA & Fundamentals) */}
            <GlowCard glowColor="amber" enableTilt className="p-6 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
              {/* Cyber Brackets overlay */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

              {/* Active vector sweep scanner line */}
              <motion.div
                className="absolute inset-x-0 h-[1.5px] bg-primary/10 pointer-events-none"
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Top HUD Header */}
              <div className="flex justify-between items-center border-b border-border/30 dark:border-white/5 pb-3">
                <span className="font-mono text-[9px] text-muted-foreground/60 tracking-wider">SYS_ENG_DSA_03</span>
                <div className="flex items-center gap-1.5 font-mono text-[8px] text-amber-500 dark:text-amber-400 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                  <span>CORE_NOMINAL // COMP</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="my-4 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-muted-foreground/50 select-none">// COMPILATION COMPLEXITY</span>
                    <div className="text-3xl font-mono font-bold tracking-tight text-foreground mt-1 flex items-baseline gap-1">
                      O(log N)
                    </div>
                  </div>
                  <motion.div
                    animate={isMobile ? {} : { scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-primary"
                  >
                    <Cpu className="h-5 w-5" />
                  </motion.div>
                </div>

                {/* Simulated live matrix / memory allocation nodes */}
                <div className="mt-4 p-3 bg-black/40 dark:bg-black/60 border border-border/30 dark:border-white/5 rounded-xl font-mono text-[10px] flex flex-col justify-between">
                  <div className="flex justify-between text-[8px] text-muted-foreground/40 border-b border-border/20 dark:border-white/5 pb-1 mb-2 select-none">
                    <span>MEMORY ALLOC LOGS</span>
                    <span>HEAP_OK</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5 justify-items-center select-none">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const colors = ["bg-primary/20", "bg-primary/40", "bg-primary", "bg-primary/60"];
                      return (
                        <motion.div
                          key={idx}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.2 + (idx % 3) * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.08,
                          }}
                          className={`h-2.5 w-2.5 rounded-sm border border-primary/10 ${colors[idx % colors.length]}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center text-[7px] text-muted-foreground/60 mt-2 select-none font-mono">
                    <span>SPACE: O(1)</span>
                    <span>TIME: OPTIMAL</span>
                  </div>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[8px] text-muted-foreground/70 uppercase">
                  <span>Fundamentals verification</span>
                  <span>100% verified</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 dark:bg-zinc-950/60 rounded-full overflow-hidden border border-border/20 dark:border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-neutral-400 dark:to-neutral-500 rounded-full"
                  />
                </div>
              </div>
            </GlowCard>

          </div>

          {/* ================= SOCIAL ================= */}
          <div className="flex justify-center gap-6">
            {[
              { icon: Github, key: 'github', fallback: 'https://github.com/Nydv01' },
              { icon: Linkedin, key: 'linkedin', fallback: 'https://linkedin.com/in/ydv-nitin' },
              { icon: Mail, key: 'mail', fallback: 'mailto:ydv.nitin2401@gmail.com' }
            ].map((social, i) => {
              const Icon = social.icon;
              const linkUrl = social.key === 'mail' 
                ? `mailto:${profile.email}` 
                : getSocialUrl(social.key, social.fallback);

              return (
                <a
                  key={i}
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all hover:scale-125"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
