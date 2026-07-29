import { CONTACT, ACADEMY } from './content'
import { KidsButton } from './KidsButton'

const year = new Date().getFullYear()

function ContactCoin({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', width: 40, height: 40, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
      {children}
    </span>
  )
}

export function SiteFooter({ onOpen }: { onOpen: () => void }) {
  return (
    <footer role="contentinfo" style={{ background: 'var(--k-ink)', color: '#fff' }}>
      {/* map — search by name + address so it shows the labeled "Sceptre Jiu-Jitsu" place (www.google.com host for CSP) */}
      <iframe
        title="Sceptre Jiu-Jitsu on the map"
        src="https://www.google.com/maps?q=Sceptre%20Jiu-Jitsu%2C%203b%20N%20Kingston%20St%2C%20San%20Mateo%2C%20CA%2094401&output=embed"
        width="100%"
        height="280"
        style={{ border: 0, display: 'block', filter: 'grayscale(0.2)' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="mx-auto px-5" style={{ maxWidth: 1160, padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem' }}>
        <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))' }}>
          {/* brand */}
          <div>
            <img src="/images/logo2.webp" alt={ACADEMY} width={160} height={44} style={{ height: 40, width: 'auto', filter: 'invert(1)' }} />
            <p className="bts-body" style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', maxWidth: '30ch' }}>
              An inclusive Jiu-Jitsu academy in San Mateo where kids build confidence from day one. Book a free class and see for yourself.
            </p>
            <div style={{ marginTop: '1.3rem' }}>
              <KidsButton onClick={onOpen} ariaLabel="Book a free trial class">Book a free class</KidsButton>
            </div>
          </div>

          {/* contact */}
          <div>
            <h3 className="bts-display" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: '1.1rem' }}>Visit / Contact</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-3" style={{ color: '#fff' }}>
                  <ContactCoin>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3a1 1 0 0 1 1-1h2.5a1 1 0 0 1 .97.757l.75 3a1 1 0 0 1-.27.986L5.8 7.986A9 9 0 0 0 8.014 10.2l1.243-1.15a1 1 0 0 1 .986-.27l3 .75A1 1 0 0 1 14 10.5V13a1 1 0 0 1-1 1C6.373 14 2 9.627 2 4z" /></svg>
                  </ContactCoin>
                  <span className="bts-body">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="flex items-center gap-3" style={{ color: '#fff' }}>
                  <ContactCoin>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="1.5" y="3" width="13" height="10" rx="1.5" /><path d="m2 4 6 4.5L14 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </ContactCoin>
                  <span className="bts-body">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" style={{ color: '#fff' }}>
                  <ContactCoin>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>
                  </ContactCoin>
                  <span className="bts-body">{CONTACT.instagramHandle}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* address */}
          <div>
            <h3 className="bts-display" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)', marginBottom: '1.1rem' }}>Address</h3>
            <p className="bts-body" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)' }}>
              {CONTACT.address1}<br />{CONTACT.address2}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2.6rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)' }}>
          <span>&copy; {year} {ACADEMY}. All rights reserved.</span>
          <span>By Novo Dash</span>
        </div>
      </div>
    </footer>
  )
}
