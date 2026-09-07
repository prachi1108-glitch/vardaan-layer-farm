import type { SVGProps } from "react";

/**
 * Lightweight line-icon set (1.5 stroke, currentColor). Kept in-house to avoid
 * an icon dependency and to hold a consistent, understated visual tone.
 */

function Base({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Egg: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M12 3c3 0 5.5 4.5 5.5 8.5A5.5 5.5 0 0 1 12 17a5.5 5.5 0 0 1-5.5-5.5C6.5 7.5 9 3 12 3Z" />
    </Base>
  ),
  Chick: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <circle cx="12" cy="13" r="6" />
      <path d="M12 7V4M10.5 8l-2-1.5M13.5 8l2-1.5" />
      <circle cx="10.3" cy="12.5" r=".6" fill="currentColor" stroke="none" />
      <path d="M13.6 13.2l2-.6-1.7-1.2Z" fill="currentColor" />
    </Base>
  ),
  Growth: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M12 20v-7" />
      <path d="M12 13c0-2.5 1.8-4.3 4.3-4.3 0 2.5-1.8 4.3-4.3 4.3Z" />
      <path d="M12 15c0-2-1.5-3.5-3.5-3.5C8.5 13.5 10 15 12 15Z" />
    </Base>
  ),
  Hen: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M5 17c0-3.5 2.5-6.5 6-6.5 2.8 0 5 1.8 5.7 4.3" />
      <path d="M16 15c1.6 0 3 1.2 3 3H8a3 3 0 0 1-3-3" />
      <path d="M11 10.5 9.5 8M13 10.5 15 8" />
    </Base>
  ),
  Basket: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M4 9h16l-1.5 9.5A2 2 0 0 1 16.5 20h-9a2 2 0 0 1-2-1.5L4 9Z" />
      <path d="M8 9l2.5-4M16 9l-2.5-4M9 13v3M15 13v3M12 13v3" />
    </Base>
  ),
  Package: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
      <path d="M4 7l8 4 8-4M12 11v10M8 5l8 4" />
    </Base>
  ),
  Truck: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </Base>
  ),
  Business: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M3 21h18M5 21V6l6-3v18M19 21V10l-8-4" />
      <path d="M8 9v0M8 12v0M8 15v0" />
    </Base>
  ),
  Store: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M4 9l1-4h14l1 4M4 9v11h16V9M4 9h16" />
      <path d="M9 20v-6h6v6" />
    </Base>
  ),
  People: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 6.5a3 3 0 0 1 0 5.5M17 14.5a5.5 5.5 0 0 1 3.5 4.5" />
    </Base>
  ),
  Handshake: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="m11 6 2 2 3-2 5 5-2 2M13 8l-3 3M3 11l5-5 3 3" />
      <path d="m8 13 2 2M11 15l2 2M14 15l2 2" />
    </Base>
  ),
  Check: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="m5 12 5 5L20 7" />
    </Base>
  ),
  ShieldCheck: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  ),
  Clock: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  ),
  Scale: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M12 4v16M7 20h10M6 8h12M6 8l-2.5 5a3 3 0 0 0 5 0L6 8ZM18 8l-2.5 5a3 3 0 0 0 5 0L18 8Z" />
    </Base>
  ),
  Drop: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M12 3.5c3 3.5 5 6.2 5 8.8a5 5 0 0 1-10 0c0-2.6 2-5.3 5-8.8Z" />
    </Base>
  ),
  Phone: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M5 4h4l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </Base>
  ),
  Mail: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </Base>
  ),
  Pin: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M12 21c4-4.5 6-7.6 6-10.5A6 6 0 0 0 6 10.5C6 13.4 8 16.5 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </Base>
  ),
  Arrow: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  ),
  Leaf: (p: SVGProps<SVGSVGElement>) => (
    <Base {...p}>
      <path d="M4 20c0-9 6-15 16-15 0 10-6 16-16 15Z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </Base>
  ),
};
