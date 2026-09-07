import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

/** Editable header/footer menus (Doc 04 §4 Globals, optional). */
export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'headerLinks',
      type: 'array',
      label: 'Header links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'footerGroups',
      type: 'array',
      label: 'Footer link groups',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
