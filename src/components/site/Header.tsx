"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/site/Logo";
import { nav, quoteHref, whatsappLink, whatsappMessages } from "@/lib/site";

type Props = { phoneDisplay: string; phoneE164: string; whatsappE164: string };

/**
 * Sticky header (PRD FR-1.1, Doc 05 §2). Desktop: logo · nav · phone (≥1280)
 * · Get a quote. Mobile: logo · small QUOTE pill · menu drawer with nav,
 * WhatsApp and call.
 */
export function Header({ phoneDisplay, phoneE164, whatsappE164 }: Props) {
  const pathname = usePathname();
  // The drawer records the path it was opened on, so navigating closes it
  // without a state-syncing effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and listen for Escape while the drawer is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
          scrolled ? "border-line bg-eggshell/92 backdrop-blur-md" : "border-transparent bg-eggshell"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                      isActive(item.href) ? "text-clay" : "text-cocoa hover:text-clay"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+${phoneE164}`}
              className="hidden items-center gap-2 text-[15px] font-medium text-cocoa hover:text-clay xl:inline-flex"
            >
              <Icon.Phone className="h-4 w-4" />
              {phoneDisplay}
            </a>
            {/* Wrapped so the responsive display class doesn't fight the button's own inline-flex. */}
            <span className="hidden lg:block">
              <ButtonLink href={quoteHref} size="sm" data-quote>
                Get a quote
              </ButtonLink>
            </span>
            <span className="lg:hidden">
              <ButtonLink href={quoteHref} size="sm" arrow={false} className="!h-10 !px-4 !text-[12px]" data-quote>
                Quote
              </ButtonLink>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-cocoa lg:hidden"
            >
              <Icon.Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — a sibling of <header>, because the header's backdrop-filter
          would otherwise become the containing block for this fixed overlay. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 overflow-hidden transition-[visibility] duration-300 lg:hidden ${open ? "visible" : "invisible pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-cocoa/25 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[min(360px,88vw)] flex-col bg-eggshell shadow-lift transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[72px] items-center justify-between px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white"
            >
              <Icon.Close className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pt-2">
            <ul className="divide-y divide-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-[56px] items-center justify-between font-display text-[26px] uppercase ${
                      isActive(item.href) ? "text-clay" : "text-cocoa"
                    }`}
                  >
                    {item.label}
                    <Icon.ChevronRight className="h-5 w-5 text-pebble" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-3 border-t border-line p-5">
            <ButtonA
              href={whatsappLink(whatsappMessages.default, whatsappE164)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
            >
              WhatsApp the farm
            </ButtonA>
            <ButtonA href={`tel:+${phoneE164}`} variant="secondary">
              <Icon.Phone className="h-4 w-4" /> Call {phoneDisplay}
            </ButtonA>
          </div>
        </div>
      </div>
    </>
  );
}
