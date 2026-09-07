import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

/** Customer quotes for trust-building (Doc 04 §4, optional but valuable). */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'businessType', 'isFeatured'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'businessType',
      type: 'text',
      admin: { description: 'e.g. "Hotel", "Distributor".' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional logo or photo.' },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
