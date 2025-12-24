import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Github,
  Plane,
  Building2,
  Mic,
  Code,
  Sparkles,
  
  Wrench,
} from "lucide-react";

/* ===========================
   PROJECTS DATA
=========================== */

const projects = [
  {
    title: "WanderGlow",
    subtitle: "AI Powered Itinerary Planner",
    description:
      "A production-grade AI travel planner that generates personalized itineraries based on user preferences, time constraints, and locations using a scalable MERN + FastAPI architecture.",
    icon: Plane,
    image: "🗺️",
    techStack: ["React", "FastAPI", "MongoDB", "OpenAI API", "Tailwind CSS"],
    highlights: [
      "Designed end-to-end system architecture",
      "Integrated GenAI for dynamic itinerary generation",
      "Built secure authentication & preference engine",
    ],
    github: "https://github.com/Nydv01/wanderglow-ai-planner.git",
    live: null,
    featured: true,
  },
  {
    title: "Nexus",
    subtitle: "Smart Campus Platform",
    description:
      "A full-stack platform designed to improve campus life with marketplaces, events, study groups, and role-based access using Supabase and PostgreSQL.",
    icon: Building2,
    image: "🎓",
    techStack: ["React", "FastAPI", "Supabase", "PostgreSQL"],
    highlights: [
      "Role-based access control",
      "Scalable backend with Supabase",
      "Modular feature-based architecture",
    ],
    github: "https://github.com/Nydv01/nexus-campus-app.git",
    live: null,
    featured: true,
  },
  {
    title: "WhisperAI",
    subtitle: "AI Audio Transcription",
    description:
      "An AI-powered speech-to-text system using OpenAI Whisper with a clean Streamlit interface for fast and accurate transcription.",
    icon: Mic,
    image: "🎙️",
    techStack: ["Python", "OpenAI Whisper", "Streamlit", "FastAPI"],
    highlights: [
      "Integrated Whisper for accurate STT",
      "Built clean UX for non-technical users",
      "Handled multiple audio formats",
    ],
    github: "https://github.com/Nydv01/WhisperAI_Transcriber.git",
    live: null,
    featured: true,
  },
  {
    title: "Mini Projects & DSA",
    subtitle: "Foundations & Problem Solving",
    description:
      "A collection of backend APIs, DSA implementations, automation scripts, and CLI tools developed while strengthening CS fundamentals.",
    icon: Code,
    image: "💻",
    techStack: ["C++", "Python", "Java", "JavaScript"],
    highlights: [
      "Strong DSA foundations",
      "Backend & API experiments",
      "Automation & scripting",
    ],
    github: "https://github.com/Nydv01/ai-pdf-chatbot-langchain.git1",
    live: null,
    featured: false,
  },
];

/* ===========================
   COMPONENT
=========================== */
export default function Projects() {
  const featuredProjects = projects.filter(p => p.featured);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
  
    <PageTransition>
      <section className="section-padding overflow-hidden">
        <div className="container-custom">

          <SectionHeading
            title="Systems I’ve Built"
            subtitle="Production-grade applications showcasing my full-stack, backend, and AI engineering skills"
          />

          {/* ================= FEATURED AUTO SCROLL ================= */}
          <div className="relative mb-28">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...featuredProjects, ...featuredProjects].map((project, i) => (
                <div
                  key={i}
                  className="min-w-[340px] glass-card rounded-3xl p-8 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/30 blur-xl md:blur-3xl opacity-30" />

                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-4">{project.image}</div>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ================= PROJECT LIST ================= */}
          <div className="space-y-20">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, rotateX: 4, rotateY: -4 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                viewport={{ once: true }}
                className={`group relative glass-card rounded-3xl overflow-hidden
                  hover:shadow-[0_60px_160px_-40px_rgba(99,102,241,0.6)]
                  ${project.featured ? "ring-1 ring-primary/40 glow" : "border border-border"}`}
              >

                {/* Feedback Pulse */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute -inset-32 bg-gradient-to-r from-primary/25 via-purple-500/25 to-pink-500/25 blur-xl md:blur-3xl animate-pulse" />
                </div>

                <div className="grid md:grid-cols-[380px_1fr] relative z-10">
                  {/* Visual */}
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20">
                    <motion.div
                      animate={isMobile ? { y: [0, -6, 0] } : { y: [0, -14, 0] }}
transition={{
  duration: isMobile ? 6 : 4,
  repeat: Infinity,
  ease: "easeInOut",
}}

                      className="text-8xl"
                    >
                      {project.image}
                    </motion.div>

                    {project.featured && (
                      <Badge className="absolute top-4 left-4 gap-1">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10">
                    <div className="flex justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-primary font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                      <project.icon className="h-8 w-8 text-primary" />
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-2 text-sm group-hover:text-primary transition-colors"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="hover:bg-primary hover:text-white hover:scale-110 transition-all"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button asChild variant="outline" size="sm" className="hover:scale-110">
                        <a href={project.github} target="_blank" rel="noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>

                      {project.live && (
                        <Button asChild size="sm">
                          <a href={project.live} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= CURRENTLY WORKING ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-32 glass-card rounded-3xl p-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <Wrench className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Currently Working On</h3>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Building scalable AI-powered systems, secure backend architectures,
              and production-grade full-stack applications.
            </p>
          </motion.div>

          {/* ================= CTA ================= */}
          <motion.div className="text-center mt-24">
            <Button asChild size="lg" className="gap-2 glow hover-lift">
              <a href="https://github.com/Nydv01" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
                Explore More on GitHub
              </a>
            </Button>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
}
