"use client";

import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Icon } from "@/components/icons";
import { readAttribution, track } from "@/components/site/Analytics";
import { Button, ButtonA } from "@/components/ui/Button";
import {
  compactEnquirySchema,
  enquirySchema,
  FREQUENCIES,
  GRADE_OPTIONS,
  QUANTITY_UNITS,
  volumeBand,
} from "@/lib/enquiry-schema";
import { BUSINESS_TYPES, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * "Get a quote" form (PRD FR-2). `full` on /contact#quote, `compact` inline on
 * Our Eggs. Cute stops here (Doc 03 §4.3): no characters inside the form.
 */

type Errors = Record<string, string>;

const fieldBase =
  "h-12 rounded-[12px] border border-line bg-white px-4 text-[16px] text-cocoa placeholder:text-pebble/70 transition-colors focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20 aria-[invalid=true]:border-error";
const fieldCls = `${fieldBase} w-full`;

function Field({
  id,
  label,
  required,
  error,
  hint,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[14px] font-medium text-cocoa">
        {label}
        {required ? (
          <span className="text-clay" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-pebble"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? <p className="text-[13px] text-pebble">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-[13px] font-medium text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({
  variant = "full",
  defaultType = "",
  whatsappE164,
}: {
  variant?: "full" | "compact";
  defaultType?: string;
  whatsappE164?: string;
}) {
  const router = useRouter();
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [frequency, setFrequency] = useState("");
  const compact = variant === "compact";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const a11y = (name: string) => ({
    id: id(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const fd = new FormData(e.currentTarget);
    const raw: Record<string, unknown> = Object.fromEntries(fd.entries());
    raw.consent = fd.get("consent") === "on";

    const schema = compact ? compactEnquirySchema : enquirySchema;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      setFormError("Please check the highlighted fields.");
      const first = Object.keys(next)[0];
      document.getElementById(id(first))?.focus();
      return;
    }
    setErrors({});
    setSending(true);

    const attribution = readAttribution();
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...raw,
          variant,
          turnstileToken: fd.get("cf-turnstile-response") || undefined,
          sourcePage: window.location.pathname,
          landingPage: attribution.landingPage,
          referrer: attribution.referrer,
          utm: attribution.utm,
          device: window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Errors };
      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        throw new Error(json.error || "Something went wrong.");
      }
      const d = parsed.data as { businessType: string; quantity: number; quantityUnit: string };
      track("generate_lead", {
        business_type: d.businessType,
        volume_band: volumeBand(d.quantity, d.quantityUnit),
        form: variant,
      });
      // The thank-you page is short; start it at the top rather than at the form's scroll depth.
      window.scrollTo({ top: 0, behavior: "instant" });
      router.push("/thank-you");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
      setSending(false);
    }
  }

  const waHref = whatsappLink(whatsappMessages.contact, whatsappE164);

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {formError ? (
        <div role="alert" className="mb-6 rounded-[12px] bg-error/10 px-4 py-3 text-[14px] font-medium text-error">
          {formError}
        </div>
      ) : null}

      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={`grid gap-5 ${compact ? "sm:grid-cols-2 lg:grid-cols-[1.1fr_1.2fr_1fr_1fr]" : "sm:grid-cols-2"}`}>
        {!compact ? (
          <>
            <Field id={id("name")} label="Full name" required error={errors.name}>
              <input {...a11y("name")} type="text" autoComplete="name" className={fieldCls} />
            </Field>
            <Field id={id("businessName")} label="Business name" required error={errors.businessName}>
              <input {...a11y("businessName")} type="text" autoComplete="organization" className={fieldCls} />
            </Field>
          </>
        ) : null}

        <Field id={id("businessType")} label="Business type" required error={errors.businessType}>
          <select {...a11y("businessType")} defaultValue={defaultType} className={fieldCls}>
            <option value="" disabled>
              Choose one
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        {!compact ? (
          <Field id={id("phone")} label="Phone / WhatsApp" required error={errors.phone}>
            <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className={fieldCls} />
          </Field>
        ) : null}

        <Field
          id={id("quantity")}
          label="Estimated quantity"
          required
          error={errors.quantity || errors.quantityUnit}
          className={compact ? "" : "sm:col-span-2"}
        >
          <div className="flex gap-2">
            <input {...a11y("quantity")} type="number" inputMode="numeric" min={1} placeholder="e.g. 40" className={`${fieldBase} min-w-0 flex-1`} />
            <select
              name="quantityUnit"
              id={id("quantityUnit")}
              aria-label="Unit"
              defaultValue="trays_week"
              className={`${fieldBase} w-[140px] shrink-0`}
            >
              {QUANTITY_UNITS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </Field>

        <Field id={id("city")} label="City / delivery area" required error={errors.city} hint={compact ? undefined : "City, area or PIN code"}>
          <input {...a11y("city")} type="text" autoComplete="address-level2" className={fieldCls} />
        </Field>

        {compact ? (
          <Field id={id("phone")} label="Phone / WhatsApp" required error={errors.phone}>
            <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className={fieldCls} />
          </Field>
        ) : (
          <>
            <Field id={id("email")} label="Email" error={errors.email}>
              <input {...a11y("email")} type="email" autoComplete="email" className={fieldCls} />
            </Field>
            <Field id={id("frequency")} label="Supply frequency" error={errors.frequency}>
              <select {...a11y("frequency")} value={frequency} onChange={(e) => setFrequency(e.target.value)} className={fieldCls}>
                <option value="">Not sure yet</option>
                {FREQUENCIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </Field>
            {frequency === "one_time" ? (
              <Field id={id("requiredBy")} label="Required by" required error={errors.requiredBy}>
                <input {...a11y("requiredBy")} type="date" min={new Date().toISOString().slice(0, 10)} className={fieldCls} />
              </Field>
            ) : null}
            <Field id={id("preferredGrade")} label="Preferred grade" error={errors.preferredGrade}>
              <select {...a11y("preferredGrade")} defaultValue="" className={fieldCls}>
                <option value="">No preference</option>
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={id("message")} label="Message" error={errors.message} className="sm:col-span-2">
              <textarea
                {...a11y("message")}
                rows={4}
                placeholder="Delivery days, timing, anything we should know"
                className={`${fieldCls} h-auto py-3`}
              />
            </Field>
          </>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-[14px] text-cocoa">
          <input
            type="checkbox"
            name="consent"
            id={id("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded accent-clay"
          />
          <span>
            I agree to Vardaan Layer Farm contacting me about this enquiry by phone, WhatsApp or email.{" "}
            <Link href="/privacy-policy" className="text-clay underline underline-offset-2">
              Privacy policy
            </Link>
          </span>
        </label>
        {errors.consent ? (
          <p id={`${id("consent")}-error`} className="pl-8 text-[13px] font-medium text-error">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {siteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile mt-4" data-sitekey={siteKey} data-appearance="interaction-only" />
        </>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={sending} aria-busy={sending}>
          {sending ? "Sending…" : compact ? "Get a quote" : "Send enquiry"}
        </Button>
        {!compact ? (
          <ButtonA href={waHref} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            Prefer WhatsApp? Message us
          </ButtonA>
        ) : null}
      </div>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-pebble">
        <Icon.Shield className="h-4 w-4" /> We&apos;ll only use your details to respond to this enquiry.
      </p>
    </form>
  );
}
