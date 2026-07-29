// ─────────────────────────────────────────────────────────────
// Marketing attribution (UTM) — first-touch, sessionStorage.
// Captured once at app boot; attached ONLY to Webhook 1 (lead).
// ─────────────────────────────────────────────────────────────

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
type UtmKey = (typeof UTM_KEYS)[number]
export type Attribution = Partial<Record<UtmKey, string>>

const STORAGE_KEY = 'nd_attribution'

/** True for empty values and unresolved GHL merge tags ("{{...}}"). */
function isJunk(v: string | null): boolean {
  if (!v) return true
  return v.includes('{{') || v.includes('}}')
}

function readFromUrl(): Attribution {
  try {
    const q = new URLSearchParams(window.location.search)
    const out: Attribution = {}
    for (const k of UTM_KEYS) {
      const v = q.get(k)
      if (!isJunk(v)) out[k] = (v as string).trim()
    }
    return out
  } catch {
    return {}
  }
}

/**
 * Capture at boot, BEFORE any SPA navigation can clear the query string.
 * First-touch: only writes when nothing is stored yet AND the URL has ≥1 param.
 */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return // already captured this session
    const fromUrl = readFromUrl()
    if (Object.keys(fromUrl).length === 0) return // no campaign → don't clobber
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
  } catch {
    // storage blocked (private mode) → silent; getAttribution falls back to URL
  }
}

/** Returns the stored attribution, or a direct URL read if storage is unavailable. */
export function getAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Attribution
  } catch {
    /* fall through */
  }
  return readFromUrl()
}
