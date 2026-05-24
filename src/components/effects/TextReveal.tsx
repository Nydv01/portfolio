/* =========================================================
   TEXT REVEAL — Cinematic Text Entrance Animation
   Splits text into individual characters or words and reveals
   them with a blur-to-sharp, stagger, and slide animation
   when the component enters the viewport.
========================================================= */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/usePortfolio';
import { easings } from '@/lib/animations';

interface TextRevealProps {
  /** Text content to animate */
  text: string;
  /** HTML element wrapper */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  /** Extra CSS classes */
  className?: string;
  /** Initial delay in seconds before starting animation */
  delay?: number;
  /** Split criteria: 'char' or 'word' */
  splitBy?: 'char' | 'word';
  /** Trigger only once when entering viewport */
  once?: boolean;
}

/**
  * TextReveal — Cinematic text reveal component.
  * Splits text by character or word, fading and blurring them in on viewport entrance.
  * Fully accessible with aria-label. Respects prefers-reduced-motion.
  */
export default function TextReveal({
  text,
  as = 'p',
  className = '',
  delay = 0,
  splitBy = 'char',
  once = true,
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });

  // Renders the wrapper element dynamically
  const Component = as as any;

  // Fallback for prefers-reduced-motion: show immediately
  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  // Split logic
  const items = splitBy === 'char' ? text.split('') : text.split(' ');

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === 'char' ? 0.025 : 0.08,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: easings.premium,
      },
    },
  };

  const isGradient = className.includes('gradient-text');
  const parentClassName = isGradient ? className.replace('gradient-text', '').trim() : className;
  const childClassName = isGradient ? 'gradient-text' : '';

  return (
    <Component
      ref={ref}
      className={`${parentClassName} inline-block`}
      aria-label={text}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-block"
      >
        {items.map((item, idx) => {
          const isSpace = item === ' ';
          const showItem = splitBy === 'char' ? (isSpace ? '\u00A0' : item) : item;

          return (
            <motion.span
              key={`${item}-${idx}`}
              variants={itemVariants}
              className={`inline-block ${childClassName}`}
              style={{
                display: splitBy === 'char' && isSpace ? 'inline' : 'inline-block',
                marginRight: splitBy === 'word' ? '0.25em' : '0px',
              }}
            >
              {showItem}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
}
