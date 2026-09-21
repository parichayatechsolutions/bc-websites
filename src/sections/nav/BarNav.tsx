// src/sections/nav/BarNav.tsx
// A calm, solid bar that stays at the top: logo and name on the left, page
// links and WhatsApp on the right, a hairline underneath. The classic shop
// sign. Works with any page, with or without a hero, and takes up its own
// space rather than covering the page.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function BarNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
        <Link to={href('')} className="group flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0 transition-transform duration-300 ease-stitch group-hover:rotate-[-6deg]" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">
            {boutique.brand.name}
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <nav aria-label="Pages" className="hidden md:block">
            <PageLinks className="flex items-center gap-8" />
          </nav>
          <div className="flex items-center gap-2">
            <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
            <MobileMenu buttonClassName="hover:bg-ink/5" />
          </div>
        </div>
      </div>
    </header>
  )
}
