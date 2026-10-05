import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { Where } from "payload";
import { getPayloadClient } from "./payload";
import { site } from "./site";

/**
 * Typed CMS getters for the frontend. Every getter swallows database errors
 * and returns an empty/fallback value, so a Neon outage degrades the site to
 * its in-code copy instead of a 500.
 */

async function safe<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("[cms]", err instanceof Error ? err.message : err);
    return fallback;
  }
}

/* ------------------------------ Site settings ------------------------------ */

export type SocialLink = { platform?: string | null; url?: string | null };

export type ContactInfo = {
  phoneDisplay: string;
  phoneE164: string;
  whatsappE164: string;
  email: string;
  locationLine: string;
  businessHours: string;
  areasServed: string[];
  socialLinks: SocialLink[];
  gstNumber: string;
  licenceNumber: string;
};

type SiteSettingsGlobal = {
  phone?: string | null;
  phoneE164?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  businessHours?: string | null;
  areasServed?: { name?: string | null }[] | null;
  socialLinks?: SocialLink[] | null;
  gstNumber?: string | null;
  licenceNumber?: string | null;
};

export async function getContact(): Promise<ContactInfo> {
  const s = await safe<SiteSettingsGlobal | null>(null, async () => {
    const payload = await getPayloadClient();
    return (await payload.findGlobal({ slug: "site-settings" })) as SiteSettingsGlobal;
  });
  return {
    phoneDisplay: s?.phone || site.contact.phoneDisplay,
    phoneE164: s?.phoneE164 || site.contact.phoneE164,
    whatsappE164: s?.whatsapp || site.contact.whatsappE164,
    email: s?.email || site.contact.email,
    locationLine: s?.address || site.contact.locationLine,
    businessHours: s?.businessHours || "",
    areasServed: (s?.areasServed ?? []).map((a) => a?.name ?? "").filter(Boolean),
    socialLinks: (s?.socialLinks ?? []).filter((l) => l && l.url),
    gstNumber: s?.gstNumber || "",
    licenceNumber: s?.licenceNumber || "",
  };
}

/* ---------------------------------- FAQs ---------------------------------- */

export type Faq = { id: string | number; question: string; answer: string; topic?: string | null };

export async function getFaqs(page?: string, limit = 50): Promise<Faq[]> {
  return safe([], async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "faqs",
      where: page ? { showOn: { contains: page } } : undefined,
      sort: "order",
      limit,
      depth: 0,
    });
    return docs as unknown as Faq[];
  });
}

/* --------------------------------- Grades --------------------------------- */

export type Grade = {
  id: string | number;
  name: string;
  weightMin?: number | null;
  weightMax?: number | null;
  bestFor?: string | null;
  trayWeight?: string | null;
};

export async function getGrades(): Promise<Grade[]> {
  return safe([], async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({ collection: "grades", sort: "order", limit: 20, depth: 0 });
    return docs as unknown as Grade[];
  });
}

/* ---------------------------------- Posts --------------------------------- */

export type MediaDoc = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null };
export type Category = { id: string | number; title: string; slug?: string | null; description?: string | null };
export type Author = {
  id: string | number;
  name: string;
  role?: string | null;
  bio?: string | null;
  credentials?: string | null;
  photo?: MediaDoc | null;
};
export type Post = {
  id: string | number;
  title: string;
  slug?: string | null;
  quickAnswer?: string | null;
  excerpt?: string | null;
  coverImage?: MediaDoc | null;
  content?: SerializedEditorState | null;
  faqs?: { id?: string; question: string; answer: string }[] | null;
  relatedPosts?: (Post | string | number)[] | null;
  byline?: Author | null;
  category?: Category | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  seo?: { metaTitle?: string | null; metaDescription?: string | null; ogImage?: MediaDoc | null; noindex?: boolean | null } | null;
};

const published: Where = { _status: { equals: "published" } };

export type PostList = { docs: Post[]; totalPages: number; page: number; totalDocs: number };

export async function getPosts({
  page = 1,
  limit = 12,
  categorySlug,
  q,
}: { page?: number; limit?: number; categorySlug?: string; q?: string } = {}): Promise<PostList> {
  return safe({ docs: [], totalPages: 0, page, totalDocs: 0 }, async () => {
    const payload = await getPayloadClient();
    const and: Where[] = [published];
    if (categorySlug) and.push({ "category.slug": { equals: categorySlug } });
    if (q) and.push({ or: [{ title: { like: q } }, { excerpt: { like: q } }, { quickAnswer: { like: q } }] });
    const res = await payload.find({
      collection: "posts",
      where: { and },
      sort: "-publishedAt",
      page,
      limit,
      depth: 1,
    });
    return {
      docs: res.docs as unknown as Post[],
      totalPages: res.totalPages,
      page: res.page ?? page,
      totalDocs: res.totalDocs,
    };
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  return safe(null, async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { and: [published, { slug: { equals: slug } }] },
      depth: 2,
      limit: 1,
    });
    return (docs[0] as unknown as Post) ?? null;
  });
}

export async function getCategories(): Promise<Category[]> {
  return safe([], async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({ collection: "categories", sort: "title", limit: 50, depth: 0 });
    return docs as unknown as Category[];
  });
}

export async function getCategory(slug: string): Promise<Category | null> {
  return safe(null, async () => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "categories",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    });
    return (docs[0] as unknown as Category) ?? null;
  });
}

/** Rough reading time for a Lexical document (220 wpm). */
export function readingTime(content?: SerializedEditorState | null): number {
  if (!content) return 1;
  let words = 0;
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const n = node as { text?: string; children?: unknown[] };
    if (typeof n.text === "string") words += n.text.split(/\s+/).filter(Boolean).length;
    n.children?.forEach(walk);
  };
  walk(content.root);
  return Math.max(1, Math.round(words / 220));
}
