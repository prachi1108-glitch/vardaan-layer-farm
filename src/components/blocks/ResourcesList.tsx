import Link from "next/link";
import { PostCard } from "@/components/blocks/PostCard";
import { Eggie } from "@/components/characters";
import { Icon } from "@/components/icons";
import type { Category, PostList } from "@/lib/cms";

/** Category pills + search + featured/grid + pagination, shared by hub and category pages. */
export function ResourcesList({
  list,
  categories,
  activeSlug,
  q,
  basePath,
}: {
  list: PostList;
  categories: Category[];
  activeSlug?: string;
  q?: string;
  basePath: string;
}) {
  const [featured, ...rest] = list.docs;
  const showFeatured = list.page === 1 && !q && featured;
  const grid = showFeatured ? rest : list.docs;

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return s ? `${basePath}?${s}` : basePath;
  };

  const pill = (active: boolean) =>
    `inline-flex h-10 items-center rounded-full px-4 text-[14px] font-medium transition-colors ${
      active ? "bg-cocoa text-white" : "bg-white text-cocoa border border-line hover:border-cocoa/40"
    }`;

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Categories">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href="/resources" className={pill(!activeSlug)} aria-current={!activeSlug ? "page" : undefined}>
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/resources/category/${c.slug}`}
                  className={pill(activeSlug === c.slug)}
                  aria-current={activeSlug === c.slug ? "page" : undefined}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <form role="search" action="/resources" className="relative w-full lg:w-[320px]">
          <label htmlFor="resources-q" className="sr-only">
            Search resources
          </label>
          <Icon.Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pebble" />
          <input
            id="resources-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search guides"
            className="h-12 w-full rounded-full border border-line bg-white pl-12 pr-4 text-[16px] focus:border-clay focus:outline-none"
          />
        </form>
      </div>

      {q ? (
        <p className="mt-8 text-pebble" role="status">
          {list.totalDocs} result{list.totalDocs === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
        </p>
      ) : null}

      {list.docs.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-[20px] bg-white p-12 text-center shadow-soft">
          <Eggie className="w-16" face="calm" />
          <p className="mt-4 text-[17px] font-semibold text-cocoa">{q ? "Nothing matched that search." : "Guides are on their way."}</p>
          <p className="mt-1 text-pebble">
            Meanwhile, browse the{" "}
            <Link href="/resources/faq" className="text-clay underline underline-offset-2">
              FAQs
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          {showFeatured ? (
            <div className="mt-10">
              <PostCard post={featured} featured />
            </div>
          ) : null}
          {grid.length ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {grid.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          ) : null}
        </>
      )}

      {list.totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
          {list.page > 1 ? (
            <Link href={pageHref(list.page - 1)} className={pill(false)} rel="prev">
              <Icon.ChevronLeft className="h-4 w-4" /> Newer
            </Link>
          ) : null}
          <span className="px-3 text-[14px] text-pebble">
            Page {list.page} of {list.totalPages}
          </span>
          {list.page < list.totalPages ? (
            <Link href={pageHref(list.page + 1)} className={pill(false)} rel="next">
              Older <Icon.ChevronRight className="h-4 w-4" />
            </Link>
          ) : null}
        </nav>
      ) : null}

      <Link
        href="/resources/faq"
        className="mt-14 flex items-center justify-between gap-6 rounded-[20px] bg-sky p-7 transition-colors hover:bg-sky/70"
      >
        <span>
          <span className="t-h3 block text-cocoa">Quick questions?</span>
          <span className="mt-1 block text-[15px] text-cocoa/80">Minimum order, delivery areas, grades, payment — all in the FAQ hub.</span>
        </span>
        <Icon.ArrowRight className="h-6 w-6 shrink-0 text-clay" />
      </Link>
    </>
  );
}
