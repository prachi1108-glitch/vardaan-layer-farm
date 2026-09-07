import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/icons";
import { site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vardaan Layer Farm — phone, WhatsApp, email and farm address for bulk egg supply enquiries.",
};

export default function ContactPage() {
  const methods = [
    {
      icon: <Icon.Phone />,
      title: "Phone",
      value: site.contact.phoneDisplay,
      href: `tel:+${site.contact.phoneE164}`,
    },
    {
      icon: <Icon.Phone />,
      title: "WhatsApp",
      value: "Chat with us",
      href: whatsappLink(defaultWhatsappMessage),
      external: true,
    },
    {
      icon: <Icon.Mail />,
      title: "Email",
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
    {
      icon: <Icon.Pin />,
      title: "Farm address",
      value: site.contact.locationLine,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your egg supply."
        intro="Reach us whichever way suits you — phone, WhatsApp or email. For a quote, the enquiry form below gets you the fastest, most useful response."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          {/* Details */}
          <div>
            <SectionHeading eyebrow="Get in touch" title="Contact details" className="mb-8" />
            <ul className="space-y-3">
              {methods.map((m) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest/8 text-forest">
                      {m.icon}
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-stone">
                        {m.title}
                      </div>
                      <div className="text-sm font-medium text-forest-dark">{m.value}</div>
                    </div>
                  </div>
                );
                return (
                  <li key={m.title}>
                    {m.href ? (
                      <a
                        href={m.href}
                        target={m.external ? "_blank" : undefined}
                        rel={m.external ? "noopener noreferrer" : undefined}
                        className="block transition-colors hover:opacity-90"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4">
              {site.contact.mapEmbedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-line">
                  <iframe
                    src={site.contact.mapEmbedUrl}
                    title="Farm location map"
                    className="h-64 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-line bg-cream p-5 text-sm text-stone">
                  <div className="flex items-center gap-2 font-medium text-forest-dark">
                    <Icon.Pin className="h-5 w-5" /> Map
                  </div>
                  <p className="mt-1">
                    Add a Google Maps embed URL in{" "}
                    <code className="rounded bg-sand px-1">src/lib/site.ts</code> to show
                    the farm location here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div>
            <SectionHeading
              eyebrow="Send an enquiry"
              title="Tell us what you need"
              className="mb-8"
            />
            <EnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
