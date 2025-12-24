import { motion, type Transition } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const transition: Transition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1], // typed as tuple
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        initial: { opacity: 0, y: 16 },
        enter: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
      }}
      transition={transition}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
