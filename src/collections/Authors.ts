import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '../access'
import { revalidateHooks } from '../hooks/revalidateSite'

/** Public author profiles for Resources posts (E-E-A-T, PRD §5.5). */
export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', admin: { description: 'e.g. "Farm manager, Vardaan Layer Farm"' } },
    { name: 'bio', type: 'textarea' },
    { name: 'credentials', type: 'text', admin: { description: 'Years of experience, qualifications.' } },
    { name: 'photo', type: 'upload', relationTo: 'media' },
  ],
  hooks: { ...revalidateHooks },
}
