"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

const BUYER_TYPES = [
  "Wholesaler",
  "Dealer",
  "Distributor",
  "Retailer",
  "Restaurant / Food Business",
  "Institution",
  "Consumer",
  "Other",
] as const;
type BuyerType = (typeof BUYER_TYPES)[number];

const isBulkTrade = (t: string) =>
  t === "Wholesaler" || t === "Dealer" || t === "Distributor";
const isFoodBiz = (t: string) =>
  t === "Restaurant / Food Business" || t === "Institution";
const isConsumer = (t: string) => t === "Consumer";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  full,
  as = "input",
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  full?: boolean;
  as?: "input" | "textarea" | "select";
  options?: readonly string[];
}) {
  const cls =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-stone/60 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20";
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-forest-dark">
        {label}
        {required ? <span className="text-terracotta"> *</span> : null}
      </span>
      {as === "textarea" ? (
        <textarea name={name} rows={4} placeholder={placeholder} className={cls} />
      ) : as === "select" && options ? (
        <select name={name} required={required} className={cls} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

export function EnquiryForm({ initialType = "" }: { initialType?: string }) {
  const [type, setType] = useState<string>(
    (BUYER_TYPES as readonly string[]).includes(initialType) ? initialType : ""
  );
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  const whatsappHref = useMemo(() => {
    return whatsappLink(
      `Hi ${site.name}, I'd like to enquire about egg supply.${
        type ? ` I'm a ${type}.` : ""
      }`
    );
  }, [type]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      formRef.current?.reset();
      setType("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-moss/40 bg-moss/10 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-moss text-cream">
          <Icon.Check className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-2xl">Thank you — we&apos;ve got your enquiry.</h3>
        <p className="mx-auto mt-2 max-w-md text-stone">
          Our team will get back to you shortly. For anything urgent, reach us on
          WhatsApp or call {site.contact.phoneDisplay}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Message on WhatsApp
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-forest hover:bg-forest/5"
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
      className="rounded-2xl border border-line bg-cream p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {/* I am a... */}
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-medium text-forest-dark">
            I am a<span className="text-terracotta"> *</span>
          </span>
          <select
            name="buyerType"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          >
            <option value="" disabled>
              Select who you are…
            </option>
            {BUYER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {/* Core fields */}
        <Field label="Full name" name="name" required placeholder="Your name" />
        {!isConsumer(type) ? (
          <Field label="Business name" name="business" placeholder="Company / store name" />
        ) : null}
        <Field label="Phone number" name="phone" type="tel" required placeholder="+91…" />
        <Field label="Email address" name="email" type="email" placeholder="you@example.com" />
        <Field label="City / location" name="city" placeholder="City, state" />

        {/* Conditional: bulk trade (wholesaler / dealer / distributor) */}
        {isBulkTrade(type) ? (
          <>
            <Field
              label="Approx. daily / monthly requirement"
              name="requirement"
              placeholder="e.g. 200 trays / week"
            />
            <Field label="Supply location" name="supplyLocation" placeholder="Where do you need supply?" />
            <Field
              label="Current business type"
              name="currentBusiness"
              full
              placeholder="Briefly describe your trade"
            />
          </>
        ) : null}

        {/* Conditional: retailer */}
        {type === "Retailer" ? (
          <>
            <Field
              label="Store type"
              name="storeType"
              as="select"
              options={["Kirana / general store", "Grocery store", "Supermarket", "Modern trade", "Other"]}
            />
            <Field label="Number of outlets" name="outlets" placeholder="e.g. 1–3" />
            <Field label="Estimated requirement" name="requirement" full placeholder="e.g. 50 trays / week" />
          </>
        ) : null}

        {/* Conditional: food business / institution */}
        {isFoodBiz(type) ? (
          <Field label="Estimated requirement" name="requirement" full placeholder="e.g. 30 trays / week" />
        ) : null}

        {/* Consumer note */}
        {isConsumer(type) ? (
          <p className="rounded-xl bg-wheat/15 px-4 py-3 text-sm text-clay sm:col-span-2">
            Direct-to-consumer ordering isn&apos;t live yet — leave your details
            and we&apos;ll reach out when consumer packs become available.
          </p>
        ) : null}

        {/* Generic quantity/delivery for non-consumer when not already asked */}
        {type && !isConsumer(type) && !isBulkTrade(type) && type !== "Retailer" && !isFoodBiz(type) ? (
          <Field label="Required quantity" name="requirement" placeholder="Approx. quantity" />
        ) : null}
        {type && !isConsumer(type) ? (
          <Field
            label="Delivery requirement"
            name="delivery"
            as="select"
            options={["Delivery to my location", "I can arrange pickup", "Not sure yet"]}
          />
        ) : null}

        <Field
          label="Message"
          name="message"
          as="textarea"
          full
          placeholder="Tell us what you need…"
        />
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-xl bg-clay/10 px-4 py-3 text-sm text-clay">
          Something went wrong sending your enquiry. Please try again, or reach us
          directly on WhatsApp / phone.
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-forest hover:bg-forest/5"
        >
          Prefer WhatsApp? Message us
        </a>
      </div>
      <p className="mt-3 text-xs text-stone">
        We&apos;ll only use your details to respond to this enquiry.
      </p>
    </form>
  );
}
