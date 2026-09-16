"use client";

import { useMemo, useRef, useState } from "react";
import { Sym } from "@/components/ui/Sym";

const EGGS_PER_TRAY = 30;
const TRAYS_PER_CRATE = 12;
const EGGS_PER_CRATE = EGGS_PER_TRAY * TRAYS_PER_CRATE; // 360

const GRADES = [
  { value: "Medium", weight: "45g – 52g", use: "Baking / Daily" },
  { value: "Large", weight: "53g – 60g", use: "Horeca Standard" },
  { value: "Extra Large", weight: "60g+ Premium", use: "Retail Packs" },
] as const;

const CADENCES = [
  { value: "Daily Dispatch", frequency: "ongoing", unit: "eggs_day" },
  { value: "Alternate Days", frequency: "ongoing", unit: "eggs_week" },
  { value: "Weekly Scheduled", frequency: "weekly", unit: "eggs_week" },
] as const;

const PRESETS = [50, 100, 250, 500, 1000];

const BUSINESS_TYPES = [
  { value: "hotel", label: "Hotel / Resort" },
  { value: "restaurant", label: "Restaurant / Cloud kitchen" },
  { value: "retailer", label: "Retailer / Store" },
  { value: "distributor", label: "Distributor / Wholesaler" },
  { value: "caterer", label: "Caterer / Banquet" },
  { value: "institution", label: "Institution / Bulk kitchen" },
  { value: "other", label: "Other" },
];

const fmt = (n: number) => n.toLocaleString("en-IN");

function tierFor(crates: number) {
  if (crates < 100)
    return {
      tier: "Wholesale Tier 1 (Base Commercial)",
      rate: "Standard Commercial",
      fleet: "1x Dedicated Dispatch Van",
    };
  if (crates < 300)
    return {
      tier: "Wholesale Tier 2 (~8% Logistics Efficiency)",
      rate: "Preferred Tier Rate",
      fleet: "1x Reefer Mini-Truck",
    };
  if (crates < 700)
    return {
      tier: "Wholesale Tier 3 (~14% Scale Advantage)",
      rate: "Direct Contract Rate",
      fleet: "2x Heavy Reefer Trucks",
    };
  return {
    tier: "Enterprise Tier (~18% FTL Rate Benefit)",
    rate: "Dedicated Contract Floor",
    fleet: "Full Truckload (FTL) Fleet",
  };
}

const darkField =
  "w-full rounded-lg bg-inverse-surface/60 border border-secondary/30 px-4 py-3 font-body-sm text-body-sm text-surface-cream placeholder:text-text-dark-secondary/50 focus:outline-none focus:border-primary-container focus:ring-[3px] focus:ring-primary-container/30 transition-all";

export function QuoteSection() {
  const [crates, setCrates] = useState(150);
  const [grade, setGrade] = useState<string>("Large");
  const [cadence, setCadence] = useState<string>("Daily Dispatch");
  const [applied, setApplied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const eggs = crates * EGGS_PER_CRATE;
  const trays = crates * TRAYS_PER_CRATE;
  const { tier, rate, fleet } = useMemo(() => tierFor(crates), [crates]);
  const cadenceCfg =
    CADENCES.find((c) => c.value === cadence) ?? CADENCES[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get("name") ?? ""),
      businessName: String(fd.get("businessName") ?? ""),
      businessType: String(fd.get("businessType") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      email: String(fd.get("email") ?? ""),
      quantity: eggs,
      quantityUnit: cadenceCfg.unit,
      frequency: cadenceCfg.frequency,
      preferredGrade: grade,
      message: `Configured via wholesale calculator — ${fmt(crates)} crates (${fmt(
        eggs
      )} eggs / ${fmt(trays)} trays), grade ${grade}, cadence ${cadence}. Indicative ${tier}.`,
      company_website: String(fd.get("company_website") ?? ""),
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
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
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section
      className="py-space-2xl md:py-space-3xl bg-on-surface text-surface-cream relative overflow-hidden"
      id="quote"
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 left-1/3 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-3xl pointer-events-none"
      />
      <div className="container-x relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 font-label-caps text-label-caps text-accent-gold">
            <Sym name="calculate" className="text-base" />
            INTERACTIVE B2B PROCUREMENT TOOL
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-cream font-bold mt-3">
            Estimate Volume &amp; Request Wholesale Contract Pricing
          </h2>
          <p className="font-body-lg text-body-lg text-text-dark-secondary mt-3">
            Configure your commercial egg requirements with our instant dispatch
            estimator below, then submit for official rate-sheet confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-7 bg-surface-dark-card rounded-2xl border border-secondary/30 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline-sm text-headline-sm text-surface-cream font-bold flex items-center gap-2">
                <Sym name="tune" className="text-primary-container" />
                B2B Wholesale Calculator
              </h3>
              <span className="font-label-caps text-label-caps text-accent-gold border border-secondary/30 rounded-md px-2.5 py-1">
                Indicative
              </span>
            </div>

            {/* Step 1: grade */}
            <fieldset className="mb-8">
              <legend className="font-label-md text-label-md text-surface-cream mb-3">
                1. Select Egg Weight Grade
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {GRADES.map((g) => {
                  const active = grade === g.value;
                  return (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setGrade(g.value)}
                      aria-pressed={active}
                      className={`text-left rounded-lg border p-4 transition-all ${
                        active
                          ? "border-primary-container bg-primary-container/10"
                          : "border-secondary/30 hover:border-accent-gold"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-surface-cream font-bold">
                          {g.value}
                        </span>
                        {active ? (
                          <Sym
                            name="check_circle"
                            filled
                            className="text-primary-container text-base"
                          />
                        ) : null}
                      </span>
                      <span className="block font-body-sm text-body-sm text-text-dark-secondary mt-1">
                        {g.weight}
                      </span>
                      <span className="block font-label-caps text-label-caps text-accent-gold mt-1">
                        {g.use}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Step 2: volume */}
            <div className="mb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <label
                  htmlFor="volumeSlider"
                  className="font-label-md text-label-md text-surface-cream"
                >
                  2. Order Volume (Crates / Consignment)
                </label>
                <span className="font-label-caps text-label-caps text-text-dark-secondary">
                  1 crate = {EGGS_PER_CRATE} eggs ({TRAYS_PER_CRATE} trays)
                </span>
              </div>

              <div className="flex items-end gap-8 mb-4">
                <div>
                  <div className="font-metric-display text-metric-display text-primary-container font-bold leading-none">
                    {fmt(crates)}
                  </div>
                  <div className="font-label-caps text-label-caps text-text-dark-secondary mt-1">
                    Crates
                  </div>
                </div>
                <div>
                  <div className="font-metric-display text-3xl text-surface-cream font-bold leading-none">
                    {fmt(eggs)}
                  </div>
                  <div className="font-label-caps text-label-caps text-text-dark-secondary mt-1">
                    Individual Eggs
                  </div>
                </div>
              </div>

              <input
                id="volumeSlider"
                type="range"
                min={20}
                max={1000}
                step={10}
                value={crates}
                onChange={(e) => setCrates(Number(e.target.value))}
                className="custom-slider w-full"
              />
              <div className="flex justify-between font-label-caps text-label-caps text-text-dark-secondary mt-2">
                <span>20 Crates</span>
                <span>1,000+ (Full Truck)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="font-label-caps text-label-caps text-text-dark-secondary">
                  Quick select:
                </span>
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCrates(p)}
                    className={`rounded-md px-3 py-1.5 font-label-caps text-label-caps border transition-colors ${
                      crates === p
                        ? "bg-primary-container text-on-surface border-primary-container"
                        : "border-secondary/30 text-text-dark-secondary hover:border-accent-gold"
                    }`}
                  >
                    {p === 1000 ? "1,000 (FTL)" : p}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: cadence */}
            <fieldset className="mb-8">
              <legend className="font-label-md text-label-md text-surface-cream mb-3">
                3. Delivery Cadence
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CADENCES.map((c) => {
                  const active = cadence === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCadence(c.value)}
                      aria-pressed={active}
                      className={`rounded-lg border px-4 py-3 font-label-md text-label-md transition-all ${
                        active
                          ? "border-primary-container bg-primary-container/10 text-surface-cream"
                          : "border-secondary/30 text-text-dark-secondary hover:border-accent-gold"
                      }`}
                    >
                      {c.value}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Live summary */}
            <div className="rounded-xl border border-primary-container/30 bg-inverse-surface/50 p-5">
              <div className="font-label-caps text-label-caps text-accent-gold mb-4">
                CALCULATED COMMERCIAL BALLPARK
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Sym name="loyalty" className="text-primary-container" />
                <span className="font-label-md text-label-md text-surface-cream font-bold">
                  {tier}
                </span>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-body-sm text-body-sm">
                <div>
                  <dt className="font-label-caps text-label-caps text-text-dark-secondary">
                    Total Consignment
                  </dt>
                  <dd className="text-surface-cream mt-1">{fmt(eggs)} eggs</dd>
                  <dd className="text-text-dark-secondary">{fmt(trays)} molded trays</dd>
                </div>
                <div>
                  <dt className="font-label-caps text-label-caps text-text-dark-secondary">
                    Fleet Logistics
                  </dt>
                  <dd className="text-surface-cream mt-1">{fleet}</dd>
                  <dd className="text-text-dark-secondary flex items-center gap-1">
                    <Sym name="ac_unit" className="text-xs" /> Cold-chain maintained
                  </dd>
                </div>
                <div>
                  <dt className="font-label-caps text-label-caps text-text-dark-secondary">
                    Contract Index
                  </dt>
                  <dd className="text-surface-cream mt-1">{rate}</dd>
                  <dd className="text-text-dark-secondary">Tiered wholesale</dd>
                </div>
              </dl>
              <p className="font-body-sm text-body-sm text-text-dark-secondary/80 mt-4">
                Indicative configuration only — final pricing is confirmed on your
                official rate sheet.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setApplied(true);
                document
                  .getElementById("procurement-form")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="mt-6 w-full group inline-flex items-center justify-center gap-2 bg-primary-container text-on-surface font-label-md text-label-md font-bold px-space-lg py-3.5 rounded-lg hover:-translate-y-0.5 hover:shadow-aura active:scale-95 transition-all duration-200"
            >
              <span>Apply Configured Volume to Procurement Form</span>
              <Sym
                name="arrow_downward"
                className="text-base transition-transform duration-200 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Procurement form */}
          <div
            id="procurement-form"
            className="lg:col-span-5 bg-surface-dark-card rounded-2xl border border-secondary/30 p-6 sm:p-8 h-fit lg:sticky lg:top-28"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-headline-sm text-headline-sm text-surface-cream font-bold">
                Quick Procurement Form
              </h3>
              <span className="font-label-caps text-label-caps text-accent-gold">
                Farm Direct
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-text-dark-secondary mb-6">
              Share your contact details and we&apos;ll send a firm commercial rate
              sheet and dispatch schedule.
            </p>

            {status === "done" ? (
              <div className="rounded-xl border border-primary-container/40 bg-primary-container/10 p-6 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary-container text-on-surface">
                  <Sym name="check" />
                </span>
                <h4 className="font-headline-sm text-headline-sm text-surface-cream font-bold mt-4">
                  Enquiry received.
                </h4>
                <p className="font-body-sm text-body-sm text-text-dark-secondary mt-2">
                  Our farm sales desk will come back to you with a commercial rate
                  sheet.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-5 font-label-md text-label-md text-accent-gold hover:text-primary-container transition-colors"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
                {/* Honeypot */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label>
                    Leave empty
                    <input name="company_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="q-name"
                    className="block font-label-md text-label-md text-surface-cream mb-1.5"
                  >
                    Procurement contact name *
                  </label>
                  <input id="q-name" name="name" required className={darkField} />
                </div>

                <div>
                  <label
                    htmlFor="q-business"
                    className="block font-label-md text-label-md text-surface-cream mb-1.5"
                  >
                    Business name *
                  </label>
                  <input
                    id="q-business"
                    name="businessName"
                    required
                    className={darkField}
                  />
                </div>

                <div>
                  <label
                    htmlFor="q-type"
                    className="block font-label-md text-label-md text-surface-cream mb-1.5"
                  >
                    Business type *
                  </label>
                  <select
                    id="q-type"
                    name="businessType"
                    required
                    defaultValue=""
                    className={darkField}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t.value} value={t.value} className="text-on-surface">
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="q-city"
                    className="block font-label-md text-label-md text-surface-cream mb-1.5"
                  >
                    Delivery city / pin code *
                  </label>
                  <input id="q-city" name="city" required className={darkField} />
                </div>

                <div>
                  <label
                    htmlFor="q-phone"
                    className="block font-label-md text-label-md text-surface-cream mb-1.5"
                  >
                    Procurement manager phone *
                  </label>
                  <input
                    id="q-phone"
                    name="phone"
                    type="tel"
                    required
                    className={darkField}
                  />
                </div>

                <div>
                  <label
                    htmlFor="q-email"
                    className="block font-label-md text-label-md text-surface-cream mb-1.5"
                  >
                    Email (optional)
                  </label>
                  <input id="q-email" name="email" type="email" className={darkField} />
                </div>

                {/* Configured volume readout */}
                <div
                  className={`rounded-lg border p-4 transition-colors ${
                    applied
                      ? "border-primary-container/60 bg-primary-container/10"
                      : "border-secondary/30 bg-inverse-surface/40"
                  }`}
                >
                  <div className="font-label-caps text-label-caps text-accent-gold mb-2">
                    CONFIGURED ORDER
                  </div>
                  <div className="font-body-sm text-body-sm text-surface-cream">
                    {fmt(crates)} crates · {fmt(eggs)} eggs
                  </div>
                  <div className="font-body-sm text-body-sm text-text-dark-secondary">
                    Grade {grade} · {cadence}
                  </div>
                </div>

                {status === "error" ? (
                  <p className="rounded-lg bg-error/15 border border-error/40 px-4 py-3 font-body-sm text-body-sm text-surface-cream">
                    {errorMsg || "Something went wrong."} Please try again or call the
                    farm sales desk.
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full group inline-flex items-center justify-center gap-2 bg-primary-container text-on-surface font-label-md text-label-md font-bold px-space-lg py-3.5 rounded-lg hover:-translate-y-0.5 hover:shadow-aura active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
                >
                  <span>
                    {status === "sending"
                      ? "Sending…"
                      : "Request Firm Commercial Rate Sheet"}
                  </span>
                  <Sym
                    name="arrow_forward"
                    className="text-base transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1 font-label-caps text-label-caps text-text-dark-secondary">
                  <span className="flex items-center gap-1.5">
                    <Sym name="schedule" className="text-sm text-accent-gold" />
                    Fast response
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sym name="lock" className="text-sm text-accent-gold" />
                    Details kept private
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
