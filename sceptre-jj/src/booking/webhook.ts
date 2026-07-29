// ─────────────────────────────────────────────────────────────
// Webhook transport + payload assembly + live slots fetch.
//   Webhook 1 (lead)     → GHL Inbound Webhook (per-academy URL)
//   Webhook 2 (booking)  → shared n8n workflow (FIXED URL)  ⚠️ critical contract
//   get_slots            → same n8n URL, action:"get_slots"
// ─────────────────────────────────────────────────────────────
import {
  PROGRAM_LABEL,
  PROGRAM_AUDIENCE,
  PROGRAM_CALENDAR_ID,
  formatTimeLabel,
  isoDate,
  type Program,
  type SlotMap,
} from './schedule'
import { getAttribution } from './attribution'

// FIXED for all academies — do not parametrize.
const N8N_ORIGIN = 'https://n8n.novodash.com'
const N8N_PATH = 'webhook'
export const BOOKING_WEBHOOK_URL = `${N8N_ORIGIN}/${N8N_PATH}/landing-page-booking`

// location_id defined ONCE; Webhook 1 URL is derived from it so they never diverge.
export const GHL_LOCATION_ID = 'wjbxnKUT1TDSJVbp2pQt'
const LEAD_WEBHOOK_UUID = 'FjqaJYQXRrnjioDAlCb8'
export const LEAD_WEBHOOK_URL = `https://services.leadconnectorhq.com/hooks/${GHL_LOCATION_ID}/webhook-trigger/${LEAD_WEBHOOK_UUID}`

const SOURCE_LABEL = 'Landing Page - Main'

export interface BookingData {
  name: string
  email: string
  phone: string
  program: Program | ''
  childName: string
  date: string // "YYYY-MM-DD"
  time: string // "HH:MM" (24h internal)
}

// ─── helpers ───

export function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/)
  return { first: parts[0] ?? '', last: parts.slice(1).join(' ') }
}

/** +1XXXXXXXXXX from a US phone; falls back to raw digits. */
export function toE164(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return digits ? `+${digits}` : ''
}

/** child_name only when kids AND filled; otherwise null (key omitted). */
export function childNameOrNull(d: BookingData): string | null {
  if (!d.program) return null
  const isKids = PROGRAM_AUDIENCE[d.program] === 'kids'
  const cn = d.childName.trim()
  return isKids && cn.length >= 2 ? cn : null
}

/** POST JSON, fire-and-forget. Never throws; logs failures. */
async function post(url: string, payload: unknown): Promise<void> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
    if (!res.ok) {
      console.warn(`[webhook] ${url} → HTTP ${res.status}`)
    } else if (import.meta.env.DEV) {
      console.info(`[webhook] ${url} → ok`)
    }
  } catch (err) {
    console.warn(`[webhook] ${url} → network error`, err)
  }
}

// ─── Webhook 1 — lead ───
export function sendLeadWebhook(d: BookingData): void {
  if (!d.program) return
  const { first, last } = splitName(d.name)
  const cn = childNameOrNull(d)
  const payload = {
    event: 'lead_captured',
    name: d.name.trim(),
    firstName: first,
    lastName: last,
    ...(cn ? { child_name: cn } : {}),
    email: d.email.trim(),
    phone: d.phone.trim(),
    phoneE164: toE164(d.phone),
    program: PROGRAM_LABEL[d.program],
    audience: PROGRAM_AUDIENCE[d.program],
    submittedAt: new Date().toISOString(),
    source: SOURCE_LABEL,
    ...getAttribution(), // UTM keys spread at top level (empty when no campaign)
  }
  void post(LEAD_WEBHOOK_URL, payload)
}

// ─── Webhook 2 — booking (⚠️ exact schema expected by the shared n8n workflow) ───
export function sendBookingWebhook(d: BookingData): void {
  if (!d.program) return
  const cn = childNameOrNull(d)
  const payload = {
    parent_name: d.name.trim(),
    ...(cn ? { child_name: cn } : {}),
    email: d.email.trim(),
    phone: d.phone.trim(),
    calendar_id: PROGRAM_CALENDAR_ID[d.program],
    location_id: GHL_LOCATION_ID,
    stage: 'appointment_selected',
    appointment_date: d.date, // YYYY-MM-DD (local)
    appointment_time: formatTimeLabel(d.time), // "h:mm AM/PM"
    source: SOURCE_LABEL,
  }
  void post(BOOKING_WEBHOOK_URL, payload)
}

// ─── Live free-slots from GHL (via the same n8n workflow, action:"get_slots") ───
export async function fetchSlots(program: Program): Promise<SlotMap> {
  const res = await fetch(BOOKING_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'get_slots',
      location_id: GHL_LOCATION_ID,
      calendar_id: PROGRAM_CALENDAR_ID[program],
    }),
  })
  if (!res.ok) throw new Error(`get_slots HTTP ${res.status}`)
  const raw = (await res.json()) as Record<string, unknown>

  const map: SlotMap = {}
  for (const [day, val] of Object.entries(raw)) {
    // Ignore non-date keys (e.g. traceId): only entries whose `slots` is an array.
    const slots = (val as { slots?: unknown })?.slots
    if (!Array.isArray(slots)) continue
    // ISO already in the academy's tz → derive local date/time by string slice.
    map[day] = slots
      .filter((s): s is string => typeof s === 'string')
      .map((iso) => iso.slice(11, 16)) // "HH:MM"
  }
  return map
}

export { isoDate }
