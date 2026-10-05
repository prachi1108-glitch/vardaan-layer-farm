import type { GlobalConfig } from 'payload'

import { anyone, canEditContent } from '../access'

/** Editable header/footer menus (Doc 04 §4 Globals, optional). */
export const Navigation: GlobalConfig = {
  slug: 'navigation',
  // Not used by the v2 site (copy lives in code until the pages/blocks model
  // lands; menus are in src/lib/site.ts). Hidden, not removed, to avoid a
  // destructive schema push.
  admin: { hidden: true },
  access: {
    read: anyone,
    update: canEditContent,
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
