import type { Metadata } from "next";
import Image from "next/image";
import { FaqSection } from "@/components/blocks/Faq";
import { PageHero } from "@/components/blocks/PageHero";
import { Eggie, Pip } from "@/components/characters";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/CtaBand";
import { Heading, Section } from "@/components/ui/Section";
import { farmPractices } from "@/lib/content";
import { getFaqs } from "@/lib/cms";
import { site, whatsappMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Layer Farm in Sonipat · Vardaan Layer Farm",
  description:
    "Vardaan is a working layer farm in Sonipat, Haryana — our own flock, collected daily, graded on site and dispatched from here. Eggs only, no live bird sales.",
  alternates: { canonical: "/the-farm" },
};

/**
 * "Farm at a glance" figures are NOT confirmed (Doc 01 §10). Each stays a
 * labelled placeholder until the farm signs off the facts sheet — never
 * invent numbers here.
 */
const glance = [
  { value: "Sonipat", label: "Haryana, India" },
  { value: "—", label: "Layer houses (to be confirmed)" },
  { value: "—", label: "Daily capacity (to be confirmed)" },
  { value: "—", label: "Years operating (to be confirmed)" },
];

/** Confirmed practices only — add cleaning routines, flock health and licence details once the farm signs them off. */
const hygiene = [
  "Eggs collected every day from our own sheds",
  "Every egg weighed and graded before packing",
  "Packed into moulded pulp trays on site",
  "Dispatched from the farm — no third-party storage stops",
];

const gallery = [
  { src: "/design/hero-egg-trays.jpg", alt: "Stacked trays of white eggs ready for dispatch" },
  { src: "/design/layer-house-interior.jpg", alt: "Inside a clean, bright layer house" },
];

export default async function TheFarmPage() {
  const faqs = await getFaqs("the-farm");

  return (
    <>
      <PageHero
        crumbs={[{ label: "The Farm", href: "/the-farm" }]}
        title="A layer farm,"
        script="not a trading desk"
        intro={site.description}
      />

      {/* Wide farm photo with Pip in the corner */}
      <section className="bg-eggshell pb-16">
        <div className="container-x">
          <div className="relative rounded-[28px] bg-white p-2.5 shadow-lift">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] lg:aspect-[21/9]">
              {/* Stand-in until the farm photo shoot — replace with a real Vardaan layer-house photo. */}
              <Image
                src="/design/layer-house-interior.jpg"
                alt="A clean, brightly lit layer house with rows of white hens"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <Pip className="absolute -bottom-6 right-6 w-[96px] lg:w-[128px]" />
          </div>
        </div>
      </section>

      {/* Our story — content from the farm (Doc 01 §10) */}
      <Section tone="oat" labelledBy="story">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="grid aspect-[4/5] place-items-center rounded-[28px] border-2 border-dashed border-line bg-eggshell p-8 text-center">
            <div>
              <Eggie className="mx-auto w-20" />
              <p className="mt-4 text-[14px] text-pebble">Founder / family photo — from the farm photo shoot</p>
            </div>
          </div>
          <div>
            <Heading id="story" title="Our" script="story" />
            <div className="body-l mt-6 space-y-4 text-pebble">
              <p>
                <em>Vardaan</em> means a blessing — a boon. We chose the name because a good egg supply should feel like
                one for a kitchen: there when you need it, the same every time.
              </p>
              <p>
                We run our own layer houses in Sonipat, Haryana and supply businesses directly — your eggs are laid,
                graded, packed and loaded at the same farm.
              </p>
              <p className="rounded-[12px] bg-butter/50 px-4 py-3 text-[15px] text-cocoa">
                Founding year and the family story will be added once confirmed by the farm.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* How the farm actually runs */}
      <Section tone="eggshell" labelledBy="runs">
        <Heading id="runs" title="How the farm" script="actually runs" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {farmPractices.map((p, i) => {
            const I = Icon[p.icon];
            return (
              <li key={p.title} className="reveal rounded-[20px] bg-white p-7 shadow-soft" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-oat text-clay">
                  <I className="h-6 w-6" />
                </span>
                <h3 className="t-h3 mt-5 text-cocoa">{p.title}</h3>
                <p className="mt-2 text-[15px] text-pebble">{p.body}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Farm at a glance */}
      <section aria-labelledby="glance" className="bg-butter py-16 lg:py-20">
        <div className="container-x">
          <h2 id="glance" className="t-h2 m-0 text-cocoa">
            Farm at a glance
          </h2>
          <dl className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {glance.map((g) => (
              <div key={g.label}>
                <dt className="sr-only">{g.label}</dt>
                <dd className="m-0 font-display text-[clamp(40px,4.4vw,64px)] uppercase leading-none text-cocoa">{g.value}</dd>
                <dd className="m-0 mt-2 text-[15px] text-cocoa/80">{g.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Quality & hygiene — confirmed practices only */}
      <Section tone="eggshell" labelledBy="quality">
        <div className="grid gap-10 rounded-[28px] bg-sky p-8 sm:p-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Heading id="quality" title="Quality & hygiene" intro="Only what we actually do — nothing we can't show you." />
          <ul className="space-y-4">
            {hygiene.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[16px] text-cocoa">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-clay">
                  <Icon.Check className="h-4 w-4" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Gallery — real photos from the shoot go here (CMS-managed later) */}
      <Section tone="oat" labelledBy="gallery">
        <Heading id="gallery" title="Around the farm" />
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {gallery.map((g) => (
            <li key={g.src} className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
              <Image src={g.src} alt={g.alt} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover" />
            </li>
          ))}
          {["Grading & weighing", "Hands lifting a tray", "Loading at dawn", "Stacked pallets"].map((label) => (
            <li
              key={label}
              className="grid aspect-[4/3] place-items-center rounded-[24px] border-2 border-dashed border-line bg-eggshell p-4 text-center text-[14px] text-pebble"
            >
              {label}
              <span className="sr-only"> — photo coming soon</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Visit / location */}
      <Section tone="eggshell" labelledBy="visit">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading
              id="visit"
              title="Sonipat,"
              script="Haryana"
              intro="Our farm is in Sonipat district, on the doorstep of Delhi NCR. Serious buyers are welcome to ask about a visit."
            />
            <a
              href={site.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.06em] text-clay hover:text-clay-soft"
            >
              Open in Google Maps <Icon.ArrowRight className="h-4 w-4" />
            </a>
          </div>
          {/* Soft illustrated map — a static drawing, no heavy embed (FR-5). */}
          <a
            href={site.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vardaan Layer Farm, Sonipat — open in Google Maps"
            className="block rounded-[28px] bg-sky p-6 shadow-soft"
          >
            <svg viewBox="0 0 400 260" className="w-full" aria-hidden="true">
              <path d="M30 210C80 160 120 190 170 140s90-60 200-40" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" />
              <path d="M60 40c40 40 70 100 160 120s100 60 150 80" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity="0.8" />
              <circle cx="300" cy="190" r="10" fill="#FBE7A1" />
              <text x="318" y="196" fontSize="14" fill="#4A3A32" style={{ fontFamily: "var(--font-inter)" }}>
                Delhi
              </text>
              <circle cx="170" cy="140" r="34" fill="#F6D9C9" opacity="0.7" />
              <path d="M170 104c-14 0-24 10-24 24 0 18 24 40 24 40s24-22 24-40c0-14-10-24-24-24Z" fill="#A9573E" />
              <circle cx="170" cy="128" r="8" fill="#fff" />
              <text x="120" y="200" fontSize="16" fontWeight="600" fill="#4A3A32" style={{ fontFamily: "var(--font-inter)" }}>
                Sonipat
              </text>
            </svg>
          </a>
        </div>
        <p className="mt-12 inline-flex items-center gap-2 rounded-full bg-butter px-5 py-2.5 text-[14px] font-semibold text-cocoa">
          <Icon.Egg className="h-4 w-4" /> We supply eggs only — Vardaan does not sell live birds.
        </p>
      </Section>

      <FaqSection items={faqs} tone="oat" />
      <CtaBand whatsappMessage={whatsappMessages.farm} />
    </>
  );
}
