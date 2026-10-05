import type { CollectionConfig } from 'payload'

import { anyone, canEditContent } from '../access'

/**
 * Uploaded media (farm photos, egg/tray imagery, blog covers, etc.).
 * `alt` is required for accessibility and SEO, per Doc 04.
 * Local disk storage in development; wire a cloud adapter (S3/Cloudinary/
 * UploadThing) before production, per Doc 04 §1 / Doc 05 Phase 2.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: canEditContent,
    update: canEditContent,
    delete: canEditContent,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    // Generated sizes used across the site (Doc 04 §4 Media).
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    focalPoint: true,
    mimeTypes: ['image/*'],
  },
}
