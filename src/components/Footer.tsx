import { profile } from "../data/profile";
import { useI18n } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-canvas-alt">
      <div className="mx-auto flex w-full max-w-[var(--container-page)] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-[1rem] font-semibold tracking-tight text-ink">
            {profile.name}
          </p>
          <p className="mt-1 max-w-md text-[0.88rem] text-muted">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex gap-4 text-[0.86rem] font-medium text-ink-soft">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-accent"
            >
              E-mail
            </a>
            <a href="#inicio" className="transition-colors hover:text-accent">
              {t.contact.backToTop}
            </a>
          </div>
          <p className="text-[0.78rem] text-faint">
            © {year} {profile.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
