/**
 * New-enquiry notifications via Resend's REST API (no extra dependency).
 *
 *   1. Admin notification to ENQUIRY_NOTIFY_EMAIL — every field, reply-to set
 *      to the buyer, one-tap call and WhatsApp links (PRD FR-2.4, FR-9).
 *   2. Buyer confirmation, when the buyer gave an email.
 *
 * Returns the admin email's outcome so the Enquiries hook can record it in
 * `emailStatus`. Never throws — a failed email must not fail the enquiry.
 *
 * Env:
 *   RESEND_API_KEY=re_...
 *   ENQUIRY_NOTIFY_EMAIL=vardaanlayerfarm@gmail.com
 *   ENQUIRY_FROM_EMAIL="Vardaan Layer Farm <enquiries@vardaanlayerfarm.com>"  (Resend-verified)
 */

import { site } from './site'

type EnquiryLike = {
  id: number | string
  name?: string | null
  businessName?: string | null
  businessType?: string | null
  phone?: string | null
  email?: string | null
  city?: string | null
  quantity?: number | null
  quantityUnit?: string | null
  frequency?: string | null
  requiredBy?: string | null
  preferredGrade?: string | null
  message?: string | null
  sourcePage?: string | null
  landingPage?: string | null
  referrer?: string | null
}

export type EmailStatus = 'sent' | 'not_configured' | 'failed'

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const UNIT_LABELS: Record<string, string> = {
  eggs_day: 'eggs / day',
  trays_day: 'trays / day',
  eggs_week: 'eggs / week',
  trays_week: 'trays / week',
  eggs_month: 'eggs / month',
  trays_month: 'trays / month',
}

/** Indian mobile → digits with country code, for tel: and wa.me links. */
function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `91${digits}`
  if (digits.length === 12 && digits.startsWith('91')) return digits
  if (digits.length === 11 && digits.startsWith('0')) return `91${digits.slice(1)}`
  return digits
}

async function send(apiKey: string, body: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[enquiry] email failed (${res.status}): ${detail}`)
      return false
    }
    return true
  } catch (err) {
    console.error('[enquiry] email error:', err)
    return false
  }
}

export async function notifyNewEnquiry(doc: EnquiryLike): Promise<EmailStatus> {
  const quantity = doc.quantity
    ? `${doc.quantity} ${UNIT_LABELS[doc.quantityUnit ?? ''] ?? doc.quantityUnit ?? ''}`.trim()
    : null
  const rows: [string, unknown][] = [
    ['Name', doc.name],
    ['Business', doc.businessName],
    ['Type', doc.businessType],
    ['Phone', doc.phone],
    ['Email', doc.email],
    ['City / area', doc.city],
    ['Quantity', quantity],
    ['Frequency', doc.frequency],
    ['Required by', doc.requiredBy ? new Date(doc.requiredBy).toDateString() : null],
    ['Preferred grade', doc.preferredGrade],
    ['Message', doc.message],
    ['Submitted from', doc.sourcePage],
    ['Landing page', doc.landingPage],
    ['Referrer', doc.referrer],
  ]
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && v !== '')

  const text =
    `New wholesale enquiry (#${doc.id})\n\n` + filled.map(([k, v]) => `${k}: ${v}`).join('\n')

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_NOTIFY_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`

  if (!apiKey || !to) {
    console.info(
      `[enquiry] new lead #${doc.id} (${doc.businessName}) — email not configured, logging only:\n${text}`,
    )
    return 'not_configured'
  }

  const e164 = doc.phone ? toE164(doc.phone) : ''
  const waText = encodeURIComponent(
    `Hi ${doc.name ?? ''}, this is ${site.name} about your egg supply enquiry.`,
  )
  const html = `
<div style="font-family:Inter,Arial,sans-serif;color:#4A3A32;max-width:560px">
  <h2 style="margin:0 0 4px">New enquiry #${esc(doc.id)}</h2>
  <p style="margin:0 0 16px;color:#7A6558">${esc(doc.businessName)} · ${esc(doc.city)}</p>
  ${
    e164
      ? `<p style="margin:0 0 20px">
    <a href="tel:+${e164}" style="display:inline-block;background:#A9573E;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600">Call ${esc(doc.phone)}</a>
    &nbsp;
    <a href="https://wa.me/${e164}?text=${waText}" style="display:inline-block;border:1px solid #E9DCCB;color:#4A3A32;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600">WhatsApp</a>
  </p>`
      : ''
  }
  <table cellpadding="6" style="border-collapse:collapse;width:100%;font-size:14px">
    ${filled
      .map(
        ([k, v]) =>
          `<tr style="border-top:1px solid #E9DCCB"><td style="color:#7A6558;width:140px;vertical-align:top">${esc(k)}</td><td>${esc(v)}</td></tr>`,
      )
      .join('')}
  </table>
</div>`

  const ok = await send(apiKey, {
    from,
    to,
    subject: `New enquiry: ${doc.businessName ?? doc.name ?? 'Wholesale lead'}${quantity ? ` — ${quantity}` : ''}`,
    text,
    html,
    reply_to: doc.email || undefined,
  })

  if (doc.email) {
    await send(apiKey, {
      from,
      to: doc.email,
      reply_to: to,
      subject: `We've got your enquiry — ${site.name}`,
      text:
        `Hi ${doc.name ?? ''},\n\nThanks for your enquiry. We'll call you within ${site.quoteTurnaround} on ${doc.phone ?? 'the number you gave'} to confirm your volume, grade and delivery schedule.\n\n` +
        `Need us sooner? WhatsApp or call ${site.contact.phoneDisplay}.\n\n— ${site.name}, ${site.contact.locationLine}`,
      html: `
<div style="font-family:Inter,Arial,sans-serif;color:#4A3A32;max-width:520px;background:#FFFCF6;padding:28px;border-radius:20px">
  <p style="font-family:Anton,Impact,sans-serif;font-size:28px;letter-spacing:.5px;margin:0">GOT IT!</p>
  <p>Hi ${esc(doc.name)}, thanks for your enquiry. We'll call you within <strong>${esc(site.quoteTurnaround)}</strong> to confirm your volume, grade and delivery schedule.</p>
  <p>Need us sooner? <a href="https://wa.me/${site.contact.whatsappE164}" style="color:#A9573E">WhatsApp</a> or call <a href="tel:+${site.contact.phoneE164}" style="color:#A9573E">${esc(site.contact.phoneDisplay)}</a>.</p>
  <p style="color:#7A6558;font-size:13px;margin-top:24px">${esc(site.name)} · ${esc(site.contact.locationLine)} · Eggs only — no live bird sales.</p>
</div>`,
    })
  }

  return ok ? 'sent' : 'failed'
}
