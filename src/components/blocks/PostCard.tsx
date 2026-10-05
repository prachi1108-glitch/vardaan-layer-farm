import Image from "next/image";
import Link from "next/link";
import { Eggie, Pip, TrayIcon } from "@/components/characters";
import type { Post } from "@/lib/cms";
import { readingTime } from "@/lib/cms";

export function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Pastel illustrated thumbnail used when a post has no cover image (Doc 06 §2.6). */
function Thumb({ seed }: { seed: number }) {
  const v = seed % 3;
  const bg = ["bg-butter", "bg-sky", "bg-peach"][v];
  return (
    <div className={`absolute inset-0 grid place-items-center ${bg}`}>
      {v === 0 ? <TrayIcon className="w-[52%]" /> : v === 1 ? <Eggie className="w-[26%]" /> : <Pip className="w-[30%]" />}
    </div>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const img = post.coverImage?.url;
  const mins = readingTime(post.content);
  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-[20px] bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
        featured ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] lg:aspect-auto lg:w-[55%]" : "aspect-[16/10]"}`}>
        {img ? (
          <Image
            src={img}
            alt={post.coverImage?.alt || ""}
            fill
            sizes={featured ? "(max-width:1024px) 100vw, 55vw" : "(max-width:768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <Thumb seed={Number(post.id) || post.title.length} />
        )}
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-10" : ""}`}>
        {post.category?.title ? (
          <span className="mb-3 inline-flex w-fit rounded-full bg-sky px-3 py-1 text-[12px] font-medium text-cocoa">
            {post.category.title}
          </span>
        ) : null}
        <h3 className={`${featured ? "t-h2" : "t-h3"} text-cocoa`}>
          <Link href={`/resources/${post.slug}`} className="after:absolute after:inset-0 hover:text-clay">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? (
          <p className={`mt-3 text-[15px] text-pebble ${featured ? "" : "line-clamp-2"}`}>{post.excerpt}</p>
        ) : null}
        <p className="mt-auto pt-5 text-[13px] text-pebble">
          {formatDate(post.publishedAt)} · {mins} min read
        </p>
      </div>
    </article>
  );
}
