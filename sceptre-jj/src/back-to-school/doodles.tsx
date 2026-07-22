import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

export function CircleScribble(props: P) {
  return (
    <svg viewBox="0 0 220 90" fill="none" {...props}>
      <path
        data-draw
        pathLength={1}
        d="M110 8C55 6 12 22 10 45c-2 24 55 39 104 37 46-2 96-16 96-39C210 21 165 10 118 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function UnderlineScribble(props: P) {
  return (
    <svg viewBox="0 0 240 24" fill="none" {...props}>
      <path
        data-draw
        pathLength={1}
        d="M6 15c40-9 92-11 140-8 34 2 62 6 88 11"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function DoodleArrow(props: P) {
  return (
    <svg viewBox="0 0 90 60" fill="none" {...props}>
      <path
        data-draw
        pathLength={1}
        d="M6 12c22 4 44 16 52 40M58 52c2-9 5-15 12-20M58 52c-8-3-14-4-22-3"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Star(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2.5l2.6 6.1 6.6.5-5 4.3 1.5 6.5L12 16.9 6.3 19.9l1.5-6.5-5-4.3 6.6-.5z"
      />
    </svg>
  )
}

export function Sparkle(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z" />
    </svg>
  )
}

export function Sun(props: P) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <circle cx="24" cy="24" r="10" fill="currentColor" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        const x1 = 24 + Math.cos(a) * 15
        const y1 = 24 + Math.sin(a) * 15
        const x2 = 24 + Math.cos(a) * 22
        const y2 = 24 + Math.sin(a) * 22
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      })}
    </svg>
  )
}

export function Cloud(props: P) {
  return (
    <svg viewBox="0 0 64 40" {...props}>
      <path
        fill="currentColor"
        d="M16 34a12 12 0 0 1 0-24 14 14 0 0 1 26-4 10 10 0 0 1 6 28H16z"
      />
    </svg>
  )
}

export function Squiggle(props: P) {
  return (
    <svg viewBox="0 0 120 24" fill="none" {...props}>
      <path
        data-draw
        pathLength={1}
        d="M4 12c8-10 16 10 24 0s16 10 24 0 16 10 24 0 16 10 24 0"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Pencil(props: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path d="M34 6l8 8-24 24-10 2 2-10z" fill="var(--k-yellow, #FFC93C)" stroke="var(--k-ink, #1B1A22)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 10l8 8" stroke="var(--k-ink, #1B1A22)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 30l-2 10 10-2z" fill="var(--k-pink, #FF7FB0)" stroke="var(--k-ink, #1B1A22)" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}

export function Heart(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" />
    </svg>
  )
}
