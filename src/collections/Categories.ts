import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '../access'
import { slugField } from '../fields/slug'
import { revalidateHooks } from '../hooks/revalidateSite'

/** Blog taxonomy (Doc 04 §4). */
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
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
    },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
    },
  ],
  hooks: { ...revalidateHooks },
}
