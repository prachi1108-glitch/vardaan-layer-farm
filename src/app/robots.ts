import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Allow search and AI crawlers explicitly (PRD §5.5); keep admin, API and thank-you out. */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/", "/thank-you"];
  const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-User", "Google-Extended", "Bingbot"];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow }))],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
