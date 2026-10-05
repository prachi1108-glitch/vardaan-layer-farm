import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";

/**
 * Inner-page hero (Doc 05 §6 "Hero, 3 variants"): breadcrumbs, Anton H1 with
 * a Condiment accent, intro, actions, and an optional illustration/photo slot.
 */
export function PageHero({
  crumbs,
  title,
  script,
  intro,
  children,
  art,
  tone = "eggshell",
}: {
  crumbs: Crumb[];
  title: string;
  script?: string;
  intro?: ReactNode;
  children?: ReactNode;
  art?: ReactNode;
  tone?: "eggshell" | "oat";
}) {
  return (
    <section className={`relative overflow-hidden ${tone === "oat" ? "bg-oat" : "bg-eggshell"}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-butter/45 blur-3xl" />
      <div className="container-x relative grid items-center gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pb-20 lg:pt-12">
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className="t-h1 m-0 text-cocoa">
            {title}
            {script ? (
              <>
                {" "}
                <span className="script script-accent">{script}</span>
              </>
            ) : null}
          </h1>
          {intro ? <div className="body-l mt-9 max-w-[600px] text-pebble [text-wrap:pretty]">{intro}</div> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        {art ? <div className="relative">{art}</div> : null}
      </div>
    </section>
  );
}
