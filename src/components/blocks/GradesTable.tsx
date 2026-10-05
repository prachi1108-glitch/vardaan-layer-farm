import type { Grade } from "@/lib/cms";

/**
 * Grades & sizing spec table (PRD FR-4.1) — a clean data sheet: Inter 15px,
 * Linen dividers, Butter header, no characters. Unconfirmed weights render as
 * "To be confirmed" rather than a guessed number.
 */
const FALLBACK: Grade[] = [
  { id: "m", name: "Medium", bestFor: "Baking, institutional kitchens, everyday cooking" },
  { id: "l", name: "Large", bestFor: "Restaurants, hotel breakfast, retail trays" },
  { id: "xl", name: "Extra Large", bestFor: "Buffets, premium breakfast, display" },
];

function band(g: Grade) {
  if (g.weightMin && g.weightMax) return `${g.weightMin}–${g.weightMax} g`;
  if (g.weightMin) return `${g.weightMin} g and above`;
  if (g.weightMax) return `Up to ${g.weightMax} g`;
  return null;
}

export function GradesTable({ grades }: { grades: Grade[] }) {
  const rows = grades.length ? grades : FALLBACK;
  const tbc = <span className="text-pebble">To be confirmed</span>;
  return (
    <div className="overflow-x-auto rounded-[20px] border border-line bg-white">
      <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
        <caption className="sr-only">White table egg grades, weight bands and uses</caption>
        <thead>
          <tr className="bg-butter">
            {["Grade", "Weight band (per egg)", "Best for", "30-egg tray weight"].map((h) => (
              <th key={h} scope="col" className="px-6 py-4 font-semibold text-cocoa">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((g) => (
            <tr key={g.id} className="border-t border-line">
              <th scope="row" className="px-6 py-4 font-semibold text-cocoa">
                {g.name}
              </th>
              <td className="px-6 py-4 tabular-nums text-cocoa">{band(g) ?? tbc}</td>
              <td className="px-6 py-4 text-cocoa">{g.bestFor || tbc}</td>
              <td className="px-6 py-4 tabular-nums text-cocoa">{g.trayWeight || tbc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
