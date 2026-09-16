import Image from "next/image";
import { Sym } from "@/components/ui/Sym";

type Pillar = { n: string; icon: string; title: string; body: string };

const leftPillars: Pillar[] = [
  {
    n: "PILLAR 01",
    icon: "verified_user",
    title: "Guaranteed Supply Continuity",
    body: "Never run out during weekend surges or peak hospitality seasons with our buffered stock reserves.",
  },
  {
    n: "PILLAR 02",
    icon: "location_on",
    title: "Farm-Direct Origin",
    body: "100% traceable to our owned, biosecure, climate-controlled layer sheds with veterinary oversight.",
  },
  {
    n: "PILLAR 03",
    icon: "gradient",
    title: "Batch-to-Batch Consistency",
    body: "Calibrated nutrition delivers uniform shell calcium density, deep rich yolk pigmentation, and firm albumens.",
  },
];

const rightPillars: Pillar[] = [
  {
    n: "PILLAR 04",
    icon: "domain",
    title: "High Commercial Capacity",
    body: "Scalable purchase orders effortlessly handled — from 50 crates weekly to recurring daily truckloads.",
  },
  {
    n: "PILLAR 05",
    icon: "package_2",
    title: "B2B Wholesale Packaging",
    body: "Engineered virgin fiber trays ensure interlocking vertical stacking and sub-0.5% transport breakage.",
  },
  {
    n: "PILLAR 06",
    icon: "receipt_long",
    title: "Transparent Pricing",
    body: "Clear commercial tiering based on contracted volumes with zero hidden freight surcharges.",
  },
];

function PillarCard({ p }: { p: Pillar }) {
  return (
    <div className="reveal bg-surface-cream p-6 rounded-2xl egg-border shadow-ambient hover:-translate-y-1 transition-transform duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-label-caps text-label-caps text-secondary font-bold">
          {p.n}
        </span>
        <Sym name={p.icon} className="text-secondary" />
      </div>
      <h3 className="font-headline-sm text-lg text-on-surface font-bold mb-2">
        {p.title}
      </h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant">{p.body}</p>
    </div>
  );
}

export function WhyVardaan() {
  return (
    <section className="py-space-2xl md:py-space-3xl bg-surface-offwhite border-y egg-border overflow-hidden">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="font-label-caps text-label-caps text-secondary">
            THE VARDAAN ADVANTAGE
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mt-2">
            Why businesses choose a dependable egg supplier.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            In food service and wholesale distribution, a missed morning delivery or
            cracked batch directly hurts your bottom line. We engineer reliability into
            every single crate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-6">
            {leftPillars.map((p) => (
              <PillarCard key={p.n} p={p} />
            ))}
          </div>

          {/* Central egg halo */}
          <div className="lg:col-span-4 flex justify-center py-6">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-primary-container/25 animate-sunrise-glow"
              />
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full border-2 border-dashed border-secondary/30"
              />
              <div className="relative w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 rounded-full overflow-hidden shadow-lift border-4 border-surface-offwhite">
                <Image
                  src="/design/eggs-closeup.jpg"
                  alt="Farm-fresh eggs showing smooth shell texture and consistent oval grading"
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 bg-on-surface text-primary-container px-4 py-1.5 rounded-full font-label-caps text-label-caps shadow-lift flex items-center gap-1.5 border border-primary-container/30">
                <Sym name="star" filled className="text-sm" />
                <span>Calibrated Grade-A Spec</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {rightPillars.map((p) => (
              <PillarCard key={p.n} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
