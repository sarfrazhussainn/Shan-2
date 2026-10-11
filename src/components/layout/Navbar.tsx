"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/clients", label: "Clients" },
  { href: "/projects", label: "Our Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar({ phone }: { phone: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-slate-200/80 bg-white/95 shadow-md backdrop-blur-lg"
          : "border-b border-white/10 bg-[#061428]/85 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Shan Testing & Trading Co. home">
          <span
            className={`grid h-11 w-11 place-items-center rounded-xl font-display text-xl font-bold shadow-md transition-colors ${
              scrolled || open
                ? "bg-[#0b2545] text-gold-400"
                : "bg-gold-500 text-[#061428]"
            }`}
          >
            S
          </span>
          <span className={`leading-tight transition-colors ${scrolled || open ? "text-[#0b2545]" : "text-white"}`}>
            <span className="block font-display text-lg font-semibold tracking-tight">Shan Testing</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] opacity-80">
              & Trading Co.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                  scrolled || open
                    ? active
                      ? "text-[#0b2545]"
                      : "text-slate-600 hover:text-[#0b2545]"
                    : active
                    ? "text-gold-400"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              scrolled || open ? "text-[#0b2545] hover:text-gold-600" : "text-white hover:text-gold-400"
            }`}
          >
            <Phone className="h-4 w-4 text-gold-500" />
            <span>{phone}</span>
          </a>
          <Link
            href="/#quote"
            className="rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-[#061428] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-lg"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          className={`grid h-11 w-11 place-items-center rounded-xl transition-colors lg:hidden ${
            scrolled || open ? "text-[#0b2545]" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          id="mobile-menu-toggle"
          suppressHydrationWarning
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white shadow-xl lg:hidden"
          >
            <nav className="flex flex-col px-5 pb-6 pt-2" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`border-b border-slate-100 py-3.5 text-base font-semibold ${
                    isActive(l.href) ? "text-gold-500" : "text-[#0b2545]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-[#0b2545]"
                >
                  <Phone className="h-4 w-4 text-gold-500" /> {phone}
                </a>
                <Link
                  href="/#quote"
                  className="rounded-full bg-gold-500 py-3 text-center font-semibold text-[#061428]"
                >
                  Get a Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
