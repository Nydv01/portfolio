import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Code2,
  Layout,
  Server,
  Database,
  Brain,
  Wrench,
  Shield,
  CheckCircle,
} from "lucide-react";

/* ================================
   DATA (UNCHANGED)
================================ */

const strengths = [
  "Strong DSA & problem-solving mindset",
  "End-to-end project ownership",
  "Clean, scalable system design",
  "API-first backend architecture",
  "Fast learner with production focus",
];

const skillsData = [
  {
    title: "Programming Languages",
    icon: Code2,
    gradient: "from-sky-500 to-cyan-400",
    items: [
      { name: "C++", level: 90 },
      { name: "Python", level: 85 },
      { name: "Java", level: 75 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    gradient: "from-purple-500 to-pink-500",
    items: [
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 90 },
      { name: "Responsive Design", level: 85 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    gradient: "from-green-500 to-emerald-400",
    items: [
      { name: "FastAPI", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "Auth & Authorization", level: 80 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    gradient: "from-orange-500 to-amber-400",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "Supabase", level: 80 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    title: "AI / GenAI",
    icon: Brain,
    gradient: "from-violet-500 to-purple-400",
    items: [
      { name: "OpenAI APIs", level: 85 },
      { name: "Whisper", level: 80 },
      { name: "LLM Applications", level: 80 },
      { name: "Prompt Engineering", level: 85 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    gradient: "from-rose-500 to-red-400",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Linux", level: 75 },
      { name: "Postman", level: 85 },
      { name: "VS Code", level: 95 },
    ],
  },
  {
    title: "Cyber Security",
    icon: Shield,
    gradient: "from-teal-500 to-cyan-400",
    items: [
      { name: "Ethical Hacking", level: 70 },
      { name: "Web Security", level: 75 },
      { name: "Access Control", level: 80 },
      { name: "Secure API Design", level: 80 },
    ],
  },
];

const techStack = [
  "React",
  "TypeScript",
  "Python",
  "C++",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Tailwind CSS",
  "Git",
  "Linux",
  "OpenAI",
  "REST APIs",
  "Docker",
];

/* ================================
   PAGE
================================ */

export default function Skills() {
  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-black" />

        <div className="container-custom">
          <SectionHeading
            title="Skills & Expertise"
            subtitle="Technologies, tools, and strengths I use to build scalable real-world software"
          />

          {/* ================= WHAT I BRING ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-24 glass-card rounded-3xl p-10 hover-lift glow"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              What I Bring to the Table
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {strengths.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= SKILLS GRID ================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-28">
            {skillsData.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{
                  rotateX: 6,
                  rotateY: -6,
                  scale: 1.04,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="
                  relative group
                  glass-card rounded-3xl p-8
                  transition-all duration-500
                  hover:shadow-[0_0_160px_-30px_hsl(var(--primary))]
                "
              >
                {/* Animated border sweep */}
                <div
                  className="
                    pointer-events-none absolute inset-0
                    bg-gradient-to-r from-transparent via-primary/25 to-transparent
                    translate-x-[-120%]
                    group-hover:translate-x-[120%]
                    transition-transform duration-1000
                  "
                />

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9 }}
                          className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                        />
                        {/* shimmer */}
                        <div
                          className="
                            absolute inset-0
                            bg-gradient-to-r from-transparent via-white/30 to-transparent
                            translate-x-[-100%]
                            group-hover:translate-x-[100%]
                            transition-transform duration-1000
                          "
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ================= TECH STACK ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-10">
              Complete Tech Stack
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ y: -6, scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="
                    px-6 py-2 rounded-full
                    bg-muted text-sm font-medium
                    hover:bg-primary/10 hover:text-primary
                    transition-all cursor-default
                  "
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
