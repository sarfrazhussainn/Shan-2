export interface SiteSettings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string; // digits only, with country code
  address: string;
  hours: string;
  mapEmbedUrl: string;
  about: { heading: string; body: string[]; image: string };
  vision: string;
  mission: string;
  values: { title: string; description: string }[];
  stats: { label: string; value: number; suffix?: string }[];
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  logo?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  summary: string;
  scope: string[];
  image: string;
  gallery: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}
