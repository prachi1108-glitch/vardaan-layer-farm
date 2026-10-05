import type { Metadata } from "next";
import { PageHero } from "@/components/blocks/PageHero";
import { ResourcesList } from "@/components/blocks/ResourcesList";
import { CtaBand } from "@/components/site/CtaBand";
import { Section } from "@/components/ui/Section";
import { getCategories, getPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Egg Buying Guides & Resources · Vardaan Layer Farm",
  description:
    "Practical guides for hotels, restaurants, caterers and distributors: egg grades, storage in commercial kitchens, choosing a bulk supplier and planning volumes.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage({ searchParams }: PageProps<"/resources">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim().slice(0, 80) : "";
  const page = Math.max(1, Number(sp.page) || 1);
  const [list, categories] = await Promise.all([getPosts({ page, q: q || undefined }), getCategories()]);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }]}
        title="Resources"
        script="from the farm"
        intro="Straight answers for people who buy eggs by the tray — grades, storage, supply planning and how a layer farm works."
      />
      <Section tone="oat" className="!pt-12">
        <ResourcesList list={list} categories={categories} q={q} basePath="/resources" />
      </Section>
      <CtaBand />
    </>
  );
}
