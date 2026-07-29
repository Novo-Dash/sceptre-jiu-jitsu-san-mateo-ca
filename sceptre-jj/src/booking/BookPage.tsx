import { BookingForm } from './BookingForm'
import { BookingLayout } from './BookingLayout'

/**
 * Dedicated /book page — no site navigation, but keeps the brand's finish
 * (light bg + subtle red glow + hairline grid). Renders the SAME shared
 * <BookingForm /> inside the same 2-column layout as the modal.
 */
export function BookPage() {
  return (
    <main
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* subtle red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(220,38,38,0.10), transparent 70%)' }}
      />
      {/* hairline grid with radial mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.05) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 40%, transparent 100%)',
        }}
      />

      <div className="relative w-full max-w-[940px]">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] shadow-[0_32px_80px_rgba(0,0,0,0.18)]">
          <BookingLayout>
            <BookingForm />
          </BookingLayout>
        </div>

        {/* eyebrow */}
        <p className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--color-danger)]" />
          Sceptre Jiu-Jitsu · San Mateo, CA
        </p>
      </div>
    </main>
  )
}
