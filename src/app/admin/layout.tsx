import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface)' }}>
      <header
        className="flex items-center justify-between"
        style={{
          height: 56,
          padding: '0 40px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <Link
          href="/admin"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-label)',
            fontWeight: 'var(--weight-regular)',
            letterSpacing: 'var(--tracking-wide)',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            textDecoration: 'none',
          }}
        >
          Palimpsest — Admin
        </Link>

        {user && (
          <div className="flex items-center" style={{ gap: 24 }}>
            <Link href="/" className="admin-nav-link">
              View site
            </Link>
            <LogoutButton />
          </div>
        )}
      </header>

      <main style={{ padding: 40 }}>{children}</main>
    </div>
  )
}
