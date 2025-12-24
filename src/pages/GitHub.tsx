import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Github,
  Star,
  Users,
  GitBranch,
  Activity,
  ExternalLink,
  Code2,
} from "lucide-react";

/* =========================================================
   GITHUB STATS
========================================================= */

const githubStats = [
  { icon: Code2, value: "7+", label: "Public Repositories" },
  { icon: Star, value: "3+", label: "Full Stack Projects" },
  { icon: Users, value: "30+", label: "Contributions" },
  { icon: Activity, value: "Consistent", label: "Active Contributions" },
];

/* =========================================================
   REPOSITORIES
========================================================= */

const repositories = [
  {
    name: "WanderGlow",
    description:
      "AI-powered travel itinerary generator using GenAI, FastAPI, and scalable backend architecture.",
    tech: ["React", "FastAPI", "MongoDB", "OpenAI"],
    tag: "GenAI × Backend",
    url: "https://github.com/Nydv01/wanderglow-ai-planner",
  },
  {
    name: "Nexus (Campus Platform)",
    description:
      "Full-stack smart campus ecosystem enabling announcements, events, collaboration, and role-based access.",
    tech: ["React", "FastAPI", "Supabase", "PostgreSQL"],
    tag: "Full-Stack",
    url: "https://github.com/Nydv01/nexus-campus-app",
  },
  {
    name: "Cognitive Agent Interface",
    description:
      "Portfolio-grade interface for a LangChain cognitive agent with tool usage, memory, and reasoning.",
    tech: ["React", "LangChain", "LLMs"],
    tag: "AI Systems",
    url: "https://github.com/Nydv01/cognitive-agent-interface",
  },
  {
    name: "AI PDF Chatbot",
    description:
      "Chat with PDFs using FastAPI, LangChain, vector embeddings, and OpenAI.",
    tech: ["FastAPI", "LangChain", "OpenAI"],
    tag: "AI × APIs",
    url: "https://github.com/Nydv01/ai-pdf-chatbot-langchain",
  },
  {
    name: "WhisperAI Transcriber",
    description:
      "Speech-to-text system using OpenAI Whisper with clean UX and multiple format support.",
    tech: ["Python", "Whisper", "Streamlit"],
    tag: "AI Tooling",
    url: "https://github.com/Nydv01/WhisperAI_Transcriber",
  },
];

/* =========================================================
   CONTRIBUTION HEATMAP DATA (VISUAL)
========================================================= */

const contributionData = Array.from({ length: 7 }, () =>
  Array.from({ length: 52 }, () => Math.floor(Math.random() * 5))
);

/* =========================================================
   HEATMAP COMPONENT
========================================================= */

function ContributionHeatmap() {
  return (
    <div className="glass-card rounded-3xl p-10 mt-24">
      <h3 className="text-xl font-semibold mb-6">
        Contribution Activity
      </h3>

      <div className="overflow-x-auto">
        <div className="grid grid-rows-7 gap-2 min-w-[920px]">
          {contributionData.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((level, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (rowIndex * 52 + colIndex) * 0.002,
                    duration: 0.4,
                  }}
                  whileHover={{
                    scale: 1.4,
                    boxShadow: "0 0 12px hsl(var(--primary))",
                  }}
                  className={`
                    w-3.5 h-3.5 rounded-full transition-all
                    ${
                      level === 0 && "bg-muted"
                    }
                    ${
                      level === 1 && "bg-primary/30"
                    }
                    ${
                      level === 2 && "bg-primary/50"
                    }
                    ${
                      level === 3 && "bg-primary/70"
                    }
                    ${
                      level === 4 && "bg-primary"
                    }
                  `}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        * Visual representation of GitHub contribution activity.  
        Visit GitHub for verified data.
      </p>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function GitHubShowcase() {
  return (
    <PageTransition>
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-black" />

        <div className="container-custom">
          <SectionHeading
            title="GitHub & Open-Source Engineering"
            subtitle="Real code, real systems, and consistent engineering output"
          />

          {/* ================= STATS ================= */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-24">
            {githubStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center hover-lift glow"
              >
                <stat.icon className="h-7 w-7 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* ================= CONTEXT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <p className="text-muted-foreground leading-relaxed">
              My GitHub reflects how I think as an engineer — building real
              systems, experimenting with GenAI, designing scalable backends,
              and refining code through iteration.
            </p>
          </motion.div>

          {/* ================= HEATMAP ================= */}
          <ContributionHeatmap />

          {/* ================= REPOSITORIES ================= */}
          <h3 className="text-2xl font-bold mt-28 mb-10 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            Featured & Notable Repositories
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {repositories.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-card rounded-3xl p-8 hover-lift relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-semibold group-hover:text-primary transition">
                    {repo.name}
                  </h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-medium text-primary">
                  {repo.tag}
                </span>
              </motion.a>
            ))}
          </div>

          {/* ================= CTA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <Button asChild size="lg" className="gap-2 glow hover-lift">
              <a
                href="https://github.com/Nydv01"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                Explore Full GitHub Profile
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
