import { Dialog } from '@base-ui-components/react/dialog'
import { BookingForm } from '../booking/BookingForm'
import { BookingLayout } from '../booking/BookingLayout'
import type { Program } from '../booking/schedule'

interface Props {
  isOpen: boolean
  onClose: () => void
}

/** Preselect the first kids program from the live list (already kids-filtered). */
function pickFirst(list: Program[]): Program | undefined {
  return list[0]
}

/**
 * Kids-themed booking modal for the Back to School page.
 * Renders the SAME shared <BookingForm /> (same webhooks + tracking) — only the
 * shell theme differs, and the live program list is filtered to the GHL kids
 * audience (get_programs, §5.1).
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
              <BookingForm audience="kids" defaultPick={pickFirst} onClose={onClose} />
            </BookingLayout>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
