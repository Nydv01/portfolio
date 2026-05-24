import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GraduationCap, Code, Layers, Brain, Shield, LucideIcon } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Code,
  Layers,
  Brain,
  Shield,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export default function TimelineSection() {
  const { content } = useContentStore();
  const { timeline } = content;
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathLength = prefersReduced ? 1 : smoothProgress;

  return (
    <section id="timeline" ref={sectionRef} className="section-padding container-custom relative z-10">
      <motion.div 
        className="text-center mb-20 md:mb-32"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        variants={fadeUp}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
          The <span className="gradient-text">Journey</span>
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto text-lg">
          My path of continuous learning, building, and engineering.
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto" ref={containerRef}>
        {/* DNA-inspired Connecting Spine */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/[0.05]">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-500 via-cyan-500 to-transparent"
            style={{ 
              height: '100%',
              scaleY: pathLength,
              transformOrigin: 'top'
            }}
          />
        </div>

        <div className="space-y-12 md:space-y-24">
          {timeline.map((event, idx) => {
            const Icon = iconMap[event.icon || 'Code'] || Code;
            const isEven = idx % 2 === 0;

            return (
              <div key={event.id} className="relative flex items-center md:justify-between flex-col md:flex-row group pl-16 md:pl-0">
                
                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10 top-0 md:top-1/2 md:-translate-y-1/2 mt-6 md:mt-0">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-20% 0px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-4 h-4 rounded-full bg-[hsl(225,15%,5%)] border-2 border-white/20 group-hover:border-violet-500 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all duration-300 relative"
                  >
                    <div className="absolute inset-0.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>

                {/* Left Side (Empty on Odd) */}
                <div className={`w-full md:w-[45%] ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:text-left md:pl-12'} mb-4 md:mb-0 hidden md:block`}>
                  {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20% 0px' }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                    >
                      <h3 className="text-2xl font-display font-bold text-white/90 mb-1">{event.title}</h3>
                      {event.institution && <p className="text-violet-400 font-medium mb-3">{event.institution}</p>}
                      <p className="text-white/60 leading-relaxed text-sm max-w-md ml-auto">{event.description}</p>
                    </motion.div>
                  )}
                  {!isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-20% 0px' }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                    >
                      <h3 className="text-2xl font-display font-bold text-white/90 mb-1">{event.title}</h3>
                      {event.institution && <p className="text-violet-400 font-medium mb-3">{event.institution}</p>}
                      <p className="text-white/60 leading-relaxed text-sm max-w-md">{event.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Mobile Content / Shared Card */}
                <motion.div 
                  className={`w-full md:w-[45%] ${isEven ? 'md:order-2 md:pl-12' : 'md:pr-12 md:text-right'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20% 0px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }}
                >
                  <div className={`glass-panel p-6 rounded-2xl border-white/[0.05] hover:border-violet-500/30 transition-colors duration-500 relative overflow-hidden ${!isEven ? 'md:ml-auto' : ''} max-w-md`}>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className={`flex items-center gap-4 mb-4 ${!isEven ? 'md:justify-end md:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wider">
                        {event.year}
                      </div>
                    </div>

                    {/* Mobile Only Content visibility */}
                    <div className="md:hidden">
                      <h3 className="text-xl font-display font-bold text-white/90 mb-1">{event.title}</h3>
                      {event.institution && <p className="text-violet-400 font-medium text-sm mb-3">{event.institution}</p>}
                      <p className="text-white/60 leading-relaxed text-sm">{event.description}</p>
                    </div>

                    <div className="hidden md:block">
                      <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay opacity-30 absolute inset-0" />
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
