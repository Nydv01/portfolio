import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/github", label: "GitHub" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const closeMobileMenu = () => setMobileOpen(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* ---------- Scroll Behavior ---------- */
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      // hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

 

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          scrolled ? "glass py-3" : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="group relative">
              <span className="text-xl sm:text-2xl font-bold gradient-text">
                Nitin Yadav
              </span>
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

          </nav>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-16 bottom-0 w-64 glass-card p-6 overflow-y-auto"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "block rounded-lg px-4 py-3 font-medium transition-colors",
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
