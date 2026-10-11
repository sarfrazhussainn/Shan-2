import { defineArrayMember, defineField, defineType } from "sanity";

const img = (name = "image", title = "Image") =>
  defineField({ name, title, type: "image", options: { hotspot: true } });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "whatsapp", type: "string", description: "Digits only with country code, e.g. 966558960193" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "hours", type: "string" }),
    defineField({ name: "mapEmbedUrl", type: "url" }),
    defineField({ name: "aboutHeading", title: "About heading", type: "string" }),
    defineField({ name: "aboutBody", title: "About paragraphs", type: "array", of: [{ type: "text" }] }),
    img("aboutImage", "About image"),
    defineField({ name: "vision", type: "text" }),
    defineField({ name: "mission", type: "text" }),
    defineField({
      name: "values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "value", type: "number" }),
            defineField({ name: "suffix", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "companyName" } },
});

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "document",
  fields: [
    defineField({ name: "order", type: "number" }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", type: "text" }),
    img(),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "order", type: "number" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "icon",
      type: "string",
      options: { list: ["flask", "search", "gauge", "truck", "layers", "file", "shield", "wrench"] },
    }),
  ],
});

export const client = defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "industry", type: "string" }),
    img("logo", "Logo"),
  ],
  preview: { select: { title: "name", subtitle: "industry", media: "logo" } },
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "scope", type: "array", of: [{ type: "string" }] }),
    img("image", "Cover image"),
    defineField({ name: "gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "company", type: "string" }),
  ],
  preview: { select: { title: "author", subtitle: "company" } },
});

export const jobOpening = defineType({
  name: "jobOpening",
  title: "Job Opening",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "type", type: "string", options: { list: ["Full-time", "Part-time", "Contract"] } }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "requirements", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { select: { title: "title", subtitle: "department" } },
});

export const schemaTypes = [siteSettings, heroSlide, service, client, project, testimonial, jobOpening];
