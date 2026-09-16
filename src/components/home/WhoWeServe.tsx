import Link from "next/link";
import { Sym } from "@/components/ui/Sym";
import { enquiryHref } from "@/lib/site";

const segments = [
  {
    icon: "hotel",
    title: "Hotels & Resorts",
    body: "Ensure flawless morning breakfast buffets and pastry operations with standardized egg weight and spotless aesthetic cleanliness.",
    meta: "Standard 30-Tray Crates",
  },
  {
    icon: "restaurant",
    title: "Restaurants & Cafes",
    body: "Consistent yolk density and high albumen structure essential for delicate hollandaise, artisan soufflés, and high-heat wok frying.",
    meta: "Bi-Weekly Morning Delivery",
  },
  {
    icon: "storefront",
    title: "Retailers & Kirana Stores",
    body: "Fast-moving 30-egg consumer trays packed in clean, eye-catching pulp cartons that display cleanly on supermarket and storefront shelves.",
    meta: "High-Turnover Consignments",
  },
  {
    icon: "local_shipping",
    title: "Distributors & Wholesalers",
    body: "Full truckload rates, certified weighbridge receipts, and direct loading bays optimized for rapid pallet-to-pallet transfer.",
    meta: "Consignment-Tier Pricing",
  },
  {
    icon: "outdoor_grill",
    title: "Commercial Caterers & Banquets",
    body: "High-volume weekend delivery surges timed exactly around wedding itineraries, corporate seminars, and festival catering batches.",
    meta: "Flexible Surge Orders",
  },
  {
    icon: "corporate_fare",
    title: "Institutional & Bulk Kitchens",
    body: "Documented hygiene and handling standards for hospital diets, industrial canteens, university dining halls, and institutional procurement.",
    meta: "Audited Compliance Packs",
  },
];

export function WhoWeServe() {
  return (
    <section className="py-space-2xl md:py-space-3xl bg-surface-cream" id="who-we-serve">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal">
          <div>
            <span className="font-label-caps text-label-caps text-secondary">
              TARGETED COMMERCIAL CLIENTELE
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold mt-2">
              Built for businesses that can&apos;t afford to run short.
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Whether you manage high-volume hotel banqueting, retail FMCG supply, or
            regional wholesale channels, we match your operational pace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((s) => (
            <Link
              key={s.title}
              href={enquiryHref}
              className="reveal bg-surface-offwhite p-space-xl rounded-[20px] egg-border shadow-ambient hover:shadow-lift transition-all group block"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-cream text-secondary flex items-center justify-center mb-5 group-hover:bg-primary-container group-hover:text-on-surface transition-colors">
                <Sym name={s.icon} />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">
                {s.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {s.body}
              </p>
              <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between font-label-caps text-label-caps text-secondary">
                <span>{s.meta}</span>
                <Sym
                  name="east"
                  className="text-sm transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
