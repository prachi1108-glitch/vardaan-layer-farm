/**
 * Launch posts (PRD §5.6) — first drafts for the content writer and farm to
 * review. They use general, checkable industry guidance and make no claims
 * about Vardaan beyond the confirmed facts (own flock in Sonipat, white eggs,
 * on-site grading into M/L/XL, 30-egg trays, scheduled supply, pricing by quote).
 *
 * Bodies are Markdown, converted to Lexical by seed.ts. Every post links to
 * at least one money page (/our-eggs or /contact) — PRD §5.1.
 */

export type PostSeed = {
  title: string
  slug: string
  category: string // category slug
  quickAnswer: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  body: string
  faqs: { question: string; answer: string }[]
  /** Order on the Resources page (higher = newer). Dates are real publish times, never back-dated. */
  order: number
}

export const launchPosts: PostSeed[] = [
  {
    title: 'How to choose a bulk egg supplier for your hotel or restaurant',
    slug: 'choose-bulk-egg-supplier',
    category: 'buying-guides',
    metaTitle: 'How to Choose a Bulk Egg Supplier for a Hotel or Restaurant',
    metaDescription:
      'A practical checklist for hotels and restaurants choosing a bulk egg supplier: origin, grading, capacity, delivery schedule, packaging, pricing and documents.',
    excerpt:
      'Price matters, but the supplier that costs you most is the one that misses a delivery. Seven things to check before you sign a standing order.',
    quickAnswer:
      'Choose a bulk egg supplier on reliability first and price second. Check where the eggs come from, how they are graded, whether the supplier can cover your peak days, how and when they deliver, how the eggs are packed, how the price is built, and whether they invoice properly with a valid food licence.',
    order: 2,
    body: `Most kitchens change egg suppliers for the same reason: a missed delivery on a busy morning, or a consignment of mixed sizes that throws portioning off. The cheapest rate on paper rarely survives that. Here is what to check before you commit to a standing order.

## Where do the eggs actually come from?

Ask whether the supplier produces the eggs or buys them in. A layer farm that supplies directly knows the age of every egg and can tell you when it was laid. A trader pools stock from several sources, which makes freshness and consistency harder to guarantee. Neither is automatically wrong — but you should know which one you are buying from.

## How are the eggs graded?

Grading by weight is what keeps your recipes and food costing stable. Ask:

- Which grades they supply (for example Medium, Large, Extra Large)
- The weight band for each grade, in grams
- Whether grading happens before packing, so a tray holds a single grade

Our [grade and packaging guide](/our-eggs) shows how we present this information.

## Can they cover your peak, not just your average?

A supplier who can handle 40 trays on a Tuesday may struggle with 120 on a wedding Saturday. Share both numbers — your normal volume and your highest day — and ask how much notice they need for the peak.

## What does the delivery schedule look like?

For a hotel or restaurant, a fixed roster (daily, alternate days or weekly) is usually better than calling in orders. Check delivery days and time windows, who you call if something changes, and how they handle a public holiday.

## How are the eggs packed?

Moulded pulp trays of 30 are the standard for bulk supply in India. Ask whether trays are clean and rigid enough to stack, and how larger orders are consolidated for loading.

## How is the price built?

A clear quote should state the rate per tray (or per egg), the grade, the volume tier and whether freight is included. Ask how and when the rate changes — daily market swings are common in traded supply, while contracted volumes are often quoted on a steadier basis.

| What to check | Good sign | Warning sign |
| --- | --- | --- |
| Origin | Named farm, can describe its process | "We source from many places" |
| Grading | Weight bands in grams, one grade per tray | "Mixed sizes, all good quality" |
| Capacity | Asks about your peak days | Agrees to any volume instantly |
| Delivery | Fixed roster, named contact | "Call us when you need eggs" |
| Pricing | Written quote, freight stated | Verbal rate that changes weekly |
| Documents | Food licence number, proper invoices | No invoice or licence details |

## Which documents should you ask for?

At minimum: the supplier's FSSAI licence or registration number and a proper invoice for every delivery. Institutions often also need GST details and a contact for their vendor file.

## Start with a trial

Before moving your full volume, run a two- to four-week trial at your normal frequency. Track on-time deliveries, breakages and how consistent each tray is.

If you would like to compare us, [send your volume and delivery area](/contact#quote) and we will come back with a quote.`,
    faqs: [
      {
        question: 'Should I choose the cheapest egg supplier?',
        answer:
          'Not on price alone. A missed delivery or a mixed-size consignment usually costs a kitchen more than a small difference in rate. Compare reliability, grading and delivery schedule first, then price.',
      },
      {
        question: 'How long should a trial with a new egg supplier last?',
        answer:
          'Two to four weeks at your normal ordering frequency is usually enough to judge on-time delivery, breakage and consistency between trays.',
      },
      {
        question: 'What documents should an egg supplier provide?',
        answer:
          'At minimum an FSSAI licence or registration number and a proper invoice for each delivery. Institutions may also need GST details for their vendor records.',
      },
    ],
  },
  {
    title: 'Egg grades explained: Medium vs Large vs Extra Large',
    slug: 'egg-grades-explained',
    category: 'egg-quality',
    metaTitle: 'Egg Grades Explained: Medium vs Large vs Extra Large',
    metaDescription:
      'What Medium, Large and Extra Large eggs mean, why weight bands differ between countries and suppliers, and how to pick the right grade for your kitchen.',
    excerpt:
      'Egg grades are weight bands, not quality scores. What the labels mean, why they vary, and which grade suits which job.',
    quickAnswer:
      'Egg grades such as Medium, Large and Extra Large describe weight, not quality. Each grade is a band of grams per egg, and the exact bands vary between countries and suppliers. Ask your supplier for their bands in grams, then choose the grade that matches how you use eggs: baking and mixes, plated breakfast, or display.',
    order: 4,
    body: `"Large" sounds like a promise, but on its own it tells you very little. An egg grade is a **weight band** — a range of grams that every egg in the tray falls into. Two suppliers can both sell "Large" and mean different things.

## What does an egg grade measure?

Weight per egg. Grading machines or manual scales sort eggs into bands so that a tray holds eggs of a similar size. Grade is separate from freshness, shell colour or yolk colour.

## Why do the bands differ?

There is no single worldwide standard. The European Union, for example, uses these bands:

| EU grade | Weight per egg |
| --- | --- |
| Small (S) | under 53 g |
| Medium (M) | 53 g to under 63 g |
| Large (L) | 63 g to under 73 g |
| Extra Large (XL) | 73 g and over |

Bands used in India are typically lighter, because flocks, breeds and buyer expectations differ, and they vary between suppliers. That is why you should always **ask for the bands in grams** rather than relying on the label. We list ours on the [Our Eggs page](/our-eggs).

## How do I work out the weight of a tray?

Multiply the average egg weight by 30, then add the tray itself (a moulded pulp tray adds a little weight on top). For example, eggs averaging 55 g give about 1.65 kg of egg per tray. This matters if you cost recipes by weight or buy for a production line.

## Which grade should my kitchen buy?

| Use | Usually suits | Why |
| --- | --- | --- |
| Baking, batters, sauces | Medium | Recipes are scaled by count; consistency matters more than size |
| Plated breakfast, omelettes | Large | Looks generous on the plate, predictable portion |
| Buffets and display | Extra Large | Visual impact; fewer eggs to handle per kilo |
| Retail trays | Medium or Large | Depends on what your customers expect |

## Can I mix grades?

Yes — many kitchens buy Large for the breakfast service and Medium for the pastry section. Ask for each tray to hold a single grade so the line knows what it is using.

## What matters more than the label

Consistency. A supplier who grades every egg before packing gives you trays where the eggs genuinely match, batch after batch — that is what keeps portion costs stable.

Not sure which grade fits your menu? [Tell us how you use eggs](/contact#quote) and we will suggest one.`,
    faqs: [
      {
        question: 'Is an Extra Large egg better quality than a Medium egg?',
        answer:
          'No. Grades describe weight only. Freshness and quality depend on the flock, handling and storage, not on the size band.',
      },
      {
        question: 'How many grams is a Large egg in India?',
        answer:
          'It depends on the supplier, because Indian trade bands are not uniform. Ask for the weight band in grams for each grade before you order.',
      },
      {
        question: 'How many eggs are in a tray?',
        answer: 'A standard bulk tray in India holds 30 eggs.',
      },
    ],
  },
  {
    title: 'Farm-direct vs traded eggs: what changes for your kitchen',
    slug: 'farm-direct-vs-traded-eggs',
    category: 'buying-guides',
    metaTitle: 'Farm-Direct vs Traded Eggs: What Changes for Your Kitchen',
    metaDescription:
      'How eggs bought directly from a layer farm differ from traded supply in origin, freshness, grading, packaging, reliability and pricing.',
    excerpt:
      'Most bulk eggs pass through several hands before they reach a kitchen. Here is what changes when they come straight from the farm.',
    quickAnswer:
      'Farm-direct eggs come from one known flock and are graded and packed where they are laid, then delivered on a schedule. Traded eggs are usually pooled from several sources and pass through storage on the way. For a kitchen, farm-direct supply typically means more consistent sizing, clearer origin, fewer handling steps and a steadier delivery roster.',
    order: 6,
    body: `In much of India, bulk eggs reach kitchens through a chain: farm, aggregator, wholesaler, sometimes a local distributor. Each link can add value — but each one also adds handling, storage time and uncertainty about where the eggs came from.

## What is "traded" egg supply?

A trader buys eggs from several farms or markets and resells them. That makes it easy to source large volumes quickly, but a single consignment can contain eggs from different flocks, laid on different days and graded to different standards.

## What is "farm-direct" supply?

The farm that keeps the hens also grades, packs and dispatches the eggs to you. You deal with the producer, not an intermediary.

## What actually changes?

| | Farm-direct | Typical traded supply |
| --- | --- | --- |
| Origin | One known flock | Pooled from several sources |
| Time to your dock | Packed and sent from the farm | Often passes through storage stops |
| Grading | Graded once, at source | Mixed sizes can occur within a consignment |
| Packaging | Packed once by the producer | Trays may be re-packed or re-used |
| Supply | Standing schedule from the producer | Depends on what the trader can buy that week |
| Pricing | Quoted against your volume | Often follows daily market rates |

## Does farm-direct always cost more?

Not necessarily. Removing intermediaries removes their margin too. What changes is how the price is set: a farm quoting against a contracted volume is planning its own production around you, which tends to make the rate steadier.

## When does traded supply make sense?

If you need eggs at very short notice, in a place the farm does not deliver to, or in tiny one-off quantities, a local trader can be practical. For a steady weekly requirement, buying direct usually gives you more control.

## What should you ask a farm-direct supplier?

Whether they produce all the eggs they sell, how they grade, what their delivery roster looks like and how much notice they need for peaks. Our [how-to-choose checklist](/resources/choose-bulk-egg-supplier) covers the full list.

At Vardaan, eggs come from our own flock in Sonipat, are graded on the farm and are dispatched on a schedule. [See the full comparison](/why-vardaan#compare) or [request a quote](/contact#quote).`,
    faqs: [
      {
        question: 'What does farm-direct eggs mean?',
        answer:
          'The eggs are supplied by the farm that produces them, without traders or wholesalers in between. The farm grades, packs and delivers the eggs itself.',
      },
      {
        question: 'Are farm-direct eggs fresher?',
        answer:
          'They usually pass through fewer handling and storage steps, which shortens the time between laying and delivery. Ask any supplier how soon after laying they dispatch.',
      },
      {
        question: 'Is farm-direct supply only for large buyers?',
        answer:
          'No. Restaurants, retailers and caterers buy direct as well. The practical minimum depends on the farm\'s delivery routes, so share your volume and location when you enquire.',
      },
    ],
  },
  {
    title: 'How to store eggs in a commercial kitchen',
    slug: 'store-eggs-commercial-kitchen',
    category: 'kitchen-storage',
    metaTitle: 'How to Store Eggs in a Commercial Kitchen (FIFO, Cold Room)',
    metaDescription:
      'Practical egg storage for restaurants and hotels: receiving checks, cold room temperature, avoiding condensation, FIFO rotation and handling rules.',
    excerpt:
      'Receiving, cold storage, rotation and handling — a simple routine that keeps eggs safe and consistent in a busy kitchen.',
    quickAnswer:
      'Store eggs in their trays in a clean cold room or refrigerator kept at a steady temperature, ideally at or below about 5 °C, away from strong-smelling foods. Do not wash them before storing, avoid moving them between cold and warm areas, rotate stock first-in-first-out, and check every delivery for cracks and dirt before it goes into storage.',
    order: 8,
    body: `Eggs are one of the most-used ingredients in a commercial kitchen, and one of the easiest to mishandle. A simple routine — check, chill, rotate, handle cleanly — protects both food safety and quality.

## What should you check when eggs arrive?

- **Cracks and leaks.** Remove cracked or leaking eggs; do not use them for dishes served lightly cooked.
- **Clean shells.** Heavily soiled eggs should be set aside rather than stored with the rest.
- **Grade and count.** Confirm the grade and number of trays against the invoice.
- **Delivery temperature.** Note whether the eggs arrived chilled or at ambient temperature.

## What temperature should eggs be stored at?

Keep eggs in a refrigerator or cold room at a **steady** temperature, ideally at or below about 5 °C. Consistency matters as much as the number: eggs moved repeatedly between cold storage and a hot kitchen form condensation ("sweating") on the shell, which can help bacteria move through it.

If eggs are delivered at ambient temperature, chill them promptly and keep them chilled from then on.

## Should you wash eggs before storing them?

No. Washing removes the egg's natural protective coating (the cuticle) and wet shells let bacteria through more easily. If an egg is dirty, set it aside; if you must clean one, do it immediately before use.

## How should eggs be arranged in storage?

- Keep them in their original trays, pointed end down
- Store away from fish, onions and other strong-smelling foods — shells are porous
- Keep them on a shelf below ready-to-eat foods and away from the door, where temperature swings most
- Label each stack with its delivery date

## How do you rotate egg stock?

Use **first-in, first-out (FIFO)**: new deliveries go behind or below older stock, and the line always takes from the oldest dated stack. A regular delivery roster helps here — smaller, more frequent deliveries keep less stock waiting.

| Routine | Who | When |
| --- | --- | --- |
| Receiving check (cracks, dirt, count) | Receiving staff | Every delivery |
| Date-label stacks | Receiving staff | Every delivery |
| Cold room temperature log | Kitchen supervisor | At least twice a day |
| FIFO check | Section chef | Daily |
| Discard cracked or expired stock | Kitchen supervisor | Daily |

## How should staff handle eggs on the line?

- Take out only what the section needs for the next part of service
- Wash hands after handling raw shells
- Do not crack eggs over the edge of a bowl used for other ingredients
- For dishes served soft or raw, use the freshest stock and follow your food safety plan

## Plan deliveries around your storage

How much cold storage you have should shape how often you take deliveries. If space is tight, a more frequent roster is better than a large weekly drop. [Tell us your storage and usage](/contact#quote) and we can suggest a delivery pattern. See also our guide to [egg grades](/resources/egg-grades-explained).`,
    faqs: [
      {
        question: 'Should eggs be refrigerated in a restaurant?',
        answer:
          'Yes. Keep eggs in a refrigerator or cold room at a steady temperature, ideally at or below about 5 °C, and avoid moving them back and forth between cold and warm areas.',
      },
      {
        question: 'Why should you not wash eggs before storing them?',
        answer:
          'Washing removes the natural protective coating on the shell and wet shells let bacteria pass through more easily. Set dirty eggs aside instead.',
      },
      {
        question: 'What is FIFO for eggs?',
        answer:
          'First-in, first-out: use the oldest stock first by placing new deliveries behind older trays and labelling every stack with its delivery date.',
      },
    ],
  },
  {
    title: 'Planning egg volumes for wedding season catering',
    slug: 'egg-volumes-wedding-season',
    category: 'industry',
    metaTitle: 'How Many Eggs for a Wedding? Planning Catering Volumes',
    metaDescription:
      'A simple method for caterers to estimate egg volumes for weddings and events, with a worked example and tips for booking supply in peak season.',
    excerpt:
      'Wedding dates cluster, and so does demand for eggs. A simple way to estimate volumes per event — and why booking early matters.',
    quickAnswer:
      'Estimate egg volume per event by listing every dish that uses eggs, multiplying eggs per portion by expected portions, then adding a buffer of around 10% for breakage and second helpings. Divide by 30 to get trays. In peak wedding season, share your event dates with your supplier weeks ahead so volumes can be planned.',
    order: 10,
    body: `Wedding dates in North India cluster around auspicious days, and the cooler months are especially busy. For caterers, that means several large events on the same weekend — and a supplier who is being asked for extra eggs by everyone at once.

## How do you estimate eggs for an event?

Work dish by dish:

1. List every dish on the menu that uses eggs — including bakery items and batters.
2. Estimate eggs per portion for each dish.
3. Multiply by the number of portions you expect to serve (not just the guest count — popular dishes get more than one serving per guest).
4. Add a buffer of around 10% for breakage, testing and second helpings.
5. Divide by 30 to get trays.

## A worked example

These figures are **illustrative assumptions** for a 500-guest event — replace them with your own recipes and service history.

| Dish | Eggs per portion | Portions | Eggs |
| --- | --- | --- | --- |
| Breakfast egg station (next morning) | 2 | 200 | 400 |
| Egg curry | 1 | 300 | 300 |
| Cakes and pastries | 0.5 | 500 | 250 |
| Batters and coatings | 0.2 | 500 | 100 |
| **Subtotal** | | | **1,050** |
| Buffer (10%) | | | 105 |
| **Total** | | | **1,155 eggs ≈ 39 trays** |

## When should you book egg supply?

As soon as event dates are confirmed. A supplier planning production can only meet peaks it knows about. Share:

- Each event date and delivery time
- Estimated trays per event and the grade
- Delivery address and any access restrictions at the venue

## Should you take one delivery or several?

For back-to-back events, split deliveries so eggs arrive close to when they are used. This keeps stock fresher and reduces the cold storage you need at the venue — see our [storage guide](/resources/store-eggs-commercial-kitchen).

## What if numbers change late?

Agree with your supplier how much notice they need for an increase. Small increases are usually easier than large ones close to the date.

Planning the season ahead? [Send your event dates and volumes](/contact#quote) with "One-time" as the frequency and we will confirm what we can supply.`,
    faqs: [
      {
        question: 'How many eggs do I need for a wedding of 500 guests?',
        answer:
          'It depends entirely on the menu. List each egg dish, multiply eggs per portion by expected portions, add about 10% buffer and divide by 30 for trays. A menu with a breakfast station and baking might need well over a thousand eggs.',
      },
      {
        question: 'How early should caterers book eggs for wedding season?',
        answer:
          'As soon as event dates are confirmed. Sharing dates weeks ahead lets the supplier plan volumes for peak weekends.',
      },
      {
        question: 'How many eggs are in a tray?',
        answer: 'A standard bulk tray holds 30 eggs.',
      },
    ],
  },
  {
    title: 'What happens at a layer farm: from collection to your dock',
    slug: 'layer-farm-collection-to-dock',
    category: 'farm-life',
    metaTitle: 'What Happens at a Layer Farm: From Collection to Your Dock',
    metaDescription:
      'How table eggs move through a layer farm — collection, inspection, weighing and grading, packing into 30-egg trays and dispatch — explained for business buyers.',
    excerpt:
      'Collection, grading, packing and dispatch — the journey an egg takes before it reaches your kitchen, explained step by step.',
    quickAnswer:
      'At a layer farm, eggs are collected from the laying houses every day, checked for cracks and dirt, weighed and sorted into grades, packed into 30-egg trays and loaded for dispatch. When the same farm does every step, there are fewer handling stages between the hen and your kitchen.',
    order: 12,
    body: `A layer farm keeps hens for egg production (as opposed to broiler farms, which raise chickens for meat). Here is what happens between an egg being laid and a tray arriving at your kitchen.

## What is a layer house?

The building where the laying hens live. It is set up so that feed, water and lighting are managed for the flock, and so that eggs can be collected cleanly and regularly.

## How are eggs collected?

Eggs are collected every day — often more than once — so they spend as little time as possible in the house. Regular collection keeps shells cleaner and is the first step in freshness.

## What checks happen after collection?

Eggs are inspected and anything unsuitable is removed: cracked, misshapen or heavily soiled eggs do not go into table-egg trays.

## How are eggs graded?

Each egg is weighed and sorted into a grade — for example Medium, Large or Extra Large. Grading at the farm means each tray holds eggs of a similar size. Read more in [egg grades explained](/resources/egg-grades-explained).

## How are eggs packed?

Graded eggs are placed in moulded pulp trays of 30, pointed end down. Trays interlock so they can be stacked, and larger orders are consolidated into bigger consignment units for loading.

## How are eggs dispatched?

Orders are loaded according to the delivery roster — daily, weekly or on a custom schedule — so each customer receives a predictable volume at a predictable time.

| Step | What happens | Why it matters to you |
| --- | --- | --- |
| Collection | Eggs gathered from the layer house daily | Freshness starts here |
| Inspection | Cracked and dirty eggs removed | Fewer rejects at your dock |
| Grading | Weighed and sorted by size | Consistent portions and costing |
| Packing | 30-egg moulded pulp trays | Stackable, protected in transit |
| Dispatch | Loaded to your delivery roster | Supply you can plan around |

## Why does it matter who does each step?

Every time eggs change hands — to an aggregator, a wholesaler, a cold store — they are handled and stored again. When one farm does every step, the chain is shorter and the farm is accountable for the whole journey.

That is how we work at Vardaan: our own flock in Sonipat, graded and packed on the farm, dispatched on a schedule. [See how the farm runs](/the-farm) or [get a quote](/contact#quote).`,
    faqs: [
      {
        question: 'What is a layer farm?',
        answer:
          'A poultry farm that keeps hens for egg production. Broiler farms, by contrast, raise chickens for meat.',
      },
      {
        question: 'How often are eggs collected on a layer farm?',
        answer: 'Every day, and often more than once a day, so that eggs spend as little time as possible in the layer house.',
      },
      {
        question: 'Why are eggs packed pointed end down?',
        answer:
          'The air cell sits at the broad end. Packing pointed end down keeps the air cell at the top and the yolk better centred during storage.',
      },
    ],
  },
]
