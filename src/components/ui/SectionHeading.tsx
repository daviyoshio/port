import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

/** Consistent eyebrow + title + intro block for section headers. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto max-w-3xl items-center text-center"
      : "max-w-3xl";

  return (
    <div className={`flex flex-col gap-5 ${alignment}`}>
      <Reveal y={0}>
        <span className="eyebrow">
          <span className="h-px w-6 bg-accent/70" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>

      <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.08] text-ink">
        <RevealText text={title} />
      </h2>

      {intro && (
        <Reveal y={14} delay={0.08}>
          <p className="text-pretty text-[1.05rem] leading-relaxed text-muted">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
