import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/blocks/Faq";
import { GradesTable } from "@/components/blocks/GradesTable";
import { PageHero } from "@/components/blocks/PageHero";
import { QuickAnswer } from "@/components/blocks/QuickAnswer";
import { EggCrew, TrayIcon } from "@/components/characters";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Chip, Heading, Section } from "@/components/ui/Section";
import { kitchenQualities } from "@/lib/content";
import { getContact, getFaqs, getGrades } from "@/lib/cms";
import { productSchema } from "@/lib/schema";
import { quoteHref, whatsappMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "White Table Eggs in Bulk – Grades & Trays · Vardaan",
  description:
    "White table eggs in bulk from our own flock — Medium, Large and Extra Large, graded on site and packed in 30-egg trays. Scheduled or one-off supply. Pricing by quote.",
  alternates: { canonical: "/our-eggs" },
};

const formats = [
  {
    title: "Scheduled contracts",
    body: "A standing delivery roster that keeps your cold room stocked without reordering every few days.",
    chips: ["Daily", "Weekly", "Custom roster"],
    icon: Icon.Repeat,
  },
  {
    title: "Custom consignments",
    body: "Bulk orders for distributors and institutions, planned around your loading slot.",
    chips: ["Full truckload", "Inter-district"],
    icon: Icon.Truck,
  },
  {
    title: "One-time event orders",
    body: "Weddings, festivals and events — book the volume against your date.",
    chips: ["Book ahead", "Date-confirmed"],
    icon: Icon.Calendar,
  },
];

const timeline = [
  { title: "Lay", body: "Collected from our own sheds every day.", icon: Icon.Sun },
  { title: "Grade", body: "Weighed and sorted into M / L / XL.", icon: Icon.Scale },
  { title: "Pack", body: "Into 30-egg moulded pulp trays.", icon: Icon.Package },
  { title: "Dispatch", body: "Out on the delivery roster.", icon: Icon.Truck },
];

const pricing = [
  { title: "Volume", body: "Contracted volume sets the tier — larger standing orders get a better rate." },
  { title: "Grade", body: "Medium, Large, Extra Large or a mix." },
  { title: "Frequency", body: "Daily, weekly, custom roster or a one-time order." },
  { title: "Delivery area", body: "Distance and drop size; freight is stated upfront." },
];

export default async function OurEggsPage() {
  const [grades, faqs, contact] = await Promise.all([getGrades(), getFaqs("our-eggs"), getContact()]);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Our Eggs", href: "/our-eggs" }]}
        title="Fresh table eggs,"
        script="graded not guessed"
        intro="White table eggs in bulk — by grade, in 30-egg trays and larger consignment units. Pricing by quote."
        art={<EggCrew className="mx-auto w-full max-w-[440px]" />}
      >
        <QuickAnswer className="max-w-[600px]">
          Vardaan supplies white table eggs from its own flock in Sonipat, Haryana, graded on site into Medium, Large
          and Extra Large and packed in 30-egg moulded trays. Supply is scheduled (daily or weekly) or as one-off
          consignments, with pricing quoted against your volume, grade and delivery area.
        </QuickAnswer>
        <div className="mt-6">
          <ButtonLink href={quoteHref} data-quote>
            Get a quote
          </ButtonLink>
        </div>
      </PageHero>

      {/* Grades & sizing — strictly professional, no characters inside the table */}
      <Section tone="oat" id="grades" labelledBy="grades-h">
        <Heading
          id="grades-h"
          title="Grades & sizing"
          intro="Every egg is weighed on site and sorted by grade before packing, so a tray of Large is Large all the way down."
        />
        <div className="mt-10">
          <GradesTable grades={grades} />
        </div>
        <p className="mt-4 text-[14px] text-pebble">Need a mixed-grade order? Say so in your enquiry.</p>
      </Section>

      {/* Packaging */}
      <Section tone="eggshell" labelledBy="packaging">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Heading id="packaging" title="Packaging" intro="Packed for the journey from our floor to your cold room." />
            <ul className="mt-8 space-y-4">
              {[
                "30 eggs per moulded pulp tray",
                "Trays interlock and stack for transit and storage",
                "Larger consignment units for bulk and truckload orders",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-[16px] text-cocoa">
                  <Icon.Check className="mt-0.5 h-5 w-5 shrink-0 text-clay" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-[0.8fr_1fr] items-center gap-5">
            <TrayIcon className="w-full" />
            <div className="rounded-[28px] bg-white p-2.5 shadow-lift">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                {/* Stand-in until the farm photo shoot. */}
                <Image
                  src="/design/hero-egg-trays.jpg"
                  alt="Stacked 30-egg pulp trays of white eggs"
                  fill
                  sizes="(max-width:1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Supply formats */}
      <Section tone="oat" labelledBy="formats">
        <Heading id="formats" title="Supply formats" />
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {formats.map(({ title, body, chips, icon: I }) => (
            <li key={title} className="reveal rounded-[20px] bg-white p-8 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-oat text-clay">
                <I className="h-6 w-6" />
              </span>
              <h3 className="t-h3 mt-5 text-cocoa">{title}</h3>
              <p className="mt-2 text-[15px] text-pebble">{body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <Chip key={c} tone="sky">
                    {c}
                  </Chip>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* In the kitchen */}
      <Section tone="eggshell" labelledBy="kitchen">
        <Heading id="kitchen" title="In the" script="kitchen" intro="What consistent eggs from one flock mean on the line." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kitchenQualities.map((q, i) => (
            <li key={q.title} className="reveal rounded-[20px] bg-peach/60 p-7" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
              <h3 className="t-h3 text-cocoa">{q.title}</h3>
              <p className="mt-2 text-[15px] text-cocoa/80">{q.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Freshness timeline */}
      <Section tone="oat" labelledBy="fresh">
        <Heading id="fresh" title="Freshness, step by step" />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map(({ title, body, icon: I }, i) => (
            <li key={title} className="relative rounded-[20px] bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sky text-cocoa">
                  <I className="h-5 w-5" />
                </span>
                <span className="font-display text-[22px] uppercase text-cocoa">
                  {String(i + 1).padStart(2, "0")} {title}
                </span>
              </div>
              <p className="mt-3 text-[15px] text-pebble">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[15px] text-pebble">
          Storing eggs in a commercial kitchen?{" "}
          <Link href="/resources" className="font-semibold text-clay underline underline-offset-2">
            Read our storage guides
          </Link>
          .
        </p>
      </Section>

      {/* Pricing, explained — professional zone */}
      <Section tone="eggshell" labelledBy="pricing">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <Heading
            id="pricing"
            title="Pricing, explained"
            intro="No shelf price, no cart. Your rate depends on four things — tell us them and we quote against them."
          />
          <dl className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2">
            {pricing.map((p) => (
              <div key={p.title} className="bg-white p-6">
                <dt className="font-semibold text-cocoa">{p.title}</dt>
                <dd className="mt-1 text-[15px] text-pebble">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <FaqSection items={faqs} tone="oat" />

      {/* Inline compact quote form */}
      <Section tone="oat" labelledBy="quick-quote" className="!pt-0">
        <div className="rounded-[20px] bg-white p-6 shadow-soft sm:p-10">
          <h2 id="quick-quote" className="t-h2 m-0 text-cocoa">
            Quick quote
          </h2>
          <p className="mb-8 mt-3 text-[15px] text-pebble">Four fields. We&apos;ll call to fill in the rest.</p>
          <EnquiryForm variant="compact" whatsappE164={contact.whatsappE164} />
        </div>
      </Section>

      <CtaBand whatsappMessage={whatsappMessages.eggs} />
      <JsonLd data={productSchema(grades)} />
    </>
  );
}
