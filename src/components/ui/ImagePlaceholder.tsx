import type { ReactNode } from "react";

/**
 * Honest placeholder for real farm photography.
 *
 * We deliberately do NOT ship generic stock poultry imagery. Each placeholder
 * names the real photo that should replace it, so swapping in the farm's own
 * pictures later is obvious. To replace: drop the image into /public and render
 * a <Image>/<img> in place of this component.
 */

type Tone = "forest" | "sand" | "terracotta" | "moss";

const tones: Record<Tone, string> = {
  forest: "from-forest-deep to-forest text-cream/70",
  sand: "from-cream-deep to-sand text-stone",
  terracotta: "from-clay to-terracotta text-cream/80",
  moss: "from-forest to-moss text-cream/75",
};

export function ImagePlaceholder({
  label,
  tone = "sand",
  className = "",
  rounded = "rounded-2xl",
  children,
}: {
  label: string;
  tone?: Tone;
  className?: string;
  rounded?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${rounded} bg-gradient-to-br ${tones[tone]} ${className}`}
      role="img"
      aria-label={`Placeholder for photo: ${label}`}
    >
      {/* faint grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7 opacity-70"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <circle cx="8.5" cy="10" r="1.6" />
          <path d="M4 17l4.5-4.5 3.5 3.5 3-3L20 16.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-medium uppercase tracking-[0.14em] opacity-80">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}
