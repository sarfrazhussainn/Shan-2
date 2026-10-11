import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export function Footer({ s }: { s: SiteSettings }) {
  return (
    <footer className="hero-navy-gradient pattern-geo relative text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:gap-12 sm:px-8 sm:py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 font-display text-xl font-bold text-[#061428]">
              S
            </span>
            <span className="font-display text-lg font-bold text-white sm:text-xl">{s.companyName}</span>
          </div>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-slate-300 sm:mt-5 sm:text-sm">{s.tagline}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white sm:text-base">Quick Links</h3>
          <ul className="mt-3.5 space-y-2 text-xs sm:space-y-2.5 sm:text-sm">
            {[
              ["/", "Home"],
              ["/clients", "Clients"],
              ["/projects", "Our Projects"],
              ["/careers", "Careers"],
              ["/contact", "Contact Us"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-gold-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white sm:text-base">Contact</h3>
          <ul className="mt-3.5 space-y-2.5 text-xs sm:space-y-3 sm:text-sm">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /><span>{s.address}</span></li>
            <li className="flex gap-2.5"><Phone className="h-4 w-4 shrink-0 text-gold-400" /><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-gold-400">{s.phone}</a></li>
            <li className="flex gap-2.5"><Mail className="h-4 w-4 shrink-0 text-gold-400" /><a href={`mailto:${s.email}`} className="hover:text-gold-400">{s.email}</a></li>
            <li className="flex gap-2.5"><Clock className="h-4 w-4 shrink-0 text-gold-400" /><span>{s.hours}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © 2026 {s.companyName}. All rights reserved.
      </div>
    </footer>
  );
}
