import type { ReactNode } from "react";

/** Small rounded pill used for skill / competency tags. */
export function Tag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  const tones = {
    default:
      "border-hairline bg-canvas-alt/60 text-ink-soft",
    accent:
      "border-transparent bg-accent-soft text-accent-ink",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-pill border px-3 py-1.5 text-[0.8rem] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
