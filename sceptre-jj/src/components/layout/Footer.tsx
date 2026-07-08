import { Button } from '../ui'

interface FooterProps {
  onBooking: () => void
}

export function Footer({ onBooking }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="bg-[var(--color-bg-dark)] text-white"
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="flex flex-col gap-4 items-start">
            <img
              src="/images/logo2.webp"
              alt="Sceptre Jiu-Jitsu"
              width={200}
              height={100}
              className="h-14 w-auto object-contain"
              style={{ filter: 'invert(1)' }}
            />
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Sceptre is an inclusive Jiu-Jitsu academy where anyone can be part of a supportive community.
              Our method is designed for beginners of all ages and fitness levels.
            </p>
            <a
              href="https://www.instagram.com/sceptrejj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Sceptre Jiu-Jitsu on Instagram"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors min-h-[44px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @sceptrejiujitsu
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm" role="list">
              <li>
                <a
                  href="tel:+16507537486"
                  className="text-white/60 hover:text-white transition-colors min-h-[44px] flex items-center gap-2"
                  aria-label="Call (650) 753-7486"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 3a1 1 0 0 1 1-1h2.5a1 1 0 0 1 .97.757l.75 3a1 1 0 0 1-.27.986L5.8 7.986A9 9 0 0 0 8.014 10.2l1.243-1.15a1 1 0 0 1 .986-.27l3 .75A1 1 0 0 1 14 10.5V13a1 1 0 0 1-1 1C6.373 14 2 9.627 2 4V3Z" fill="currentColor"/>
                  </svg>
                  (650) 753-7486
                </a>
              </li>
              <li className="text-white/40 leading-relaxed">
                3b N Kingston St<br />
                San Mateo, CA 94401
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Start Training
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              First trial class is free. No commitment. No credit card required.
            </p>
            <Button
              variant="danger"
              size="md"
              onClick={onBooking}
              className="w-full max-w-xs"
            >
              Book Your Free Trial
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <p>&copy; {year} Sceptre Jiu-Jitsu. All rights reserved.</p>
          <p>
            Brazilian Jiu-Jitsu &middot;{' '}
            <span className="text-white/40 font-semibold">San Mateo, CA</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
