import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { ProcessFlow, type ProcessStep } from "@/components/ProcessFlow";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Our Eggs & Supply",
  description:
    "How Vardhan Farms supplies table eggs — bulk B2B supply, retail partnerships and future consumer offerings.",
};

const supplyFlow: ProcessStep[] = [
  { n: "01", title: "Egg production", body: "Eggs laid across the farm's laying houses.", icon: <Icon.Egg /> },
  { n: "02", title: "Collection", body: "Gathered from the houses on a regular cycle.", icon: <Icon.Basket /> },
  { n: "03", title: "Sorting & handling", body: "Checked and sorted with care.", icon: <Icon.Check /> },
  { n: "04", title: "Packing", body: "Packed into trays and supply formats.", icon: <Icon.Package /> },
  { n: "05", title: "Dispatch", body: "Sent out to buyers and partners.", icon: <Icon.Truck /> },
];

const businessCustomers = [
  "Wholesalers", "Dealers", "Traders", "Distributors",
  "Restaurants", "QSRs", "Cafés", "Bakeries",
  "Cloud kitchens", "Hotels", "Caterers", "Institutions",
];

const businessDetails = [
  { label: "Egg grades & sizes", value: "Available grades / sizes to be confirmed" },
  { label: "Bulk quantities", value: "Minimum & typical order volumes to be confirmed" },
  { label: "Packaging formats", value: "Trays and bulk packing formats to be confirmed" },
  { label: "Supply frequency", value: "Regular dispatch cycle to be confirmed" },
  { label: "Coverage", value: "Geographic delivery area to be confirmed" },
  { label: "Dispatch", value: "Delivery / pickup options to be confirmed" },
];

const retailPoints = [
  "Retail-ready supply for stores and grocers",
  "Packaging options suited to shelf and counter",
  "Steady replenishment your customers can rely on",
  "Partnership terms discussed case by case",
];

const consumerPlans = [
  { icon: <Icon.Egg />, title: "Everyday egg packs", body: "Standard household packs for regular consumption." },
  { icon: <Icon.Basket />, title: "Family packs", body: "Larger packs for higher-consumption households." },
  { icon: <Icon.Leaf />, title: "Premium & subscription", body: "Differentiated packs and repeat delivery, as the brand grows." },
];

export default function SupplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Eggs & Supply"
        title="One farm, three ways to work with us."
        intro="Whether you buy in bulk, stock a store, or are planning ahead for consumers — here's how Vardhan Farms can supply you."
      >
        <div className="flex flex-wrap gap-2">
          <ButtonLink href="#business" variant="secondary" size="md">
            Business supply
          </ButtonLink>
          <ButtonLink href="#retail" variant="ghost" size="md">
            Retail partnerships
          </ButtonLink>
          <ButtonLink href="#consumer" variant="ghost" size="md">
            Consumer solutions
          </ButtonLink>
        </div>
      </PageHero>

      {/* Supply process */}
      <Section>
        <SectionHeading
          eyebrow="From farm to buyer"
          title="A clear supply process."
          intro="The steps below reflect how eggs move from the houses to dispatch. Confirm exact details with the farm before final copy."
          align="center"
          className="mb-14"
        />
        <ProcessFlow steps={supplyFlow} />
      </Section>

      {/* A. Business Supply */}
      <Section id="business" className="scroll-mt-24 bg-paper/50">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow>Business supply · Primary</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">Bulk & B2B egg supply.</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone">
              Our core business. We supply table eggs in volume to wholesalers,
              food businesses and institutions that need a dependable, regular
              source.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {businessCustomers.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line bg-cream px-3 py-1.5 text-sm text-forest-dark"
                >
                  {c}
                </span>
              ))}
            </div>
            <ButtonLink
              href="/partner-with-us?type=Wholesaler"
              size="lg"
              className="mt-8"
            >
              Discuss bulk requirements
            </ButtonLink>
          </div>

          <div className="rounded-2xl border border-line bg-cream p-2">
            <ImagePlaceholder
              label="Bulk egg trays / loading & dispatch"
              tone="forest"
              className="mb-2 aspect-[16/9] w-full"
              rounded="rounded-xl"
            />
            <dl className="divide-y divide-line">
              {businessDetails.map((d) => (
                <div key={d.label} className="flex flex-col gap-0.5 px-4 py-3">
                  <dt className="text-sm font-semibold text-forest-dark">
                    {d.label}
                  </dt>
                  <dd className="text-sm text-stone">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* B. Retail Partnerships */}
      <Section id="retail" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div className="order-2 rounded-2xl border border-line bg-cream p-8 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                <Icon.Store />
              </span>
              <h3 className="text-xl">What a retail partner gets</h3>
            </div>
            <ul className="mt-6 space-y-3">
              {retailPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-stone">
                  <Icon.Check className="mt-0.5 h-5 w-5 shrink-0 text-moss" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Retail partnerships · Growth</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Stock our eggs in your store.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone">
              For kirana stores, grocery shops, supermarkets and modern trade —
              a reliable egg supply and a partnership built to grow with your
              outlet.
            </p>
            <ButtonLink
              href="/partner-with-us?type=Retailer"
              size="lg"
              variant="secondary"
              className="mt-8"
            >
              Become a retail partner
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* C. Consumer Solutions */}
      <Section id="consumer" className="scroll-mt-24 bg-paper/50">
        <div className="rounded-3xl border border-line bg-cream p-8 sm:p-12">
          <div className="max-w-2xl">
            <Eyebrow>Consumer solutions · Emerging</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Direct-to-consumer, on the horizon.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone">
              We&apos;re planning branded egg packs and consumer offerings for
              families, regular buyers and premium shoppers. To be clear:
              direct-to-consumer ordering isn&apos;t live yet — this is the
              direction we&apos;re building toward.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {consumerPlans.map((c) => (
              <div key={c.title} className="rounded-2xl border border-line bg-paper/60 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-forest/8 text-forest">
                    {c.icon}
                  </span>
                  <span className="rounded-full bg-wheat/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-clay">
                    Planned
                  </span>
                </div>
                <h3 className="mt-4 text-lg">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-stone">
            Interested for later?{" "}
            <a
              href="/partner-with-us?type=Consumer"
              className="font-semibold text-forest underline-offset-2 hover:underline"
            >
              Leave your details
            </a>{" "}
            and we&apos;ll reach out when consumer ordering opens.
          </p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
