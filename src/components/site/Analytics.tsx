"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event if GA is loaded; a no-op otherwise. */
export function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", event, params);
}

const ATTR_KEY = "vardaan-attribution";
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;

export type Attribution = {
  landingPage?: string;
  referrer?: string;
  utm?: Partial<Record<(typeof UTM_KEYS)[number], string>>;
};

/** Remember how this session arrived (first page, referrer, UTMs) — FR-2.5. */
function captureAttribution() {
  try {
    if (sessionStorage.getItem(ATTR_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Attribution["utm"] = {};
    for (const k of UTM_KEYS) {
      const v = params.get(`utm_${k}`);
      if (v) utm[k] = v.slice(0, 200);
    }
    const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    const data: Attribution = { landingPage: window.location.pathname, referrer: ref, utm };
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(data));
  } catch {
    /* storage blocked — attribution is best-effort */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}

/**
 * GA4 (only when NEXT_PUBLIC_GA_ID is set) plus delegated click tracking
 * (PRD FR-3.2, Phase 4): `contact_click` for tel:/WhatsApp/mailto links and
 * `quote_open` for any "Get a quote" link marked with data-quote.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const page = window.location.pathname;
      if (href.startsWith("tel:")) track("contact_click", { method: "call", page });
      else if (href.includes("wa.me")) track("contact_click", { method: "whatsapp", page });
      else if (href.startsWith("mailto:")) track("contact_click", { method: "email", page });
      else if (a.hasAttribute("data-quote")) track("quote_open", { page });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
