import Image from "next/image";
import { Sym } from "@/components/ui/Sym";

const benefits = [
  {
    icon: "search_off",
    tone: "olive" as const,
    title: "Farm-Fresh Supply",
    body: "Direct from our biosecure layer sheds to your receiving dock within 24 hours of lay.",
  },
  {
    icon: "tune",
    tone: "yellow" as const,
    title: "Consistent Grading",
    body: "Strict electronic calibration ensuring exact weight tiers: Medium, Large, and Extra Large.",
  },
  {
    icon: "inventory_2",
    tone: "olive" as const,
    title: "Bulk-Ready Packaging",
    body: "Heavy-duty 30-egg molded pulp trays stacked inside commercial shock-absorbing crates.",
  },
  {
    icon: "local_shipping",
    tone: "yellow" as const,
    title: "Dependable Dispatch",
    body: "Predictable, punctually scheduled fleet logistics customized for active commercial kitchens.",
  },
  {
    icon: "sanitizer",
    tone: "olive" as const,
    title: "Quality-Focused Handling",
    body: "Rigorous disinfection, automated candling inspection, and continuous temperature monitoring.",
  },
  {
    icon: "autorenew",
    tone: "yellow" as const,
    title: "Built for Recurring Orders",
    body: "Guaranteed contractual supply quotas with seamless standing delivery schedules.",
  },
];

export function FarmFresh() {
  return (
    <section className="py-space-2xl md:py-space-3xl bg-surface-cream" id="farm">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Yellow framed farm visual */}
          <div className="lg:col-span-5 reveal">
            <div className="relative p-6 sm:p-8 bg-primary-container rounded-[36px] shadow-lift">
              <div className="relative h-[440px] w-full rounded-[24px] overflow-hidden bg-surface-dark-card">
                <Image
                  src="/design/layer-house-interior.jpg"
                  alt="Interior of Vardaan's layer house: a long central aisle flanked by multi-tier cage rows of white laying hens, with rows of fresh white eggs in the collection channels"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-secondary/15" />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 px-2">
                <div className="text-on-surface font-headline-sm text-headline-sm font-bold">
                  100% Traceable Origin
                </div>
                <span className="px-3 py-1 bg-surface-cream text-secondary font-label-caps text-label-caps rounded-full border border-secondary/20">
                  ISO Level Cleanliness
                </span>
              </div>
            </div>
          </div>

          {/* Heading + benefit grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="reveal">
              <span className="font-label-caps text-label-caps text-secondary">
                UNCOMPROMISING COMMERCIAL EXCELLENCE
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mt-2">
                Direct from Our Layer Farm
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 max-w-2xl">
                We eliminate intermediary traders, multiple storage stops, and stock
                aging. Your bulk egg orders are harvested, weighed, graded, and placed
                in wholesale packaging within hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="reveal bg-surface-offwhite p-5 rounded-xl egg-border shadow-ambient"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                      b.tone === "olive"
                        ? "bg-tertiary-container/40 text-tertiary"
                        : "bg-primary-container/40 text-on-surface"
                    }`}
                  >
                    <Sym name={b.icon} />
                  </div>
                  <h3 className="font-headline-sm text-base text-on-surface font-semibold mb-1">
                    {b.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
