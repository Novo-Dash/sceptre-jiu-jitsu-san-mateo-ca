import { CtaButton } from './CtaButton'

interface TrialV2Props {
  onBooking: () => void
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const perks = ['100% free', 'Uniform provided', 'No experience needed']

const activities = [
  {
    step: '01',
    title: 'Warm-up',
    text: 'A light, guided warm-up to get your body moving — no athletic background needed.',
  },
  {
    step: '02',
    title: 'Basic techniques',
    text: 'Learn a few foundational movements at your own pace, with patient instruction.',
  },
]

const checkIcon = (
  <svg {...iconProps} className="shrink-0 text-[var(--color-danger)]">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export function TrialV2({ onBooking }: TrialV2Props) {
  return (
    <section
      id="trial"
      aria-labelledby="trial-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-bg-dark)]"
    >
      {/* Backdrop */}
      <img
        src="/images/how.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/25"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10">
        <div className="max-w-xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-danger)]">
            Your First Class
          </p>

          <h2
            id="trial-heading"
            className="font-black leading-[0.95] tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', fontFamily: "'Noken', system-ui, sans-serif" }}
          >
            What is a trial class like?
          </h2>

          <p className="mt-6 max-w-md text-base leading-[1.7] text-white/70">
            We provide everything you need, including the uniform. Come try it — it's free, and
            you'll leave with at least a memory of a good day.
          </p>

          {/* Two activities — clean numbered list, no boxes */}
          <ol className="mt-10 space-y-3" role="list">
            {activities.map((a) => (
              <li
                key={a.step}
                className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 backdrop-blur-md transition-all duration-300 ease-out hover:border-white/15 hover:bg-white/[0.06]"
              >
                {/* Top sheen */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />

                <span
                  className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-sm font-semibold text-white transition-colors duration-300 group-hover:border-[var(--color-danger)] group-hover:text-[var(--color-danger)]"
                  aria-hidden="true"
                >
                  {a.step}
                </span>

                <div>
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "'Noken', system-ui, sans-serif" }}
                  >
                    {a.title}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/75">
                    {a.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Trust row */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3" role="list">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm font-medium text-white/80">
                {checkIcon}
                {perk}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-10">
            <CtaButton onBooking={onBooking} />
          </div>
        </div>
      </div>
    </section>
  )
}
