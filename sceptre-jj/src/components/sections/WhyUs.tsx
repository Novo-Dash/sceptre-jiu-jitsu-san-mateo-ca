import { Section, SectionHeader, DraggableCardContainer, DraggableCardBody, Button } from '../ui'
import type { ProgramId } from '../../types'

const benefits = [
  {
    id: 'confident',
    label: 'Confident',
    image: '/images/polaroids/Frame 4.webp',
    className: 'top-[13%] left-[4%]  rotate-[-6deg]',
    rotation: '-6deg',
  },
  {
    id: 'self-defense',
    label: 'Self-Defense',
    image: '/images/polaroids/Frame 6.webp',
    className: 'top-[5%]  left-[23%] rotate-[8deg]',
    rotation: '8deg',
  },
  {
    id: 'discipline',
    label: 'Discipline',
    image: '/images/polaroids/Frame 7.webp',
    className: 'top-[18%] left-[42%] rotate-[-8deg]',
    rotation: '-8deg',
  },
  {
    id: 'stronger',
    label: 'Stronger',
    image: '/images/polaroids/Frame 9.webp',
    className: 'top-[6%]  left-[61%] rotate-[6deg]',
    rotation: '6deg',
  },
  {
    id: 'community',
    label: 'Community',
    image: '/images/polaroids/Frame 10.webp',
    className: 'top-[15%] left-[80%] rotate-[-5deg]',
    rotation: '-5deg',
  },
]

function PolaroidCard({ image, label, rotation }: { image: string; label: string; rotation: string }) {
  return (
    <div className="flex-shrink-0" style={{ transform: `rotate(${rotation})` }}>
      <div className="bg-white p-2.5 pb-8 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
        <img
          src={image}
          alt={label}
          loading="lazy"
          decoding="async"
          className="h-36 w-36 object-cover"
        />
        <p className="mt-2 text-center text-[11px] font-semibold tracking-wide text-neutral-700">
          {label}
        </p>
      </div>
    </div>
  )
}

interface WhyUsProps {
  onBooking: (program?: ProgramId | '') => void
  eyebrow?: string
  headline?: React.ReactNode
  sub?: string
  ctaLabel?: string
  showSeal?: boolean
}

export function WhyUs({
  onBooking,
  eyebrow = 'Our Philosophy',
  headline,
  sub = "At Sceptre, we build a community rooted in inclusion. No matter your age or fitness level — you'll be one of us from day one.",
  ctaLabel,
  showSeal = false,
}: WhyUsProps) {
  return (
    <Section id="why-us" labelledBy="why-us-heading">
      <SectionHeader
        id="why-us-heading"
        eyebrow={eyebrow}
        headline={
          headline ?? (
            <>
              <span className="block md:hidden">Training is</span>
              <span className="block md:hidden">easier together.</span>
              <span className="hidden md:block whitespace-nowrap">Training is easier together.</span>
            </>
          )
        }
        sub={sub}
        headlineClassName="!text-[clamp(2.6rem,5.2vw,5.8rem)] md:tracking-[-0.03em]"
        headlineStyle={{ fontFamily: "'Noken', system-ui, sans-serif", marginTop: '-0.2em' }}
      />

      {(ctaLabel || showSeal) && (
        <div className="-mt-6 mb-4 flex flex-col items-center gap-6">
          {ctaLabel && (
            <Button variant="danger" size="lg" onClick={() => onBooking('')}>
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          )}
          {showSeal && (
            <div
              className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[var(--color-text)] text-center"
              role="img"
              aria-label="Beginner friendly since 2018"
            >
              <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-[var(--color-text)]">
                Beginner
                <br />
                Friendly
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Since 2018
              </span>
            </div>
          )}
        </div>
      )}

      {/* Mobile: infinite auto-scroll carousel */}
      <div className="md:hidden overflow-hidden relative left-1/2 w-screen -translate-x-1/2 py-10">
        <div className="flex gap-6 animate-marquee" style={{ width: 'max-content' }}>
          {[...benefits, ...benefits].map((item, i) => (
            <PolaroidCard
              key={`${item.id}-${i}`}
              image={item.image}
              label={item.label}
              rotation={item.rotation}
            />
          ))}
        </div>
      </div>

      {/* Desktop: draggable cards */}
      <DraggableCardContainer className="hidden md:block relative left-1/2 h-[500px] w-screen -translate-x-1/2">
        {benefits.map((item) => (
          <DraggableCardBody key={item.id} className={item.className}>
            <div className="group bg-white p-3 pb-10 shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
              <div className="relative h-64 w-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.label}
                  width={256}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none h-64 w-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay + animated button on hover */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onBooking('')}
                    className="pointer-events-auto translate-y-3 scale-95 rounded-full bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-900 opacity-0 shadow-lg transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 hover:bg-neutral-100"
                  >
                    Start Training
                  </button>
                </div>
              </div>
              <p className="mt-3 text-center text-sm font-semibold tracking-wide text-neutral-700">
                {item.label}
              </p>
            </div>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>

    </Section>
  )
}
