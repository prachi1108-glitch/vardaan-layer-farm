import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "A layer farm, not a trading desk — Vardaan Layer Farm";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "A layer farm, not a trading desk" });
}
