import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** "dark" inverts the text colours for use on a dark section. */
  tone?: "light" | "dark";
}

/** Consistent eyebrow + title + intro block for section headers. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const alignment =
    align === "center"
      ? "mx-auto max-w-3xl items-center text-center"
      : "max-w-3xl";

  return (
    <div className={`flex flex-col gap-5 ${alignment}`}>
      <Reveal y={0}>
        <span className={`eyebrow ${dark ? "text-white/70" : ""}`}>
          <span className="h-px w-6 bg-accent/70" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>

      <h2
        className={`text-balance text-[clamp(2.3rem,5.2vw,4.1rem)] font-semibold leading-[1.04] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        <RevealText text={title} />
      </h2>

      {intro && (
        <Reveal y={14} delay={0.08}>
          <p
            className={`text-pretty text-[1.05rem] leading-relaxed ${
              dark ? "text-white/65" : "text-muted"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
