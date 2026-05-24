import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { useScrollSection, useIsMobile } from '@/hooks/usePortfolio';
import { useContentStore } from '@/stores/contentStore';

export default function Navbar() {
  const { content } = useContentStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const sections = content.theme.enabledSections;
  const activeSection = useScrollSection(sections);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
        className={`fixed top-0 inset-x-0 z-50 flex justify-center p-4 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6 md:py-8'
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled 
              ? 'glass-nav rounded-2xl px-4 py-2 w-[calc(100%-2rem)] md:w-auto md:min-w-[400px] border border-white/[0.08] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' 
              : 'w-full max-w-7xl px-4 md:px-8'
          }`}
        >
          {/* Logo */}
          <button 
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group mr-8"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-violet-500/20 transition-all">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            {!scrolled && (
              <span className="font-display font-bold text-white tracking-wide hidden sm:block">
                NEXUS
              </span>
            )}
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {sections.filter(s => !['hero', 'identity'].includes(s)).map((section) => {
              const isActive = activeSection === section;
              return (
                <button
                  key={section}
                  onClick={() => scrollTo(section)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                  } capitalize tracking-wide`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white/[0.08] rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{section}</span>
                </button>
              );
            })}
          </div>

          {/* AI Trigger / Resume (Desktop) */}
          <div className="hidden md:flex items-center gap-3 ml-8">
            <button
              onClick={() => document.getElementById('ai-trigger')?.click()}
              className="px-4 py-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 text-sm font-semibold hover:bg-violet-500/20 hover:border-violet-500/40 transition-all flex items-center gap-2 group"
            >
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Ask AI
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[60] bg-black/60 md:hidden flex flex-col justify-center"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col items-center gap-8 p-8">
              {sections.map((section, idx) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => scrollTo(section)}
                  className={`text-3xl font-display font-bold capitalize transition-colors ${
                    activeSection === section ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {section === 'hero' ? 'Home' : section}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * sections.length }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('ai-trigger')?.click();
                }}
                className="mt-8 px-8 py-4 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30 text-lg font-semibold w-full max-w-xs flex items-center justify-center gap-3"
              >
                <div className="w-3 h-3 rounded-full bg-violet-400 animate-pulse" />
                Ask NEXUS AI
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
