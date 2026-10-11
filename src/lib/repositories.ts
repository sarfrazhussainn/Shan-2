import { client, urlFor } from "@/sanity/client";
import {
  mockClients,
  mockHeroSlides,
  mockJobs,
  mockProjects,
  mockServices,
  mockSettings,
  mockTestimonials,
} from "./data/mock";
import type {
  Client,
  HeroSlide,
  JobOpening,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from "./types";

/**
 * Data access layer. Reads from Sanity; falls back to mock data when
 * the dataset has no content yet (or Sanity is unreachable).
 */

const FALLBACK_IMAGES = ["/images/lab.jpg", "/images/trading.jpg", "/images/inspection.jpg"];
const fallbackImg = (i: number) => FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const img = (src: any, i: number, w = 1600) =>
  src?.asset ? urlFor(src).width(w).auto("format").url() : fallbackImg(i);

async function safeFetch<T>(query: string): Promise<T | null> {
  try {
    return await client.fetch<T>(query);
  } catch {
    return null;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = await safeFetch<any>(`*[_type=="siteSettings"][0]`);
  if (!d) return mockSettings;
  return {
    companyName: d.companyName ?? mockSettings.companyName,
    tagline: d.tagline ?? mockSettings.tagline,
    email: d.email ?? mockSettings.email,
    phone: d.phone ?? mockSettings.phone,
    whatsapp: d.whatsapp ?? mockSettings.whatsapp,
    address: d.address ?? mockSettings.address,
    hours: d.hours ?? mockSettings.hours,
    mapEmbedUrl: d.mapEmbedUrl ?? mockSettings.mapEmbedUrl,
    about: {
      heading: d.aboutHeading ?? mockSettings.about.heading,
      body: d.aboutBody?.length ? d.aboutBody : mockSettings.about.body,
      image: img(d.aboutImage, 0, 1200),
    },
    vision: d.vision ?? mockSettings.vision,
    mission: d.mission ?? mockSettings.mission,
    values: d.values?.length ? d.values : mockSettings.values,
    stats: d.stats?.length ? d.stats : mockSettings.stats,
  };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = await safeFetch<any[]>(`*[_type=="heroSlide"]|order(order asc)`);
  if (!d?.length) return mockHeroSlides;
  return d.map((s, i) => ({
    id: s._id,
    eyebrow: s.eyebrow ?? "",
    title: s.title,
    subtitle: s.subtitle ?? "",
    image: img(s.image, i, 2000),
  }));
}

export async function getServices(): Promise<Service[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = await safeFetch<any[]>(`*[_type=="service"]|order(order asc)`);
  if (!d?.length) return mockServices;
  return d.map((s) => ({
    id: s._id,
    title: s.title,
    description: s.description ?? "",
    icon: s.icon ?? "flask",
  }));
}

export async function getClients(): Promise<Client[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = await safeFetch<any[]>(`*[_type=="client"]|order(name asc)`);
  if (!d?.length) return mockClients;
  return d.map((c) => ({
    id: c._id,
    name: c.name,
    industry: c.industry ?? "",
    logo: c.logo?.asset ? urlFor(c.logo).width(300).url() : undefined,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapProject = (p: any, i: number): Project => ({
  id: p._id,
  slug: p.slug?.current ?? p.slug,
  title: p.title,
  category: p.category ?? "General",
  client: p.client ?? "",
  location: p.location ?? "",
  year: p.year ?? "",
  summary: p.summary ?? "",
  scope: p.scope ?? [],
  image: img(p.image, i),
  gallery: p.gallery?.length
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? p.gallery.map((g: any, gi: number) => img(g, i + gi))
    : [img(p.image, i), fallbackImg(i + 1)],
});

export async function getProjects(): Promise<Project[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = await safeFetch<any[]>(`*[_type=="project"]|order(year desc)`);
  if (!d?.length) return mockProjects;
  return d.map(mapProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = await safeFetch<any[]>(`*[_type=="testimonial"]`);
  if (!d?.length) return mockTestimonials;
  return d.map((t) => ({
    id: t._id,
    quote: t.quote,
    author: t.author ?? "",
    role: t.role ?? "",
    company: t.company ?? "",
  }));
}

export async function getJobs(): Promise<JobOpening[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = await safeFetch<any[]>(`*[_type=="jobOpening"]`);
  if (!d?.length) return mockJobs;
  return d.map((j) => ({
    id: j._id,
    title: j.title,
    department: j.department ?? "",
    location: j.location ?? "",
    type: j.type ?? "Full-time",
    description: j.description ?? "",
    requirements: j.requirements ?? [],
  }));
}
