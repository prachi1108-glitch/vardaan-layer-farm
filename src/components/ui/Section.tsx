import type { ReactNode } from "react";

/**
 * Section shell + heading (Doc 03 §3, §6). Tones are the light bases and the
 * three tints — there is deliberately no dark tone.
 */

export type Tone = "eggshell" | "oat" | "butter" | "peach" | "sky" | "white";

const tones: Record<Tone, string> = {
  eggshell: "bg-eggshell",
  oat: "bg-oat",
  butter: "bg-butter",
  peach: "bg-peach",
  sky: "bg-sky",
  white: "bg-white",
};

export function Section({
  tone = "eggshell",
  id,
  className = "",
  children,
  labelledBy,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} section-y ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/**
 * Anton headline with an optional Condiment accent overlapping its end
 * ("WHAT WE" + script "supply"). One script phrase per section, max.
 */
export function Heading({
  as: Tag = "h2",
  id,
  eyebrow,
  title,
  script,
  intro,
  size = "h2",
  align = "left",
  className = "",
}: {
  as?: "h1" | "h2";
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  script?: string;
  intro?: ReactNode;
  size?: "display" | "h1" | "h2";
  align?: "left" | "center";
  className?: string;
}) {
  const sizeCls = size === "display" ? "display-xl" : size === "h1" ? "t-h1" : "t-h2";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-[760px] ${className}`}>
      {eyebrow ? <p className="eyebrow mb-4 text-pebble">{eyebrow}</p> : null}
      <Tag id={id} className={`${sizeCls} m-0 text-cocoa`}>
        {title}
        {script ? (
          <>
            {" "}
            <span className="script script-accent">{script}</span>
          </>
        ) : null}
      </Tag>
      {intro ? <div className="body-l mt-5 max-w-[620px] text-pebble [text-wrap:pretty]">{intro}</div> : null}
    </div>
  );
}

export function Chip({ children, tone = "butter" }: { children: ReactNode; tone?: "butter" | "sky" | "white" }) {
  const t = tone === "butter" ? "bg-butter" : tone === "sky" ? "bg-sky" : "bg-white border border-line";
  return <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium text-cocoa ${t}`}>{children}</span>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[20px] bg-white p-8 shadow-soft ${className}`}>{children}</div>;
}
