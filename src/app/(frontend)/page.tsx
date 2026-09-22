import { Hero } from "@/components/home/Hero";
import { FarmFresh } from "@/components/home/FarmFresh";
import { WhyVardaan } from "@/components/home/WhyVardaan";
import { WhoWeServe } from "@/components/home/WhoWeServe";
import { HowItWorks } from "@/components/home/HowItWorks";
import { getHomeContent } from "@/lib/cms";

export default async function HomePage() {
  const home = await getHomeContent();

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
      />
      <FarmFresh />
      <WhyVardaan />
      <WhoWeServe />
      <HowItWorks />
    </>
  );
}
