import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { journeyLogos, type JourneyLogo } from "../data/journeyLogos";

const N = journeyLogos.length;

// Coin geometry: real thickness built from stacked discs (the metallic edge).
const THICKNESS = 30; // px
const LAYERS = 30;

/**
 * Scroll-driven 3D coin shown right after the hero (before the chapters) to set
 * up the storytelling. A real metallic coin (two faces + an extruded edge)
 * falls in, spins on a tilted axis flipping through each institution's logo
 * (Yamá → Ibmec → PagBank), the screen darkens, then it falls away.
 */
export function CoinSection() {
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
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [0.6, 1, 1, 0.8]);
  const coinOpacity = useTransform(scrollYProgress, [0, 0.07, 0.9, 1], [0, 1, 1, 0]);

  // Screen darkens through the middle, back to light to meet the next section.
  const bg = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["#ffffff", "#0b0716", "#f7f6fb"],
  );

  const [segment, setSegment] = useState(0);
  useMotionValueEvent(spin, "change", (d) => {
    setSegment(Math.floor((d + 90) / 180));
  });

  const frontIndex = (segment % 2 === 0 ? segment : segment + 1) % N;
  const backIndex = (segment % 2 === 0 ? segment + 1 : segment) % N;

  // Reduced motion: a calm static row of logos, no rotation or pinning.
  if (reduce) {
    return (
      <section id="moeda" className="bg-canvas-alt px-6 py-24 sm:px-8">
        <div className="mx-auto flex max-w-[var(--container-page)] flex-wrap items-center justify-center gap-10">
          {journeyLogos.map((logo) => (
            <div
              key={logo.name}
              className="grid h-36 w-36 place-items-center rounded-full bg-[radial-gradient(circle_at_36%_30%,#fcfbff,#e9e8f1_60%,#d2d0de)] shadow-soft"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-[50%] max-w-[62%] object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="moeda" ref={ref} className="relative h-[280vh]">
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6"
      >
        <div className="relative" style={{ perspective: 1400 }} aria-hidden>
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
              className="relative h-[clamp(280px,58vw,580px)] w-[clamp(280px,58vw,580px)]"
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
