import Link from "next/link";
import { Logo } from "@/components/Logo";
import { nav, site, whatsappLink, defaultWhatsappMessage } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-forest-deep text-cream/80">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              {site.positioning}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/80 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cream/50">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`tel:+${site.contact.phoneE164}`}
                  className="text-cream/80 transition-colors hover:text-cream"
                >
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 transition-colors hover:text-cream"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-cream/80 transition-colors hover:text-cream"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="pt-1 text-cream/60">{site.contact.locationLine}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Fresh table eggs · Wholesale · Retail · Distribution</p>
        </div>
      </div>
    </footer>
  );
}
