import { faqItems } from '../../data/faq'
import { Accordion } from '@base-ui-components/react/accordion'
import type { FaqItem } from '../../types'

interface FAQProps {
  eyebrow?: string
  title?: React.ReactNode
  sub?: string
  items?: FaqItem[]
}

export function FAQ({
  eyebrow = 'Common Questions',
  title = <>Got<br />Questions?</>,
  sub = 'Everything you need to know before your first class at Sceptre.',
  items = faqItems,
}: FAQProps = {}) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">

          {/* Left — title */}
          <div className="flex flex-col gap-6 min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {eyebrow}
            </span>
            <h2
              id="faq-title"
              className="font-black text-[var(--color-text)] leading-[0.9] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.8rem, 4vw, 5rem)', fontFamily: "'Noken', system-ui, sans-serif" }}
            >
              {title}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-[1.7]">
              {sub}
            </p>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2 min-w-0">
            <Accordion.Root aria-label="Frequently asked questions">
              {items.map((item) => (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  className="group border-b border-[var(--color-border)]"
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className="w-full flex items-center gap-6 py-6 text-left cursor-pointer
                                 focus-visible:outline-2 focus-visible:outline-[var(--color-text)]
                                 focus-visible:outline-offset-[-2px]"
                    >
                      <span className="flex-1 font-semibold text-[var(--color-text)] text-base leading-snug">
                        {item.question}
                      </span>

                      <span
                        className="relative flex-shrink-0 w-7 h-7 rounded-full border border-[var(--color-border)]
                                   flex items-center justify-center
                                   group-data-[open]:bg-[var(--color-text)] group-data-[open]:border-[var(--color-text)]
                                   transition-all duration-200"
                        aria-hidden="true"
                      >
                        <span className="absolute w-3 h-px bg-[var(--color-text-muted)] group-data-[open]:bg-white transition-colors duration-200" />
                        <span className="absolute w-px h-3 bg-[var(--color-text-muted)] group-data-[open]:opacity-0 transition-all duration-200" />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Panel className="overflow-hidden">
                    <p className="pb-6 text-[var(--color-text-secondary)] leading-[1.75] text-sm max-w-2xl">
                      {item.answer}
                    </p>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>

        </div>
      </div>
    </section>
  )
}
