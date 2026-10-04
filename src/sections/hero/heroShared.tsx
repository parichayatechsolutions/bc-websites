// src/sections/hero/heroShared.tsx
// Pieces the page openers share.

import { Link } from 'react-router-dom'
import { IconMapPin } from '@tabler/icons-react'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'

/**
 * "Visit the store": the contact page when the design has one, else the
 * visit section on this page. `link` draws it as a text link in the current
 * colour, for brand-colour grounds where no outline variant is sure to read.
 */
export function VisitButton({ variant = 'outline-dark' }: { variant?: 'outline-dark' | 'outline-light' | 'link' }) {
  const { find, href } = useSite()
  if (variant === 'link') {
    const content = (
      <>
        <IconMapPin size={20} stroke={1.75} aria-hidden="true" />
        <span className="link-stitch">Visit the store</span>
      </>
    )
    const className = 'inline-flex min-h-12 items-center gap-2 font-semibold'
    return find('contact') ? (
      <Link to={href('contact')} className={className}>
        {content}
      </Link>
    ) : (
      <a href="#visit" className={className}>
        {content}
      </a>
    )
  }
  return find('contact') ? (
    <Button to={href('contact')} variant={variant} icon={IconMapPin}>
      Visit the store
    </Button>
  ) : (
    <Button href="#visit" variant={variant} icon={IconMapPin}>
      Visit the store
    </Button>
  )
}

/** "Since 2012 · Tirupati", with whichever halves the config has. */
export function sinceLine(established?: number, city?: string): string {
  return [established && `Since ${established}`, city].filter(Boolean).join(' · ')
}
