import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { FinalCta } from "@/components/FinalCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Farm",
  description:
    "Inside Vardhan Farms — our story, our operation and the people behind our table-egg production.",
};

const timeline = [
  { year: "Established", title: "The farm begins", body: "Vardhan Farms starts as a hands-on layer-poultry operation. [Replace with real founding year & story.]" },
  { year: "Growth", title: "Production expands", body: "Flock size and daily output grow to meet rising demand. [Replace with real milestone.]" },
  { year: "Relationships", title: "Long-term buyers", body: "Steady supply builds lasting relationships with wholesalers and bulk buyers. [Replace with real detail.]" },
  { year: "Today", title: "Operations developed", body: "A settled routine across rearing, laying, collection and dispatch. [Replace with real detail.]" },
  { year: "Next", title: "Digital growth", body: "Bringing the business online and opening new retail and distribution channels." },
];

const practices = [
  { icon: <Icon.Basket />, title: "Feed management", body: "Managed feeding through the birds' growth and laying stages." },
  { icon: <Icon.Drop />, title: "Water management", body: "Clean water supply maintained across the houses." },
  { icon: <Icon.ShieldCheck />, title: "Farm hygiene", body: "Routine cleaning and hygiene practices across the operation." },
  { icon: <Icon.Hen />, title: "Bird monitoring", body: "Daily observation and checks on the flock." },
  { icon: <Icon.Egg />, title: "Egg handling", body: "Careful collection, sorting and handling of eggs." },
  { icon: <Icon.Clock />, title: "Daily routine", body: "A consistent operating rhythm that keeps supply steady." },
];

const layerStages = [
  { n: "01", title: "Chick rearing", body: "Day-old chicks are received and raised under managed brooding conditions." },
  { n: "02", title: "Growth stage", body: "Birds develop through the rearing period with managed feed and water." },
  { n: "03", title: "Layer stage", body: "Mature hens move into laying houses and settle into production." },
  { n: "04", title: "Egg production", body: "Eggs are laid and collected regularly through the day." },
];

const gallery = [
  { label: "The farm — exterior & entrance", tone: "forest" as const, span: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto" },
  { label: "Our birds — laying hens", tone: "moss" as const, span: "aspect-[4/3]" },
  { label: "Daily operations", tone: "sand" as const, span: "aspect-[4/3]" },
  { label: "Egg collection", tone: "terracotta" as const, span: "aspect-[4/3]" },
  { label: "Packing & trays", tone: "sand" as const, span: "aspect-[4/3]" },
];

export default function OurFarmPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Farm"
        title="A real, working farm behind every egg."
        intro="No stock imagery, no invented story. This is the operation, the process and the people that make our table-egg supply dependable."
      >
        <ButtonLink href="/partner-with-us" variant="secondary">
          Enquire about supply
        </ButtonLink>
      </PageHero>

      {/* Our Story */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Built on years of hands-on poultry farming."
              intro={
                <>
                  {site.name} grew from a hands-on layer-poultry operation into a
                  steady supplier of table eggs. For years the business has run
                  on real farming experience and trusted, offline relationships
                  with wholesalers and bulk buyers.
                </>
              }
            />
            <p className="mt-5 max-w-xl leading-relaxed text-stone">
              This page is written to be filled with the farm&apos;s real
              history — how it started, the family and people behind it, and how
              it has grown. Placeholder lines are marked so the true story can
              replace them before launch.
            </p>
          </div>
          <ImagePlaceholder
            label="Founder / family at the farm"
            tone="sand"
            className="aspect-[5/4] w-full"
          />
        </div>
      </Section>

      {/* Our Journey — timeline */}
      <Section className="bg-paper/50">
        <SectionHeading
          eyebrow="Our journey"
          title="Milestones that shaped the farm."
          intro="Only genuine milestones belong here — the markers below are placeholders to be confirmed."
          className="mb-14"
        />
        <ol className="relative space-y-8 border-l border-line pl-8">
          {timeline.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[2.35rem] top-1 grid h-6 w-6 place-items-center rounded-full border border-line bg-cream">
                <span className="h-2 w-2 rounded-full bg-terracotta" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">
                {m.year}
              </span>
              <h3 className="mt-1 text-xl">{m.title}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-stone">
                {m.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Inside Our Farm — gallery */}
      <Section>
        <SectionHeading
          eyebrow="Inside our farm"
          title="The infrastructure and the everyday."
          intro="Replace each placeholder below with real photographs of the farm, birds and daily work."
          className="mb-12"
        />
        <div className="grid auto-rows-[1fr] gap-4 sm:grid-cols-3">
          {gallery.map((g) => (
            <ImagePlaceholder
              key={g.label}
              label={g.label}
              tone={g.tone}
              className={`w-full ${g.span}`}
            />
          ))}
        </div>
      </Section>

      {/* From Chick to Layer */}
      <Section className="bg-forest-deep text-cream">
        <SectionHeading
          eyebrow="From chick to layer"
          title={<span className="text-cream">The bird&apos;s journey.</span>}
          intro={
            <span className="text-cream/70">
              A closer look at how our birds move from chicks to productive laying
              hens — described plainly, without unsupported health or welfare
              claims.
            </span>
          }
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {layerStages.map((s) => (
            <div key={s.n} className="rounded-2xl border border-cream/15 bg-cream/[0.04] p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-wheat">
                {s.n}
              </span>
              <h3 className="mt-2 text-lg text-cream">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/70">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Farm Practices */}
      <Section className="bg-paper/50">
        <SectionHeading
          eyebrow="Farm practices"
          title="How the day-to-day is run."
          intro="Only practices genuinely followed at the farm should appear here. Confirm and adjust before launch."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practices.map((p) => (
            <div key={p.title} className="flex gap-4 rounded-2xl border border-line bg-cream p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest/8 text-forest">
                {p.icon}
              </span>
              <div>
                <h3 className="text-lg">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* People Behind the Farm */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ImagePlaceholder
            label="The team — founder, leadership & workers"
            tone="moss"
            className="order-2 aspect-[5/4] w-full lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="People behind the farm"
              title="Experience you can put a face to."
              intro="The people running the operation are one of its biggest strengths. Feature the founder, farm leadership and key team members here — real names and real experience."
            />
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
