import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '../ui'

interface HeroProps {
  onBooking: () => void
}

export function Hero({ onBooking }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll('[data-hero-animate]')
    gsap.set(elements, { autoAlpha: 0, y: 32 })

    const ctx = gsap.context(() => {
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, sectionRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative h-screen flex items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          src="/videos/herobackground.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/70" />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-10 pt-20 text-center flex flex-col items-center">

        <h1
          id="hero-title"
          data-hero-animate
          className="font-black text-white leading-[0.85] mb-4 max-md:tracking-[-0.01em] md:[letter-spacing:-1.5px]"
          style={{ fontSize: 'clamp(2.2rem, 6.8vw, 7rem)', fontFamily: "'Noken', system-ui, sans-serif" }}
        >
          <span className="block whitespace-nowrap">Train Jiu-Jitsu</span>
          <span className="block md:hidden">In an Inclusive</span>
          <span className="block md:hidden">Community.</span>
          <span className="hidden md:block whitespace-nowrap">In an Inclusive Community.</span>
        </h1>

        <p
          data-hero-animate
          className="text-base md:text-lg text-white leading-[1.6] mt-8 mb-8 max-w-2xl mx-auto"
        >
          Sceptre is a different kind of academy — here, you start Jiu-Jitsu feeling comfortable,
          regardless of your age or fitness level. Our community's number one value is inclusion for all.
        </p>

        <div data-hero-animate className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="danger"
            size="lg"
            onClick={onBooking}
            aria-label="Book your free trial class"
          >
            Book Your Free Trial
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <a
            href="#programs"
            onClick={(e) => { e.preventDefault(); document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 min-h-[52px] px-4 text-sm font-semibold text-white/50 hover:text-white transition-colors duration-150"
          >
            See Programs
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-25 animate-bounce">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
