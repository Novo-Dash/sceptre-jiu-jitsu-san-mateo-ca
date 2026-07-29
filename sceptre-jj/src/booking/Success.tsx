import { ACADEMY_ADDRESS, formatDateLong, formatTimeLabel } from './schedule'
import type { BookingData } from './webhook'

function parseIsoLocal(s: string): Date | null {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

export function Success({ data, onDone }: { data: BookingData; onDone: () => void }) {
  const dateObj = parseIsoLocal(data.date)
  const dateLabel = dateObj ? formatDateLong(dateObj) : ''
  const timeLabel = data.time ? formatTimeLabel(data.time) : ''

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-danger)]/10">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>

      <h3 className="text-2xl font-black tracking-tight text-[var(--color-text)]">You&apos;re all set!</h3>

      <p className="max-w-sm text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
        Your free trial class is booked for{' '}
        <strong className="text-[var(--color-text)]">{dateLabel}</strong>
        {timeLabel && (
          <>
            {' '}at <strong className="text-[var(--color-text)]">{timeLabel}</strong>
          </>
        )}
        . We&apos;ll send a confirmation by email and SMS.
      </p>

      <div className="w-full max-w-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Where</p>
        <a href={ACADEMY_ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--color-text)] underline-offset-2 hover:underline">
          {ACADEMY_ADDRESS.street}, {ACADEMY_ADDRESS.city}
        </a>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--color-text)] px-10 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-black"
      >
        Done
      </button>
    </div>
  )
}
