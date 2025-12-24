import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const badges = [
  {
    title: "Develop GenAI Apps with Gemini & Streamlit",
    issuer: "Google Cloud",
  },
  {
    title: "Inspect Rich Documents with Gemini Multimodality",
    issuer: "Google Cloud",
  },
  {
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
  },
  {
    title: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild",
  },
  {
    title: "Journey to Cloud: Envisioning Your Solution",
    issuer: "IBM SkillsBuild",
  },
];

export function CredlyBadgeCarousel() {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {[...badges, ...badges].map((badge, index) => (
          <motion.a
            key={index}
            href="https://www.credly.com/users/nitin-23bce10310"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.05 }}
            className="group glass-card rounded-2xl p-6 min-w-[260px] flex flex-col justify-between hover:shadow-[0_0_50px_-15px_hsl(var(--primary))] transition-all"
          >
            <div>
              <h4 className="font-semibold mb-1 leading-snug">
                {badge.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {badge.issuer}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition">
              <ExternalLink className="h-3 w-3" />
              View on Credly
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
