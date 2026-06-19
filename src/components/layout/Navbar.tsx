'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) {
      setSolid(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          height: 64,
          padding: '0 var(--gutter)',
          backgroundColor: solid ? 'var(--color-bg)' : 'transparent',
          borderBottom: solid
            ? '1px solid var(--color-border-light)'
            : '1px solid transparent',
        }}
      >
        <Link href="/" className="nav-logo">
          PALIMPS&#x3A3;EST
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="block w-6 h-px" style={{ backgroundColor: 'var(--color-text)' }} />
          <span className="block w-6 h-px" style={{ backgroundColor: 'var(--color-text)' }} />
          <span className="block w-6 h-px" style={{ backgroundColor: 'var(--color-text)' }} />
        </button>
      </header>

      {/* Mobile full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--gutter)' }}
        >
          <button
            className="self-end"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 28,
              lineHeight: 1,
              color: 'var(--color-text)',
            }}
          >
            ×
          </button>
          <nav className="flex flex-col mt-16" style={{ gap: 'var(--space-sm)' }}>
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="mobile-nav-link"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
