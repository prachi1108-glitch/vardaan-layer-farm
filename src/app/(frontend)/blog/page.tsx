import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getPayloadClient } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and notes on bulk egg supply, freshness, and working with a reliable farm partner — from Vardaan Layer Farm.",
};

type MediaDoc = { url?: string | null; alt?: string | null };
type Category = { title?: string | null };
type Post = {
  id: number | string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  coverImage?: MediaDoc | number | string | null;
  category?: Category | number | string | null;
};

function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
    limit: 24,
  });
  const posts = docs as unknown as Post[];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on reliable egg supply."
        intro="Practical reads for buyers — freshness and storage, supplier reliability, and getting the most from a bulk egg partnership."
      />

      <Section>
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line bg-cream p-8 text-center text-stone">
            No posts published yet. Add posts in the CMS and they&apos;ll appear here.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const media =
                typeof post.coverImage === "object" && post.coverImage
                  ? (post.coverImage as MediaDoc)
                  : null;
              const category =
                typeof post.category === "object" && post.category
                  ? (post.category as Category)
                  : null;
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-md"
                >
                  {media?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={media.url}
                      alt={media.alt ?? post.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <ImagePlaceholder label={post.title} tone="forest" className="aspect-[16/10] w-full" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-moss">
                      {category?.title ? <span>{category.title}</span> : null}
                      {category?.title && post.publishedAt ? <span>·</span> : null}
                      {post.publishedAt ? <span>{formatDate(post.publishedAt)}</span> : null}
                    </div>
                    <h3 className="mt-2 text-lg leading-snug">{post.title}</h3>
                    {post.excerpt ? (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone">
                        {post.excerpt}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <span className="mt-4 text-sm font-semibold text-forest">
                      Read more →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
