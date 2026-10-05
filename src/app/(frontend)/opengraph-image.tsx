import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Reliable bulk egg supply for your business — Vardaan Layer Farm";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Reliable bulk egg supply for your business" });
}
