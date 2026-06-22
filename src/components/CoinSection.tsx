import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { journeyLogos, type JourneyLogo } from "../data/journeyLogos";
import { useI18n } from "../i18n/LanguageContext";
import { EASE } from "../lib/motion";

const N = journeyLogos.length;

// Coin geometry: real thickness built from stacked discs (the metallic edge).
const THICKNESS = 26; // px
const LAYERS = 26;

/**
 * Scroll-driven 3D coin between the story and impact sections. A real metallic
 * coin (two faces + an extruded edge) falls in, spins on a tilted axis flipping
 * through each institution's logo (Yamá → Ibmec → PagBank), the screen darkens,
 * then it falls away. Inspired by the reference site's rotating-coin section.
 */
export function CoinSection() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Spin (one turn → the three logos).
  const spin = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Falling choreography on the outer wrapper, with a constant organic tilt so
  // the spin reads as a tossed coin rather than a flat turntable.
  const y = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [-360, 0, 0, 420]);
  const tiltX = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [68, 16, 16, -48]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0.62, 1, 1, 0.8]);
  const coinOpacity = useTransform(scrollYProgress, [0, 0.07, 0.9, 1], [0, 1, 1, 0]);

  // Screen darkens through the middle, back to light to meet the next section.
  const bg = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["#f7f6fb", "#0b0716", "#ffffff"],
  );
  const fg = useTransform(
    scrollYProgress,
    [0, 0.3, 0.72, 1],
    ["#0a0a0a", "#ffffff", "#ffffff", "#0a0a0a"],
  );

  const [segment, setSegment] = useState(0);
  useMotionValueEvent(spin, "change", (d) => {
    setSegment(Math.floor((d + 90) / 180));
  });

  const index = ((segment % N) + N) % N;
  const frontIndex = (segment % 2 === 0 ? segment : segment + 1) % N;
  const backIndex = (segment % 2 === 0 ? segment + 1 : segment) % N;
  const current = journeyLogos[index];

  // Reduced motion: a calm static row of logos, no rotation or pinning.
  if (reduce) {
    return (
      <section id="moeda" className="bg-canvas-alt px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-[var(--container-page)] text-center">
          <span className="eyebrow justify-center">{t.coin.eyebrow}</span>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {journeyLogos.map((logo) => (
              <div key={logo.name} className="flex flex-col items-center gap-3">
                <div className="grid h-28 w-28 place-items-center rounded-full bg-[radial-gradient(circle_at_36%_30%,#fcfbff,#e9e8f1_60%,#d2d0de)] shadow-soft">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-[52%] max-w-[64%] object-contain"
                  />
                </div>
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="moeda" ref={ref} className="relative h-[280vh]">
      <motion.div
        style={{ backgroundColor: bg, color: fg }}
        className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        <motion.span
          style={{ color: fg }}
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] opacity-70"
        >
          {t.coin.eyebrow}
        </motion.span>

        {/* Coin */}
        <div className="relative mt-12" style={{ perspective: 1300 }} aria-hidden>
          <motion.div
            style={{
              y,
              scale,
              opacity: coinOpacity,
              rotateX: tiltX,
              rotateZ: -11,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              style={{ rotateY: spin, transformStyle: "preserve-3d" }}
              className="relative h-[clamp(240px,52vw,460px)] w-[clamp(240px,52vw,460px)]"
            >
              {/* Edge: stacked discs give real thickness + a metallic rim */}
              {Array.from({ length: LAYERS }).map((_, i) => {
                const z = (i / (LAYERS - 1) - 0.5) * THICKNESS;
                const l = 62 - (i / (LAYERS - 1)) * 24; // top lighter → bottom darker
                return (
                  <span
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      backgroundColor: `hsl(245 8% ${l}%)`,
                    }}
                  />
                );
              })}

              <CoinFace logo={journeyLogos[frontIndex]} z={THICKNESS / 2 + 0.6} />
              <CoinFace logo={journeyLogos[backIndex]} z={THICKNESS / 2 + 0.6} back />
            </motion.div>
          </motion.div>
        </div>

        {/* Changing caption */}
        <div className="mt-12 flex h-20 flex-col items-center justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col items-center gap-1.5"
            >
              <h3 className="text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none">
                {current.name}
              </h3>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] opacity-70">
                {current.role}
              </span>
            </motion.div>
          </AnimatePresence>

          <span className="mt-5 font-doto text-[0.95rem] font-bold opacity-60">
            ({String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")})
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function CoinFace({
  logo,
  z,
  back = false,
}: {
  logo: JourneyLogo;
  z: number;
  back?: boolean;
}) {
  return (
    <div
      style={{
        backfaceVisibility: "hidden",
        transform: `${back ? "rotateY(180deg) " : ""}translateZ(${z}px)`,
        background:
          "radial-gradient(circle at 36% 30%, #fcfbff, #eceaf3 58%, #d4d2e0)",
        boxShadow:
          "inset 0 2px 6px rgba(255,255,255,0.7), inset 0 -4px 10px rgba(20,12,40,0.12)",
      }}
      className="absolute inset-0 grid place-items-center rounded-full"
    >
      <img
        src={logo.src}
        alt={logo.name}
        className="max-h-[46%] max-w-[60%] object-contain [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.12))]"
      />
    </div>
  );
}
