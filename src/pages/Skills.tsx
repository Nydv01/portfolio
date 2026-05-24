import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Code2,
  Layout as LayoutIcon,
  Server,
  Database,
  Brain,
  Wrench,
  Shield,
  CheckCircle,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Search,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import GlowCard from "@/components/effects/GlowCard";
import MagneticButton from "@/components/effects/MagneticButton";

const strengths = [
  { text: "Strong DSA & problem-solving mindset", latency: "6ms", integrity: "100%" },
  { text: "End-to-end project ownership", latency: "12ms", integrity: "99.8%" },
  { text: "Clean, scalable system design", latency: "8ms", integrity: "100%" },
  { text: "API-first backend architecture", latency: "10ms", integrity: "99.9%" },
  { text: "Fast learner with production focus", latency: "4ms", integrity: "100%" },
];

// Tech stack meta definitions for interactive database panel
const techDetailsMap: Record<string, { desc: string; dept: string; status: string; integration: string }> = {
  "C++": {
    desc: "Low-level system programming, high-performance computing, data structures, and optimized thread routing.",
    dept: "Systems Core",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Python": {
    desc: "AI/ML agent scripts, FastAPI web gateways, AST code validators, and automated OS automation tools.",
    dept: "Artificial Intel",
    status: "PRODUCTION",
    integration: "99.8% INTEGRITY",
  },
  "JavaScript": {
    desc: "Asynchronous client routing, web interactive elements, dynamic document bindings, and API requests.",
    dept: "Web Client",
    status: "PRODUCTION",
    integration: "99.9% INTEGRITY",
  },
  "TypeScript": {
    desc: "Type-safe compile verification, interfaces, enterprise React bindings, and schema checks.",
    dept: "Full-Stack Dev",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "SQL": {
    desc: "Relational database constraints, optimized joins, data indexes, and transaction safety checks.",
    dept: "Data Storage",
    status: "STABLE",
    integration: "100% INTEGRITY",
  },
  "React.js": {
    desc: "State-driven client rendering, modular component trees, virtual DOM reconciliations, and custom hooks.",
    dept: "Frontend UX",
    status: "PRODUCTION",
    integration: "99.9% INTEGRITY",
  },
  "Next.js": {
    desc: "Server-side rendering, automated directory routes, statically compiled page builds, and edge optimizations.",
    dept: "Frontend UX",
    status: "STABLE",
    integration: "100% INTEGRITY",
  },
  "Tailwind CSS": {
    desc: "PostCSS utility utility classes, responsive grid systems, and custom theme variable integrations.",
    dept: "Frontend Styles",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "HTML5": {
    desc: "Semantic webpage layouts, accessibility support, DOM structures, and canvas elements.",
    dept: "Web Client",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "CSS3": {
    desc: "Responsive layout queries, custom keyframe layouts, flexbox matrices, and CSS variables.",
    dept: "Web Client",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Framer Motion": {
    desc: "Spring physics visual triggers, hover transitions, page animations, and exit rendering schedules.",
    dept: "Frontend Styles",
    status: "PRODUCTION",
    integration: "99.5% INTEGRITY",
  },
  "FastAPI": {
    desc: "High-performance Python web APIs, automated Pydantic schema validation, and asynchronous endpoints.",
    dept: "Backend Routing",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Node.js": {
    desc: "Event-driven asynchronous server engines, npm package management, and system task scheduling.",
    dept: "Backend Server",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Express": {
    desc: "Minimalist server gateways, middleware interceptors, database adapters, and route handling.",
    dept: "Backend Server",
    status: "STABLE",
    integration: "99.9% INTEGRITY",
  },
  "RESTful APIs": {
    desc: "Standardized HTTP endpoints, JSON telemetry payloads, and CORS middleware controls.",
    dept: "Backend Routing",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Django": {
    desc: "Secure Python server frameworks, built-in ORM engines, modular view rendering, and admin suites.",
    dept: "Backend Server",
    status: "STABLE",
    integration: "99.8% INTEGRITY",
  },
  "PostgreSQL": {
    desc: "Advanced relational database clustering, secure credential isolation, and table partitions.",
    dept: "Data Storage",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "MongoDB": {
    desc: "NoSQL document schemas, BSON indices, unstructured data clusters, and scalable database tunnels.",
    dept: "Data Storage",
    status: "STABLE",
    integration: "99.9% INTEGRITY",
  },
  "Supabase": {
    desc: "Automated Postgres backends, built-in JWT authentication tables, and real-time database subscription nodes.",
    dept: "Cloud Backend",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Vercel": {
    desc: "Cloud static deployments, automated edge routing, git-pushed pipelines, and serverless executions.",
    dept: "Cloud Hosting",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Firebase": {
    desc: "Cloud document databases, user login databases, static server hosting, and push alerts.",
    dept: "Cloud Backend",
    status: "STABLE",
    integration: "99.7% INTEGRITY",
  },
  "OpenAI APIs": {
    desc: "GPT-4 inference triggers, custom JSON response schemas, system instruction boundaries, and prompt controls.",
    dept: "Artificial Intel",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Whisper Speech-to-Text": {
    desc: "Asynchronous neural voice transcriptions, audio translation engines, and model pipelines.",
    dept: "Artificial Intel",
    status: "STABLE",
    integration: "99.6% INTEGRITY",
  },
  "Prompt Engineering": {
    desc: "Few-shot modeling adjustments, AST output formatting guides, and prompt security controls.",
    dept: "Artificial Intel",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "RAG Architectures": {
    desc: "Vector search data databases, text chunking pipelines, context merges, and augmented generation validation.",
    dept: "Artificial Intel",
    status: "EXPERIMENTAL",
    integration: "99.2% INTEGRITY",
  },
  "Ethical Hacking": {
    desc: "API penetration tests, vulnerability audits, SQL injection assessments, and code auditing audits.",
    dept: "Sec Ops",
    status: "STABLE",
    integration: "99.9% INTEGRITY",
  },
  "OWASP Top 10": {
    desc: "Secure input sanitizations, XSS defenses, CSRF tokens, and secure JWT session controls.",
    dept: "Sec Ops",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Git": {
    desc: "Distributed version control management, branch merges, conflict checks, and webhook deployment setups.",
    dept: "Dev Tools",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Docker": {
    desc: "Isolated system containers, microservice layouts, Dockerfiles configs, and cluster networks.",
    dept: "Dev Tools",
    status: "STABLE",
    integration: "99.8% INTEGRITY",
  },
  "Linux": {
    desc: "Operating system kernel configurations, security parameters, background cron operations, and SSH terminals.",
    dept: "Systems Core",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Linux Bash Shell": {
    desc: "Command scripts, environment variables management, build processes automation, and server logs.",
    dept: "Dev Tools",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
  "Postman": {
    desc: "API endpoint validations, automated route testing scripts, and network packet telemetry checks.",
    dept: "Dev Tools",
    status: "PRODUCTION",
    integration: "100% INTEGRITY",
  },
};

const getTechDetails = (techName: string | null) => {
  const fallback = {
    desc: `${techName || "Select a component"} - verified engineering capability integrated within Nitin's core systems stack.`,
    dept: "Core Systems",
    status: "STABLE",
    integration: "100% INTEGRITY"
  };
  if (!techName) return fallback;
  return techDetailsMap[techName] || {
    desc: `${techName} - verified engineering capability integrated within Nitin's core systems stack.`,
    dept: "Core Systems",
    status: "STABLE",
    integration: "100% INTEGRITY"
  };
};

// Segmented Load Bar component
function SegmentedLoadBar({ value, color = "primary" }: { value: number; color?: "primary" | "violet" | "cyan" | "amber" }) {
  const numSegments = 14;
  const filledSegments = Math.round((value / 100) * numSegments);

  const colorMap = {
    primary: "bg-primary border-primary/20 shadow-[0_0_8px_hsl(var(--primary)/0.4)]",
    violet: "bg-primary border-primary/20 shadow-[0_0_8px_hsl(var(--primary)/0.4)]",
    cyan: "bg-neutral-300 dark:bg-neutral-500 border-neutral-300/20 dark:border-neutral-500/20 shadow-[0_0_8px_rgba(200,200,200,0.25)]",
    amber: "bg-zinc-400 dark:bg-zinc-600 border-zinc-400/20 dark:border-zinc-600/20 shadow-[0_0_8px_rgba(150,150,150,0.2)]",
  };

  return (
    <div className="flex gap-1 items-center h-4 select-none">
      {Array.from({ length: numSegments }).map((_, idx) => {
        const isFilled = idx < filledSegments;
        return (
          <motion.div
            key={idx}
            initial={{ scaleY: 0.2, opacity: 0.1 }}
            whileInView={{ scaleY: 1, opacity: isFilled ? 1 : 0.15 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.03, type: "spring", stiffness: 200 }}
            className={`w-2.5 h-3 rounded-sm border ${
              isFilled ? colorMap[color] : "bg-neutral-800/40 border-neutral-700/20"
            }`}
          />
        );
      })}
    </div>
  );
}

// Live Terminal Simulator
function SkillTerminal({ active, categoryName, index }: { active: boolean; categoryName: string; index: number }) {
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      setLogs([`SYS_INIT: MODULE_${index + 1}_STANDBY`]);
      return;
    }

    const logsPool = [
      `[LOAD] Accessing directory keys for ${categoryName}...`,
      `[CONN] Establishing pipeline thread... NOMINAL`,
      `[HASH] SHA-256 integrity checks: ${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
      `[COMP] Scanning dependencies for compiling...`,
      `[COMP] React router/fastapi schema sync: OK`,
      `[WARN] 0 deprecations. Security gates: ACTIVE`,
      `[INFO] Allocating stack memory blocks...`,
      `[KERN] Running memory cleanup sweeps... PASS`,
      `[SUCCESS] Module compilation verified stable.`,
    ];

    setLogs([logsPool[0]]);
    let currentLine = 1;
    const interval = setInterval(() => {
      if (currentLine < logsPool.length) {
        const nextLine = logsPool[currentLine];
        if (nextLine) {
          setLogs(prev => [...prev, nextLine]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [active, categoryName, index]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      ref={terminalRef} 
      className="mt-5 p-3 rounded-xl bg-black/60 border border-border/30 dark:border-white/5 font-mono text-[9px] text-primary h-20 overflow-y-auto flex flex-col gap-1 relative shadow-inner"
    >
      <div className="absolute top-1.5 right-2 text-[7px] text-muted-foreground select-none uppercase tracking-widest flex items-center gap-1 font-sans">
        <span className={`w-1 h-1 rounded-full ${active ? "bg-emerald-500 animate-pulse" : "bg-neutral-600"}`} />
        {active ? "COMPILING" : "STANDBY"}
      </div>
      {logs.map((log, i) => (
        <div key={i} className="whitespace-pre-wrap select-none leading-normal">
          <span className="text-primary/50 mr-1">{">"}</span>
          <span className={log && log.includes("[SUCCESS]") ? "text-emerald-400 font-bold" : ""}>{log || ""}</span>
        </div>
      ))}
    </div>
  );
}

const getCategoryIcon = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) return IconComponent;
  
  if (iconName === "Code2") return Code2;
  if (iconName === "Layout") return LayoutIcon;
  if (iconName === "Server") return Server;
  if (iconName === "Database") return Database;
  if (iconName === "Brain") return Brain;
  if (iconName === "Wrench") return Wrench;
  if (iconName === "Shield") return Shield;
  return Code2;
};

export default function Skills() {
  const { content } = useContentStore();
  const { skills = [] } = content || {};
  
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredStrength, setHoveredStrength] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>("TypeScript");

  // Sort categories by order
  const sortedSkills = [...(skills || [])].sort((a, b) => a.order - b.order);

  // Dynamically compile complete tech stack from store
  const dynamicTechStack = Array.from(
    new Set(
      (skills || []).flatMap((cat) => (cat.items || []).map((item) => item.name))
    )
  );

  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-background" />

        <div className="container-custom">
          <SectionHeading
            title="Skills & Expertise"
            subtitle="Technologies, tools, and strengths I use to build scalable real-world software"
          />

          {/* ================= WHAT I BRING ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-24"
          >
            <GlowCard glowColor="violet" enableTilt className="p-8 relative overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />
              
              <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/60 select-none uppercase tracking-widest pb-3 border-b border-border/30 dark:border-white/5 mb-6">
                <span>SYSTEM: COGNITIVE_DIAGNOSTICS_HUD</span>
                <span className="text-primary font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  NOMINAL
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mt-2">
                {strengths.map((item, idx) => {
                  const isHovered = hoveredStrength === idx;
                  return (
                    <div 
                      key={item.text} 
                      onMouseEnter={() => setHoveredStrength(idx)}
                      onMouseLeave={() => setHoveredStrength(null)}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-card/45 dark:bg-black/40 border border-border/30 dark:border-white/5 cursor-default transition-all duration-300 hover:border-primary/30 hover:bg-muted/40 dark:hover:bg-black/60"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={isHovered ? { scale: 1.25, rotate: 360 } : {}}
                          transition={{ duration: 0.4 }}
                          className="shrink-0"
                        >
                          <CheckCircle className={`h-5 w-5 transition-colors duration-300 ${isHovered ? "text-primary shadow-[0_0_10px_hsl(var(--primary))]" : "text-muted-foreground/60"}`} />
                        </motion.div>
                        <span className={`transition-colors duration-300 text-sm ${isHovered ? "text-primary font-medium" : "text-muted-foreground"}`}>
                          {item.text}
                        </span>
                      </div>
                      <div className="text-[8px] font-mono text-primary/50 tracking-wider">
                        [LAT: {item.latency}]
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlowCard>
          </motion.div>

          {/* ================= SKILLS GRID ================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
            {sortedSkills.map((category, index) => {
              const Icon = getCategoryIcon(category.icon);
              const isHovered = hoveredCategory === category.id;
              
              // Map index to a core glow color family
              const colors = ["violet" as const, "cyan" as const, "amber" as const];
              const glowColor = colors[index % colors.length];

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="h-full"
                >
                  <GlowCard
                    glowColor={glowColor}
                    enableTilt
                    className={`h-full p-6 flex flex-col justify-between transition-all duration-500 relative border-border/30 dark:border-white/[0.05] ${
                      isHovered ? "border-primary/45" : ""
                    }`}
                  >
                    {/* Cyber border brackets */}
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary/20 group-hover:border-primary/50 transition-colors pointer-events-none" />
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-primary/20 group-hover:border-primary/50 transition-colors pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-primary/20 group-hover:border-primary/50 transition-colors pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-primary/20 group-hover:border-primary/50 transition-colors pointer-events-none" />
                    
                    <div className="absolute top-3 right-4 text-[7px] font-mono text-primary/45 uppercase tracking-widest select-none">
                      [ADDR: 0x{(index * 32 + 8192).toString(16).toUpperCase()}]
                    </div>

                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          animate={isHovered ? { scale: 1.1, rotate: [0, -10, 10, 0] } : {}}
                          transition={{ duration: 0.5 }}
                          className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20"
                        >
                          <Icon className="h-5 w-5 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className={`text-base font-bold transition-colors duration-300 ${isHovered ? "text-primary" : "text-foreground"}`}>
                            {category.title}
                          </h3>
                          <div className="text-[7px] font-mono text-muted-foreground/60 tracking-wider mt-0.5 select-none uppercase">
                            CORE_SYS: {isHovered ? "ACTIVE_SWEEP" : "NOMINAL"}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4.5">
                        {(category.items || []).map((skill) => (
                          <div key={skill.name} className="relative group/item">
                            <div className="flex justify-between text-xs mb-1 font-mono">
                              <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                                {skill.name}
                              </span>
                              <span className="text-primary font-bold">
                                {skill.level}%
                              </span>
                            </div>

                            {/* Segmented Digital Load Indicators */}
                            <SegmentedLoadBar value={skill.level} color={glowColor} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Logging stream panel */}
                    <SkillTerminal active={isHovered} categoryName={category.title} index={index} />

                    <div className="mt-4 border-t border-border/20 dark:border-white/5 pt-3 flex justify-between items-center text-[7px] font-mono text-primary/60 select-none">
                      <span>SYS_CORE: LOAD_OK</span>
                      <span>THREAD_RUN: {index * 4 + 8}/TCP</span>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>

          {/* ================= INTERACTIVE TECH MATRIX ================= */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Box: Complete Tech Cloud (Col 7/12) */}
            <div className="lg:col-span-7 bg-card/40 dark:bg-black/40 border border-border/30 dark:border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              {/* Cyber Brackets overlay */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

              <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground/60 select-none uppercase tracking-widest pb-3 border-b border-border/30 dark:border-white/5 mb-6">
                <span>MATRIX: ALL_TECH_REPOSITORIES</span>
                <span className="text-primary font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  DYNAMIC_INDEX
                </span>
              </div>

              <div className="flex flex-wrap gap-3 max-w-2xl">
                {dynamicTechStack.map((tech) => {
                  const isSelected = selectedTech === tech;
                  return (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all border ${
                        isSelected
                          ? "bg-primary/10 text-primary border-primary/40 font-bold shadow-[0_0_15px_-3px_hsl(var(--primary))]"
                          : "bg-transparent text-muted-foreground border-border/30 hover:border-border dark:border-white/5 dark:hover:border-white/20"
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>

              <div className="text-[8px] font-mono text-muted-foreground/45 border-t border-border/20 dark:border-white/5 pt-3 mt-6 select-none uppercase">
                * Click any stack component to output detailed integration diagnostics.
              </div>
            </div>

            {/* Right Box: Diagnostic Details (Col 5/12) */}
            <div className="lg:col-span-5 flex flex-col">
              <GlowCard
                glowColor="cyan"
                enableTilt={false}
                className="p-6 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[350px]"
              >
                {/* Cyber Brackets overlay */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

                {/* Header */}
                <div className="border-b border-border/30 dark:border-white/5 pb-4 mb-4 select-none">
                  <div className="flex justify-between items-center text-[8px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1.5">
                    <span>REGISTRY: TECH_EXPLORER</span>
                    <span>INTEGRATION: ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold tracking-tight text-foreground flex items-center gap-2">
                      <span className="text-primary">//</span>
                      {selectedTech || "Select Component"}
                    </h3>
                     <span className="text-[9px] px-2 py-0.5 rounded font-mono border border-primary/30 text-primary bg-primary/5 font-semibold">
                      {selectedTech ? getTechDetails(selectedTech).dept.toUpperCase() : "STANDBY"}
                    </span>
                  </div>
                </div>

                {/* Body details */}
                <div className="flex-1 space-y-4">
                  <div className="p-3 bg-card/50 dark:bg-black/40 border border-border/30 dark:border-white/5 rounded-xl font-mono text-[11px] leading-relaxed text-foreground/80">
                    <div className="text-[8px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 select-none">// COMPILER METADATA</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedTech}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="min-h-[70px]"
                      >
                        {selectedTech ? getTechDetails(selectedTech).desc : "Select a technical component to read detailed description specs from Nitin's stack."}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {selectedTech && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/30 dark:bg-black/20 border border-border/30 dark:border-white/5 rounded-xl font-mono text-center">
                        <div className="text-[8px] text-muted-foreground/60 uppercase mb-0.5 select-none">DESTRUCT_STATUS</div>
                        <div className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                          {getTechDetails(selectedTech).status}
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-black/20 border border-border/30 dark:border-white/5 rounded-xl font-mono text-center">
                        <div className="text-[8px] text-muted-foreground/60 uppercase mb-0.5 select-none">SYSTEM_INTEGRITY</div>
                        <div className="text-xs font-bold text-primary">
                          {getTechDetails(selectedTech).integration}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer metrics */}
                <div className="mt-6 border-t border-border/30 dark:border-white/5 pt-3 text-[8px] font-mono text-muted-foreground/50 select-none uppercase flex justify-between">
                  <span>DB_TUNNEL: SECURE</span>
                  <span>LOAD: 0.12ms</span>
                </div>
              </GlowCard>
            </div>

          </div>

        </div>
      </section>
    </PageTransition>
  );
}
