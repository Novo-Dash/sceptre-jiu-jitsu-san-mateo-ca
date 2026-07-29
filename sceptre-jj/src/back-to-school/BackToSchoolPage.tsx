import { useCallback, useEffect, useRef } from 'react'
import '../back-to-school.css'
import { useModal } from '../hooks/useModal'
import { BtsBookingModal } from './BtsBookingModal'
import { useReveal } from './useReveal'
import { RIBBON_TEXT, ACADEMY, CONTACT } from './content'
import { TopNav } from './TopNav'
import { Hero } from './Hero'
import { WhyJiuJitsu } from './WhyJiuJitsu'
import { Students } from './Students'
import { HowToSchedule } from './HowToSchedule'
import { RightFit } from './RightFit'
import { Gallery } from './Gallery'
import { Faq } from './Faq'
import { SiteFooter } from './SiteFooter'

function PromoRibbon() {
  const line = RIBBON_TEXT.replace(/·/g, '✳').repeat(3)
  return (
    <div className="bts-xribbons" aria-hidden="true">
      <div className="bts-ribbon-row bts-ribbon-row--b">
        <div className="bts-ribbon-strip bts-marquee-track" data-rev="1">
          <span>{line}</span>
          <span>{line}</span>
        </div>
      </div>
      <div className="bts-ribbon-row bts-ribbon-row--a">
        <div className="bts-ribbon-strip bts-marquee-track">
          <span>{line}</span>
          <span>{line}</span>
        </div>
      </div>
    </div>
  )
}

export function BackToSchoolPage() {
  const scope = useRef<HTMLDivElement>(null)
  const { isOpen, openModal, closeModal } = useModal()
  useReveal(scope)

  const openBooking = useCallback(() => openModal(''), [openModal])

  useEffect(() => {
    const prevTitle = document.title
    const origin = window.location.origin
    const PAGE_URL = `${origin}/back-to-school`
    const DESC = `Back to School at ${ACADEMY} in San Mateo. Kids build confidence, focus, and friendships on the mats. First trial class is free — book today.`
    const IMG = `${origin}/images/classes/kids.webp`

    document.title = `Back to School — ${ACADEMY} Kids Jiu-Jitsu | San Mateo`

    const created: HTMLElement[] = []
    function setMeta(attr: 'name' | 'property', key: string, content: string) {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); created.push(el) }
      el.setAttribute('content', content)
    }
    function setLink(rel: string, href: string) {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); created.push(el) }
      el.setAttribute('href', href)
    }

    setMeta('name', 'description', DESC)
    setLink('canonical', PAGE_URL)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', PAGE_URL)
    setMeta('property', 'og:title', `Back to School — ${ACADEMY}`)
    setMeta('property', 'og:description', DESC)
    setMeta('property', 'og:image', IMG)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', `Back to School — ${ACADEMY}`)
    setMeta('name', 'twitter:description', DESC)
    setMeta('name', 'twitter:image', IMG)

    const ld = document.createElement('script')
    ld.type = 'application/ld+json'
    ld.id = 'bts-ld'
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `${ACADEMY} — Back to School Kids Jiu-Jitsu`,
      description: DESC,
      provider: {
        '@type': 'SportsActivityLocation',
        name: ACADEMY,
        telephone: CONTACT.phone,
        address: { '@type': 'PostalAddress', streetAddress: CONTACT.address1, addressLocality: 'San Mateo', addressRegion: 'CA', postalCode: '94401', addressCountry: 'US' },
      },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', category: 'Free trial class' },
      audience: { '@type': 'EducationalAudience', educationalRole: 'student' },
    })
    document.head.appendChild(ld)

    return () => {
      document.title = prevTitle
      created.forEach((el) => el.remove())
      document.getElementById('bts-ld')?.remove()
    }
  }, [])

  return (
    <div ref={scope} className="bts" style={{ background: 'var(--k-cream)' }}>
      <a href="#bts-hero" className="skip-link">Skip to content</a>
      <TopNav onOpen={openBooking} />
      <main>
        <Hero onOpen={openBooking} />
        <PromoRibbon />
        <WhyJiuJitsu onOpen={openBooking} />
        <Students onOpen={openBooking} />
        <HowToSchedule onOpen={openBooking} />
        <RightFit onOpen={openBooking} />
        <Gallery />
        <Faq onOpen={openBooking} />
      </main>
      <SiteFooter onOpen={openBooking} />
      <BtsBookingModal isOpen={isOpen} onClose={closeModal} />
    </div>
  )
}
