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
import { Faqs } from './collections/Faqs'
import { Grades } from './collections/Grades'
import { Authors } from './collections/Authors'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { Navigation } from './globals/Navigation'
import { createReliableStream } from './lib/db-stream'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** True on Vercel (or any host that sets it) — see the `stream` note below. */
const isHosted = Boolean(process.env.VERCEL)

/**
 * Payload CMS configuration for Vardaan Layer Farm.
 *
 * Stack (PRD §6): Payload 3 embedded in Next.js, backed by Neon (Postgres)
 * via the Postgres adapter. Content model per PRD §7. Superseded v1 schema
 * (Products, HomePage, Navigation) is hidden rather than removed so the dev
 * schema push stays additive — drop it with a proper migration later.
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
    Authors,
    Faqs,
    Grades,
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
      // See src/lib/db-stream.ts for the full rationale. This is a workaround
      // for one local network only: hosted runtimes resolve Neon fine, and
      // forcing their DNS through 1.1.1.1 would be a liability, not a fix.
      stream: isHosted ? undefined : createReliableStream,
    },
  }),
  sharp,
})
