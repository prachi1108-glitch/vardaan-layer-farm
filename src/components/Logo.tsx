import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Wordmark + minimal mark. The mark is an abstract egg/sprout — deliberately
 * understated (no cartoon poultry), reads as an agricultural seal.
 */
export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const wordColor = tone === "light" ? "text-cream" : "text-forest-dark";
  const subColor = tone === "light" ? "text-cream/70" : "text-stone";
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-full ${
          tone === "light" ? "bg-cream/15 ring-1 ring-cream/30" : "bg-forest text-cream"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          {/* egg silhouette */}
          <path
            d="M12 3.5c3 0 5.5 4.2 5.5 8.2A5.5 5.5 0 0 1 12 17.2a5.5 5.5 0 0 1-5.5-5.5C6.5 7.7 9 3.5 12 3.5Z"
            fill={tone === "light" ? "#faf6ee" : "#faf6ee"}
            opacity={tone === "light" ? 0.9 : 1}
          />
          {/* sprout leaf */}
          <path
            d="M12 13.5c0-1.6.5-3 1.6-3.9 1-.8 2.3-1 2.3-1s.1 1.4-.7 2.5c-.8 1.1-2 1.6-3.2 1.6Z"
            fill="#5f7f52"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-semibold tracking-tight ${wordColor}`}
        >
          Vardaan
        </span>
        <span className={`text-[10px] uppercase tracking-[0.22em] ${subColor}`}>
          Layer Farm
        </span>
      </span>
    </Link>
  );
}
