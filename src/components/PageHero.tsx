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
    <section className="relative overflow-hidden border-b border-line bg-cream-deep">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(95,127,82,0.18), transparent 45%)",
        }}
      />
      <div className="container-x py-14 sm:py-20">
        <div className="reveal max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
