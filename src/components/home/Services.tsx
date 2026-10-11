import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/lib/types";

export function Services({ services }: { services: Service[] }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Services built around your project"
          description="From the laboratory bench to the construction site, we provide the testing and supply solutions you can rely on."
        />
        <Stagger className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.id}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-navy-900/10 sm:rounded-3xl sm:p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-100 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-[#0b2545] text-gold-400 transition duration-300 group-hover:rotate-6 group-hover:bg-gold-500 group-hover:text-[#061428] sm:h-14 sm:w-14 sm:rounded-2xl">
                  <ServiceIcon name={s.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="relative mt-5 font-display text-lg font-bold text-[#0b2545] sm:mt-6 sm:text-xl">
                  {s.title}
                </h3>
                <p className="relative mt-2.5 text-xs leading-relaxed text-slate-600 sm:mt-3 sm:text-sm">
                  {s.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
