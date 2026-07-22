import { KidsButton } from './KidsButton'
import { CTA } from './content'
import { Sun, Cloud, Star, Sparkle, DoodleArrow } from './doodles'

function StarburstBadge() {
  const pts = Array.from({ length: 40 }).map((_, i) => {
    const a = (i / 40) * Math.PI * 2
    const r = i % 2 === 0 ? 50 : 42
    return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`
  })
  return (
    <div
      className="bts-anim-sway"
      style={{ position: 'absolute', width: 116, height: 116, right: -14, top: -18, zIndex: 4 }}
    >
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, filter: 'drop-shadow(0 8px 18px rgba(225,29,42,0.35))' }}>
        <polygon points={pts.join(' ')} fill="var(--k-brand-red)" />
      </svg>
      <div
        className="bts-display"
        style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: '#fff', textAlign: 'center',
          lineHeight: 1, gap: 2,
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>1st</span>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.08em' }}>CLASS FREE</span>
      </div>
    </div>
  )
}

export function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section id="bts-hero" className="bts-dotgrid relative" style={{ minHeight: '100svh', overflowX: 'clip', display: 'flex', alignItems: 'center' }}>
      {/* ambient */}
      <span className="bts-bubble bts-anim-float" style={{ width: 90, height: 90, background: 'var(--k-yellow)', top: '14%', left: '6%' }} />
      <span className="bts-bubble bts-anim-floatx" style={{ width: 54, height: 54, background: 'var(--k-blue)', top: '68%', left: '10%' }} />
      <span className="bts-bubble bts-anim-float" style={{ width: 40, height: 40, background: 'var(--k-green)', bottom: '12%', right: '8%' }} />
      <Sun className="bts-anim-spin" style={{ position: 'absolute', width: 52, height: 52, color: 'var(--k-yellow-deep)', top: '8%', right: '12%' }} />
      <Cloud className="bts-anim-floatx" style={{ position: 'absolute', width: 74, color: '#fff', top: '20%', right: '30%', filter: 'drop-shadow(0 6px 14px rgba(27,26,34,0.08))' }} />
      <Star className="bts-anim-bob" style={{ position: 'absolute', width: 26, color: 'var(--k-pink)', top: '40%', left: '3%' }} />
      <Sparkle className="bts-anim-pulse" style={{ position: 'absolute', width: 22, color: 'var(--k-blue)', bottom: '22%', left: '44%' }} />

      <div className="mx-auto px-5" style={{ maxWidth: 1120, paddingTop: 32, paddingBottom: 48, width: '100%' }}>
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <div data-reveal="up">
            <h1
              className="bts-display"
              style={{ fontSize: 'clamp(2.1rem, 5.2vw, 4.1rem)', lineHeight: 1.04, marginTop: '1.1rem', marginBottom: '1.1rem' }}
            >
              Give your child{' '}
              <span className="bts-mark" style={{ '--hl': 'var(--k-yellow)' } as React.CSSProperties}>confidence</span>{' '}
              that goes beyond the classroom.
            </h1>
            <p className="bts-body" style={{ fontSize: '1.08rem', lineHeight: 1.65, color: 'var(--k-ink-soft)', maxWidth: '32rem' }}>
              At Sceptre, kids build focus, discipline, and real friendships on the mats —
              the kind of confidence that shows up at school, at home, and everywhere in between.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.7rem' }}>
              <KidsButton onClick={onOpen} ariaLabel={CTA}>{CTA}</KidsButton>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <DoodleArrow style={{ width: 46, color: 'var(--k-ink-soft)', transform: 'rotate(8deg)' }} />
                <span className="bts-hand" style={{ fontSize: '1.15rem', color: 'var(--k-ink)' }}>it&apos;s 100% free!</span>
              </span>
            </div>
          </div>

          {/* RIGHT — soft photo cluster */}
          <div data-reveal="pop" data-delay="120" style={{ position: 'relative', minHeight: 380 }}>
            {/* morphing color blob behind the photos */}
            <span
              aria-hidden="true"
              className="bts-blob bts-anim-float"
              style={{ position: 'absolute', inset: '-10% -8%', background: 'var(--k-brand-red)', zIndex: 0 }}
            />
            <figure
              style={{
                position: 'relative', margin: 0, borderRadius: 'var(--k-radius)', overflow: 'hidden',
                boxShadow: 'var(--k-soft-lg)', transform: 'rotate(-3deg)', maxWidth: 380, marginInline: 'auto',
              }}
            >
              <img src="/images/how/1.webp" alt="A young student training Jiu-Jitsu at Sceptre" width={760} height={900} loading="eager" style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
              <figcaption className="bts-hand" style={{ position: 'absolute', bottom: 10, left: 14, color: '#fff', fontSize: '1.15rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                first class!
              </figcaption>
            </figure>

            <figure
              className="bts-anim-float"
              style={{
                position: 'absolute', right: -6, bottom: -18, width: 150, margin: 0,
                borderRadius: 18, overflow: 'hidden', border: '4px solid #fff', boxShadow: 'var(--k-soft)',
                transform: 'rotate(5deg)', zIndex: 3,
              }}
            >
              <img src="/images/how/2.webp" alt="Kids partner drill in a Sceptre kids class" width={300} height={300} loading="eager" style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
            </figure>

            <StarburstBadge />
          </div>
        </div>
      </div>
    </section>
  )
}
