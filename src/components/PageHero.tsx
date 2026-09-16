import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b egg-border bg-surface-cream">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-container/25 via-secondary/10 to-transparent blur-3xl pointer-events-none animate-sunrise-glow"
      />
      <div className="container-x py-space-2xl md:py-space-3xl relative z-10">
        <div className="reveal max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface font-bold tracking-tight">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
