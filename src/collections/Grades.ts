import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '../access'
import { revalidateHooks } from '../hooks/revalidateSite'

/**
 * Egg grades for the spec table on /our-eggs (PRD FR-4.1). Weight fields are
 * optional so the table can launch before the farm confirms the bands — an
 * empty weight renders as "To be confirmed" rather than a guessed number.
 */
export const Grades: CollectionConfig = {
  slug: 'grades',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'weightMin', 'weightMax', 'order'],
  },
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  fields: [
    { name: 'name', type: 'text', required: true, admin: { description: 'e.g. "Large"' } },
    {
      type: 'row',
      fields: [
        { name: 'weightMin', type: 'number', admin: { width: '50%', description: 'Grams, inclusive.' } },
        { name: 'weightMax', type: 'number', admin: { width: '50%', description: 'Grams. Leave blank for "and above".' } },
      ],
    },
    { name: 'bestFor', type: 'text', admin: { description: 'One line, e.g. "Breakfast buffets, retail trays"' } },
    { name: 'trayWeight', type: 'text', admin: { description: 'Approximate weight of a 30-egg tray, e.g. "1.7–1.85 kg"' } },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers sort first.' },
    },
  ],
  hooks: { ...revalidateHooks },
}
