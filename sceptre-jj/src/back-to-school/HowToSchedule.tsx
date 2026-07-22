import { STEPS, CVAR, CTA } from './content'
import { KidsButton } from './KidsButton'
import { Eyebrow } from './parts'
import { DoodleArrow, Sparkle, Star, Heart, Sun, Cloud } from './doodles'

// Decorative photos beside each step (Sceptre kid-training shots)
const STEP_IMG = ['/images/how/1.webp', '/images/how/4.webp', '/images/how/2.webp']

function StepIcon({ i }: { i: number }) {
  const p = { fill: 'none', stroke: '#fff', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (i) {
    case 0: return <svg width="22" height="22" viewBox="0 0 24 24"><path {...p} d="M6 3h9l4 4v14H6z" /><path {...p} d="M9 9h6M9 13h6M9 17h4" /></svg>
    case 1: return <svg width="22" height="22" viewBox="0 0 24 24"><rect {...p} x="4" y="5" width="16" height="16" rx="2" /><path {...p} d="M4 9h16M9 3v4M15 3v4M12 13v3l2 1" /></svg>
    default: return <svg width="22" height="22" viewBox="0 0 24 24"><path {...p} d="M5 13l4 4L19 7" /></svg>
  }
}

export function HowToSchedule({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      id="bts-how"
      className="bts-dotgrid"
      style={{ background: 'var(--k-cream)', paddingTop: 'clamp(3.5rem, 6vw, 6rem)', paddingBottom: 'clamp(5rem, 8vw, 8rem)', position: 'relative', overflow: 'hidden' }}
      aria-labelledby="bts-how-title"
    >
      <span aria-hidden="true" className="bts-bubble bts-anim-drift" style={{ position: 'absolute', top: '14%', left: '4%', width: 84, height: 84, background: 'var(--k-blue)', opacity: 0.22 }} />
      <span aria-hidden="true" className="bts-bubble bts-anim-float" style={{ position: 'absolute', top: '42%', right: '4%', width: 58, height: 58, background: 'var(--k-brand-red)', opacity: 0.2 }} />
      <span aria-hidden="true" className="bts-bubble bts-anim-drift" style={{ position: 'absolute', bottom: '10%', left: '12%', width: 42, height: 42, background: 'var(--k-yellow)', opacity: 0.4 }} />

      <Sun className="bts-anim-spin" style={{ position: 'absolute', top: 40, left: '6%', width: 54, color: 'var(--k-yellow-deep)', opacity: 0.9, zIndex: 1 }} />
      <Cloud className="bts-anim-floatx" style={{ position: 'absolute', top: 70, right: '8%', width: 90, color: '#EDE7DC', zIndex: 1 }} />
      <Star className="bts-anim-bob" style={{ position: 'absolute', bottom: 90, right: '12%', width: 30, color: 'var(--k-brand-red)', zIndex: 1 }} />
      <Sparkle className="bts-anim-wiggle" style={{ position: 'absolute', bottom: 130, left: '7%', width: 28, color: 'var(--k-blue)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 768, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div data-reveal="pop">
            <Eyebrow color="var(--k-brand-red)" textColor="#fff" rotate={-2}>3 Easy Steps</Eyebrow>
          </div>
          <h2
            id="bts-how-title"
            data-reveal="up" data-delay="80"
            className="bts-display"
            style={{ fontSize: 'clamp(1.35rem, 5.6vw, 4.4rem)', color: 'var(--k-ink)', marginTop: 16, whiteSpace: 'nowrap' }}
          >
            How to get{' '}
            <span className="bts-mark" style={{ '--hl': 'var(--k-yellow)' } as React.CSSProperties}>started?</span>
          </h2>
          <p
            data-reveal="up" data-delay="140"
            className="bts-hand"
            style={{ fontSize: '1.5rem', color: 'var(--k-brand-red)', marginTop: 12 }}
          >
            follow the path — it&apos;s super easy!
          </p>
        </div>

        <ol style={{ position: 'relative', marginTop: 'clamp(3rem, 6vw, 4rem)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {STEPS.map((s, i) => {
            const color = CVAR[s.color]
            const isLeft = i % 2 === 0
            const tilt = isLeft ? -1.6 : 1.6
            return (
              <li key={s.n} style={{ display: 'contents' }}>
                <div
                  data-reveal={isLeft ? 'left' : 'right'}
                  style={{ width: '100%', maxWidth: 'min(480px, 100%)', marginLeft: isLeft ? 0 : 'auto', marginRight: isLeft ? 'auto' : 0, position: 'relative' }}
                >
                  <img
                    src={STEP_IMG[i % STEP_IMG.length]}
                    alt="" aria-hidden="true" loading="lazy" draggable={false}
                    className={`bts-blob bts-blob-${['a', 'b', 'c'][i % 3]} bts-step-blob`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      ...(isLeft ? { right: i === 0 ? -172 : i === 2 ? -200 : -72 } : { left: -200 }),
                      transform: 'translateY(-50%)',
                      width: 235, height: 280, objectFit: 'cover',
                      border: '4px solid rgba(255,255,255,0.95)',
                      boxShadow: '0 8px 18px rgba(0,0,0,0.22)',
                      zIndex: 0,
                    }}
                  />
                  <div
                    className="bts-card"
                    style={{ borderRadius: 32, padding: 'clamp(1.2rem, 2.4vw, 1.7rem)', transform: `rotate(${tilt}deg)`, display: 'flex', alignItems: 'center', gap: 'clamp(14px, 3vw, 20px)', position: 'relative', zIndex: 1 }}
                  >
                    <span
                      className="bts-display bts-anim-bob"
                      style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'clamp(58px, 12vw, 74px)', height: 'clamp(58px, 12vw, 74px)', borderRadius: '50%', background: color, color: '#fff', fontSize: 'clamp(1.7rem, 5vw, 2.2rem)', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
                    >
                      {s.n}
                    </span>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 11, background: color }}>
                          <StepIcon i={i} />
                        </span>
                        <span className="bts-display" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', color: 'var(--k-ink)' }}>
                          {s.title}
                        </span>
                      </span>
                      <p className="bts-body" style={{ fontWeight: 600, color: 'var(--k-ink-soft)', lineHeight: 1.5 }}>
                        {s.text}
                      </p>
                    </div>

                    {i === STEPS.length - 1 && (
                      <Heart className="bts-anim-pulse" style={{ position: 'absolute', top: -14, right: -8, width: 34, color: 'var(--k-brand-red)' }} />
                    )}
                  </div>
                </div>

                {i < STEPS.length - 1 && (
                  <DoodleArrow
                    aria-hidden="true"
                    style={{ alignSelf: 'center', width: 56, height: 56, color, transform: `rotate(${isLeft ? 12 : -12}deg) scaleX(${isLeft ? 1 : -1})` }}
                  />
                )}
              </li>
            )
          })}
        </ol>

        <div data-reveal="pop" data-delay="120" style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <KidsButton onClick={onOpen}>{CTA}</KidsButton>
          <span className="bts-hand" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '1.4rem', color: 'var(--k-ink-soft)' }}>
            <DoodleArrow style={{ width: 34, height: 34, transform: 'rotate(150deg)', color: 'var(--k-ink-soft)' }} />
            takes less than a minute
          </span>
        </div>
      </div>
    </section>
  )
}
