import Link from "next/link";
import { Icon } from "@/components/icons";
import { comparisonRows } from "@/lib/content";

/**
 * "Farm-direct, not re-sold" — a real HTML table (extractable for AEO), kept
 * strictly professional: no characters. Below 768px each row stacks.
 */
export function ComparisonTable({ rows = comparisonRows.length }: { rows?: number }) {
  const shown = comparisonRows.slice(0, rows);
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white">
      <table className="w-full border-collapse text-left text-[15px]">
        <caption className="sr-only">Vardaan Layer Farm compared with typical traded egg supply</caption>
        <thead className="hidden md:table-header-group">
          <tr>
            <th scope="col" className="w-[22%] px-6 py-4 eyebrow text-pebble">
              What changes
            </th>
            <th scope="col" className="bg-butter px-6 py-4 eyebrow text-cocoa">
              Vardaan Layer Farm
            </th>
            <th scope="col" className="px-6 py-4 eyebrow text-pebble">
              Typical traded supply
            </th>
          </tr>
        </thead>
        <tbody>
          {shown.map((r) => (
            <tr key={r.point} className="block border-t border-line md:table-row">
              <th scope="row" className="block px-6 pt-5 font-semibold text-cocoa md:table-cell md:py-5">
                {r.point}
              </th>
              <td className="block px-6 pt-2 md:table-cell md:bg-butter/25 md:py-5">
                <span className="flex items-start gap-2.5 text-cocoa">
                  <Icon.Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-clay" />
                  <span>
                    <span className="sr-only md:hidden">Vardaan: </span>
                    {r.ours}
                  </span>
                </span>
              </td>
              <td className="block px-6 pb-5 pt-2 md:table-cell md:py-5">
                <span className="flex items-start gap-2.5 text-pebble">
                  <Icon.Minus className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                  <span>
                    <span className="md:hidden">Traded: </span>
                    {r.theirs}
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SeeComparisonLink() {
  return (
    <Link
      href="/why-vardaan#compare"
      className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.06em] text-clay hover:text-clay-soft"
    >
      See full comparison <Icon.ArrowRight className="h-4 w-4" />
    </Link>
  );
}
