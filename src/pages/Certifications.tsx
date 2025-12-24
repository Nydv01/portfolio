import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { CredlyBadgeCarousel } from "@/components/CredlyBadgeCarousel";

import {
  Award,
  ShieldCheck,
  Brain,
  Cloud,
  ExternalLink,
  BadgeCheck,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* =========================================================
   CERTIFICATIONS
========================================================= */

const certifications = [
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google · Coursera",
    year: "2025",
    icon: ShieldCheck,
    description:
      "Industry-recognized program covering security operations, network security, Linux, risk management, and incident response.",
    highlights: [
      "Security operations & SIEM basics",
      "Threats, vulnerabilities & risk mitigation",
      "Linux & SQL for security tasks",
    ],
    skills: [
      "Security Operations",
      "Incident Response",
      "Risk Management",
      "Network Security",
    ],
  },
  {
    title: "Industrial IoT Markets & Security",
    issuer: "Coursera",
    year: "2025",
    icon: Cloud,
    description:
      "Focused on Industrial IoT ecosystems, attack surfaces, and security challenges in connected systems.",
    highlights: [
      "IIoT architectures",
      "Security challenges in smart systems",
      "Risk-aware system design",
    ],
    skills: ["IoT Security", "Threat Modeling", "Secure Architecture"],
  },
  {
    title: "Google Generative AI Certification",
    issuer: "SmartBridge · Google",
    year: "2025",
    icon: Brain,
    description:
      "Hands-on certification focused on Generative AI concepts, LLM usage, prompt design, and real-world AI applications.",
    highlights: [
      "GenAI fundamentals",
      "LLM-powered application design",
      "Responsible AI practices",
    ],
    skills: [
      "Generative AI",
      "Prompt Engineering",
      "LLM Applications",
      "Responsible AI",
    ],
  },
];

/* =========================================================
   SKILL BADGES
========================================================= */

/* Removed unused `skillBadges` constant to avoid linter/compile errors. If you need to use these values,
   reintroduce the array and pass it to the component that requires it. */

/* =========================================================
   ACHIEVEMENTS
========================================================= */

const achievements = [
  {
    title: "Strong Security & AI Foundation",
    description:
      "Certified learning across cybersecurity, GenAI, and cloud-native systems from Google and IBM-backed programs.",
  },
  {
    title: "Verifiable Skill Badges",
    description:
      "Earned multiple skill badges validated on Credly, demonstrating applied, hands-on capabilities.",
  },
  {
    title: "Continuous Learning Mindset",
    description:
      "Actively upskilling in emerging domains like AI security, GenAI systems, and cloud infrastructure.",
  },
  {
    title: "Recruiter-Verifiable Profile",
    description:
      "All certifications and badges are publicly verifiable via LinkedIn and Credly.",
  },
];

/* =========================================================
   SECURITY × AI
========================================================= */

const securityAICrossover = [
  "Prompt-level vulnerability analysis",
  "Secure GenAI API design",
  "AI-assisted threat detection",
  "Data leakage & model misuse prevention",
];

export default function Certifications() {
  return (
    <PageTransition>
      <section className="section-padding bg-background">
        <div className="container-custom">

          {/* ✅ FIXED HEADING (NO BLUE BACKGROUND) */}
          <SectionHeading
            title="Certifications & Credentials"
            subtitle="Industry-recognized certifications and verified skill badges demonstrating applied expertise"
          />

          {/* ================= CERTIFICATIONS ================= */}
          <div className="mb-32">
            <h3 className="text-2xl font-bold mb-12 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Professional Certifications
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {certifications.map((cert, index) => (
                <motion.a
                  key={cert.title}
                  href="https://www.linkedin.com/in/ydv-nitin/details/certifications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="group glass-card rounded-3xl p-8 hover-lift relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <cert.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-5">
                    {cert.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {cert.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Skills */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all">
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs font-semibold mb-2 text-primary">
                        Skills Gained
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-1 rounded-full bg-muted"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ExternalLink className="absolute bottom-5 right-5 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ================= SKILL BADGES ================= */}
<div className="mb-32">
  <h3 className="text-2xl font-bold mb-12 flex items-center gap-2">
    <BadgeCheck className="h-6 w-6 text-primary" />
    Skill Badges (Credly)
  </h3>

  <div className="glass-card rounded-3xl p-10">
    <CredlyBadgeCarousel />

    <div className="text-center mt-10">
      <Button asChild variant="outline" className="gap-2">
        <a
          href="https://www.credly.com/users/nitin-23bce10310"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="h-4 w-4" />
          View Full Credly Profile
        </a>
      </Button>
    </div>
  </div>
</div>


          {/* ================= SECURITY × AI ================= */}
          <div className="mb-32 text-center">
            <h3 className="text-2xl font-bold mb-8 flex justify-center gap-2">
              <Lock className="text-primary" />
              Security × AI Expertise
            </h3>

            <div className="max-w-3xl mx-auto glass-card rounded-3xl p-10">
              <ul className="space-y-4">
                {securityAICrossover.map((item) => (
                  <li
                    key={item}
                    className="group flex items-start gap-3 text-muted-foreground hover:translate-x-1 transition-all"
                  >
                    <span className="mt-1 transition-colors group-hover:text-primary">
                      ✔
                    </span>
                    <span className="group-hover:text-foreground transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ================= ACHIEVEMENTS ================= */}
          <div>
            <h3 className="text-2xl font-bold mb-12">Key Highlights</h3>

            <div className="grid sm:grid-cols-2 gap-10">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-3xl p-10 hover-lift glow"
                >
                  <h4 className="font-semibold mb-4">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= CTA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <p className="text-muted-foreground mb-6">
              All credentials are publicly verifiable and recruiter-friendly.
            </p>

            <div className="group inline-block relative">
              <Button
                asChild
                size="lg"
                className="gap-2 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_hsl(var(--primary))] transition-all"
              >
                <a
                  href="https://linkedin.com/in/ydv-nitin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-5 w-5 group-hover:rotate-6 transition-transform" />
                  Verify on LinkedIn
                </a>
              </Button>

              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all">
                <div className="rounded-xl bg-card px-4 py-2 text-xs border border-border shadow-lg">
                  Publicly verifiable recruiter profile
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
}
