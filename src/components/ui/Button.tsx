import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "@/components/icons";

/**
 * Buttons (Doc 03 §6): pill, 52px tall, uppercase Inter 600.
 *  - primary:   Clay fill, white text, arrow; hover Clay Hover + 2px lift
 *  - secondary: transparent, 1.5px Cocoa/20% border
 *  - whatsapp:  white pill, Cocoa text, green glyph
 */

type Variant = "primary" | "secondary" | "whatsapp";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.06em] transition-all duration-200 whitespace-nowrap";
const sizes: Record<Size, string> = {
  md: "h-[52px] px-7 text-[15px]",
  sm: "h-11 px-5 text-[13px]",
};
const variants: Record<Variant, string> = {
  primary: "bg-clay text-white hover:bg-clay-soft hover:-translate-y-0.5 shadow-[0_8px_18px_rgba(169,87,62,0.22)]",
  secondary: "border-[1.5px] border-cocoa/20 text-cocoa hover:border-cocoa/50 hover:bg-white",
  whatsapp: "bg-white text-cocoa border border-line hover:-translate-y-0.5 shadow-soft",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

function Inner({ variant, children, arrow }: { variant: Variant; children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {variant === "whatsapp" ? <Icon.WhatsApp className="h-5 w-5 text-whatsapp" /> : null}
      {children}
      {arrow ?? variant === "primary" ? <Icon.ArrowRight className="h-[18px] w-[18px]" /> : null}
    </>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({ variant = "primary", size = "md", arrow, className = "", children, ...rest }: LinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </Link>
  );
}

/** For external links (tel:, wa.me, mailto:) where next/link isn't appropriate. */
export function ButtonA({
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  children,
  ...rest
}: ComponentProps<"a"> & { variant?: Variant; size?: Size; arrow?: boolean }) {
  return (
    <a className={buttonClass(variant, size, className)} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant; size?: Size; arrow?: boolean }) {
  return (
    <button className={buttonClass(variant, size, `${className} disabled:opacity-60 disabled:hover:translate-y-0`)} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
