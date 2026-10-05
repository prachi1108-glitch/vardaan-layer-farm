import type { Access, FieldAccess } from 'payload'

/**
 * Access-control helpers (PRD FR-8.1).
 *
 * Three roles live on the Users collection:
 *   - admin:  everything
 *   - editor: pages, posts, media, FAQs, grades — no leads, no users
 *   - sales:  read/update enquiries only
 *
 * Content collections are publicly readable so the site can render them.
 * Enquiries are the exception: anyone may create one (the public form), but
 * only admin and sales may read or work them.
 */

type Role = 'admin' | 'editor' | 'sales'

const roleOf = (user: unknown): Role | null => {
  if (!user || typeof user !== 'object') return null
  const role = (user as { role?: string | null }).role
  // Accounts created before roles existed have no value — treat as admin.
  return (role as Role) || 'admin'
}

/** Anyone (public reads and public enquiry creation). */
export const anyone: Access = () => true

/** Any logged-in CMS user. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => roleOf(user) === 'admin'

/** Admin or editor — content management. */
export const canEditContent: Access = ({ req: { user } }) => {
  const role = roleOf(user)
  return role === 'admin' || role === 'editor'
}

/** Admin or sales — the leads pipeline. */
export const canWorkLeads: Access = ({ req: { user } }) => {
  const role = roleOf(user)
  return role === 'admin' || role === 'sales'
}

export const isAdminField: FieldAccess = ({ req: { user } }) => roleOf(user) === 'admin'
