import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Heart,
  Users,
  Lightbulb,
  Target,
  ShieldCheck,
  Code,
  Layers,
  Brain,
  Shield,
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

// Mini SVG oscilloscope wave
function MiniOscilloscope({ active }: { active: boolean }) {
  return (
    <div className="h-6 w-full overflow-hidden relative opacity-40 mb-2">
      <svg width="100%" height="24">
        <motion.path
          d="M 0 12 Q 10 12, 20 12 T 40 12 T 60 12 T 80 12 T 100 12 T 120 12 T 140 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          animate={active ? {
            d: [
              "M 0 12 Q 10 2, 20 12 T 40 12 T 60 22 T 80 2 T 100 12 T 120 12 T 140 12",
              "M 0 12 Q 10 22, 20 12 T 40 2 T 60 12 T 80 22 T 100 12 T 120 12 T 140 12",
              "M 0 12 Q 10 2, 20 12 T 40 12 T 60 22 T 80 2 T 100 12 T 120 12 T 140 12"
            ]
          } : {
            d: [
              "M 0 12 Q 15 10, 30 12 T 60 12 T 90 10 T 120 12 T 140 12",
              "M 0 12 Q 15 14, 30 12 T 60 12 T 90 14 T 120 12 T 140 12",
              "M 0 12 Q 15 10, 30 12 T 60 12 T 90 10 T 120 12 T 140 12"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}

function IDETerminalConsole() {
  const [activeTab, setActiveTab] = useState<"nitin_core.py" | "security.rs" | "core_hud.ts">("nitin_core.py");
  const [codeLineIndex, setCodeLineIndex] = useState(0);
  const [isConsoleHovered, setIsConsoleHovered] = useState(false);
  
  const pythonCode = [
    "import os",
    "import openai",
    "from security import decrypt_node",
    "",
    "class DeveloperProfile:",
    "    def __init__(self):",
    "        self.name = 'Nitin Yadav'",
    "        self.role = 'GenAI & Full-Stack Developer'",
    "        self.status = 'READY_TO_DEPLOY'",
    "        self.integrity = 0.998",
    "",
    "    def run_build(self):",
    "        print('[SYS] Initializing compiler...')",
    "        print('[SYS] Port: 443/TCP connected')",
    "        return self.status",
    "",
    "if __name__ == '__main__':",
    "    dev = DeveloperProfile()",
    "    dev.run_build()",
  ];

  const securityCode = [
    "// RSA-OAEP + AES-GCM decryption",
    "fn verify_identity(key_id: &str) -> bool {",
    "    let security_gateway = check_port(443);",
    "    if security_gateway.is_active() {",
    "        log_info(\"IDENTITY INTEGRITY: PASS\");",
    "        true",
    "    } else {",
    "        log_warning(\"GATEWAY_OFFLINE\");",
    "        false",
    "    }",
    "}",
  ];

  const typescriptCode = [
    "import { useContentStore } from '@/stores/contentStore';",
    "",
    "export const NitinCore: React.FC = () => {",
    "  const activeModel = 'OpenAI_GPT4o';",
    "  const location = 'Bhopal, India';",
    "  return (",
    "    <TelemetryHUD cpu={45} memory={30} />",
    "  );",
    "}",
  ];

  const activeCode = activeTab === "nitin_core.py" 
    ? pythonCode 
    : activeTab === "security.rs" 
      ? securityCode 
      : typescriptCode;

  // Cycle code lines animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCodeLineIndex((prev) => (prev + 1) % (activeCode.length || 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [activeCode]);

  return (
    <div 
      onMouseEnter={() => setIsConsoleHovered(true)}
      onMouseLeave={() => setIsConsoleHovered(false)}
      className="w-full h-full rounded-3xl overflow-hidden border border-border/40 dark:border-white/5 flex flex-col bg-zinc-950 text-zinc-100 shadow-2xl relative"
    >
      {/* Top OS window bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-white/5 select-none shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/85" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/85" />
          <div className="w-2 h-2 rounded-full bg-green-500/85" />
        </div>
        <div className="flex gap-2 text-[9px] font-mono text-zinc-400">
          {(["nitin_core.py", "security.rs", "core_hud.ts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCodeLineIndex(0);
              }}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                activeTab === tab 
                  ? "bg-zinc-800 text-primary font-bold border border-primary/20" 
                  : "hover:bg-zinc-800/40 text-zinc-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="text-[7px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 select-none uppercase tracking-wider">
          SYS_READY
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 grid grid-cols-5 divide-x divide-white/5 text-left text-xs font-mono overflow-hidden">
        {/* Code view (3 cols) */}
        <div className="col-span-3 p-4 bg-zinc-950/90 overflow-hidden relative flex flex-col justify-between">
          {/* Scanning laser sweep */}
          <motion.div 
            className="absolute left-0 w-full h-[1px] bg-primary/30 pointer-events-none z-10"
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <div className="space-y-1">
            {activeCode.map((line, i) => (
              <div 
                key={i} 
                className={`flex transition-colors duration-300 ${
                  i === codeLineIndex ? "bg-primary/10 text-primary font-bold" : "text-zinc-400"
                }`}
              >
                <span className="w-6 text-right pr-2 text-[8px] text-zinc-600 select-none">{i + 1}</span>
                <span className="text-[9px] break-all leading-normal whitespace-pre-wrap">{line}</span>
              </div>
            ))}
          </div>
          
          {/* Animated floating console indicator */}
          <div className="text-[8px] text-primary/40 border-t border-white/5 pt-2 select-none uppercase tracking-widest flex justify-between items-center">
            <span>[CMD INTERFACE]</span>
            <span className="animate-pulse">● RUNNING</span>
          </div>
        </div>

        {/* Telemetry view (2 cols) */}
        <div className="col-span-2 p-4 bg-zinc-900/60 flex flex-col justify-between text-zinc-300 relative select-none">
          <div className="space-y-4">
            <div className="text-[8px] text-primary/60 uppercase tracking-wider font-bold">
              // DIAGNOSTICS HUD
            </div>
            
            {/* Metrics */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[8px] mb-1 font-mono">
                  <span>CPU LOAD</span>
                  <span className={isConsoleHovered ? "text-primary animate-pulse font-bold" : ""}>
                    {isConsoleHovered ? "74%" : "28%"}
                  </span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: isConsoleHovered ? "74%" : "28%" }}
                    transition={{ type: "spring", stiffness: 60 }}
                    className="h-full bg-gradient-to-r from-primary to-violet-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] mb-1 font-mono">
                  <span>SYS MEM</span>
                  <span className={isConsoleHovered ? "text-primary font-bold" : ""}>
                    {isConsoleHovered ? "42%" : "35%"}
                  </span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: isConsoleHovered ? "42%" : "35%" }}
                    transition={{ type: "spring", stiffness: 60 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-primary"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] mb-1 font-mono">
                  <span>PORT NET</span>
                  <span className="text-emerald-400 font-bold">443 / SSL</span>
                </div>
                <div className="text-[7px] text-zinc-500 uppercase">Gateway is active</div>
              </div>

              <div className="pt-1">
                <div className="text-[7px] text-zinc-500 font-bold mb-0.5 uppercase">// SECURITY STATE</div>
                <div className="text-[8px] text-emerald-400 font-bold tracking-widest flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  SECURE_PASS
                </div>
              </div>
            </div>
          </div>

          <div className="text-[7px] font-mono text-zinc-500 border-t border-white/5 pt-2 uppercase">
            INTEGRITY: 99.8%<br />
            NODE_ADDR: 0x2A1C
          </div>
        </div>
      </div>
    </div>
  );
}

const softSkills = [
  {
    icon: Lightbulb,
    label: "Analytical Thinking",
    description: "Breaking down complex problems into structured solutions",
    color: "violet" as const,
  },
  {
    icon: Users,
    label: "Collaboration",
    description: "Working effectively in teams with shared ownership",
    color: "cyan" as const,
  },
  {
    icon: Heart,
    label: "Communication",
    description: "Explaining technical ideas clearly and confidently",
    color: "amber" as const,
  },
  {
    icon: Target,
    label: "Execution",
    description: "Delivering features end-to-end with accountability",
    color: "violet" as const,
  },
];

const getIconComponent = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) return IconComponent;
  
  if (iconName === "GraduationCap") return GraduationCap;
  if (iconName === "MapPin") return MapPin;
  if (iconName === "Calendar") return Calendar;
  if (iconName === "Code") return Code;
  if (iconName === "Layers") return Layers;
  if (iconName === "Brain") return Brain;
  if (iconName === "Shield") return Shield;
  return GraduationCap;
};

export default function About() {
  const { content } = useContentStore();
  const { profile, about, timeline } = content;

  // States to track custom HUD coordinates & iridescence
  const [hudCoords, setHudCoords] = useState<{ x: number; y: number; azimuth: number; range: number } | null>(null);
  const [bioGradientAngle, setBioGradientAngle] = useState(135);
  const [hoveredStrength, setHoveredStrength] = useState<number | null>(null);

  const mainCardRef = useRef<HTMLDivElement>(null);

  const handleMainCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainCardRef.current) return;
    const rect = mainCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;

    let az = Math.round((Math.atan2(dy, dx) * 180) / Math.PI + 90);
    if (az < 0) az += 360;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const range = Math.min(100, Math.round((dist / (rect.width / 2)) * 100));

    setHudCoords({ x, y, azimuth: az, range });
  };

  const handleBioCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const angle = Math.round((Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI + 180);
    setBioGradientAngle(angle);
  };

  // Ref for timeline scroll animation
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Sort timeline events by order
  const sortedTimeline = [...timeline].sort((a, b) => a.order - b.order);

  return (
    <PageTransition>
      <section className="section-padding overflow-x-hidden relative min-h-screen">
        <div className="container-custom">

          <SectionHeading
            title="About Me"
            subtitle="My journey, strengths, and engineering mindset"
          />

          {/* ================= HERO STACK ================= */}
          <div className="relative flex justify-center mb-20 md:mb-32 w-full overflow-hidden py-10 px-4">

            {/* Ambient glow */}
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              <div className="w-[280px] sm:w-[560px] h-[280px] sm:h-[560px] rounded-full bg-primary/15 blur-[100px] sm:blur-[180px]" />
            </div>

            {/* Back layered cards */}
            <div className="absolute w-[290px] xs:w-[340px] sm:w-[380px] h-[370px] xs:h-[430px] sm:h-[480px] rounded-[2.5rem] 
                            bg-gradient-to-br from-zinc-300/30 to-zinc-400/15 dark:from-zinc-700/20 dark:to-zinc-800/10 
                            rotate-[-6deg] sm:rotate-[-12deg] pointer-events-none transition-transform duration-300" />

            <div className="absolute w-[290px] xs:w-[340px] sm:w-[380px] h-[370px] xs:h-[430px] sm:h-[480px] rounded-[2.5rem] 
                            bg-gradient-to-br from-zinc-400/30 to-zinc-500/15 dark:from-zinc-800/20 dark:to-zinc-900/10 
                            rotate-[4deg] sm:rotate-[8deg] pointer-events-none transition-transform duration-300" />

            {/* Main card with 3D Tilt & Glow (Bio-Console) */}
            <div 
              ref={mainCardRef}
              onMouseMove={handleMainCardMouseMove}
              onMouseLeave={() => setHudCoords(null)}
              className="relative w-[310px] xs:w-[360px] sm:w-[400px] h-[400px] xs:h-[460px] sm:h-[520px] rounded-[2.5rem] overflow-hidden"
            >
              <GlowCard 
                glowColor="violet" 
                enableTilt 
                className="w-full h-full p-0 flex items-center justify-center relative cursor-default"
              >
                {/* Cyber Brackets overlay */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/40 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

                {/* Scanline Sweep Animation */}
                <motion.div 
                  className="absolute left-0 w-full h-[1px] bg-primary/25 pointer-events-none z-20"
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute top-4 left-6 text-[8px] font-mono text-primary/45 uppercase tracking-wider hidden sm:block select-none">
                  // SECURE_BIO: NITIN_CORE_01
                </div>

                <div className="absolute top-4 right-6 text-[8px] font-mono text-primary/45 text-right uppercase tracking-wider hidden sm:block select-none">
                  ACCESS: LVL_5<br />
                  SYS: STABLE
                </div>

                <div className="flex flex-col items-center justify-center w-full h-full relative px-6">
                  {/* ===== CENTER AVATAR ===== */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[7rem] mb-8"
                  >
                    {profile.avatarUrl ? (
                      <img src={profile.avatarUrl} alt="Avatar" className="w-36 h-36 rounded-full object-cover border-4 border-primary/20 shadow-2xl" />
                    ) : (
                      "🧔🏻"
                    )}
                  </motion.div>

                  {/* ===== FLOATING CORNER CHIPS ===== */}

                  {/* Top Left */}
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-16 left-2 sm:left-4 scale-90 sm:scale-100 premium-chip cursor-default select-none text-[10px] origin-left"
                  >
                    🛡️ Ethical Hacker
                  </motion.span>

                  {/* Top Right */}
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-16 right-2 sm:right-4 scale-90 sm:scale-100 premium-chip cursor-default select-none text-[10px] origin-right"
                  >
                    🤖 Gen-AI Engineer
                  </motion.span>

                  {/* Bottom Left */}
                  <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                    className="absolute bottom-20 left-2 sm:left-4 scale-90 sm:scale-100 premium-chip cursor-default select-none text-[10px] origin-left"
                  >
                    ⚡ Full-Stack Dev
                  </motion.span>

                  {/* Bottom Right */}
                  <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                    className="absolute bottom-20 right-2 sm:right-4 scale-90 sm:scale-100 premium-chip cursor-default select-none text-[10px] origin-right"
                  >
                    🎓 CSE Student
                  </motion.span>

                  {/* Operational Telemetry Grid */}
                  <div className="w-full mt-4 grid grid-cols-2 gap-2 text-[8px] font-mono text-primary/60 border-t border-border/30 dark:border-white/5 pt-3 select-none">
                    <div>THREAT RATIO: 0.0%</div>
                    <div>SEC_GATEWAY: ACTIVE</div>
                    <div>ENCRYPT_KEY: AES_GCM_256</div>
                    <div>SYSTEM STATUS: NOMINAL</div>
                  </div>
                </div>

                {/* ─── Real-Time Mouse-Tracking Sonar Sweep Target line ─── */}
                {hudCoords && (
                  <div className="absolute inset-0 pointer-events-none z-20">
                    {/* Dotted vector line from center to cursor */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line
                        x1="200"
                        y1="230"
                        x2={hudCoords.x}
                        y2={hudCoords.y}
                        stroke="hsl(var(--primary) / 0.3)"
                        strokeWidth="1"
                        strokeDasharray="2 4"
                      />
                      {/* Targeting crosshair ring */}
                      <circle
                        cx={hudCoords.x}
                        cy={hudCoords.y}
                        r="8"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                      />
                    </svg>
                    {/* Dynamic Coordinates HUD readout text */}
                    <div 
                      className="absolute text-[8px] font-mono font-bold text-primary"
                      style={{ left: hudCoords.x + 12, top: hudCoords.y - 12 }}
                    >
                      AZ: {hudCoords.azimuth}° | RG: {hudCoords.range}%
                    </div>
                  </div>
                )}
              </GlowCard>
            </div>
          </div>

          {/* ================= BIO ================= */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-20 md:mb-28">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="aspect-square max-w-md mx-auto relative cursor-default"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-zinc-400/15 to-zinc-600/15 blur-2xl pointer-events-none animate-pulse" />
                <GlowCard 
                  glowColor="cyan" 
                  enableTilt 
                  className="relative rounded-3xl flex items-center justify-center h-full p-0 transition-colors duration-300 overflow-hidden border border-border/30 dark:border-white/[0.05]"
                >
                  <IDETerminalConsole />
                </GlowCard>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold">
                Hi, I’m <span className="gradient-text">{profile.name}</span>
              </h3>

              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                {about.quickFacts.map((fact, index) => {
                  const Icon = getIconComponent(fact.icon);
                  return (
                    <div key={index} className="flex items-center gap-2 bg-muted/60 dark:bg-muted/30 px-3 py-1.5 rounded-full border border-border/60 dark:border-border/20">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{fact.label}: {fact.value}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ================= TIMELINE ================= */}
          <div className="mb-20 md:mb-28 relative">
            
            <h3 className="text-2xl font-bold text-center mb-10 md:mb-14 relative z-10">
              Journey So Far
            </h3>
            <div ref={timelineRef} className="relative z-10">
              {/* Background Line (Thin Clean Style) */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border/30 dark:bg-zinc-800/50" />
              
              {/* Fiber-Optic Dynamic Pulse Stream (Moving light packets running down the line) */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  className="w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent"
                />
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.8 }}
                  className="w-full h-20 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
                />
              </div>
              
              {/* Glowing Scroll Progress Line */}
              <motion.div 
                style={{ height: lineHeight }}
                className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-[2px] bg-gradient-to-b from-primary via-primary/60 to-primary/20 shadow-[0_0_8px_hsl(var(--primary))]"
              />

              {/* Scroll-Traveling Targeting Reticle Scanner */}
              <motion.div
                style={{ top: lineHeight }}
                className="absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                {/* Core traveling laser dot */}
                <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-background dark:border-black shadow-[0_0_12px_hsl(var(--primary))]" />
                
                {/* Sonar scanning ring */}
                <motion.div 
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-3.5 -left-3.5 w-10.5 h-10.5 rounded-full border border-primary/45"
                />
                
                {/* Rotating targeting ticks */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -left-2 w-7.5 h-7.5 rounded-full border border-dashed border-primary/50"
                />
              </motion.div>
              {/* Cyber Circuit Grid Traces SVG Overlay behind timeline items */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] overflow-hidden -z-10">
                <svg width="100%" height="100%" className="text-primary">
                  <defs>
                    <pattern id="gridPatternTimeline" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#gridPatternTimeline)" />
                </svg>
              </div>

              <div className="space-y-12">
                {sortedTimeline.map((item, index) => {
                  const Icon = getIconComponent(item.icon || "GraduationCap");
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.06 }}
                      className={`relative flex ${
                        index % 2 === 0
                          ? "md:flex-row"
                          : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Pulse point */}
                      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background dark:bg-black border-2 border-primary flex items-center justify-center z-10">
                        <motion.div 
                          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute w-full h-full rounded-full bg-primary/40 pointer-events-none"
                        />
                      </div>

                      <div
                        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                          index % 2 === 0
                            ? "md:mr-auto md:pr-8"
                            : "md:ml-auto md:pl-8"
                        }`}
                      >
                        <GlowCard glowColor={index % 2 === 0 ? "violet" : "cyan"} enableTilt className="rounded-xl p-6 relative group border-border/30 dark:border-white/[0.05]">
                          {/* Laser border brackets */}
                          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary/20 group-hover:border-primary/50 transition-colors" />
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-primary/20 group-hover:border-primary/50 transition-colors" />
                          <div className="absolute top-3 right-4 text-[7px] font-mono text-primary/40 uppercase tracking-widest hidden sm:block select-none">
                            [ADDR: 0x{(index * 16 + 4096).toString(16).toUpperCase()}]
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-primary font-mono tracking-widest">
                              // SYS_EPOCH_{item.year.split(" – ").pop()?.split(" ").pop()}
                            </span>
                            <span className="text-[7px] font-mono text-emerald-400 border border-emerald-500/20 px-1 py-0.5 rounded bg-emerald-500/5 select-none tracking-widest">
                              NODE_INTEGRITY: PASS
                            </span>
                          </div>
                          
                          {/* Decrypted Glitch Scramble title on hover */}
                          <h4 className="text-base font-bold mt-2.5 flex items-center gap-2">
                            <GlitchText text={item.title} />
                            <Icon className="h-4 w-4 text-primary shrink-0" />
                          </h4>

                          {item.institution && (
                            <p className="text-xs font-mono text-muted-foreground/80 mt-0.5">
                              {item.institution}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Interactive milestone stats panel */}
                          <div className="mt-4 pt-3 border-t border-border/20 dark:border-white/5 grid grid-cols-2 gap-2 text-[8px] font-mono text-muted-foreground select-none">
                            <div>PORT_LINK: {index % 2 === 0 ? "8080/TCP" : "443/HTTPS"}</div>
                            <div>LOAD_SPEED: {index % 2 === 0 ? "1.2 Gbps" : "866 Mbps"}</div>
                            <div className="col-span-2">
                              <div className="flex justify-between mb-0.5">
                                <span>MILESTONE_WEIGHT</span>
                                <span>{index % 2 === 0 ? "95%" : "88%"}</span>
                              </div>
                              <div className="h-0.5 bg-muted dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: index % 2 === 0 ? "95%" : "88%" }} />
                              </div>
                            </div>
                          </div>

                          {item.linkUrl && (
                            <div className="mt-4 pt-3 border-t border-border/20 dark:border-white/5 flex">
                              <a
                                href={item.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-mono"
                              >
                                <LucideIcons.ExternalLink className="h-3.5 w-3.5" />
                                // VERIFY_CREDENTIAL
                              </a>
                            </div>
                          )}
                        </GlowCard>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= CORE STRENGTHS ================= */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-14">
              Core Strengths
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredStrength(index)}
                  onMouseLeave={() => setHoveredStrength(null)}
                  className="h-full"
                >
                  <GlowCard glowColor={skill.color} enableTilt className="flex flex-col h-full text-center relative overflow-hidden">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <skill.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{skill.label}</h4>

                    {/* Active/Passive Oscilloscope wave overlay */}
                    <MiniOscilloscope active={hoveredStrength === index} />

                    <p className="text-sm text-muted-foreground mt-1">
                      {skill.description}
                    </p>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
