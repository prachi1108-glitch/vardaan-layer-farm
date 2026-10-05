import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Fresh table eggs, graded not guessed — Vardaan Layer Farm";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: "Fresh table eggs, graded not guessed" });
}
