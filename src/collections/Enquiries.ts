import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

/**
 * Wholesale enquiry submissions — the leads (Doc 04 §4).
 *
 * Access: anyone can CREATE (the public enquiry form posts here); only
 * authenticated CMS users can read/update/delete. The `status` field turns
 * /admin into a lightweight CRM (New -> Contacted -> Quoted -> Won/Lost).
 *
 * Notifications (email/WhatsApp to Vardaan) are wired in Phase 3; the
 * afterChange hook below currently just logs new leads server-side.
 */
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'name', 'businessType', 'city', 'status', 'createdAt'],
    group: 'Leads',
  },
  access: {
    create: anyone,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
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
    { name: 'preferredGrade', type: 'text' },
    { name: 'message', type: 'textarea' },

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

    // ---- Behind the scenes (attribution) ----
    {
      name: 'sourcePage',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
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
      ({ doc, operation }) => {
        if (operation === 'create') {
          // TODO (Phase 3): send email/WhatsApp notification to Vardaan.
          console.info('[enquiry] new lead:', {
            id: doc.id,
            businessName: doc.businessName,
            businessType: doc.businessType,
            city: doc.city,
            phone: doc.phone,
          })
        }
        return doc
      },
    ],
  },
}
