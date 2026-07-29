// ─────────────────────────────────────────────────────────────
// SCEPTRE — Booking schedule config (academy-specific)
// location_id: wjbxnKUT1TDSJVbp2pQt · tz: America/Los_Angeles
// Calendars pulled live from GHL (id is the key that matches n8n).
// ─────────────────────────────────────────────────────────────

// Internal keys: ASCII, stable, never shown. Use for LOGIC.
export type Program =
  | 'adults_jj'
  | 'womens_jj'
  | 'judo'
  | 'kids_5_9'
  | 'kids_9_12'

export type Audience = 'adults' | 'kids'

// The order programs appear as radios.
export const PROGRAMS: Program[] = ['adults_jj', 'womens_jj', 'judo', 'kids_5_9', 'kids_9_12']

// Label = radio text AND the `program` sent in Webhook 1. Must match the GHL calendar name 1:1.
export const PROGRAM_LABEL: Record<Program, string> = {
  adults_jj: 'Adults All Levels Jiu-Jitsu',
  womens_jj: "Women's All Levels Jiu-Jitsu",
  judo: 'Judo All Levels',
  kids_5_9: 'Kids (5-9 Years) Jiu-Jitsu',
  kids_9_12: 'Kids (9-12 Years) Jiu-Jitsu',
}

// Audience standardizes Webhook 1 for the shared workflow.
export const PROGRAM_AUDIENCE: Record<Program, Audience> = {
  adults_jj: 'adults',
  womens_jj: 'adults',
  judo: 'adults',
  kids_5_9: 'kids',
  kids_9_12: 'kids',
}

// GHL calendar id per program — the key n8n matches by (Webhook 2 + slots).
export const PROGRAM_CALENDAR_ID: Record<Program, string> = {
  adults_jj: 'lkqxdq5R7pL5ROAATPMw',
  womens_jj: 'rcswDUEvuLYwjnNYAs6E',
  judo: 'kj2ZApwFRIzNZf60yD5j',
  kids_5_9: 'HZ2dX6NCV9Rw7Ii12rdy',
  kids_9_12: 'cid75TsRsR9y38S8jgaY',
}

// Short helper hints under each radio (UI only — not sent anywhere).
export const PROGRAM_HINT: Record<Program, string> = {
  adults_jj: 'Ages 13+ · Gi & No-Gi',
  womens_jj: 'Women-only · all levels',
  judo: 'All levels',
  kids_5_9: 'Ages 5–9',
  kids_9_12: 'Ages 9–12',
}

export const BOOKING_RANGE_DAYS = 14 // fixed window (same for every academy)

export const ACADEMY_ADDRESS = {
  street: '3b N Kingston St',
  city: 'San Mateo, CA 94401',
  mapsUrl: 'https://maps.app.goo.gl/TQLPnf7W2AKEeJB27',
}

// Slot map as returned/derived from GHL: "YYYY-MM-DD" -> ["HH:MM", ...]
export type SlotMap = Record<string, string[]>

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
