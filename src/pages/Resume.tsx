import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  CheckCircle,
  Award,
  Shield,
  Brain,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   DATA
========================================================= */

const education = [
  "B.Tech in Computer Science Engineering – VIT Bhopal",
  "Class 10: 90% (Strong academic foundation)",
  "Class 12: 80% (Science stream)",
];

const skills = [
  "Full-Stack Development (React, FastAPI, Node.js)",
  "Cybersecurity & Ethical Hacking fundamentals",
  "AI-powered application development (OpenAI APIs)",
  "Strong CS fundamentals: DSA, OS, DBMS, CN",
];

const certifications = [
  "Google Cybersecurity Professional Certificate",
  "Google Generative AI Certification",
  "Industrial IoT Markets & Security (Coursera)",
  "Multiple verified Credly skill badges",
];

const skillRadar = [
  { label: "Full-Stack", value: 90 },
  { label: "AI / GenAI", value: 85 },
  { label: "Cybersecurity", value: 75 },
  { label: "System Design", value: 80 },
  { label: "DSA", value: 70 },
];


function RadarChart({
  data,
  size = 360,
}: {
  data: { label: string; value: number }[];
  size?: number;
}) {
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (2 * Math.PI) / data.length;

  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (d.value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 24) * Math.cos(angle),
      labelY: center + (radius + 24) * Math.sin(angle),
      label: d.label,
    };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mx-auto"
    >
      {/* Grid */}
      {[20, 40, 60, 80, 100].map((level) => (
        <circle
          key={level}
          cx={center}
          cy={center}
          r={(level / 100) * radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeDasharray="4 4"
        />
      ))}

      {/* Axes */}
      {points.map((p, i) => (
        <line
          key={i}
          x1={center}
          y1={center}
          x2={p.x}
          y2={p.y}
          stroke="hsl(var(--border))"
        />
      ))}

      {/* Animated Shape */}
      <motion.polygon
        points={polygonPoints}
        fill="hsl(var(--primary) / 0.25)"
        stroke="hsl(var(--primary))"
        strokeWidth={2}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />

      {/* Points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={5}
          fill="hsl(var(--primary))"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.6 + i * 0.05 }}
          viewport={{ once: true }}
        />
      ))}

      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-muted-foreground"
        >
          {p.label}
        </text>
      ))}
    </motion.svg>
  );
}

export default function Resume() {
  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden min-h-[calc(100vh-4rem)]">
        {/* Premium background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.18),transparent_65%)]" />

        <div className="relative z-10 bg-background">
  <SectionHeading
    title="Resume"
    subtitle="Academic foundation, engineering skills, and verified credentials"
  />



          {/* ================= DOWNLOAD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card rounded-3xl p-10 text-center mb-20 hover-lift glow"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="h-12 w-12 text-primary" />
            </div>

            <h3 className="text-3xl font-bold mb-3">
              Nitin Yadav — Resume
            </h3>

            <p className="text-muted-foreground mb-8">
              ATS-optimized resume highlighting full-stack engineering,
              cybersecurity exposure, AI projects, and strong CS fundamentals.
            </p>

            {/* ✅ GOOGLE DRIVE DIRECT DOWNLOAD */}
            <Button asChild size="lg" className="gap-2 glow hover-lift">
              <a
                href="https://drive.google.com/uc?export=download&id=12lu2BLYCYtQyijJ3BIyDIlbNqIzl42-k"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-5 w-5" />
                Download Resume (PDF)
              </a>
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Last updated: December 2024
            </p>
          </motion.div>

          {/* ================= FLOATING SECTIONS ================= */}
<div className="grid md:grid-cols-3 gap-8 mb-24">

  {/* ================= EDUCATION ================= */}
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity }}
    whileHover={{
      scale: 1.06,
      rotateX: 6,
      rotateY: -6,
    }}
    style={{ transformStyle: "preserve-3d" }}
    className="
      relative group
      glass-card rounded-3xl p-8
      transition-all duration-500
      hover:shadow-[0_0_140px_-25px_hsl(var(--primary))]
    "
  >
    {/* Energy sweep */}
    <div
      className="
        pointer-events-none absolute inset-0
        bg-gradient-to-r from-transparent via-primary/20 to-transparent
        translate-x-[-120%]
        group-hover:translate-x-[120%]
        transition-transform duration-1000
      "
    />

    {/* Icon */}
    <motion.div
      whileHover={{ rotate: 12, scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Award className="h-8 w-8 text-primary mb-4" />
    </motion.div>

    <h4 className="font-semibold mb-4 group-hover:text-primary transition-colors">
      Education
    </h4>

    {education.map((e) => (
      <p key={e} className="flex gap-3 text-sm mb-2">
        <CheckCircle className="h-4 w-4 text-primary mt-0.5 group-hover:scale-110 transition" />
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
          {e}
        </span>
      </p>
    ))}
  </motion.div>

  {/* ================= SKILLS ================= */}
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity, delay: 0.6 }}
    whileHover={{
      scale: 1.06,
      rotateX: 6,
      rotateY: -6,
    }}
    style={{ transformStyle: "preserve-3d" }}
    className="
      relative group
      glass-card rounded-3xl p-8
      transition-all duration-500
      hover:shadow-[0_0_140px_-25px_hsl(var(--primary))]
    "
  >
    <div
      className="
        pointer-events-none absolute inset-0
        bg-gradient-to-r from-transparent via-primary/20 to-transparent
        translate-x-[-120%]
        group-hover:translate-x-[120%]
        transition-transform duration-1000
      "
    />

    <motion.div
      whileHover={{ rotate: -10, scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Shield className="h-8 w-8 text-primary mb-4" />
    </motion.div>

    <h4 className="font-semibold mb-4 group-hover:text-primary transition-colors">
      Core Skills
    </h4>

    {skills.map((s) => (
      <p key={s} className="flex gap-3 text-sm mb-2">
        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
          {s}
        </span>
      </p>
    ))}
  </motion.div>

  {/* ================= CERTIFICATIONS ================= */}
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity, delay: 1.2 }}
    whileHover={{
      scale: 1.06,
      rotateX: 6,
      rotateY: -6,
    }}
    style={{ transformStyle: "preserve-3d" }}
    className="
      relative group
      glass-card rounded-3xl p-8
      transition-all duration-500
      hover:shadow-[0_0_140px_-25px_hsl(var(--primary))]
    "
  >
    <div
      className="
        pointer-events-none absolute inset-0
        bg-gradient-to-r from-transparent via-primary/20 to-transparent
        translate-x-[-120%]
        group-hover:translate-x-[120%]
        transition-transform duration-1000
      "
    />

    <motion.div
      whileHover={{ rotate: 14, scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Brain className="h-8 w-8 text-primary mb-4" />
    </motion.div>

    <h4 className="font-semibold mb-4 group-hover:text-primary transition-colors">
      Certifications
    </h4>

    {certifications.map((c) => (
      <p key={c} className="flex gap-3 text-sm mb-2">
        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
          {c}
        </span>
      </p>
    ))}
  </motion.div>

</div>

          
          {/* ================= WHY HIRE ME ================= */}
          <div className="group max-w-4xl mx-auto mb-24 glass-card rounded-3xl p-12 hover-lift">
            <h3 className="text-2xl font-bold mb-6 text-center transition-colors group-hover:text-primary">
              Why Hire Me?
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center">
              I don’t just write code — I build systems. With a strong academic
              base, real-world full-stack projects, exposure to cybersecurity,
              and hands-on AI development, I bring a problem-first engineering
              mindset. I learn fast, execute cleanly, and ship solutions that
              scale.
            </p>
          </div>


{/* ================= SKILL RADAR ================= */}
<div className="max-w-4xl mx-auto mb-24">
  <h3 className="text-2xl font-bold text-center mb-10">
    Skill Proficiency Radar
  </h3>

  <div className="glass-card rounded-3xl p-10 hover-lift">
    <RadarChart data={skillRadar} />
  </div>
</div>

          {/* ================= LINKS ================= */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link
              to="/projects"
              className="group glass-card p-8 rounded-2xl hover-lift hover:bg-primary/10"
            >
              <h4 className="font-semibold flex items-center gap-2 group-hover:text-primary">
                View Projects <ArrowRight className="h-4 w-4" />
              </h4>
              <p className="text-sm text-muted-foreground">
                Real-world engineering work
              </p>
            </Link>

            <Link
              to="/contact"
              className="group glass-card p-8 rounded-2xl hover-lift hover:bg-primary/10"
            >
              <h4 className="font-semibold flex items-center gap-2 group-hover:text-primary">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </h4>
              <p className="text-sm text-muted-foreground">
                Open to roles and collaborations
              </p>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
