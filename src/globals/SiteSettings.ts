import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

/** Brand + contact details used site-wide (Doc 04 §4 Globals). */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
        { name: 'tagline', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text', admin: { width: '50%', description: 'Display format, e.g. +91 90000 00000' } },
            { name: 'phoneE164', type: 'text', admin: { width: '50%', description: 'Digits only for tel:/wa.me, e.g. 919000000000' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'whatsapp', type: 'text', admin: { width: '50%', description: 'WhatsApp number (digits only).' } },
            { name: 'email', type: 'email', admin: { width: '50%' } },
          ],
        },
        { name: 'address', type: 'textarea' },
        { name: 'businessHours', type: 'text' },
        { name: 'mapEmbedUrl', type: 'text', admin: { description: 'Google Maps embed URL (leave blank to hide the map).' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Social & Compliance',
      fields: [
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'X (Twitter)', value: 'x' },
              ],
            },
            { name: 'url', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'gstNumber', type: 'text', label: 'GST number', admin: { width: '50%' } },
            { name: 'licenceNumber', type: 'text', admin: { width: '50%', description: 'FSSAI / licence number.' } },
          ],
        },
      ],
    },
  ],
}
