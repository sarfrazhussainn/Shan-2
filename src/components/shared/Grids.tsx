"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ClientLogo } from "@/components/shared/ClientsSlider";
import { ProjectCard } from "@/components/shared/ProjectCard";
import type { Client, Project } from "@/lib/types";

function Filters({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-1.5 sm:mb-10 sm:gap-2" role="tablist">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          suppressHydrationWarning
          role="tab"
          aria-selected={value === o}
          onClick={() => onChange(o)}
          className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:px-5 sm:py-2 sm:text-sm ${
            value === o
              ? "text-white"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-[#0b2545]"
          }`}
        >
          {value === o && (
            <motion.span layoutId={`pill-${options[0]}`} className="absolute inset-0 rounded-full bg-[#0b2545]" />
          )}
          <span className="relative">{o}</span>
        </button>
      ))}
    </div>
  );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const cats = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <>
      <Filters options={cats} value={cat} onChange={setCat} />
      <motion.div layout className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export function ClientsGrid({ clients }: { clients: Client[] }) {
  const inds = useMemo(() => ["All", ...Array.from(new Set(clients.map((c) => c.industry).filter(Boolean)))], [clients]);
  const [ind, setInd] = useState("All");
  const list = ind === "All" ? clients : clients.filter((c) => c.industry === ind);
  return (
    <>
      <Filters options={inds} value={ind} onChange={setInd} />
      <motion.div layout className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ y: -5 }}
              className="flex min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-shadow hover:border-gold-500/50 hover:shadow-xl sm:min-h-28 sm:rounded-2xl sm:p-5"
            >
              <ClientLogo c={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
