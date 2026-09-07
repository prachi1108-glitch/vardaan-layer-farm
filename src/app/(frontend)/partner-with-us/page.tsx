import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/icons";
import { site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Enquire about bulk egg supply, retail partnerships or distribution with Vardhan Farms.",
};

const pathways = [
  {
    icon: <Icon.Scale />,
    title: "I need bulk egg supply",
    body: "Wholesalers, food businesses and bulk buyers.",
    type: "Wholesaler",
  },
  {
    icon: <Icon.Store />,
    title: "I want to retail your eggs",
    body: "Retailers, stores and grocery businesses.",
    type: "Retailer",
  },
  {
    icon: <Icon.Truck />,
    title: "I want to explore distribution",
    body: "Distributors and supply partners.",
    type: "Distributor",
  },
  {
    icon: <Icon.Mail />,
    title: "General enquiry",
    body: "Anything else you'd like to ask.",
    type: "Other",
  },
];

export default async function PartnerPage({
  searchParams,
}: PageProps<"/partner-with-us">) {
  const params = await searchParams;
  const raw = params?.type;
  const initialType = Array.isArray(raw) ? raw[0] : (raw ?? "");

  const contactMethods = [
    {
      icon: <Icon.Phone />,
      title: "Call us",
      value: site.contact.phoneDisplay,
      href: `tel:+${site.contact.phoneE164}`,
    },
    {
      icon: <Icon.Mail />,
      title: "Email",
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
    {
      icon: <Icon.Pin />,
      title: "Find us",
      value: site.contact.locationLine,
      href: undefined,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Partner With Us"
        title="Tell us how you'd like to work together."
        intro="Pick what brings you here and share a few details. We'll come back to you with the right supply options — most enquiries are answered quickly over WhatsApp or a call."
      />

      {/* Visitor pathways */}
      <Section className="!pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map((p) => (
            <Link
              key={p.title}
              href={`/partner-with-us?type=${encodeURIComponent(p.type)}#enquiry`}
              className="group flex flex-col rounded-2xl border border-line bg-cream p-6 transition-colors hover:border-forest/40 hover:bg-paper"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-forest/8 text-forest transition-colors group-hover:bg-forest group-hover:text-cream">
                {p.icon}
              </span>
              <h3 className="mt-4 text-base leading-snug">{p.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-stone">
                {p.body}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest">
                Start here <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Form + contact */}
      <Section id="enquiry" className="scroll-mt-24 !pt-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Enquiry form"
              title="Send us your requirement."
              intro="The form adapts to who you are, so we only ask what's relevant."
              className="mb-8"
            />
            <EnquiryForm initialType={initialType} />
          </div>

          {/* Contact sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-forest-deep p-7 text-cream">
              <h3 className="text-xl text-cream">Rather reach us directly?</h3>
              <p className="mt-2 text-sm text-cream/70">
                WhatsApp is the fastest way to get a response for business
                enquiries.
              </p>
              <a
                href={whatsappLink(defaultWhatsappMessage)}
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

            {site.contact.mapEmbedUrl ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-line">
                <iframe
                  src={site.contact.mapEmbedUrl}
                  title="Farm location map"
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-line bg-cream p-5 text-sm text-stone">
                <div className="flex items-center gap-2 font-medium text-forest-dark">
                  <Icon.Pin className="h-5 w-5" /> Map
                </div>
                <p className="mt-1">
                  Add a Google Maps embed URL in{" "}
                  <code className="rounded bg-sand px-1">src/lib/site.ts</code> to
                  show the farm location here.
                </p>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
