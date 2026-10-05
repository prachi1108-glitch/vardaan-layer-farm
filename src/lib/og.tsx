import { ImageResponse } from "next/og";

/**
 * Branded Open Graph images (PRD §5.1: Eggie + headline), rendered with
 * next/og. Anton and Inter are fetched from Google Fonts for just the glyphs
 * used; if that fails the image still renders in the default sans.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

const EGGIE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 132"><path d="M50 4C24 4 6 46 6 78c0 28 20 46 44 46s44-18 44-46C94 46 76 4 50 4Z" fill="#F8EFE2"/><path d="M47 8C25 8 10 46 10 76c0 25 17 41 38 41 22 0 38-17 38-43C86 44 70 8 47 8Z" fill="#fff"/><ellipse cx="30" cy="88" rx="7.5" ry="4.2" fill="#F6D9C9"/><ellipse cx="70" cy="88" rx="7.5" ry="4.2" fill="#F6D9C9"/><circle cx="38" cy="76" r="3.8" fill="#4A3A32"/><circle cx="62" cy="76" r="3.8" fill="#4A3A32"/><path d="M44.5 87q5.5 5 11 0" fill="none" stroke="#4A3A32" stroke-width="2.4" stroke-linecap="round"/></svg>`;

export async function ogImage({ title, eyebrow = "Vardaan Layer Farm" }: { title: string; eyebrow?: string }) {
  const display = title.toUpperCase();
  const tagline = "Sonipat, Haryana · Farm-direct white eggs";
  const [anton, inter] = await Promise.all([
    loadFont("Anton", `${display}VARDAAN`),
    loadFont("Inter:wght@500", `${eyebrow.toUpperCase()}${tagline}`),
  ]);
  const fontFamily = anton ? "Anton" : "sans-serif";
  const bodyFont = inter ? "Inter" : "sans-serif";
  const titleSize = display.length > 60 ? 64 : display.length > 36 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 86% 22%, #FBE7A1 0%, #FFFCF6 52%)",
          fontFamily: bodyFont,
          position: "relative",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 820 }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, letterSpacing: 3, color: "#7A6558", textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontFamily, fontSize: titleSize, lineHeight: 1.02, color: "#4A3A32" }}>{display}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", fontFamily, fontSize: 40, color: "#4A3A32" }}>VARDAAN</div>
            <div style={{ display: "flex", fontSize: 22, color: "#7A6558" }}>{tagline}</div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(EGGIE)}`} width={210} height={277} alt="" />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: "#A9573E", display: "flex" }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        ...(inter ? [{ name: "Inter", data: inter, weight: 500 as const, style: "normal" as const }] : []),
        ...(anton ? [{ name: "Anton", data: anton, weight: 400 as const, style: "normal" as const }] : []),
      ],
    },
  );
}
