import Link from "next/link";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/site/JsonLd";
import { site } from "@/lib/site";

export type Crumb = { label: string; href: string };

/** Visual breadcrumbs + BreadcrumbList schema (PRD FR-1.5). "Home" is implied. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-pebble">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-cocoa">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-clay">
                      {c.label}
                    </Link>
                    <Icon.ChevronRight className="h-3.5 w-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: new URL(c.href, site.url).toString(),
          })),
        }}
      />
    </>
  );
}
