import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between"
      style={{
        borderTop: '1px solid var(--color-border-light)',
        padding: 'var(--space-md) var(--gutter)',
        gap: 'var(--space-xs)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-small)',
          fontWeight: 'var(--weight-regular)',
          letterSpacing: 'var(--tracking-wide)',
          textTransform: 'uppercase',
          color: 'var(--color-text-subtle)',
        }}
      >
        © Evgenia Gkratsi
      </span>

      <div className="flex items-center" style={{ gap: 'var(--space-sm)' }}>
        <Link href="mailto:info@p-sest.com" className="footer-link">
          info@p-sest.com
        </Link>
        <Link
          href="https://instagram.com/thepalimpsest"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Instagram
        </Link>
      </div>
    </footer>
  )
}
