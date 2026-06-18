import { LANGS } from "../i18n/content";
import { useI18n } from "../i18n/LanguageContext";

/** PT / EN / ES toggle. State is persisted via the language context. */
export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className="flex items-center gap-0.5 rounded-pill border border-hairline bg-canvas-alt/70 p-0.5"
    >
      {LANGS.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`rounded-pill px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
              active ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
