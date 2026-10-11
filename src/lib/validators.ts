import { z } from "zod";

const phoneRe = /^[+\d][\d\s\-()]{6,19}$/;

export const quoteSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRe, "Enter a valid phone number"),
  service: z.string().min(1, "Select a service"),
  message: z.string().min(10, "Please add a few details (min 10 characters)"),
  website: z.string().optional(), // honeypot
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Add a subject"),
  message: z.string().min(10, "Please add a few details (min 10 characters)"),
  website: z.string().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const careerSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(phoneRe, "Enter a valid phone number"),
  position: z.string().min(1, "Select a position"),
  experience: z.string().min(1, "Select your experience"),
  message: z.string().optional(),
  website: z.string().optional(),
});
export type CareerInput = z.infer<typeof careerSchema>;
