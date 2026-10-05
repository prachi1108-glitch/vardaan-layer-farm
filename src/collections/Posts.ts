import type { CollectionConfig } from 'payload'
import { EXPERIMENTAL_TableFeature, lexicalEditor, type FeatureProviderServer } from '@payloadcms/richtext-lexical'

import { anyone, canEditContent } from '../access'
import { slugField } from '../fields/slug'
import { revalidateHooks } from '../hooks/revalidateSite'

/**
 * Blog posts (Doc 04 §3.5 & §4). Drafts/preview enabled via Payload versions;
 * public reads only see published posts.
 */
/** Post body editor: defaults + tables (spec data in real HTML tables for AEO, PRD §5.4). */
export const postEditorFeatures = ({ defaultFeatures }: { defaultFeatures: FeatureProviderServer[] }) => [
  ...defaultFeatures,
  EXPERIMENTAL_TableFeature(),
]

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    description:
      'Resources articles. Every post needs a Quick answer and at least one link to Our Eggs or Contact.',
  },
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'quickAnswer',
      type: 'textarea',
      admin: {
        description:
          'AEO "Quick answer" box shown under the title: a 40–60 word direct answer to the question the post targets.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short summary shown in listings and previews.' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({ features: postEditorFeatures }),
    },
    {
      name: 'faqs',
      type: 'array',
      labels: { singular: 'FAQ', plural: 'FAQs' },
      admin: { description: '3–6 questions shown at the end of the post (FAQPage schema).' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      maxRows: 3,
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
      admin: { position: 'sidebar' },
    },
    {
      name: 'byline',
      label: 'Author',
      type: 'relationship',
      relationTo: 'authors',
      admin: { position: 'sidebar', description: 'Public author profile shown on the post.' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      label: 'CMS owner',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Internal — the team member responsible. Not shown publicly.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        { name: 'noindex', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
  hooks: {
    ...revalidateHooks,
    beforeChange: [
      ({ data }) => {
        // Default publishedAt to now when a post is first published without one.
        if (data && data._status === 'published' && !data.publishedAt) {
          return { ...data, publishedAt: new Date().toISOString() }
        }
        return data
      },
    ],
  },
}
