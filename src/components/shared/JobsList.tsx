"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import type { JobOpening } from "@/lib/types";

export function JobsList({ jobs }: { jobs: JobOpening[] }) {
  const [open, setOpen] = useState<string | null>(jobs[0]?.id ?? null);
  return (
    <div className="space-y-3.5 sm:space-y-4">
      {jobs.map((j) => {
        const isOpen = open === j.id;
        return (
          <div
            key={j.id}
            className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition hover:border-gold-500/50"
          >
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setOpen(isOpen ? null : j.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-6"
            >
              <div>
                <h3 className="font-display text-base font-bold text-[#0b2545] sm:text-lg">{j.title}</h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-gold-500" />
                    {j.department} · {j.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" />
                    {j.location}
                  </span>
                </div>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-[#0b2545] sm:h-9 sm:w-9"
              >
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t border-slate-100 px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{j.description}</p>
                    <ul className="mt-3.5 list-disc space-y-1 pl-4 text-xs text-slate-600 marker:text-gold-500 sm:space-y-1.5 sm:pl-5 sm:text-sm">
                      {j.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <a
                      href="#apply"
                      className="mt-4 inline-block text-xs font-bold text-gold-600 transition hover:underline sm:text-sm"
                    >
                      Apply for this role →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
