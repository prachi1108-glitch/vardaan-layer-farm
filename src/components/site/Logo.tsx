import Link from "next/link";

/** Interim wordmark (Doc 03 §8): "VARDAAN" in Anton + "layer farm" in Condiment. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Vardaan Layer Farm — home" className={`group inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="font-display text-[26px] leading-none tracking-[0.02em] text-cocoa uppercase">Vardaan</span>
      <span className="font-script text-[22px] leading-none text-clay -rotate-3 inline-block">layer farm</span>
    </Link>
  );
}
