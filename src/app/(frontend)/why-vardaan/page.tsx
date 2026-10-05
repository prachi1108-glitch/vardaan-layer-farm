import type { Metadata } from "next";
import { ComparisonTable } from "@/components/blocks/Comparison";
import { FaqSection } from "@/components/blocks/Faq";
import { PageHero } from "@/components/blocks/PageHero";
import { SegmentCards } from "@/components/blocks/Segments";
import { EggieWithSign, EggShape } from "@/components/characters";
import { CtaBand } from "@/components/site/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Heading, Section } from "@/components/ui/Section";
import { reasons } from "@/lib/content";
import { getFaqs } from "@/lib/cms";
import { quoteHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Farm-Direct Egg Supply for Hotels & Restaurants · Vardaan",
  description:
    "One flock, graded on site, dispatched on a schedule. See how Vardaan's farm-direct egg supply compares with traded supply for hotels, restaurants and distributors.",
  alternates: { canonical: "/why-vardaan" },
};

const promises = [
  { sign: "On time", body: "Deliveries on the roster we agree — and a call before, never after, if anything changes." },
  { sign: "Same quality", body: "One flock and on-site grading, so this week's tray matches last week's." },
  { sign: "Clear price", body: "Quoted against your volume, with freight stated upfront." },
];

function EggLineUp() {
  const xs = [50, 130, 210, 290, 370];
  return (
    <svg viewBox="0 0 420 170" className="mx-auto w-full max-w-[460px]" style={{ filter: "drop-shadow(0 12px 24px rgba(74,58,50,0.10))" }} aria-hidden="true">
      <ellipse cx="210" cy="162" rx="200" ry="6" fill="#4A3A32" opacity="0.06" />
      {xs.map((x, i) => (
        <g key={x} className="egg-hover">
          <EggShape x={x} y={160} s={1.02} face={i % 2 ? "calm" : "happy"} className="rise" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} />
        </g>
      ))}
    </svg>
  );
}

export default async function WhyVardaanPage() {
  const faqs = await getFaqs("why-vardaan");

  return (
    <>
      <PageHero
        crumbs={[{ label: "Why Vardaan", href: "/why-vardaan" }]}
        title="Eggs that behave the same"
        script="every delivery"
        intro="One flock, graded here, dispatched on a schedule."
        art={<EggLineUp />}
      >
        <ButtonLink href={quoteHref} data-quote>
          Get a quote
        </ButtonLink>
      </PageHero>

      <Section tone="oat" id="compare" labelledBy="compare-h">
        <Heading
          id="compare-h"
          title={<>Farm-direct, not <span className="whitespace-nowrap">re-sold</span></>}
          intro="Bulk eggs usually pass through several hands before a kitchen sees them. Here is what changes when they don't."
        />
        <div className="mt-10">
          <ComparisonTable />
        </div>
      </Section>

      <Section tone="eggshell" labelledBy="stay">
        <Heading id="stay" title="Why buyers" script="stay" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <li key={r.title} className="reveal rounded-[20px] bg-white p-7 shadow-soft" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
              <span className="font-display text-[22px] text-clay">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3 mt-3 text-cocoa">{r.title}</h3>
              <p className="mt-2 text-[15px] text-pebble">{r.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="oat" labelledBy="who">
        <Heading id="who" title="Who we supply" intro="What farm-direct supply changes for each kind of buyer." />
        <div className="mt-10">
          <SegmentCards detail />
        </div>
      </Section>

      <Section tone="eggshell" labelledBy="promise">
        <Heading id="promise" title="Our" script="promise" align="center" />
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {promises.map((p) => (
            <li key={p.sign} className="text-center">
              <EggieWithSign label={p.sign} className="mx-auto w-[150px]" />
              <p className="mx-auto mt-5 max-w-[300px] text-[15px] text-pebble">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Testimonials — shown once real, approved quotes exist (Testimonials collection). */}

      <FaqSection items={faqs} tone="oat" />
      <CtaBand />
    </>
  );
}
