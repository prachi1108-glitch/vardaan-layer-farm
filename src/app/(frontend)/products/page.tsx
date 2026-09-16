import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { FinalCta } from "@/components/FinalCta";
import { getPayloadClient } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Our Eggs",
  description:
    "Fresh table eggs supplied in bulk — grades, packaging formats, freshness and supply capacity from Vardaan Layer Farm. Pricing by quote.",
};

type Packaging = { format?: string; unit?: string };
type MediaDoc = { url?: string | null; alt?: string | null };
type Product = {
  id: number | string;
  title: string;
  grade?: string | null;
  capacityNote?: string | null;
  packaging?: Packaging[] | null;
  image?: MediaDoc | number | string | null;
};

const supplyPoints = [
  {
    icon: <Icon.Egg />,
    title: "Fresh from our own flock",
    body: "Eggs are collected daily from our own laying houses — not warehoused or re-sold — so what reaches you is genuinely fresh.",
  },
  {
    icon: <Icon.ShieldCheck />,
    title: "Consistent grading",
    body: "Uniform size and quality, batch after batch, so your portioning and costing stay predictable.",
  },
  {
    icon: <Icon.Scale />,
    title: "Built for volume",
    body: "Set up to fulfil large, recurring orders reliably. [Add real daily/weekly capacity figures.]",
  },
  {
    icon: <Icon.Truck />,
    title: "Dependable delivery",
    body: "Supply on a schedule that fits your business. [Add real delivery areas and lead times.]",
  },
];

export default async function ProductsPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { isActive: { equals: true } },
    sort: "order",
    depth: 1,
    limit: 50,
  });
  const products = docs as unknown as Product[];

  return (
    <>
      <PageHero
        eyebrow="Our Eggs"
        title="Fresh table eggs, supplied in the volumes you need."
        intro="We supply eggs in bulk — by grade, in trays and larger consignment units. There's no cart and no shelf price: pricing is by quote, matched to your volume and delivery needs."
      >
        <ButtonLink href="/wholesale-enquiry">Get a Quote</ButtonLink>
      </PageHero>

      {/* Grades */}
      <Section>
        <SectionHeading
          eyebrow="Grades & packaging"
          title="Egg grades we supply"
          intro="Standard grades below. Tell us which you need and the volumes, and we'll quote accordingly."
          className="mb-12"
        />
        {products.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-outline-variant bg-surface-cream p-8 text-center text-on-surface-variant">
            Product grades will appear here once added in the CMS.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const media = typeof p.image === "object" && p.image ? (p.image as MediaDoc) : null;
              return (
                <div
                  key={p.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-offwhite transition-shadow hover:shadow-md"
                >
                  {media?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={media.url}
                      alt={media.alt ?? p.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label={p.title} tone="sand" className="aspect-[4/3] w-full" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {p.grade ? (
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-tertiary">
                        {p.grade}
                      </span>
                    ) : null}
                    <h3 className="mt-1 text-lg">{p.title}</h3>
                    {p.packaging && p.packaging.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.packaging.map((pk, i) => (
                          <li
                            key={i}
                            className="rounded-full bg-secondary/8 px-3 py-1 text-xs font-medium text-on-surface"
                          >
                            {pk.format}
                            {pk.unit ? ` · ${pk.unit}` : ""}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {p.capacityNote ? (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                        {p.capacityNote}
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}
                    <ButtonLink
                      href="/wholesale-enquiry"
                      variant="secondary"
                      size="md"
                      className="mt-5 self-start"
                    >
                      Request pricing
                    </ButtonLink>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* Supply & quality */}
      <Section className="bg-surface-offwhite/50">
        <SectionHeading
          eyebrow="Freshness, quality & supply"
          title="Why businesses rely on our supply"
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {supplyPoints.map((s) => (
            <div key={s.title} className="flex gap-4 rounded-2xl border border-outline-variant bg-surface-cream p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary/8 text-secondary">
                {s.icon}
              </span>
              <div>
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
