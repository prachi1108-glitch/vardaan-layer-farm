import type { Access } from 'payload'

/**
 * Access-control helpers.
 *
 * The site has a single authenticated Users collection whose members run the
 * CMS, so "admin" == "any logged-in user" here. Content collections are
 * publicly readable (so the site and any API consumer can read them); writes
 * are restricted to logged-in users. Enquiries are the exception: anyone may
 * create one (the public form), but only logged-in users may read them.
 */

/** Anyone (used for public reads and public enquiry creation). */
export const anyone: Access = () => true

/** Only authenticated CMS users. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
