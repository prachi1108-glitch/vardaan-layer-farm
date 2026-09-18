import Image from "next/image";
import Link from "next/link";
import { Sym } from "@/components/ui/Sym";
import { HeroShader } from "@/components/home/HeroShader";

const microTrust = ["Cold-Chain Dispatched", "Calibrated Weight Tiers"];

/** Floating golden chaff / pollen micro-particles (positions & timings from the design). */
const particles = [
  { cls: "bg-primary-container/65 w-1.5 h-1.5 top-[78%] left-[12%]", dur: "9.5s", delay: "0.5s", glow: "0 0 6px rgba(252, 217, 1, 0.8)" },
  { cls: "bg-accent-gold/50 w-2 h-2 top-[65%] left-[28%]", dur: "11s", delay: "2.2s", glow: "0 0 8px rgba(210, 175, 86, 0.7)" },
  { cls: "bg-primary-fixed/60 w-1 h-1 top-[82%] left-[45%]", dur: "8s", delay: "1.1s" },
  { cls: "bg-primary-container/70 w-2.5 h-2.5 top-[88%] left-[62%]", dur: "12.5s", delay: "3s", glow: "0 0 10px rgba(252, 217, 1, 0.9)" },
  { cls: "bg-secondary-container/45 w-1.5 h-1.5 top-[70%] left-[76%]", dur: "10s", delay: "1.8s" },
  { cls: "bg-primary-fixed/55 w-1 h-1 top-[60%] left-[88%]", dur: "9s", delay: "4.2s" },
  { cls: "bg-accent-gold/60 w-2 h-2 top-[85%] left-[36%]", dur: "13s", delay: "0.2s", glow: "0 0 6px rgba(210, 175, 86, 0.6)" },
  { cls: "bg-primary-container/50 w-1 h-1 top-[52%] left-[18%]", dur: "8.5s", delay: "3.6s" },
];

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
      {/* WebGL sunrise rays & morning mist */}
      <HeroShader className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75" />

      {/* Floating golden particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`dust-particle ${p.cls}`}
            style={{
              animationDuration: p.dur,
              animationDelay: p.delay,
              boxShadow: p.glow,
            }}
          />
        ))}
      </div>

      {/* Ambient sunrise glow (backdrop layer) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-10 md:right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-container/30 via-secondary/10 to-transparent blur-3xl pointer-events-none animate-sunrise-glow z-[2]"
      />

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: message + actions, staggered entrance */}
          <div className="lg:col-span-6 space-y-6">
            <div className="hero-enter-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-offwhite/90 backdrop-blur-sm egg-border shadow-ambient transition-all duration-300 hover:border-primary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="font-label-caps text-label-caps text-tertiary">
                {eyebrow}
              </span>
            </div>

            <h1 className="hero-enter-2 font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface font-bold tracking-tight">
              {heading}
            </h1>

            <p className="hero-enter-3 font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              {subheading}
            </p>

            <div className="hero-enter-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                className="cta-shimmer-btn group inline-flex items-center justify-center gap-2 bg-primary-container text-on-surface font-label-md text-label-md font-bold px-space-lg py-3.5 rounded-lg hover:-translate-y-1 hover:shadow-aura active:scale-95 transition-all duration-200"
                href={ctaPrimary.href}
              >
                <span>{ctaPrimary.label}</span>
                <Sym
                  name="arrow_forward"
                  className="text-base transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                className="group inline-flex items-center justify-center gap-2 bg-surface-offwhite/80 backdrop-blur-sm text-secondary border-[1.5px] border-secondary font-label-md text-label-md px-space-lg py-3 rounded-lg hover:bg-secondary hover:text-surface-cream hover:-translate-y-0.5 hover:shadow-warm-aura active:scale-95 transition-all duration-200"
                href={ctaSecondary.href}
              >
                <span>{ctaSecondary.label}</span>
                <Sym
                  name="north_east"
                  className="text-base transition-transform duration-200 group-hover:rotate-45"
                />
              </Link>
            </div>

            <div className="hero-enter-4 pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-on-surface-variant font-label-md text-label-md">
              {microTrust.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Sym name="check_circle" filled className="text-tertiary" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: framed visual with breathing glow + floating badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-primary-container/30 blur-3xl pointer-events-none animate-sunrise-glow"
              />
              <div className="relative rounded-[28px] overflow-hidden egg-border shadow-lift bg-surface-offwhite/95 backdrop-blur-sm p-3 animate-hero-card">
                <div className="relative h-[420px] md:h-[500px] w-full rounded-[22px] overflow-hidden">
                  <Image
                    src="/design/hero-egg-trays.jpg"
                    alt="Stacked 30-egg pulp trays of fresh white eggs on a timber bench in Vardaan Layer Farm's packing hall, with further stacks and a worker behind"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent pointer-events-none"
                  />
                </div>

                <div className="absolute bottom-8 left-8 right-8 md:right-auto bg-surface-offwhite/95 backdrop-blur-md p-4 rounded-xl shadow-lift border border-outline-variant/40 flex items-center gap-4 animate-float-badge hover:shadow-aura transition-all duration-300 cursor-default">
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
