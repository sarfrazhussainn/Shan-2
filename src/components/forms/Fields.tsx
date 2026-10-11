"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

const base =
  "w-full rounded-xl border bg-white px-4 py-3.5 text-sm sm:text-base text-ink outline-none transition placeholder:text-slate-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15";

export const inputCls = (err?: FieldError) => `${base} ${err ? "border-red-400" : "border-slate-200"}`;

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: FieldError;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#0b2545]">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 block text-xs font-medium text-red-500"
          >
            {error.message}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

export function Honeypot({ register }: { register: () => object }) {
  return (
    <input
      type="text"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      suppressHydrationWarning
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
      {...register()}
    />
  );
}

export function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      suppressHydrationWarning
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-[#061428] shadow-lg shadow-gold-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 active:translate-y-0 disabled:opacity-70 sm:w-auto"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
        </>
      ) : (
        <>
          {label} <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

export function SuccessMessage({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-8 text-center sm:py-10"
      role="status"
    >
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
        <CheckCircle2 className="h-14 w-14 text-emerald-500 sm:h-16 sm:w-16" />
      </motion.div>
      <h3 className="mt-4 text-xl font-bold text-[#0b2545] sm:text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600">{text}</p>
      <button
        type="button"
        suppressHydrationWarning
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-gold-500 hover:underline"
      >
        Send another
      </button>
    </motion.div>
  );
}
