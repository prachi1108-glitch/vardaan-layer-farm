import Link from "next/link";
import { Sym } from "@/components/ui/Sym";
import { enquiryHref } from "@/lib/site";

const offerings = [
  {
    icon: "scale",
    title: "Egg Grades & Sizing",
    body: "Strict weight calibration to eliminate kitchen inconsistency:",
    items: ["Medium: 45g – 52g", "Large: 53g – 60g", "Extra Large: 60g+"],
    footer: "Electronic Sizer Verified",
  },
  {
    icon: "grid_view",
    title: "Wholesale 30-Egg Trays",
    body: "Recyclable, rigid molded paper pulp trays engineered to protect eggs during rough transit and pallet movement.",
    items: ["30 eggs per tray", "12 trays / master box (360 eggs)", "Heavy stack integrity"],
    footer: "Zero Chemical Odor",
  },
  {
    icon: "calendar_month",
    title: "Scheduled Delivery Contracts",
    body: "Automated recurring delivery rosters to keep your walk-in coolers stocked without manual weekly reordering.",
    items: [
      "Daily morning delivery windows",
      "Alternate day routing",
      "Dedicated account dispatch",
    ],
    footer: "Punctual Receiving",
  },
  {
    icon: "ac_unit",
    title: "Custom Consignments",
    body: "Bulk institutional purchase orders handled with refrigerated transport units for high-volume inter-district distribution.",
    items: [
      "Temperature-controlled fleet",
      "Full batch lab certificates",
      "Custom pallet strapping",
    ],
    footer: "Cold-Chain Validated",
  },
];

export function WhatWeSupply() {
  return (
    <section
      className="py-space-2xl md:py-space-3xl bg-on-surface text-surface-cream relative overflow-hidden"
      id="what-we-supply"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
      />
      <div className="container-x relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="font-label-caps text-label-caps text-accent-gold">
            WHOLESALE SPECIFICATIONS
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface-cream font-bold mt-2">
            Fresh eggs. Supplied for business.
          </h2>
          <p className="font-body-lg text-body-lg text-text-dark-secondary mt-3">
            Designed around commercial procurement schedules, temperature controls, and
            wholesale storage requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="reveal bg-surface-dark-card p-6 rounded-2xl border border-secondary/30 hover:border-accent-gold transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center mb-5">
                  <Sym name={o.icon} className="text-2xl" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-surface-cream font-bold mb-2">
                  {o.title}
                </h3>
                <p className="font-body-sm text-body-sm text-text-dark-secondary mb-4">
                  {o.body}
                </p>
                <ul className="space-y-2 font-body-sm text-body-sm text-surface-cream/80">
                  {o.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-secondary/20 font-label-caps text-label-caps text-accent-gold">
                {o.footer}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center reveal">
          <Link
            href={enquiryHref}
            className="group inline-flex items-center justify-center gap-2 bg-primary-container text-on-surface font-label-md text-label-md font-bold px-space-xl py-3.5 rounded-lg hover:-translate-y-1 hover:shadow-aura active:scale-95 transition-all duration-200"
          >
            <span>Enquire About Supply</span>
            <Sym
              name="send"
              className="text-base transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
