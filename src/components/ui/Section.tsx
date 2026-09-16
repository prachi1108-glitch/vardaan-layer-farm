import type { ReactNode } from "react";

/** Uppercase, letter-spaced category label that sits above section headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-label-caps text-label-caps text-secondary">{children}</span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "max-w-2xl"
      } ${className}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
        {title}
      </h2>
      {intro ? (
        <p className="font-body-lg text-body-lg text-on-surface-variant">{intro}</p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-space-2xl md:py-space-3xl ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
