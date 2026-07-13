import { Section } from '../components/ui'

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const features = [
  {
    label: 'Clean training mats',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M9 5v14" />
      </svg>
    ),
  },
  {
    label: 'Welcoming atmosphere',
    icon: (
      <svg {...iconProps}>
        <path d="M12 20s-6.5-4-6.5-8.5A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 6.5 3C18.5 16 12 20 12 20Z" />
      </svg>
    ),
  },
  {
    label: 'Strength & conditioning',
    icon: (
      <svg {...iconProps}>
        <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
      </svg>
    ),
  },
  {
    label: 'Experienced instructors',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="9" r="5" />
        <path d="M9 13.3 8 21l4-2 4 2-1-7.7" />
      </svg>
    ),
  },
  {
    label: 'Beginner-friendly community',
    icon: (
      <svg {...iconProps}>
        <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
        <circle cx="10" cy="7" r="3.2" />
        <path d="M21 20v-1a4 4 0 0 0-3-3.87M16.5 4.2a3.2 3.2 0 0 1 0 6.1" />
      </svg>
    ),
  },
]

const strip = [
  '/images/how/1.webp',
  '/images/how/2.webp',
  '/images/how/3.webp',
  '/images/how/4.webp',
  '/images/how/5.webp',
  '/images/how/6.webp',
  '/images/how/7.webp',
]

export function MoreAboutUsV2() {
  return (
    <Section id="more-about-us" labelledBy="more-about-us-heading" className="overflow-hidden">
      {/* Two-column: text left, topics right — vertically aligned */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left — eyebrow + headline + paragraph */}
        <div>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            More about us
          </p>
          <h2
            id="more-about-us-heading"
            className="font-black uppercase leading-[0.92] tracking-[-0.03em] text-[var(--color-text)]"
            style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)', fontFamily: "'Noken', system-ui, sans-serif" }}
          >
            A modern space
            <br />
            built for your <span className="text-[var(--color-danger)]">family</span>
          </h2>
          <div className="my-7 h-px w-full max-w-md bg-[var(--color-border)]" />
          <p className="max-w-md text-base leading-[1.7] text-[var(--color-text-secondary)]">
            Sceptre is a clean, modern space built to make beginners feel at home. Families can train
            together in a welcoming atmosphere, with experienced instructors and a community that has
            your back from your very first class.
          </p>
        </div>

        {/* Right — feature cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className={`group flex items-center gap-3 rounded-2xl border border-[var(--color-border)] px-4 py-3.5 transition-colors duration-200 hover:border-[var(--color-text)] ${
                i === features.length - 1 ? 'sm:col-span-2' : ''
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text)] transition-colors duration-200 group-hover:border-[var(--color-danger)] group-hover:text-[var(--color-danger)]">
                {feature.icon}
              </span>
              <span className="text-sm font-semibold text-[var(--color-text)]">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arced photo strip (full-bleed) */}
      <div
        className="relative left-1/2 mt-16 w-screen -translate-x-1/2 pb-16 md:mt-20"
        aria-hidden="true"
      >
        <div className="flex items-center justify-center -space-x-5 md:-space-x-6">
          {strip.map((src, i) => {
            const t = strip.length > 1 ? i / (strip.length - 1) : 0.5
            const rot = (t - 0.5) * 18 // -9deg → +9deg
            const ty = 72 * (1 - Math.pow(2 * t - 1, 2)) // 0 at edges → 72px down at center
            return (
              <div
                key={src}
                className="relative w-36 shrink-0 overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.20)] ring-1 ring-black/5 transition-transform duration-300 ease-out hover:z-10 md:w-52 lg:w-60 [transform:rotate(var(--r))_translateY(var(--y))] hover:[transform:rotate(0deg)_translateY(0)_scale(1.06)]"
                style={{ '--r': `${rot}deg`, '--y': `${ty}px` } as React.CSSProperties}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] h-full w-full object-cover"
                />
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
