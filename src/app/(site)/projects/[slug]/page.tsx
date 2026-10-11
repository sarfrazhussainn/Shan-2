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
      <section className="hero-navy-gradient pattern-geo relative pb-12 pt-32 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-gold-400">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <span className="mt-4 block text-xs font-bold uppercase tracking-[0.25em] text-gold-400 sm:mt-6">
            {p.category}
          </span>
          <h1 className="mt-2.5 max-w-3xl font-display text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {p.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Gallery images={p.gallery} title={p.title} />
          <h2 className="mt-8 font-display text-xl font-bold text-[#0b2545] sm:mt-10 sm:text-2xl">Overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{p.summary}</p>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl bg-surface p-5 sm:rounded-3xl sm:p-7">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3.5 border-b border-slate-200/80 py-3.5 last:border-0 sm:gap-4 sm:py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0b2545] text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
                  <div className="text-sm font-bold text-[#0b2545] sm:text-base">{value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 p-5 sm:rounded-3xl sm:p-7">
            <h3 className="font-display text-base font-bold text-[#0b2545] sm:text-lg">Scope of work</h3>
            <ul className="mt-3.5 space-y-2.5">
              {p.scope.map((s) => (
                <li key={s} className="flex gap-2.5 text-xs text-slate-600 sm:text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500 stroke-[2.5]" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full [&>a]:w-full">
            <LinkButton href="/#quote" variant="gold">
              Request a similar project
            </LinkButton>
          </div>
        </aside>
      </section>
    </>
  );
}
