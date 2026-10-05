import type { Payload } from 'payload'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import { postEditorFeatures } from './collections/Posts'
import { launchPosts } from './seed-posts'

/**
 * Seed for the v2 content model (Docs 01–07, Oct 2026).
 *
 * Idempotent: each record is matched on a natural key (question / name / slug)
 * and only created when missing, so editors' changes are never overwritten.
 * Site Settings contact fields are only filled when empty or still holding the
 * old placeholder number.
 *
 * Writes only confirmed facts. FAQ answers avoid unconfirmed numbers (MOQ,
 * capacity, weight bands, payment terms) and say "we'll confirm" instead —
 * update them in /admin once the facts sheet is signed off.
 *
 * To run: POST /api/dev-seed while `next dev` is running (route is dev-only).
 */

type FaqSeed = {
  question: string
  answer: string
  topic: 'ordering' | 'grades' | 'delivery' | 'payment' | 'farm'
  showOn: ('home' | 'our-eggs' | 'the-farm' | 'why-vardaan' | 'contact')[]
}

const faqs: FaqSeed[] = [
  // Ordering
  {
    question: 'What is the minimum order for bulk eggs?',
    answer:
      'We supply businesses rather than households, from regular weekly orders up to recurring truckloads. The practical minimum depends on your delivery area and frequency, so tell us your volume and location in the quote form and we will confirm on the call whether we can supply it on your route.',
    topic: 'ordering',
    showOn: ['home', 'our-eggs', 'contact'],
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Send your volume, preferred grade and delivery area through the quote form on the Contact page, or WhatsApp the farm on +91 80532 32718. We call back to confirm the details and share a rate and a delivery schedule.',
    topic: 'ordering',
    showOn: ['contact'],
  },
  {
    question: 'Do you have a price list?',
    answer:
      'No. There is no shelf price because the rate depends on four things: your contracted volume, the grade, how often you need delivery and where it needs to go. Larger standing orders are priced on a better tier. Freight is stated upfront in your quote.',
    topic: 'ordering',
    showOn: ['our-eggs', 'why-vardaan'],
  },
  {
    question: 'Can I place a one-time order for a wedding or event?',
    answer:
      'Yes. Choose "One-time" as the supply frequency in the quote form and add the date you need the eggs. During wedding and festival season, book as early as you can so we can plan the volume against your date.',
    topic: 'ordering',
    showOn: ['why-vardaan'],
  },
  // Grades & quality
  {
    question: 'What egg grades do you supply?',
    answer:
      'We supply white table eggs in three grades — Medium, Large and Extra Large. Every egg is weighed and sorted on our farm before it is packed, so each tray holds one grade. The weight band for each grade is listed on the Our Eggs page.',
    topic: 'grades',
    showOn: ['home', 'our-eggs'],
  },
  {
    question: 'Can I mix grades in one order?',
    answer:
      'Yes. Choose "Mixed" as the preferred grade, or tell us the split in the message box (for example, 60% Large and 40% Medium). Each tray still holds a single grade.',
    topic: 'grades',
    showOn: ['our-eggs'],
  },
  {
    question: 'Do you supply brown eggs?',
    answer: 'No. Our flock lays white eggs, and we supply white table eggs only.',
    topic: 'grades',
    showOn: ['our-eggs'],
  },
  {
    question: 'How many eggs are in a tray?',
    answer:
      'Thirty. We pack in 30-egg moulded pulp trays that interlock and stack, and use larger consignment units for bulk and truckload orders.',
    topic: 'grades',
    showOn: ['our-eggs'],
  },
  // Delivery
  {
    question: 'Which areas do you deliver to?',
    answer:
      'We are based in Sonipat, Haryana and supply businesses in the surrounding region. Put your city or PIN code in the quote form and we will confirm whether we deliver there and on which days.',
    topic: 'delivery',
    showOn: ['home', 'contact'],
  },
  {
    question: 'Can you handle festival and wedding-season peaks?',
    answer:
      'Tell us your peak dates as well as your normal volume when you enquire. Standing customers can plan higher volumes against known dates, and one-time event orders should be booked as early as possible.',
    topic: 'delivery',
    showOn: ['why-vardaan'],
  },
  {
    question: 'What if a delivery is short or damaged?',
    answer:
      'Call or WhatsApp us the same day with a photo of the trays. We check it against the dispatch and agree the fix with you directly. (Farm to confirm the exact policy.)',
    topic: 'delivery',
    showOn: ['why-vardaan'],
  },
  {
    question: 'How fresh are the eggs when they arrive?',
    answer:
      'Eggs are collected from our own sheds every day, graded and packed on the farm, and dispatched on your delivery roster — they do not pass through traders or third-party storage on the way to you.',
    topic: 'delivery',
    showOn: ['the-farm'],
  },
  // Payment & documents
  {
    question: 'What are your payment terms?',
    answer:
      'Payment terms are agreed with each buyer when we quote, based on the size and frequency of the order. Ask about them on the call and they will be written into your quote.',
    topic: 'payment',
    showOn: ['home', 'contact'],
  },
  {
    question: 'Do you provide invoices and compliance documents?',
    answer:
      'Yes — every delivery is invoiced. Institutions that need our licence and registration details for a vendor file can ask for them when they enquire and we will share them with the quote.',
    topic: 'payment',
    showOn: ['contact'],
  },
  // About the farm
  {
    question: 'Do you sell live birds or chicks?',
    answer: 'No. Vardaan supplies eggs only — we do not sell live birds, chicks, meat or hatchery stock.',
    topic: 'farm',
    showOn: ['the-farm'],
  },
  {
    question: 'Where is Vardaan Layer Farm?',
    answer:
      'Our layer farm is in Sonipat district, Haryana, on the doorstep of Delhi NCR. The eggs are laid, graded, packed and dispatched from the same farm.',
    topic: 'farm',
    showOn: ['the-farm'],
  },
]

const grades = [
  { name: 'Medium', bestFor: 'Baking, institutional kitchens, everyday cooking', order: 1 },
  { name: 'Large', bestFor: 'Restaurants, hotel breakfast, retail trays', order: 2 },
  { name: 'Extra Large', bestFor: 'Buffets, premium breakfast, display', order: 3 },
]

const categories = [
  { title: 'Buying Guides', slug: 'buying-guides', description: 'Choosing a supplier, planning volumes and getting the right quote.' },
  { title: 'Egg Quality', slug: 'egg-quality', description: 'Grades, freshness and what makes an egg consistent.' },
  { title: 'Kitchen & Storage', slug: 'kitchen-storage', description: 'Storing and handling eggs in commercial kitchens.' },
  { title: 'Farm Life', slug: 'farm-life', description: 'How a layer farm works, from collection to your dock.' },
  { title: 'Industry', slug: 'industry', description: 'Egg supply, seasons and the market in North India.' },
]

const PLACEHOLDER_PHONES = ['', '+91 90000 00000', '919000000000']

async function ensure(
  payload: Payload,
  collection: 'faqs' | 'grades' | 'categories',
  field: string,
  value: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  const { totalDocs } = await payload.find({ collection, where: { [field]: { equals: value } }, limit: 1, depth: 0 })
  if (totalDocs) return false
  await payload.create({ collection, data: data as never })
  return true
}

export const seed = async (payload: Payload): Promise<Record<string, number>> => {
  const created = { faqs: 0, grades: 0, categories: 0, posts: 0, siteSettings: 0 }

  for (const [i, f] of faqs.entries()) {
    if (await ensure(payload, 'faqs', 'question', f.question, { ...f, order: i })) created.faqs++
  }
  for (const g of grades) {
    if (await ensure(payload, 'grades', 'name', g.name, g)) created.grades++
  }
  for (const c of categories) {
    if (await ensure(payload, 'categories', 'slug', c.slug, c)) created.categories++
  }

  // Launch posts — published drafts for review (created only if the slug is free).
  const editorConfig = await editorConfigFactory.fromFeatures({ config: payload.config, features: postEditorFeatures })
  for (const post of launchPosts) {
    // Publish times are staggered by a minute so "newest first" follows `order`.
    const publishedAt = new Date(Date.now() - (20 - post.order) * 60_000).toISOString()
    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: post.slug } }, limit: 1, depth: 0 })
    if (existing.totalDocs) {
      // One-off repair for drafts first seeded with back-dated publish dates.
      const doc = existing.docs[0] as { id: number | string; publishedAt?: string; createdAt: string }
      if (doc.publishedAt && new Date(doc.publishedAt) < new Date(new Date(doc.createdAt).getTime() - 3_600_000)) {
        await payload.update({ collection: 'posts', id: doc.id, data: { publishedAt } as never })
      }
      continue
    }
    const cat = await payload.find({ collection: 'categories', where: { slug: { equals: post.category } }, limit: 1, depth: 0 })
    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        quickAnswer: post.quickAnswer,
        excerpt: post.excerpt,
        content: convertMarkdownToLexical({ editorConfig, markdown: post.body }),
        faqs: post.faqs,
        category: cat.docs[0]?.id,
        publishedAt,
        seo: { metaTitle: post.metaTitle, metaDescription: post.metaDescription },
        _status: 'published',
      } as never,
    })
    created.posts++
  }

  const s = (await payload.findGlobal({ slug: 'site-settings' })) as Record<string, unknown>
  if (PLACEHOLDER_PHONES.includes(String(s.phone ?? '')) || PLACEHOLDER_PHONES.includes(String(s.phoneE164 ?? ''))) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        tagline: 'Fresh from our flock. On your schedule.',
        phone: '+91 80532 32718',
        phoneE164: '918053232718',
        whatsapp: '918053232718',
        email: 'vardaanlayerfarm@gmail.com',
        address: 'Sonipat, Haryana, India',
        areasServed: [{ name: 'Sonipat' }],
      } as never,
    })
    created.siteSettings = 1
  }

  return created
}
