'use client'

import Link from 'next/link'

type BaseProps = {
  variant?: 'outline' | 'fill' | 'text'
  children: React.ReactNode
}

type AsLink = BaseProps & {
  href: string
  onClick?: never
  type?: never
}

type AsButton = BaseProps & {
  href?: never
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

type Props = AsLink | AsButton

export default function Button({
  variant = 'outline',
  children,
  href,
  onClick,
  type = 'button',
}: Props) {
  const className = `btn btn-${variant}`

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}
