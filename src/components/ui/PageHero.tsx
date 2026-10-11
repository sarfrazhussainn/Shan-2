import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="hero-navy-gradient pattern-geo relative overflow-hidden pb-20 pt-36">
      {/* Decorative ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-navy-700/30 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400 drop-shadow-sm">
          <span className="h-0.5 w-8 bg-gold-400" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white drop-shadow-sm sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-slate-200 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
