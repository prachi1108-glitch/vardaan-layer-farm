import Link from "next/link";
import { Icon } from "@/components/icons";
import { segments } from "@/lib/content";

/**
 * "Who we supply" cards. Each links to the quote form with the business type
 * pre-selected (Doc 05 §4.1 #5).
 */
export function SegmentCards({ detail = false }: { detail?: boolean }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {segments.map((s, i) => {
        const I = Icon[s.icon];
        return (
          <li key={s.type} className="reveal" style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
            <Link
              href={`/contact?type=${s.type}#quote`}
              data-quote
              className="group flex h-full flex-col rounded-[20px] bg-white p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-oat text-clay">
                <I className="h-6 w-6" />
              </span>
              <h3 className="t-h3 mt-5 text-cocoa">{s.title}</h3>
              <p className="mt-2 flex-1 text-[15px] text-pebble">{detail ? s.benefit : s.line}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-clay">
                Get a quote <Icon.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
