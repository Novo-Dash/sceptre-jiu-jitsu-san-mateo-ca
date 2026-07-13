import { Button } from '../components/ui'

interface CtaButtonProps {
  onBooking: () => void
  label?: string
  className?: string
}

/** Standard V2 call-to-action button — red, arrow icon, book a free trial class. */
export function CtaButton({ onBooking, label = 'Book a free trial class', className }: CtaButtonProps) {
  return (
    <Button variant="danger" size="lg" onClick={onBooking} className={className}>
      {label}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  )
}
