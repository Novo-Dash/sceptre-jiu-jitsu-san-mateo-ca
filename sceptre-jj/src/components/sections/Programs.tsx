import { cn } from '@/lib/utils'
import { programs } from '../../data/programs'
import { Section, SectionHeader, WobbleCard } from '../ui'
import type { ProgramId } from '../../types'

interface ProgramsProps {
  onBooking: (program: ProgramId) => void
}

const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const colConfig = [
  'col-span-1 min-h-[420px]',
  'col-span-1 min-h-[420px]',
  'col-span-1 lg:col-span-2 min-h-[320px]',
]

export function Programs({ onBooking }: ProgramsProps) {
  return (
    <Section id="programs" labelledBy="programs-heading">
      <SectionHeader
        id="programs-heading"
        headline="Our classes"
        sub="Beginner-friendly programs for adults, kids, and women — no experience needed."
        centered
        headlineClassName="!text-[clamp(2.8rem,8vw+0.5rem,7rem)] tracking-[-0.03em]"
        headlineStyle={{ fontFamily: "'Noken', system-ui, sans-serif", marginTop: '-0.2em' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-4">
        {programs.map((program, i) => (
          <WobbleCard
            key={program.id}
            onClick={() => onBooking(program.id)}
            containerClassName={cn(
              colConfig[i],
              'p-8 flex flex-col',
              program.id === 'adults' && 'adults-card'
            )}
            style={program.image ? {
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 45%, transparent 70%), url(${program.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : { background: 'var(--color-surface-dark)' }}
          >

            <div className="mt-auto relative z-10">
              {/* Title */}
              <h3
                className="font-bold text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(1.6rem, 2vw + 0.5rem, 1.75rem)', fontFamily: "'Noken', system-ui, sans-serif" }}
              >
                {program.title}
              </h3>

              {/* Subtitle pill + CTA */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {(program.pills ?? [program.subtitle]).map(pill => (
                    <span key={pill} className={cn(
                      'whitespace-nowrap font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white',
                      program.id === 'adults' ? 'text-[14px] lg:text-[11px]' : 'text-[11px]'
                    )}>
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-white text-sm font-semibold uppercase tracking-wider shrink-0">
                  Start Training
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-600">
                    {arrowIcon}
                  </span>
                </div>
              </div>
            </div>
          </WobbleCard>
        ))}
      </div>
    </Section>
  )
}
