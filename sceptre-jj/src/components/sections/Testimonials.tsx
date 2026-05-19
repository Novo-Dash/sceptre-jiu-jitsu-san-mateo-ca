import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { testimonials } from '../../data/testimonials'

const TILTS        = [2.5, -3, 5, -4.5, 3.5, -2]
const CARD_SPACING = 220
const ROTATE_Y     = -36

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="text-[var(--color-text)]">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-label="Google Review" role="img" className="ml-auto flex-shrink-0 opacity-50">
      <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.41v2h2.6c1.52-1.4 2.4-3.46 2.4-5.87Z" fill="#4285F4"/>
      <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.6-2.01c-.71.48-1.63.76-2.7.76-2.07 0-3.82-1.4-4.45-3.27H.87v2.07A8 8 0 0 0 8 16Z" fill="#34A853"/>
      <path d="M3.55 9.54A4.82 4.82 0 0 1 3.3 8c0-.53.09-1.05.25-1.54V4.39H.87A8 8 0 0 0 0 8c0 1.29.31 2.51.87 3.61l2.68-2.07Z" fill="#FBBC05"/>
      <path d="M8 3.18c1.17 0 2.22.4 3.05 1.2l2.28-2.28A8 8 0 0 0 8 0 8 8 0 0 0 .87 4.39l2.68 2.07C4.18 4.58 5.93 3.18 8 3.18Z" fill="#EA4335"/>
    </svg>
  )
}

export function Testimonials() {
  const [active, setActive]     = useState(0)
  const cardRefs                = useRef<(HTMLDivElement | null)[]>([])
  const autoRef                 = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasMounted              = useRef(false)
  const isDragging              = useRef(false)
  const dragStartX              = useRef(0)
  const total                   = testimonials.length

  const go = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total)
  }, [total])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setActive(p => (p + 1) % total), 5000)
  }, [total])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animate = hasMounted.current

    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const offset = i - active
      const abs    = Math.abs(offset)
      const props  = {
        x:       offset * CARD_SPACING,
        rotateY: offset * ROTATE_Y,
        rotateZ: offset === 0 ? 0 : TILTS[i % TILTS.length],
        scale:   abs === 0 ? 1 : 1 - abs * 0.09,
        opacity: abs === 0 ? 1 : abs === 1 ? 0.6 : abs === 2 ? 0.3 : 0,
        zIndex:  10 - abs,
      }
      if (animate) {
        gsap.to(card, { ...props, duration: 0.6, ease: 'power3.out' })
      } else {
        gsap.set(card, props)
      }
    })

    hasMounted.current = true
  }, [active])

  function onPointerDown(e: React.PointerEvent) {
    isDragging.current = true
    dragStartX.current = e.clientX
  }
  function onPointerUp(e: React.PointerEvent) {
    if (!isDragging.current) return
    isDragging.current = false
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 50) { resetAuto(); go(delta < 0 ? active + 1 : active - 1) }
  }

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-white overflow-hidden py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <h2
            id="testimonials-title"
            className="font-black text-[var(--color-text)] leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.4rem, 5.2vw, 5.8rem)', fontFamily: "'Noken', system-ui, sans-serif" }}
          >
            <span className="block md:hidden">Meet Some of</span>
            <span className="block md:hidden">Our Students</span>
            <span className="hidden md:block whitespace-nowrap">Meet Some of Our Students</span>
          </h2>
        </div>

        {/* Fan carousel */}
        <div
          className="relative mx-auto select-none"
          style={{ height: 380, perspective: '1200px' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                ref={el => { cardRefs.current[i] = el }}
                onClick={() => { if (i !== active) { resetAuto(); go(i) } }}
                style={{
                  position:        'absolute',
                  width:           280,
                  transformOrigin: 'center center',
                  willChange:      'transform, opacity',
                  cursor:          i !== active ? 'pointer' : 'default',
                }}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              >
                <StarRow />

                <blockquote
                  className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
                  style={i !== active ? {
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  } : undefined}
                >
                  <p>"{t.text}"</p>
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-text)] text-sm font-bold text-white">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{t.author}</p>
                    {t.role && (
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">{t.role}</p>
                    )}
                  </div>
                  <GoogleMark />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            onClick={() => { resetAuto(); go(active - 1) }}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]
                       text-[var(--color-text-muted)] transition hover:border-[var(--color-text)] hover:text-[var(--color-text)]
                       min-h-[44px] min-w-[44px]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => { resetAuto(); go(i) }}
                className="h-0.5 rounded-full transition-all duration-300 min-w-[8px]"
                style={{
                  width:           i === active ? 24 : 8,
                  backgroundColor: i === active ? '#0A0A0A' : '#E5E5E5',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => { resetAuto(); go(active + 1) }}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]
                       text-[var(--color-text-muted)] transition hover:border-[var(--color-text)] hover:text-[var(--color-text)]
                       min-h-[44px] min-w-[44px]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
