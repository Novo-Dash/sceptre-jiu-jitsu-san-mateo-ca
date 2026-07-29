import { useCallback, useEffect, useRef, useState } from 'react'
import { PROGRAM_AUDIENCE, type Program, type SlotMap } from './schedule'
import {
  fetchSlots,
  sendBookingWebhook,
  sendLeadWebhook,
  toE164,
  type BookingData,
} from './webhook'
import {
  GADS_BOOKING,
  GADS_LEAD,
  fbqTrack,
  ga4Event,
  gtagConversion,
  setEnhancedUserData,
} from './analytics'
import { isStep1Valid } from './Step1Details'
import { Step1Details } from './Step1Details'
import { Step2Schedule } from './Step2Schedule'
import { Success } from './Success'

type Step = 1 | 2 | 'success'

/** Read GHL merge-field prefill from the URL once (ignore unresolved {{tags}}). */
function readPrefill(): Pick<BookingData, 'name' | 'email' | 'phone'> {
  const out = { name: '', email: '', phone: '' }
  try {
    const q = new URLSearchParams(window.location.search)
    const clean = (v: string | null) => (v && !v.includes('{{') && !v.includes('}}') ? v.trim() : '')
    out.name = clean(q.get('full_name'))
    out.email = clean(q.get('email'))
    let phone = clean(q.get('phone'))
    if (phone) {
      const d = phone.replace(/\D/g, '')
      const ten = d.length === 11 && d.startsWith('1') ? d.slice(1) : d
      phone = ten.length === 10 ? `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}` : phone
    }
    out.phone = phone
  } catch {
    /* ignore */
  }
  return out
}

function makeInitial(defaultProgram: Program | ''): BookingData {
  const pf = readPrefill()
  return { name: pf.name, email: pf.email, phone: pf.phone, program: defaultProgram, childName: '', date: '', time: '' }
}

interface Props {
  defaultProgram?: Program | ''
  /** modal passes this so "Done" also closes; on /book it's omitted (just resets). */
  onClose?: () => void
  /** restrict which programs appear (e.g. kids-only on the Back to School page). */
  programs?: Program[]
}

export function BookingForm({ defaultProgram = '', onClose, programs }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<BookingData>(() => makeInitial(defaultProgram))
  const [slots, setSlots] = useState<SlotMap>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const leadSent = useRef(false)

  const update = useCallback((patch: Partial<BookingData>) => setData((d) => ({ ...d, ...patch })), [])

  // ViewContent — fires when the modal opens (BookingForm mounts) or /book mounts
  useEffect(() => {
    fbqTrack('ViewContent', { content_name: 'Trial Booking' })
    ga4Event('view_content', { content_name: 'Trial Booking' })
  }, [])

  const handleNext = useCallback(() => {
    if (!isStep1Valid(data) || !data.program) return
    const audience = PROGRAM_AUDIENCE[data.program]

    if (!leadSent.current) {
      leadSent.current = true
      // Enhanced Conversions user_data before the Lead conversion
      setEnhancedUserData(data.email.trim(), toE164(data.phone))
      sendLeadWebhook(data)
      fbqTrack('Lead', { content_category: audience })
      ga4Event('generate_lead', { audience })
      gtagConversion(GADS_LEAD)
    }

    // enter step 2 + start loading BEFORE render (avoid flashing the wrong agenda)
    setError(false)
    setLoading(true)
    setStep(2)
    fetchSlots(data.program)
      .then((map) => { setSlots(map); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [data])

  const handleConfirm = useCallback(() => {
    if (!data.program || !data.date || !data.time) return
    const audience = PROGRAM_AUDIENCE[data.program]
    fbqTrack('Schedule', { content_category: audience }) // no value — trial is free
    ga4Event('trial_booked', { audience })
    gtagConversion(GADS_BOOKING)
    sendBookingWebhook(data)
    setStep('success')
  }, [data])

  const handleDone = useCallback(() => {
    setData(makeInitial(defaultProgram))
    setSlots({})
    setError(false)
    setLoading(false)
    setStep(1)
    leadSent.current = false
    onClose?.()
  }, [defaultProgram, onClose])

  if (step === 'success') return <Success data={data} onDone={handleDone} />
  if (step === 2) {
    return (
      <Step2Schedule
        data={data}
        update={update}
        slots={slots}
        loading={loading}
        error={error}
        onConfirm={handleConfirm}
        onBack={() => setStep(1)}
      />
    )
  }
  return <Step1Details data={data} update={update} onNext={handleNext} programs={programs} />
}
