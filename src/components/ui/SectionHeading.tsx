import { Reveal } from "./Reveal";

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
    align === "center" ? "mx-auto max-w-3xl text-center items-center" : "max-w-3xl";

  return (
    <Reveal className={`flex flex-col gap-5 ${alignment}`}>
      <span className="eyebrow">
        <span className="h-px w-6 bg-accent/70" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="text-balance text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.04] text-ink">
        {title}
      </h2>
      {intro && (
        <p className="text-pretty text-[1.05rem] leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
