import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '../access'
import { revalidateHooks } from '../hooks/revalidateSite'

/**
 * Questions and answers (PRD §7). One FAQ can appear on several pages via
 * `showOn`; the FAQ hub at /resources/faq lists all of them grouped by topic.
 * Answers are plain text so they can go straight into FAQPage JSON-LD.
 */
export const FAQ_PAGES = [
  { label: 'Home', value: 'home' },
  { label: 'Our Eggs', value: 'our-eggs' },
  { label: 'The Farm', value: 'the-farm' },
  { label: 'Why Vardaan', value: 'why-vardaan' },
  { label: 'Contact', value: 'contact' },
] as const

export const FAQ_TOPICS = [
  { label: 'Ordering', value: 'ordering' },
  { label: 'Grades & quality', value: 'grades' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Payment & documents', value: 'payment' },
  { label: 'About the farm', value: 'farm' },
] as const

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'topic', 'showOn', 'order'],
  },
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      admin: { description: 'Plain text, 40–80 words. Answer the question in the first sentence.' },
    },
    {
      name: 'topic',
      type: 'select',
      required: true,
      options: [...FAQ_TOPICS],
      admin: { position: 'sidebar' },
    },
    {
      name: 'showOn',
      type: 'select',
      hasMany: true,
      options: [...FAQ_PAGES],
      admin: { position: 'sidebar', description: 'Pages that show this FAQ. The FAQ hub shows all.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers sort first.' },
    },
  ],
  hooks: { ...revalidateHooks },
}
