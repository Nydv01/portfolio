import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { CredlyBadgeCarousel } from "@/components/CredlyBadgeCarousel";

import {
  Award,
  ShieldCheck,
  Brain,
  Cloud,
  ExternalLink,
  BadgeCheck,
  Lock,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import GlowCard from "@/components/effects/GlowCard";

// Scramble text reveal
function GlitchText({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayValue, setDisplayValue] = useState(text);
  
  useEffect(() => {
    if (!trigger) {
      setDisplayValue(text);
      return;
    }
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
    }, 20);
    
    return () => clearInterval(interval);
  }, [text, trigger]);
  
  return <span className="font-sans font-semibold">{displayValue}</span>;
}

const getCertIcon = (title: string, index: number) => {
  const t = title.toLowerCase();
  if (t.includes("security") || t.includes("hack") || t.includes("lock")) return ShieldCheck;
  if (t.includes("ai") || t.includes("intelligence") || t.includes("generative")) return Brain;
  if (t.includes("iot") || t.includes("cloud") || t.includes("internet")) return Cloud;
  
  const icons = [ShieldCheck, Brain, Cloud, Award];
  return icons[index % icons.length];
};

const getAchievementIcon = (iconName?: string) => {
  const IconComponent = (LucideIcons as any)[iconName || "Award"];
  return IconComponent || Award;
};

// Sub-component to manage local iridescence and hover coordinates for each card
function CertificationCard({ cert, index }: { cert: any; index: number }) {
  const Icon = getCertIcon(cert.title, index);
  const glowColor = index % 3 === 0 ? "violet" as const : index % 3 === 1 ? "cyan" as const : "amber" as const;
  const [isHovered, setIsHovered] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(135);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI + 180);
    
    setGradientAngle(angle);
  };

  return (
    <motion.a
      href={cert.verifyUrl || "https://www.linkedin.com/in/ydv-nitin/details/certifications/"}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative h-full flex flex-col cursor-default"
    >
      <GlowCard 
        glowColor={glowColor} 
        enableTilt 
        className="h-full p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border-border/30 dark:border-white/[0.05]"
        style={isHovered ? {
          background: typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
            ? `linear-gradient(${gradientAngle}deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(230, 230, 235, 0.06) 100%)`
            : `linear-gradient(${gradientAngle}deg, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.02) 50%, rgba(0, 0, 0, 0.03) 100%)`
        } : {}}
      >
        {/* Cyber border brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/20" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/20" />
        
        <div className="absolute top-3 right-4 text-[7px] font-mono text-primary/45 uppercase tracking-widest hidden sm:block select-none">
          SHA_256 // SEC_KEY
        </div>

        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-primary to-zinc-500" />

        <div>
          <div className="flex items-start gap-4 mb-5">
            <motion.div 
              animate={isHovered ? { scale: 1.1, rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
            >
              <Icon className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                <GlitchText text={cert.title} trigger={isHovered} />
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {cert.description}
          </p>

          {cert.highlights && cert.highlights.length > 0 && (
            <ul className="space-y-2 mb-6">
              {cert.highlights.map((item: string) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Skills Gained */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="pt-4 border-t border-border/20">
            <p className="text-xs font-semibold mb-2 text-primary font-mono">// SKILLS GAINED</p>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="text-[10px] px-2 py-0.5 rounded bg-muted/40 border border-border/10 text-muted-foreground font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <ExternalLink className="absolute bottom-5 right-5 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition duration-300" />
      </GlowCard>
    </motion.a>
  );
}

const securityAICrossover = [
  "Prompt-level vulnerability analysis",
  "Secure GenAI API design",
  "AI-assisted threat detection",
  "Data leakage & model misuse prevention",
];

export default function Certifications() {
  const { content } = useContentStore();
  const { certifications, achievements } = content;
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanHash, setScanHash] = useState("SHA-256: VALIDATING...");

  const sortedCertifications = [...certifications].sort((a, b) => a.order - b.order);
  const sortedAchievements = [...achievements].sort((a, b) => a.order - b.order);

  useEffect(() => {
    setIsScanning(true);
    const randHash = "SHA-256: " + Array.from({ length: 16 }).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    setScanHash(randHash);
    const timer = setTimeout(() => setIsScanning(false), 550);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredCerts = sortedCertifications.filter(cert => 
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageTransition>
      <section className="section-padding bg-background">
        <div className="container-custom">

          <SectionHeading
            title="Certifications & Credentials"
            subtitle="Industry-recognized certifications and verified skill badges demonstrating applied expertise"
          />

          {/* ================= SEARCH & FILTER ================= */}
          <div className="max-w-md mx-auto mb-16 relative">
            <input
              type="text"
              placeholder="Search certifications or skills (e.g. Security)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-muted/60 px-5 py-3 outline-none border border-border/20 focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}

            {/* Futuristic filter status counter readout */}
            <div className="absolute -top-6 right-1 text-[8px] font-mono text-primary/70 uppercase tracking-wider hidden sm:block">
              [ VERIFIED STATUS: {filteredCerts.length}/{certifications.length} ENCRYPTED_KEYS ]
            </div>

            {/* Holographic Verification Scan Readout */}
            <div className="mt-3 font-mono text-[9px] text-center text-primary/70 h-4 flex items-center justify-center gap-2 select-none">
              {isScanning ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  <span className="animate-pulse">SCANNING CREDENTIAL REPOS... {scanHash}</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>ALL SIGNATURES VERIFIED SECURE // SEC_KEYS: {filteredCerts.length}</span>
                </>
              )}
            </div>
          </div>

          {/* ================= CERTIFICATIONS ================= */}
          <div className="mb-20 md:mb-32">
            <h3 className="text-2xl font-bold mb-12 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Professional Certifications
            </h3>

            {/* Grid wrapper with scanner overlay */}
            <div className="relative">
              {isScanning && (
                <motion.div 
                  className="absolute inset-x-0 h-[1.5px] bg-primary/40 z-20 pointer-events-none"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              )}
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                  {filteredCerts.map((cert, index) => (
                    <CertificationCard key={cert.id} cert={cert} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {filteredCerts.length === 0 && (
              <p className="text-center text-muted-foreground mt-12 font-mono">
                // SYSTEM ERROR: No credentials found matching "{searchQuery}".
              </p>
            )}
          </div>

          {/* ================= SKILL BADGES ================= */}
          <div className="mb-20 md:mb-32">
            <h3 className="text-2xl font-bold mb-12 flex items-center gap-2">
              <BadgeCheck className="h-6 w-6 text-primary" />
              Skill Badges (Credly)
            </h3>

            <div className="glass-card rounded-3xl p-10 relative overflow-hidden">
              {/* Matrix scanline */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />

              <CredlyBadgeCarousel />

              <div className="text-center mt-10 relative z-10">
                <Button asChild variant="outline" className="gap-2 hover-lift">
                  <a
                    href="https://www.credly.com/users/nitin-23bce10310"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Full Credly Profile
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* ================= SECURITY × AI ================= */}
          <div className="mb-20 md:mb-32 text-center">
            <h3 className="text-2xl font-bold mb-8 flex justify-center gap-2 items-center">
              <Lock className="text-primary h-6 w-6" />
              Security × AI Expertise
            </h3>

            <div className="max-w-3xl mx-auto">
              <GlowCard glowColor="cyan" enableTilt className="p-10 text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/20" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/20" />
                
                <ul className="space-y-4">
                  {securityAICrossover.map((item) => (
                    <li
                      key={item}
                      className="group flex items-start gap-3 text-muted-foreground hover:translate-x-1.5 transition-all duration-300"
                    >
                      <span className="mt-1 transition-colors group-hover:text-primary">
                        ✔
                      </span>
                      <span className="group-hover:text-foreground transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </div>
          </div>

          {/* ================= ACHIEVEMENTS ================= */}
          <div>
            <h3 className="text-2xl font-bold mb-12">Key Highlights</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedAchievements.map((item, index) => {
                const Icon = getAchievementIcon(item.icon);
                const glowColor = index % 3 === 0 ? "violet" as const : index % 3 === 1 ? "cyan" as const : "amber" as const;

                // Circular dial stats
                const radius = 28;
                const circumference = 2 * Math.PI * radius;
                const fills = [85, 60, 90, 75];
                const fillPercent = fills[index % 4];
                const offset = circumference - (fillPercent / 100) * circumference;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <GlowCard glowColor={glowColor} enableTilt className="p-6 h-full flex flex-col justify-between relative overflow-hidden border-border/30 dark:border-white/[0.05]">
                      {/* Brackets */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/20" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/20" />
                      
                      <div className="flex justify-between items-center text-[7px] font-mono text-muted-foreground/50 border-b border-border/20 dark:border-white/5 pb-2 mb-4 select-none">
                        <span>KEY_KPI_0x0{index + 1}</span>
                        <span className="text-emerald-500 font-bold">VERIFIED</span>
                      </div>

                      <div className="flex flex-col items-center text-center my-2 flex-1 justify-between">
                        {/* Circular Telemetry Dial */}
                        <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                          <svg className="w-full h-full transform -rotate-90">
                            {/* Base circle track */}
                            <circle
                              cx="40"
                              cy="40"
                              r={radius}
                              fill="none"
                              stroke="currentColor"
                              className="text-muted-foreground/10"
                              strokeWidth="3.5"
                            />
                            {/* Pulsing fill track */}
                            <motion.circle
                              cx="40"
                              cy="40"
                              r={radius}
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="3.5"
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              whileInView={{ strokeDashoffset: offset }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              strokeLinecap="round"
                              className="shadow-[0_0_8px_hsl(var(--primary))]"
                            />
                          </svg>
                          {/* Central Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary animate-pulse" />
                          </div>
                        </div>

                        <div>
                          <div className="text-2xl font-mono font-bold text-foreground mb-1">
                            {item.title}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-border/20 dark:border-white/5 pt-2 flex justify-between items-center text-[7px] font-mono text-primary/50 select-none uppercase">
                        <span>SIG: DETECTED</span>
                        <span>LOAD_OK</span>
                      </div>
                    </GlowCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= CTA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <p className="text-muted-foreground mb-6">
              All credentials are publicly verifiable and recruiter-friendly.
            </p>

            <div className="group inline-block relative">
              <Button
                asChild
                size="lg"
                className="gap-2 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] transition-all"
              >
                <a
                  href="https://linkedin.com/in/ydv-nitin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-5 w-5 group-hover:rotate-6 transition-transform" />
                  Verify on LinkedIn
                </a>
              </Button>

              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="rounded-xl bg-card px-4 py-2 text-xs border border-border shadow-lg">
                  Publicly verifiable recruiter profile
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
}
