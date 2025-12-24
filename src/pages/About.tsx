import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Heart,
  Users,
  Lightbulb,
  Target,
  ShieldCheck,
} from "lucide-react";

/* ===================== */
/*        TIMELINE       */
/* ===================== */

const timeline = [
  {
    year: "2023 – 2027",
    title: "B.Tech in Computer Science Engineering",
    institution: "VIT Bhopal University",
    description:
      "Focused on core computer science fundamentals, software engineering, system design, and problem-solving.",
  },
  {
    year: "2023",
    title: "Programming Foundations",
    description:
      "Built strong fundamentals in C++ and Python with Data Structures & Algorithms.",
  },
  {
    year: "2024",
    title: "Full-Stack Development",
    description:
      "Developed scalable applications using React, FastAPI, Node.js, and modern backend architectures.",
  },
  {
    year: "2024",
    title: "AI & Generative Systems",
    description:
      "Worked with LLMs, speech models, and AI APIs to build intelligent, production-grade tools.",
  },
  {
    year: "2025",
    title: "Ethical Hacking & Cybersecurity Foundations",
    description:
      "Learned ethical hacking concepts, system vulnerabilities, threat models, and secure application practices.",
    icon: ShieldCheck,
  },
];

/* ===================== */
/*      CORE STRENGTHS   */
/* ===================== */

const softSkills = [
  {
    icon: Lightbulb,
    label: "Analytical Thinking",
    description: "Breaking down complex problems into structured solutions",
  },
  {
    icon: Users,
    label: "Collaboration",
    description: "Working effectively in teams with shared ownership",
  },
  {
    icon: Heart,
    label: "Communication",
    description: "Explaining technical ideas clearly and confidently",
  },
  {
    icon: Target,
    label: "Execution",
    description: "Delivering features end-to-end with accountability",
  },
];

export default function About() {
  return (
    <PageTransition>
      <section className="section-padding">
        <div className="container-custom">

          <SectionHeading
            title="About Me"
            subtitle="My journey, strengths, and engineering mindset"
          />
{/* ================= HERO STACK ================= */}
<div className="relative flex justify-center mb-36">

  {/* Ambient glow */}
  <div className="absolute inset-0 -z-10 flex justify-center items-center">
    <div className="w-[560px] h-[560px] rounded-full bg-purple-500/30 blur-[180px]" />
  </div>

  {/* Back layered cards */}
  <div className="absolute w-[380px] h-[480px] rounded-[2.5rem] 
                  bg-gradient-to-br from-purple-600/30 to-pink-500/20 
                  rotate-[-12deg]" />

  <div className="absolute w-[380px] h-[480px] rounded-[2.5rem] 
                  bg-gradient-to-br from-indigo-600/30 to-purple-500/20 
                  rotate-[8deg]" />

  {/* Main card */}
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative w-[400px] h-[520px] rounded-[2.5rem] 
               glass-card flex items-center justify-center"
  >
    {/* ===== CENTER AVATAR ===== */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="text-[7rem]"
    >
    🧔🏻

    </motion.div>

    {/* ===== FLOATING CORNER CHIPS ===== */}

    {/* Top Left */}
    <motion.span
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-4 left-4 premium-chip"
    >
      🛡️ Ethical Hacker
    </motion.span>

    {/* Top Right */}
    <motion.span
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      className="absolute top-4 right-4 premium-chip"
    >
      🤖 Gen-AI Engineer
    </motion.span>

    {/* Bottom Left */}
    <motion.span
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
      className="absolute bottom-4 left-4 premium-chip"
    >
      ⚡ Full-Stack Dev
    </motion.span>

    {/* Bottom Right */}
    <motion.span
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
      className="absolute bottom-4 right-4 premium-chip"
    >
      🎓 CSE Student
    </motion.span>

  </motion.div>
</div>

          {/* ================= BIO ================= */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-28">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/20 blur-2xl" />
                <div className="relative glass-card rounded-3xl flex items-center justify-center h-full">
                  <span className="text-8xl">👨‍💻</span>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold">
                Hi, I’m <span className="gradient-text">Nitin Yadav</span>
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                I’m a Computer Science Engineering student passionate about
                building scalable, secure, real-world software systems.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My foundations include{" "}
                <span className="text-foreground font-medium">
                  DSA, OS, DBMS, Computer Networks, and Cybersecurity
                </span>
                , with hands-on experience in full-stack and AI-powered systems.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  B.Tech CSE
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Bhopal, India
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  2023 – 2027
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= TIMELINE ================= */}
          <div className="mb-28">
            <h3 className="text-2xl font-bold text-center mb-14">
              Journey So Far
            </h3>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className={`relative flex ${
                      index % 2 === 0
                        ? "md:flex-row"
                        : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary" />

                    <div
                      className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        index % 2 === 0
                          ? "md:mr-auto md:pr-8"
                          : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <div className="glass-card rounded-xl p-6 hover-lift">
                        <span className="text-sm font-medium text-primary">
                          {item.year}
                        </span>
                        <h4 className="text-lg font-semibold mt-1 flex items-center gap-2">
                          {item.title}
                          {item.icon && (
                            <item.icon className="h-4 w-4 text-primary" />
                          )}
                        </h4>
                        {item.institution && (
                          <p className="text-sm text-muted-foreground">
                            {item.institution}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= CORE STRENGTHS ================= */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-14">
              Core Strengths
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group glass-card rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)]"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20">
                    <skill.icon className="h-7 w-7 text-primary group-hover:text-indigo-400" />
                  </div>
                  <h4 className="font-semibold mb-2">{skill.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
