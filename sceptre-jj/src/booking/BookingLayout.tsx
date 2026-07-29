import type { ReactNode } from 'react'
import './booking.css'
import { cn } from '@/lib/utils'
import { BRAND, CONTACT_PHONE } from './book-constants'
import { ACADEMY_ADDRESS } from './schedule'

interface Props {
  children: ReactNode
  onClose?: () => void
  theme?: 'default' | 'kids'
  headline?: string
}

/**
 * Shared 2-column shell: brand panel (left) + form (right).
 * Used by the modal AND the /book page — the right column always renders the
 * same shared <BookingForm /> (passed as children). `theme="kids"` re-skins it
 * without duplicating the form.
 */
export function BookingLayout({ children, onClose, theme = 'default', headline }: Props) {
  const kids = theme === 'kids'
  return (
    <div className={cn('grid w-full overflow-hidden rounded-3xl bg-white md:grid-cols-[minmax(300px,38%)_1fr]', kids && 'bk-kids')}>
      {/* LEFT — brand panel (decorative/informative) */}
      <aside
        className="relative flex flex-col justify-between p-7 text-white md:p-9"
        style={{ background: kids ? 'linear-gradient(160deg, #F14350 0%, #E11D2A 100%)' : 'var(--color-bg-dark)' }}
      >
        {/* accent filet */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: kids ? 'var(--color-yellow, #FFC93C)' : 'var(--color-danger)' }} />
        <div>
          <img src={BRAND.logo} alt={BRAND.name} width={160} height={40} className="h-9 w-auto" style={{ filter: 'invert(1)' }} />
          <h2
            className="mt-6 text-[1.7rem] font-black leading-[1.05] tracking-tight md:text-[2rem]"
            style={{ fontFamily: kids ? "'Grandstander', 'Nunito', sans-serif" : "'Noken', system-ui, sans-serif" }}
          >
            {headline ?? BRAND.headline}
          </h2>
          {/* bullets — hidden on mobile compact header */}
          <ul className="mt-6 hidden flex-col gap-3 md:flex" role="list">
            {BRAND.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-white/70">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 hidden text-sm text-white/40 md:block">
          <a href={ACADEMY_ADDRESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-white/70">
            {ACADEMY_ADDRESS.street}, {ACADEMY_ADDRESS.city}
          </a>
          <a href={`tel:${CONTACT_PHONE.href}`} className="mt-1 block hover:text-white/70">{CONTACT_PHONE.label}</a>
        </div>
      </aside>

      {/* RIGHT — the shared form (this is the only column that changes) */}
      <div className="relative max-h-[86dvh] overflow-y-auto p-6 sm:p-8">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface-alt)] text-[var(--color-text)] transition hover:bg-[var(--color-border)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M12 4 4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
