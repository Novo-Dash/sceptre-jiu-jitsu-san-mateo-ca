interface KidsButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  ariaLabel?: string
  style?: React.CSSProperties
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function KidsButton({ children, onClick, className = '', ariaLabel, style }: KidsButtonProps) {
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} style={style} className={`bts-btn ${className}`}>
      <span>{children}</span>
      <ArrowRight />
    </button>
  )
}
