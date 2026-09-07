import { NextResponse } from "next/server";

/**
 * Enquiry intake endpoint.
 *
 * ── TODO before launch: connect this to a real destination ──
 * Right now it validates the payload and logs it server-side, then returns
 * success so the form works end-to-end. To actually receive leads, wire one of:
 *   • Email (e.g. Resend / Nodemailer / SendGrid) to the farm's inbox
 *   • A CRM or Google Sheet via webhook
 *   • WhatsApp Business API
 * Add the integration where marked below. Keep the validation.
 */

type Payload = Record<string, string>;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const buyerType = (body.buyerType ?? "").trim();

  if (!name || !phone || !buyerType) {
    return NextResponse.json(
      { ok: false, error: "Name, phone and buyer type are required." },
      { status: 422 }
    );
  }

  // Basic honeypot / length guard against obvious spam.
  if (name.length > 200 || (body.message ?? "").length > 5000) {
    return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 422 });
  }

  // ── Integration point ──────────────────────────────────────────────
  // Replace this log with a real send (email / CRM / sheet / WhatsApp API).
  console.info("[enquiry] new lead:", {
    ...body,
    receivedAt: new Date().toISOString(),
  });
  // ───────────────────────────────────────────────────────────────────

  return NextResponse.json({ ok: true });
}
