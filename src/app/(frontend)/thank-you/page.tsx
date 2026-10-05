import type { Metadata } from "next";
import Link from "next/link";
import { PipHatching } from "@/components/characters";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import { getContact, getPosts } from "@/lib/cms";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Got it! · Vardaan Layer Farm",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const [contact, posts] = await Promise.all([getContact(), getPosts({ limit: 2 })]);
  return (
    <section className="relative overflow-hidden bg-eggshell">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-butter/50 blur-3xl" />
      <div className="container-x relative flex flex-col items-center py-16 text-center lg:py-24">
        <PipHatching className="w-[180px] lg:w-[220px]" />
        <h1 className="display-xl mt-8 text-cocoa">Got it!</h1>
        <p className="body-l mt-5 max-w-[520px] text-pebble">
          Egg-cellent — your enquiry is with us. We&apos;ll call you within {site.quoteTurnaround} to confirm your
          volume, grade and delivery schedule.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonA
            href={whatsappLink("Hi Vardaan, I just sent an enquiry on your website.", contact.whatsappE164)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
          >
            Need us sooner? WhatsApp
          </ButtonA>
          <ButtonLink href="/" variant="secondary" arrow={false}>
            Back to home
          </ButtonLink>
        </div>

        {posts.docs.length ? (
          <div className="mt-16 w-full max-w-[640px] text-left">
            <p className="eyebrow text-pebble">While you wait</p>
            <ul className="mt-4 divide-y divide-line rounded-[20px] border border-line bg-white">
              {posts.docs.map((p) => (
                <li key={p.id}>
                  <Link href={`/resources/${p.slug}`} className="block px-6 py-4 font-semibold text-cocoa hover:text-clay">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
