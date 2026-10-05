# Phase 0 — Facts sign-off, claims audit & keyword map

*Vardaan Layer Farm website rebuild · drafted 5 Oct 2026 from Docs 01–07 (v2) and an audit of the current build (`vardaan-site`, localhost:3100).*
*Exit criterion (Doc 07): the farm owner signs off §1 and §2. Until then the site ships with every unverified item marked in code (`claims` in `src/lib/site.ts`, `verified: false`).*

---

## 1. Facts sheet — fill in and sign

| # | Fact | Current value on the new build | Status | Farm answer |
|---|---|---|---|---|
| 1 | Primary phone / WhatsApp | +91 80532 32718 | Confirmed (Doc 01) | |
| 2 | Primary email | vardaanlayerfarm@gmail.com | Confirmed (Doc 01) | |
| 3 | Location | Sonipat, Haryana | Confirmed | Full address + PIN for Google Business Profile: |
| 4 | Business hours | *not shown* | **Needed** | |
| 5 | Grade weight bands (g) | M / L / XL shown, weights marked "to be confirmed" | **Needed** | M: ___ L: ___ XL: ___ |
| 6 | Tray weight per grade | "to be confirmed" | **Needed** | |
| 7 | Minimum order quantity | "Ask us" | **Needed** | |
| 8 | Delivery areas (cities actually served) | Sonipat + "Delhi NCR — to be confirmed" | **Needed** | |
| 9 | Own vehicles or third-party transport? | not stated | **Needed** | |
| 10 | Daily / weekly capacity (a range is fine) | not shown | **Needed** | |
| 11 | Number of layer houses / flock size (optional) | not shown | Optional | |
| 12 | Year founded + founder / family story | Placeholder block on The Farm | **Needed** | |
| 13 | FSSAI licence no. | not shown | **Needed** | |
| 14 | GST no. | not shown | **Needed** | |
| 15 | Payment terms (advance / credit days) | not stated | **Needed** for FAQ | |
| 16 | Farm visits by appointment? | not stated | Yes / No | |
| 17 | Permission to name customers / use testimonials | none shown | Yes / No | |
| 18 | Domain | vardaanlayerfarm.com *(assumed)* | Confirm | |

## 2. Claims audit — current build

✅ keep · ✏️ rephrase (kept in softer form until confirmed) · ❌ removed from the new build

| Claim (where it appeared) | Verdict | What the new build says instead |
|---|---|---|
| Own flock, own layer houses, no traded stock | ✅ | — |
| Graded on site into Medium / Large / Extra Large | ✅ | — |
| 30-egg moulded pulp trays; larger consignment units | ✅ | — |
| Scheduled contracts (daily/weekly/custom) & custom consignments (truckload, inter-district) | ✅ | — |
| Pricing by quote, tiered by contracted volume | ✅ | — |
| "Eggs only — no live bird sales" | ✅ | — |
| Dispatched **within 24 h of lay** (Home, Comparison) | ✏️ verify | Shown, flagged `verify`. If not confirmed: "Dispatched on a daily schedule". |
| Quote **within four business hours** (CTA band, How it works) | ✏️ verify | Shown, flagged `verify`. Fallback: "Quote the same business day". |
| "From 50 crates weekly to recurring daily truckloads" (Why Vardaan) | ✏️ verify | Replaced with "From regular weekly orders to recurring truckloads" until numbers confirmed. |
| Biosecure, climate-controlled sheds (The Farm, Why Vardaan) | ❌ | "Our own, clean, well-run layer houses" |
| Veterinary oversight | ❌ | Dropped until confirmed |
| Buffered stock reserves | ❌ | "A standing schedule planned around your peaks" |
| Refrigerated transport (Custom consignments) | ❌ | Dropped |
| Sub-0.5% transport breakage | ❌ | "Rigid trays built for stacking and transit" |
| Engineered virgin-fibre trays | ❌ | "Moulded pulp trays" |
| Weighbridge receipts (Distributors) | ❌ | Dropped |
| Dedicated account contact + dispatch tracking (How it works step 3) | ❌ | "Scheduled deliveries begin — one number to call" |
| Calibrated flock nutrition → yolk colour / shell calcium | ✏️ | Outcome-led copy only ("consistent yolk colour batch to batch"); no nutrition claim |
| "100% traceable" | ✏️ | "Single origin — every egg is from our own flock" |
| Placeholder phone +91 90000 00000 / hello@vardaanlayerfarm.com | ❌ | Replaced everywhere with #1 and #2 above |
| Trust figures from the Sept design (50,000+ eggs daily, 250+ buyers, 15+ hubs, 10+ years) and badges (HACCP, ISO, Biosecurity Level III, Daily Lab Certified) | ❌ | Not rendered. Proof block is hidden until real figures/certificates exist (Doc 05 §4.1 #8). |

## 3. Keyword → page map (draft for research to validate)

| Page | Primary | Secondary |
|---|---|---|
| Home `/` | bulk egg supplier Sonipat | wholesale eggs Delhi NCR, egg supplier Haryana, layer farm egg supply |
| Our Eggs `/our-eggs` | white table eggs wholesale | egg grades medium large extra large, 30 egg tray bulk price, egg tray supplier |
| The Farm `/the-farm` | layer farm Sonipat | poultry egg farm Haryana, egg farm near Delhi |
| Why Vardaan `/why-vardaan` | egg supplier for hotels | egg supplier for restaurants, farm direct eggs, reliable egg supplier |
| Contact `/contact` | bulk egg order | contact egg supplier, egg wholesale quote |
| Resources | egg grades explained; how to store eggs commercial kitchen; how to choose a bulk egg supplier; egg demand wedding season | |

**Competitor scan (to do):** 5 regional suppliers + IndiaMART/JustDial listings for Sonipat, Panipat, Delhi.

## 4. AI-visibility prompt list (track monthly — Doc 04 §5.5)

1. Who supplies eggs in bulk in Sonipat?
2. Best wholesale egg supplier near Delhi NCR for hotels
3. Farm-direct egg supplier in Haryana
4. Where can a restaurant buy eggs in bulk in Delhi?
5. Egg supplier for caterers in Sonipat / Panipat
6. What are egg grades in India — medium, large, extra large weights?
7. How many eggs are in a tray in India?
8. How should a commercial kitchen store eggs?
9. Difference between farm-direct and traded eggs
10. How to choose a bulk egg supplier for a hotel
11. Minimum order for wholesale eggs in Haryana
12. Layer farms in Sonipat that supply businesses
13. Egg distributor supply from a layer farm near Panipat
14. How much egg to plan for a 500-guest wedding
15. Do layer farms deliver eggs to Gurugram hotels?
16. White eggs vs brown eggs for restaurants in India
17. FSSAI-licensed egg supplier for hospital kitchens in Haryana
18. Egg supplier with scheduled daily delivery for cloud kitchens
19. What is Vardaan Layer Farm?
20. How to get a wholesale egg quote quickly

## 5. Photo shot list (book the shoot — critical path for The Farm)

Eggs in 30-egg trays (top-down) · hands lifting a tray · grading / weighing · stacked trays on pallets · clean, well-lit layer-house interior · loading the delivery vehicle at dawn · one baby-chick macro on cream for brand moments · founder/family portrait.

---

**Sign-off:** ______________________ (farm owner) Date: __________
