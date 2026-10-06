// src/sections/nav/LuxeNav.tsx
// Deep near-black bar with dual gold hairlines, haloed emblem and an
// Appointments button. (Lab: nav U, "Dark luxe".)
// Designed for ceremonial, heritage and evening-couture showcases.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, useNavScroll } from './navShared'

export default function LuxeNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const { hidden } = useNavScroll()

  const appointmentHref = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I would like to book a couture fitting appointment.`
  )

  return (
    <header
      className={`sticky top-0 z-50 bg-[color-mix(in_oklab,var(--c-dark)_85%,black)] text-light transition-transform duration-500 ease-stitch border-y border-accent-on-dark/45 shadow-[inset_0_2px_0_-1px_var(--c-accent-on-dark)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        {/* Logo and Name */}
        <Link to={href('')} className="group flex min-w-0 items-center gap-3">
          <div className="relative rounded-full ring-2 ring-accent-on-dark/80 ring-offset-2 ring-offset-dark transition-transform duration-300 ease-stitch group-hover:scale-105">
            <Logo className="h-10 w-10 shrink-0" />
          </div>
          <span className="line-clamp-2 font-display text-lg tracking-[0.02em] leading-tight md:text-xl text-light">
            {boutique.brand.name}
          </span>
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Pages" className="hidden md:block">
          <PageLinks
            className="flex items-center gap-8 text-[15px]"
            linkClassName="text-light/80 hover:text-accent-on-dark"
          />
        </nav>

        {/* Appointments CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href={appointmentHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-accent-on-dark px-5 py-2 text-xs md:text-sm font-semibold tracking-wide text-accent-on-dark transition-colors hover:bg-accent-on-dark hover:text-dark"
          >
            <IconBrandWhatsapp size={18} />
            <span>Appointments</span>
          </a>

          <MobileMenu buttonClassName="text-light hover:bg-light/10" />
        </div>
      </div>
    </header>
  )
}
