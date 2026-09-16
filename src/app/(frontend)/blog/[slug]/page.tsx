import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getPayloadClient } from "@/lib/payload";

type MediaDoc = { url?: string | null; alt?: string | null };
type Category = { title?: string | null };
type Seo = { metaTitle?: string | null; metaDescription?: string | null };
type Post = {
  id: number | string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  content?: SerializedEditorState | null;
  coverImage?: MediaDoc | number | string | null;
  category?: Category | number | string | null;
  seo?: Seo | null;
};

async function getPost(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    depth: 1,
    limit: 1,
  });
  return (docs[0] as unknown as Post) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt || undefined,
  };
}

function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const media =
    typeof post.coverImage === "object" && post.coverImage
      ? (post.coverImage as MediaDoc)
      : null;
  const category =
    typeof post.category === "object" && post.category
      ? (post.category as Category)
      : null;

  return (
    <>
      <Section className="!pb-0">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm font-semibold text-secondary hover:underline">
            ← All posts
          </Link>
          <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-wide text-tertiary">
            {category?.title ? <span>{category.title}</span> : null}
            {category?.title && post.publishedAt ? <span>·</span> : null}
            {post.publishedAt ? <span>{formatDate(post.publishedAt)}</span> : null}
          </div>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
          {post.excerpt ? (
            <p className="mt-5 text-lg leading-relaxed text-on-surface-variant">{post.excerpt}</p>
          ) : null}
        </div>
      </Section>

      <Section className="!pt-10">
        <div className="mx-auto max-w-3xl">
          {media?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.url}
              alt={media.alt ?? post.title}
              className="aspect-[16/9] w-full rounded-2xl object-cover"
            />
          ) : (
            <ImagePlaceholder label={post.title} tone="forest" className="aspect-[16/9] w-full" />
          )}

          <article className="prose-vardaan mt-10">
            {post.content ? (
              <RichText data={post.content} />
            ) : (
              <p className="text-on-surface-variant">
                This post doesn&apos;t have body content yet. Add it in the CMS.
              </p>
            )}
          </article>

          <div className="mt-12 rounded-2xl border border-outline-variant bg-surface-cream p-8 text-center">
            <h2 className="text-2xl">Need a reliable egg supplier?</h2>
            <p className="mx-auto mt-2 max-w-md text-on-surface-variant">
              Tell us your requirement and we&apos;ll get you a quote.
            </p>
            <ButtonLink href="/wholesale-enquiry" size="lg" className="mt-5">
              Get a Quote
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
