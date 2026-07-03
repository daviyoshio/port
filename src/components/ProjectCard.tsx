import type { ProjectMeta } from "../data/projects";
import { useI18n } from "../i18n/LanguageContext";
import type { ProjectCopy } from "../i18n/content";
import { Tag } from "./ui/Tag";

const cardClasses =
  "group flex flex-col overflow-hidden rounded-panel border border-hairline bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift";

export function ProjectCard({
  meta,
  copy,
}: {
  meta: ProjectMeta;
  copy: ProjectCopy;
}) {
  const { t } = useI18n();

  const links = [
    { url: meta.liveUrl, label: t.projects.liveLabel },
    { url: meta.codeUrl, label: t.projects.codeLabel },
    { url: meta.deckUrl, label: t.projects.deckLabel },
  ].filter((l): l is { url: string; label: string } => Boolean(l.url));

  const body = (
    <>
      <div className="relative overflow-hidden">
        <img
          src={meta.image}
          alt={meta.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{copy.kicker}</span>
        <h3 className="mt-3 text-[1.45rem] font-semibold tracking-tight text-ink">
          {meta.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {copy.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {copy.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-5">
            {links.map((l) =>
              links.length === 1 ? (
                // Whole card is the anchor — render the label as plain text.
                <span
                  key={l.label}
                  className="group/link inline-flex items-center gap-1.5 font-mono text-[0.74rem] font-medium uppercase tracking-[0.04em] text-ink transition-colors group-hover:text-accent"
                >
                  {l.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
              ) : (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 font-mono text-[0.74rem] font-medium uppercase tracking-[0.04em] text-ink transition-colors hover:text-accent"
                >
                  {l.label}
                  <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ),
            )}
          </div>
        )}
      </div>
    </>
  );

  // A single link makes the entire card one big, obvious target.
  if (links.length === 1) {
    return (
      <a
        href={links[0].url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${meta.title} — ${links[0].label}`}
        className={cardClasses}
      >
        {body}
      </a>
    );
  }

  return <article className={cardClasses}>{body}</article>;
}
