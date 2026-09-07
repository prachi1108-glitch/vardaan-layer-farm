import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "solid" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream focus-visible:ring-forest disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Primary CTA — GOLD background, dark forest-green text (Doc 03 §3).
  // The highest-attention element; reserve for "Enquire / Get a Quote".
  primary: "bg-terracotta text-forest-deep hover:bg-wheat shadow-sm hover:shadow-md",
  // Secondary — green outline on cream (used for lower-priority actions).
  secondary:
    "bg-transparent text-forest-dark ring-1 ring-inset ring-forest/30 hover:bg-forest/5",
  // Solid forest-green button, cream text.
  solid: "bg-forest text-cream hover:bg-forest-dark",
  ghost: "bg-transparent text-forest-dark hover:bg-forest/5",
  light: "bg-cream text-forest-dark hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

function classes(variant: Variant, size: Size, extra?: string) {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = /^https?:|^tel:|^mailto:/.test(href);
  if (external) {
    return (
      <a
        href={href}
        className={classes(variant, size, className)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
