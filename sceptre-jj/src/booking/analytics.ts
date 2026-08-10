// ─────────────────────────────────────────────────────────────
// Tracking helpers — one path per event, no GTM.
//   Meta  → fbq   (Pixel base in index.html) + server-side CAPI
//           mirror with the SAME event_id (Meta dedupes, §7.6)
//   GA4   → gtag  (config in index.html)
//   Ads   → gtag conversion
// All fire-and-forget: never throw / block the funnel.
// IDs from novodash-tools.conversoes_tracking (Sceptre Jiu Jitsu - San Mateo CA).
// ─────────────────────────────────────────────────────────────
import { getFbc, getFbp } from './fb'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Meta Pixel id — the SAME id as index.html's base snippet and api/capi.ts. */
export const PIXEL_ID = '988105583882569'

// Google Ads conversion targets (empty → no-op via guard).
const GOOGLE_ADS_ID = 'AW-18069132625'
const GADS_LEAD_LABEL = 'hgzSCNDym9UcENGqhKhD'
const GADS_BOOKING_LABEL = 'FUchCIn8m9UcENGqhKhD'

export const GADS_LEAD = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/${GADS_LEAD_LABEL}` : ''
export const GADS_BOOKING = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/${GADS_BOOKING_LABEL}` : ''

const CAPI_ENDPOINT = '/api/capi'

export interface IdentifyFields {
  name?: string
  email?: string
  phone?: string
}

/** Last identified visitor — enriches the following server-side events. PII
 *  travels in the clear ONLY to the first-party endpoint; SHA-256 happens
 *  there (§7.6.4). */
let identified: IdentifyFields = {}

function newEventId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}

/**
 * Meta standard event — browser Pixel + CAPI mirror, same event_id (§7.6).
 * Allowed events: PageView, ViewContent, Lead, Schedule — no e-commerce.
 * The mirror goes out even when fbq is blocked: that's the case it covers.
 */
export function fbqTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const eventId = newEventId()
  if (typeof window.fbq === 'function') {
    window.fbq('track', event, params ?? {}, { eventID: eventId })
  }
  fetch(CAPI_ENDPOINT, {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event,
      event_id: eventId,
      params,
      url: window.location.href,
      fbp: getFbp(),
      fbc: getFbc(),
      user: identified,
    }),
  }).catch(() => {})
}

/** Advanced Matching (§7.6.4): remember the visitor for the mirrored events
 *  that follow, and hand the same fields to the Pixel (fbq hashes in-browser). */
export function identify(fields: IdentifyFields): void {
  identified = { ...identified, ...fields }
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  const data: Record<string, string> = {}
  if (fields.email) data.em = fields.email.trim().toLowerCase()
  if (fields.phone) {
    const digits = fields.phone.replace(/\D/g, '')
    if (digits) data.ph = digits.length === 10 ? `1${digits}` : digits
  }
  if (fields.name) {
    const parts = fields.name.trim().toLowerCase().split(/\s+/)
    if (parts[0]) data.fn = parts[0]
    if (parts.length > 1) data.ln = parts.slice(1).join(' ')
  }
  if (Object.keys(data).length > 0) window.fbq('init', PIXEL_ID, data)
}

/** GA4 event via gtag. No-op if gtag didn't load. */
export function ga4Event(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params || {})
}

/** Google Ads conversion. No-op if gtag didn't load or the target is empty. */
export function gtagConversion(sendTo: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  if (!sendTo) return
  window.gtag('event', 'conversion', { send_to: sendTo })
}

/** Enhanced Conversions: set hashed user data once (before the Lead conversion). */
export function setEnhancedUserData(email: string, phoneE164: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('set', 'user_data', { email, phone_number: phoneE164 })
}
