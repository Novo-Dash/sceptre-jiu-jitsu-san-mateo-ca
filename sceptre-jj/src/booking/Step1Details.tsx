import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { displayName, type Program } from './schedule'
import { CONTACT_PHONE } from './book-constants'
import type { BookingData } from './webhook'
import type { ProgramsState } from './BookingForm'

export function formatPhone(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 10)
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function isKidsProgram(p: Program | null): boolean {
  return p?.audience === 'kids'
}

export function isStep1Valid(d: BookingData): boolean {
  const nameOk = d.name.trim().length >= 2
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())
  const phoneOk = d.phone.replace(/\D/g, '').length >= 10
  const programOk = d.program !== null
  const childOk = !isKidsProgram(d.program) || d.childName.trim().length >= 2
  return nameOk && emailOk && phoneOk && programOk && childOk
}

/** UI-only hint under each radio (audience + duration from the live program). */
function programHint(p: Program): string {
  const parts: string[] = [p.audience === 'kids' ? 'Kids' : 'Adults']
  if (p.duration_minutes) parts.push(`${p.duration_minutes} min class`)
  return parts.join(' · ')
}

interface Props {
  data: BookingData
  update: (patch: Partial<BookingData>) => void
  onNext: () => void
  programs: ProgramsState
}

const inputClass =
  'w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/20 min-h-[44px]'
const labelClass = 'mb-1.5 block text-sm font-semibold text-[var(--color-text)]'

export function Step1Details({ data, update, onNext, programs }: Props) {
  const childRef = useRef<HTMLDivElement>(null)
  const kids = isKidsProgram(data.program)

  // when a kids program is picked, scroll to + focus the child-name field
  useEffect(() => {
    if (kids && childRef.current) {
      childRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      childRef.current.querySelector('input')?.focus()
    }
  }, [kids])

  const valid = isStep1Valid(data)

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => { e.preventDefault(); if (valid) onNext() }}
    >
      <div>
        <label className={labelClass} htmlFor="bk-name">Your name</label>
        <input id="bk-name" className={inputClass} value={data.name} autoComplete="name"
          onChange={(e) => update({ name: e.target.value })} placeholder="e.g. Alex Johnson" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="bk-email">Email</label>
          <input id="bk-email" type="email" className={inputClass} value={data.email} autoComplete="email"
            onChange={(e) => update({ email: e.target.value })} placeholder="you@email.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="bk-phone">Phone</label>
          <input id="bk-phone" type="tel" inputMode="tel" className={inputClass} value={data.phone} autoComplete="tel"
            onChange={(e) => update({ phone: formatPhone(e.target.value) })} placeholder="(555) 555-5555" />
        </div>
      </div>

      <div>
        <span className={labelClass}>Which program?</span>

        {programs.status === 'loading' && (
          <div role="status" className="flex min-h-[6rem] flex-col items-center justify-center gap-2 py-4 text-[var(--color-text-muted)]">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-danger)]" />
            <p className="text-sm">Loading programs…</p>
          </div>
        )}

        {(programs.status === 'error' ||
          (programs.status === 'ready' && programs.programs.length === 0)) && (
          <p role="alert" className="rounded-xl bg-[var(--color-danger)]/10 px-4 py-3 text-sm text-[var(--color-text)]">
            We couldn&apos;t load our programs right now. Please call us at{' '}
            <a href={`tel:${CONTACT_PHONE.href}`} className="font-semibold underline">{CONTACT_PHONE.label}</a>{' '}
            and we&apos;ll get you on the mat.
          </p>
        )}

        {programs.status === 'ready' && programs.programs.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {programs.programs.map((p) => {
              const active = data.program?.calendar_id === p.calendar_id
              return (
                <button
                  key={p.calendar_id}
                  type="button"
                  onClick={() =>
                    update({
                      program: p,
                      // reset schedule + drop a stale child name on switch
                      date: '',
                      time: '',
                      ...(p.audience === 'kids' ? {} : { childName: '' }),
                    })
                  }
                  aria-pressed={active}
                  className={cn(
                    'flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition min-h-[44px]',
                    active
                      ? 'border-[var(--color-danger)] bg-[var(--color-danger)]/5'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text)]'
                  )}
                >
                  <span className="text-sm font-semibold text-[var(--color-text)]">{displayName(p)}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">{programHint(p)}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {kids && (
        <div ref={childRef}>
          <label className={labelClass} htmlFor="bk-child">Child&apos;s name</label>
          <input id="bk-child" className={inputClass} value={data.childName}
            onChange={(e) => update({ childName: e.target.value })} placeholder="Your child&apos;s name" />
        </div>
      )}

      <button
        type="submit"
        disabled={!valid}
        className="mt-2 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[var(--color-danger)] px-8 text-sm font-semibold uppercase tracking-wide text-white transition enabled:hover:bg-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </form>
  )
}
