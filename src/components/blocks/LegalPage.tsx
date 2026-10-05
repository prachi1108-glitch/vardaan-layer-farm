import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

/** Plain legal layout — no characters, no tints (Doc 03 §4.3). */
export function LegalPage({
  title,
  href,
  updated,
  children,
}: {
  title: string;
  href: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-eggshell">
      <div className="container-x py-12 lg:py-16">
        <Breadcrumbs items={[{ label: title, href }]} />
        <h1 className="t-h1 m-0 text-cocoa">{title}</h1>
        <p className="mt-3 text-[14px] text-pebble">Last updated {updated}</p>
        <div className="prose-vardaan mt-10">{children}</div>
      </div>
    </section>
  );
}
