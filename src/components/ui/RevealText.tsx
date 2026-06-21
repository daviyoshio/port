import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "../../lib/motion";

interface RevealTextProps {
  text: string;
  className?: string;
  /** Delay before the first word starts (seconds). */
  delay?: number;
}

const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.72, ease: EASE } },
};

const container = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
});

/**
 * Masked, word-by-word reveal used on headings — each word rises from behind a
 * clip mask as it scrolls into view. The signature "Framer portfolio" text
 * animation. Accessible: the full string is exposed via aria-label.
 *
 * Render inside a heading element, e.g. <h2 className="..."><RevealText text=... /></h2>
 */
export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      style={{ display: "inline" }}
      variants={container(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            aria-hidden
            className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
