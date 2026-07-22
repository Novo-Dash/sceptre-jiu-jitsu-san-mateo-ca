import { useEffect } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Preset = { from: gsap.TweenVars; ease: string }

const PRESETS: Record<string, Preset> = {
  up: { from: { y: 52, opacity: 0 }, ease: 'power3.out' },
  down: { from: { y: -52, opacity: 0 }, ease: 'power3.out' },
  left: { from: { x: -60, opacity: 0 }, ease: 'power3.out' },
  right: { from: { x: 60, opacity: 0 }, ease: 'power3.out' },
  pop: { from: { scale: 0.55, opacity: 0 }, ease: 'back.out(1.7)' },
  rotate: { from: { rotate: -8, y: 40, opacity: 0 }, ease: 'back.out(1.4)' },
  tiltin: { from: { rotate: 6, x: 40, opacity: 0 }, ease: 'back.out(1.3)' },
}

export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const kind = el.dataset.reveal || 'up'
        const preset = PRESETS[kind] ?? PRESETS.up
        const delay = (parseFloat(el.dataset.delay || '0') || 0) / 1000
        const restRotate = parseFloat(el.dataset.restRotate || '0') || 0

        gsap.fromTo(
          el,
          { ...preset.from },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotate: restRotate,
            opacity: 1,
            duration: 0.85,
            delay,
            ease: preset.ease,
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }
        )
      })

      root.querySelectorAll<SVGPathElement>('[data-draw]').forEach((path) => {
        gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: path.closest('[data-draw-trigger]') || path,
            start: 'top 82%',
            once: true,
          },
        })
      })

      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh())
      }
    }, root)

    return () => ctx.revert()
  }, [scope])
}
