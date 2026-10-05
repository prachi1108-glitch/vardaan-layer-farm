import { comparisonRows, reasons, segments, steps } from "./content";
import { getContact, getFaqs, getGrades, getPosts } from "./cms";
import { site } from "./site";

/**
 * /llms.txt and /llms-full.txt (PRD §5.5) — a plain-markdown summary for AI
 * answer engines, built from the same facts the site renders.
 */
export async function buildLlmsTxt(full: boolean): Promise<string> {
  const abs = (p: string) => new URL(p, site.url).toString();
  const [contact, posts] = await Promise.all([getContact(), getPosts({ limit: full ? 200 : 20 })]);
  const areas = contact.areasServed.length ? contact.areasServed.join(", ") : `${site.contact.locality}, ${site.contact.region}`;

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Key facts:",
    "- Product: white table eggs only (no live birds, meat or hatchery stock).",
    `- Grades: ${site.grades.join(", ")}. Graded by weight on site.`,
    "- Packaging: 30-egg moulded pulp trays; larger consignment units for bulk orders.",
    "- Supply: scheduled contracts (daily, weekly, custom roster), custom consignments (full truckload, inter-district) and one-time event orders.",
    "- Pricing: by quote only, based on volume, grade, frequency and delivery area. No online shop.",
    `- Location: ${site.contact.locationLine}. Areas served: ${areas}.`,
    `- Contact: phone/WhatsApp ${contact.phoneDisplay}, email ${contact.email}. Quote form: ${abs("/contact#quote")}`,
    "",
    "## Pages",
    `- [Our Eggs](${abs("/our-eggs")}): grades, packaging, supply formats and how pricing works`,
    `- [The Farm](${abs("/the-farm")}): the layer farm in Sonipat and how it runs`,
    `- [Why Vardaan](${abs("/why-vardaan")}): farm-direct supply compared with traded supply`,
    `- [Contact](${abs("/contact")}): get a quote, phone, WhatsApp, email`,
    `- [FAQ](${abs("/resources/faq")}): ordering, grades, delivery, payment`,
    "",
    "## Resources",
    ...posts.docs.map((p) => `- [${p.title}](${abs(`/resources/${p.slug}`)})${p.excerpt ? `: ${p.excerpt}` : ""}`),
  ];

  if (full) {
    const [grades, faqs] = await Promise.all([getGrades(), getFaqs(undefined, 200)]);
    lines.push(
      "",
      "## Grades",
      ...(grades.length
        ? grades.map(
            (g) =>
              `- ${g.name}: ${g.weightMin || g.weightMax ? `${g.weightMin ?? ""}–${g.weightMax ?? ""} g` : "weight band on request"}${g.bestFor ? `; best for ${g.bestFor}` : ""}`,
          )
        : site.grades.map((g) => `- ${g}`)),
      "",
      "## Farm-direct vs traded supply",
      ...comparisonRows.map((r) => `- ${r.point}: Vardaan — ${r.ours}. Typical traded supply — ${r.theirs}.`),
      "",
      "## Who we supply",
      ...segments.map((s) => `- ${s.title}: ${s.benefit}`),
      "",
      "## Why buyers stay",
      ...reasons.map((r) => `- ${r.title}: ${r.body}`),
      "",
      "## How ordering works",
      ...steps.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`),
      "",
      "## FAQ",
      ...faqs.flatMap((f) => [`### ${f.question}`, f.answer, ""]),
    );
  }

  return lines.join("\n") + "\n";
}
