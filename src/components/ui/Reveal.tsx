import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Fraction of the element visible before triggering. */
  amount?: number;
  as?: "div" | "li" | "article" | "section" | "span";
}

/**
 * Fade + subtle slide-up on scroll into view. Animates once.
 * Honours prefers-reduced-motion (renders without transform/opacity shift).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.7,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </MotionTag>
  );
}
