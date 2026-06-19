export default function ContactPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <section
        className="flex flex-col justify-center"
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: 'var(--space-lg) var(--gutter)',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-label)',
              fontWeight: 'var(--weight-regular)',
              letterSpacing: 'var(--tracking-wider)',
              textTransform: 'uppercase',
              color: 'var(--color-text-subtle)',
              marginBottom: 'var(--space-sm)',
            }}
          >
            Contact
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-h1)',
              fontWeight: 'var(--weight-light)',
              color: 'var(--color-text)',
              lineHeight: 1.2,
              marginBottom: 10,
            }}
          >
            Evgenia Gkratsi
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-label)',
              fontWeight: 'var(--weight-regular)',
              letterSpacing: 'var(--tracking-wider)',
              textTransform: 'uppercase',
              color: 'var(--color-text-subtle)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Architectural &amp; Interior Designer
          </p>

          <div className="flex flex-col" style={{ gap: 'var(--space-xs)' }}>
            <a
              href="mailto:info@p-sest.com"
              className="contact-link"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--weight-light)',
                color: 'var(--color-text)',
                textDecoration: 'none',
                display: 'block',
                paddingBottom: 'var(--space-xs)',
                borderBottom: '1px solid var(--color-border-light)',
                transition: 'color 200ms ease',
              }}
            >
              info@p-sest.com
            </a>
            <a
              href="https://instagram.com/thepalimpsest"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--weight-light)',
                color: 'var(--color-text)',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 200ms ease',
              }}
            >
              @thepalimpsest
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
