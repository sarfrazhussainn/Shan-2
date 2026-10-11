import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/Forms";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { getSettings } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Shan Testing & Trading Company in Al Khobar, Saudi Arabia.",
};

export default async function ContactPage() {
  const s = await getSettings();
  const cards = [
    { icon: MapPin, title: "Visit us", text: s.address },
    { icon: Phone, title: "Call us", text: s.phone, href: `tel:${s.phone.replace(/\s/g, "")}` },
    { icon: Mail, title: "Email us", text: s.email, href: `mailto:${s.email}` },
    { icon: Clock, title: "Working hours", text: s.hours },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        description="Questions, quotes or partnerships — reach out and our team will respond promptly."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {cards.map(({ icon: Icon, title, text, href }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-xl sm:rounded-3xl sm:p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0b2545] text-gold-400 sm:rounded-2xl">
                  <Icon className="h-6 w-6 stroke-[2.2]" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-[#0b2545] sm:text-lg">{title}</h3>
                {href ? (
                  <a href={href} className="mt-1 block text-xs font-medium text-slate-600 transition hover:text-gold-600 sm:text-sm">
                    {text}
                  </a>
                ) : (
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">{text}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200/70 sm:rounded-3xl sm:p-9">
              <h2 className="mb-5 font-display text-xl font-bold text-[#0b2545] sm:mb-6 sm:text-2xl">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5 sm:gap-6">
            <div className="min-h-72 flex-1 overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/70 sm:min-h-80 sm:rounded-3xl">
              <iframe
                title="Shan Testing & Trading Company location"
                src={s.mapEmbedUrl}
                className="h-full min-h-72 w-full border-0 sm:min-h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#0b2545] p-5 sm:rounded-3xl sm:p-7 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-base font-bold text-white sm:text-lg">Prefer WhatsApp?</h3>
                <p className="mt-0.5 text-xs text-slate-200 sm:text-sm">Chat with us directly for a quick response.</p>
              </div>
              <div className="w-full sm:w-auto">
                <LinkButton href={`https://wa.me/${s.whatsapp}`} external variant="gold">
                  <MessageCircle className="h-4 w-4" /> Chat now
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
