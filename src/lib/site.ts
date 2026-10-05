/**
 * Vardaan Layer Farm — business facts and site-wide constants.
 *
 * Contact details here are the fallback; the Site Settings global in /admin
 * overrides them at runtime (see getContact in cms.ts).
 *
 * UNVERIFIED CLAIMS live in `claims` below with `verified: false`. They are
 * shown on the site (they were on the previous build) but must be confirmed
 * by the farm before launch — see docs/phase-0-facts-and-content-audit.md.
 * If a claim is dropped, change its `text` to the fallback wording noted.
 */

export const site = {
  name: "Vardaan Layer Farm",
  shortName: "Vardaan",
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  tagline: "Fresh from our flock. On your schedule.",
  /** Entity sentence — use identically on the site, GBP and directories (PRD §5.5). */
  description:
    "Vardaan Layer Farm is a poultry layer farm in Sonipat, Haryana that produces white table eggs from its own flock and supplies them in bulk to hotels, restaurants, caterers, retailers, distributors and institutional kitchens.",
  heroSub:
    "Fresh white eggs from our own layer farm — graded on site, packed in 30-egg trays, delivered on a schedule.",

  contact: {
    phoneDisplay: "+91 80532 32718",
    phoneE164: "918053232718",
    whatsappE164: "918053232718",
    email: "vardaanlayerfarm@gmail.com",
    locationLine: "Sonipat, Haryana, India",
    locality: "Sonipat",
    region: "Haryana",
    country: "IN",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vardaan+Layer+Farm+Sonipat+Haryana",
  },

  /** Shown on the thank-you page, emails and CTA bands. */
  quoteTurnaround: "4 business hours", // verify — see claims.quoteTime

  grades: ["Medium", "Large", "Extra Large"],
} as const;

type Claim = { text: string; verified: boolean; fallback?: string };

export const claims = {
  freshness: {
    text: "Within 24h of lay",
    verified: false,
    fallback: "Dispatched daily",
  },
  quoteTime: {
    text: "Quote in 4 business hours",
    verified: false,
    fallback: "Quote the same business day",
  },
  capacity: {
    text: "From regular weekly orders to recurring truckloads",
    verified: false,
  },
} satisfies Record<string, Claim>;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Our Eggs", href: "/our-eggs" },
  { label: "The Farm", href: "/the-farm" },
  { label: "Why Vardaan", href: "/why-vardaan" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

/** The primary conversion destination (Doc 05 sitemap). */
export const quoteHref = "/contact#quote";

/** Business types — values must match the Enquiries collection select. */
export const BUSINESS_TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "restaurant", label: "Restaurant / Cloud kitchen" },
  { value: "retailer", label: "Retailer / Store" },
  { value: "distributor", label: "Distributor / Wholesaler" },
  { value: "caterer", label: "Caterer" },
  { value: "institution", label: "Institution" },
  { value: "other", label: "Other" },
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number]["value"];

/** Pre-filled WhatsApp deep link (PRD FR-3.1). */
export function whatsappLink(message?: string, e164?: string): string {
  const base = `https://wa.me/${e164 || site.contact.whatsappE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappMessages = {
  default: "Hi Vardaan, I'd like a quote for ___ trays/week delivered to ___.",
  eggs: "Hi Vardaan, I'd like a quote for ___ trays/week of ___ (Medium / Large / XL) eggs delivered to ___.",
  farm: "Hi Vardaan, I'd like to know more about your farm and get a quote for ___ trays/week.",
  contact: "Hi Vardaan, I'd like a quote for ___ trays/week delivered to ___.",
} as const;
