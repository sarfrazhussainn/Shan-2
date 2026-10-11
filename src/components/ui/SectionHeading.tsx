import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal className={`mb-8 max-w-2xl sm:mb-12 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-500">
        <span className="h-0.5 w-6 bg-gold-500 sm:w-8" />
        {eyebrow}
      </span>
      <h2
        className={`mt-2.5 font-display text-2xl font-bold leading-tight sm:mt-3 sm:text-4xl ${
          light ? "text-white" : "text-[#0b2545]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-xs leading-relaxed sm:mt-4 sm:text-base ${light ? "text-slate-200" : "text-slate-600"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
