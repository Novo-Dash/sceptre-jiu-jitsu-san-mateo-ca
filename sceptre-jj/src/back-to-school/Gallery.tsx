import { useEffect, useRef, useState } from 'react'
import { GALLERY } from './content'
import { Eyebrow } from './parts'
import { Sprinkles } from './deco'

const COPIES = 3
const AUTO_MS = 2800
const GAP = 18

export function Gallery() {
  const len = GALLERY.length
  const items = Array.from({ length: COPIES }).flatMap(() => GALLERY)

  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200))
  const [featured, setFeatured] = useState(len) // start in the middle copy
  const [noTrans, setNoTrans] = useState(false)
  const paused = useRef(false)
  const dragX = useRef<number | null>(null)

  useEffect(() => {
    const on = () => setVw(window.innerWidth)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  // auto-advance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => { if (!paused.current) setFeatured((f) => f + 1) }, AUTO_MS)
    return () => clearInterval(id)
  }, [])

  // seamless rebase back into the middle copy (no visible jump — copies are identical)
  useEffect(() => {
    if (noTrans) {
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setNoTrans(false)))
      return () => cancelAnimationFrame(raf)
    }
    if (featured >= 2 * len || featured < len) {
      const t = setTimeout(() => {
        setNoTrans(true)
        setFeatured((f) => (f >= 2 * len ? f - len : f + len))
      }, 720)
      return () => clearTimeout(t)
    }
  }, [featured, noTrans, len])

  // deterministic sizing (no DOM measurement → no first-paint bug)
  const narrow = Math.min(300, Math.round(vw * 0.56))
  const wide = Math.min(520, Math.round(vw * 0.82))
  const peek = Math.min(110, Math.round(vw * 0.1))
  const tx = peek - featured * (narrow + GAP)

  function onDown(e: React.PointerEvent) { paused.current = true; dragX.current = e.clientX }
  function onUp(e: React.PointerEvent) {
    paused.current = false
    if (dragX.current == null) return
    const d = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(d) > 45) setFeatured((f) => (d < 0 ? f + 1 : f - 1))
  }

  return (
    <section id="bts-inside" className="relative" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0', overflowX: 'clip' }}>
      <Sprinkles />
      <div className="mx-auto px-5" style={{ maxWidth: 1160 }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }} data-reveal="up">
          <Eyebrow color="var(--k-orange)" textColor="#fff">Inside the academy</Eyebrow>
          <h2 className="bts-display" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.2rem)', lineHeight: 1.05, marginTop: '1rem' }}>
            Take a peek inside
          </h2>
        </div>
      </div>

      {/* viewport with edge-fade mask */}
      <div
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        style={{
          overflow: 'hidden', cursor: 'grab', touchAction: 'pan-y',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0, #000 7%, #000 93%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex', gap: GAP, willChange: 'transform',
            transform: `translateX(${tx}px)`,
            transition: noTrans ? 'none' : 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {items.map((src, i) => {
            const active = i === featured
            return (
              <div
                key={i}
                onClick={() => setFeatured(i)}
                style={{
                  position: 'relative', flexShrink: 0, cursor: 'pointer',
                  height: 'clamp(300px, 46vw, 460px)',
                  width: active ? wide : narrow,
                  borderRadius: 'var(--k-radius)', overflow: 'hidden',
                  boxShadow: active ? 'var(--k-soft-lg)' : 'var(--k-soft-sm)',
                  transition: noTrans ? 'none' : 'width 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s',
                }}
              >
                <img src={src} alt="" loading="lazy" decoding="async" draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: active ? 'none' : 'saturate(0.85) brightness(0.96)', transition: 'filter 0.5s' }} />
                <span aria-hidden="true"
                  style={{ position: 'absolute', left: 20, right: 20, bottom: 18, height: 5, borderRadius: 999, background: 'var(--k-grad-primary)', transformOrigin: 'left', transform: `scaleX(${active ? 1 : 0})`, transition: 'transform 0.7s ease' }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
