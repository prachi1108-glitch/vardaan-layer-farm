import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '../access'
import { revalidateHooks } from '../hooks/revalidateSite'

/** Customer quotes for trust-building (Doc 04 §4, optional but valuable). */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'businessType', 'isFeatured'],
  },
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
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
  hooks: { ...revalidateHooks },
}
