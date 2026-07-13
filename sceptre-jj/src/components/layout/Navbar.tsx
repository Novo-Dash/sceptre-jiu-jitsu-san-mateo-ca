import { useState, useEffect, useCallback } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../ui'

interface NavbarProps {
  onBooking: () => void
  phoneHref?: string
  phoneLabel?: string
}

const navLinks = [
  { label: 'Programs',    href: '#programs' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'About',       href: '#why-us' },
]

const phoneIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 3a1 1 0 0 1 1-1h2.5a1 1 0 0 1 .97.757l.75 3a1 1 0 0 1-.27.986L5.8 7.986A9 9 0 0 0 8.014 10.2l1.243-1.15a1 1 0 0 1 .986-.27l3 .75A1 1 0 0 1 14 10.5V13a1 1 0 0 1-1 1C6.373 14 2 9.627 2 4V3Z" fill="currentColor" />
  </svg>
)

export function Navbar({ onBooking, phoneHref, phoneLabel }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onResize() { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <header
        style={{
          background: scrolled ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          borderBottom: scrolled
            ? '1px solid rgba(0,0,0,0.08)'
            : '1px solid rgba(255,255,255,0.12)',
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 md:px-10"
        >
          {/* Logo */}
          <a
            href="#"
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text)] focus-visible:outline-offset-2 rounded-sm"
            aria-label="Sceptre Jiu-Jitsu — back to top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <img
              src="/images/logo2.webp"
              alt="Sceptre Jiu-Jitsu"
              width={160}
              height={80}
              className="h-10 w-auto transition-all duration-300"
              style={{ filter: scrolled ? 'none' : 'invert(1)' }}
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={cn(
                    'text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm',
                    scrolled ? 'text-[var(--color-text)] focus-visible:outline-[var(--color-text)]' : 'text-white focus-visible:outline-white'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            {phoneLabel ? (
              <a
                href={phoneHref}
                className={cn(
                  'inline-flex items-center gap-2 min-h-[44px] text-[13px] font-semibold tracking-wide transition-all duration-300 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm',
                  scrolled ? 'text-[var(--color-text)] focus-visible:outline-[var(--color-text)]' : 'text-white focus-visible:outline-white'
                )}
                aria-label={`Call ${phoneLabel}`}
              >
                {phoneIcon}
                {phoneLabel}
              </a>
            ) : (
              <Button variant={scrolled ? 'primary' : 'white'} size="sm" onClick={onBooking}>
                Book Free Class
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text)] focus-visible:outline-offset-2 rounded-sm"
          >
            <span className={cn(
              'block h-0.5 w-5 transition-all duration-200 origin-center',
              scrolled ? 'bg-[var(--color-text)]' : 'bg-white',
              menuOpen && 'translate-y-[7px] rotate-45'
            )} />
            <span className={cn(
              'block h-0.5 w-5 transition-all duration-200',
              scrolled ? 'bg-[var(--color-text)]' : 'bg-white',
              menuOpen && 'opacity-0'
            )} />
            <span className={cn(
              'block h-0.5 w-5 transition-all duration-200 origin-center',
              scrolled ? 'bg-[var(--color-text)]' : 'bg-white',
              menuOpen && '-translate-y-[7px] -rotate-45'
            )} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          menuOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black transition-opacity duration-300',
            menuOpen ? 'opacity-60' : 'opacity-0'
          )}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={cn(
            'absolute top-0 right-0 h-full w-[280px] bg-white flex flex-col pt-20 pb-8 px-8',
            'transition-transform duration-300',
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="flex items-center min-h-[52px] text-[14px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text)] hover:opacity-50 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-text)] focus-visible:outline-offset-2 rounded-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8 border-t border-[var(--color-border)]">
            <Button
              size="lg"
              onClick={() => { setMenuOpen(false); onBooking() }}
              className="w-full"
            >
              Book Free Class
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
