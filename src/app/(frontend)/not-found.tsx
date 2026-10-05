import type { Metadata } from "next";
import { RollingEggie } from "@/components/characters";
import { ButtonLink } from "@/components/ui/Button";
import { quoteHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found · Vardaan Layer Farm",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-eggshell">
      <div className="container-x flex flex-col items-center py-16 text-center lg:py-24">
        <RollingEggie className="w-full max-w-[420px]" />
        <h1 className="t-h1 mt-8 text-cocoa">This egg rolled away</h1>
        <p className="body-l mt-4 max-w-[480px] text-pebble">
          The page you were looking for isn&apos;t here. It may have moved when we rebuilt the site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="secondary" arrow={false}>
            Back to home
          </ButtonLink>
          <ButtonLink href={quoteHref} data-quote>
            Get a quote
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
