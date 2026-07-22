import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { TESTIMONIALS, STUDENT_ROLE, ACADEMY } from './content'
import { Eyebrow } from './parts'
import { Sprinkles } from './deco'

const TILTS = [2.5, -3, 5, -4.5, 3.5]
const CARD_SPACING = 230
const ROTATE_Y = -36

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars" role="img" style={{ marginBottom: 12 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="var(--k-yellow-deep)" aria-hidden="true">
          <path d="M9.05 2.9c.3-.9 1.6-.9 1.9 0l1.07 3.3a1 1 0 0 0 .95.68h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 0 0-.37 1.12l1.07 3.29c.3.92-.75 1.69-1.54 1.12l-2.8-2.03a1 1 0 0 0-1.17 0l-2.8 2.03c-.79.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 0 0-.36-1.12L2.98 8.7c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 0 0 .95-.68z" />
        </svg>
      ))}
    </div>
  )
}

export function Students({ onOpen: _onOpen }: { onOpen: () => void }) {
  const [active, setActive] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasMounted = useRef(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const total = TESTIMONIALS.length

  const go = useCallback((idx: number) => setActive(((idx % total) + total) % total), [total])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setActive((p) => (p + 1) % total), 5000)
  }, [total])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animate = hasMounted.current
    const isMobile = window.innerWidth < 640
    const spacing = isMobile ? 120 : CARD_SPACING
    const rotY = isMobile ? -18 : ROTATE_Y

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const offset = i - active
      const abs = Math.abs(offset)
      const props = {
        x: offset * spacing,
        rotateY: offset * rotY,
        rotateZ: offset === 0 ? 0 : TILTS[i % TILTS.length],
        scale: abs === 0 ? 1 : 1 - abs * 0.09,
        opacity: abs === 0 ? 1 : abs === 1 ? 0.6 : abs === 2 ? 0.3 : 0,
        zIndex: 10 - abs,
      }
      if (animate) gsap.to(card, { ...props, duration: 0.6, ease: 'power3.out' })
      else gsap.set(card, props)
    })
    hasMounted.current = true
  }, [active])

  function onPointerDown(e: React.PointerEvent) { isDragging.current = true; dragStartX.current = e.clientX }
  function onPointerUp(e: React.PointerEvent) {
    if (!isDragging.current) return
    isDragging.current = false
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 50) { resetAuto(); go(delta < 0 ? active + 1 : active - 1) }
  }

  return (
    <section id="bts-students" className="relative overflow-hidden" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', background: 'var(--k-cream)' }}>
      <Sprinkles />
      <div className="mx-auto px-5" style={{ maxWidth: 1160 }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }} data-reveal="up">
          <Eyebrow color="var(--k-yellow)">Happy Families</Eyebrow>
          <h2 className="bts-display" style={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)', lineHeight: 1.08, marginTop: '1rem' }}>
            What {ACADEMY}&apos;s families are saying
          </h2>
        </div>

        <div
          className="relative mx-auto select-none"
          style={{ height: 340, perspective: '1200px', maxWidth: 900 }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => { cardRefs.current[i] = el }}
                onClick={() => { if (i !== active) { resetAuto(); go(i) } }}
                className="bts-card"
                style={{ position: 'absolute', width: 'min(300px, 82vw)', padding: '1.6rem', cursor: i !== active ? 'pointer' : 'default', willChange: 'transform, opacity' }}
              >
                <Stars />
                <blockquote
                  className="bts-body"
                  style={i !== active ? { display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.95rem', lineHeight: 1.55, color: 'var(--k-ink-soft)' } : { fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--k-ink)' }}
                >
                  <p>&ldquo;{t.text}&rdquo;</p>
                </blockquote>
                <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div className="bts-display" style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#fff', background: 'var(--k-grad-primary)', fontSize: '1rem' }}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="bts-display" style={{ fontSize: '0.95rem' }}>{t.name}</p>
                    <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--k-ink-soft)' }}>{STUDENT_ROLE}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* nav */}
        <div className="flex items-center justify-center" style={{ gap: '1.2rem', marginTop: '2rem' }}>
          <button onClick={() => { resetAuto(); go(active - 1) }} aria-label="Previous testimonial" className="bts-card" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--k-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          </button>
          <div className="flex items-center" style={{ gap: 6 }} role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} role="tab" aria-selected={i === active} aria-label={`Go to testimonial ${i + 1}`} onClick={() => { resetAuto(); go(i) }}
                style={{ height: 8, width: i === active ? 24 : 8, borderRadius: 999, transition: 'all 0.3s', background: i === active ? 'var(--k-brand-red)' : 'rgba(27,26,34,0.18)', border: 'none', cursor: 'pointer' }} />
            ))}
          </div>
          <button onClick={() => { resetAuto(); go(active + 1) }} aria-label="Next testimonial" className="bts-card" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--k-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
