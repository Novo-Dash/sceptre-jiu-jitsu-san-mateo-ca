import { useCallback } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import {
  Hero,
  Programs,
  WhyUs,
  Instructors,
  Testimonials,
  FAQ,
  Location,
} from './components/sections'
import { BookingModal } from './components/ui'
import { useModal } from './hooks/useModal'
import { useScrollDepth } from './hooks/useScrollDepth'
import type { ProgramId } from './types'

export function App() {
  const { isOpen, defaultProgram, openModal, closeModal } = useModal()
  useScrollDepth()

  const handleBooking = useCallback(
    (program: ProgramId | '' = '') => openModal(program),
    [openModal]
  )

  return (
    <div className="grain">
      <Navbar onBooking={handleBooking} />

      <main id="main-content" tabIndex={-1}>
        <Hero onBooking={handleBooking} />
        <Programs onBooking={handleBooking} />
        <WhyUs onBooking={handleBooking} />
        <Instructors />
        <Testimonials />
        <FAQ />
        <Location />
      </main>

      <Footer onBooking={handleBooking} />

      <BookingModal
        isOpen={isOpen}
        defaultProgram={defaultProgram}
        onClose={closeModal}
      />
    </div>
  )
}
