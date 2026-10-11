import { Check, Eye, Target } from "lucide-react";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import type { SiteSettings } from "@/lib/types";

export function Stats({ s }: { s: SiteSettings }) {
  return (
    <section className="relative z-20 -mt-10 px-4 sm:-mt-14 sm:px-8">
      <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-2xl shadow-navy-900/10 sm:rounded-3xl md:grid-cols-4">
        {s.stats.map((st) => (
          <StaggerItem key={st.label} className="bg-white p-4 text-center sm:p-7">
            <div className="font-display text-2xl font-bold text-[#0b2545] sm:text-4xl">
              <Counter value={st.value} suffix={st.suffix} />
            </div>
            <div className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{st.label}</div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function About({ s }: { s: SiteSettings }) {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-8 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div className="relative">
            <div className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl border-2 border-gold-500/40 sm:-bottom-5 sm:-left-5 sm:rounded-3xl" />
            <Image
              src={s.about.image}
              alt="Our testing laboratory"
              width={1200}
              height={800}
              className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-xl sm:rounded-3xl"
            />
            <div className="absolute bottom-3 right-3 rounded-xl bg-[#0b2545]/90 px-4 py-2.5 text-white shadow-xl backdrop-blur-md sm:bottom-6 sm:right-6 sm:rounded-2xl sm:px-6 sm:py-4">
              <div className="font-display text-lg font-bold text-gold-400 sm:text-3xl">Al Khobar</div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-200 sm:text-xs">
                Saudi Arabia
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="About Us" title={s.about.heading} align="left" />
          <Reveal delay={0.1} className="-mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {s.about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className="grid gap-2.5 pt-3 sm:grid-cols-2">
              {["International standards", "Qualified engineers", "Fast, certified reports", "Dedicated support"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm font-semibold text-[#0b2545]">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-100 text-gold-500">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function VisionMission({ s }: { s: SiteSettings }) {
  return (
    <section className="hero-navy-gradient pattern-geo relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="Our Purpose" title="Vision, Mission & Values" light />
        <Stagger className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {[
            { icon: Eye, title: "Our Vision", text: s.vision },
            { icon: Target, title: "Our Mission", text: s.mission },
          ].map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:bg-white/10 sm:rounded-3xl sm:p-8">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-500 text-[#061428] sm:rounded-2xl">
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white sm:text-2xl">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-200 sm:text-base">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Stagger className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {s.values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-gold-500/50 sm:rounded-2xl sm:p-6">
                <h4 className="font-display text-base font-bold text-gold-400 sm:text-lg">{v.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-200/90 sm:text-sm">{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
