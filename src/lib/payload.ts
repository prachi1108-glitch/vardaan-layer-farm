import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Server-side Payload Local API client for use in Server Components and route
 * handlers. `getPayload` caches the instance internally, so calling this per
 * request is fine.
 */
export const getPayloadClient = () => getPayload({ config })
