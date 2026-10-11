import { ArrowRight } from "lucide-react";
import { HeroSlider } from "@/components/home/HeroSlider";
import { About, Stats, VisionMission } from "@/components/home/Sections";
import { Services } from "@/components/home/Services";
import { QuoteForm } from "@/components/forms/Forms";
import { ClientsSlider } from "@/components/shared/ClientsSlider";
import { ProjectsSlider } from "@/components/shared/ProjectsSlider";
import { TestimonialsSlider } from "@/components/shared/TestimonialsSlider";
import { LinkButton } from "@/components/ui/LinkButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getClients,
  getHeroSlides,
  getProjects,
  getServices,
  getSettings,
  getTestimonials,
} from "@/lib/repositories";

export default async function HomePage() {
  const [settings, slides, services, projects, clients, testimonials] = await Promise.all([
    getSettings(),
    getHeroSlides(),
    getServices(),
    getProjects(),
    getClients(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSlider slides={slides} />
      <Stats s={settings} />
      <About s={settings} />
      <Services services={services} />
      <VisionMission s={settings} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <SectionHeading eyebrow="Our Work" title="Featured projects" align="left" />
        <ProjectsSlider projects={projects} />
        <Reveal className="mt-4 text-center sm:mt-6">
          <LinkButton href="/projects" variant="outline">
            View all projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </LinkButton>
        </Reveal>
      </section>

      <section className="overflow-hidden bg-surface py-16 sm:py-20">
        <SectionHeading eyebrow="Trusted By" title="Our valued clients" />
        <ClientsSlider clients={clients} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <SectionHeading eyebrow="Testimonials" title="What our clients say" />
        <TestimonialsSlider items={testimonials} />
      </section>

      <section id="quote" className="hero-navy-gradient pattern-geo relative scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-8 lg:grid-cols-5 lg:gap-12">
          <Reveal className="lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Request a Quote</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Let&apos;s discuss your <span className="text-gradient-gold">project</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
              Share your requirements and our team will respond with a tailored quotation. Prefer chat? Message us on
              WhatsApp at {settings.phone}.
            </p>
            <div className="mt-6 sm:mt-8">
              <LinkButton href={`https://wa.me/${settings.whatsapp}`} external variant="ghost-light">
                Chat on WhatsApp
              </LinkButton>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-9">
              <QuoteForm services={services.map((s) => s.title)} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
