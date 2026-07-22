import { Star, Sparkle } from './doodles'

const COLORS = ['var(--k-yellow)', 'var(--k-blue)', 'var(--k-green)', 'var(--k-pink)', 'var(--k-orange)', 'var(--k-purple)']

// Deterministic scatter of confetti bits + twinkles (no randomness → resume-safe).
const BITS = [
  { top: '10%', left: '6%', size: 12, shape: 'dot', c: 0, anim: 'bts-confetti' },
  { top: '22%', left: '92%', size: 10, shape: 'sq', c: 1, anim: 'bts-anim-float' },
  { top: '68%', left: '4%', size: 14, shape: 'sq', c: 2, anim: 'bts-anim-floatx' },
  { top: '80%', left: '90%', size: 12, shape: 'dot', c: 3, anim: 'bts-confetti' },
  { top: '46%', left: '96%', size: 9, shape: 'dot', c: 4, anim: 'bts-anim-bob' },
  { top: '88%', left: '40%', size: 11, shape: 'sq', c: 5, anim: 'bts-anim-float' },
  { top: '6%', left: '52%', size: 10, shape: 'dot', c: 1, anim: 'bts-confetti' },
]
const TWINKLES = [
  { top: '16%', left: '20%', size: 20, c: 0 },
  { top: '72%', left: '82%', size: 16, c: 3 },
  { top: '34%', left: '8%', size: 14, c: 1 },
]

export function Sprinkles({ stars = true }: { stars?: boolean }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      {BITS.map((b, i) => (
        <span
          key={`b${i}`}
          className={b.anim}
          style={{
            position: 'absolute', top: b.top, left: b.left, width: b.size, height: b.size,
            background: COLORS[b.c], borderRadius: b.shape === 'dot' ? '50%' : 4,
            opacity: 0.7, transform: b.shape === 'sq' ? 'rotate(20deg)' : undefined,
            animationDelay: `${i * 0.35}s`,
          }}
        />
      ))}
      {stars &&
        TWINKLES.map((t, i) => (
          <Star
            key={`t${i}`}
            className="bts-anim-twinkle"
            style={{ position: 'absolute', top: t.top, left: t.left, width: t.size, color: COLORS[t.c], animationDelay: `${i * 0.5}s` }}
          />
        ))}
      <Sparkle className="bts-anim-twinkle" style={{ position: 'absolute', top: '58%', left: '30%', width: 16, color: 'var(--k-blue)' }} />
    </div>
  )
}
