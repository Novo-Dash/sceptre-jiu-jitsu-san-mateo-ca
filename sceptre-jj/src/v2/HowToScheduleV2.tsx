import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Section, SectionHeader } from '../components/ui'
import { CtaButton } from './CtaButton'

interface HowToScheduleV2Props {
  onBooking: () => void
}

const iconProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const steps = [
  {
    n: '1',
    title: 'Click the button and fill out the form',
    text: 'Tell us a little about you — it takes less than a minute.',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    n: '2',
    title: 'Choose your class type and pick a date & time',
    text: 'Select the class that fits you and choose a slot on the calendar.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <rect x="7" y="13" width="4" height="4" rx="0.5" />
      </svg>
    ),
  },
  {
    n: '3',
    title: "You'll get email and SMS confirmations",
    text: 'All the details land in your inbox and phone — no guesswork.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </svg>
    ),
  },
]

export function HowToScheduleV2({ onBooking }: HowToScheduleV2Props) {
  const listRef = useRef<HTMLOListElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = listRef.current
    if (!el) return

    const cards = gsap.utils.toArray<HTMLElement>('[data-step]', el)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
      tl.from(cards, {
        autoAlpha: 0,
        y: 44,
        duration: 0.7,
        stagger: 0.16,
        ease: 'power3.out',
      })
      tlRef.current = tl
    }, el)

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tlRef.current?.play()
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <Section id="how-to-schedule" labelledBy="how-to-schedule-heading">
      <SectionHeader
        id="how-to-schedule-heading"
        centered
        eyebrow="How to schedule"
        headline="How to get started?"
        headlineClassName="!text-[clamp(2.6rem,6vw,5.2rem)] tracking-[-0.03em]"
        headlineStyle={{ fontFamily: "'Noken', system-ui, sans-serif" }}
      />

      <ol ref={listRef} className="grid grid-cols-1 gap-6 md:grid-cols-3" role="list">
        {steps.map((step) => (
          <li
            key={step.n}
            data-step
            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-8 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-[var(--color-text)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          >
            {/* Top row: number badge + icon */}
            <div className="flex items-center justify-between">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-text)] text-lg font-bold text-white transition-transform duration-300 ease-out group-hover:scale-110 group-hover:bg-[var(--color-danger)]"
                aria-hidden="true"
              >
                {step.n}
              </span>
              <span className="text-[var(--color-border)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:text-[var(--color-danger)]">
                {step.icon}
              </span>
            </div>

            <h3 className="text-base font-bold leading-snug text-[var(--color-text)]">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {step.text}
            </p>

            {/* Growing accent line on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--color-danger)] transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
          </li>
        ))}
      </ol>

      <div className="mt-16 flex justify-center md:mt-20">
        <CtaButton onBooking={onBooking} label="Schedule free class" />
      </div>
    </Section>
  )
}
