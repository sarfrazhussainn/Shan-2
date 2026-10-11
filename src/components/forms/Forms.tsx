"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  careerSchema,
  contactSchema,
  quoteSchema,
  type CareerInput,
  type ContactInput,
  type QuoteInput,
} from "@/lib/validators";
import { Field, Honeypot, inputCls, SubmitButton, SuccessMessage } from "./Fields";

type Status = "idle" | "loading" | "done" | "error";

export function QuoteForm({ services }: { services: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) });

  const onSubmit = async (data: QuoteInput) => {
    setStatus("loading");
    try {
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error();
      setStatus("done");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done")
    return (
      <SuccessMessage
        title="Quote request sent"
        text="Thank you! Our team will review your requirements and get back to you shortly."
        onReset={() => setStatus("idle")}
      />
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative grid gap-4 sm:gap-5 sm:grid-cols-2"
      noValidate
      id="quote-form"
      suppressHydrationWarning
    >
      <Field label="Full name" error={errors.name}>
        <input
          suppressHydrationWarning
          className={inputCls(errors.name)}
          placeholder="Your name"
          {...register("name")}
        />
      </Field>
      <Field label="Company (optional)" error={errors.company}>
        <input
          suppressHydrationWarning
          className={inputCls(errors.company)}
          placeholder="Company name"
          {...register("company")}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          suppressHydrationWarning
          type="email"
          className={inputCls(errors.email)}
          placeholder="you@company.com"
          {...register("email")}
        />
      </Field>
      <Field label="Phone" error={errors.phone}>
        <input
          suppressHydrationWarning
          type="tel"
          className={inputCls(errors.phone)}
          placeholder="+966 5X XXX XXXX"
          {...register("phone")}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Service required" error={errors.service}>
          <select
            suppressHydrationWarning
            className={inputCls(errors.service)}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Project details" error={errors.message}>
          <textarea
            suppressHydrationWarning
            rows={4}
            className={inputCls(errors.message)}
            placeholder="Tell us about your requirement…"
            {...register("message")}
          />
        </Field>
      </div>
      <Honeypot register={() => register("website")} />
      <div className="sm:col-span-2">
        <SubmitButton loading={status === "loading"} label="Request Quote" />
        {status === "error" && <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error();
      setStatus("done");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done")
    return <SuccessMessage title="Message sent" text="Thanks for reaching out. We'll reply soon." onReset={() => setStatus("idle")} />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative grid gap-4 sm:gap-5 sm:grid-cols-2"
      noValidate
      id="contact-form"
      suppressHydrationWarning
    >
      <Field label="Full name" error={errors.name}>
        <input
          suppressHydrationWarning
          className={inputCls(errors.name)}
          placeholder="Your name"
          {...register("name")}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          suppressHydrationWarning
          type="email"
          className={inputCls(errors.email)}
          placeholder="you@company.com"
          {...register("email")}
        />
      </Field>
      <Field label="Phone (optional)" error={errors.phone}>
        <input
          suppressHydrationWarning
          type="tel"
          className={inputCls(errors.phone)}
          placeholder="+966 5X XXX XXXX"
          {...register("phone")}
        />
      </Field>
      <Field label="Subject" error={errors.subject}>
        <input
          suppressHydrationWarning
          className={inputCls(errors.subject)}
          placeholder="How can we help?"
          {...register("subject")}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Message" error={errors.message}>
          <textarea
            suppressHydrationWarning
            rows={5}
            className={inputCls(errors.message)}
            placeholder="Write your message…"
            {...register("message")}
          />
        </Field>
      </div>
      <Honeypot register={() => register("website")} />
      <div className="sm:col-span-2">
        <SubmitButton loading={status === "loading"} label="Send Message" />
        {status === "error" && <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}

export function CareerForm({ positions }: { positions: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerInput>({ resolver: zodResolver(careerSchema) });

  const onFile = (f: File | null) => {
    setFileError("");
    if (f && f.type !== "application/pdf") return (setFile(null), setFileError("Please upload a PDF file"));
    if (f && f.size > 5 * 1024 * 1024) return (setFile(null), setFileError("File must be under 5 MB"));
    setFile(f);
  };

  const onSubmit = async (data: CareerInput) => {
    if (!file) return setFileError("Please attach your CV (PDF)");
    setStatus("loading");
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => v && fd.append(k, v));
      fd.append("cv", file);
      const r = await fetch("/api/career", { method: "POST", body: fd });
      if (!r.ok) throw new Error();
      setStatus("done");
      reset();
      setFile(null);
    } catch {
      setStatus("error");
    }
  };

  if (status === "done")
    return <SuccessMessage title="Application received" text="Thank you for applying. Our HR team will contact you if your profile matches." onReset={() => setStatus("idle")} />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative grid gap-4 sm:gap-5 sm:grid-cols-2"
      noValidate
      id="career-form"
      suppressHydrationWarning
    >
      <Field label="Full name" error={errors.name}>
        <input
          suppressHydrationWarning
          className={inputCls(errors.name)}
          placeholder="Your name"
          {...register("name")}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          suppressHydrationWarning
          type="email"
          className={inputCls(errors.email)}
          placeholder="you@email.com"
          {...register("email")}
        />
      </Field>
      <Field label="Phone" error={errors.phone}>
        <input
          suppressHydrationWarning
          type="tel"
          className={inputCls(errors.phone)}
          placeholder="+966 5X XXX XXXX"
          {...register("phone")}
        />
      </Field>
      <Field label="Position" error={errors.position}>
        <select
          suppressHydrationWarning
          className={inputCls(errors.position)}
          defaultValue=""
          {...register("position")}
        >
          <option value="" disabled>
            Select position
          </option>
          {positions.map((p) => (
            <option key={p}>{p}</option>
          ))}
          <option>Other / General application</option>
        </select>
      </Field>
      <Field label="Experience" error={errors.experience}>
        <select
          suppressHydrationWarning
          className={inputCls(errors.experience)}
          defaultValue=""
          {...register("experience")}
        >
          <option value="" disabled>
            Select experience
          </option>
          {["Fresher", "1–3 years", "3–5 years", "5–10 years", "10+ years"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#0b2545]">CV (PDF, max 5 MB)</span>
        <input
          suppressHydrationWarning
          type="file"
          accept="application/pdf"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-[#0b2545] file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />
        {fileError && <span className="mt-1 block text-xs text-red-500">{fileError}</span>}
      </label>
      <div className="sm:col-span-2">
        <Field label="Cover note (optional)" error={errors.message}>
          <textarea
            suppressHydrationWarning
            rows={4}
            className={inputCls(errors.message)}
            placeholder="Tell us about yourself…"
            {...register("message")}
          />
        </Field>
      </div>
      <Honeypot register={() => register("website")} />
      <div className="sm:col-span-2">
        <SubmitButton loading={status === "loading"} label="Submit Application" />
        {status === "error" && <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}
