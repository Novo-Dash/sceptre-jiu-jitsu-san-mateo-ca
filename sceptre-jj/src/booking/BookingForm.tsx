import { useCallback, useEffect, useRef, useState } from 'react'
import type { Audience, Program } from './schedule'
import {
  fetchPrograms,
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
  identify,
  setEnhancedUserData,
} from './analytics'
import { isStep1Valid } from './Step1Details'
import { Step1Details } from './Step1Details'
import { Step2Schedule } from './Step2Schedule'
import { Success } from './Success'

type Step = 1 | 2 | 'success'

/** Live programs state — `loading` BEFORE the first paint (§8 item 15). */
export type ProgramsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; programs: Program[] }

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

function makeInitial(): BookingData {
  const pf = readPrefill()
  return { name: pf.name, email: pf.email, phone: pf.phone, program: null, childName: '', date: '', time: '' }
}

interface Props {
  /** modal passes this so "Done" also closes; on /book it's omitted (just resets). */
  onClose?: () => void
  /** restrict the visible programs by GHL audience (e.g. kids-only on Back to School). */
  audience?: Audience
  /** optionally preselect a program once the live list arrives (CTA context). */
  defaultPick?: (programs: Program[]) => Program | undefined
}

export function BookingForm({ onClose, audience, defaultPick }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<BookingData>(makeInitial)
  const [programs, setPrograms] = useState<ProgramsState>({ status: 'loading' })
  const leadSent = useRef(false)
  const defaultApplied = useRef(false)

  const update = useCallback((patch: Partial<BookingData>) => setData((d) => ({ ...d, ...patch })), [])

  // The single live fetch (get_programs, §5.1) starts when the form mounts
  // (modal open / /book load); fetchPrograms caches per session, so re-opening
  // the modal doesn't refetch.
  useEffect(() => {
    let cancelled = false
    fetchPrograms()
      .then((list) => {
        if (cancelled) return
        const visible = audience ? list.filter((p) => p.audience === audience) : list
        setPrograms({ status: 'ready', programs: visible })
        // Preselect from the CTA context once the live list is in (UI nicety only;
        // audience for tracking/webhooks always comes from the GHL program object).
        if (defaultPick && !defaultApplied.current) {
          defaultApplied.current = true
          setData((d) => {
            if (d.program) return d
            const pick = defaultPick(visible)
            return pick ? { ...d, program: pick } : d
          })
        }
      })
      .catch(() => {
        if (!cancelled) setPrograms({ status: 'error' })
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audience])

  // ViewContent — fires when the modal opens (BookingForm mounts) or /book mounts
  useEffect(() => {
    fbqTrack('ViewContent', { content_name: 'Trial Booking' })
    ga4Event('view_content', { content_name: 'Trial Booking' })
  }, [])

  const handleNext = useCallback(() => {
    if (!isStep1Valid(data) || !data.program) return
    const audienceValue = data.program.audience

    if (!leadSent.current) {
      leadSent.current = true
      // Advanced Matching (§7.6.4) before the Lead events
      identify({ name: data.name, email: data.email, phone: data.phone })
      // Enhanced Conversions user_data before the Lead conversion
      setEnhancedUserData(data.email.trim(), toE164(data.phone))
      sendLeadWebhook(data)
      fbqTrack('Lead', { content_category: audienceValue })
      ga4Event('generate_lead', { audience: audienceValue })
      gtagConversion(GADS_LEAD)
    }

    // Slots arrived with the program in the single get_programs call — no second fetch.
    setStep(2)
  }, [data])

  const handleConfirm = useCallback(() => {
    if (!data.program || !data.date || !data.time) return
    const audienceValue = data.program.audience
    fbqTrack('Schedule', { content_category: audienceValue }) // no value — trial is free
    ga4Event('trial_booked', { audience: audienceValue })
    gtagConversion(GADS_BOOKING)
    sendBookingWebhook(data)
    setStep('success')
  }, [data])

  const handleDone = useCallback(() => {
    setData(makeInitial())
    setStep(1)
    leadSent.current = false
    defaultApplied.current = false
    onClose?.()
  }, [onClose])

  if (step === 'success') return <Success data={data} onDone={handleDone} />
  if (step === 2) {
    return (
      <Step2Schedule
        data={data}
        update={update}
        onConfirm={handleConfirm}
        onBack={() => setStep(1)}
      />
    )
  }
  return <Step1Details data={data} update={update} onNext={handleNext} programs={programs} />
}
