import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Brain, Shield, LucideIcon } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Shield,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function IdentitySection() {
  const { content } = useContentStore();
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="section-padding container-custom relative z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {/* Subtle connecting line in background (desktop only) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-white/[0.1] to-transparent z-0" />

        {content.identityCards.map((card, idx) => {
          const Icon = iconMap[card.icon] || Code;

          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={
                prefersReduced
                  ? {}
                  : { rotateX: 5, rotateY: -5, scale: 1.02 }
              }
              style={{ transformStyle: 'preserve-3d' }}
              className="relative group z-10"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.05] hover:border-white/[0.12] transition-colors duration-500 overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Icon Container */}
                <div className="mb-6 relative w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.1] shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-semibold text-white/90 mb-3 group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/70 transition-colors">
                  {card.description}
                </p>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 rounded-full bg-violet-400/50 shadow-[0_0_10px_2px_rgba(139,92,246,0.3)]" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
