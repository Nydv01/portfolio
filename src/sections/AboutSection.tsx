/* =========================================================
   ABOUT SECTION — "The Person"
   Redesigned about section with cinematic typography,
   glassmorphic stats counters, floating code badge,
   philosophy card, and quick facts grid.
========================================================= */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Code, Sparkles, User, LucideIcon } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';
import { fadeUp, fadeLeft, fadeRight, easings } from '@/lib/animations';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  MapPin,
  Calendar,
  User,
};

export default function AboutSection() {
  const { content } = useContentStore();
  const { about, profile } = content;
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });

  return (
    <section id="about" ref={sectionRef} className="section-padding container-custom relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Visual / Portrait Glow */}
        <motion.div 
          className="lg:col-span-5 relative"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeLeft}
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden glass-panel-elevated group">
            {/* Ambient animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(225,15%,7%)] via-[hsl(262,30%,12%)] to-[hsl(185,30%,12%)]" />
            
            {/* Abstract visual monogram inside the glowing panel */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex flex-col items-center">
                {/* Glowing backdrop circle */}
                <div className="absolute inset-0 blur-3xl scale-[1.6] bg-gradient-to-tr from-violet-600/30 to-cyan-600/30 rounded-full animate-pulse-glow" />
                
                {/* Initial monogram */}
                <h2 className="font-display text-8xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent drop-shadow-2xl z-10 relative select-none">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </h2>
                
                <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-mono mt-4 relative z-10">
                  {profile.title.split(' & ')[0]}
                </span>
              </div>
            </div>

            {/* Sweep light effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          </div>
          
          {/* Floating Element */}
          <motion.div 
            className="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl flex items-center gap-3 border-violet-500/20 shadow-[0_0_40px_-5px_rgba(139,92,246,0.3)] z-20"
            animate={prefersReduced ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold font-mono">Writing Code</p>
              <p className="text-sm font-bold text-white/90">Since 2023</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Section Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-6 h-[1px] bg-violet-500" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400">About Me</span>
          </motion.div>

          <motion.h3 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white/90 leading-tight"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            {about.headline}
          </motion.h3>

          {/* Staggered Bio paragraphs */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
            }}
            className="space-y-6 text-base sm:text-lg text-white/50 leading-relaxed mb-10"
          >
            {about.paragraphs.map((p, idx) => (
              <motion.p key={idx} variants={fadeUp}>{p}</motion.p>
            ))}
          </motion.div>

          {/* Quick Facts Grid */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 border-t border-b border-white/[0.05] py-8"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
            }}
          >
            {about.quickFacts.map((fact, idx) => {
              const Icon = iconMap[fact.icon] || MapPin;
              return (
                <motion.div key={idx} variants={fadeUp} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-white/30">
                    <Icon className="w-4 h-4 text-violet-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider font-mono">{fact.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white/80">{fact.value}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Philosophy Spotlight Card */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeRight}
            whileHover={prefersReduced ? {} : { scale: 1.01 }}
            className="glass-panel p-6 sm:p-8 rounded-2xl border-white/[0.06] hover:border-violet-500/20 hover:shadow-[0_0_50px_-15px_rgba(139,92,246,0.15)] transition-all duration-500 group relative overflow-hidden"
          >
            {/* Spotlight backdrop */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-2xl rounded-full" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="mt-1 shrink-0">
                <Sparkles className="w-5 h-5 text-violet-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest font-mono mb-2">Engineering Philosophy</h4>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed italic">
                  "{about.philosophy}"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
