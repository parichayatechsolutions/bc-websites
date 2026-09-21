// src/components/Button.tsx
// Links styled as buttons: `href` for places outside the site (WhatsApp, a
// call, Google Maps, a #section), `to` for another page of the site, or
// `type="submit"` inside a form.
// Hover: colour shifts and the icon tips toward the label. Press: the button
// gives slightly under the finger, which also works on touch screens.

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Icon } from '@tabler/icons-react'

const VARIANTS = {
  accent: 'bg-accent text-on-accent hover:bg-[color-mix(in_oklab,var(--c-accent)_85%,white)]',
  primary: 'bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]',
  'outline-light': 'border border-light/40 text-light hover:border-light hover:bg-light/10',
  'outline-dark': 'border border-ink/30 text-ink hover:border-ink hover:bg-ink/5',
}

type IButtonProps = {
  variant?: keyof typeof VARIANTS
  icon?: Icon
  className?: string
  children: ReactNode
} & (
  | { href: string; to?: never; type?: never }
  | { to: string; href?: never; type?: never }
  | { type: 'submit'; href?: never; to?: never }
)

export default function Button({ variant = 'accent', icon: IconComponent, className = '', children, ...target }: IButtonProps) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-base font-semibold transition-[background-color,border-color,color,scale] duration-200 ease-stitch active:scale-[0.97] ${VARIANTS[variant]} ${className}`
  const content = (
    <>
      {IconComponent && (
        <IconComponent
          size={20}
          stroke={1.75}
          aria-hidden="true"
          className="transition-transform duration-300 ease-stitch group-hover:-rotate-8 group-hover:scale-110"
        />
      )}
      {children}
    </>
  )

  if (target.type === 'submit') {
    return (
      <button type="submit" className={`cursor-pointer ${classes}`}>
        {content}
      </button>
    )
  }
  if (target.to !== undefined) {
    return (
      <Link to={target.to} className={classes}>
        {content}
      </Link>
    )
  }
  const external = /^https?:/.test(target.href!)
  return (
    <a href={target.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={classes}>
      {content}
    </a>
  )
}
