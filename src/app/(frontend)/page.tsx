import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { ProcessFlow, type ProcessStep } from "@/components/ProcessFlow";
import { Icon } from "@/components/icons";
import { FinalCta } from "@/components/FinalCta";
import { HeroScene } from "@/components/HeroScene";
import { CountUp } from "@/components/motion/CountUp";
import { site } from "@/lib/site";

const journey: ProcessStep[] = [
  { n: "01", title: "Chick rearing", body: "Day-old chicks are received and raised in a monitored brooding environment.", icon: <Icon.Chick /> },
  { n: "02", title: "Growth & care", body: "Birds grow through the rearing stage with managed feed, water and daily checks.", icon: <Icon.Growth /> },
  { n: "03", title: "Layer stage", body: "Mature hens move into the laying houses and begin regular egg production.", icon: <Icon.Hen /> },
  { n: "04", title: "Egg production", body: "Eggs are laid and gathered from the laying houses throughout the day.", icon: <Icon.Egg /> },
  { n: "05", title: "Collection & packing", body: "Eggs are collected, sorted and packed into trays and supply formats.", icon: <Icon.Package /> },
  { n: "06", title: "Supply & dispatch", body: "Packed eggs are dispatched to wholesalers, food businesses and retail partners.", icon: <Icon.Truck /> },
];

const audiences = [
  {
    icon: <Icon.Business />,
    title: "For Businesses",
    body: "Wholesalers, dealers, distributors, restaurants, bakeries, cloud kitchens, hotels and institutions.",
    href: "/products",
    cta: "Bulk & B2B supply",
  },
  {
    icon: <Icon.Store />,
    title: "For Retail",
    body: "Kirana stores, grocery stores, supermarkets and modern-trade retail networks.",
    href: "/products",
    cta: "Retail partnerships",
  },
  {
    icon: <Icon.People />,
    title: "For Consumers",
    body: "Families and regular consumers — with branded consumer packs planned as we expand.",
    href: "/products",
    cta: "What's coming",
  },
];

const strengths = [
  { icon: <Icon.Scale />, title: "Supply at scale", body: "A working layer operation built to fulfil steady, high-volume egg orders." },
  { icon: <Icon.Clock />, title: "Consistent output", body: "Daily production and regular dispatch that buyers can plan their business around." },
  { icon: <Icon.Handshake />, title: "Established relationships", body: "Years of supplying wholesalers and bulk buyers through dependable, repeat trade." },
  { icon: <Icon.ShieldCheck />, title: "Careful operations", body: "Managed feed, water, hygiene and egg handling across the farm's daily routine." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-deep via-cream to-cream"
        />
        <div className="container-x grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24">
          <div className="reveal max-w-xl">
            <Eyebrow>Layer poultry farm · Table eggs</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Reliable egg supply, from healthy flocks to every table.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              {site.name} is an experienced layer-poultry operation producing
              fresh table eggs at scale — supplying wholesalers, food businesses
              and retail partners with a steady, dependable flow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/wholesale-enquiry" size="lg">
                Get a Quote
              </ButtonLink>
              <ButtonLink href="/products" size="lg" variant="secondary">
                Explore our eggs
              </ButtonLink>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              {site.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl text-forest-dark">
                    {s.value}
                  </dt>
                  <dd className="text-xs uppercase tracking-wide text-stone">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal relative">
            <HeroScene className="w-full drop-shadow-xl" />
            <div className="absolute -bottom-5 -left-5 hidden max-w-[13rem] rounded-2xl border border-line bg-paper p-4 shadow-lg sm:block">
              <div className="flex items-center gap-2 text-forest">
                <Icon.Egg className="h-5 w-5" />
                <span className="text-sm font-semibold text-forest-dark">
                  Fresh daily
                </span>
              </div>
              <p className="mt-1 text-xs text-stone">
                Collected, sorted and dispatched on a regular cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Quick intro ---------------- */}
      <Section className="bg-paper/50">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Who we are"
            title="Years of hands-on farming, now building for the future."
            intro={
              <>
                For many years {site.name} has produced table eggs and supplied
                them to wholesalers and bulk buyers through trusted, offline
                relationships. Today we&apos;re bringing that same operation
                online — making it easier for businesses, retailers and partners
                to work with us.
              </>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: <Icon.Leaf />, t: "Experienced operation", d: "A layer farm run by people who know poultry and egg production first-hand." },
              { icon: <Icon.Scale />, t: "Built for volume", d: "Capacity geared toward steady wholesale and bulk supply." },
              { icon: <Icon.Handshake />, t: "Long-term mindset", d: "We aim for lasting supply partnerships, not one-off orders." },
              { icon: <Icon.Truck />, t: "Multi-channel supply", d: "Serving B2B today, with retail and consumer channels growing." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-line bg-cream p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-forest/8 text-forest">
                  {c.icon}
                </span>
                <h3 className="mt-4 text-lg">{c.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- Farm snapshot / stats ---------------- */}
      <Section>
        <div className="reveal rounded-3xl bg-forest-deep px-6 py-12 text-cream sm:px-12">
          <div className="max-w-2xl">
            <Eyebrow>Farm snapshot</Eyebrow>
            <h2 className="mt-4 text-3xl text-cream sm:text-4xl">
              The operation, in numbers.
            </h2>
            <p className="mt-3 text-cream/70">
              A quick sense of scale and consistency. These figures are being
              finalised with verified farm data before launch.
            </p>
          </div>
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label} className="border-t border-cream/15 pt-5">
                <dt className="font-display text-4xl text-cream">
                  <CountUp value={s.value} />
                </dt>
                <dd className="mt-1 text-sm text-cream/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ---------------- From Chick to Egg ---------------- */}
      <Section className="bg-paper/50">
        <SectionHeading
          eyebrow="From chick to egg"
          title="How an egg reaches your business."
          intro="Every tray we dispatch is the end of a managed journey — from day-old chicks to collection, packing and supply."
          align="center"
          className="mb-14"
        />
        <ProcessFlow steps={journey} />
      </Section>

      {/* ---------------- Who We Serve ---------------- */}
      <Section>
        <SectionHeading
          eyebrow="Who we serve"
          title="Find where you fit."
          intro="Whatever your business, there's a clear way to work with us."
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="group flex flex-col rounded-2xl border border-line bg-cream p-7 transition-colors hover:border-forest/30"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-forest/8 text-forest">
                {a.icon}
              </span>
              <h3 className="mt-5 text-xl">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone">
                {a.body}
              </p>
              <a
                href={a.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors group-hover:text-terracotta"
              >
                {a.cta}
                <Icon.Arrow className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- Why Work With Us ---------------- */}
      <Section className="bg-paper/50">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Why work with us"
              title="Real strengths, not marketing claims."
              intro="We keep it straight: what makes us a dependable supplier comes down to experience, consistency and the way the farm is run."
            />
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              See inside the farm
            </ButtonLink>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {strengths.map((s) => (
              <div key={s.title} className="rounded-2xl border border-line bg-cream p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                  {s.icon}
                </span>
                <h3 className="mt-4 text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- Final CTA ---------------- */}
      <FinalCta />
    </>
  );
}
