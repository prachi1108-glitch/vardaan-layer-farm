import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * On-demand revalidation after a CMS publish (PRD FR-8.6). FAQs, grades,
 * posts and site settings feed many pages (footer, FAQ blocks, llms.txt,
 * sitemap), so the whole site layout is invalidated — it's small, and pages
 * re-render lazily on their next visit.
 *
 * Outside a Next.js request (e.g. a CLI script) revalidatePath throws; that's
 * harmless, so it's swallowed.
 */
function revalidateAll() {
  try {
    revalidatePath('/', 'layout')
  } catch {
    /* not running inside Next.js */
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  revalidateAll()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateAll()
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  revalidateAll()
  return doc
}

/** Spread into a collection config: `hooks: { ...revalidateHooks }`. */
export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
}
