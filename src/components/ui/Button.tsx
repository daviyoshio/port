import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-[0.95rem] font-semibold transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white shadow-soft hover:bg-accent hover:shadow-lift",
  secondary:
    "border border-hairline-strong bg-surface text-ink shadow-soft hover:border-ink/25 hover:bg-canvas-alt",
  ghost: "px-1 py-1 text-ink hover:text-accent",
};

/** Anchor styled as a premium pill button with a subtle hover lift. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className = "",
  ariaLabel,
}: ButtonLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
      {...externalProps}
    >
      {children}
    </a>
  );
}
