"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

/** Business-type options — values must match the Enquiries collection select. */
const BUSINESS_TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "restaurant", label: "Restaurant / Cloud kitchen" },
  { value: "retailer", label: "Retailer / Store" },
  { value: "distributor", label: "Distributor / Wholesaler" },
  { value: "caterer", label: "Caterer" },
  { value: "institution", label: "Institution" },
  { value: "other", label: "Other" },
] as const;

const QUANTITY_UNITS = [
  { value: "trays_day", label: "trays / day" },
  { value: "eggs_day", label: "eggs / day" },
  { value: "trays_week", label: "trays / week" },
  { value: "eggs_week", label: "eggs / week" },
  { value: "trays_month", label: "trays / month" },
  { value: "eggs_month", label: "eggs / month" },
] as const;

const FREQUENCIES = [
  { value: "one_time", label: "One-time" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "ongoing", label: "Ongoing" },
] as const;

/* Form inputs per DESIGN.md: off-white fill, 25%-opacity earthy-brown border,
   8px radius, focus = 1.5px brown border + 3px yellow glow ring. */
const fieldCls =
  "w-full rounded-lg border border-secondary/25 bg-surface-offwhite px-4 py-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-secondary focus:ring-[3px] focus:ring-primary-container/30 transition-all";

function LabelWrap({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-label-md text-label-md text-on-surface">
        {label}
        {required ? <span className="text-secondary"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

export function EnquiryForm({ whatsappHref }: { whatsappHref?: string } = {}) {
  const [businessType, setBusinessType] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const waHref =
    whatsappHref ||
    whatsappLink(`Hi ${site.name}, I'd like to enquire about your bulk egg supply.`);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Attribution captured client-side.
    const payload = {
      ...data,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      utm: readUtm(),
    };
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Request failed");
      setStatus("done");
      formRef.current?.reset();
      setBusinessType("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-tertiary/40 bg-tertiary-container p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-tertiary text-surface-cream">
          <Icon.Check className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-2xl">Thank you — we&apos;ve got your enquiry.</h3>
        <p className="mx-auto mt-2 max-w-md text-on-surface-variant">
          Our team will review your requirement and get back to you with a quote.
          For anything urgent, reach us on WhatsApp or call.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Message on WhatsApp
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-secondary hover:bg-secondary/5"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-2xl border border-outline-variant bg-surface-cream p-6 sm:p-8"
    >
      {/* Honeypot — hidden from real users; bots that fill it are rejected. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label>
          Leave this field empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <LabelWrap label="Full name" required>
          <input name="name" required placeholder="Your name" className={fieldCls} />
        </LabelWrap>
        <LabelWrap label="Business name" required>
          <input
            name="businessName"
            required
            placeholder="Company / store name"
            className={fieldCls}
          />
        </LabelWrap>

        <LabelWrap label="Business type" required>
          <select
            name="businessType"
            required
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className={fieldCls}
          >
            <option value="" disabled>
              Select business type…
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </LabelWrap>
        <LabelWrap label="Phone / WhatsApp" required>
          <input
            name="phone"
            type="tel"
            required
            placeholder="+91…"
            className={fieldCls}
          />
        </LabelWrap>

        {/* Estimated quantity + unit */}
        <LabelWrap label="Estimated quantity" required>
          <div className="flex gap-2">
            <input
              name="quantity"
              type="number"
              min={1}
              required
              placeholder="e.g. 200"
              className={fieldCls}
            />
            <select name="quantityUnit" required className={`${fieldCls} max-w-[9.5rem]`} defaultValue="trays_week">
              {QUANTITY_UNITS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </LabelWrap>
        <LabelWrap label="City / delivery area" required>
          <input name="city" required placeholder="City, state" className={fieldCls} />
        </LabelWrap>

        {/* Optional */}
        <LabelWrap label="Email (optional)">
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className={fieldCls}
          />
        </LabelWrap>
        <LabelWrap label="Supply frequency (optional)">
          <select name="frequency" className={fieldCls} defaultValue="">
            <option value="">Select…</option>
            {FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </LabelWrap>

        <LabelWrap label="Preferred grade / size (optional)">
          <input
            name="preferredGrade"
            placeholder="e.g. Large"
            className={fieldCls}
          />
        </LabelWrap>
        <LabelWrap label="Message (optional)" full>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us anything specific about your requirement…"
            className={fieldCls}
          />
        </LabelWrap>
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
          {errorMsg || "Something went wrong sending your enquiry."} Please try
          again, or reach us directly on WhatsApp / phone.
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-secondary hover:bg-secondary/5"
        >
          Prefer WhatsApp? Message us
        </a>
      </div>
      <p className="mt-3 text-xs text-on-surface-variant">
        We&apos;ll only use your details to respond to this enquiry.
      </p>
    </form>
  );
}

/** Read UTM params from the current URL for campaign attribution. */
function readUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const pick = (k: string) => p.get(k) || undefined;
  return {
    source: pick("utm_source"),
    medium: pick("utm_medium"),
    campaign: pick("utm_campaign"),
    term: pick("utm_term"),
    content: pick("utm_content"),
  };
}
