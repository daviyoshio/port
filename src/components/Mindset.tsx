import { useI18n } from "../i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";
import { RevealText } from "./ui/RevealText";
import { Section } from "./ui/Section";

export function Mindset() {
  const { t } = useI18n();

  return (
    <Section id="diferencial">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Reveal y={0} className="flex flex-col gap-6">
          <span className="eyebrow">
            <span className="h-px w-6 bg-accent/70" aria-hidden />
            {t.mindset.eyebrow}
          </span>
          <h2 className="text-balance text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.1] text-ink">
            <RevealText text={t.mindset.title} />
          </h2>
          <p className="text-pretty text-[1.1rem] leading-relaxed text-muted">
            {t.mindset.body}
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {t.mindset.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.1}
              className="surface-card flex gap-5 rounded-panel p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-[1rem] font-semibold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.15rem] font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
