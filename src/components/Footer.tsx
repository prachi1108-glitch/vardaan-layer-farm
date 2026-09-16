import Link from "next/link";
import { Sym } from "@/components/ui/Sym";
import { site } from "@/lib/site";
import type { ContactInfo } from "@/lib/cms";

/**
 * NOTE — unverified claims: the trust badges and compliance strings below come
 * from the supplied design. Confirm Vardaan actually holds each certification
 * (and correct the wording) before launch; see Doc 01 §11 open items.
 */
const trustBadges = [
  { icon: "verified", label: "HACCP Compliant Handling" },
  { icon: "shield", label: "100% Traceable" },
];

const complianceStrip = [
  "Biosecurity Level III",
  "Cold-Chain Fleet Monitored",
  "Daily Lab Certified",
];

const operationsLinks = [
  { label: "Home", href: "/" },
  { label: "About Our Facility", href: "/about" },
  { label: "Wholesale Grading", href: "/products" },
  { label: "Practical Insights", href: "/blog" },
];

const supplyLinks = [
  { label: "Procurement Enquiries", href: "/wholesale-enquiry" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer({ contact }: { contact: ContactInfo }) {
  return (
    <footer className="bg-inverse-surface border-t border-outline/20 text-surface-cream">
      <div className="container-x py-space-2xl flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-outline/20">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <span className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-surface">
                <Sym name="egg" filled />
              </span>
              <span className="font-headline-md text-headline-md text-surface-cream font-bold">
                {site.name}
              </span>
            </Link>
            <p className="font-body-sm text-body-sm text-text-dark-secondary max-w-sm">
              {site.positioning}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {trustBadges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-dark-card rounded-md font-label-caps text-label-caps text-accent-gold border border-secondary/30"
                >
                  <Sym name={b.icon} className="text-xs" />
                  <span>{b.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Operations */}
          <div>
            <h4 className="font-headline-sm text-base text-surface-cream font-bold mb-4">
              Operations &amp; Products
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              {operationsLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-text-dark-secondary hover:text-accent-gold transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Supply & trade */}
          <div>
            <h4 className="font-headline-sm text-base text-surface-cream font-bold mb-4">
              Supply &amp; Trade
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              {supplyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-text-dark-secondary hover:text-accent-gold transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Farm gate & dispatch */}
          <div>
            <h4 className="font-headline-sm text-base text-surface-cream font-bold mb-4">
              Farm Gate &amp; Dispatch
            </h4>
            <div className="space-y-3 font-body-sm text-body-sm text-text-dark-secondary">
              <p className="flex items-start gap-2">
                <Sym name="location_on" className="text-accent-gold shrink-0 text-lg mt-0.5" />
                <span>{contact.locationLine}</span>
              </p>
              <p className="flex items-center gap-2">
                <Sym name="call" className="text-accent-gold shrink-0 text-lg" />
                <a
                  href={`tel:+${contact.phoneE164}`}
                  className="hover:text-accent-gold transition-colors"
                >
                  {contact.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Sym name="mail" className="text-accent-gold shrink-0 text-lg" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-accent-gold transition-colors break-all"
                >
                  {contact.email}
                </a>
              </p>
              {contact.businessHours ? (
                <p className="flex items-center gap-2">
                  <Sym name="schedule" className="text-accent-gold shrink-0 text-lg" />
                  <span>{contact.businessHours}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-text-dark-secondary">
          <div>
            © {new Date().getFullYear()} {site.name}. All rights reserved. Industrial
            Bulk Supply &amp; Distribution.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-label-caps text-label-caps">
            {complianceStrip.map((c, i) => (
              <span key={c} className="flex items-center gap-6">
                <span className={i === 0 ? "text-accent-gold" : undefined}>{c}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
