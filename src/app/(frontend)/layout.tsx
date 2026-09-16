import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealInit } from "@/components/motion/RevealInit";
import { getContact } from "@/lib/cms";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Industrial Bulk Egg Supply & Wholesale Distribution`,
    template: `%s · ${site.name}`,
  },
  description: site.positioning,
  openGraph: {
    title: `${site.name} | Industrial Bulk Egg Supply & Wholesale Distribution`,
    description: site.positioning,
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const contact = await getContact();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        {/* Material Symbols — the design's icon language */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-surface-cream text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col">
        {/* Safety net: if JS never runs, scroll-reveal content stays visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer contact={contact} />
        <RevealInit />
      </body>
    </html>
  );
}
