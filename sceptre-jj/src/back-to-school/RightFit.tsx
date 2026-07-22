import { useEffect, useRef, useState } from 'react'
import { RIGHT_FIT, CTA } from './content'
import { Eyebrow } from './parts'
import { KidsButton } from './KidsButton'
import { Pencil, Star } from './doodles'
import { Sprinkles } from './deco'

function DrawnCheck({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, flexShrink: 0,
        borderRadius: 9, border: '2.5px solid rgba(27,26,34,0.22)', background: on ? 'var(--k-green)' : 'transparent',
        borderColor: on ? 'var(--k-green)' : 'rgba(27,26,34,0.22)', transition: 'background 0.25s, border-color 0.25s',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 13l5 5L20 6" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: 30, strokeDashoffset: on ? 0 : 30, transition: 'stroke-dashoffset 0.4s ease 0.05s' }} />
      </svg>
    </span>
  )
}

export function RightFit({ onOpen }: { onOpen: () => void }) {
  const [checked, setChecked] = useState<boolean[]>(() => RIGHT_FIT.map(() => false))
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChecked(RIGHT_FIT.map(() => true))
      return
    }
    const timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx)
          if (e.isIntersecting) {
            const t = setTimeout(() => setChecked((prev) => { if (prev[idx]) return prev; const n = [...prev]; n[idx] = true; return n }), 300 + idx * 120)
            timers.push(t)
          }
        })
      },
      { threshold: 0.7 }
    )
    rowRefs.current.forEach((el) => el && io.observe(el))
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  const doneCount = checked.filter(Boolean).length
  const allDone = doneCount === RIGHT_FIT.length

  return (
    <section id="bts-fit" className="relative" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', background: 'var(--k-cream)' }}>
      <Sprinkles />
      <div className="mx-auto px-5" style={{ maxWidth: 760 }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }} data-reveal="up">
          <Eyebrow color="var(--k-purple)" textColor="#fff">Is it the right fit?</Eyebrow>
          <h2 className="bts-display" style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)', lineHeight: 1.08, marginTop: '1rem' }}>
            Check the boxes that sound like your family
          </h2>
        </div>

        {/* notebook */}
        <div
          className="bts-notebook-lines"
          data-reveal="up"
          style={{ position: 'relative', background: 'var(--k-paper)', borderRadius: 'var(--k-radius)', boxShadow: 'var(--k-soft-lg)', border: 'var(--k-hairline)', padding: 'clamp(1.4rem, 4vw, 2.4rem) clamp(1.2rem, 4vw, 2.2rem)', paddingLeft: 'clamp(2.2rem, 6vw, 3.4rem)', overflow: 'hidden' }}
        >
          {/* red margin */}
          <span style={{ position: 'absolute', top: 0, bottom: 0, left: 'clamp(1.5rem, 5vw, 2.6rem)', width: 2, background: 'rgba(225,29,42,0.35)' }} />
          {/* punch holes */}
          {[0.18, 0.5, 0.82].map((p) => (
            <span key={p} style={{ position: 'absolute', left: 8, top: `${p * 100}%`, width: 12, height: 12, borderRadius: '50%', background: 'var(--k-cream-deep)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)' }} />
          ))}

          <Pencil className="bts-anim-sway" style={{ position: 'absolute', width: 40, right: 16, top: -14, zIndex: 3 }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="bts-hand" style={{ fontSize: '1.3rem', color: 'var(--k-ink)' }}>My child&hellip;</span>
            <span className="bts-display" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem', borderRadius: 999, background: allDone ? 'var(--k-green)' : 'var(--k-cream-deep)', color: allDone ? '#fff' : 'var(--k-ink-soft)', transition: 'all 0.3s' }}>
              {doneCount}/{RIGHT_FIT.length}
            </span>
          </div>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {RIGHT_FIT.map((item, i) => (
              <li
                key={item}
                data-idx={i}
                ref={(el) => { rowRefs.current[i] = el }}
                onClick={() => setChecked((prev) => { const n = [...prev]; n[i] = !n[i]; return n })}
                style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 0', borderBottom: i < RIGHT_FIT.length - 1 ? '1px dashed rgba(27,26,34,0.12)' : 'none', cursor: 'pointer' }}
              >
                <DrawnCheck on={checked[i]} />
                <span className="bts-body" style={{ fontSize: '1rem', color: 'var(--k-ink)', textDecoration: checked[i] ? 'none' : 'none', opacity: checked[i] ? 1 : 0.85 }}>{item}</span>
              </li>
            ))}
          </ul>

          {/* verdict */}
          <div
            style={{
              marginTop: '1.4rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: 16,
              border: '2px dashed rgba(63,185,132,0.5)', background: 'rgba(63,185,132,0.08)', padding: '1rem 1.2rem',
              opacity: doneCount >= 2 ? 1 : 0.45, transition: 'opacity 0.4s',
            }}
          >
            <span className="bts-display bts-anim-pulse" style={{ display: 'inline-flex', width: 46, height: 46, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--k-yellow)', color: 'var(--k-ink)', fontSize: '1.2rem', flexShrink: 0, position: 'relative' }}>
              A+
              <Star style={{ position: 'absolute', width: 14, top: -6, right: -6, color: 'var(--k-brand-red)' }} />
            </span>
            <p className="bts-body" style={{ fontSize: '0.98rem', color: 'var(--k-ink)', margin: 0 }}>
              Sounds like Sceptre is a <strong>great fit</strong>. Come see it for yourself — the first class is on us.
            </p>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: '2.4rem' }} data-reveal="up">
          <KidsButton onClick={onOpen} ariaLabel={CTA}>{CTA}</KidsButton>
        </div>
      </div>
    </section>
  )
}
