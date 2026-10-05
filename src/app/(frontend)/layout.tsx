import type { Metadata, Viewport } from "next";
import { Anton, Condiment, Inter } from "next/font/google";
import "./globals.css";
import { RevealInit } from "@/components/motion/RevealInit";
import { Analytics } from "@/components/site/Analytics";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { JsonLd } from "@/components/site/JsonLd";
import { StickyActionBar } from "@/components/site/StickyActionBar";
import { getContact, getPosts } from "@/lib/cms";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const condiment = Condiment({ subsets: ["latin"], weight: "400", variable: "--font-condiment", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bulk Egg Supplier in Sonipat, Haryana · Vardaan Layer Farm",
    template: "%s",
  },
  description:
    "Farm-direct white table eggs in bulk from our own layer farm in Sonipat — graded on site, packed in 30-egg trays, delivered on a schedule. Get a quote.",
  applicationName: site.name,
  icons: { icon: "/logo-mark.svg" },
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFCF6",
};

// Hourly safety net; Payload hooks revalidate immediately on publish (src/hooks/revalidateSite.ts).
export const revalidate = 3600;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [contact, latest] = await Promise.all([getContact(), getPosts({ limit: 3 })]);
  return (
    <html lang="en-IN" className={`${anton.variable} ${inter.variable} ${condiment.variable}`}>
      <body className="flex min-h-screen flex-col bg-eggshell text-cocoa antialiased">
        {/* Safety net: if JS never runs, scroll-reveal content stays visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Header phoneDisplay={contact.phoneDisplay} phoneE164={contact.phoneE164} whatsappE164={contact.whatsappE164} />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer contact={contact} latestPosts={latest.docs} />
        <StickyActionBar phoneE164={contact.phoneE164} whatsappE164={contact.whatsappE164} />
        <JsonLd data={[organizationSchema(contact), websiteSchema()]} />
        <RevealInit />
        <Analytics />
      </body>
    </html>
  );
}
