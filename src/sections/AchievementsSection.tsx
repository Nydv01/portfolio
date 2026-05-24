import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Award, GitBranch, BadgeCheck, ExternalLink, LucideIcon } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Award,
  GitBranch,
  BadgeCheck,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};

function AnimatedCounter({ endStr, duration = 2 }: { endStr: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  
  // Extract number and suffix (like "+")
  const numMatch = endStr.match(/\d+/);
  const endNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = endStr.replace(/\d+/g, '');

  useEffect(() => {
    if (!isInView || endNum === 0) return;
    let start = 0;
    const step = endNum / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= endNum) { 
        setCount(endNum); 
        clearInterval(timer); 
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, endNum, duration]);

  return (
    <div ref={ref} className="font-display font-bold">
      <span className="text-4xl sm:text-5xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{count}</span>
      <span className="text-2xl sm:text-3xl text-violet-400">{suffix}</span>
    </div>
  );
}

export default function AchievementsSection() {
  const { content } = useContentStore();
  const { achievements, certifications } = content;
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section id="achievements" ref={sectionRef} className="section-padding container-custom relative z-10">
      <motion.div 
        className="mb-16 md:mb-20 text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Achievements & <span className="gradient-text">Credentials</span>
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto text-lg">
          Quantifiable impact and industry-recognized certifications.
        </p>
      </motion.div>

      {/* Stats Counters */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {achievements.map((ach) => {
          const Icon = iconMap[ach.icon || 'Code'] || Code;
          return (
            <motion.div 
              key={ach.id}
              variants={fadeUp}
              whileHover={prefersReduced ? {} : { y: -5, scale: 1.02 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center group border-white/[0.05] hover:border-violet-500/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-colors">
                <Icon className="w-6 h-6 text-violet-400" />
              </div>
              <AnimatedCounter endStr={ach.title} />
              <p className="text-sm text-white/50 mt-2 uppercase tracking-wider font-medium">{ach.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * idx + 0.3 } }
            }}
            whileHover={prefersReduced ? {} : { y: -5 }}
            className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col h-full border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 relative overflow-hidden group"
          >
            {/* Gradient Top Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            
            {/* Energy Sweep */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 bg-white/[0.05] rounded-full text-xs font-mono text-white/60">
                {cert.year}
              </div>
              <BadgeCheck className="w-6 h-6 text-cyan-400 opacity-80" />
            </div>

            <h3 className="text-xl font-display font-bold text-white/90 mb-2 leading-tight group-hover:text-white transition-colors">{cert.title}</h3>
            <p className="text-violet-400 text-sm font-medium mb-6">{cert.issuer}</p>
            
            <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">
              {cert.description}
            </p>

            <div className="space-y-4 mt-auto">
              <div className="flex flex-wrap gap-2">
                {cert.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="text-[11px] px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.05] text-white/50">
                    {skill}
                  </span>
                ))}
              </div>

              {cert.verifyUrl && (
                <a 
                  href={cert.verifyUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors mt-4"
                >
                  Verify Credential <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
