import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Resources from the farm — Vardaan Layer Farm";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Resources from the farm" });
}
