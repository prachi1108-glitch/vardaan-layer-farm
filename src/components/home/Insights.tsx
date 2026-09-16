import Image from "next/image";
import Link from "next/link";
import { Sym } from "@/components/ui/Sym";

type MediaDoc = { url?: string | null; alt?: string | null };

export type InsightPost = {
  id: number | string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  coverImage?: MediaDoc | number | string | null;
  category?: { title?: string | null } | number | string | null;
};

/** Fallback imagery for posts that don't have a cover uploaded yet. */
const fallbackImages = [
  "/design/insight-cold-chain.jpg",
  "/design/insight-chef-eggs.jpg",
  "/design/insight-farm-aerial.jpg",
];

function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

export function Insights({ posts }: { posts: InsightPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-space-2xl md:py-space-3xl bg-surface-cream" id="insights">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 reveal">
          <div>
            <span className="font-label-caps text-label-caps text-secondary">
              KNOWLEDGE &amp; STANDARDS
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mt-2">
              Practical insights from the farm
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:text-on-surface transition-colors shrink-0"
          >
            <span>Read all articles</span>
            <Sym
              name="arrow_forward"
              className="text-base transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => {
            const media =
              typeof post.coverImage === "object" && post.coverImage
                ? (post.coverImage as MediaDoc)
                : null;
            const category =
              typeof post.category === "object" && post.category
                ? (post.category as { title?: string | null })
                : null;
            const src = media?.url || fallbackImages[i % fallbackImages.length];

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="reveal group flex flex-col bg-surface-offwhite rounded-[20px] overflow-hidden egg-border shadow-ambient hover:shadow-lift transition-all"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={media?.alt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {category?.title ? (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-surface-offwhite/95 backdrop-blur-sm text-secondary font-label-caps text-label-caps rounded-md border border-secondary/20">
                      {category.title}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {post.publishedAt ? (
                    <span className="font-label-caps text-label-caps text-on-surface-variant">
                      {formatDate(post.publishedAt)}
                    </span>
                  ) : null}
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-2 mb-2 leading-snug">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex-1">
                      {post.excerpt}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary">
                    Read Guide
                    <Sym
                      name="north_east"
                      className="text-base transition-transform duration-200 group-hover:rotate-45"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
