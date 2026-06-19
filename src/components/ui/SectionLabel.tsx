type Props = {
  children: React.ReactNode
  withLine?: boolean
}

export default function SectionLabel({ children, withLine = false }: Props) {
  return (
    <div className="flex items-center" style={{ gap: 'var(--space-xs)' }}>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-label)',
          fontWeight: 'var(--weight-regular)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: 'var(--color-text-subtle)',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
      {withLine && (
        <span
          className="flex-1"
          style={{ height: 1, backgroundColor: 'var(--color-border)' }}
        />
      )}
    </div>
  )
}
