import type { BusinessType } from "./site";
import { claims } from "./site";

/**
 * Page copy shared across sections, rewritten to verified claims only
 * (docs/phase-0-facts-and-content-audit.md §2). Unconfirmed operational
 * claims from the previous build — biosecure/climate-controlled sheds,
 * veterinary oversight, buffered stock, refrigerated transport, breakage
 * rates, virgin-fibre trays, weighbridge receipts, account managers and
 * dispatch tracking — are deliberately absent.
 */

export const comparisonRows = [
  {
    point: "Origin",
    ours: "Our own layer houses — one flock, single origin",
    theirs: "Pooled from several traders; origin unclear",
  },
  {
    point: "Time to your dock",
    // Unverified — see claims.freshness in site.ts.
    ours: "Dispatched within 24 hours of lay",
    theirs: "Days in transit through storage stops",
  },
  {
    point: "Grading",
    ours: "Weighed and graded on site, batch after batch",
    theirs: "Mixed sizes inside the same consignment",
  },
  {
    point: "Packaging",
    ours: "30-egg moulded pulp trays built for stacking",
    theirs: "Re-used trays, more handling",
  },
  {
    point: "Supply",
    ours: "A standing schedule you can plan around",
    theirs: "Ad-hoc availability and substitutions",
  },
  {
    point: "Pricing",
    ours: "Quoted against your volume, freight stated upfront",
    theirs: "Daily market swings plus surcharges",
  },
];

export type Segment = {
  type: BusinessType;
  title: string;
  line: string;
  benefit: string;
  icon: "Hotel" | "Utensils" | "Party" | "Store" | "Truck" | "Building";
};

export const segments: Segment[] = [
  {
    type: "hotel",
    title: "Hotels",
    icon: "Hotel",
    line: "Steady daily volume for breakfast and banqueting.",
    benefit: "Same egg weight across the buffet and the pastry section, so plating and costing stay predictable.",
  },
  {
    type: "restaurant",
    title: "Restaurants & cloud kitchens",
    icon: "Utensils",
    line: "Consistent eggs for sauces, baking and the line.",
    benefit: "Firm whites and even yolk colour batch to batch — your hollandaise and omelettes look the same every service.",
  },
  {
    type: "caterer",
    title: "Caterers",
    icon: "Party",
    line: "Surge volumes for weddings and events.",
    benefit: "Book volumes against your event dates so the weekend peak is planned, not scrambled.",
  },
  {
    type: "retailer",
    title: "Retail & kirana",
    icon: "Store",
    line: "Clean 30-egg trays that sell from the shelf.",
    benefit: "Clean shells in neat trays, delivered on a regular slot before your morning rush.",
  },
  {
    type: "distributor",
    title: "Distributors",
    icon: "Truck",
    line: "Truckload consignments, graded at source.",
    benefit: "Uniform grading at the farm means less re-sorting before eggs go out to your own customers.",
  },
  {
    type: "institution",
    title: "Institutions",
    icon: "Building",
    line: "Hospitals, hostels and canteens.",
    benefit: "A single licensed source with invoices and documentation for your procurement file.",
  },
];

export const reasons = [
  {
    title: "Supply you can plan around",
    body: "Standing delivery rosters — daily, weekly or custom — so you stop reordering by phone every few days.",
  },
  {
    title: "Single origin",
    body: "Every egg comes from our own flock in Sonipat. Nothing is bought in and re-sold under our name.",
  },
  {
    title: "Batch-to-batch consistency",
    body: "Graded by weight on site, so a tray of Large is Large all the way down — and next week's tray matches.",
  },
  {
    title: "Volume that scales with you",
    body: `${claims.capacity.text}. Tell us your peak as well as your average.`,
  },
  {
    title: "Packed for the journey",
    body: "Rigid 30-egg moulded pulp trays that interlock and stack, with larger consignment units for bulk orders.",
  },
  {
    title: "Clear pricing",
    body: "Quoted against your contracted volume, grade and delivery area, with freight stated upfront.",
  },
];

export const steps = [
  {
    title: "Tell us your requirement",
    body: "Volume (trays or eggs, per day or week), grade and the delivery area or PIN code.",
  },
  {
    title: "Get a quote in 4 business hours",
    body: "We come back with a rate and a delivery schedule that fits your kitchen or store.",
  },
  {
    title: "Regular supply begins",
    body: "Deliveries start on the agreed roster. One number to call if anything needs to change.",
  },
];

export const kitchenQualities = [
  {
    title: "Firm albumen",
    body: "Whites that hold their shape in the pan and whip to a stable foam.",
  },
  {
    title: "Deep yolk colour",
    body: "Even colour from one flock, so custards and pasta look the same every service.",
  },
  {
    title: "Strong shells",
    body: "Fewer cracks through stacking, transport and a busy prep line.",
  },
  {
    title: "Predictable weight",
    body: "Graded sizing keeps portioning, recipe scaling and food costing stable.",
  },
];

export const farmPractices = [
  {
    title: "Our own sheds",
    body: "Our hens live in our own layer houses. Nothing is bought in and re-sold under our name.",
    icon: "Home",
  },
  {
    title: "Collected daily",
    body: "Eggs are collected every day and move straight to grading and packing.",
    icon: "Sun",
  },
  {
    title: "Graded on site",
    body: "Each egg is weighed and sorted into Medium, Large or Extra Large before it is packed.",
    icon: "Scale",
  },
  {
    title: "Handled once",
    body: "Packed here and dispatched from here — fewer hands and storage stops between the shed and your dock.",
    icon: "Hand",
  },
] as const;
