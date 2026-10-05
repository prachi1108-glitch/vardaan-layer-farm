import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { FaqList, faqSchema } from "@/components/blocks/Faq";
import { PostCard, formatDate } from "@/components/blocks/PostCard";
import { QuickAnswer } from "@/components/blocks/QuickAnswer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { getPost, getPosts, readingTime, type Post } from "@/lib/cms";
import { blogPostingSchema } from "@/lib/schema";
import { quoteHref } from "@/lib/site";

type LexNode = { type?: string; tag?: string; text?: string; children?: LexNode[] };

const textOf = (n: LexNode): string => (n.text ?? "") + (n.children ?? []).map(textOf).join("");
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

/** H2s become the table of contents; each gets a stable anchor id. */
function tocOf(post: Post) {
  const root = post.content?.root as LexNode | undefined;
  return (root?.children ?? [])
    .filter((n) => n.type === "heading" && n.tag === "h2")
    .map((n) => ({ text: textOf(n), id: slugify(textOf(n)) }))
    .filter((t) => t.text);
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag;
    const children = nodesToJSX({ nodes: node.children });
    return Tag === "h2" ? <h2 id={slugify(textOf(node as LexNode))}>{children}</h2> : <Tag>{children}</Tag>;
  },
});

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  const description = post.seo?.metaDescription || post.excerpt || post.quickAnswer || undefined;
  // An uploaded OG/cover image wins; otherwise the generated opengraph-image.tsx is used.
  const og = post.seo?.ogImage?.url || post.coverImage?.url;
  return {
    title: post.seo?.metaTitle || `${post.title} · Vardaan Layer Farm`,
    description,
    alternates: { canonical: `/resources/${slug}` },
    robots: post.seo?.noindex ? { index: false } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt || undefined,
      ...(og ? { images: [og] } : {}),
    },
  };
}

export default async function PostPage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const toc = tocOf(post);
  const mins = readingTime(post.content);
  let related = (post.relatedPosts ?? []).filter((p): p is Post => typeof p === "object" && p !== null);
  if (related.length < 3) {
    const more = await getPosts({ limit: 4, categorySlug: post.category?.slug || undefined });
    related = [...related, ...more.docs.filter((p) => p.id !== post.id && !related.some((r) => r.id === p.id))].slice(0, 3);
  }
  const faqs = post.faqs ?? [];
  const updatedDiffers =
    post.updatedAt && post.publishedAt && new Date(post.updatedAt).toDateString() !== new Date(post.publishedAt).toDateString();

  return (
    <>
      <article className="bg-eggshell">
        <header className="container-x pb-10 pt-8 lg:pt-12">
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              ...(post.category?.slug ? [{ label: post.category.title, href: `/resources/category/${post.category.slug}` }] : []),
              { label: post.title, href: `/resources/${slug}` },
            ]}
          />
          <div className="max-w-[860px]">
            {post.category?.title ? (
              <span className="inline-flex rounded-full bg-sky px-3 py-1 text-[13px] font-medium text-cocoa">{post.category.title}</span>
            ) : null}
            <h1 className="t-h1 mt-4 text-cocoa">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-pebble">
              {post.byline ? (
                <span className="flex items-center gap-2.5">
                  {post.byline.photo?.url ? (
                    <Image src={post.byline.photo.url} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-butter font-semibold text-cocoa">
                      {post.byline.name.charAt(0)}
                    </span>
                  )}
                  <span className="font-semibold text-cocoa">{post.byline.name}</span>
                </span>
              ) : null}
              {post.publishedAt ? <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time> : null}
              {updatedDiffers ? <time dateTime={post.updatedAt!}>Updated {formatDate(post.updatedAt)}</time> : null}
              <span>{mins} min read</span>
            </div>
            {post.quickAnswer ? <QuickAnswer className="mt-8">{post.quickAnswer}</QuickAnswer> : null}
          </div>
          {post.coverImage?.url ? (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[28px]">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || ""}
                fill
                priority
                sizes="(max-width:1280px) 100vw, 1240px"
                className="object-cover"
              />
            </div>
          ) : null}
        </header>

        <div className="container-x grid gap-12 pb-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          {toc.length ? (
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow mb-3 text-pebble">On this page</p>
              <ol className="space-y-2 border-l-2 border-line pl-4 text-[14px]">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-cocoa hover:text-clay">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : (
            <div className="hidden lg:block" />
          )}

          <div>
            <div className="prose-vardaan">
              {post.content ? <RichText data={post.content} converters={converters} disableContainer /> : null}
            </div>

            {/* Mid/end-article CTA — every post links to a money page (PRD §5.1). */}
            <aside className="mt-12 flex max-w-[68ch] flex-col gap-5 rounded-[20px] bg-peach p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="t-h3 text-cocoa">Need eggs in bulk?</p>
                <p className="mt-1 text-[15px] text-cocoa/80">
                  Farm-direct white eggs, graded and packed in 30-egg trays.{" "}
                  <Link href="/our-eggs" className="font-semibold underline underline-offset-2">
                    See grades
                  </Link>
                  .
                </p>
              </div>
              <ButtonLink href={quoteHref} data-quote className="shrink-0">
                Get a quote
              </ButtonLink>
            </aside>

            {faqs.length ? (
              <section aria-labelledby="post-faq" className="mt-14 max-w-[68ch]">
                <h2 id="post-faq" className="t-h2 mb-6 text-cocoa">
                  FAQ
                </h2>
                <FaqList items={faqs} />
                <JsonLd data={faqSchema(faqs)} />
              </section>
            ) : null}

            {post.byline ? (
              <section aria-label="About the author" className="mt-14 flex max-w-[68ch] gap-5 rounded-[20px] border border-line bg-white p-6">
                {post.byline.photo?.url ? (
                  <Image src={post.byline.photo.url} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-butter text-[22px] font-semibold text-cocoa">
                    {post.byline.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="font-semibold text-cocoa">{post.byline.name}</p>
                  {post.byline.role ? <p className="text-[14px] text-pebble">{post.byline.role}</p> : null}
                  {post.byline.bio ? <p className="mt-2 text-[15px] text-cocoa">{post.byline.bio}</p> : null}
                  {post.byline.credentials ? <p className="mt-1 text-[14px] text-pebble">{post.byline.credentials}</p> : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related" className="bg-oat py-16 lg:py-20">
          <div className="container-x">
            <h2 id="related" className="t-h2 m-0 text-cocoa">
              Keep reading
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
      <JsonLd data={blogPostingSchema(post)} />
    </>
  );
}
