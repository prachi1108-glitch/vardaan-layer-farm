import type { CollectionConfig, Endpoint } from 'payload'

import { anyone, canWorkLeads, isAdmin } from '../access'
import { notifyNewEnquiry } from '../lib/notify'

/**
 * Wholesale enquiry submissions — the leads (Doc 04 §4).
 *
 * Access: anyone can CREATE (the public enquiry form posts here); only
 * authenticated CMS users can read/update/delete. The `status` field turns
 * /admin into a lightweight CRM (New -> Contacted -> Quoted -> Won/Lost).
 *
 * The afterChange hook sends the admin notification + buyer confirmation and
 * records the outcome in `emailStatus` (PRD FR-2.8: a failed email never
 * loses the lead, it just raises a flag in the list view).
 */
const CSV_COLUMNS = [
  'id', 'createdAt', 'status', 'businessName', 'name', 'businessType', 'phone', 'email', 'city',
  'quantity', 'quantityUnit', 'frequency', 'requiredBy', 'preferredGrade', 'message', 'followUpAt',
  'notes', 'emailStatus', 'sourcePage', 'landingPage', 'referrer', 'device',
  'utm.source', 'utm.medium', 'utm.campaign',
] as const

const csvCell = (v: unknown) => {
  const text = v === null || v === undefined ? '' : String(v)
  // Quote every cell; neutralise spreadsheet formula injection.
  const safe = /^[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safe.replace(/"/g, '""')}"`
}

/** GET /api/enquiries/export[?status=new] — CSV download for admin and sales (PRD FR-8.5). */
const exportCsv: Endpoint = {
  path: '/export',
  method: 'get',
  handler: async (req) => {
    if (!req.user || !canWorkLeads({ req } as never)) {
      return Response.json({ error: 'Not allowed' }, { status: 403 })
    }
    const status = new URL(req.url ?? '', 'http://x').searchParams.get('status')
    const { docs } = await req.payload.find({
      collection: 'enquiries',
      where: status ? { status: { equals: status } } : undefined,
      sort: '-createdAt',
      limit: 10000,
      depth: 0,
      overrideAccess: false,
      user: req.user,
    })
    const rows = docs.map((d) =>
      CSV_COLUMNS.map((col) => {
        const v = col.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], d)
        return csvCell(v)
      }).join(','),
    )
    // BOM so Excel opens the UTF-8 file correctly.
    const csv = '\uFEFF' + [CSV_COLUMNS.join(','), ...rows].join('\r\n')
    const date = new Date().toISOString().slice(0, 10)
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="vardaan-enquiries-${date}.csv"`,
      },
    })
  },
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'name', 'businessType', 'city', 'status', 'emailStatus', 'createdAt'],
    group: 'Leads',
    description:
      'Download all enquiries as CSV at /api/enquiries/export (add ?status=new to filter by status).',
  },
  endpoints: [exportCsv],
  access: {
    create: anyone,
    read: canWorkLeads,
    update: canWorkLeads,
    delete: isAdmin,
  },
  fields: [
    // ---- Required (Doc 02 form fields) ----
    { name: 'name', type: 'text', required: true },
    { name: 'businessName', type: 'text', required: true },
    {
      name: 'businessType',
      type: 'select',
      required: true,
      options: [
        { label: 'Hotel', value: 'hotel' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Retailer / Store', value: 'retailer' },
        { label: 'Distributor / Wholesaler', value: 'distributor' },
        { label: 'Caterer', value: 'caterer' },
        { label: 'Institution', value: 'institution' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'phone', type: 'text', required: true },
    { name: 'quantity', type: 'number' },
    {
      name: 'quantityUnit',
      type: 'select',
      options: [
        { label: 'Eggs per day', value: 'eggs_day' },
        { label: 'Trays per day', value: 'trays_day' },
        { label: 'Eggs per week', value: 'eggs_week' },
        { label: 'Trays per week', value: 'trays_week' },
        { label: 'Eggs per month', value: 'eggs_month' },
        { label: 'Trays per month', value: 'trays_month' },
      ],
    },
    { name: 'city', type: 'text' },

    // ---- Optional ----
    { name: 'email', type: 'email' },
    {
      name: 'frequency',
      type: 'select',
      options: [
        { label: 'One-time', value: 'one_time' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Ongoing', value: 'ongoing' },
      ],
    },
    {
      name: 'requiredBy',
      type: 'date',
      admin: { description: 'For one-time orders.', date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'preferredGrade', type: 'text', admin: { description: 'Medium / Large / Extra Large / Mixed' } },
    { name: 'message', type: 'textarea' },
    {
      name: 'consent',
      type: 'checkbox',
      admin: { readOnly: true, description: 'Buyer agreed to be contacted about this enquiry (DPDP Act).' },
    },

    // ---- Pipeline status (CRM) ----
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'followUpAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'notes', type: 'textarea', admin: { description: 'Internal notes — never shown to the buyer.' } },
    {
      name: 'emailStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Sent', value: 'sent' },
        { label: 'Not configured', value: 'not_configured' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: { position: 'sidebar', readOnly: true, description: 'Admin notification email.' },
    },

    // ---- Behind the scenes (attribution) ----
    {
      name: 'sourcePage',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'landingPage', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'referrer', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'device', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    {
      name: 'utm',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'source', type: 'text' },
        { name: 'medium', type: 'text' },
        { name: 'campaign', type: 'text' },
        { name: 'term', type: 'text' },
        { name: 'content', type: 'text' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, operation, req }) => {
        if (operation === 'create') {
          // Fire-and-forget so a slow email never blocks the save; the result
          // is written back to emailStatus once known.
          void notifyNewEnquiry(doc).then((emailStatus) =>
            req.payload
              .update({ collection: 'enquiries', id: doc.id, data: { emailStatus } })
              .catch((err) =>
                req.payload.logger.error({ err }, '[enquiry] could not record emailStatus'),
              ),
          )
        }
        return doc
      },
    ],
  },
}
