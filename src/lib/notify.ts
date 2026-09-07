/**
 * New-enquiry notification.
 *
 * Sends an email to Vardaan when RESEND_API_KEY + ENQUIRY_NOTIFY_EMAIL are set
 * (via Resend's REST API — no extra dependency). If they aren't configured, it
 * logs the lead to the server console instead, so the app works out of the box
 * and becomes "live" the moment those env vars are added. Never throws — a
 * failed notification must not fail the enquiry itself.
 *
 * To enable email:
 *   RESEND_API_KEY=re_...              (https://resend.com)
 *   ENQUIRY_NOTIFY_EMAIL=leads@...     (where leads should land)
 *   ENQUIRY_FROM_EMAIL=enquiries@yourdomain  (a Resend-verified sender; optional)
 */

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
  preferredGrade?: string | null
  message?: string | null
  sourcePage?: string | null
}

const line = (label: string, value: unknown) =>
  value === undefined || value === null || value === '' ? '' : `${label}: ${value}\n`

export async function notifyNewEnquiry(doc: EnquiryLike): Promise<void> {
  const body =
    `New wholesale enquiry (#${doc.id})\n\n` +
    line('Name', doc.name) +
    line('Business', doc.businessName) +
    line('Type', doc.businessType) +
    line('Phone', doc.phone) +
    line('Email', doc.email) +
    line('City', doc.city) +
    line('Quantity', doc.quantity ? `${doc.quantity} ${doc.quantityUnit ?? ''}`.trim() : null) +
    line('Frequency', doc.frequency) +
    line('Preferred grade', doc.preferredGrade) +
    line('Message', doc.message) +
    line('Source', doc.sourcePage)

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_NOTIFY_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL || 'onboarding@resend.dev'

  if (!apiKey || !to) {
    // Not configured — log so the lead is still visible server-side.
    console.info(`[enquiry] new lead #${doc.id} (${doc.businessName}) — email not configured, logging only:\n${body}`)
    return
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New enquiry: ${doc.businessName ?? doc.name ?? 'Wholesale lead'}`,
        text: body,
        reply_to: doc.email || undefined,
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`[enquiry] notification email failed (${res.status}): ${detail}`)
    }
  } catch (err) {
    console.error('[enquiry] notification email error:', err)
  }
}
