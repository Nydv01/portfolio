import { motion } from 'framer-motion';
import { useScrollSection, useIsMobile } from '@/hooks/usePortfolio';
import { useContentStore } from '@/stores/contentStore';

export default function ScrollNav() {
  const { content } = useContentStore();
  const isMobile = useIsMobile();
  const sections = content.theme.enabledSections;
  const activeSection = useScrollSection(sections);

  // Hide on mobile as it takes up too much screen edge space
  if (isMobile) return null;

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      // Offset slightly to account for fixed navbar if needed, or just let smooth scroll handle it
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4 items-center"
    >
      {sections.map((section) => {
        const isActive = activeSection === section;
        return (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            className="group relative flex items-center justify-center w-8 h-8"
            aria-label={`Scroll to ${section}`}
          >
            {/* Tooltip */}
            <span className="absolute right-10 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white/80 text-xs font-medium capitalize opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md">
              {section === 'hero' ? 'Home' : section}
            </span>
            
            {/* Dot */}
            <div className={`transition-all duration-300 rounded-full ${
              isActive 
                ? 'w-2.5 h-2.5 bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.6)]' 
                : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50 group-hover:w-2 group-hover:h-2'
            }`} />
          </button>
        );
      })}
    </motion.div>
  );
}
