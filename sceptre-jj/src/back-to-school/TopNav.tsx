import { CONTACT } from './content'
import { KidsButton } from './KidsButton'

export function TopNav({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      className="sticky top-0 z-50"
      style={{ padding: '0.7rem clamp(0.8rem, 3vw, 1.6rem)' }}
    >
      <nav
        aria-label="Back to School navigation"
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: 1160,
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(14px) saturate(160%)',
          WebkitBackdropFilter: 'blur(14px) saturate(160%)',
          border: 'var(--k-hairline)',
          borderRadius: 999,
          boxShadow: 'var(--k-soft-sm)',
          padding: '0.5rem 0.6rem 0.5rem 1.1rem',
        }}
      >
        <a
          href="#bts-hero"
          className="flex items-center gap-2"
          aria-label="Sceptre Jiu-Jitsu — back to top"
        >
          <img src="/images/logo2.webp" alt="Sceptre Jiu-Jitsu" width={140} height={40} style={{ height: 30, width: 'auto' }} />
        </a>

        <div className="flex items-center gap-2 md:gap-4">
          <span
            className="bts-display hidden md:inline-flex items-center gap-2"
            style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--k-ink-soft)' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--k-green)', display: 'inline-block' }} className="bts-anim-pulse" />
            Now enrolling kids
          </span>
          <a
            href={CONTACT.phoneHref}
            className="bts-display hidden sm:inline"
            style={{ fontSize: '0.9rem', color: 'var(--k-ink)' }}
          >
            {CONTACT.phone}
          </a>
          <KidsButton onClick={onOpen} ariaLabel="Book a free trial class" style={{ padding: '0.6rem 1.1rem', fontSize: '0.9rem', boxShadow: '0 4px 0 var(--k-brand-red-d)' }}>
            Free class
          </KidsButton>
        </div>
      </nav>
    </div>
  )
}
