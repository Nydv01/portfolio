import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Rocket,
  Layers,
  Code2,
  Shield,
  Zap,
  Database,
  Brain,
  Terminal,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import GlowCard from "@/components/effects/GlowCard";

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

// Silver Matrix Code Rain Visual Component
function MatrixRain({ opacity = 0.08 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial width and height for animation bounds
    const parent = canvas.parentElement;
    const w = parent ? parent.getBoundingClientRect().width : window.innerWidth;
    const h = parent ? parent.getBoundingClientRect().height : window.innerHeight;
    const fontSize = 10;
    const columns = Math.floor(w / fontSize) + 1;
    const yPositions = Array(columns).fill(0).map(() => Math.random() * -h);

    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const parentRect = parent?.getBoundingClientRect();
      const cw = parentRect?.width || w;
      const ch = parentRect?.height || h;

      if (isDark) {
        // Dark mode: classic black-fade background, white/green chars
        ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = "#ffffff";
      } else {
        // Light mode: transparent clearing so glass card shows through
        ctx.fillStyle = "rgba(245, 245, 247, 0.12)";
        ctx.fillRect(0, 0, cw, ch);
        ctx.fillStyle = "#1d1d1f";
      }

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < yPositions.length; i++) {
        const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
        const x = i * fontSize;
        const y = yPositions[i];

        ctx.globalAlpha = isDark ? opacity : opacity * 0.6;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1.0;

        if (y > ch + Math.random() * 1000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + 8;
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [opacity]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />;
}


const getExperienceIcon = (iconName?: string) => {
  const IconComponent = (LucideIcons as any)[iconName || "Rocket"];
  if (IconComponent) return IconComponent;
  if (iconName === "Rocket") return Rocket;
  if (iconName === "Layers") return Layers;
  if (iconName === "Code2") return Code2;
  if (iconName === "Database") return Database;
  if (iconName === "Shield") return Shield;
  if (iconName === "Zap") return Zap;
  return Rocket;
};

const nodeData = [
  { 
    x: 0, 
    y: 230, 
    label: "Foundations", 
    details: "C++, Python, basic DSA, core system basics", 
    level: "Beginner",
    logs: [
      "[SYSTEM] Loading FOUNDATIONS matrix...",
      "[DSA] Array, Stack, Queue allocations verified.",
      "[COMPILER] G++ compilation completed in 42ms.",
      "[PYTHON] Virtualenv setup: NOMINAL.",
      "[INTEGRITY] Base software logic check: PASS.",
    ]
  },
  { 
    x: 150, 
    y: 170, 
    label: "Backend", 
    details: "Node.js, FastAPI, REST APIs, database schemas", 
    level: "Intermediate",
    logs: [
      "[SYSTEM] Routing BACKEND network maps...",
      "[HTTP] FastAPI routing tables mapped: /api/v1/user",
      "[DB] Supabase database transaction log check: SUCCESS",
      "[CACHE] Redis key-value cache latency: 1.2ms [OPTIMAL]",
      "[SEC] SSL handshake TLSv1.3 established.",
    ]
  },
  { 
    x: 260, 
    y: 120, 
    label: "Full-Stack", 
    details: "React, Tailwind, Supabase, end-to-end setups", 
    level: "Advanced",
    logs: [
      "[SYSTEM] Rendering FULL-STACK component nodes...",
      "[DOM] React virtual tree reconciler loaded.",
      "[CSS] Tailwind utility layers compiled: 412 rules.",
      "[SYNC] Zustand stores binded and synced with client state.",
      "[DEPLOY] Vercel edge runtime handshake verified.",
    ]
  },
  { 
    x: 380, 
    y: 80, 
    label: "AI / GenAI", 
    details: "OpenAI, Whisper, LLM engineering, prompts", 
    level: "Specialist",
    logs: [
      "[SYSTEM] Initializing COGNITIVE AI modules...",
      "[API] OpenAI GPT-4o model endpoint responding.",
      "[TOKEN] Target prompt density: 84% [MAX_EFFICIENCY]",
      "[SPEECH] Whisper audio transcription pipeline: ONLINE.",
      "[AGENT] Autonomous feedback loops activated.",
    ]
  },
  { 
    x: 520, 
    y: 25, 
    label: "Production", 
    details: "Security audits, optimized APIs, scale testing", 
    level: "Expert",
    logs: [
      "[SYSTEM] Executing PRODUCTION hardening scripts...",
      "[AUDIT] OWASP Top 10 vulnerabilities scanning: 0 breaches.",
      "[LOAD] Stress test simulator capacity: 10,000 req/sec.",
      "[CDN] Cloudflare edge caches routing correctly.",
      "[STATUS] Nitin's portfolio matrix fully operational.",
    ]
  },
];

export default function Experience() {
  const { content } = useContentStore();
  const { timeline } = content;
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  const [graphHover, setGraphHover] = useState({ x: 0, y: 0, active: false });
  const graphRef = useRef<SVGSVGElement>(null);

  // Selector state for interactive experiences timeline dashboard
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const activeLogsRef = useRef<HTMLDivElement>(null);

  const sortedExperiences = [...timeline].sort((a, b) => a.order - b.order);
  const activeExp = sortedExperiences[activeExpIndex] || sortedExperiences[0];

  const handleGraphMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!graphRef.current) return;
    const rect = graphRef.current.getBoundingClientRect();
    const scaleX = 520 / rect.width;
    const scaleY = 300 / rect.height;
    setGraphHover({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      active: true,
    });
  };

  useEffect(() => {
    const activeLogsPool = hoveredNode !== null 
      ? nodeData[hoveredNode].logs 
      : [
          "[SYSTEM] Telemetry link active.",
          "[DIAG] Probing X-Y coordinate grids...",
          "[INFO] System ready. Hover over nodes to review milestones.",
        ];
    
    setConsoleLogs([activeLogsPool[0]]);
    let line = 1;
    const interval = setInterval(() => {
      if (line < activeLogsPool.length) {
        setConsoleLogs(prev => [...prev, activeLogsPool[line]]);
        line++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [hoveredNode]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Handle logging typewriter effect for selected active experience card
  useEffect(() => {
    if (!activeExp) return;
    const logPool = [
      `[SYS] ESTABLISHING CONNECTION TO EXP_${activeExpIndex}...`,
      `[DIAG] Retrieving security cleared logs...`,
      `[ROLE] Active Title: ${activeExp.title}`,
      `[ORG] Institution: ${activeExp.institution || "N/A"}`,
      `[DATE] Period: ${activeExp.year}`,
      `[LOAD] Fetching database metrics...`,
      `[DIAG] Compile status: SECURE`,
      `[INFO] ${activeExp.description.substring(0, 48)}...`,
      `[LINK] Synchronized system handshake established.`,
    ];

    setActiveLogs([logPool[0]]);
    let currentLine = 1;
    const interval = setInterval(() => {
      if (currentLine < logPool.length) {
        setActiveLogs(prev => [...prev, logPool[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 90);
    return () => clearInterval(interval);
  }, [activeExpIndex, activeExp]);

  useEffect(() => {
    if (activeLogsRef.current) {
      activeLogsRef.current.scrollTop = activeLogsRef.current.scrollHeight;
    }
  }, [activeLogs]);

  return (
    <PageTransition>
      <section className="section-padding">
        <div className="container-custom">

          <SectionHeading
            title="Experience & Practical Learning"
            subtitle="Engineering growth built through real projects, iteration, and hands-on execution"
          />

          {/* ================= EXPERIENCE OVERVIEW ================= */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: Brain,
                title: "Engineering Mindset",
                desc: "Thinking in systems, trade-offs, and scalability.",
                color: "violet" as const,
              },
              {
                icon: Rocket,
                title: "Execution Driven",
                desc: "Focused on shipping real, usable software.",
                color: "cyan" as const,
              },
              {
                icon: Layers,
                title: "Growth Focused",
                desc: "Learning by building, breaking, and improving.",
                color: "amber" as const,
              },
            ].map((item) => (
              <div key={item.title} className="h-full">
                <GlowCard glowColor={item.color} enableTilt className="text-center p-6 h-full flex flex-col items-center">
                  <item.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </GlowCard>
              </div>
            ))}
          </div>

          {/* ================= DUAL-PANE OPERATIONS TIMELINE CONSOLE ================= */}
          <div className="grid lg:grid-cols-12 gap-8 mb-28 relative items-start">
            {/* Left Column: Interactive Milestone Index Selector (Width 5/12) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-mono text-primary font-bold uppercase tracking-widest mb-6 block border-b border-border/30 dark:border-white/10 pb-2">
                // System Milestones Selector
              </h3>
              
              <div className="relative border-l border-border/30 dark:border-white/10 pl-6 space-y-6 ml-2">
                {sortedExperiences.map((exp, idx) => {
                  const isSelected = activeExpIndex === idx;
                  const Icon = getExperienceIcon(exp.icon);
                  return (
                    <motion.div
                      key={exp.id}
                      className="relative group cursor-pointer"
                      onClick={() => setActiveExpIndex(idx)}
                      whileHover={{ x: 6 }}
                    >
                      {/* Connection node point */}
                      <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center bg-card dark:bg-black ${
                        isSelected 
                          ? "border-primary shadow-[0_0_12px_hsl(var(--primary))] scale-125" 
                          : "border-border/40 dark:border-white/20 group-hover:border-primary/50"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isSelected ? "bg-primary" : "bg-muted/45 dark:bg-white/20 group-hover:bg-primary/50"
                        }`} />
                      </div>
                      
                      <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                        isSelected 
                          ? "bg-primary/5 border-primary/40 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]" 
                          : "bg-card dark:bg-white/[0.02] border-border/30 dark:border-white/5 hover:border-border/60 dark:hover:border-white/15"
                      }`}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected ? "bg-primary/20 text-primary" : "bg-muted dark:bg-white/5 text-muted-foreground"
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-muted-foreground/60">{exp.year}</span>
                              <h4 className={`text-sm font-semibold transition-colors duration-200 ${
                                isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                              }`}>
                                {exp.title}
                              </h4>
                            </div>
                          </div>
                          
                          <span className="text-[8px] font-mono text-muted-foreground/35 uppercase select-none tracking-widest hidden sm:inline">
                            {isSelected ? "LIVE_LINK" : "STANDBY"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Holographic Display Screen (Width 7/12) */}
            {activeExp && (
              <div className="lg:col-span-7 h-full">
                <GlowCard 
                  glowColor="violet" 
                  enableTilt={false} 
                  className="p-8 md:p-10 relative overflow-hidden min-h-[480px] flex flex-col justify-between"
                >
                  {/* Matrix Rain backdrop inside the display screen */}
                  <MatrixRain opacity={0.065} />
                  
                  {/* Cyber corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30" />
                  
                  <div className="relative z-10 space-y-6">
                    {/* Header bar */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/60 select-none uppercase tracking-wider border-b border-border/10 pb-3">
                      <span>System Display Console</span>
                      <span className="text-primary animate-pulse font-bold flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Active Node [0x{(activeExpIndex * 16 + 104).toString(16).toUpperCase()}]
                      </span>
                    </div>

                    {/* Content metadata */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-primary/80 font-bold block">// TENURE: {activeExp.year}</span>
                      <h2 className="text-2xl font-bold text-foreground leading-snug">
                        <GlitchText text={activeExp.title} />
                      </h2>
                      {activeExp.institution && (
                        <p className="text-sm font-semibold font-mono text-muted-foreground/80 flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary/70" />
                          {activeExp.institution}
                        </p>
                      )}
                    </div>

                    {/* Job Description */}
                    <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-xl">
                      {activeExp.description}
                    </p>

                    {activeExp.linkUrl && (
                      <div className="pb-2">
                        <a
                          href={activeExp.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-mono"
                        >
                          <LucideIcons.ExternalLink className="h-3.5 w-3.5" />
                          // VERIFY_CREDENTIAL
                        </a>
                      </div>
                    )}
                    
                    {/* Stylized Telemetry Metrics HUD */}
                    <div className="grid grid-cols-3 gap-4 border border-border/30 dark:border-white/5 bg-card/45 dark:bg-black/45 backdrop-blur-md p-4 rounded-xl font-mono text-[9px] text-muted-foreground select-none">
                      <div>
                        <div className="text-muted-foreground/60 mb-0.5">IMPACT FACTOR</div>
                        <div className="text-primary font-bold text-xs">{(90 + activeExpIndex * 2.3).toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground/60 mb-0.5">LOC ESTIMATE</div>
                        <div className="text-primary font-bold text-xs">{activeExpIndex % 2 === 0 ? "12,000+" : "8,500+"}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground/60 mb-0.5">SEC AUDIT</div>
                        <div className="text-emerald-500 font-bold text-xs">PASSED</div>
                      </div>
                    </div>
                  </div>

                  {/* Typing simulated compiler console at display bottom */}
                  <div className="relative z-10 mt-8">
                    <div className="text-[9px] font-mono text-muted-foreground/45 mb-1.5 select-none tracking-widest flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      // COMPILE PROCESS LOGS:
                    </div>
                    <div ref={activeLogsRef} className="p-3.5 rounded-xl bg-card/90 dark:bg-black/85 border border-primary/20 font-mono text-[9px] text-primary/85 h-28 overflow-y-auto flex flex-col gap-1.5 shadow-inner">
                      {activeLogs.map((log, idx) => (
                        <div key={idx} className="whitespace-pre-wrap select-none leading-relaxed">
                          <span className="text-white/30 mr-1.5">{">"}</span> {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </div>
            )}
          </div>

          {/* ================= PRACTICAL LEARNING GROWTH ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <GlowCard glowColor="violet" enableTilt={false} className="p-8 md:p-12 mb-20 relative overflow-visible">
              <h3 className="text-2xl font-semibold text-center mb-10 tracking-tight">
                Practical Learning Growth
              </h3>

              <div className="grid lg:grid-cols-12 gap-10 items-center">
                {/* Left Column: SVG Graph (Width 7/12) */}
                <div className="lg:col-span-7 relative h-[320px]">
                  {/* Y Axis Labels */}
                  <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-[10px] font-mono text-muted-foreground/60 select-none pointer-events-none">
                    <span>EXPERT</span>
                    <span>ADVANCED</span>
                    <span>INTERMEDIATE</span>
                    <span>BEGINNER</span>
                  </div>

                  {/* X Axis Labels */}
                  <div className="absolute left-16 right-0 bottom-0 flex justify-between text-[10px] font-mono text-muted-foreground/60 select-none pointer-events-none">
                    <span>FOUNDATIONS</span>
                    <span>BACKEND</span>
                    <span>FULL-STACK</span>
                    <span>AI / GENAI</span>
                    <span>PRODUCTION</span>
                  </div>

                  <svg
                    ref={graphRef}
                    viewBox="0 0 520 300"
                    onMouseMove={handleGraphMouseMove}
                    onMouseLeave={() => setGraphHover(prev => ({ ...prev, active: false }))}
                    className="absolute left-16 right-0 top-0 bottom-10 w-full h-full overflow-visible cursor-crosshair"
                  >
                    {/* Grid Lines */}
                    {[0, 1, 2, 3].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        x2="520"
                        y1={i * 75}
                        y2={i * 75}
                        stroke="hsl(var(--border))"
                        strokeOpacity="0.1"
                        strokeDasharray="2 4"
                      />
                    ))}

                    {/* Curve Path */}
                    <motion.path
                      d="
                        M 0 230
                        C 120 210, 160 170, 220 150
                        S 320 100, 360 85
                        S 450 40, 520 25
                      "
                      fill="none"
                      stroke="url(#curveGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />

                    {/* Dynamic Laser Traveler Point */}
                    <circle r="4.5" fill="hsl(var(--primary))" className="shadow-[0_0_12px_hsl(var(--primary))]">
                      <animateMotion
                        dur="5s"
                        repeatCount="indefinite"
                        path="M 0 230 C 120 210, 160 170, 220 150 S 320 100, 360 85 S 450 40, 520 25"
                      />
                    </circle>
                    <circle r="9" fill="hsl(var(--primary))" opacity="0.3" className="animate-ping">
                      <animateMotion
                        dur="5s"
                        repeatCount="indefinite"
                        path="M 0 230 C 120 210, 160 170, 220 150 S 320 100, 360 85 S 450 40, 520 25"
                      />
                    </circle>

                    {/* Real-time coordinates scanner and project tracking lines */}
                    <AnimatePresence>
                      {graphHover.active && (
                        <>
                          {/* Target scope vertical line */}
                          <motion.line
                            x1={graphHover.x}
                            x2={graphHover.x}
                            y1={0}
                            y2={300}
                            stroke="rgba(223, 181, 108, 0.25)"
                            strokeWidth="0.8"
                            strokeDasharray="2 3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                          {/* Target scope horizontal line */}
                          <motion.line
                            x1={0}
                            x2={520}
                            y1={graphHover.y}
                            y2={graphHover.y}
                            stroke="rgba(223, 181, 108, 0.25)"
                            strokeWidth="0.8"
                            strokeDasharray="2 3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                          {/* Target scope readout labels */}
                          <motion.g
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transform={`translate(${graphHover.x + 8}, ${graphHover.y - 18})`}
                          >
                            <rect
                              width="50"
                              height="22"
                              rx="3"
                              fill="rgba(0, 0, 0, 0.8)"
                              stroke="hsl(var(--primary))"
                              strokeWidth="0.5"
                            />
                            <text x="6" y="9" fill="hsl(var(--primary))" fontSize="6" fontFamily="monospace">
                              X: {graphHover.x.toFixed(0)} px
                            </text>
                            <text x="6" y="17" fill="hsl(var(--primary))" fontSize="6" fontFamily="monospace" fontWeight="bold">
                              Y: {((300 - graphHover.y) / 3).toFixed(1)}%
                            </text>
                          </motion.g>
                        </>
                      )}
                    </AnimatePresence>

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="50%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="#8c8e91" />
                      </linearGradient>
                    </defs>

                    {/* Dynamic Nodes with Scanning-Synchronized Pulses */}
                    {nodeData.map((p, i) => {
                      const isHovered = hoveredNode === i;
                      return (
                        <g key={i}>
                          {/* Sweep trigger pulse (Synchronized with 5s sweep) */}
                          <motion.circle
                            cx={p.x}
                            cy={p.y}
                            r={7}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth={1}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                              scale: [1, 2.2, 1],
                              opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              delay: 5 * (i / 4),
                              ease: "easeInOut",
                            }}
                            className="pointer-events-none"
                          />
                          {/* Hover bounds */}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={14}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredNode(i)}
                            onMouseLeave={() => setHoveredNode(null)}
                          />
                          {/* Node circle */}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={isHovered ? 6 : 4.5}
                            fill={isHovered ? "#fff" : "hsl(var(--primary))"}
                            className="transition-all duration-200 pointer-events-none"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Right Column: Systems Diagnostics Console (Width 5/12) */}
                <div className="lg:col-span-5 h-[320px] flex flex-col justify-between p-6 bg-card/40 dark:bg-black/40 border border-border/30 dark:border-white/5 rounded-2xl backdrop-blur-xl">
                  <div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/60 select-none uppercase tracking-wider mb-3 border-b border-border/10 pb-2">
                      <span>Telemetry Scanner</span>
                      <span className={hoveredNode !== null ? "text-primary animate-pulse font-bold" : "text-muted-foreground/40"}>
                        {hoveredNode !== null ? "SCANNING_ACTIVE" : "STANDBY"}
                      </span>
                    </div>

                    {hoveredNode !== null ? (
                      <div className="animate-fade-up">
                        <span className="text-[10px] font-mono text-primary font-semibold block mb-0.5">
                          // LEVEL: {nodeData[hoveredNode].level}
                        </span>
                        <h4 className="font-semibold text-base text-foreground mb-1 leading-snug">
                          <GlitchText text={nodeData[hoveredNode].label} />
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed select-none">
                          {nodeData[hoveredNode].details}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground/45 block mb-0.5">
                          // STATUS: IDLE
                        </span>
                        <h4 className="font-semibold text-base text-foreground mb-1 leading-snug">
                          Interactive Matrix Grid
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed select-none">
                          Hover over any graph node to inspect compiler parameters, framework logs, and practical learning milestones.
                        </p>
                      </div>
                    )}

                    {/* Morphing Oscilloscope frequency wave */}
                    <div className="h-10 w-full overflow-hidden relative opacity-70 mb-2 mt-4 bg-muted/50 dark:bg-black/50 rounded-xl border border-border/30 dark:border-white/5 flex items-center justify-center select-none">
                      <svg width="100%" height="40" className="text-primary absolute inset-0">
                        <motion.path
                          d="M 0 20 Q 20 20, 40 20 T 80 20 T 120 20 T 160 20 T 200 20 T 240 20 T 280 20 T 320 20 T 360 20 T 400 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          animate={hoveredNode !== null ? {
                            d: [
                              "M 0 20 Q 15 5, 30 35 T 60 5 T 90 35 T 120 5 T 150 35 T 180 5 T 210 35 T 240 5 T 270 35 T 300 20",
                              "M 0 20 Q 15 35, 30 5 T 60 35 T 90 5 T 120 35 T 150 5 T 180 35 T 210 5 T 240 35 T 270 5 T 300 20",
                              "M 0 20 Q 15 5, 30 35 T 60 5 T 90 35 T 120 5 T 150 35 T 180 5 T 210 35 T 240 5 T 270 35 T 300 20",
                            ]
                          } : {
                            d: [
                              "M 0 20 Q 15 18, 30 22 T 60 18 T 90 22 T 120 18 T 150 22 T 180 18 T 210 22 T 240 18 T 270 22 T 300 20",
                              "M 0 20 Q 15 22, 30 18 T 60 22 T 90 18 T 120 22 T 150 18 T 180 22 T 210 18 T 240 22 T 270 18 T 300 20",
                              "M 0 20 Q 15 18, 30 22 T 60 18 T 90 22 T 120 18 T 150 22 T 180 18 T 210 22 T 240 18 T 270 22 T 300 20",
                            ]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: hoveredNode !== null ? 0.8 : 2.2,
                            ease: "linear"
                          }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Scrollable logs */}
                  <div ref={consoleRef} className="p-3 rounded-xl bg-card/60 dark:bg-black/60 border border-border/30 dark:border-white/5 font-mono text-[9px] text-foreground/85 dark:text-zinc-300 h-24 overflow-y-auto flex flex-col gap-0.5 relative shadow-inner">
                    {consoleLogs.map((log, i) => (
                      <div key={i} className="whitespace-pre-wrap select-none leading-relaxed">
                        <span className="text-primary/70">{">"}</span> {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Holographic Tooltip */}
              <AnimatePresence>
                {hoveredNode !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 15 }}
                    className="absolute p-4 glass-card rounded-xl text-left max-w-xs z-30 pointer-events-none border border-primary/20 shadow-[0_0_30px_rgba(223,181,108,0.2)]"
                    style={{
                      left: `${(nodeData[hoveredNode].x / 520) * 78 + 10}%`,
                      top: `${(nodeData[hoveredNode].y / 300) * 55 - 40}px`,
                    }}
                  >
                    {/* Decorative Cyber Corners */}
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-primary" />

                    <span className="text-[10px] font-mono font-bold text-primary block mb-0.5">
                      // SCAN_LEVEL: {nodeData[hoveredNode].level}
                    </span>
                    <h4 className="font-bold text-sm mb-1 text-foreground">
                      <GlitchText text={nodeData[hoveredNode].label} />
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {nodeData[hoveredNode].details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto text-sm">
                This curve reflects my growth from programming foundations to building
                production-ready backend systems, AI-powered applications, and secure
                software architectures. Hover over the nodes to see key details.
              </p>
            </GlowCard>
          </motion.div>

          {/* ================= PHILOSOPHY ================= */}
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold mb-4">
              My Engineering Philosophy
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I believe strong engineering skills are built by solving real
              problems, understanding trade-offs, and continuously refining
              systems. Each project helps me think deeper, design better, and
              write cleaner code.
            </p>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
