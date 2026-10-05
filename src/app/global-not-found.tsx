import type { Metadata } from "next";
import { Anton, Condiment, Inter } from "next/font/google";
import "./(frontend)/globals.css";
import { RollingEggie } from "@/components/characters";
import { Logo } from "@/components/site/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { quoteHref } from "@/lib/site";

/**
 * 404 for URLs that match no route. The app has two root layouts (frontend
 * and Payload), so there's no single layout to compose a 404 from — this file
 * renders its own document. `(frontend)/not-found.tsx` still handles
 * notFound() calls inside the site layout (e.g. a missing post).
 */

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const condiment = Condiment({ subsets: ["latin"], weight: "400", variable: "--font-condiment", display: "swap" });

export const metadata: Metadata = {
  title: "Page not found · Vardaan Layer Farm",
};

export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={`${anton.variable} ${inter.variable} ${condiment.variable}`}>
      <body className="min-h-screen bg-eggshell text-cocoa antialiased">
        <header className="container-x flex h-[84px] items-center">
          <Logo />
        </header>
        <main className="container-x flex flex-col items-center py-12 text-center lg:py-20">
          <RollingEggie className="w-full max-w-[420px]" />
          <h1 className="t-h1 mt-8 text-cocoa">This egg rolled away</h1>
          <p className="body-l mt-4 max-w-[480px] text-pebble">
            The page you were looking for isn&apos;t here. It may have moved when we rebuilt the site.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" variant="secondary" arrow={false}>
              Back to home
            </ButtonLink>
            <ButtonLink href={quoteHref}>Get a quote</ButtonLink>
          </div>
        </main>
      </body>
    </html>
  );
}
