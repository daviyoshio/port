import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient, always-on background motion for the hero: soft orbs drifting in
 * zero-g, small rotating 3D data cubes, and floating data/metric chips (a few
 * with live-randomizing values). Purely decorative, sits behind the content and
 * is disabled under prefers-reduced-motion.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Zero-g orbs */}
      <Orb
        className="left-[6%] top-[14%] h-52 w-52 bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_70%)]"
        dx={26}
        dy={34}
        dur={13}
      />
      <Orb
        className="right-[5%] top-[52%] h-64 w-64 bg-[radial-gradient(circle,rgba(167,124,238,0.32),transparent_70%)]"
        dx={-30}
        dy={-24}
        dur={16}
        delay={1.5}
      />
      <Orb
        className="bottom-[12%] left-[24%] h-40 w-40 bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_70%)]"
        dx={20}
        dy={-28}
        dur={11}
        delay={0.8}
      />

      {/* Rotating 3D data cubes */}
      <Cube className="right-[14%] top-[20%] hidden sm:block" size={54} rotateDur={18} floatDur={7} />
      <Cube
        className="bottom-[20%] left-[9%] hidden sm:block"
        size={40}
        rotateDur={22}
        floatDur={9}
        delay={1.2}
      />

      {/* Floating data chips */}
      <Chip className="left-[13%] top-[18%] hidden text-white/45 md:block" dur={8}>
        1.2M rows
      </Chip>
      <Chip className="right-[11%] top-[30%] hidden text-white/45 md:block" dur={9} delay={1}>
        p95 · 142ms
      </Chip>
      <Chip className="bottom-[26%] right-[15%] hidden text-white/45 md:block" dur={7.5} delay={0.6}>
        F1 0.91
      </Chip>
      <Chip className="bottom-[16%] left-[7%] hidden text-white/40 md:block" dur={10} delay={1.8}>
        embeddings · 1536d
      </Chip>
      <RevenueChip className="left-[6%] top-[34%] text-white/55" dur={8.5} delay={0.3} />
      <MetricChip className="right-[8%] top-[64%] hidden text-white/55 sm:block" dur={9.5} delay={1.1} />
    </div>
  );
}

function Orb({
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
      animate={{ x: [0, dx, 0], y: [0, dy, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Cube({
  className,
  size,
  rotateDur,
  floatDur,
  delay = 0,
}: {
  className: string;
  size: number;
  rotateDur: number;
  floatDur: number;
  delay?: number;
}) {
  const half = size / 2;
  const transforms = [
    `translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ perspective: 600 }}
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: floatDur, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size, transformStyle: "preserve-3d" }}
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: rotateDur, repeat: Infinity, ease: "linear" }}
      >
        {transforms.map((t, i) => (
          <span
            key={i}
            className="absolute border border-white/25 bg-white/[0.06]"
            style={{ width: size, height: size, transform: t }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function Chip({
  className,
  children,
  dur,
  delay = 0,
}: {
  className: string;
  children: ReactNode;
  dur: number;
  delay?: number;
}) {
  return (
    <motion.span
      className={`absolute whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.08em] ${className}`}
      animate={{ y: [0, -12, 0], opacity: [0.3, 0.64, 0.3] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}

function RevenueChip(props: { className: string; dur: number; delay?: number }) {
  const [value, setValue] = useState(formatRevenue);
  useEffect(() => {
    const id = setInterval(() => setValue(formatRevenue()), 1300);
    return () => clearInterval(id);
  }, []);
  return <Chip {...props}>Σ {value}/mês</Chip>;
}

function MetricChip(props: { className: string; dur: number; delay?: number }) {
  const [value, setValue] = useState(() => (0.9 + Math.random() * 0.099).toFixed(3));
  useEffect(() => {
    const id = setInterval(
      () => setValue((0.9 + Math.random() * 0.099).toFixed(3)),
      1500,
    );
    return () => clearInterval(id);
  }, []);
  return <Chip {...props}>accuracy · {value}</Chip>;
}

function formatRevenue() {
  const n = 820000 + Math.floor(Math.random() * 680000);
  return "R$ " + new Intl.NumberFormat("pt-BR").format(n);
}
