import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-label-md text-label-md transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-container/50 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  /** Primary action (quote / enquire) — yellow with deep-brown text. */
  primary:
    "bg-primary-container text-on-surface font-bold hover:-translate-y-0.5 hover:shadow-aura shadow-ambient",
  /** Secondary — filled earthy brown. */
  secondary:
    "bg-secondary text-surface-cream hover:bg-on-secondary-container hover:-translate-y-0.5 hover:shadow-warm-aura",
  /** Tertiary — outlined earthy brown. */
  outline:
    "bg-transparent text-secondary border-[1.5px] border-secondary hover:bg-secondary hover:text-surface-cream hover:-translate-y-0.5 hover:shadow-warm-aura",
  ghost: "bg-transparent text-secondary hover:bg-surface-container/60",
  /** For use on dark bands. */
  light:
    "bg-surface-cream text-on-surface font-semibold hover:bg-pure-white hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "px-space-lg py-3",
  lg: "px-space-xl py-3.5",
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
}: CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className"
  >) {
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
