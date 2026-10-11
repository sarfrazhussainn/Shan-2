import { Award, HeartHandshake, Rocket, Users } from "lucide-react";
import type { Metadata } from "next";
import { CareerForm } from "@/components/forms/Forms";
import { JobsList } from "@/components/shared/JobsList";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getJobs } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the team at Shan Testing & Trading Company in Al Khobar.",
};

const perks = [
  { icon: Rocket, title: "Grow with us", text: "Training and clear career paths in a growing company." },
  { icon: Award, title: "Quality culture", text: "Work to international standards with expert mentors." },
  { icon: Users, title: "Supportive team", text: "A collaborative, respectful and safety-first workplace." },
  { icon: HeartHandshake, title: "Fair benefits", text: "Competitive packages and long-term stability." },
];

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career with Shan Testing"
        description="We're always looking for talented, committed people to join our laboratory, inspection and trading teams."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {perks.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl bg-surface p-5 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:rounded-3xl sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0b2545] text-gold-400 sm:rounded-2xl">
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-[#0b2545] sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-xs text-slate-600 sm:text-sm">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <SectionHeading eyebrow="Open Positions" title="Current openings" />
          <JobsList jobs={jobs} />
        </div>
      </section>

      <section id="apply" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Apply Now"
          title="Submit your application"
          description="Attach your CV and we'll get in touch if your profile matches."
        />
        <Reveal>
          <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-9">
            <CareerForm positions={jobs.map((j) => j.title)} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
