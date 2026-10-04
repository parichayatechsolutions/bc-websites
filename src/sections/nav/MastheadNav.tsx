// src/sections/nav/MastheadNav.tsx
// A newspaper masthead: a dateline of city and founding year, the name set
// large and centred, then the pages in a ruled row. The masthead scrolls
// away with the page; the ruled row stays at the top, so the pages and
// WhatsApp are always in reach. For the type-led designs. (Lab: nav L,
// "Masthead".)
//
// Takes its own space, so pages needn't be marked `overlay`. On a phone the
// row holds the menu and WhatsApp.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { fitDisplay } from '../../theme/theme'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function MastheadNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const city = boutique.branches[0]?.city

  return (
    <>
      <header className="bg-light text-ink">
        <div className="mx-auto max-w-[1200px] px-5 pt-4 pb-7 md:px-10">
          {(city || boutique.established) && (
            <div className="t-small flex justify-between gap-4 border-b border-ink/15 pb-3 text-muted">
              <span>{city}</span>
              {boutique.established && <span>Since {boutique.established}</span>}
            </div>
          )}
          <Link to={href('')} className="mt-6 flex flex-col items-center gap-4 text-center">
            <Logo className="h-12 w-12" />
            <span className="max-w-[20ch] font-display leading-[0.95] text-balance text-primary-ink" style={fitDisplay(boutique.brand.name, 6, 4.5, 2)}>
              {boutique.brand.name}
            </span>
          </Link>
        </div>
      </header>

      <div className="sticky top-0 z-50 border-y-[3px] border-double border-ink/40 bg-light/95 text-ink backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-5 md:justify-center md:gap-10 md:px-10">
          <MobileMenu buttonClassName="hover:bg-ink/5" />
          <nav aria-label="Pages" className="hidden md:block">
            <PageLinks className="flex items-center gap-8" />
          </nav>
          <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
        </div>
      </div>
    </>
  )
}
