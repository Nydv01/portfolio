/* =========================================================
   PROJECTS SECTION — "Featured Systems"
   Presents portfolio projects with interactive GlowCard hover
   spotlights, abstract environment visualizations, expandable
   case study problems/solutions, and tag arrays.
========================================================= */

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Github, ExternalLink, Sparkles, ArrowRight, FolderKanban, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { useReducedMotion } from '@/hooks/usePortfolio';
import GlowCard from '@/components/effects/GlowCard';
import { fadeUp, easings } from '@/lib/animations';

export default function ProjectsSection() {
  const { content } = useContentStore();
  const { projects } = content;
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  // Handle case study collapse/expand states
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

  const featuredProject = projects.find(p => p.featured) || projects[0];
  const gridProjects = projects.filter(p => p.id !== featuredProject.id);

  // Gradient map for project covers
  const gradients = [
    'from-violet-600/30 to-fuchsia-600/30',
    'from-cyan-600/30 to-blue-600/30',
    'from-emerald-600/30 to-teal-600/30',
    'from-amber-600/30 to-rose-600/30',
  ];

  const toggleCaseStudy = (id: string) => {
    setExpandedCaseStudy(prev => (prev === id ? null : id));
  };

  return (
    <section id="projects" ref={sectionRef} className="section-padding container-custom relative z-10">
      {/* Section Header */}
      <motion.div 
        className="mb-16 md:mb-24"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeUp}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-[1px] bg-violet-500" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400">Featured Work</span>
        </div>
        
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white/90">
          Systems I've <span className="gradient-text">Built</span>
        </h2>
        <p className="text-white/40 max-w-2xl text-base sm:text-lg">
          Production-grade applications architected for scale, performance, and user experience.
        </p>
      </motion.div>

      {/* ─── Featured Project Spotlight ────────────────── */}
      {featuredProject && (
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="mb-12 lg:mb-16"
        >
          <GlowCard 
            glowColor="violet" 
            enableTilt={false} 
            className="border-white/[0.08]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Visual Mock Window (Left) */}
              <div className="lg:col-span-7 relative h-64 lg:h-auto overflow-hidden bg-black/40 border-b lg:border-b-0 lg:border-r border-white/[0.06] flex items-center justify-center p-6 sm:p-8">
                {/* Tech grid mesh backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-500/10 opacity-30 pointer-events-none" />
                
                {/* Visual Window container */}
                <div className="w-full max-w-md h-48 sm:h-64 border border-white/[0.08] rounded-xl relative overflow-hidden bg-white/[0.02] shadow-2xl backdrop-blur-sm group-hover:scale-[1.01] transition-transform duration-700">
                  <div className="absolute top-0 w-full h-8 border-b border-white/[0.06] bg-white/[0.03] flex items-center px-4 justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">system_env</span>
                  </div>
                  
                  {/* Inner terminal content */}
                  <div className="mt-8 p-4 font-mono text-xs text-white/40 space-y-2 select-none">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-white/60">initialize {featuredProject.title.toLowerCase()}...</span>
                    </div>
                    <div className="text-emerald-400/60 font-semibold">✓ Core subsystems loaded</div>
                    <div className="text-cyan-400/60">ℹ Listening on port 3000</div>
                    <div className="h-px bg-white/5 my-3" />
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>STACK: {featuredProject.techStack.slice(0,2).join(' + ')}</div>
                      <div>FEATURED: TRUE</div>
                      <div>STATUS: OPERATIONAL</div>
                      <div>DB_SYNC: ACTIVE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Details (Right) */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400 font-mono">Spotlight System</span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white/95 mb-2">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-violet-300 font-medium mb-5">
                  {featuredProject.subtitle}
                </p>
                
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Case Study Section */}
                {featuredProject.caseStudy && (
                  <div className="mb-6 space-y-3.5 border-l border-white/[0.08] pl-4 py-0.5">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold font-mono mb-1">Subsystem Problem</p>
                      <p className="text-xs text-white/50 leading-relaxed">{featuredProject.caseStudy.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-violet-400/60 uppercase tracking-wider font-semibold font-mono mb-1">Architected Solution</p>
                      <p className="text-xs text-white/80 leading-relaxed font-medium">{featuredProject.caseStudy.solution}</p>
                    </div>
                  </div>
                )}

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {featuredProject.techStack.map(tech => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link CTAs */}
                <div className="flex items-center gap-4 mt-auto">
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-sm text-white/60 hover:text-white transition-colors font-medium"
                    >
                      <Github className="w-4 h-4" />
                      Repository
                    </a>
                  )}
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)] transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Host
                    </a>
                  )}
                </div>

              </div>

            </div>
          </GlowCard>
        </motion.div>
      )}

      {/* ─── Project Grid ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {gridProjects.map((project, idx) => {
          const gradient = gradients[idx % gradients.length];
          const isCaseStudyExpanded = expandedCaseStudy === project.id;
          
          return (
            <motion.article
              key={project.id}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 * idx, ease: easings.premium } }
              }}
              className="h-full"
            >
              <GlowCard 
                glowColor={idx % 2 === 0 ? 'cyan' : 'amber'} 
                enableTilt={true}
                className="h-full flex flex-col border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                {/* Header Cover Visual */}
                <div className="h-44 relative overflow-hidden bg-black/20 border-b border-white/[0.06]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none">
                    <h4 className="font-display text-5xl font-extrabold text-white/[0.03] group-hover:text-white/[0.06] tracking-tighter uppercase transition-colors">
                      {project.title.slice(0, 2)}
                    </h4>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h4 className="text-xl sm:text-2xl font-display font-bold text-white/95 group-hover:text-white transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-violet-400 mt-1 font-mono">{project.subtitle}</p>
                  </div>
                  
                  <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Case Study Problem/Solution Toggle */}
                  {project.caseStudy && (
                    <div className="mb-6 border-t border-white/[0.04] pt-4">
                      <button
                        onClick={() => toggleCaseStudy(project.id)}
                        className="flex items-center justify-between w-full text-xs font-semibold font-mono text-white/40 hover:text-white/60 transition-colors"
                      >
                        <span>CASE STUDY METRICS</span>
                        {isCaseStudyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isCaseStudyExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: easings.premium }}
                            className="overflow-hidden mt-3 space-y-2.5 text-xs text-white/60 border-l border-white/10 pl-3.5 py-0.5"
                          >
                            <div>
                              <span className="block font-mono text-[9px] text-white/30 uppercase mb-0.5">Problem</span>
                              <p className="leading-relaxed text-white/50">{project.caseStudy.problem}</p>
                            </div>
                            <div>
                              <span className="block font-mono text-[9px] text-violet-400/60 uppercase mb-0.5">Solution</span>
                              <p className="leading-relaxed text-white/80 font-medium">{project.caseStudy.solution}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] font-mono text-white/30 py-1 px-1">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/[0.05]">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-white/40 hover:text-violet-400 transition-all duration-300 transform hover:scale-105" 
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-white/40 hover:text-cyan-400 transition-all duration-300 transform hover:scale-105" 
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <button 
                      onClick={() => toggleCaseStudy(project.id)}
                      className="ml-auto text-[10px] font-bold font-mono uppercase tracking-wider text-white/20 group-hover:text-white/50 transition-colors flex items-center gap-1.5"
                    >
                      {isCaseStudyExpanded ? 'Hide metrics' : 'Metrics'}
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isCaseStudyExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </button>
                  </div>
                </div>

              </GlowCard>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
