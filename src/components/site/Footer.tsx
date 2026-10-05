import Link from "next/link";
import { PipPeek } from "@/components/characters";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/site/Logo";
import type { ContactInfo, Post } from "@/lib/cms";
import { nav, site, whatsappLink, whatsappMessages } from "@/lib/site";

/** Footer on Oat with Pip peeking over the top edge (PRD FR-1.3, Doc 05 §2). */
export function Footer({ contact, latestPosts }: { contact: ContactInfo; latestPosts: Post[] }) {
  const heading = "eyebrow mb-4 text-pebble";
  const link = "text-[15px] text-cocoa hover:text-clay";
  return (
    <footer className="relative mt-10 bg-oat pb-24 lg:pb-0">
      <PipPeek className="absolute -top-[67px] left-[max(24px,calc(50%-560px))] w-[104px]" />
      <div className="container-x grid gap-10 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.1fr_1.3fr] lg:pt-20">
        <div>
          <Logo />
          <p className="mt-4 max-w-[300px] text-[15px] text-pebble">{site.tagline}</p>
          <p className="mt-3 max-w-[300px] text-[14px] text-pebble">
            White table eggs in bulk for hotels, restaurants, caterers, retailers, distributors and institutions.
          </p>
        </div>

        <nav aria-label="Explore">
          <p className={heading}>Explore</p>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Resources">
          <p className={heading}>Resources</p>
          <ul className="space-y-2.5">
            {latestPosts.slice(0, 3).map((p) => (
              <li key={p.id}>
                <Link href={`/resources/${p.slug}`} className={link}>
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/resources/faq" className={link}>
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/resources" className={link}>
                All resources
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className={heading}>Contact</p>
          <ul className="space-y-3 text-[15px]">
            <li>
              <a href={`tel:+${contact.phoneE164}`} className={`${link} inline-flex items-center gap-2.5`}>
                <Icon.Phone className="h-4 w-4 text-clay" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(whatsappMessages.default, contact.whatsappE164)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} inline-flex items-center gap-2.5`}
              >
                <Icon.WhatsApp className="h-4 w-4 text-whatsapp" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${link} inline-flex items-center gap-2.5 break-all`}>
                <Icon.Mail className="h-4 w-4 shrink-0 text-clay" /> {contact.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5 text-cocoa">
              <Icon.MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" /> {contact.locationLine}
            </li>
            {contact.businessHours ? (
              <li className="inline-flex items-start gap-2.5 text-cocoa">
                <Icon.Clock className="mt-0.5 h-4 w-4 shrink-0 text-clay" /> {contact.businessHours}
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-pebble lg:flex-row lg:items-center lg:justify-between">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <Link href="/privacy-policy" className="hover:text-clay">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-clay">
              Terms
            </Link>
            {contact.licenceNumber ? <span>FSSAI Lic. No. {contact.licenceNumber}</span> : null}
            {contact.gstNumber ? <span>GST {contact.gstNumber}</span> : null}
          </p>
          <p className="font-medium text-cocoa">Eggs only — no live bird sales.</p>
        </div>
      </div>
    </footer>
  );
}
