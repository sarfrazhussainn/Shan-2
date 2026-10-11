import type { Metadata } from "next";
import { ClientsGrid } from "@/components/shared/Grids";
import { TestimonialsSlider } from "@/components/shared/TestimonialsSlider";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getClients, getTestimonials } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Our Clients",
  description: "Companies across the Eastern Province who trust Shan Testing & Trading Company.",
};

export default async function ClientsPage() {
  const [clients, testimonials] = await Promise.all([getClients(), getTestimonials()]);
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Trusted by leading companies"
        description="We are proud to partner with contractors, developers and industrial leaders across the Kingdom."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
        <ClientsGrid clients={clients} />
      </section>
      <section className="bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionHeading eyebrow="Testimonials" title="In their words" />
          <TestimonialsSlider items={testimonials} />
        </div>
      </section>
    </>
  );
}
