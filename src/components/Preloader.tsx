import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "../lib/motion";

const PHRASE = "Hello, World";

/**
 * Apple/developer-style intro: on a clean off-white canvas, a line of SF Mono
 * types out "Hello, World" with a blinking caret, then fades fluidly into the
 * page. Shows once per tab session, skipped under prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  // Type the phrase out, character by character.
  useEffect(() => {
    if (reduce || sessionStorage.getItem("preloaded")) {
      setDone(true);
      return;
    }
    const id = setInterval(() => {
      setTyped((v) => {
        if (v >= PHRASE.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 78);
    return () => clearInterval(id);
  }, [reduce]);

  // Hold briefly once fully typed, then dismiss.
  useEffect(() => {
    if (typed >= PHRASE.length) {
      const t = setTimeout(() => setDone(true), 620);
      return () => clearTimeout(t);
    }
  }, [typed]);

  // Lock scroll while the overlay is up.
  useEffect(() => {
    if (done) {
      sessionStorage.setItem("preloaded", "1");
      document.body.style.overflow = "";
    } else if (!reduce) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [done, reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#fbfbfd]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center font-mono text-[clamp(1.6rem,5vw,2.6rem)] font-medium tracking-[-0.01em] text-ink"
          >
            <span className="mr-3 select-none text-faint">{"›"}</span>
            <span>{PHRASE.slice(0, typed)}</span>
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] bg-accent"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 0.9,
                times: [0, 0.5, 0.5, 1],
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
