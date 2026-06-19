import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Palimpsest — Architectural & Interior Design',
  description:
    'The portfolio of Evgenia Gkratsi, Architectural & Interior Designer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
