import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

/**
 * Admin users for the Payload CMS. This is the auth-enabled collection that
 * backs login at /admin. Vardaan's team members get accounts here.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'Reserved for future permission tiers. All users can manage content for now.',
      },
    },
  ],
}
