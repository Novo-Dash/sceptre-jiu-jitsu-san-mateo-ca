import { BENEFITS } from './content'
import { Eyebrow } from './parts'
import { KidsButton } from './KidsButton'
import { CTA } from './content'
import { Sprinkles } from './deco'
import { Star, Heart } from './doodles'

const CHIP: Record<string, string> = {
  shield: 'var(--k-blue)',
  medal: 'var(--k-yellow-deep)',
  handshake: 'var(--k-green)',
  heart: 'var(--k-pink)',
  backpack: 'var(--k-purple)',
  apple: 'var(--k-orange)',
}

function BenefitIcon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'shield':
      return <svg {...common}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
    case 'medal':
      return <svg {...common}><circle cx="12" cy="9" r="5" /><path d="M9 13.3 8 21l4-2 4 2-1-7.7" /></svg>
    case 'handshake':
      return <svg {...common}><path d="M8 13l3 3 5-5 3 3M2 12l4-4 4 4M6 8l4-3 4 3" /></svg>
    case 'heart':
      return <svg {...common}><path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.5 12 20 12 20z" /></svg>
    case 'backpack':
      return <svg {...common}><path d="M6 8a6 6 0 0 1 12 0v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z" /><path d="M9 8a3 3 0 0 1 6 0M9 14h6" /></svg>
    case 'apple':
      return <svg {...common}><path d="M12 7c-1-3-4-3-5-2 2 0 3 1 3 2M12 7c1.5-1.5 4-1.5 5.5 0C19 8.5 19 13 16.5 17c-1 1.6-2 2.5-3 2.5s-1.5-.6-2.5-.6-1.5.6-2.5.6-2-.9-3-2.5C3 13 3.5 8.5 6.5 7c1.7-.8 3.6 0 5.5 0" /></svg>
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>
  }
}

const ROTS = [-2.5, 2, -1.5, 2.5, -2, 1.5]
const TAPE = ['var(--k-yellow)', 'var(--k-blue)', 'var(--k-pink)', 'var(--k-green)', 'var(--k-orange)', 'var(--k-purple)']
const HAND = ['so much fun!', 'love this!', 'new friends', 'strong & brave', 'stay calm', 'level up!']

export function WhyJiuJitsu({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="bts-why" className="relative" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
      <Sprinkles />
      {/* soft color blob behind heading */}
      <span aria-hidden="true" className="bts-blob bts-anim-float" style={{ position: 'absolute', width: 260, height: 260, top: '-6%', left: '50%', marginLeft: -130, background: 'var(--k-brand-red)', opacity: 0.12, zIndex: -1 }} />
      <div className="mx-auto px-5" style={{ maxWidth: 1160 }}>
        <div className="text-center" style={{ marginBottom: '3rem' }} data-reveal="up">
          <Eyebrow color="var(--k-green)" textColor="#fff">Why Jiu-Jitsu</Eyebrow>
          <h2 className="bts-display" style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)', lineHeight: 1.12, marginTop: '1rem', marginInline: 'auto' }}>
            One class a week,<br />
            a difference you&apos;ll see every day.
          </h2>
        </div>

        <div className="grid gap-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
          {BENEFITS.map((b, i) => {
            const rot = ROTS[i % ROTS.length]
            const tape = TAPE[i % TAPE.length]
            const chip = CHIP[b.icon] ?? 'var(--k-blue)'
            return (
              <article
                key={b.text}
                data-reveal="rotate"
                data-delay={i * 90}
                data-rest-rotate={rot}
                className="bts-pop"
                style={{
                  position: 'relative', background: '#fff', borderRadius: 22, padding: '14px 14px 0',
                  boxShadow: 'var(--k-soft)', transform: `rotate(${rot}deg)`,
                }}
              >
                {/* washi tape */}
                <span aria-hidden="true" style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%) rotate(-3deg)', width: 100, height: 24, background: tape, opacity: 0.85, borderRadius: 3, boxShadow: 'var(--k-soft-sm)' }} />
                {/* photo */}
                <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4 / 5' }}>
                  <img src={b.image} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* caption */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', padding: '0.9rem 0.35rem 1.15rem' }}>
                  <span className="bts-anim-wiggle" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, flexShrink: 0, borderRadius: 12, background: chip }}>
                    <BenefitIcon name={b.icon} />
                  </span>
                  <div>
                    <p className="bts-body" style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.25, color: 'var(--k-ink)', margin: 0 }}>{b.text}</p>
                    <span className="bts-hand" style={{ fontSize: '1.15rem', color: chip, lineHeight: 1 }}>{HAND[i % HAND.length]}</span>
                  </div>
                </div>
                {/* abstract shape / sticker */}
                {i % 3 === 0 && <span aria-hidden="true" className="bts-blob bts-anim-float" style={{ position: 'absolute', width: 46, height: 46, bottom: -14, left: -14, background: tape, opacity: 0.5, zIndex: -1 }} />}
                {i % 3 === 1 && <Heart className="bts-anim-pulse" style={{ position: 'absolute', width: 22, top: 6, right: -8, color: 'var(--k-pink)' }} />}
                {i % 3 === 2 && <Star className="bts-anim-bob" style={{ position: 'absolute', width: 24, top: -10, right: -8, color: tape }} />}
              </article>
            )
          })}
        </div>

        <div className="text-center" style={{ marginTop: '3rem' }} data-reveal="up">
          <KidsButton onClick={onOpen} ariaLabel={CTA}>{CTA}</KidsButton>
        </div>
      </div>
    </section>
  )
}
