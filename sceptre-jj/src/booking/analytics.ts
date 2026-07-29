// ─────────────────────────────────────────────────────────────
// Tracking helpers — one path per event, no GTM.
//   Meta  → fbq   (Pixel base in index.html)
//   GA4   → gtag  (config in index.html)
//   Ads   → gtag conversion
// All fire-and-forget: never throw / block the funnel.
// ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// Google Ads conversion targets (empty → no-op via guard).
const GOOGLE_ADS_ID = 'AW-16704408349'
const GADS_LEAD_LABEL = 'o39JCP-3zNgcEJ2WpJ0-'
const GADS_BOOKING_LABEL = '65EhCK_ntNgcEJ2WpJ0-'

export const GADS_LEAD = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/${GADS_LEAD_LABEL}` : ''
export const GADS_BOOKING = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/${GADS_BOOKING_LABEL}` : ''

/** Meta Pixel standard event. No-op if the Pixel didn't load. */
export function fbqTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', event, params || {})
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
