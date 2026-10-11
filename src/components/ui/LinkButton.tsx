import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "ghost-light";

const styles: Record<Variant, string> = {
  primary: "bg-[#0b2545] text-white hover:bg-[#13315c] shadow-lg shadow-navy-900/20",
  gold: "bg-gold-500 text-[#061428] hover:bg-gold-400 shadow-lg shadow-gold-500/30",
  outline: "border border-[#0b2545]/25 text-[#0b2545] hover:border-[#0b2545] hover:bg-[#0b2545] hover:text-white",
  "ghost-light": "border border-white/40 text-white hover:bg-white hover:text-[#0b2545]",
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
}) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 sm:px-6 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
