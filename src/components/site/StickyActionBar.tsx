import Link from "next/link";
import { Icon } from "@/components/icons";
import { quoteHref, whatsappLink, whatsappMessages } from "@/lib/site";

/** Mobile sticky bottom bar (PRD FR-1.2): WhatsApp · Call · Get a quote. */
export function StickyActionBar({ phoneE164, whatsappE164 }: { phoneE164: string; whatsappE164: string }) {
  const item = "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[12px] font-semibold uppercase tracking-[0.04em]";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-eggshell/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="flex gap-2 py-2">
        <a
          href={whatsappLink(whatsappMessages.default, whatsappE164)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} rounded-2xl text-cocoa`}
        >
          <Icon.WhatsApp className="h-5 w-5 text-whatsapp" />
          WhatsApp
        </a>
        <a href={`tel:+${phoneE164}`} className={`${item} rounded-2xl text-cocoa`}>
          <Icon.Phone className="h-5 w-5" />
          Call
        </a>
        <Link href={quoteHref} data-quote className={`${item} rounded-2xl bg-clay text-white`}>
          <Icon.ArrowRight className="h-5 w-5" />
          Get a quote
        </Link>
      </div>
    </nav>
  );
}
