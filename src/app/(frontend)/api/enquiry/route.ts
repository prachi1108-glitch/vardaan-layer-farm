import { NextResponse } from "next/server";
import { compactEnquirySchema, enquirySchema, type EnquiryInput } from "@/lib/enquiry-schema";
import { getPayloadClient } from "@/lib/payload";

/**
 * Enquiry intake (PRD FR-2). Validates with the same Zod schema as the form,
 * applies honeypot + Turnstile (when configured) + a 5/hour IP rate limit,
 * then saves to the Enquiries collection. The collection hook sends emails.
 */

type Body = Record<string, unknown>;

// Best-effort in-memory limiter (per server instance) — 5 per IP per hour.
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function turnstileOk(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // not configured — honeypot + rate limit only
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : undefined) || undefined;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success so bots learn nothing.
  if (str(body.company_website)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "We've received several enquiries from you already. Please call or WhatsApp us instead." },
      { status: 429 },
    );
  }
  if (!(await turnstileOk(body.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "Please confirm you're not a robot and try again." }, { status: 400 });
  }

  const compact = body.variant === "compact";
  const parsed = compact ? compactEnquirySchema.safeParse(body) : enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const d = parsed.data as Partial<EnquiryInput>;
  const utm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;

  try {
    const payload = await getPayloadClient();
    const doc = await payload.create({
      collection: "enquiries",
      data: {
        // The quick form on Our Eggs doesn't ask for names; sales fills them in on the call.
        name: d.name ?? "Not given (quick form)",
        businessName: d.businessName ?? "Not given (quick form)",
        businessType: d.businessType as never,
        phone: d.phone!,
        city: d.city,
        quantity: d.quantity,
        quantityUnit: d.quantityUnit as never,
        email: d.email,
        frequency: d.frequency as never,
        requiredBy: d.requiredBy,
        preferredGrade: d.preferredGrade,
        message: d.message,
        consent: d.consent,
        sourcePage: str(body.sourcePage),
        landingPage: str(body.landingPage),
        referrer: str(body.referrer),
        device: str(body.device, 40),
        utm: {
          source: str(utm.source),
          medium: str(utm.medium),
          campaign: str(utm.campaign),
          term: str(utm.term),
          content: str(utm.content),
        },
      },
    });
    return NextResponse.json({ ok: true, id: doc.id });
  } catch (err) {
    console.error("[enquiry] failed to save:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your enquiry. Please call or WhatsApp us — we're sorry about that." },
      { status: 500 },
    );
  }
}
