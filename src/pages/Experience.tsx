import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Rocket,
  Layers,
  Code2,
  Shield,
  Zap,
  Database,
  Brain,
} from "lucide-react";

/* =========================
   EXPERIENCE DATA
========================= */

const experiences = [
  {
    icon: Rocket,
    title: "Project-Based Engineering",
    description:
      "Designed and shipped real-world applications by owning the complete lifecycle from idea to production.",
    highlights: [
      "End-to-end system ownership",
      "Problem-first engineering",
      "Clean, scalable codebases",
    ],
  },
  {
    icon: Layers,
    title: "Backend & System Design",
    description:
      "Built scalable backend systems using FastAPI and Node.js with modular, maintainable architecture.",
    highlights: [
      "RESTful API design",
      "Service-based architecture",
      "Scalability planning",
    ],
  },
  {
    icon: Code2,
    title: "API Design & Optimization",
    description:
      "Designed secure and performant APIs with authentication, authorization, and optimized queries.",
    highlights: [
      "JWT authentication",
      "RBAC implementation",
      "Performance-aware APIs",
    ],
  },
  {
    icon: Database,
    title: "Database Engineering",
    description:
      "Hands-on experience with relational and NoSQL databases focusing on data integrity and efficiency.",
    highlights: [
      "Schema design",
      "Indexing strategies",
      "Optimized queries",
    ],
  },
  {
    icon: Shield,
    title: "Security & Best Practices",
    description:
      "Applied security-first thinking across applications to protect users and data.",
    highlights: [
      "Secure auth flows",
      "Input sanitization",
      "Vulnerability awareness",
    ],
  },
  {
    icon: Zap,
    title: "Production-Oriented Workflow",
    description:
      "Worked with industry-style tools and workflows resembling real production environments.",
    highlights: [
      "Git collaboration",
      "Code reviews",
      "CI/CD fundamentals",
    ],
  },
];

/* =========================
   GRAPH DATA
========================= */

const _growthPoints = [
  { label: "Foundations", value: 30 },
  { label: "Backend", value: 50 },
  { label: "Full-Stack", value: 70 },
  { label: "AI / GenAI", value: 85 },
  { label: "Production", value: 95 },
];

export default function Experience() {
  return (
    <PageTransition>
      <section className="section-padding">
        <div className="container-custom">

          <SectionHeading
            title="Experience & Practical Learning"
            subtitle="Engineering growth built through real projects, iteration, and hands-on execution"
          />

          {/* ================= EXPERIENCE OVERVIEW ================= */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: Brain,
                title: "Engineering Mindset",
                desc: "Thinking in systems, trade-offs, and scalability.",
              },
              {
                icon: Rocket,
                title: "Execution Driven",
                desc: "Focused on shipping real, usable software.",
              },
              {
                icon: Layers,
                title: "Growth Focused",
                desc: "Learning by building, breaking, and improving.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card rounded-2xl p-6 text-center hover-lift"
              >
                <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ================= EXPERIENCE CARDS ================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-card rounded-3xl p-8 hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_40px_120px_-30px_rgba(99,102,241,0.45)]"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <exp.icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-3">
                  {exp.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((item) => (
                    <li key={item} className="flex gap-2 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ================= PRACTICAL LEARNING GROWTH ================= */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="glass-card rounded-3xl p-10 mb-20"
>
  <h3 className="text-2xl font-bold text-center mb-10">
    Practical Learning Growth
  </h3>

  <div className="relative max-w-5xl mx-auto h-[360px]">

    {/* Y Axis Labels */}
    <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-xs text-muted-foreground">
      <span>Expert</span>
      <span>Advanced</span>
      <span>Intermediate</span>
      <span>Beginner</span>
    </div>

    {/* X Axis Labels */}
    <div className="absolute left-12 right-0 bottom-0 flex justify-between text-xs text-muted-foreground">
      <span>Foundations</span>
      <span>Backend</span>
      <span>Full-Stack</span>
      <span>AI / GenAI</span>
      <span>Production</span>
    </div>

    {/* Graph */}
    <svg
      viewBox="0 0 520 300"
      className="absolute left-12 right-0 top-0 bottom-10 w-full h-full"
    >
      {/* Grid Lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="0"
          x2="520"
          y1={i * 75}
          y2={i * 75}
          stroke="hsl(var(--border))"
          strokeOpacity="0.4"
        />
      ))}

      {/* Curve */}
      <motion.path
        d="
          M 0 230
          C 120 210, 160 170, 220 150
          S 320 100, 360 85
          S 450 40, 520 25
        "
        fill="none"
        stroke="url(#curveGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      {/* Gradient */}
      <defs>
        <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Nodes */}
      {[
        { x: 0, y: 230 },
        { x: 150, y: 170 },
        { x: 260, y: 120 },
        { x: 380, y: 80 },
        { x: 520, y: 25 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="7"
          fill="#6366f1"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ scale: 1.6 }}
          className="cursor-pointer drop-shadow-[0_0_12px_rgba(99,102,241,0.9)]"
        />
      ))}
    </svg>
  </div>

  <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
    This curve reflects my growth from programming foundations to building
    production-ready backend systems, AI-powered applications, and secure
    software architectures.
  </p>
</motion.div>


          {/* ================= PHILOSOPHY ================= */}
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold mb-4">
              My Engineering Philosophy
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I believe strong engineering skills are built by solving real
              problems, understanding trade-offs, and continuously refining
              systems. Each project helps me think deeper, design better, and
              write cleaner code.
            </p>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
