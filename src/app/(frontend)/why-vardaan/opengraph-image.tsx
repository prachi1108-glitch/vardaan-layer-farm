import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Eggs that behave the same every delivery — Vardaan Layer Farm";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Eggs that behave the same every delivery" });
}
