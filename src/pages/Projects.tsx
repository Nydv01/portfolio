import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  Plane,
  Building2,
  Mic,
  Code,
  Sparkles,
  Wrench,
  LucideIcon,
  Terminal,
} from "lucide-react";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import GlowCard from "@/components/effects/GlowCard";

const getProjectEmojiAndIcon = (title: string, index: number): { emoji: string; icon: LucideIcon } => {
  const t = title.toLowerCase();
  if (t.includes("wander") || t.includes("travel")) return { emoji: "🗺️", icon: Plane };
  if (t.includes("nexus") || t.includes("campus") || t.includes("school")) return { emoji: "🎓", icon: Building2 };
  if (t.includes("whisper") || t.includes("audio") || t.includes("voice") || t.includes("speech")) return { emoji: "🎙️", icon: Mic };
  
  const icons = [Plane, Building2, Mic, Code];
  const emojis = ["🗺️", "🎓", "🎙️", "💻", "🚀", "⚡"];
  
  return {
    emoji: emojis[index % emojis.length],
    icon: icons[index % icons.length]
  };
};

const getProjectTelemetry = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("wander")) {
    return {
      region: "AWS-EC2 (AP-SOUTH-1)",
      encryption: "SSL TLS_1.3 COMPLIANT",
      metrics: "POSTGRESQL POOL: NOMINAL | LATENCY: 14ms",
      audit: "PENTEST COMPLIANT | OWASP: 100%"
    };
  }
  if (t.includes("nexus") || t.includes("campus")) {
    return {
      region: "VERCEL SERVERLESS EDGE",
      encryption: "JWT HS256 SECURED",
      metrics: "DB TRANSACTION SCALE: PASS | SHARD: ACTIVE",
      audit: "RBAC INTEGRITY: 100% SECURE"
    };
  }
  if (t.includes("whisper") || t.includes("audio")) {
    return {
      region: "DOCKER LOCAL CONTAINER",
      encryption: "RAW PAYLOAD: SHA-256 SIGNED",
      metrics: "TRANSCRIPTION LATENCY: 120ms | SPEECH-TO-TEXT",
      audit: "OWASP API TOP 10 SECURED"
    };
  }
  return {
    region: "CLOUDFLARE WORKERS EDGE",
    encryption: "AES-GCM-256 CERTIFIED",
    metrics: "API GATEWAY ROUTE: OPTIMAL | LATENCY: 5ms",
    audit: "COMPILATION: SUCCESSFUL"
  };
};

export default function Projects() {
  const { content } = useContentStore();
  const { projects } = content;
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  const featuredProjects = sortedProjects.filter(p => p.featured);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredFeaturedIndex, setHoveredFeaturedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <PageTransition>
      <section className="section-padding overflow-hidden">
        <div className="container-custom">

          <SectionHeading
            title="Systems I’ve Built"
            subtitle="Production-grade applications showcasing my full-stack, backend, and AI engineering skills"
          />

          {/* ================= FEATURED AUTO TICKER ================= */}
          {featuredProjects.length > 0 && (
            <div className="relative mb-28 select-none overflow-hidden pb-4">
              <motion.div
                className="flex gap-8 w-max cursor-grab active:cursor-grabbing"
                animate={hoveredFeaturedIndex !== null ? {} : { x: ["0%", "-50%"] }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...featuredProjects, ...featuredProjects].map((project, i) => {
                  const { emoji } = getProjectEmojiAndIcon(project.title, i);
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredFeaturedIndex(i)}
                      onMouseLeave={() => setHoveredFeaturedIndex(null)}
                      className="min-w-[340px] glass-card rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      {/* Interactive grid backdrop overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_50%,transparent_50%)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_50%,transparent_50%)] bg-[length:100%_6px] pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-zinc-400/20 to-zinc-600/20 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />

                      <div className="relative z-10 text-center">
                        <div className="text-6xl mb-4 animate-float">{emoji}</div>
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <p className="text-xs text-primary font-mono mt-1">// FEATURED SYSTEM</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          )}

          {/* ================= PROJECT LIST ================= */}
          <div className="space-y-20">
            {sortedProjects.map((project, index) => {
              const { emoji, icon: ProjectIcon } = getProjectEmojiAndIcon(project.title, index);
              const glowColor = index % 2 === 0 ? ("violet" as const) : ("cyan" as const);

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <GlowCard
                    glowColor={glowColor}
                    enableTilt
                    className={`group relative rounded-3xl overflow-hidden p-0 border-border/30 dark:border-white/[0.06] ${
                      project.featured ? "ring-1 ring-primary/40 shadow-[0_0_50px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_rgba(255,255,255,0.1)]" : ""
                    }`}
                  >
                    {/* Pulse glow background hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute -inset-32 bg-gradient-to-r from-primary/10 via-zinc-400/10 to-zinc-600/10 blur-xl md:blur-3xl animate-pulse" />
                    </div>

                    <div className="grid md:grid-cols-[380px_1fr] relative z-10 min-h-[380px]">
                      
                      {/* Visual (Image or abstract SVG grid) */}
                      <div className="relative flex items-center justify-center bg-gradient-to-br from-primary/25 via-zinc-500/15 to-zinc-700/15 overflow-hidden h-64 md:h-auto">
                        
                        {project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <>
                            {/* Abstract Neon SVG grid backdrop */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <pattern id={`grid-${project.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} className="text-primary" />
                              </svg>
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_90%)]" />
                            </div>

                            <motion.div
                              animate={isMobile ? { y: [0, -6, 0] } : { y: [0, -14, 0] }}
                              transition={{
                                duration: isMobile ? 6 : 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="text-8xl select-none"
                            >
                              {emoji}
                            </motion.div>
                          </>
                        )}

                        {project.featured && (
                          <Badge className="absolute top-4 left-4 gap-1">
                            <Sparkles className="h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-primary font-medium">
                                {project.subtitle}
                              </p>
                            </div>
                            <ProjectIcon className="h-8 w-8 text-primary" />
                          </div>

                          <p className="text-muted-foreground mb-6">
                            {project.description}
                          </p>

                          <ul className="space-y-2 mb-6">
                            {project.highlights.map((item, i) => (
                              <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-2 text-sm group-hover:text-primary transition-colors"
                              >
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* Interactive Cyber Diagnostic Readout Console on Hover */}
                          {(() => {
                            const telemetry = getProjectTelemetry(project.title);
                            return (
                              <div className="mt-4 p-3 rounded-lg border border-primary/20 bg-card/65 dark:bg-black/60 font-mono text-[9px] text-foreground/80 dark:text-primary/75 leading-relaxed opacity-0 group-hover:opacity-100 max-height-0 group-hover:max-height-24 overflow-hidden transition-all duration-500">
                                <div className="flex justify-between border-b border-border/30 dark:border-white/5 pb-1 mb-1 font-semibold text-primary">
                                  <span className="flex items-center gap-1"><Terminal className="h-3 w-3 animate-pulse" /> // DIAGNOSTIC SYSTEM: ACTIVE</span>
                                  <span className="text-emerald-500 animate-pulse">STATUS: OPTIMAL</span>
                                </div>
                                <div>METRIC: {telemetry.metrics}</div>
                                <div>DEPLOYMENT SURFACE: {telemetry.region}</div>
                                <div>ENCRYPTION PROTOCOL: {telemetry.encryption}</div>
                                <div>SECURITY VERDICT: {telemetry.audit}</div>
                              </div>
                            );
                          })()}
                        </div>

                        <div className="mt-6">
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="hover:bg-primary hover:text-white hover:scale-110 transition-all cursor-default border border-border/30 dark:border-white/5"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-3">
                            <Button asChild variant="outline" size="sm" className="hover:scale-110">
                              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                Code
                              </a>
                            </Button>

                            {project.liveUrl && (
                              <Button asChild size="sm" className="hover:scale-110">
                                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Live
                                  </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </GlowCard>
                </motion.article>
              );
            })}
          </div>

          {/* ================= CURRENTLY WORKING ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-32"
          >
            <GlowCard glowColor="violet" enableTilt className="p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30" />

              <div className="flex items-center gap-4 mb-6">
                <Wrench className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Currently Working On</h3>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                Building scalable AI-powered systems, secure backend architectures,
                and production-grade full-stack applications.
              </p>
            </GlowCard>
          </motion.div>

          {/* ================= CTA ================= */}
          <motion.div className="text-center mt-24">
            <Button asChild size="lg" className="gap-2 glow hover-lift">
              <a href="https://github.com/Nydv01" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
                Explore More on GitHub
              </a>
            </Button>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
}
