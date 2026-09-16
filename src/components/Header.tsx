"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sym } from "@/components/ui/Sym";
import { nav, enquiryHref, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="bg-surface-offwhite border-b border-outline-variant/30 sticky top-0 z-50 shadow-ambient">
      <div className="container-x flex items-center justify-between py-4">
        {/* Brand */}
        <Link className="flex items-center gap-3 group" href="/">
          <span className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-surface shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sym name="egg" filled />
          </span>
          <span className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight leading-tight">
              {site.name}
            </span>
            <span className="font-label-caps text-label-caps text-secondary tracking-widest">
              BULK POULTRY &amp; EGG SUPPLY
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={
                isActive(item.href)
                  ? "text-primary font-bold border-b-2 border-primary-container pb-1 transition-colors duration-200"
                  : "text-on-surface-variant font-medium pb-1 border-b-2 border-transparent hover:text-primary transition-colors duration-200"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Trailing action */}
        <div className="flex items-center gap-4">
          <Link
            className="cta-shimmer-btn hidden sm:inline-flex items-center justify-center bg-primary-container text-on-surface font-label-md text-label-md font-bold px-space-lg py-3 rounded-lg shadow-ambient hover:-translate-y-0.5 hover:shadow-aura active:scale-95 transition-all duration-200"
            href={enquiryHref}
          >
            Get a Quote
          </Link>
          <button
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            className="md:hidden p-2 rounded-lg text-on-surface hover:bg-surface-cream transition-colors"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <Sym name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface-offwhite">
          <nav className="container-x flex flex-col py-3" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-3 font-label-md text-label-md ${
                  isActive(item.href)
                    ? "bg-surface-cream text-primary font-bold"
                    : "text-on-surface-variant"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={enquiryHref}
              className="mt-2 inline-flex items-center justify-center bg-primary-container text-on-surface font-label-md text-label-md font-bold px-space-lg py-3 rounded-lg shadow-ambient"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
