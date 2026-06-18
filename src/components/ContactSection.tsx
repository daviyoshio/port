import { profile } from "../data/profile";
import { useI18n } from "../i18n/LanguageContext";
import { ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function ContactSection() {
  const { t } = useI18n();

  const channels = [
    { label: t.contact.phoneLabel, value: profile.phone, href: profile.phoneHref },
    { label: t.contact.emailLabel, value: profile.email, href: `mailto:${profile.email}` },
    {
      label: t.contact.linkedinLabel,
      value: profile.linkedinHandle,
      href: profile.linkedin,
      external: true,
    },
    {
      label: t.contact.githubLabel,
      value: profile.githubHandle,
      href: profile.github,
      external: true,
    },
  ];

  return (
    <Section id="contato">
      <Reveal className="surface-card relative overflow-hidden rounded-hero px-6 py-16 sm:px-12 sm:py-20">
        {/* soft accent backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(91,91,214,0.14),transparent_70%)] blur-2xl"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">{t.contact.eyebrow}</span>
          <h2 className="mt-5 text-balance text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-ink">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[1.1rem] leading-relaxed text-muted">
            {t.contact.body}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={profile.linkedin} variant="primary" external>
              {t.contact.ctaLinkedin}
            </ButtonLink>
            <ButtonLink href={profile.github} variant="secondary" external>
              {t.contact.ctaGithub}
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
              {t.contact.ctaEmail}
            </ButtonLink>
            <ButtonLink href={profile.cv} variant="secondary" external>
              {t.contact.ctaCV}
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex flex-col gap-1 rounded-panel border border-hairline bg-canvas-alt/50 px-5 py-4 text-left transition-colors duration-300 hover:border-hairline-strong hover:bg-canvas-alt"
            >
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-faint">
                {c.label}
              </span>
              <span className="break-words text-[0.98rem] font-medium text-ink">
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
