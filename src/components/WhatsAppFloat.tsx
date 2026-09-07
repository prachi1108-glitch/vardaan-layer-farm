import { whatsappLink, defaultWhatsappMessage } from "@/lib/site";

/** Floating WhatsApp button — a key B2B conversion channel in India. */
export function WhatsAppFloat({ href }: { href?: string }) {
  return (
    <a
      href={href || whatsappLink(defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-lg shadow-forest-deep/20 transition-transform hover:scale-[1.03] sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        <path d="M12.04 2.5A9.46 9.46 0 0 0 4 16.86L2.5 21.5l4.77-1.5A9.46 9.46 0 1 0 12.04 2.5Zm0 17.14c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-2.83.89.9-2.76-.2-.31a7.66 7.66 0 1 1 6.62 3.66Z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:block">WhatsApp us</span>
    </a>
  );
}
