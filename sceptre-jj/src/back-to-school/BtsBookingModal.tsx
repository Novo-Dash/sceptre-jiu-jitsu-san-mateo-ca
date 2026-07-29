import { Dialog } from '@base-ui-components/react/dialog'
import { BookingForm } from '../booking/BookingForm'
import { BookingLayout } from '../booking/BookingLayout'
import type { Program } from '../booking/schedule'

// Back to School shows only the kids programs.
const KIDS_PROGRAMS: Program[] = ['kids_5_9', 'kids_9_12']

interface Props {
  isOpen: boolean
  onClose: () => void
}

/**
 * Kids-themed booking modal for the Back to School page.
 * Renders the SAME shared <BookingForm /> (same webhooks + tracking) — only the
 * shell theme and the visible program list differ.
 */
export function BtsBookingModal({ isOpen, onClose }: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-[101] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-[940px]">
            <Dialog.Title className="sr-only">Book a free kids trial class</Dialog.Title>
            <Dialog.Description className="sr-only">
              Enter your details, then pick a date and time for your child&apos;s free trial class.
            </Dialog.Description>
            <BookingLayout theme="kids" headline="Book your child&apos;s free class!" onClose={onClose}>
              <BookingForm defaultProgram="kids_5_9" programs={KIDS_PROGRAMS} onClose={onClose} />
            </BookingLayout>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
