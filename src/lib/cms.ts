import { getPayloadClient } from "./payload";
import { site } from "./site";

/**
 * Typed CMS getters for the frontend. Contact details merge the SiteSettings
 * global over the src/lib/site.ts placeholders, so the site shows sensible
 * values until Vardaan fills SiteSettings in /admin, then switches to the real
 * ones automatically.
 */

export type TrustStat = { value: string; label: string };
export type SocialLink = { platform?: string | null; url?: string | null };

export type ContactInfo = {
  tagline: string;
  phoneDisplay: string;
  phoneE164: string;
  email: string;
  whatsappE164: string;
  locationLine: string;
  businessHours: string;
  mapEmbedUrl: string;
  socialLinks: SocialLink[];
};

type SiteSettingsGlobal = {
  tagline?: string | null;
  phone?: string | null;
  phoneE164?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  businessHours?: string | null;
  mapEmbedUrl?: string | null;
  socialLinks?: SocialLink[] | null;
};

export async function getContact(): Promise<ContactInfo> {
  let s: SiteSettingsGlobal | null = null;
  try {
    const payload = await getPayloadClient();
    s = (await payload.findGlobal({ slug: "site-settings" })) as SiteSettingsGlobal;
  } catch {
    s = null;
  }
  return {
    tagline: s?.tagline || site.tagline,
    phoneDisplay: s?.phone || site.contact.phoneDisplay,
    phoneE164: s?.phoneE164 || site.contact.phoneE164,
    email: s?.email || site.contact.email,
    whatsappE164: s?.whatsapp || site.contact.whatsappE164,
    locationLine: s?.address || site.contact.locationLine,
    businessHours: s?.businessHours || "",
    mapEmbedUrl: s?.mapEmbedUrl || site.contact.mapEmbedUrl,
    socialLinks: (s?.socialLinks ?? []).filter((l) => l && l.url),
  };
}

export type HomeContent = {
  heroEyebrow?: string | null;
  heroHeading?: string | null;
  heroSubheading?: string | null;
  ctaPrimaryLabel?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondaryLabel?: string | null;
  ctaSecondaryHref?: string | null;
  trustStats?: TrustStat[] | null;
  ctaBandHeading?: string | null;
  ctaBandText?: string | null;
  ctaBandButtonLabel?: string | null;
  ctaBandButtonHref?: string | null;
};

export async function getHomeContent(): Promise<HomeContent | null> {
  try {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "home-page" })) as HomeContent;
  } catch {
    return null;
  }
}
