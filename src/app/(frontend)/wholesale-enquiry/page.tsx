import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/icons";
import { getContact } from "@/lib/cms";
import { whatsappLink, defaultWhatsappMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wholesale Enquiry",
  description:
    "Tell us your bulk egg requirement — business type, volume, frequency and location — and Vardaan Layer Farm will get back to you with a quote.",
};

const nextSteps = [
  {
    icon: <Icon.Mail />,
    title: "We review your requirement",
    body: "Business type, volume, frequency and delivery area — so the quote we send actually fits.",
  },
  {
    icon: <Icon.Phone />,
    title: "We get back with a quote",
    body: "Usually within one business day, by phone, WhatsApp or email — whatever suits you.",
  },
  {
    icon: <Icon.Truck />,
    title: "Reliable ongoing supply",
    body: "Once you're happy, we set up dependable, recurring delivery, order after order.",
  },
];

export default async function WholesaleEnquiryPage() {
  const contact = await getContact();
  const waHref = whatsappLink(defaultWhatsappMessage, contact.whatsappE164);
  const contactMethods = [
    {
      icon: <Icon.Phone />,
      title: "Call us",
      value: contact.phoneDisplay,
      href: `tel:+${contact.phoneE164}`,
    },
    {
      icon: <Icon.Mail />,
      title: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: <Icon.Pin />,
      title: "Find us",
      value: contact.locationLine,
      href: undefined,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Wholesale Enquiry"
        title="Tell us what you need, and we'll send you a quote."
        intro="Share your requirement below — the more detail on volume, frequency and location, the faster we can come back with pricing that fits your business. Prefer to talk? WhatsApp or call us any time."
      />

      <Section id="enquiry" className="scroll-mt-24">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Enquiry form"
              title="Your bulk egg requirement"
              intro="Fields marked * are required. Everything else is optional — it just helps us quote faster."
              className="mb-8"
            />
            <EnquiryForm whatsappHref={waHref} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-paper p-7">
              <h3 className="text-xl">What happens next</h3>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest/8 text-forest">
                      {s.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-forest-dark">
                        <span className="text-terracotta">{i + 1}.</span> {s.title}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-stone">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 rounded-2xl bg-forest-deep p-7 text-cream">
              <h3 className="text-lg text-cream">Rather talk to us directly?</h3>
              <p className="mt-2 text-sm text-cream/70">
                WhatsApp is the fastest way to get a response for business enquiries.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                <Icon.Phone className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <div className="mt-6 space-y-1 border-t border-cream/15 pt-6">
                {contactMethods.map((m) => {
                  const inner = (
                    <div className="flex items-center gap-3 rounded-xl px-2 py-2.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream/10 text-cream">
                        {m.icon}
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-cream/50">
                          {m.title}
                        </div>
                        <div className="text-sm text-cream">{m.value}</div>
                      </div>
                    </div>
                  );
                  return m.href ? (
                    <a key={m.title} href={m.href} className="block hover:bg-cream/5">
                      {inner}
                    </a>
                  ) : (
                    <div key={m.title}>{inner}</div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
