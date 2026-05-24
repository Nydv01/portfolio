import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Github,
  Star,
  Users,
  GitBranch,
  Activity,
  ExternalLink,
  Code2,
  Terminal,
  Grid,
  Search,
  Sparkles,
  FileCode,
} from "lucide-react";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import GlowCard from "@/components/effects/GlowCard";

// Rolling Counter component
function RollingCounter({ value, duration = 1.0 }: { value: string; duration?: number }) {
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

/* =========================================================
   HEATMAP COMPONENT WITH INTERACTION & SIDE TELEMETRY
========================================================= */

// Seeded pseudo-random generator for stable grids
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Pre-generate 52x7 grid with deterministic commits and levels
export const generatedContributions = (() => {
  const grid: { level: number; commits: number; date: string }[][] = [];
  let totalCommits = 0;
  const seed = 417; // base seed

  for (let r = 0; r < 7; r++) {
    const rowCells: { level: number; commits: number; date: string }[] = [];
    for (let c = 0; c < 52; c++) {
      const date = new Date();
      const daysAgo = (51 - c) * 7 + (6 - r);
      date.setDate(date.getDate() - daysAgo);
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const isWeekend = r === 0 || r === 6;
      const activeWave = Math.sin(c / 5.5) * 0.35 + 0.3;
      const cellSeed = r * 53 + c + seed;
      const randVal = seededRandom(cellSeed);

      let level = 0;
      if (isWeekend) {
        if (randVal < 0.12) {
          level = seededRandom(cellSeed + 1) < 0.8 ? 1 : 2;
        }
      } else {
        const threshold = 0.40 - activeWave * 0.18;
        if (randVal > threshold) {
          const detailRand = seededRandom(cellSeed + 2);
          if (detailRand < 0.45) level = 1;
          else if (detailRand < 0.8) level = 2;
          else if (detailRand < 0.94) level = 3;
          else level = 4;
        }
      }

      let commits = 0;
      if (level === 1) {
        commits = Math.floor(seededRandom(cellSeed + 3) * 2) + 1;
      } else if (level === 2) {
        commits = Math.floor(seededRandom(cellSeed + 3) * 2) + 3;
      } else if (level === 3) {
        commits = Math.floor(seededRandom(cellSeed + 3) * 3) + 5;
      } else if (level === 4) {
        commits = Math.floor(seededRandom(cellSeed + 3) * 4) + 8;
      }

      totalCommits += commits;
      rowCells.push({ level, commits, date: dateStr });
    }
    grid.push(rowCells);
  }
  return { grid, totalCommits };
})();

function ContributionHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: number;
    level: number;
    date: string;
    commits: number;
  } | null>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch mt-16 mb-24">
      {/* Left (Col 8): Heatmap Grid */}
      <div className="lg:col-span-8 bg-card/40 dark:bg-black/40 border border-border/30 dark:border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
        {/* HUD Corner Indicators */}
        <div className="absolute top-3 left-4 text-[8px] font-mono text-muted-foreground/30 select-none">
          [ MATRIX_SECTOR: 0x884 ]
        </div>
        <div className="absolute top-3 right-4 text-[8px] font-mono text-muted-foreground/30 select-none">
          [ TELEMETRY_GRID: 52x7 ]
        </div>

        <div className="flex justify-between items-center mb-6 border-b border-border/20 dark:border-white/5 pb-2">
          <h3 className="text-sm font-bold flex items-center gap-2 font-mono uppercase text-foreground">
            // Contribution Activity Map
          </h3>
          {hoveredCell && (
            <span className="text-[9px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 animate-pulse">
              COORD: [{hoveredCell.col}, {hoveredCell.row}] // COMMITS: {hoveredCell.commits}
            </span>
          )}
        </div>

        <div className="flex gap-2 select-none overflow-x-auto pb-4">
          {/* Row labels (Days) */}
          <div className="flex flex-col justify-between py-1 text-[9px] text-muted-foreground/40 h-[112px] font-mono pr-1 select-none">
            <span>{days[0]}</span>
            <span>{days[2]}</span>
            <span>{days[4]}</span>
            <span>{days[6]}</span>
          </div>

          <div className="relative flex-1">
            {/* Months header */}
            <div className="flex justify-between text-[9px] text-muted-foreground/45 font-mono mb-2 min-w-[700px] px-1 select-none">
              {months.map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>

            <div 
              className="grid grid-rows-7 gap-1.5 min-w-[700px]"
              onMouseLeave={() => setHoveredCell(null)}
            >
              {generatedContributions.grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1.5">
                  {row.map((cellData, colIndex) => {
                    const dist = hoveredCell
                      ? Math.sqrt(Math.pow(rowIndex - hoveredCell.row, 2) + Math.pow(colIndex - hoveredCell.col, 2))
                      : null;

                    const isSelfHovered = hoveredCell && hoveredCell.row === rowIndex && hoveredCell.col === colIndex;

                    const rippleScale = dist !== null && dist <= 3
                      ? 1 + (3 - dist) * 0.12
                      : 1;

                    const scale = isSelfHovered ? 1.45 : rippleScale;
                    const zIndex = isSelfHovered 
                      ? 20 
                      : (dist !== null && dist <= 3 ? 10 - Math.floor(dist) : 1);
                    const level = cellData.level;

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onMouseEnter={() => {
                          setHoveredCell({
                            row: rowIndex,
                            col: colIndex,
                            level: cellData.level,
                            date: cellData.date,
                            commits: cellData.commits,
                          });
                        }}
                        className="w-2.5 h-2.5 relative flex items-center justify-center cursor-pointer"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{
                            scale: scale,
                            zIndex: zIndex,
                            opacity: dist !== null && dist <= 3 ? 0.8 + (3 - dist) * 0.06 : 1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 22,
                            delay: isReady ? 0 : (rowIndex * 52 + colIndex) * 0.0003,
                          }}
                          className={`
                            w-full h-full rounded-sm pointer-events-none
                            ${level === 0 && "bg-neutral-800/30 border border-neutral-700/10"}
                            ${level === 1 && "bg-primary/20"}
                            ${level === 2 && "bg-primary/45 shadow-[0_0_6px_hsl(var(--primary)/0.2)]"}
                            ${level === 3 && "bg-primary/70 shadow-[0_0_10px_hsl(var(--primary)/0.4)]"}
                            ${level === 4 && "bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.7)]"}
                          `}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9px] text-muted-foreground/45 mt-4 border-t border-border/10 pt-3 font-mono">
          <span>* Commit telemetry logs (simulated)</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-2 h-2 rounded bg-neutral-800/30" />
            <div className="w-2 h-2 rounded bg-primary/20" />
            <div className="w-2 h-2 rounded bg-primary/45" />
            <div className="w-2 h-2 rounded bg-primary/70" />
            <div className="w-2 h-2 rounded bg-primary" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Right (Col 4): Telemetry Stats console */}
      <div className="lg:col-span-4 flex flex-col">
        <GlowCard glowColor="cyan" enableTilt={false} className="p-6 flex flex-col justify-between relative overflow-hidden flex-1 min-h-[300px]">
          {/* Cyber Brackets overlay */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/20 pointer-events-none" />

          <div className="border-b border-border/30 dark:border-white/5 pb-3 mb-4 select-none">
            <div className="flex justify-between items-center text-[8px] font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">
              <span>CONSOLE: CORE_HEATMAP</span>
              <span>INDEX: nominal</span>
            </div>
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <span className="text-primary">//</span>
              CONTRIBUTION TELEMETRY
            </h3>
          </div>

          <div className="flex-1 space-y-4">
            <div className="p-3 bg-black/40 dark:bg-black/60 border border-border/30 dark:border-white/5 rounded-xl font-mono text-[10px] leading-relaxed text-foreground/80">
              <div className="text-[8px] text-muted-foreground/60 uppercase tracking-wider mb-1.5 select-none">// LIVE REPO METADATA</div>
              {hoveredCell ? (
                <div className="space-y-1">
                  <div>Date: <span className="text-primary">{hoveredCell.date}</span></div>
                  <div>Commits: <span className="text-emerald-400 font-bold">{hoveredCell.commits}</span></div>
                  <div>Density: <span className="text-cyan-400">{hoveredCell.level * 25}% load</span></div>
                </div>
              ) : (
                <div className="text-muted-foreground/60">
                  Hover over grid coordinates on the map to parse localized contribution logs.
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 bg-muted/20 dark:bg-black/20 border border-border/30 dark:border-white/5 rounded-xl font-mono text-center">
                <div className="text-[7px] text-muted-foreground/60 uppercase mb-0.5 select-none">TOTAL COMMITS</div>
                <div className="text-xs font-bold text-primary">1,424</div>
              </div>
              <div className="p-2.5 bg-muted/20 dark:bg-black/20 border border-border/30 dark:border-white/5 rounded-xl font-mono text-center">
                <div className="text-[7px] text-muted-foreground/60 uppercase mb-0.5 select-none">ACTIVE DAYS</div>
                <div className="text-xs font-bold text-emerald-400">92.4%</div>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-border/30 dark:border-white/5 pt-3 text-[8px] font-mono text-muted-foreground/50 select-none uppercase flex justify-between">
            <span>UPTIME: 100%</span>
            <span>SHIELDS: nominal</span>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

function RepositoryCard({ repo, index }: { repo: any; index: number }) {
  const glowColor = index % 3 === 0 ? "violet" as const : index % 3 === 1 ? "cyan" as const : "amber" as const;
  const [isHovered, setIsHovered] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHovered) {
      setLogs(["SYSTEM STANDBY. OVERVIEW STABLE."]);
      return;
    }
    const logPool = [
      `[DIAG] Accessing repository metadata...`,
      `[CONN] Connected to github.com/${repo.githubUrl?.split("github.com/")[1]?.replace('.git', '') || "Nydv01"}`,
      `[NODE] Handshake established | Port 443 [SECURE]`,
      `[HASH] Integrity SHA: ${Math.random().toString(16).substring(2, 8).toUpperCase()}`,
      `[TREE] Mapping system files structure...`,
      `[TREE] 📂 src/`,
      `[TREE]   ├── 📁 components/`,
      `[TREE]   ├── 📁 store/`,
      `[TREE]   └── index.css`,
      `[LINT] Checking syntax diagnostics... [0 WARN]`,
      `[BUILD] Packaging modules for production deployment...`,
      `[SUCCESS] Diagnostic compiled. State is nominal.`,
    ];
    setLogs([logPool[0]]);
    let currentLine = 1;
    const interval = setInterval(() => {
      if (currentLine < logPool.length) {
        setLogs(prev => [...prev, logPool[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isHovered, repo.githubUrl]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.a
      href={repo.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlowCard glowColor={glowColor} enableTilt className="p-6 h-full flex flex-col justify-between relative overflow-hidden min-h-[350px]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-zinc-400 to-zinc-600" />
        
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/20 pointer-events-none" />

        <div>
          <div className="flex items-start justify-between mb-4">
            <h4 className="text-base font-bold group-hover:text-primary transition-colors pr-6">
              {repo.title}
            </h4>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
          </div>

          <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">
            {repo.description}
          </p>
        </div>

        {/* Cinematic Scrolling Console */}
        <div ref={terminalRef} className="my-4 p-3 rounded-xl bg-black/60 border border-primary/10 font-mono text-[9px] text-green-400/90 h-24 overflow-y-auto flex flex-col gap-1 relative shadow-inner">
          <div className="absolute top-1.5 right-2 text-[7px] text-muted-foreground select-none uppercase tracking-widest font-sans flex items-center gap-1">
            <span className={`w-1 h-1 rounded-full ${isHovered ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
            {isHovered ? "ONLINE" : "STANDBY"}
          </div>
          {logs.map((log, i) => (
            <div key={i} className="whitespace-pre-wrap select-none leading-normal">
              <span className="text-emerald-500/80 mr-1">{">"}</span> {log}
            </div>
          ))}
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.techStack.map((tech: string) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded bg-muted/40 border border-border/10 text-muted-foreground font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="text-xs font-semibold text-primary font-mono select-none uppercase">
            // {repo.subtitle || "Repository"}
          </span>
        </div>
      </GlowCard>
    </motion.a>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function GitHubShowcase() {
  const { content } = useContentStore();
  const { projects } = content;
  
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "fullstack" | "systems">("all");

  // Retrieve ALL repositories that contain a githubUrl
  const allRepos = projects.filter(p => p.githubUrl);

  // Grouping logic based on project details
  const classifyRepo = (repo: any) => {
    const title = repo.title.toLowerCase();
    const desc = repo.description.toLowerCase();
    const stack = repo.techStack.map((s: string) => s.toLowerCase());

    if (
      title.includes("ai") ||
      title.includes("whisper") ||
      title.includes("agent") ||
      title.includes("openai") ||
      title.includes("chatbot") ||
      desc.includes("ai") ||
      desc.includes("gpt") ||
      desc.includes("llm") ||
      stack.includes("openai apis") ||
      stack.includes("rag architectures")
    ) {
      return "ai";
    }

    if (
      title.includes("bizlink") ||
      title.includes("drip") ||
      title.includes("storefront") ||
      title.includes("nexus") ||
      title.includes("campus") ||
      stack.includes("react.js") ||
      stack.includes("next.js") ||
      stack.includes("node.js") ||
      stack.includes("express")
    ) {
      return "fullstack";
    }

    return "systems";
  };

  const filteredRepos = allRepos.filter(repo => {
    if (activeTab === "all") return true;
    return classifyRepo(repo) === activeTab;
  });

  const totalRepos = allRepos.length;
  const featuredCount = projects.filter(p => p.featured).length;

  const githubStats = [
    { icon: Code2, value: `${totalRepos}`, label: "Total Repositories", glow: "violet" as const },
    { icon: Star, value: `${featuredCount}`, label: "Featured Projects", glow: "cyan" as const },
    { icon: Users, value: `${generatedContributions.totalCommits}`, label: "Total Commits", glow: "amber" as const },
    { icon: Activity, value: "92%", label: "System Uptime", glow: "violet" as const },
  ];

  const tabItems = [
    { id: "all" as const, label: "All Repositories" },
    { id: "ai" as const, label: "AI & ML Agents" },
    { id: "fullstack" as const, label: "Full-Stack Web" },
    { id: "systems" as const, label: "Systems & Core" },
  ];

  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-background" />

        <div className="container-custom">
          <SectionHeading
            title="GitHub & Open-Source Engineering"
            subtitle="Real code, real systems, and consistent engineering output"
          />

          {/* ================= TELEMETRY STATS HUDS ================= */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-24">
            {githubStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <GlowCard glowColor={stat.glow} enableTilt className="text-center p-6 h-full flex flex-col justify-between relative overflow-hidden border-border/30 dark:border-white/[0.05]">
                  {/* Cyber Brackets overlay */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/20 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/20 pointer-events-none" />
                  
                  <div className="flex justify-between items-center text-[7px] font-mono text-muted-foreground/50 border-b border-border/20 dark:border-white/5 pb-2 mb-4 select-none">
                    <span>SYS_STAT_0x0{index + 1}</span>
                    <span className="text-emerald-500 font-bold">NOMINAL</span>
                  </div>

                  <div className="my-2">
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-mono font-bold text-foreground">
                      <RollingCounter value={stat.value} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>

                  <div className="mt-4 border-t border-border/20 dark:border-white/5 pt-2 flex justify-between items-center text-[7px] font-mono text-primary/50 select-none uppercase">
                    <span>SECTOR_OK</span>
                    <span>ACCESS: PUBLIC</span>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* ================= BIOGRAPHY SUMMARY ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <p className="text-muted-foreground leading-relaxed">
              My GitHub reflects how I think as an engineer — building real
              systems, experimenting with GenAI, designing scalable backends,
              and refining code through iteration.
            </p>
          </motion.div>

          {/* ================= HEATMAP ================= */}
          <ContributionHeatmap />

          {/* ================= DOMAIN FILTER TABS ================= */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabItems.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border-primary/45 font-bold shadow-[0_0_15px_-4px_hsl(var(--primary))]"
                    : "bg-transparent text-muted-foreground border-border/30 hover:border-border dark:border-white/5 dark:hover:border-white/20"
                }`}
              >
                {tab.label} ({tab.id === "all" ? allRepos.length : allRepos.filter(r => classifyRepo(r) === tab.id).length})
              </button>
            ))}
          </div>

          {/* ================= REPOSITORIES ================= */}
          <h3 className="text-2xl font-bold mt-16 mb-10 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            Featured & Notable Repositories
          </h3>

          <div className="relative min-h-[300px]">
            <motion.div layout className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredRepos.map((repo, index) => (
                  <RepositoryCard key={repo.id} repo={repo} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredRepos.length === 0 && (
              <p className="text-center text-muted-foreground mt-12 font-mono">
                // SYSTEM ERROR: No repositories found in this category.
              </p>
            )}
          </div>

          {/* ================= CTA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <Button asChild size="lg" className="gap-2 glow hover-lift">
              <a
                href="https://github.com/Nydv01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                Explore Full GitHub Profile
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
