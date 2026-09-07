import type { Field } from 'payload'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

/**
 * A reusable URL-slug field. Auto-generates from another field (default
 * `title`) when left blank, and normalises whatever is typed. Lives in the
 * admin sidebar.
 */
export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Used in the URL. Leave blank to auto-generate from the title.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }
        const fallback = data?.[from]
        if (typeof fallback === 'string' && fallback.length > 0) {
          return formatSlug(fallback)
        }
        return value
      },
    ],
  },
})
