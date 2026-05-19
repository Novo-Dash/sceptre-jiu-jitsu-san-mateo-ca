import { instructors } from '../../data/instructors'
import { Section, SectionHeader } from '../ui'
import { cn } from '../../lib/utils'

const beltColorClass: Record<string, string> = {
  black:  'bg-neutral-900 border border-white/20',
  purple: 'bg-purple-700',
  brown:  'bg-amber-900',
  blue:   'bg-blue-600',
}

export function Instructors() {
  return (
    <Section id="instructors" labelledBy="instructors-heading">
      <SectionHeader
        id="instructors-heading"
        headline="Meet our team"
        sub="Three dedicated instructors with one shared mission: to make you feel welcome and help you grow."
        centered
        headlineClassName="!text-[clamp(2.8rem,8vw+0.5rem,7rem)] tracking-[-0.03em] md:whitespace-nowrap"
        headlineStyle={{ fontFamily: "'Noken', system-ui, sans-serif" }}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {instructors.map((instructor) => (
          <article
            key={instructor.id}
            className="relative overflow-hidden rounded-2xl aspect-[3/4]"
          >
            {/* Background */}
            {instructor.imageSrc ? (
              <img
                src={instructor.imageSrc}
                alt={instructor.imageAlt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[var(--color-bg-dark)]" />
            )}

            {/* Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black from-0% to-transparent to-[45%]" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end gap-4 p-7">

              {/* Pills */}
              <div className="flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest border border-white/30 text-white/85 bg-white/10 backdrop-blur-sm">
                  <span className={cn('h-2 w-5 rounded-full shrink-0', beltColorClass[instructor.beltColor])} />
                  {instructor.belt}
                </span>
                {instructor.credential && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest border border-white/30 text-white/85 bg-white/10 backdrop-blur-sm">
                    {instructor.credential}
                  </span>
                )}
              </div>

              {/* Name */}
              <h3
                className="font-bold text-white leading-[0.9]"
                style={{
                  fontSize: 'clamp(2.4rem, 2.5vw + 1rem, 2.6rem)',
                  letterSpacing: '-0.01em',
                  fontFamily: "'Noken', system-ui, sans-serif",
                }}
              >
                {instructor.name}
              </h3>

              {/* Title */}
              <p className="text-white/70 text-sm font-semibold uppercase tracking-widest">
                {instructor.title}
              </p>

            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
