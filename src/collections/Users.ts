import type { CollectionConfig } from 'payload'

/**
 * Admin users for the Payload CMS. This is the auth-enabled collection that
 * backs login at /admin. Vardaan's team members get accounts here.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
