import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

// Zustand store & Cinematic effects
import { useContentStore } from "@/stores/contentStore";
import GlowCard from "@/components/effects/GlowCard";

/* ================= EMAILJS CONFIG ================= */
const SERVICE_ID = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID as string;
const ADMIN_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_ADMIN_TEMPLATE_ID as string;
const AUTO_REPLY_TEMPLATE_ID = (import.meta as any).env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID as string;
const PUBLIC_KEY = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY as string;

/* =========================================================
   CINEMATIC FORM ELEMENTS
========================================================= */

function LaserInput({ placeholder, type = "text", name, required }: { placeholder: string; type?: string; name: string; required?: boolean }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative w-full">
      <input
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-xl bg-muted/60 px-4 py-3 outline-none border border-border/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all duration-300 font-mono text-sm"
      />
      <AnimatePresence>
        {isFocused && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="12"
              fill="none"
              stroke="rgba(215, 195, 170, 0.8)"
              strokeWidth="2"
              initial={{ strokeDasharray: "80 400", strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -480 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
}

function LaserTextarea({ placeholder, name, required, rows = 4 }: { placeholder: string; name: string; required?: boolean; rows?: number }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative w-full md:col-span-2">
      <textarea
        required={required}
        name={name}
        placeholder={placeholder}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-xl bg-muted/60 px-4 py-3 outline-none border border-border/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 transition-all duration-300 font-mono text-sm animate-none"
      />
      <AnimatePresence>
        {isFocused && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="12"
              fill="none"
              stroke="rgba(180, 185, 190, 0.8)"
              strokeWidth="2"
              initial={{ strokeDasharray: "120 600", strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -720 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
}

function ParticleExplosion() {
  const particles = Array.from({ length: 45 }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 260;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: Math.random() * 4 + 2,
      color: Math.random() > 0.5 ? "#ffffff" : "#a8a9ad",
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: 0.1,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { content } = useContentStore();
  const { contact, socialLinks } = content;

  const { theme } = useTheme();
  const isDarkMode = theme === "dark" || (theme === "system" && typeof window !== "undefined" && document.documentElement.classList.contains("dark"));
  
  const calendlyQuery = contact.calendlyUrl
    ? (isDarkMode
      ? "?background_color=000000&text_color=ffffff&primary_color=beb5a2"
      : "?background_color=ffffff&text_color=000000&primary_color=1d1d1f")
    : "";
  const calendlyEmbedUrl = contact.calendlyUrl ? `${contact.calendlyUrl}${calendlyQuery}` : "";

  const [heroHover, setHeroHover] = useState({ x: 0, y: 0, active: false });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setHeroHover({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // 1️⃣ Send message to YOU
      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        payload,
        PUBLIC_KEY
      );

      // 2️⃣ Auto-reply to USER
      await emailjs.send(
        SERVICE_ID,
        AUTO_REPLY_TEMPLATE_ID,
        payload,
        PUBLIC_KEY
      );

      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden min-h-screen">
        {/* Premium background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-primary/15 rounded-full blur-[60px] md:blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-zinc-700/10 rounded-full blur-[60px] md:blur-[140px]" />
        </div>

        <div className="container-custom">
          <SectionHeading
            title="Let’s Connect"
            subtitle="Opportunities, collaborations, or meaningful conversations"
          />

          {/* ================= HERO ================= */}
          <div className="max-w-5xl mx-auto">
            <div 
              ref={heroRef}
              onMouseMove={handleHeroMouseMove}
              onMouseEnter={() => setHeroHover(prev => ({ ...prev, active: true }))}
              onMouseLeave={() => setHeroHover(prev => ({ ...prev, active: false }))}
              className="mb-20 relative overflow-hidden rounded-3xl"
            >
              <GlowCard glowColor="violet" enableTilt className="p-12 text-center relative overflow-hidden">
                {/* Cybernetic HUD Overlay */}
                <AnimatePresence>
                  {heroHover.active && (
                    <>
                      {/* Horizontal Crosshair Line */}
                      <motion.div 
                        className="absolute left-0 right-0 h-[0.5px] bg-primary/20 pointer-events-none z-0"
                        style={{ top: heroHover.y }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                      {/* Vertical Crosshair Line */}
                      <motion.div 
                        className="absolute top-0 bottom-0 w-[0.5px] bg-primary/20 pointer-events-none z-0"
                        style={{ left: heroHover.x }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                      {/* Target Scope Ring */}
                      <motion.div
                        className="absolute w-12 h-12 rounded-full border border-primary/45 pointer-events-none z-0 flex items-center justify-center"
                        style={{ left: heroHover.x - 24, top: heroHover.y - 24 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                      </motion.div>
                      {/* Coordinate Readout */}
                      <motion.div
                        className="absolute bg-background/90 border border-primary/25 rounded-md px-2 py-1 text-[9px] font-mono text-primary pointer-events-none z-20 shadow-lg"
                        style={{ left: heroHover.x + 16, top: heroHover.y + 16 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                      >
                        AZIMUTH: {(heroHover.x * 0.28).toFixed(1)}°<br />
                        RANGE: {(heroHover.y * 0.42).toFixed(1)}m<br />
                        STATUS: TRK_ACTIVE
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Corner Cybernetic Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/30" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/30" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/30" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/30" />
                <div className="absolute top-3 left-10 text-[9px] font-mono text-muted-foreground/30 select-none">[ ESTABLISHING_TRK_LINK ]</div>

                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    {contact.headline || "Ready to Build Something Real?"}
                  </h2>

                  <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    {contact.subheadline || "I’m actively looking for internships, placements, and impactful engineering roles."}
                  </p>

                  <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-8">
                    <MapPin className="h-4 w-4" />
                    Open to remote & on-site opportunities
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="gap-2 glow hover-lift">
                      <a href={`mailto:${contact.email}`}>
                        <Mail className="h-5 w-5" />
                        Email Me
                      </a>
                    </Button>

                    {contact.calendlyUrl && (
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="gap-2 hover-lift"
                      >
                        <a
                          href="#scheduler-container"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("scheduler-container")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <Calendar className="h-5 w-5" />
                          Book a Call
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* ================= CONTACT & SCHEDULER SECTION ================= */}
            <div className="grid lg:grid-cols-12 gap-8 mb-20 items-stretch">
              {/* Send a Message Card */}
              {contact.showForm && (
                <div className={cn(
                  "h-full",
                  contact.calendlyUrl ? "lg:col-span-6" : "lg:col-span-12"
                )}>
                  <GlowCard glowColor="cyan" enableTilt={false} className="p-8 sm:p-10 text-left h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Send a Message</h3>
                      <p className="text-muted-foreground mb-6 text-sm">
                        Your message goes directly to my inbox — with instant
                        confirmation.
                      </p>
                    </div>

                    <AnimatePresence mode="wait">
                      {!success ? (
                        <motion.form
                          key="form"
                          onSubmit={sendEmail}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="grid md:grid-cols-2 gap-6"
                        >
                          <LaserInput
                            required
                            name="name"
                            placeholder="Your Name"
                          />

                          <LaserInput
                            required
                            type="email"
                            name="email"
                            placeholder="Your Email"
                          />

                          <LaserTextarea
                            required
                            name="message"
                            placeholder="Your Message"
                            rows={4}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            className="md:col-span-2 gap-2 glow hover-lift w-full"
                            disabled={loading}
                          >
                            <Send className="h-5 w-5" />
                            {loading ? "Sending..." : "Send Message"}
                          </Button>

                          {error && (
                            <div className="md:col-span-2 flex items-center gap-2 text-sm text-red-500">
                              <AlertTriangle className="h-4 w-4" />
                              Something went wrong. Please try again.
                            </div>
                          )}
                        </motion.form>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center py-16 relative overflow-hidden"
                        >
                          <ParticleExplosion />
                          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4 relative z-10" />
                          <h4 className="text-xl font-semibold mb-2 relative z-10">
                            Message Sent Successfully!
                          </h4>
                          <p className="text-muted-foreground relative z-10">
                            You’ll receive a confirmation email shortly.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlowCard>
                </div>
              )}

              {/* Calendly Scheduler Card */}
              {contact.calendlyUrl && (
                <div id="scheduler-container" className={cn(
                  "h-full scroll-mt-24",
                  contact.showForm ? "lg:col-span-6" : "lg:col-span-12"
                )}>
                  <GlowCard glowColor="violet" enableTilt={false} className="p-8 sm:p-10 text-left h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Secure System Scheduler</h3>
                      <p className="text-muted-foreground mb-6 text-sm">
                        Directly book a slot in my calendar for interviews, discussions, or code sessions.
                      </p>
                    </div>

                    <div className="w-full flex-1 min-h-[480px] bg-muted/20 border border-border/30 rounded-xl overflow-hidden relative shadow-inner">
                      <iframe
                        src={calendlyEmbedUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Calendly Scheduler"
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  </GlowCard>
                </div>
              )}
            </div>

            {/* ================= SOCIAL ================= */}
            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => {
                const Icon = (LucideIcons as any)[social.icon] || Mail;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all hover:scale-125"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
