import type { Metadata } from "next";
import { FaqSection } from "@/components/blocks/Faq";
import { PageHero } from "@/components/blocks/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/site/JsonLd";
import { Chip, Section } from "@/components/ui/Section";
import { getContact, getFaqs } from "@/lib/cms";
import { contactPageSchema } from "@/lib/schema";
import { BUSINESS_TYPES, site, whatsappLink, whatsappMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Bulk Egg Quote · Contact Vardaan Layer Farm",
  description:
    "Call, WhatsApp or email Vardaan Layer Farm in Sonipat — or send your volume, grade and delivery area and we'll come back with a wholesale quote.",
  alternates: { canonical: "/contact" },
};

const next = [
  { title: "We call you", body: `Within ${site.quoteTurnaround} to confirm volume, grade and delivery.` },
  { title: "You get a quote", body: "A rate for your volume and a delivery schedule, freight stated upfront." },
  { title: "Supply starts", body: "Deliveries begin on the agreed roster." },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { type } = await searchParams;
  const defaultType = BUSINESS_TYPES.some((t) => t.value === type) ? String(type) : "";
  const [contact, faqs] = await Promise.all([getContact(), getFaqs("contact")]);

  const cards = [
    {
      icon: Icon.Phone,
      label: "Phone / WhatsApp",
      value: contact.phoneDisplay,
      href: `tel:+${contact.phoneE164}`,
    },
    { icon: Icon.Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Icon.MapPin, label: "Location", value: contact.locationLine, href: site.contact.mapsUrl },
    ...(contact.businessHours ? [{ icon: Icon.Clock, label: "Hours", value: contact.businessHours, href: "" }] : []),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        title="Talk to the farm"
        script="directly"
        intro="Tell us the volume, the grade and where it needs to go. We'll confirm pricing and a delivery schedule."
      />

      <Section tone="oat" className="!pt-12 lg:!pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10">
          <div id="quote" className="scroll-mt-28 rounded-[20px] bg-white p-6 shadow-soft sm:p-10">
            <h2 className="t-h2 m-0 text-cocoa">Get a quote</h2>
            <p className="mb-8 mt-3 text-[15px] text-pebble">
              Fields marked <span className="text-clay">*</span> are required. It takes about a minute.
            </p>
            <EnquiryForm defaultType={defaultType} whatsappE164={contact.whatsappE164} />
          </div>

          <aside className="flex flex-col gap-4">
            {cards.map(({ icon: I, label, value, href }) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-oat text-clay">
                    <I className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-pebble">{label}</span>
                    <span className="mt-1 block break-words text-[17px] font-semibold text-cocoa">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-4 rounded-[20px] bg-white p-5 shadow-soft transition-colors hover:bg-eggshell"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-4 rounded-[20px] bg-white p-5 shadow-soft">
                  {inner}
                </div>
              );
            })}
            <a
              href={whatsappLink(whatsappMessages.contact, contact.whatsappE164)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-[20px] bg-white p-5 shadow-soft transition-colors hover:bg-eggshell"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-oat">
                <Icon.WhatsApp className="h-5 w-5 text-whatsapp" />
              </span>
              <span>
                <span className="eyebrow block text-pebble">WhatsApp</span>
                <span className="mt-1 block text-[17px] font-semibold text-cocoa">Message the farm</span>
              </span>
            </a>

            <div className="mt-2 rounded-[20px] bg-sky p-6">
              <h2 className="eyebrow m-0 text-cocoa">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {next.map((n, i) => (
                  <li key={n.title} className="flex gap-4">
                    <span className="font-display text-[22px] leading-none text-clay">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-semibold text-cocoa">{n.title}</span>
                      <span className="block text-[15px] text-cocoa/80">{n.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="eggshell" labelledBy="areas">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <h2 id="areas" className="t-h2 m-0 text-cocoa">
              Areas we deliver to
            </h2>
            <p className="mt-4 text-pebble">
              Based in {site.contact.locality}, {site.contact.region}. Not on the list? Ask — we&apos;ll tell you honestly whether we can reach you.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2.5">
            {(contact.areasServed.length ? contact.areasServed : [site.contact.locality]).map((a) => (
              <li key={a}>
                <Chip tone="sky">
                  <Icon.MapPin className="mr-1.5 h-3.5 w-3.5" /> {a}
                </Chip>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FaqSection items={faqs} tone="oat" />
      <JsonLd data={contactPageSchema()} />
    </>
  );
}
