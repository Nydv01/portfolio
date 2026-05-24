/* =========================================================
   CINEMATIC NAVIGATION — Studio-Quality Nav Bar
   Floating pill-style navigation with frosted glass,
   scroll-aware behavior, and premium mobile menu.
========================================================= */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';
import { menuOverlay, menuPanel, menuLink } from '@/lib/animations';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function CinematicNav() {
  const { content } = useContentStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollY } = useScroll();

  // Track scroll direction to hide/show nav
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 30);

    if (latest > prev && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    },
    []
  );

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Desktop Nav ─────────────────────────────── */}
      <motion.header
        initial={false}
        animate={{ y: hidden && !mobileOpen ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <nav
          className={`mx-auto max-w-6xl flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled
              ? 'glass-nav shadow-[0_8px_40px_-10px_rgba(0,0,0,0.6)]'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="group relative font-display text-lg sm:text-xl font-bold tracking-tight"
          >
            <span className="gradient-text">
              {content.profile.name.split(' ')[0]}
            </span>
            <span className="text-white/50 ml-1 hidden sm:inline">
              {content.profile.name.split(' ').slice(1).join(' ')}
            </span>
            <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Resume CTA */}
            <a
              href={content.profile.resumeUrl}
              download="Nitin-ydv-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Menu Overlay ──────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            variants={menuOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-[hsl(225,15%,4%)] flex flex-col items-center justify-center"
            >
              <nav className="flex flex-col items-center gap-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    variants={menuLink(i)}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => scrollToSection(link.id)}
                    className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-colors duration-300 ${
                      activeSection === link.id
                        ? 'gradient-text'
                        : 'text-white/30 hover:text-white/70'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}

                {/* Mobile Resume Link */}
                <motion.a
                  variants={menuLink(navLinks.length)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  href={content.profile.resumeUrl}
                  download="Nitin-ydv-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-white/60 hover:text-white text-lg font-medium transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </motion.a>
              </nav>

              {/* Social Links at Bottom */}
              <motion.div
                className="absolute bottom-8 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {content.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/30 hover:text-white/60 text-sm font-medium transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
