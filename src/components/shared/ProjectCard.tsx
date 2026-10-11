import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group relative block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/15 sm:rounded-3xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="card-image-overlay absolute inset-0" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0b2545] shadow-sm backdrop-blur sm:left-4 sm:top-4">
          {p.category}
        </span>
        <span className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-gold-500 text-[#061428] shadow-md transition duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
        </span>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="font-display text-base font-bold text-[#0b2545] sm:text-lg">{p.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{p.summary}</p>
        <div className="mt-3.5 flex items-center justify-between text-[11px] font-medium text-slate-500 sm:mt-4 sm:text-xs">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold-500" /> {p.location}
          </span>
          <span className="font-semibold text-slate-600">{p.year}</span>
        </div>
      </div>
    </Link>
  );
}
