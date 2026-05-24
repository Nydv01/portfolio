/* =========================================================
   HERO SECTION — "The Arrival"
   Full-viewport cinematic landing with particle field,
   character-by-character text reveal, magnetic CTAs,
   and parallax depth layers.
========================================================= */

import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion, useIsMobile } from '@/hooks/usePortfolio';
import { staggerContainer, heroBadge, heroReveal, heroCTA, scrollIndicator, scrollBounce, easings } from '@/lib/animations';

/* ─── Character Reveal Sub-Component ─────────────────── */
function CharReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion();
  
  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.035,
            ease: easings.premium,
          }}
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Animated Counter ─────────────────────────────────── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-1">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-white/40 font-medium">{label}</div>
    </div>
  );
}

/* ─── Main Hero Section ────────────────────────────────── */
export default function HeroSection() {
  const { content } = useContentStore();
  const { hero, profile } = content;
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const handleScrollDown = useCallback(() => {
    // Scroll to next section (projects or about)
    const sections = ['projects', 'about', 'skills'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  }, []);

  const handleResume = useCallback(() => {
    if (profile.resumeUrl) {
      window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer');
    }
  }, [profile.resumeUrl]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ─── Background Layers ──────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReduced ? {} : { scale: bgScale }}
      >
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary violet orb — top right */}
          <motion.div
            className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(262 83% 58% / 0.4), transparent 70%)',
            }}
            animate={prefersReduced ? {} : { scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Cyan orb — bottom left */}
          <motion.div
            className="absolute -bottom-[15%] -left-[10%] w-[500px] h-[500px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, hsl(185 85% 55% / 0.3), transparent 70%)',
            }}
            animate={prefersReduced ? {} : { scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Warm accent orb — center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
            style={{
              background: 'radial-gradient(circle, hsl(38 92% 60% / 0.2), transparent 60%)',
            }}
          />
        </div>
      </motion.div>

      {/* ─── Gradient Overlays (Depth) ──────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[hsl(225,15%,3%)] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-60 bg-gradient-to-t from-[hsl(225,15%,3%)] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(225,15%,3%)_80%)]" />
      </div>

      {/* ─── Content ────────────────────────────────── */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        style={prefersReduced ? {} : { y: textY, opacity }}
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div variants={heroBadge} className="mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-sm text-white/50 backdrop-blur-md font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {hero.statusBadge}
          </span>
        </motion.div>

        {/* Main Heading — Character Reveal */}
        <motion.div variants={heroReveal} className="mb-6 sm:mb-8">
          <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]">
            <CharReveal
              text={hero.headline}
              className="text-white/90"
              delay={0.3}
            />
            {' '}
            <br className="hidden sm:block" />
            <CharReveal
              text={hero.highlightedText}
              className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              delay={0.8}
            />
            <br />
            <motion.span
              className="text-white/60 text-[0.55em] font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: easings.premium }}
            >
              {hero.subheadline}
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={heroCTA}
          className="text-base sm:text-lg text-white/35 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed"
        >
          {profile.bio[0]}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroCTA}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={handleScrollDown}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-base overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_50px_-8px_rgba(139,92,246,0.5)]"
          >
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center gap-2.5">
              <Sparkles className="w-4 h-4" />
              {hero.primaryCTA.text}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={handleResume}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white/60 font-semibold text-base hover:bg-white/[0.07] hover:border-white/[0.15] hover:text-white/90 transition-all duration-300"
          >
            <span className="flex items-center gap-2.5">
              <Download className="w-4 h-4" />
              {hero.secondaryCTA.text}
            </span>
          </motion.button>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          className="mt-16 sm:mt-20 flex items-center justify-center gap-8 sm:gap-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: easings.premium }}
        >
          <AnimatedStat value="6+" label="Projects" />
          <div className="w-px h-10 bg-white/10" />
          <AnimatedStat value="7+" label="Technologies" />
          <div className="w-px h-10 bg-white/10" />
          <AnimatedStat value="3+" label="Certifications" />
        </motion.div>
      </motion.div>

      {/* ─── Scroll Indicator ──────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        variants={scrollIndicator}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={handleScrollDown}
          {...scrollBounce}
          className="flex flex-col items-center gap-2 text-white/15 hover:text-white/30 transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.button>
      </motion.div>
    </section>
  );
}
