import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { getContact } from "@/lib/cms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use · Vardaan Layer Farm",
  description: "Terms for using the Vardaan Layer Farm website and sending an enquiry.",
  alternates: { canonical: "/terms" },
};

/** Draft — have it reviewed before launch. */
export default async function TermsPage() {
  const contact = await getContact();
  return (
    <LegalPage title="Terms of Use" href="/terms" updated="5 October 2026">
      <p>
        These terms cover your use of this website, operated by {site.name}, {site.contact.locationLine}.
      </p>

      <h2>Enquiries are not orders</h2>
      <p>
        Sending an enquiry does not create an order or a contract. Prices, volumes and delivery schedules are agreed
        directly with you after we respond, and confirmed in writing or on invoice.
      </p>

      <h2>Information on this site</h2>
      <p>
        We work to keep product, grading and supply information accurate. Specifications such as weight bands are
        indicative; the terms agreed for your order take precedence.
      </p>

      <h2>What we sell</h2>
      <p>We supply eggs only. We do not sell live birds, chicks, meat or hatchery stock.</p>

      <h2>Acceptable use</h2>
      <p>Please don&apos;t submit false enquiries, attempt to disrupt the site, or copy its content for commercial use.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
