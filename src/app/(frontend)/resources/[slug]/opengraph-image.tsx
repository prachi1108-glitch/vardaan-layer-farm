import { getPost } from "@/lib/cms";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Vardaan Layer Farm resources";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return ogImage({ title: post?.title ?? "Resources from the farm", eyebrow: post?.category?.title ?? "Resources" });
}
