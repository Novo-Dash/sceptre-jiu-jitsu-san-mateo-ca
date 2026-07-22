import { useState } from 'react'
import { FAQ, CTA } from './content'
import { Eyebrow } from './parts'
import { KidsButton } from './KidsButton'
import { Pencil } from './doodles'
import { Sprinkles } from './deco'

export function Faq({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(0)

  return (
    <section id="bts-faq" className="relative" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', background: 'var(--k-cream)' }}>
      <Sprinkles stars={false} />
      <div className="mx-auto px-5" style={{ maxWidth: 760 }}>
        <div className="text-center relative" style={{ marginBottom: '2.5rem' }} data-reveal="up">
          <Pencil className="bts-anim-sway" style={{ position: 'absolute', width: 38, right: '14%', top: -20 }} />
          <Eyebrow color="var(--k-yellow)">Ask away</Eyebrow>
          <h2 className="bts-display" style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)', lineHeight: 1.08, marginTop: '1rem' }}>
            Questions parents ask us
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="bts-card"
                data-reveal="up"
                data-delay={i * 50}
                style={{ overflow: 'hidden', borderColor: isOpen ? 'rgba(27,26,34,0.16)' : undefined, transition: 'border-color 0.3s' }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.15rem 1.3rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span
                    className="bts-display"
                    style={{ display: 'inline-flex', width: 30, height: 30, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.85rem', color: '#fff', background: isOpen ? 'var(--k-brand-red)' : 'var(--k-ink)', transition: 'background 0.3s' }}
                  >
                    {i + 1}
                  </span>
                  <span className="bts-display" style={{ flex: 1, fontSize: '1.05rem', color: 'var(--k-ink)' }}>{item.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--k-ink-soft)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.32s cubic-bezier(0.16,1,0.3,1)' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p className="bts-body" style={{ padding: '0 1.3rem 1.25rem 3.3rem', fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--k-ink-soft)', margin: 0 }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center" style={{ marginTop: '2.6rem' }} data-reveal="up">
          <KidsButton onClick={onOpen} ariaLabel={CTA}>{CTA}</KidsButton>
        </div>
      </div>
    </section>
  )
}
