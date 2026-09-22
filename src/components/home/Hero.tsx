import Image from "next/image";
import { Sym } from "@/components/ui/Sym";
import { HeroShader } from "@/components/home/HeroShader";

const microTrust = ["Cold-Chain Dispatched", "Calibrated Weight Tiers"];

export function Hero({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
}) {
  return (
    <section
      className="relative overflow-hidden pt-12 pb-20 md:py-space-3xl bg-surface-cream border-b egg-border"
      id="hero"
    >
      {/* WebGL sunrise rays & morning mist */}
      <HeroShader className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75" />

      {/* Ambient sunrise glow (backdrop layer) */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-10 md:right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-container/30 via-secondary/10 to-transparent blur-3xl pointer-events-none animate-sunrise-glow z-[2]"
      />

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 lg:gap-10 items-center">
          {/* Left: message, staggered entrance */}
          <div className="space-y-6">
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

            <div className="hero-enter-4 pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-on-surface-variant font-label-md text-label-md">
              {microTrust.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Sym name="check_circle" filled className="text-tertiary" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: framed visual with breathing glow */}
          <div className="relative">
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
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
