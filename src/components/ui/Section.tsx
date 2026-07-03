import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Use the alternate (slightly tinted) surface background. */
  alt?: boolean;
  ariaLabel?: string;
}

/** Page section: vertical rhythm, scroll offset for the sticky nav, centered container. */
export function Section({ id, children, className = "", alt, ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`scroll-mt-24 py-28 sm:py-32 lg:py-40 ${alt ? "bg-canvas-alt" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-[var(--container-page)] px-6 sm:px-8">
        {children}
      </div>
    </section>
  );
}
