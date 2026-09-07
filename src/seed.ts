import type { Payload } from 'payload'

/**
 * Seed routine — populates the CMS with brand copy and structure from the
 * planning docs so the admin isn't empty and Phase 3 pages have data.
 *
 * Deliberately does NOT invent figures (capacity, years, real contact details)
 * or testimonials — those are left as empty slots for Vardaan to fill with
 * verified information via /admin.
 *
 * To re-run: add a temporary dev-only route that calls `seed(payload)` with a
 * Local-API Payload instance (getPayload), POST to it, then remove the route.
 * Safe to re-run: globals are upserted; collections are only seeded when empty.
 */

export const seed = async (payload: Payload): Promise<void> => {
  // ---- Globals -------------------------------------------------------------
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      tagline: 'Reliable bulk egg supply your business can count on.',
      // Contact details are intentionally left blank — fill with real,
      // verified details in /admin before launch.
    },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroEyebrow: 'Bulk egg supply',
      heroHeading:
        'Reliable bulk egg supply for hotels, restaurants, retailers & distributors.',
      heroSubheading:
        'Fresh eggs from our own layer farm — supplied in the volumes your business needs, with consistent grading and dependable delivery.',
      ctaPrimaryLabel: 'Get a Quote',
      ctaPrimaryHref: '/wholesale-enquiry',
      ctaSecondaryLabel: 'View our eggs',
      ctaSecondaryHref: '/products',
      enableHeroAnimation: true,
      // trustStats left empty on purpose — add real figures (capacity, years,
      // businesses served, areas covered) in /admin.
      pillars: [
        { icon: 'reliability', title: 'Reliability', text: 'Consistent volumes, on schedule — the message that matters most to B2B buyers.' },
        { icon: 'freshness', title: 'Freshness', text: 'Eggs straight from our own flock, not a re-seller’s warehouse.' },
        { icon: 'consistency', title: 'Quality & consistency', text: 'Uniform grading and quality control, batch after batch.' },
        { icon: 'scale', title: 'Scale & capacity', text: 'Built to serve businesses, from a single restaurant to a distributor’s network.' },
      ],
      whoWeServe: [
        { title: 'Hotels', description: 'Dependable supply so the kitchen never runs short mid-service.' },
        { title: 'Restaurants & cloud kitchens', description: 'Consistent size and quality for predictable portioning and costing.' },
        { title: 'Retailers & kirana stores', description: 'Direct-from-farm freshness with steady restocking.' },
        { title: 'Distributors & wholesalers', description: 'High-capacity, consistent supply you can build commitments on.' },
        { title: 'Institutions & caterers', description: 'Guaranteed volume on a fixed, scheduled basis.' },
      ],
      howItWorks: [
        { title: 'Enquire', text: 'Tell us your requirement — business type, volume, location and frequency.' },
        { title: 'Get a quote', text: 'We respond with pricing suited to your volumes.' },
        { title: 'Reliable ongoing supply', text: 'We deliver consistently, order after order.' },
      ],
      ctaBandHeading: 'Tell us what you need',
      ctaBandText: 'Share your requirement and we’ll get you a quote.',
      ctaBandButtonLabel: 'Get a Quote',
      ctaBandButtonHref: '/wholesale-enquiry',
    },
  })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      headerLinks: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Our Eggs', href: '/products' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
      footerGroups: [
        {
          title: 'Explore',
          links: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Our Eggs', href: '/products' },
            { label: 'Wholesale Enquiry', href: '/wholesale-enquiry' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      ],
    },
  })

  // ---- Products (standard egg grades) -------------------------------------
  const productCount = await payload.count({ collection: 'products' })
  if (productCount.totalDocs === 0) {
    const grades = [
      { title: 'Small White Eggs', grade: 'Small', order: 1 },
      { title: 'Medium White Eggs', grade: 'Medium', order: 2 },
      { title: 'Large White Eggs', grade: 'Large', order: 3 },
      { title: 'Extra Large White Eggs', grade: 'Extra Large', order: 4 },
    ]
    for (const g of grades) {
      await payload.create({
        collection: 'products',
        data: {
          ...g,
          isActive: true,
          packaging: [{ format: '30-egg tray', unit: 'per tray' }],
          capacityNote: 'Available for recurring bulk supply. [Add real capacity figures.]',
        },
      })
    }
    payload.logger.info('Seeded 4 product grades.')
  }

  // ---- Blog: one category + one placeholder post --------------------------
  const catCount = await payload.count({ collection: 'categories' })
  if (catCount.totalDocs === 0) {
    const category = await payload.create({
      collection: 'categories',
      data: { title: 'Supply & Industry', description: 'Guides and news on bulk egg supply.' },
    })
    await payload.create({
      collection: 'posts',
      data: {
        title: 'Welcome to the Vardaan Layer Farm blog',
        excerpt:
          'Notes on reliable bulk egg supply, freshness and working with a dependable farm partner. [Replace with real posts.]',
        category: category.id,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    })
    payload.logger.info('Seeded 1 category and 1 placeholder post.')
  }

  payload.logger.info('Seed complete.')
}
