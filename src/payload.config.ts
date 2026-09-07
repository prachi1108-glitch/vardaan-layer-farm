import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { Enquiries } from './collections/Enquiries'
import { Testimonials } from './collections/Testimonials'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { Navigation } from './globals/Navigation'
import { createReliableStream } from './lib/db-stream'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Payload CMS configuration for Vardaan Layer Farm.
 *
 * Stack (Doc 04): Payload 3 embedded in Next.js, backed by Neon (Postgres)
 * via the Postgres adapter. Collections and globals are added phase by phase
 * (Phase 2). Phase 1 ships the auth (Users) and Media collections so the
 * admin at /admin works end to end against Neon.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Products,
    Categories,
    Posts,
    Enquiries,
    Testimonials,
  ],
  globals: [SiteSettings, HomePage, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      // Resolve Neon's hostname via public DNS to sidestep flaky router DNS.
      // See src/lib/db-stream.ts for the full rationale.
      stream: createReliableStream,
    },
  }),
  sharp,
})
