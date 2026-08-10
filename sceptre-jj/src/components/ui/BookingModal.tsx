import { Dialog } from '@base-ui-components/react/dialog'
import type { ProgramId } from '@/types'
import { BookingForm } from '@/booking/BookingForm'
import { BookingLayout } from '@/booking/BookingLayout'
import type { Program } from '@/booking/schedule'

interface BookingModalProps {
  isOpen: boolean
  defaultProgram: ProgramId | ''
  onClose: () => void
}

/**
 * Map the site's coarse CTA context to a pick in the LIVE program list
 * (get_programs, §5.1). Preselection is a UI convenience only — audience for
 * tracking/webhooks always comes from the GHL program object itself.
 */
function pickerFor(p: ProgramId | ''): ((programs: Program[]) => Program | undefined) | undefined {
  switch (p) {
    case 'adults':
      return (list) => list.find((x) => x.audience === 'adults' && !/women/i.test(x.name))
    case 'womens':
      return (list) => list.find((x) => /women/i.test(x.name))
    case 'kids':
      return (list) => list.find((x) => x.audience === 'kids')
    default:
      return undefined
  }
}

export function BookingModal({ isOpen, defaultProgram, onClose }: BookingModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-[101] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-[940px]">
            <Dialog.Title className="sr-only">Book a free trial class</Dialog.Title>
            <Dialog.Description className="sr-only">
              Enter your details, then pick a date and time for your free trial class.
            </Dialog.Description>
            <BookingLayout onClose={onClose}>
              <BookingForm defaultPick={pickerFor(defaultProgram)} onClose={onClose} />
            </BookingLayout>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
