import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { getContact } from "@/lib/cms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy · Vardaan Layer Farm",
  description: "How Vardaan Layer Farm collects, uses and protects the details you share in an enquiry.",
  alternates: { canonical: "/privacy-policy" },
};

/**
 * Draft written to the PRD's DPDP Act 2023 requirements. Have it reviewed
 * before launch (Doc 07 Phase 6 checklist).
 */
export default async function PrivacyPage() {
  const contact = await getContact();
  return (
    <LegalPage title="Privacy Policy" href="/privacy-policy" updated="5 October 2026">
      <p>
        This policy explains how {site.name} (&quot;we&quot;, &quot;us&quot;), {site.contact.locationLine}, handles
        personal data you share through this website, in line with India&apos;s Digital Personal Data Protection Act,
        2023.
      </p>

      <h2>What we collect</h2>
      <p>When you send an enquiry we collect the details you enter:</p>
      <ul>
        <li>Your name, business name and business type</li>
        <li>Phone / WhatsApp number and, if you give it, your email address</li>
        <li>Your delivery city or PIN code, quantity, frequency, preferred grade and message</li>
      </ul>
      <p>
        We also record which page you sent the enquiry from, the page you first landed on, the referring website and
        any campaign tags in the link you followed (UTM parameters), and whether you were on a phone or a computer.
        This tells us how buyers find us.
      </p>

      <h2>Why we use it</h2>
      <p>
        Only to respond to your enquiry: to call or message you, prepare a quote and arrange supply. We do not sell your
        data, and we do not add you to marketing lists without asking.
      </p>

      <h2>Your consent</h2>
      <p>
        The enquiry form asks for your consent before you submit. You can withdraw consent at any time by writing to{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Your details are stored in our website database and sent to our team by email. The service providers that run
        these systems (website hosting, database and email delivery) process it on our behalf and only for this
        purpose.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry records for up to 24 months so we can follow up and serve existing customers, then delete them.
        You can ask us to delete your data sooner.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete the personal data we hold about you, or raise a grievance, by emailing{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> or calling{" "}
        <a href={`tel:+${contact.phoneE164}`}>{contact.phoneDisplay}</a>. We will respond within 30 days.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        We use privacy-friendly analytics to understand how the site is used. If we ever add marketing pixels we will
        ask for your consent first.
      </p>
    </LegalPage>
  );
}
