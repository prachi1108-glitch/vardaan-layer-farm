import { WalkingEgg } from "@/components/characters";
import { steps } from "@/lib/content";

/**
 * How it works: 01-02-03 joined by a dotted path with little eggs walking
 * along it (Doc 05 §4.1 #7). Real <ol> so it reads as numbered steps.
 */
export function Steps() {
  return (
    <div className="relative">
      {/* dotted path + walkers, desktop only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[12%] top-[38px] hidden md:block">
        <div className="border-t-[3px] border-dotted border-line" />
        <WalkingEgg className="absolute -top-[34px] left-[22%] w-[26px]" />
        <WalkingEgg className="absolute -top-[30px] left-[30%] w-[22px]" delay={300} />
        <WalkingEgg className="absolute -top-[34px] left-[70%] w-[26px]" delay={550} />
      </div>
      <ol className="relative grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="reveal flex flex-col items-start md:items-center md:text-center" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
            <span className="grid h-[76px] w-[76px] place-items-center rounded-full border-[3px] border-white bg-sky font-display text-[30px] text-cocoa shadow-soft">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="t-h3 mt-5 text-cocoa">{s.title}</h3>
            <p className="mt-2 max-w-[320px] text-[15px] text-pebble">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
