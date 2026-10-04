// src/sections/nav/ArchNav.tsx
// A slim bar with the logo and name hanging from its centre in an
// arch-shaped tab of the brand colour, the pages on one side and WhatsApp
// on the other. The arch family's navigation. (Lab: nav M, "Arch tab".)
//
// On phones the tab is smaller and the pages move into the menu. Takes
// its own space. No motion.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function ArchNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
        <nav aria-label="Pages" className="hidden md:block">
          <PageLinks className="flex items-center gap-7" />
        </nav>
        <Link
          to={href('')}
          className="absolute top-0 left-1/2 flex w-36 -translate-x-1/2 flex-col items-center rounded-b-full bg-primary px-3 pt-3 pb-6 text-center text-on-primary md:w-48 md:pt-4 md:pb-8"
        >
          <Logo className="h-10 w-10 rounded-full bg-light md:h-12 md:w-12" />
          <span className="mt-2 line-clamp-2 font-display text-sm leading-tight md:text-base">{boutique.brand.name}</span>
        </Link>
        <span className="md:hidden" />
        <div className="flex items-center gap-2">
          <WhatsAppPill iconOnly className="border border-ink/25 hover:border-ink" />
          <MobileMenu buttonClassName="hover:bg-ink/5" />
        </div>
      </div>
    </header>
  )
}
