import config from "@payload-config";
import { getPayload } from "payload";
import { NextResponse } from "next/server";

/**
 * Wholesale enquiry intake.
 *
 * Validates the payload, applies a honeypot + light rate-limit for spam, then
 * saves the lead to the Enquiries collection in Neon via Payload's Local API.
 * The collection's afterChange hook fires the notification (see Enquiries.ts).
 */

type Body = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

// Best-effort in-memory rate limit (per server instance).
const HITS = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    HITS.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success to not tip off bots.
  if (str(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries. Please try again in a minute." },
      { status: 429 }
    );
  }

  const name = str(body.name);
  const businessName = str(body.businessName);
  const businessType = str(body.businessType);
  const phone = str(body.phone);
  const city = str(body.city);
  const quantityRaw = str(body.quantity) || String(body.quantity ?? "");
  const quantity = Number.parseInt(quantityRaw, 10);

  if (!name || !businessName || !businessType || !phone || !city) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 422 }
    );
  }
  if (name.length > 200 || str(body.message).length > 5000) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 422 });
  }

  const utm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<
    string,
    unknown
  >;

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "enquiries",
      data: {
        name,
        businessName,
        businessType: businessType as never,
        phone,
        city,
        quantity: Number.isFinite(quantity) ? quantity : undefined,
        quantityUnit: (str(body.quantityUnit) || undefined) as never,
        email: str(body.email) || undefined,
        frequency: (str(body.frequency) || undefined) as never,
        preferredGrade: str(body.preferredGrade) || undefined,
        message: str(body.message) || undefined,
        sourcePage: str(body.sourcePage) || undefined,
        utm: {
          source: str(utm.source) || undefined,
          medium: str(utm.medium) || undefined,
          campaign: str(utm.campaign) || undefined,
          term: str(utm.term) || undefined,
          content: str(utm.content) || undefined,
        },
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] failed to save:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your enquiry. Please try again." },
      { status: 500 }
    );
  }
}
