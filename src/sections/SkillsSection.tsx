/* =========================================================
   SKILLS SECTION — "Technical Arsenal"
   Features an interactive orbital SVG network mapping core skills,
   coupled with a responsive card grid using GlowCards with 
   custom range sliders, and a cloud of tech stack pills.
========================================================= */

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Wrench, 
  Shield, 
  LucideIcon 
} from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';
import GlowCard from '@/components/effects/GlowCard';
import { fadeUp, easings } from '@/lib/animations';

const iconMap: Record<string, LucideIcon> = {
  Code2, 
  Layout, 
  Server, 
  Database, 
  Brain, 
  Wrench, 
  Shield,
};

export default function SkillsSection() {
  const { content } = useContentStore();
  const { skills = [] } = content || {};
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Extract all unique tech stack names for pills
  const allTech = Array.from(new Set(
    (skills || []).flatMap(cat => (cat.items || []).map(i => i.name))
  ));

  const glowColorMap = ['violet', 'cyan', 'amber'] as const;

  return (
    <section id="skills" ref={sectionRef} className="section-padding container-custom relative z-10">
      
      {/* Section Indicator & Title */}
      <motion.div 
        className="text-center mb-16 md:mb-24"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-3 h-[1px] bg-violet-500" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400">Technical Arsenal</span>
          <div className="w-3 h-[1px] bg-violet-500" />
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white/95">
          Capabilities & <span className="gradient-text">Expertise</span>
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
          The technical foundation powering my digital builds, categorized by domain.
        </p>
      </motion.div>

      {/* ─── Interactive Orbital Visualization (Desktop only) ─── */}
      {!prefersReduced && (
        <div className="hidden lg:flex justify-center mb-28 relative h-[480px]">
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 1.2, ease: easings.premium }}
          >
            <svg className="w-[550px] h-[550px] overflow-visible" viewBox="-275 -275 550 550">
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(190, 172, 148, 0.35)" />
                  <stop offset="100%" stopColor="rgba(190, 172, 148, 0)" />
                </radialGradient>
                <filter id="glow-svg" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbit Rings */}
              {[95, 175, 250].map((radius, i) => (
                <motion.circle
                  key={`ring-${i}`}
                  cx="0"
                  cy="0"
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.03)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.8, delay: i * 0.15, ease: "easeOut" }}
                />
              ))}

              {/* Center Core */}
              <circle cx="0" cy="0" r="35" fill="url(#centerGlow)" />
              <circle cx="0" cy="0" r="24" fill="rgba(20, 20, 25, 0.9)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" letterSpacing="1.5" className="font-mono text-white/50 select-none">CORE</text>

              {/* Interactive Nodes */}
              {(skills || []).map((category, catIdx) => {
                const ringIdx = catIdx % 3;
                const radius = 95 + (ringIdx * 78);
                const angleOffset = (Math.PI * 2) / (skills.length || 1);
                const angle = catIdx * angleOffset;
                
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                const isHovered = hoveredCategory === category.id;
                const opacity = hoveredCategory ? (isHovered ? 1 : 0.15) : 0.85;

                return (
                  <g 
                    key={category.id} 
                    className="transition-opacity duration-300 cursor-pointer"
                    style={{ opacity }}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {/* Radial connection string to core */}
                    <line 
                      x1="0" y1="0" 
                      x2={x} y2={y} 
                      stroke={isHovered ? "rgba(190, 172, 148, 0.25)" : "rgba(255, 255, 255, 0.05)"} 
                      strokeWidth={isHovered ? 1.5 : 1} 
                      strokeDasharray={isHovered ? "none" : "3 3"} 
                    />
                    
                    {/* Node Glow Spotlight */}
                    {isHovered && (
                      <circle cx={x} cy={y} r="22" fill="rgba(190, 172, 148, 0.25)" filter="url(#glow-svg)" />
                    )}
                    
                    {/* Node Dot */}
                    <circle 
                      cx={x} cy={y} r="12" 
                      fill="rgba(15, 15, 20, 0.95)" 
                      stroke={isHovered ? "hsl(39, 15%, 69%)" : "rgba(255, 255, 255, 0.2)"} 
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      className="transition-all duration-300"
                    />
                    
                    {/* Category Label text */}
                    <text 
                      x={x + (x > 0 ? 18 : -18)} 
                      y={y + 4} 
                      fill={isHovered ? "white" : "rgba(255, 255, 255, 0.5)"} 
                      fontSize="11" 
                      fontWeight={isHovered ? "600" : "400"}
                      textAnchor={x > 0 ? "start" : "end"}
                      className="font-display transition-colors select-none"
                    >
                      {category.title}
                    </text>

                    {/* Orbital Sub-items (Active on category hover) */}
                    {isHovered && (category.items || []).map((item, itemIdx) => {
                      const itemAngle = angle + (itemIdx - ((category.items || []).length - 1) / 2) * 0.26;
                      const itemRadius = radius + 42;
                      const itemX = Math.cos(itemAngle) * itemRadius;
                      const itemY = Math.sin(itemAngle) * itemRadius;
                      
                      return (
                        <g key={item.name} className="animate-fade-up">
                          <line x1={x} y1={y} x2={itemX} y2={itemY} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.75" />
                          <circle cx={itemX} cy={itemY} r="3" fill="hsl(39, 15%, 69%)" />
                          <text 
                            x={itemX + (itemX > x ? 8 : -8)} 
                            y={itemY + 3.5} 
                            fill="rgba(255,255,255,0.7)" 
                            fontSize="9" 
                            fontFamily="JetBrains Mono, monospace"
                            textAnchor={itemX > x ? "start" : "end"}
                            className="select-none"
                          >
                            {item.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      )}

      {/* ─── Category Cards Grid ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {(skills || []).map((category, idx) => {
          const Icon = iconMap[category.icon] || Code2;
          const isCategoryHovered = hoveredCategory === category.id;
          const colorFamily = glowColorMap[idx % glowColorMap.length];
          
          return (
            <motion.div
              key={category.id}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 35 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 * idx, ease: easings.premium } }
              }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="h-full"
            >
              <GlowCard 
                glowColor={colorFamily} 
                enableTilt={true}
                className={`h-full flex flex-col p-6 sm:p-7 transition-all duration-500 border-white/[0.06] ${
                  isCategoryHovered ? 'border-violet-500/20' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.gradient} bg-opacity-20 border border-white/5`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white/90">{category.title}</h3>
                </div>

                <div className="space-y-4 flex-1">
                  {(category.items || []).map((item) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-white/60 font-mono">{item.name}</span>
                        <span className="text-white/30">{item.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.03] border border-white/[0.05] rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.15, ease: easings.premium }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Tech Stack Pills cloud ─────────────────────── */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.4 } }
        }}
      >
        {allTech.map((tech) => (
          <motion.span
            key={tech}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            whileHover={prefersReduced ? {} : { scale: 1.04, y: -2 }}
            className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-white/50 hover:text-violet-400 hover:border-violet-500/25 hover:bg-violet-500/10 hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] transition-all cursor-default"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
export { SkillsSection }; // For backwards compatibility
