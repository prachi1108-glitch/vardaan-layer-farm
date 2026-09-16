import Image from "next/image";
import Link from "next/link";
import { Sym } from "@/components/ui/Sym";

const microTrust = ["Cold-Chain Dispatched", "Calibrated Weight Tiers"];

export function Hero({
  eyebrow,
  heading,
  subheading,
  ctaPrimary,
  ctaSecondary,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}) {
  return (
    <section
      className="relative overflow-hidden pt-12 pb-20 md:py-space-3xl bg-surface-cream border-b egg-border"
      id="hero"
    >
      {/* Ambient sunrise glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-10 md:right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-container/30 via-secondary/10 to-transparent blur-3xl pointer-events-none animate-sunrise-glow"
      />
      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: message + actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-offwhite egg-border shadow-ambient">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="font-label-caps text-label-caps text-tertiary">
                {eyebrow}
              </span>
            </div>

            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface font-bold tracking-tight">
              {heading}
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              {subheading}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                className="group inline-flex items-center justify-center gap-2 bg-primary-container text-on-surface font-label-md text-label-md font-bold px-space-lg py-3.5 rounded-lg hover:-translate-y-1 hover:shadow-aura active:scale-95 transition-all duration-200"
                href={ctaPrimary.href}
              >
                <span>{ctaPrimary.label}</span>
                <Sym
                  name="arrow_forward"
                  className="text-base transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                className="group inline-flex items-center justify-center gap-2 bg-transparent text-secondary border-[1.5px] border-secondary font-label-md text-label-md px-space-lg py-3 rounded-lg hover:bg-secondary hover:text-surface-cream hover:-translate-y-0.5 hover:shadow-warm-aura active:scale-95 transition-all duration-200"
                href={ctaSecondary.href}
              >
                <span>{ctaSecondary.label}</span>
                <Sym
                  name="north_east"
                  className="text-base transition-transform duration-200 group-hover:rotate-45"
                />
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-on-surface-variant font-label-md text-label-md">
              {microTrust.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Sym name="check_circle" filled className="text-tertiary" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: framed visual + floating badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-primary-container/30 blur-3xl pointer-events-none animate-sunrise-glow"
              />
              <div className="relative rounded-[28px] overflow-hidden egg-border shadow-lift bg-surface-offwhite p-3">
                <div className="relative h-[420px] md:h-[500px] w-full rounded-[22px] overflow-hidden">
                  <Image
                    src="/design/hero-trays.jpg"
                    alt="Stacked 30-egg wholesale pulp trays ready for dispatch at Vardaan Layer Farm"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent"
                  />
                </div>

                <div className="absolute bottom-8 left-8 right-8 md:right-auto bg-surface-offwhite/95 backdrop-blur-sm p-4 rounded-xl shadow-lift border border-outline-variant/40 flex items-center gap-4 animate-float-badge">
                  <span className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-surface shrink-0 animate-badge-pulse">
                    <Sym name="verified" />
                  </span>
                  <span className="block">
                    <span className="block font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                      Supplying 50k+ Daily
                    </span>
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">
                      Consistent farm-direct dispatch cycles
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
