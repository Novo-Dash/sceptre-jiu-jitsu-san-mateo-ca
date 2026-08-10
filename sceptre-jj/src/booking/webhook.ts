// ─────────────────────────────────────────────────────────────
// Webhook transport + payload assembly + the ONE live fetch.
//   Webhook 1 (lead)     → GHL Inbound Webhook (per-academy URL)
//   Webhook 2 (booking)  → shared n8n workflow (FIXED URL)  ⚠️ critical contract
//   get_programs         → same n8n URL — programs AND slots in one call (§5.1)
// ─────────────────────────────────────────────────────────────
import {
  PROGRAM_OVERRIDES,
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
  program: Program | null // live GHL program object (§5.1)
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
  if (d.program?.audience !== 'kids') return null
  const cn = d.childName.trim()
  return cn.length >= 2 ? cn : null
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
    program: d.program.name, // raw GHL calendar name → CRM Program field (never the alias)
    audience: d.program.audience, // adults | kids — as delivered by GHL (§5.1)
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
    calendar_id: d.program.calendar_id, // matches the calendar in n8n (rename-proof)
    location_id: GHL_LOCATION_ID,
    stage: 'appointment_selected',
    appointment_date: d.date, // YYYY-MM-DD (local)
    appointment_time: formatTimeLabel(d.time), // "h:mm AM/PM"
    source: SOURCE_LABEL,
  }
  void post(BOOKING_WEBHOOK_URL, payload)
}

// ─── Live programs + slots, ONE call (§5.1) ───

/** ISO list → "HH:MM" wall-clock list. Each ISO already carries the academy's
 *  timezone, so date/time come straight from the string (no TZ math). */
function toSlotMap(raw: unknown): SlotMap {
  const map: SlotMap = {}
  for (const [date, value] of Object.entries((raw as Record<string, unknown>) ?? {})) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Array.isArray(value)) continue
    const times = value
      .filter((s): s is string => typeof s === 'string')
      .map((iso) => iso.slice(11, 16))
      .filter((t) => /^\d{2}:\d{2}$/.test(t))
    if (times.length) map[date] = times.sort()
  }
  return map
}

/**
 * POST { action:"get_programs" } — the ONE live fetch (§5.1): programs and the
 * slots of every program together, once per session (module-level cache; the
 * shared workflow answers ordered adults-first). Unlike the webhooks this is
 * NOT fire-and-forget — without it there is nothing to render, so failures
 * surface as an error state in the UI.
 */
let programsPromise: Promise<Program[]> | null = null

export function fetchPrograms(): Promise<Program[]> {
  if (!programsPromise) {
    programsPromise = (async () => {
      const res = await fetch(BOOKING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_programs', location_id: GHL_LOCATION_ID }),
      })
      if (!res.ok) throw new Error(`get_programs HTTP ${res.status}`)
      const raw = (await res.json()) as { programs?: Array<Record<string, unknown>> }
      return (raw?.programs ?? [])
        .filter((p) => Boolean(p?.calendar_id && p?.name))
        .filter((p) => !PROGRAM_OVERRIDES[p.calendar_id as string]?.hide)
        .map(
          (p): Program => ({
            calendar_id: p.calendar_id as string,
            name: p.name as string,
            audience: p.audience === 'kids' ? 'kids' : 'adults',
            duration_minutes: (p.duration_minutes as number | null) ?? null,
            capacity: (p.capacity as number) ?? 0,
            slots: toSlotMap(p.slots),
            slots_error: (p.slots_error as string | null) ?? null,
          }),
        )
    })()
    programsPromise.catch(() => {
      programsPromise = null // a failed fetch must not poison the session cache
    })
  }
  return programsPromise
}

export { isoDate }
