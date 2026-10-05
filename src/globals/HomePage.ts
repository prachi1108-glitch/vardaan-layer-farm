import type { GlobalConfig } from 'payload'

import { anyone, canEditContent } from '../access'

/** Editable homepage content (Doc 04 §3.1 & §4 Globals). */
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  // Not used by the v2 site (copy lives in code until the pages/blocks model
  // lands; menus are in src/lib/site.ts). Hidden, not removed, to avoid a
  // destructive schema push.
  admin: { hidden: true },
  label: 'Home Page',
  access: {
    read: anyone,
    update: canEditContent,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroEyebrow', type: 'text' },
            { name: 'heroHeading', type: 'text' },
            { name: 'heroSubheading', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'ctaPrimaryLabel', type: 'text', admin: { width: '50%' } },
                { name: 'ctaPrimaryHref', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'ctaSecondaryLabel', type: 'text', admin: { width: '50%' } },
                { name: 'ctaSecondaryHref', type: 'text', admin: { width: '50%' } },
              ],
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            {
              name: 'enableHeroAnimation',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Show the hen & egg hero animation (Phase 4).' },
            },
          ],
        },
        {
          label: 'Trust stats',
          fields: [
            {
              name: 'trustStats',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Pillars',
          fields: [
            {
              name: 'pillars',
              type: 'array',
              admin: { description: 'Reliability, Freshness, Consistency, Scale.' },
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'Icon key (e.g. "reliability").' } },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Who we serve',
          fields: [
            {
              name: 'whoWeServe',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'How it works',
          fields: [
            {
              name: 'howItWorks',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'CTA band',
          fields: [
            { name: 'ctaBandHeading', type: 'text' },
            { name: 'ctaBandText', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'ctaBandButtonLabel', type: 'text', admin: { width: '50%' } },
                { name: 'ctaBandButtonHref', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
