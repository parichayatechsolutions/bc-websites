// src/sections/nav/CenteredNav.tsx
// The fashion-house arrangement: a thin strip with the phone number and city
// on top, then the logo and name centred with page links split either side.
// Feels established and formal; suits boutiques with a strong logo.
// Phone: menu on the left, logo in the middle, WhatsApp on the right.

import { Link, NavLink } from 'react-router-dom'
import { IconMapPin, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, WhatsAppPill } from './navShared'

export default function CenteredNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const city = boutique.branches[0]?.city
  const half = Math.ceil(pages.length / 2)

  const link = (path: string, label: string) => (
    <li key={path}>
      <NavLink to={href(path)} end className={({ isActive }) => `link-stitch ${isActive ? 'is-current' : 'is-quiet'}`}>
        {label}
      </NavLink>
    </li>
  )

  return (
    <header className="sticky top-0 z-50 bg-light/95 text-ink backdrop-blur">
      {/* Top strip */}
      <div className="bg-primary-ink text-on-primary-ink">
        <div className="t-small mx-auto flex max-w-[1200px] items-center justify-center gap-6 px-5 py-2 md:justify-between md:px-10">
          {city && (
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <IconMapPin size={16} stroke={1.5} aria-hidden="true" />
              {boutique.branches.length > 1 ? `${boutique.branches.length} branches in ${city}` : city}
            </span>
          )}
          <a href={telLink(boutique.contact.phone)} className="link-stitch is-quiet inline-flex items-center gap-1.5">
            <IconPhone size={16} stroke={1.5} aria-hidden="true" />
            {boutique.contact.phone}
          </a>
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/10 px-5 py-3 md:grid-cols-[1fr_auto_1fr] md:px-10 md:py-4">
        <div>
          <MobileMenu buttonClassName="hover:bg-ink/5" />
          {pages.length > 1 && (
            <nav aria-label="Pages" className="hidden md:block">
              <ul className="flex items-center gap-8">{pages.slice(0, half).map((p) => link(p.path, p.label))}</ul>
            </nav>
          )}
        </div>

        <Link to={href('')} className="group flex min-w-0 flex-col items-center gap-1.5 text-center">
          <Logo className="h-11 w-11 shrink-0 transition-transform duration-300 ease-stitch group-hover:rotate-[-6deg] md:h-12 md:w-12" />
          <span className="line-clamp-2 max-w-[22ch] font-display text-base leading-tight text-primary-ink md:text-lg">
            {boutique.brand.name}
          </span>
        </Link>

        <div className="flex items-center justify-end gap-8">
          {pages.length > 1 && (
            <nav aria-label="More pages" className="hidden md:block">
              <ul className="flex items-center gap-8">{pages.slice(half).map((p) => link(p.path, p.label))}</ul>
            </nav>
          )}
          <WhatsAppPill iconOnly className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
        </div>
      </div>
    </header>
  )
}
