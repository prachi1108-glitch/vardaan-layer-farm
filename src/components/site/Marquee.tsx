/** Butter marquee band (Doc 05 §4.1 #2): slow scroll, pauses on hover. */
const ITEMS = [
  "Farm-direct supply",
  "Graded on site",
  "White table eggs",
  "30-egg trays",
  "Scheduled dispatch",
  "Bulk volumes",
];

export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center font-display text-[18px] uppercase tracking-[0.04em] text-cocoa">
          <span className="px-6">{item}</span>
          <span aria-hidden="true" className="text-clay">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line/60 bg-butter py-3.5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
