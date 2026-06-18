import { motion, type Variants } from "framer-motion";
import { useI18n } from "../i18n/LanguageContext";
import { profile } from "../data/profile";
import { EASE } from "../lib/motion";
import { ButtonLink } from "./ui/Button";
import { HeroVisual } from "./HeroVisual";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 sm:pt-36"
    >
      {/* Premium, restrained background: off-white with a faint accent aurora + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(91,91,214,0.12),transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--color-canvas))] [mask-image:radial-gradient(80%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent_75%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-[var(--container-page)] grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="eyebrow">
            <span className="h-px w-6 bg-accent/70" aria-hidden />
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(2.6rem,6.4vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink"
          >
            {t.hero.headlineLead}{" "}
            <span className="gradient-text">{t.hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[0.98rem] font-medium text-ink-soft"
          >
            {t.hero.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 max-w-xl text-pretty text-[1.08rem] leading-relaxed text-muted"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.ul variants={item} className="mt-7 flex flex-wrap gap-2">
            {t.hero.badges.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-surface/70 px-3 py-1.5 text-[0.8rem] font-medium text-ink-soft backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70" aria-hidden />
                {badge}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#trajetoria" variant="primary">
              {t.hero.ctaJourney}
              <Arrow />
            </ButtonLink>
            <ButtonLink href="#projetos" variant="secondary">
              {t.hero.ctaProjects}
            </ButtonLink>
            <ButtonLink href={profile.cv} variant="secondary" external>
              {t.hero.ctaCV}
            </ButtonLink>
            <ButtonLink href="#contato" variant="ghost">
              {t.hero.ctaContact} →
            </ButtonLink>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
