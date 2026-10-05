import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '../access'
import { slugField } from '../fields/slug'

/**
 * Egg grades / offerings (Doc 04 §3.3 & §4). Not a shopping cart — no prices
 * or checkout; pricing is by quote. Each product surfaces a "Request pricing /
 * Enquire" CTA on the frontend.
 */
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    // Superseded by the Grades collection (v2 docs). Hidden rather than
    // removed so the dev schema push never has to drop its tables.
    hidden: true,
    useAsTitle: 'title',
    defaultColumns: ['title', 'grade', 'order', 'isActive'],
  },
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Large White Eggs"' },
    },
    slugField(),
    {
      name: 'grade',
      type: 'text',
      admin: { description: 'Grade / size, e.g. "Large", "Extra Large".' },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'packaging',
      type: 'array',
      labels: { singular: 'Packaging format', plural: 'Packaging formats' },
      fields: [
        {
          name: 'format',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "30-egg tray", "Carton", "Bulk consignment".' },
        },
        {
          name: 'unit',
          type: 'text',
          admin: { description: 'Optional unit note, e.g. "per tray".' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'capacityNote',
      type: 'text',
      admin: { description: 'Supply-capacity note shown on the product.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers sort first.' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
