import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
      style={{ willChange: "opacity, transform" }}
    >
      <h2 className="inline-block text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
