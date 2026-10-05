import type { CollectionConfig } from 'payload'

import { authenticated, isAdmin, isAdminField } from '../access'

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
    create: isAdmin,
    // Admins may update anyone; everyone else only their own account.
    update: ({ req: { user } }) => {
      if (!user) return false
      const role = (user as { role?: string | null }).role
      if (!role || role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: isAdmin,
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
        { label: 'Sales', value: 'sales' },
      ],
      access: { update: isAdminField },
      admin: {
        description:
          'Admin: everything. Editor: pages, posts, media, FAQs, grades. Sales: enquiries only.',
      },
    },
  ],
}
