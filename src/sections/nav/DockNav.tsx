// src/sections/nav/DockNav.tsx
// Two navigations in one, each where a hand expects it. On a computer, a
// floating pill bar at the top with the logo, the pages and "Book a
// fitting". On a phone, a slim name bar at the top and a dock at the
// bottom, in thumb reach: WhatsApp across most of it, then Call and the
// menu. (Lab: nav C, "Pill + thumb dock".)
//
// Floats over the page (pages leave room with `.page-top`); the pill is
// solid, so it reads over a dark hero too. The page keeps room at its end
// for the dock (index.css). Don't add a sticky WhatsApp control as well.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks } from './navShared'

export default function DockNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-6 rounded-full border border-ink/10 bg-light/90 px-3 text-ink backdrop-blur md:h-16 md:pl-4">
          <Link to={href('')} className="group flex min-w-0 items-center gap-3">
            <Logo className="h-9 w-9 shrink-0 transition-transform duration-300 ease-stitch group-hover:rotate-[-6deg] md:h-10 md:w-10" />
            <span className="line-clamp-1 font-display text-lg leading-tight text-primary-ink md:line-clamp-2">{boutique.brand.name}</span>
          </Link>
          <nav aria-label="Pages" className="hidden md:block">
            <PageLinks className="flex items-center gap-7" />
          </nav>
          <div className="hidden shrink-0 md:block">
            <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
              Book a fitting
            </Button>
          </div>
        </div>
      </header>

      <div
        data-thumb-dock
        className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-light px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-ink md:hidden"
      >
        <div className="flex items-center gap-2">
          <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp} className="flex-1 px-4">
            WhatsApp us
          </Button>
          <a
            href={telLink(boutique.contact.phone)}
            aria-label={`Call ${boutique.contact.phone}`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/25 transition-[background-color,scale] duration-200 ease-stitch hover:bg-ink/5 active:scale-[0.97]"
          >
            <IconPhone size={22} stroke={1.75} aria-hidden="true" />
          </a>
          <MobileMenu buttonClassName="h-12 w-12 border border-ink/25 hover:bg-ink/5" />
        </div>
      </div>
    </>
  )
}

DockNav.floating = true
