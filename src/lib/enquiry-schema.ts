import { z } from "zod";
import { BUSINESS_TYPES } from "./site";

/**
 * Enquiry validation shared by the form (inline errors) and the API route
 * (PRD FR-2.1, FR-2.2). Messages are plain language — they are shown as-is.
 */

export const QUANTITY_UNITS = [
  { value: "trays_day", label: "trays / day" },
  { value: "trays_week", label: "trays / week" },
  { value: "trays_month", label: "trays / month" },
  { value: "eggs_day", label: "eggs / day" },
  { value: "eggs_week", label: "eggs / week" },
  { value: "eggs_month", label: "eggs / month" },
] as const;

export const FREQUENCIES = [
  { value: "one_time", label: "One-time" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "ongoing", label: "Ongoing" },
] as const;

export const GRADE_OPTIONS = ["Medium", "Large", "Extra Large", "Mixed"] as const;

const values = <T extends readonly { value: string }[]>(arr: T) =>
  arr.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

/** Treats an empty form value as "not given". */
const optional = <T extends z.ZodType>(s: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), s.optional());

/** Indian mobile: optional +91/0 prefix, then 10 digits starting 6–9. */
const INDIAN_MOBILE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

const base = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  businessName: z.string().trim().min(2, "Please enter your business name.").max(160),
  businessType: z.enum(values(BUSINESS_TYPES), { message: "Please choose your business type." }),
  phone: z.string().trim().regex(INDIAN_MOBILE, "Please enter a 10-digit Indian mobile number."),
  quantity: z.coerce
    .number({ message: "Please enter an approximate quantity." })
    .int("Please enter a whole number.")
    .positive("Please enter an approximate quantity.")
    .max(10_000_000),
  quantityUnit: z.enum(values(QUANTITY_UNITS), { message: "Please choose a unit." }),
  city: z.string().trim().min(2, "Please tell us the city, area or PIN code.").max(120),
  email: optional(z.string().trim().email("Please check the email address.")),
  frequency: optional(z.enum(values(FREQUENCIES))),
  requiredBy: optional(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a date.")),
  preferredGrade: optional(z.string().max(40)),
  message: optional(z.string().max(3000, "Please keep the message under 3000 characters.")),
  consent: z.literal(true, { message: "Please agree so we can contact you about this enquiry." }),
});

export const enquirySchema = base.superRefine((d, ctx) => {
  if (d.frequency === "one_time" && !d.requiredBy) {
    ctx.addIssue({ code: "custom", path: ["requiredBy"], message: "When do you need the eggs?" });
  }
});

/** Compact variant (Our Eggs inline form): fewer fields, same schema shape. */
export const compactEnquirySchema = base.pick({
  businessType: true,
  quantity: true,
  quantityUnit: true,
  city: true,
  phone: true,
  consent: true,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Rough volume band for analytics (FR-2.6) — trays per week. */
export function volumeBand(quantity: number, unit: string): string {
  const perTray = unit.startsWith("eggs") ? 30 : 1;
  const perWeek = unit.endsWith("day") ? 7 : unit.endsWith("month") ? 1 / 4.3 : 1;
  const trays = (quantity / perTray) * perWeek;
  if (trays < 50) return "<50 trays/wk";
  if (trays < 200) return "50-200 trays/wk";
  if (trays < 1000) return "200-1000 trays/wk";
  return "1000+ trays/wk";
}
