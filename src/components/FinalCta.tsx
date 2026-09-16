import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Full-width closing call-to-action band used at the foot of several pages,
 * steering visitors to the wholesale enquiry. (Doc 04 §3 "CTA band".)
 */
export function FinalCta({
  heading,
  text,
  buttonLabel,
  buttonHref,
}: {
  heading?: string | null;
  text?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
} = {}) {
  const h = heading || "Let’s talk about your egg supply.";
  const t =
    text ||
    "Bulk requirements, retail partnerships or distribution — tell us what you need and we’ll get back to you.";
  const bLabel = buttonLabel || "Get a Quote";
  const bHref = buttonHref || "/wholesale-enquiry";
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px), radial-gradient(circle at 70% 60%, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px, 55px 55px",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl text-surface-cream sm:text-4xl">{h}</h2>
          <p className="mt-4 text-lg text-surface-cream/80">{t}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={bHref} size="lg" variant="light">
              {bLabel}
            </ButtonLink>
            <ButtonLink
              href="/products"
              size="lg"
              variant="ghost"
              className="text-surface-cream hover:bg-surface-cream/10"
            >
              Explore our eggs
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
