import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "../lib/motion";

const BAR_WIDTHS = [3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 2];
const TYPED_TEXT = "Hello, World!";

/**
 * Full-screen intro overlay in two beats: the barcode mark fills with purple
 * like a progress bar (0→100), then "Hello, World!" types out with a blinking
 * cursor before the overlay fades to reveal the page. Shows at most once a day
 * (force with ?intro in the URL); skipped under prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  // Beat 1 — fill the barcode.
  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const force = new URLSearchParams(window.location.search).has("intro");
    const last = Number(localStorage.getItem("preloader-at") || 0);
    if (!force && Date.now() - last < 24 * 60 * 60 * 1000) {
      setDone(true);
      return;
    }
    const id = setInterval(() => {
      setCount((v) => {
        if (v >= 100) {
          clearInterval(id);
          return 100;
        }
        return Math.min(v + 2, 100);
      });
    }, 16);
    return () => clearInterval(id);
  }, [reduce]);

  // Beat 2 — type "Hello, World!".
  useEffect(() => {
    if (count < 100) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TYPED_TEXT.slice(0, i));
      if (i >= TYPED_TEXT.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [count]);

  // Beat 3 — hold briefly, then reveal the page.
  useEffect(() => {
    if (typed !== TYPED_TEXT) return;
    const t = setTimeout(() => setDone(true), 600);
    return () => clearTimeout(t);
  }, [typed]);

  useEffect(() => {
    if (done) {
      localStorage.setItem("preloader-at", String(Date.now()));
      document.body.style.overflow = "";
    } else if (!reduce) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [done, reduce]);

  if (reduce) return null;

  const lit = Math.round((count / 100) * BAR_WIDTHS.length);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-8" aria-hidden>
            {/* Barcode as progress bar: bars light up purple left to right */}
            <div className="flex h-12 items-stretch gap-[4px]">
              {BAR_WIDTHS.map((w, i) => (
                <span
                  key={i}
                  style={{ width: w * 3 }}
                  className={`block rounded-[1.5px] transition-colors duration-200 ${
                    i < lit ? "bg-accent" : "bg-white/15"
                  }`}
                />
              ))}
            </div>

            {/* Reserved line: counter during fill, typing afterwards */}
            <div className="flex h-9 items-center">
              {count < 100 ? (
                <span className="text-[0.95rem] font-medium tabular-nums text-white/40">
                  ({String(count).padStart(3, "0")})
                </span>
              ) : (
                <span className="text-[1.5rem] font-semibold tracking-tight text-white">
                  {typed}
                  <motion.span
                    className="ml-0.5 inline-block h-[1.2em] w-[2px] translate-y-[0.2em] bg-accent"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                  />
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Vertical-bar "barcode" mark used as the brand glyph. */
export function Barcode({ className = "h-9" }: { className?: string }) {
  return (
    <div className={`flex items-stretch gap-[3px] ${className}`}>
      {BAR_WIDTHS.map((w, i) => (
        <span
          key={i}
          style={{ width: w * 2 }}
          className="block rounded-[1px] bg-accent"
        />
      ))}
    </div>
  );
}
