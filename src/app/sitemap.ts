import type { MetadataRoute } from "next";
import { getCategories, getPosts } from "@/lib/cms";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const abs = (p: string) => new URL(p, site.url).toString();
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/our-eggs"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/the-farm"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/why-vardaan"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/resources"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: abs("/resources/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: abs("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const [posts, categories] = await Promise.all([getPosts({ limit: 500 }), getCategories()]);

  return [
    ...pages,
    ...categories.map((c) => ({ url: abs(`/resources/category/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.5 })),
    ...posts.docs
      .filter((p) => !p.seo?.noindex)
      .map((p) => ({
        url: abs(`/resources/${p.slug}`),
        lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
