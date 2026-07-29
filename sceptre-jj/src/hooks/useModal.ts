import { useState, useCallback } from 'react'
import type { ProgramId } from '../types'

interface ModalState {
  isOpen: boolean
  defaultProgram: ProgramId | ''
}

export function useModal() {
  const [state, setState] = useState<ModalState>({ isOpen: false, defaultProgram: '' })

  const openModal = useCallback((program: ProgramId | '' = '') => {
    setState({ isOpen: true, defaultProgram: program })
    document.body.style.overflow = 'hidden'
    // Tracking (ViewContent / view_content) fires from BookingForm on open.
    // InitiateCheckout is intentionally NOT sent — there is no checkout (trial is free).
  }, [])

  const closeModal = useCallback(() => {
    setState({ isOpen: false, defaultProgram: '' })
    document.body.style.overflow = ''
  }, [])

  return { ...state, openModal, closeModal }
}
