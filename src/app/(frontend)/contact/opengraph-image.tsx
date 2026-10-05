import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Talk to the farm directly — Vardaan Layer Farm";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Talk to the farm directly" });
}
