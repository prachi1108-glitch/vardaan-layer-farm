import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/blocks/PageHero";
import { ResourcesList } from "@/components/blocks/ResourcesList";
import { CtaBand } from "@/components/site/CtaBand";
import { Section } from "@/components/ui/Section";
import { getCategories, getCategory, getPosts } from "@/lib/cms";

export async function generateMetadata({ params }: PageProps<"/resources/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategory(slug);
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat.title} · Resources · Vardaan Layer Farm`,
    description: cat.description || `${cat.title} guides from Vardaan Layer Farm for bulk egg buyers.`,
    alternates: { canonical: `/resources/category/${slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/resources/category/[slug]">) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const [cat, categories] = await Promise.all([getCategory(slug), getCategories()]);
  if (!cat) notFound();
  const list = await getPosts({ page, categorySlug: slug });

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: cat.title, href: `/resources/category/${slug}` },
        ]}
        title={cat.title}
        intro={cat.description || undefined}
      />
      <Section tone="oat" className="!pt-12">
        <ResourcesList list={list} categories={categories} activeSlug={slug} basePath={`/resources/category/${slug}`} />
      </Section>
      <CtaBand />
    </>
  );
}
