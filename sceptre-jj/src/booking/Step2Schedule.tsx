import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Calendar } from './Calendar'
import {
  formatTimeLabel,
  getFirstBookableDate,
  getTimesForDay,
  isDateBookable,
  isoDate,
} from './schedule'
import { CONTACT_PHONE } from './book-constants'
import type { BookingData } from './webhook'

function parseIsoLocal(s: string): Date | null {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

interface Props {
  data: BookingData
  update: (patch: Partial<BookingData>) => void
  onConfirm: () => void
  onBack: () => void
}

export function Step2Schedule({ data, update, onConfirm, onBack }: Props) {
  // Slots arrived WITH the program in the single get_programs call (§5.1) —
  // no second fetch, no second wait.
  const slots = data.program?.slots ?? {}
  const slotsError = data.program?.slots_error ?? null
  const selectedDate = parseIsoLocal(data.date)

  // pre-select the first bookable date on entry; a single available time
  // comes preselected too (§2)
  useEffect(() => {
    if (data.date) return
    const first = getFirstBookableDate(slots)
    if (first) {
      const times = getTimesForDay(slots, first)
      update({ date: isoDate(first), time: times.length === 1 ? times[0] : '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.program])

  function pickDate(d: Date) {
    const times = getTimesForDay(slots, d)
    // single slot → pre-select it; 2+ → clear so the user picks
    update({ date: isoDate(d), time: times.length === 1 ? times[0] : '' })
  }

  const times = selectedDate ? getTimesForDay(slots, selectedDate) : []
  const noAvailability = slotsError !== null || getFirstBookableDate(slots) === null
  const canConfirm = !!data.date && !!data.time

  return (
    <div className="flex flex-col gap-5">
      {noAvailability ? (
        <p className="rounded-xl bg-[var(--color-danger)]/10 px-4 py-3 text-sm text-[var(--color-text)]">
          {slotsError !== null
            ? "We couldn't load the live schedule for this program. Please try again, or call us at "
            : 'This program has no open times in the next two weeks. Please call us at '}
          <a href={`tel:${CONTACT_PHONE.href}`} className="font-semibold underline">{CONTACT_PHONE.label}</a>
          {' '}and we&apos;ll find a spot for you.
        </p>
      ) : (
        <>
          <Calendar
            value={selectedDate}
            onSelect={pickDate}
            isBookable={(d) => isDateBookable(slots, d)}
          />

          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--color-text)]">Available times</p>
            {times.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)]">Pick an available date to see times.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {times.map((t) => {
                  const active = data.time === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update({ time: t })}
                      aria-pressed={active}
                      className={cn(
                        'rounded-xl border px-2 py-2.5 text-sm font-semibold transition min-h-[44px]',
                        active
                          ? 'border-[var(--color-danger)] bg-[var(--color-danger)] text-white'
                          : 'border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-text)]'
                      )}
                    >
                      {formatTimeLabel(t)}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-1 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[var(--color-border)] px-6 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-text)]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!canConfirm}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-danger)] px-8 text-sm font-semibold uppercase tracking-wide text-white transition enabled:hover:bg-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirm booking
        </button>
      </div>
    </div>
  )
}
