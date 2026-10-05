import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ComparisonTable, SeeComparisonLink } from "@/components/blocks/Comparison";
import { FaqSection } from "@/components/blocks/Faq";
import { PostCard } from "@/components/blocks/PostCard";
import { SegmentCards } from "@/components/blocks/Segments";
import { Steps } from "@/components/blocks/Steps";
import { ChickCanvas } from "@/components/ChickCanvas";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/CtaBand";
import { Marquee } from "@/components/site/Marquee";
import { ButtonLink } from "@/components/ui/Button";
import { Chip, Heading, Section } from "@/components/ui/Section";
import { getFaqs, getPosts } from "@/lib/cms";
import { claims, quoteHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bulk Egg Supplier in Sonipat, Haryana · Vardaan Layer Farm",
  description:
    "Farm-direct white table eggs in bulk for hotels, restaurants, caterers and distributors. Graded on site, packed in 30-egg trays, delivered on a schedule. Get a quote.",
  alternates: { canonical: "/" },
};

const heroChips = ["Farm-direct", "Graded on site", "30-egg trays", "Scheduled dispatch"];

const hello = [
  { title: "Our own flock", body: "No traded stock, no mixed sources.", icon: Icon.Home },
  { title: "Graded on site", body: "Weighed and sorted before packing.", icon: Icon.Scale },
  { title: "Daily dispatch", body: "Loaded to a schedule you can plan around.", icon: Icon.Truck },
];

const supplyStats = [
  { value: claims.freshness.text, label: "Collected, graded and packed fast — no storage stops." },
  { value: "Single-origin flock", label: "Every egg from our own layer houses in Sonipat." },
  { value: "30 eggs per tray", label: "Moulded pulp trays that stack for transit and storage." },
];

export default async function HomePage() {
  const [faqs, posts] = await Promise.all([getFaqs("home", 4), getPosts({ limit: 3 })]);

  return (
    <>
      {/* 1 · Hero */}
      <section className="relative overflow-hidden bg-eggshell">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10%] top-[-20%] h-[720px] w-[720px] rounded-full bg-butter/55 blur-3xl"
        />
        <div className="container-x relative grid items-center gap-8 pb-14 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:pb-20 lg:pt-14">
          <div className="order-2 lg:order-1">
            <p className="eyebrow rise mb-5 text-pebble">Bulk egg supply</p>
            <h1 className="display-xl rise m-0 text-cocoa" style={{ "--delay": "80ms" } as React.CSSProperties}>
              Reliable bulk egg supply{" "}
              <span className="script script-accent text-[clamp(34px,3.6vw,52px)]">for your business</span>
            </h1>
            <p className="body-l rise mt-9 max-w-[540px] text-pebble" style={{ "--delay": "180ms" } as React.CSSProperties}>
              {site.heroSub}
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--delay": "260ms" } as React.CSSProperties}>
              <ButtonLink href={quoteHref} data-quote>
                Get a quote
              </ButtonLink>
              <ButtonLink href="/our-eggs" variant="secondary">
                See what we supply
              </ButtonLink>
            </div>
            <ul className="rise mt-8 flex flex-wrap gap-2" style={{ "--delay": "340ms" } as React.CSSProperties}>
              {heroChips.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 w-full lg:order-2">
            {/* Cursor-tracking chick (follows the pointer on desktop; gentle glances on touch). */}
            <div className="rounded-[28px] bg-white p-2.5 shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] lg:aspect-[5/4]">
                <ChickCanvas />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Marquee */}
      <Marquee />

      {/* 3 · Hello, we're Vardaan */}
      <Section tone="eggshell" labelledBy="hello">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <Heading
              id="hello"
              eyebrow="The farm"
              title="Hello! We're Vardaan"
              script="layer farm"
              intro="We're a layer farm in Sonipat, Haryana. Our hens, our sheds, our grading floor — no traders in between and no storage stops on the way to you. Eggs are collected, weighed, graded and packed here, then dispatched on a schedule."
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {hello.map(({ title, body, icon: I }) => (
                <li key={title}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-butter text-cocoa">
                    <I className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-[17px] font-semibold text-cocoa">{title}</h3>
                  <p className="mt-1 text-[15px] text-pebble">{body}</p>
                </li>
              ))}
            </ul>
          </div>
          <figure className="reveal">
            <div className="rounded-[28px] bg-white p-2.5 shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                {/* Stand-in until the farm photo shoot — replace with a real Vardaan layer-house photo. */}
                <Image
                  src="/design/layer-house-interior.jpg"
                  alt="A clean, brightly lit layer house with rows of white hens"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </figure>
        </div>
      </Section>

      {/* 4 · What we supply */}
      <Section tone="oat" labelledBy="supply">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="supply" title="What we" script="supply" intro="White table eggs in Medium, Large and Extra Large — by quote, in the volume you need." />
          <Link href="/our-eggs" className="inline-flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.06em] text-clay hover:text-clay-soft">
            Grades &amp; packaging <Icon.ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {supplyStats.map((s, i) => (
            <li key={s.value} className="reveal rounded-[20px] bg-sky p-8" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
              <p className="font-display text-[clamp(28px,2.6vw,36px)] uppercase leading-[1.05] text-cocoa">{s.value}</p>
              <p className="mt-3 text-[15px] text-cocoa/80">{s.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5 · Who we supply */}
      <Section tone="eggshell" labelledBy="who">
        <Heading id="who" title="Who we supply" intro="Pick your business to start a quote with it already filled in." />
        <div className="mt-12">
          <SegmentCards />
        </div>
      </Section>

      {/* 6 · Farm-direct, not re-sold (teaser) */}
      <Section tone="oat" labelledBy="compare">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <Heading
              id="compare"
              title={<>Farm-direct, not <span className="whitespace-nowrap">re-sold</span></>}
              intro="Most bulk eggs change hands several times before they reach a kitchen. Ours don't change hands at all."
            />
            <SeeComparisonLink />
          </div>
          <div className="reveal">
            <ComparisonTable rows={3} />
          </div>
        </div>
      </Section>

      {/* 7 · How it works */}
      <Section tone="eggshell" labelledBy="how">
        <Heading id="how" title="How it works" align="center" className="mb-14" />
        <Steps />
        <div className="mt-12 flex justify-center">
          <ButtonLink href={quoteHref} data-quote>
            Start step one
          </ButtonLink>
        </div>
      </Section>

      {/* 8 · Proof — hidden until real testimonials and certificates exist (Doc 05 §4.1 #8). */}

      {/* 9 · From the farm journal */}
      {posts.docs.length ? (
        <Section tone="oat" labelledBy="journal">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading id="journal" title="From the farm" script="journal" />
            <Link href="/resources" className="inline-flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.06em] text-clay hover:text-clay-soft">
              All resources <Icon.ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.docs.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {/* 10 · FAQ */}
      <FaqSection items={faqs} />

      {/* 11 · CTA band */}
      <CtaBand />
    </>
  );
}
