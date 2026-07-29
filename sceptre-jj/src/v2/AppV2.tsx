import { useCallback } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import {
  Hero,
  WhyUs,
  Instructors,
  Testimonials,
  FAQ,
  Location,
  StickyCTABar,
} from '../components/sections'
import { BookingModal } from '../components/ui'
import { useModal } from '../hooks/useModal'
import { useScrollDepth } from '../hooks/useScrollDepth'
import type { ProgramId } from '../types'
import { faqItemsV2 } from './data'
import { ProgramsV2 } from './ProgramsV2'
import { TrialV2 } from './TrialV2'
import { HowToScheduleV2 } from './HowToScheduleV2'
import { MoreAboutUsV2 } from './MoreAboutUsV2'
import { CtaButton } from './CtaButton'

/** CTA band shown after reused sections that don't include their own button. */
function CtaBand({ onBooking, dark = false }: { onBooking: () => void; dark?: boolean }) {
  return (
    <div className={dark ? 'bg-[var(--color-bg-dark)]' : 'bg-white'}>
      <div className="mx-auto flex max-w-[1280px] justify-center px-6 pb-20 md:px-10">
        <CtaButton onBooking={onBooking} />
      </div>
    </div>
  )
}

export function AppV2() {
  const { isOpen, defaultProgram, openModal, closeModal } = useModal()
  useScrollDepth()

  const handleBooking = useCallback(
    (program: ProgramId | '' = '') => openModal(program),
    [openModal]
  )
  const book = useCallback(() => handleBooking(''), [handleBooking])

  return (
    <div className="grain">
      <Navbar onBooking={book} phoneHref="tel:+16507537486" phoneLabel="(650) 753-7486" />

      <main id="main-content" tabIndex={-1}>
        <Hero
          onBooking={book}
          title={
            <span className="block !leading-[0.8]">A place where anyone can start Jiu-Jitsu the confident way.</span>
          }
          subtitle="Our beginner-friendly approach helps adults, women, and kids start Brazilian Jiu-Jitsu with confidence, especially when they've never trained before. Click below to book your free trial class."
          ctaLabel="Book a free trial class"
        />

        <WhyUs
          onBooking={handleBooking}
          eyebrow="Our Philosophy"
          headline={
            <>
              <span className="block md:hidden">A place where beginners</span>
              <span className="block md:hidden">become confident.</span>
              <span className="hidden md:block">A place where beginners become confident.</span>
            </>
          }
          sub="Sceptre believes a supportive community makes learning Jiu-Jitsu enjoyable for people of every age, fitness level, and background. Book a free trial class and experience our teaching approach firsthand:"
          ctaLabel="Click to book a free trial class"
        />

        <ProgramsV2 onBooking={handleBooking} />

        <TrialV2 onBooking={book} />

        <HowToScheduleV2 onBooking={book} />

        <Testimonials heading="What some of Sceptre students are saying:" />
        <CtaBand onBooking={book} />

        <Instructors
          heading="Meet the coaches who make Jiu-Jitsu the right choice in San Mateo."
          sub="Coach John, Sean, and Mira are passionate about helping beginners of every age succeed. Every class combines technical excellence with patient instruction, making sure every student feels supported from their very first lesson."
          headlineClassName="!text-[clamp(2.2rem,4.4vw,4.2rem)] tracking-[-0.03em]"
        />
        <CtaBand onBooking={book} />

        <MoreAboutUsV2 />

        <FAQ
          eyebrow="Common Questions"
          title="Common Questions"
          sub="Everything you need to know before your first free class at Sceptre."
          items={faqItemsV2}
        />
        <CtaBand onBooking={book} />

        <Location />
      </main>

      <Footer
        onBooking={book}
        blurb="Welcome to Sceptre Jiu-Jitsu, where beginners feel confident from day one. People of all ages and experience levels can learn, grow, and belong. Book your free trial class today and experience it for yourself."
        email="hello@sceptrejiujitsu.com"
        credit={
          <p>
            &copy; 2026 All rights reserved. &middot;{' '}
            <span className="text-white/40 font-semibold">By Novo Dash</span>
          </p>
        }
      />

      <StickyCTABar onBooking={book} />

      <BookingModal
        isOpen={isOpen}
        defaultProgram={defaultProgram}
        onClose={closeModal}
      />
    </div>
  )
}
