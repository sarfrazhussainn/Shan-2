import { ArrowLeft, Building2, Calendar, Check, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/shared/Gallery";
import { LinkButton } from "@/components/ui/LinkButton";
import { getProject, getProjects } from "@/lib/repositories";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProject(slug);
  return { title: p?.title ?? "Project", description: p?.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();

  const facts = [
    { icon: Building2, label: "Client", value: p.client },
    { icon: MapPin, label: "Location", value: p.location },
    { icon: Calendar, label: "Year", value: p.year },
  ];

  return (
    <>
      {/* Hero Header */}
      <section className="hero-navy-gradient pattern-geo relative pb-10 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-200 transition hover:text-gold-400 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" /> Back to all projects
          </Link>
          <div className="mt-4 sm:mt-6">
            <span className="inline-block rounded-full bg-gold-500/15 border border-gold-500/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">
              {p.category}
            </span>
          </div>
          <h1 className="mt-2.5 max-w-3xl font-display text-2xl font-bold leading-tight text-white break-words sm:text-4xl lg:text-5xl">
            {p.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-3">
        {/* Gallery & Overview */}
        <div className="w-full min-w-0 lg:col-span-2">
          <Gallery images={p.gallery} title={p.title} />

          <h2 className="mt-6 font-display text-xl font-bold text-[#0b2545] sm:mt-10 sm:text-2xl">
            Overview
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 break-words sm:text-base">
            {p.summary}
          </p>
        </div>

        {/* Sidebar Info & Scope */}
        <aside className="w-full min-w-0 space-y-6">
          {/* Key Facts */}
          <div className="rounded-2xl bg-surface p-4.5 sm:rounded-3xl sm:p-7 shadow-xs">
            {facts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 border-b border-slate-200/80 py-3 last:border-0 sm:gap-4 sm:py-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0b2545] text-gold-400 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-[11px]">
                    {label}
                  </div>
                  <div className="text-sm font-bold text-[#0b2545] break-words sm:text-base">
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scope of Work */}
          {p.scope && p.scope.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-4.5 sm:rounded-3xl sm:p-7 shadow-xs">
              <h3 className="font-display text-base font-bold text-[#0b2545] sm:text-lg">
                Scope of Work
              </h3>
              <ul className="mt-3.5 space-y-2.5">
                {p.scope.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-xs text-slate-600 sm:text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500 stroke-[2.5]" />
                    <span className="min-w-0 flex-1 break-words">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to action */}
          <div className="w-full [&>a]:w-full [&>a]:justify-center [&>a]:py-3.5">
            <LinkButton href="/#quote" variant="gold">
              Request a Similar Project
            </LinkButton>
          </div>
        </aside>
      </section>
    </>
  );
}
