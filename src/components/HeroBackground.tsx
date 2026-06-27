import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle, Apple-style ambient background for the light hero.
 * Two soft monochrome blobs drifting slowly behind the content — no colour,
 * no busy data-viz. Purely decorative, disabled under prefers-reduced-motion.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Blob
        className="left-[-6%] top-[8%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(0,0,0,0.05),transparent_68%)]"
        dx={26}
        dy={34}
        dur={22}
      />
      <Blob
        className="right-[-8%] top-[34%] h-[40rem] w-[40rem] bg-[radial-gradient(circle,rgba(0,113,227,0.05),transparent_70%)]"
        dx={-30}
        dy={-24}
        dur={26}
        delay={1.5}
      />
    </div>
  );
}

function Blob({
  className,
  dx,
  dy,
  dur,
  delay = 0,
}: {
  className: string;
  dx: number;
  dy: number;
  dur: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-2xl ${className}`}
      animate={{ x: [0, dx, 0], y: [0, dy, 0] }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
