// src/sections/nav/CallNav.tsx
// A solid bar whose right end is one split pill: Call on one half, Book on
// WhatsApp on the other, so both ways to reach them are always in reach.
// (Lab: nav Q, "Call | Book bar".)
//
// On phones the halves shrink to their icons beside the menu button.
// Takes its own space. No motion.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks } from './navShared'

const HALF = 'flex h-11 items-center gap-2 px-3.5 text-sm font-semibold transition-colors duration-200 ease-stitch sm:px-5'

export default function CallNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex items-center gap-8">
          <nav aria-label="Pages" className="hidden lg:block">
            <PageLinks className="flex items-center gap-8" />
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-primary-ink">
              <a href={telLink(boutique.contact.phone)} aria-label={`Call ${boutique.contact.phone}`} className={`${HALF} text-primary-ink hover:bg-primary-ink/10`}>
                <IconPhone size={18} stroke={1.75} aria-hidden="true" />
                <span className="hidden sm:inline">Call</span>
              </a>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to book an appointment.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book on WhatsApp"
                className={`${HALF} bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]`}
              >
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="hidden sm:inline">Book</span>
              </a>
            </div>
            <MobileMenu buttonClassName="hover:bg-ink/5" />
          </div>
        </div>
      </div>
    </header>
  )
}
