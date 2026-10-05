import type { Metadata } from "next";
import { FaqList, faqSchema } from "@/components/blocks/Faq";
import { PageHero } from "@/components/blocks/PageHero";
import { QuickAnswer } from "@/components/blocks/QuickAnswer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { Section } from "@/components/ui/Section";
import { FAQ_TOPICS } from "@/collections/Faqs";
import { getFaqs } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Bulk Egg Supply FAQs · Vardaan Layer Farm",
  description:
    "Answers on ordering, grades, delivery, payment and documents for businesses buying white eggs in bulk from Vardaan Layer Farm, Sonipat.",
  alternates: { canonical: "/resources/faq" },
};

export default async function FaqHubPage() {
  const faqs = await getFaqs(undefined, 200);
  const groups = FAQ_TOPICS.map((t) => ({ ...t, items: faqs.filter((f) => f.topic === t.value) })).filter(
    (g) => g.items.length,
  );

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: "FAQ", href: "/resources/faq" },
        ]}
        title="Questions,"
        script="answered"
        intro="Everything buyers ask us before their first order — grouped by topic."
      >
        <QuickAnswer className="max-w-[600px]">
          Vardaan Layer Farm in Sonipat, Haryana supplies white table eggs in bulk to businesses, graded into Medium,
          Large and Extra Large and packed in 30-egg trays. Pricing is by quote — send your volume, grade and delivery
          area through the contact form or WhatsApp.
        </QuickAnswer>
      </PageHero>

      <Section tone="oat" className="!pt-12">
        {groups.length ? (
          <>
            <nav aria-label="FAQ topics" className="mb-10 flex flex-wrap gap-2">
              {groups.map((g) => (
                <a
                  key={g.value}
                  href={`#${g.value}`}
                  className="inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-[14px] font-medium text-cocoa hover:border-cocoa/40"
                >
                  {g.label}
                </a>
              ))}
            </nav>
            <div className="space-y-14">
              {groups.map((g) => (
                <section key={g.value} id={g.value} aria-labelledby={`${g.value}-h`} className="scroll-mt-28">
                  <h2 id={`${g.value}-h`} className="t-h2 mb-6 text-cocoa">
                    {g.label}
                  </h2>
                  <FaqList items={g.items} />
                </section>
              ))}
            </div>
            <JsonLd data={faqSchema(faqs)} />
          </>
        ) : (
          <p className="text-pebble">FAQs are being added — call or WhatsApp us with any question in the meantime.</p>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
