import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Code,
  Brain,
  Shield,
  Layers,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";


/* =========================================================
   FLOATING AVATAR + BLINK
========================================================= */
const floatAvatar = {
  animate: { y: [0, -14, 0] },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: [0.42, 0, 0.58, 1],
  },
} as any;

/* =========================================================
   STATS (UNCHANGED)
========================================================= */
const stats = [
  { icon: Code, value: "6+", label: "Production-Level Projects" },
  { icon: Layers, value: "Full-Stack", label: "Frontend + Backend" },
  { icon: Cpu, value: "DSA & Core CS", label: "Strong Fundamentals" },
];

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden min-h-screen">
        {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0 -z-10 bg-black" />
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-primary/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-purple-500/30 rounded-full blur-[160px]" />

        <div className="container-custom px-6 pt-28 pb-40">

          {/* ================= HERO ================= */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Open to Internships & Full-Time Roles
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">
                Building{" "}
                <span className="gradient-text">
                  Scalable Software
                </span>
                <br /> & Intelligent Systems
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                Computer Science Engineer focused on full-stack development,
                backend systems, GenAI, and security-aware engineering.
              </p>

              <p className="text-muted-foreground max-w-xl mb-10">
                I believe in writing code that survives production, scales with
                users, and solves real problems — not just demos.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2 glow hover-lift">
                  <Link to="/projects">
                    View Projects <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 hover-lift"
                >
                  <a href="https://drive.google.com/uc?id=12lu2BLYCYtQyijJ3BIyDIlbNqIzl42-k&export=download">
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="gap-2 hover-lift"
                >
                  <Link to="/contact">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* ================= RIGHT AVATAR ================= */}
<motion.div
  {...floatAvatar}
  className="relative flex items-center justify-center"
>

  {/* OUTER ROTATING AURA */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    className="absolute"
  >
    <div className="w-72 h-72 rounded-full 
      bg-gradient-to-r from-primary via-purple-500 to-pink-500
      blur-3xl opacity-40"
    />
  </motion.div>

  {/* PULSE RING */}
  <motion.div
    animate={{ scale: [1, 1.12, 1] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    className="absolute"
  >
    <div className="w-60 h-60 rounded-full 
      border border-primary/50 
      shadow-[0_0_120px_-20px_hsl(var(--primary))]"
    />
  </motion.div>

  {/* DASHED ROTATING RING */}
  <motion.div
    animate={{ rotate: -360 }}
    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    className="absolute"
  >
    <div className="w-64 h-64 rounded-full border border-dashed border-primary/30" />
  </motion.div>

  {/* AVATAR CORE */}
  <div className="relative z-10 flex flex-col items-center justify-center
    w-44 h-44 rounded-full
    bg-black/60 backdrop-blur-xl
    border border-white/10
    shadow-[0_0_80px_-10px_rgba(99,102,241,0.7)]"
  >

    {/* BLINKING EMOJI */}
    <motion.div className="text-[4.5rem]">
      <span className="text-[4.5rem]">
  🧔🏻
</span>

    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.85] }}
      transition={{ delay: 1.2 }}
      className="text-xs text-muted-foreground mt-1"
    >
      Hi, I’m Nitin Yadav
    </motion.p>
  </div>
  </motion.div>
</div>

{/* ================= ENGINEERING IDENTITY ================= */}
<div className="grid md:grid-cols-3 gap-8 mb-32">
            {[
              {
                icon: Code,
                title: "Full-Stack Engineer",
                desc: "Architecting frontend + backend systems with clean, scalable design.",
              },
              {
                icon: Brain,
                title: "AI / GenAI Builder",
                desc: "LLMs, OpenAI APIs, Whisper, LangChain & applied AI systems.",
              },
              {
                icon: Shield,
                title: "Security-Aware Developer",
                desc: "Ethical hacking basics, secure APIs & threat-aware design.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-3xl p-10 hover-lift glow"
              >
                <item.icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
  whileHover={{
    scale: 1.03,
    boxShadow: "0 0 80px rgba(99,102,241,0.45)",
  }}
  transition={{ type: "spring", stiffness: 200, damping: 18 }}
  className="group max-w-4xl mx-auto mb-32 glass-card rounded-3xl p-12 hover-lift cursor-default"
>
  <h2
    className="
      text-2xl font-bold mb-6 text-center
      transition-all duration-500
      group-hover:text-primary
      group-hover:tracking-wide
    "
  >
    Engineering Philosophy
  </h2>

  <p
    className="
      text-muted-foreground leading-relaxed text-center
      transition-colors duration-500
      group-hover:text-primary/90
    "
  >
    I approach software engineering as a problem-solving discipline.
    My focus is on clarity, scalability, and long-term maintainability.
    I value clean architecture, thoughtful trade-offs, and continuous
    learning over shortcuts and hype.
  </p>
</motion.div>


          {/* ================= JOURNEY CURVE ================= */}
          <div className="max-w-5xl mx-auto mb-32">
            <h2 className="text-3xl font-bold text-center mb-12">
              My Engineering Growth Journey
            </h2>

            <svg viewBox="0 0 800 300" className="w-full h-64">
              <motion.path
                d="M20 260 C150 220, 300 160, 420 120 C560 70, 680 60, 780 40"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex justify-between text-sm text-muted-foreground mt-4">
              <span>2022 · Basics</span>
              <span>2023 · Full-Stack</span>
              <span>2024 · AI Systems</span>
              <span>2025 · Security × AI</span>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-32">
            {stats.map((stat) => (
              <motion.div
  key={stat.label}
  whileHover={{ scale: 1.08, rotateX: 6, rotateY: -6 }}
  transition={{ type: "spring", stiffness: 180, damping: 15 }}
  className="
    relative group glass-card rounded-2xl p-8 text-center
    overflow-hidden hover-lift
  "
>
  {/* ENERGY SWEEP */}
  <div
    className="
      absolute inset-0 bg-gradient-to-r
      from-transparent via-primary/20 to-transparent
      translate-x-[-100%] group-hover:translate-x-[100%]
      transition-transform duration-1000
    "
  />

  {/* ICON */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className="relative z-10 mb-4"
  >
    <stat.icon className="h-8 w-8 text-primary mx-auto" />
  </motion.div>

  {/* VALUE */}
  <div className="relative z-10 text-3xl font-bold gradient-text mb-1">
    {stat.value}
  </div>

  {/* LABEL */}
  <div className="relative z-10 text-sm text-muted-foreground group-hover:text-primary transition-colors">
    {stat.label}
  </div>
</motion.div>

            ))}
          </div>

          {/* ================= SOCIAL ================= */}
          <div className="flex justify-center gap-6">
            {[Github, Linkedin, Mail].map((Icon, i) => (
              <a
                key={i}
                href={
                  i === 0
                    ? "https://github.com/Nydv01"
                    : i === 1
                    ? "https://linkedin.com/in/ydv-nitin"
                    : "mailto:ydv.nitin2401@gmail.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all hover:scale-125"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
