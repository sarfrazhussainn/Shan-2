import type {
  Client,
  HeroSlide,
  JobOpening,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from "../types";

export const mockSettings: SiteSettings = {
  companyName: "Shan Testing & Trading Company",
  tagline: "Precision testing. Reliable trading. Built on trust.",
  email: "info@shantesting.com",
  phone: "+91 90033 62976",
  whatsapp: "919003362976",
  address: "Al Khobar, Eastern Province, Kingdom of Saudi Arabia",
  hours: "Sun – Thu: 8:00 AM – 5:00 PM",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Al+Khobar,+Saudi+Arabia&output=embed",
  about: {
    heading: "A trusted partner for testing and trading in the Eastern Province",
    body: [
      "Shan Testing and Trading Company is based in Al Khobar and serves industrial, construction and energy clients across the Kingdom with accurate testing services and dependable supply of quality materials.",
      "Our qualified engineers, modern equipment and commitment to international standards help clients make confident decisions on every project, large or small.",
    ],
    image: "/images/lab.jpg",
  },
  vision:
    "To be the most trusted testing and trading partner in the Kingdom, recognised for integrity, accuracy and service excellence.",
  mission:
    "To deliver reliable testing, inspection and supply solutions that meet international standards, on time and with complete transparency.",
  values: [
    { title: "Integrity", description: "Honest results and transparent dealings, every time." },
    { title: "Quality", description: "Strict adherence to recognised standards and procedures." },
    { title: "Safety", description: "Safe practices for our people, clients and communities." },
    { title: "Partnership", description: "Long-term relationships built on trust and responsiveness." },
  ],
  stats: [
    { label: "Years of Experience", value: 15, suffix: "+" },
    { label: "Projects Completed", value: 450, suffix: "+" },
    { label: "Happy Clients", value: 120, suffix: "+" },
    { label: "Expert Engineers", value: 40, suffix: "+" },
  ],
};

export const mockHeroSlides: HeroSlide[] = [
  {
    id: "h1",
    eyebrow: "Materials Testing",
    title: "Accuracy you can build on",
    subtitle: "Accredited-grade laboratory testing for concrete, soil, steel and more.",
    image: "/images/lab.jpg",
  },
  {
    id: "h2",
    eyebrow: "General Trading",
    title: "Quality supply, delivered on time",
    subtitle: "Reliable sourcing and logistics for industrial and construction needs.",
    image: "/images/trading.jpg",
  },
  {
    id: "h3",
    eyebrow: "Inspection Services",
    title: "On-site inspection you can trust",
    subtitle: "Experienced engineers ensuring safety and compliance at every stage.",
    image: "/images/inspection.jpg",
  },
];

export const mockServices: Service[] = [
  { id: "s1", title: "Material Testing", description: "Concrete, soil, asphalt and aggregate testing in our fully equipped laboratory.", icon: "flask" },
  { id: "s2", title: "Site Inspection", description: "Third-party inspection and quality control for construction and industrial sites.", icon: "search" },
  { id: "s3", title: "Calibration", description: "Calibration of measuring and testing equipment to recognised standards.", icon: "gauge" },
  { id: "s4", title: "General Trading", description: "Supply of construction materials, tools and industrial equipment.", icon: "truck" },
  { id: "s5", title: "Geotechnical Services", description: "Soil investigation, field tests and foundation recommendations.", icon: "layers" },
  { id: "s6", title: "Certification & Reports", description: "Clear, certified reports delivered quickly for your approvals.", icon: "file" },
];

export const mockClients: Client[] = [
  { id: "c1", name: "Gulf Builders", industry: "Construction" },
  { id: "c2", name: "Eastern Petro Services", industry: "Oil & Gas" },
  { id: "c3", name: "Al Noor Contracting", industry: "Construction" },
  { id: "c4", name: "Arabian Steelworks", industry: "Industrial" },
  { id: "c5", name: "Dammam Infrastructure", industry: "Infrastructure" },
  { id: "c6", name: "Khobar Properties", industry: "Real Estate" },
  { id: "c7", name: "Coastal Marine Co.", industry: "Marine" },
  { id: "c8", name: "Desert Energy", industry: "Oil & Gas" },
  { id: "c9", name: "Horizon Developments", industry: "Real Estate" },
  { id: "c10", name: "Prime Logistics", industry: "Industrial" },
  { id: "c11", name: "Najd Roads Co.", industry: "Infrastructure" },
  { id: "c12", name: "Falcon Engineering", industry: "Construction" },
];

export const mockProjects: Project[] = [
  {
    id: "p1", slug: "corniche-tower-concrete-testing", title: "Corniche Tower Concrete Testing",
    category: "Construction", client: "Gulf Builders", location: "Al Khobar", year: "2024",
    summary: "Complete concrete quality testing programme for a 32-storey waterfront tower.",
    scope: ["Compressive strength testing", "Slump and mix verification", "Core sampling", "Certified reporting"],
    image: "/images/lab.jpg", gallery: ["/images/lab.jpg", "/images/inspection.jpg"],
  },
  {
    id: "p2", slug: "industrial-yard-material-supply", title: "Industrial Yard Material Supply",
    category: "Trading", client: "Prime Logistics", location: "Dammam", year: "2024",
    summary: "Bulk supply and logistics of construction materials for a new industrial yard.",
    scope: ["Material sourcing", "Quality verification", "Port clearance support", "Scheduled delivery"],
    image: "/images/trading.jpg", gallery: ["/images/trading.jpg", "/images/lab.jpg"],
  },
  {
    id: "p3", slug: "steel-structure-inspection", title: "Steel Structure Inspection",
    category: "Inspection", client: "Arabian Steelworks", location: "Jubail", year: "2023",
    summary: "Third-party inspection of structural steel fabrication and erection.",
    scope: ["Weld inspection", "Bolt torque verification", "Dimensional checks", "Final compliance report"],
    image: "/images/inspection.jpg", gallery: ["/images/inspection.jpg", "/images/trading.jpg"],
  },
  {
    id: "p4", slug: "highway-soil-investigation", title: "Highway Soil Investigation",
    category: "Geotechnical", client: "Najd Roads Co.", location: "Eastern Province", year: "2023",
    summary: "Soil investigation and compaction testing along a 40 km highway corridor.",
    scope: ["Borehole sampling", "Field density tests", "Laboratory analysis", "Design recommendations"],
    image: "/images/inspection.jpg", gallery: ["/images/inspection.jpg", "/images/lab.jpg"],
  },
  {
    id: "p5", slug: "petrochemical-plant-calibration", title: "Petrochemical Plant Calibration",
    category: "Calibration", client: "Eastern Petro Services", location: "Jubail", year: "2022",
    summary: "On-site calibration of testing equipment across a petrochemical facility.",
    scope: ["Instrument calibration", "Traceable certificates", "Scheduled re-calibration"],
    image: "/images/lab.jpg", gallery: ["/images/lab.jpg", "/images/inspection.jpg"],
  },
  {
    id: "p6", slug: "residential-compound-supply", title: "Residential Compound Supply",
    category: "Trading", client: "Khobar Properties", location: "Al Khobar", year: "2022",
    summary: "Supply of finishing and structural materials for a 200-unit compound.",
    scope: ["Procurement", "Quality inspection", "Phased delivery"],
    image: "/images/trading.jpg", gallery: ["/images/trading.jpg", "/images/inspection.jpg"],
  },
];

export const mockTestimonials: Testimonial[] = [
  { id: "t1", quote: "Shan Testing delivered accurate results ahead of schedule. Their reports gave us full confidence during approvals.", author: "Ahmed Al-Salem", role: "Project Manager", company: "Gulf Builders" },
  { id: "t2", quote: "Professional engineers and a very responsive team. Our supply chain has never been smoother.", author: "Khalid Rahman", role: "Procurement Head", company: "Prime Logistics" },
  { id: "t3", quote: "Thorough inspections and clear communication throughout the project. Highly recommended.", author: "Omar Farooq", role: "Site Director", company: "Arabian Steelworks" },
];

export const mockJobs: JobOpening[] = [
  {
    id: "j1", title: "Laboratory Technician", department: "Laboratory", location: "Al Khobar", type: "Full-time",
    description: "Perform routine concrete, soil and aggregate tests following approved standards.",
    requirements: ["Diploma in Civil Engineering or related field", "2+ years lab experience", "Knowledge of ASTM / BS standards"],
  },
  {
    id: "j2", title: "QA/QC Inspector", department: "Inspection", location: "Eastern Province", type: "Full-time",
    description: "Carry out site inspections and prepare compliance reports for clients.",
    requirements: ["Relevant inspector certification", "3+ years site experience", "Good report writing skills"],
  },
  {
    id: "j3", title: "Sales & Trading Executive", department: "Trading", location: "Al Khobar", type: "Full-time",
    description: "Manage client enquiries, quotations and supplier relationships.",
    requirements: ["Bachelor's degree in business or engineering", "Strong communication skills", "Fluent English; Arabic is a plus"],
  },
];
