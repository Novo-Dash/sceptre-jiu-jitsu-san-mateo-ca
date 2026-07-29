import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { formatMonthYear, getBookingWindow, isoDate } from './schedule'

interface CalendarProps {
  value: Date | null
  onSelect: (d: Date) => void
  isBookable: (d: Date) => boolean
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function Calendar({ value, onSelect, isBookable }: CalendarProps) {
  const { min, max } = getBookingWindow()
  const [view, setView] = useState<Date>(() => startOfMonth(value ?? min))

  // follow the selected date into its month (e.g. auto pre-selection after slots load)
  useEffect(() => {
    if (value) setView(startOfMonth(value))
  }, [value])

  const first = startOfMonth(view)
  const startPad = first.getDay()
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()

  const canPrev = startOfMonth(view) > startOfMonth(min)
  const canNext = startOfMonth(view) < startOfMonth(max)

  const cells: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d))

  const selectedKey = value ? isoDate(value) : ''

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canPrev && setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={!canPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition disabled:opacity-30 enabled:hover:border-[var(--color-text)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span className="text-sm font-semibold text-[var(--color-text)]">{formatMonthYear(view)}</span>
        <button
          type="button"
          onClick={() => canNext && setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          disabled={!canNext}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition disabled:opacity-30 enabled:hover:border-[var(--color-text)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />
          const bookable = isBookable(d)
          const selected = isoDate(d) === selectedKey
          return (
            <button
              key={isoDate(d)}
              type="button"
              disabled={!bookable}
              onClick={() => onSelect(d)}
              aria-pressed={selected}
              className={cn(
                'flex h-10 items-center justify-center rounded-lg text-sm transition min-h-[40px]',
                selected && 'bg-[var(--color-danger)] font-bold text-white',
                !selected && bookable && 'text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]',
                !bookable && 'cursor-not-allowed text-[var(--color-text-muted)]/40'
              )}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
