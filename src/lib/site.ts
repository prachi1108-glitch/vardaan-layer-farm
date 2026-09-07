/**
 * Vardaan Layer Farm — central site configuration.
 *
 * This is the single source of truth for business details, contact info and
 * the headline numbers used across the site.
 *
 * IMPORTANT: Values marked `PLACEHOLDER` below are NOT verified. Replace them
 * with real, confirmed figures from the farm before the site goes live. Do not
 * invent or inflate them. If a number can't be verified, remove that stat from
 * the relevant section rather than guessing.
 */

export const site = {
  name: "Vardaan Layer Farm",
  tagline: "Reliable bulk egg supply for businesses",
  // One-line positioning used in metadata / hero support copy.
  positioning:
    "A poultry layer farm supplying fresh eggs in bulk to hotels, restaurants, retailers and distributors — with consistent quality and reliable delivery.",

  // ---- Contact details (PLACEHOLDER — replace with real details) ----
  contact: {
    // Use full international format for tel: and wa.me links.
    phoneDisplay: "+91 90000 00000", // PLACEHOLDER
    phoneE164: "919000000000", // PLACEHOLDER (no + / spaces, for wa.me & tel)
    email: "hello@vardhanfarms.com", // PLACEHOLDER
    whatsappE164: "919000000000", // PLACEHOLDER
    // Farm address / service base.
    locationLine: "Your City, State, India", // PLACEHOLDER
    // Optional Google Maps embed URL (leave empty to hide the map).
    mapEmbedUrl: "", // PLACEHOLDER
  },

  // ---- Headline numbers (ALL PLACEHOLDER — verify before launch) ----
  // Keep only stats you can genuinely stand behind.
  stats: [
    { value: "25+", label: "Years of poultry experience", note: "PLACEHOLDER" },
    { value: "50,000+", label: "Laying hens", note: "PLACEHOLDER" },
    { value: "45,000", label: "Eggs collected per day", note: "PLACEHOLDER" },
    { value: "40+", label: "Regular business partners", note: "PLACEHOLDER" },
  ],

  // Regions served — PLACEHOLDER
  regionsServed: "6 districts across the region", // PLACEHOLDER
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Eggs", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** The primary conversion destination (Doc 04 sitemap). */
export const enquiryHref = "/wholesale-enquiry";

/** Pre-filled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsappE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hi Vardaan Layer Farm, I'd like to enquire about your bulk egg supply.";
