import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/site/JsonLd";
import { Heading, Section, type Tone } from "@/components/ui/Section";

export type FaqItem = { question: string; answer: string };

/** Accessible accordion on native <details> — works without JS. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-white">
      {items.map((f) => (
        <details key={f.question} className="faq group">
          <summary className="flex min-h-[64px] items-center justify-between gap-6 px-6 py-4 text-left">
            <span className="text-[17px] font-semibold text-cocoa">{f.question}</span>
            <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky text-cocoa">
              <Icon.Plus className="h-4 w-4" />
            </span>
          </summary>
          <p className="max-w-[68ch] px-6 pb-6 text-[16px] text-pebble whitespace-pre-line">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** FAQ section with FAQPage schema. Renders nothing when there are no FAQs. */
export function FaqSection({
  items,
  title = "Questions buyers ask",
  tone = "eggshell",
  schema = true,
}: {
  items: FaqItem[];
  title?: string;
  tone?: Tone;
  schema?: boolean;
}) {
  if (!items.length) return null;
  return (
    <Section tone={tone} labelledBy="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
        <Heading id="faq" eyebrow="FAQ" title={title} />
        <FaqList items={items} />
      </div>
      {schema ? <JsonLd data={faqSchema(items)} /> : null}
    </Section>
  );
}
