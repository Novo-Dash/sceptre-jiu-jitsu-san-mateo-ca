// ─────────────────────────────────────────────────────────────
// SCEPTRE — Booking schedule: types + pure date/time helpers.
// location_id: wjbxnKUT1TDSJVbp2pQt · tz: America/Los_Angeles
//
// The program list does NOT live here (spec §5): programs AND their
// slots come live from GHL in one call (get_programs via n8n, §5.1 —
// see webhook.fetchPrograms). This module keeps only what GHL can't
// know: per-academy exceptions and the fixed constants.
// ─────────────────────────────────────────────────────────────

export type Audience = 'adults' | 'kids'

// Slot map as delivered by get_programs: "YYYY-MM-DD" -> ["HH:MM", ...]
export type SlotMap = Record<string, string[]>

/** A program exactly as n8n delivers it (§5.1). Nothing here is hand-written. */
export interface Program {
  calendar_id: string // matches the calendar in Webhook 2 (rename-proof)
  name: string // GHL calendar name = `program` in Webhook 1
  audience: Audience // from the calendar's group in GHL — never recomputed
  duration_minutes: number | null
  capacity: number
  slots: SlotMap // academy wall-clock times
  slots_error: string | null
}

/**
 * Exceptions, and ONLY exceptions. Key = calendar_id.
 *   label -> display alias when the GHL name doesn't fit the public
 *   hide  -> not shown on the page (e.g. 1:1, private assessment)
 * A calendar without an entry here shows normally, under its own GHL name.
 * Starts EMPTY on a new academy; only filled when someone asks.
 */
export const PROGRAM_OVERRIDES: Record<string, { label?: string; hide?: true }> = {}

/** Display alias is visual only — webhooks always carry the raw GHL name. */
export function displayName(program: Program): string {
  return PROGRAM_OVERRIDES[program.calendar_id]?.label ?? program.name
}

export const BOOKING_RANGE_DAYS = 14 // fixed window (same for every academy)

export const ACADEMY_ADDRESS = {
  street: '3b N Kingston St',
  city: 'San Mateo, CA 94401',
  mapsUrl: 'https://maps.app.goo.gl/TQLPnf7W2AKEeJB27',
}

// ─── date/time helpers (identical logic across academies) ───

/** Local YYYY-MM-DD (never toISOString — UTC would shift the day). */
export function isoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function getBookingWindow(): { min: Date; max: Date } {
  const min = new Date()
  min.setHours(0, 0, 0, 0)
  const max = new Date(min)
  max.setDate(max.getDate() + BOOKING_RANGE_DAYS)
  return { min, max }
}

/** "18:00" -> "6:00 PM". Produces appointment_time (12h + AM/PM) — required by n8n/Luxon. */
export function formatTimeLabel(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(':')
  let h = parseInt(hStr, 10)
  const m = mStr ?? '00'
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${m} ${ampm}`
}

/** Long date in the page language (US academy → English), e.g. "Sunday, July 7". */
export function formatDateLong(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/** Times of a given day, read from the live GHL slot map. */
export function getTimesForDay(slots: SlotMap, date: Date): string[] {
  return slots[isoDate(date)] ?? []
}

/** Inside the window AND has at least one slot in the map. */
export function isDateBookable(slots: SlotMap, date: Date): boolean {
  const { min, max } = getBookingWindow()
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  if (d < min || d > max) return false
  return (slots[isoDate(date)]?.length ?? 0) > 0
}

/** First bookable date within the window (or null). */
export function getFirstBookableDate(slots: SlotMap): Date | null {
  const { min } = getBookingWindow()
  for (let i = 0; i <= BOOKING_RANGE_DAYS; i++) {
    const d = new Date(min)
    d.setDate(d.getDate() + i)
    if (isDateBookable(slots, d)) return d
  }
  return null
}
