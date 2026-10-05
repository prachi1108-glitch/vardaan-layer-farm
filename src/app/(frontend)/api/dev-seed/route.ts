import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { seed } from "@/seed";

/**
 * Dev-only seed trigger (`payload run` can't resolve the config alias on this
 * Node setup). Returns 404 outside development. POST to run.
 */
export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const payload = await getPayloadClient();
  const created = await seed(payload);
  return NextResponse.json({ ok: true, created });
}
