export function Eyebrow({
  children,
  color = 'var(--k-yellow)',
  textColor = 'var(--k-ink)',
  rotate = -2,
  className = '',
}: {
  children: React.ReactNode
  color?: string
  textColor?: string
  rotate?: number
  className?: string
}) {
  return (
    <span
      className={`bts-display ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: color,
        color: textColor,
        borderRadius: 999,
        padding: '0.4rem 1.1rem',
        fontSize: 'clamp(0.8rem, 0.3vw + 0.72rem, 0.95rem)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        boxShadow: 'var(--k-soft-sm)',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {children}
    </span>
  )
}

export function CheckCoin({ color = 'var(--k-green)', size = 32 }: { color?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        background: color,
        boxShadow: '0 4px 10px rgba(27,26,34,0.20)',
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <path d="M4 13l5 5L20 6" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
