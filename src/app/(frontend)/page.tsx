import { Hero } from "@/components/home/Hero";
import { TrustBar, type TrustStatItem } from "@/components/home/TrustBar";
import { FarmFresh } from "@/components/home/FarmFresh";
import { WhyVardaan } from "@/components/home/WhyVardaan";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { WhatWeSupply } from "@/components/home/WhatWeSupply";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Insights, type InsightPost } from "@/components/home/Insights";
import { QuoteSection } from "@/components/home/QuoteSection";
import { getHomeContent } from "@/lib/cms";
import { getPayloadClient } from "@/lib/payload";

/**
 * Headline figures from the supplied design.
 * NOTE: these are unverified placeholders — replace with Vardaan's real,
 * confirmed numbers via the Home Page global in /admin before launch.
 */
const designStats: TrustStatItem[] = [
  { value: "10+", label: "Years of Farm Experience", note: "Biosecure Layer Operations" },
  { value: "50,000+", label: "Eggs Supplied Daily", note: "Zero Breakage Packaging" },
  { value: "250+", label: "Commercial Buyers", note: "Hotels, Chains & Retailers" },
  { value: "15+", label: "Distribution Hubs", note: "Dedicated Fleet Logistics" },
];

export default async function HomePage() {
  const home = await getHomeContent();

  // A CMS/database blip must not take the homepage down — the Insights section
  // simply hides itself when there are no posts to show.
  let posts: InsightPost[] = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 1,
      limit: 3,
    });
    posts = docs as unknown as InsightPost[];
  } catch (err) {
    console.error("[home] could not load posts:", err);
  }

  const stats: TrustStatItem[] =
    home?.trustStats && home.trustStats.length > 0
      ? home.trustStats.map((s) => ({ value: s.value, label: s.label }))
      : designStats;

  return (
    <>
      <Hero
        eyebrow={home?.heroEyebrow || "FARM-DIRECT WHOLESALE LOGISTICS"}
        heading={
          home?.heroHeading ||
          "Reliable bulk egg supply for hotels, restaurants, retailers & distributors."
        }
        subheading={
          home?.heroSubheading ||
          "Fresh eggs from our own layer farm — supplied in the volumes your business needs, with consistent quality and dependable daily logistics."
        }
        ctaPrimary={{
          label: home?.ctaPrimaryLabel || "Get a Quote",
          href: home?.ctaPrimaryHref || "/wholesale-enquiry",
        }}
        ctaSecondary={{
          label: home?.ctaSecondaryLabel || "View Our Eggs",
          href: home?.ctaSecondaryHref || "/products",
        }}
      />
      <TrustBar stats={stats} />
      <FarmFresh />
      <WhyVardaan />
      <WhoWeServe />
      <WhatWeSupply />
      <HowItWorks />
      <Insights posts={posts} />
      <QuoteSection />
    </>
  );
}
