import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { journeyLogos, type JourneyLogo } from "../data/journeyLogos";
import { useI18n } from "../i18n/LanguageContext";
import { EASE } from "../lib/motion";

const N = journeyLogos.length;

/**
 * Scroll-driven 3D coin between the story and impact sections. The coin falls
 * in from above, spins on its Y axis flipping through each institution's logo
 * (Yamá → Ibmec → PagBank), the screen darkens, and the coin body cycles
 * white → purple → black → white before falling away. A white medallion keeps
 * each logo readable regardless of the body colour; a flip-card (two faces with
 * backface-hidden) avoids mirroring.
 */
export function CoinSection() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Spin (one full turn → the three logos).
  const deg = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Falling choreography: drop in tilted, settle, then fall away.
  const y = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [-380, 0, 0, 420]);
  const rotateX = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [72, 12, 12, -52]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0.62, 1, 1, 0.78]);
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
  // Coin body: white → purple → black → white.
  const bodyColor = useTransform(
    scrollYProgress,
    [0.16, 0.4, 0.64, 0.86],
    ["#ffffff", "#7c3aed", "#161320", "#ffffff"],
  );

  const [segment, setSegment] = useState(0);
  useMotionValueEvent(deg, "change", (d) => {
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
                <div className="grid h-28 w-28 place-items-center rounded-full border border-hairline bg-white shadow-soft">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-[58%] max-w-[68%] object-contain"
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
        <div className="relative mt-12" style={{ perspective: 1200 }} aria-hidden>
          <motion.div
            style={{ y, rotateX, scale, opacity: coinOpacity, transformStyle: "preserve-3d" }}
          >
            <motion.div
              style={{ rotateY: deg, transformStyle: "preserve-3d" }}
              className="relative h-[clamp(240px,52vw,460px)] w-[clamp(240px,52vw,460px)]"
            >
              <CoinFace logo={journeyLogos[frontIndex]} bodyColor={bodyColor} />
              <CoinFace logo={journeyLogos[backIndex]} bodyColor={bodyColor} back />
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
  bodyColor,
  back = false,
}: {
  logo: JourneyLogo;
  bodyColor: MotionValue<string>;
  back?: boolean;
}) {
  return (
    <motion.div
      style={{
        backgroundColor: bodyColor,
        backfaceVisibility: "hidden",
        rotateY: back ? 180 : 0,
      }}
      className="absolute inset-0 grid place-items-center rounded-full border-2 border-white/30 shadow-[0_40px_90px_rgba(20,8,40,0.45),0_0_70px_rgba(124,58,237,0.35)]"
    >
      {/* inner ring */}
      <span className="pointer-events-none absolute inset-[6%] rounded-full border border-white/20" />
      {/* white medallion keeps the logo readable in any body colour */}
      <span className="grid h-[58%] w-[58%] place-items-center rounded-full bg-white shadow-inner">
        <img
          src={logo.src}
          alt={logo.name}
          className="max-h-[60%] max-w-[78%] object-contain"
        />
      </span>
    </motion.div>
  );
}
