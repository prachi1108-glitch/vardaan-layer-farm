import type { CollectionConfig } from 'payload'

/**
 * Uploaded media (farm photos, egg/tray imagery, blog covers, etc.).
 * `alt` is required for accessibility and SEO, per Doc 04.
 * Local disk storage in development; wire a cloud adapter (S3/Cloudinary/
 * UploadThing) before production, per Doc 04 §1 / Doc 05 Phase 2.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
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
  upload: true,
}
