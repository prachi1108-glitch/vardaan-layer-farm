import { Pip } from "@/components/characters";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import { quoteHref, whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * The closing band on every page (Doc 05 §3) so no page is a dead end.
 * "Four hours" is an unverified claim — see claims.quoteTime in site.ts.
 */
export function CtaBand({ whatsappMessage = whatsappMessages.default }: { whatsappMessage?: string }) {
  return (
    <section aria-labelledby="cta-band" className="bg-eggshell pb-16 lg:pb-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-peach px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div className="relative z-10 max-w-[680px]">
            <h2 id="cta-band" className="t-h2 m-0 text-cocoa">
              Tell us your volume.
              <br />
              We quote in four hours.
            </h2>
            <p className="body-l mt-4 max-w-[520px] text-cocoa/80">
              Share your volume, grade and delivery area — we&apos;ll come back with a rate and a delivery schedule.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={quoteHref} data-quote>
                Start an enquiry
              </ButtonLink>
              <ButtonA href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                WhatsApp the farm
              </ButtonA>
            </div>
          </div>
          <Pip hop className="pointer-events-none absolute -bottom-2 right-6 hidden w-[150px] sm:block lg:right-16 lg:w-[190px]" />
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-butter/50 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
