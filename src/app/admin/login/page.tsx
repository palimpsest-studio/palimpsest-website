'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div style={{ width: '100%', maxWidth: 360 }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-label)',
            fontWeight: 'var(--weight-regular)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-text-subtle)',
            marginBottom: 32,
          }}
        >
          Sign in
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 20 }}>
          <div className="admin-field">
            <label htmlFor="email" className="admin-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="admin-input"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password" className="admin-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="admin-input"
            />
          </div>

          {error && (
            <p style={{ fontSize: 'var(--text-small)', color: '#C00' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-fill"
            style={{ marginTop: 8, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
