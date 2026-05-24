/* =========================================================
   EXPERIENCE SECTION — "The Journey"
   A unified timeline merging learning landmarks, education,
   and professional certifications into a singular visual flow.
   Features scroll-linked SVG progress indicators and GlowCards.
========================================================= */

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Code, Layers, Brain, Shield, Award, Calendar, BookOpen, ExternalLink, LucideIcon } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';
import GlowCard from '@/components/effects/GlowCard';
import { fadeUp, easings } from '@/lib/animations';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Code,
  Layers,
  Brain,
  Shield,
  Award,
};

export default function ExperienceSection() {
  const { content } = useContentStore();
  const { timeline, certifications } = content;
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  interface MergedEvent {
    id: string;
    year: string;
    title: string;
    institution?: string;
    description: string;
    icon?: string;
    order: number;
    type: 'timeline' | 'certification';
    verifyUrl?: string;
    highlights?: string[];
  }

  // Combine timeline events and certifications, sort by year/order
  // Since certifications have years (e.g. "2024"), we can map them to timeline-like nodes.
  const mergedTimeline: MergedEvent[] = [
    ...timeline.map(item => ({ ...item, type: 'timeline' as const })),
    ...certifications.map(cert => ({
      id: cert.id,
      year: cert.year,
      title: cert.title,
      institution: cert.issuer,
      description: cert.description,
      icon: 'Award',
      order: cert.order,
      type: 'certification' as const,
      verifyUrl: cert.verifyUrl,
      highlights: cert.highlights,
    })),
  ].sort((a, b) => {
    // Sort descending by year first, then by order
    const yrA = parseInt(a.year.split('-')[0]) || 0;
    const yrB = parseInt(b.year.split('-')[0]) || 0;
    if (yrB !== yrA) return yrB - yrA;
    return (a.order || 0) - (b.order || 0);
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pathLength = prefersReduced ? 1 : smoothProgress;

  return (
    <section id="experience" ref={sectionRef} className="section-padding container-custom relative z-10">
      
      {/* Section Title */}
      <motion.div 
        className="text-center mb-20 md:mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        variants={fadeUp}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-3 h-[1px] bg-violet-500" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400">The Journey</span>
          <div className="w-3 h-[1px] bg-violet-500" />
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white/95">
          Experience & <span className="gradient-text">Milestones</span>
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
          My path of continuous learning, professional certifications, and academic background.
        </p>
      </motion.div>

      {/* Timeline container */}
      <div className="relative max-w-5xl mx-auto" ref={containerRef}>
        
        {/* Scroll Spine Line (Centered on desktop, left on mobile) */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1.5px] -translate-x-1/2 bg-white/[0.04]">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent"
            style={{ 
              height: '100%',
              scaleY: pathLength,
              transformOrigin: 'top'
            }}
          />
        </div>

        <div className="space-y-12 md:space-y-20">
          {mergedTimeline.map((event, idx) => {
            const Icon = iconMap[event.icon || 'Code'] || Code;
            const isEven = idx % 2 === 0;
            const isCert = event.type === 'certification';

            return (
              <div key={event.id} className="relative flex items-start md:justify-between flex-col md:flex-row group pl-14 md:pl-0">
                
                {/* Node marker (glowing bullet on the vertical spine line) */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 top-1.5 md:top-8">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className={`w-3.5 h-3.5 rounded-full bg-[hsl(225,15%,3%)] border-2 transition-all duration-300 relative ${
                      isCert 
                        ? 'border-cyan-400/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(59,210,246,0.6)]' 
                        : 'border-violet-500/40 group-hover:border-violet-500 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.6)]'
                    }`}
                  >
                    <div className={`absolute inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isCert ? 'bg-cyan-400' : 'bg-violet-500'
                    }`} />
                  </motion.div>
                </div>

                {/* Left Side (Desktop only metadata display - shows on opposite side of card) */}
                <div className={`w-full md:w-[44%] ${isEven ? 'md:text-right md:pr-10' : 'md:order-2 md:text-left md:pl-10'} hidden md:block pt-6`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.6, ease: easings.premium }}
                    className="space-y-2"
                  >
                    <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold font-mono tracking-wider ${
                      isCert 
                        ? 'bg-cyan-500/10 border border-cyan-500/25 text-cyan-300' 
                        : 'bg-violet-500/10 border border-violet-500/25 text-violet-300'
                    }`}>
                      {event.year}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white/95">{event.title}</h3>
                    {event.institution && (
                      <p className="text-xs font-mono text-white/40 uppercase tracking-widest">{event.institution}</p>
                    )}
                  </motion.div>
                </div>

                {/* Mobile & Card Side */}
                <motion.div 
                  className={`w-full md:w-[44%] ${isEven ? 'md:order-2 md:pl-10' : 'md:pr-10'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: 0.05, ease: easings.premium }}
                >
                  <GlowCard 
                    glowColor={isCert ? 'cyan' : 'violet'} 
                    enableTilt={true}
                    className="p-6 relative overflow-hidden border-white/[0.05] hover:border-white/[0.12] transition-colors"
                  >
                    
                    {/* Header display inside card (Visible on mobile/tablet) */}
                    <div className="flex items-center justify-between gap-4 mb-4 md:hidden">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-wider ${
                        isCert 
                          ? 'bg-cyan-500/10 border border-cyan-500/25 text-cyan-300' 
                          : 'bg-violet-500/10 border border-violet-500/25 text-violet-300'
                      }`}>
                        {event.year}
                      </span>
                    </div>

                    <div className="md:hidden mb-3">
                      <h4 className="text-lg font-display font-bold text-white/95">{event.title}</h4>
                      {event.institution && (
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{event.institution}</p>
                      )}
                    </div>

                    {/* Card Content Icon Block */}
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 bg-white/[0.02]`}>
                        <Icon className={`w-4 h-4 ${isCert ? 'text-cyan-400' : 'text-violet-400'}`} />
                      </div>
                      
                      <div className="space-y-3 flex-1">
                        {/* Title & Institution for desktop */}
                        <div className="hidden md:block">
                          <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                            {isCert ? 'CERTIFICATION' : 'EDUCATION & EVENTS'}
                          </span>
                        </div>

                        <p className="text-sm text-white/50 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Certification Highlights or Badges */}
                        {isCert && event.highlights && (
                          <div className="flex flex-wrap gap-1.5 pt-1.5">
                            {event.highlights.map((h, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-cyan-950/20 border border-cyan-500/10 text-[10px] font-mono text-cyan-300/80">
                                {h}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Verify Credential CTA */}
                        {isCert && event.verifyUrl && (
                          <a
                            href={event.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold font-mono uppercase tracking-wider text-cyan-400/80 hover:text-cyan-300 transition-colors mt-2"
                          >
                            Verify Credential
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
