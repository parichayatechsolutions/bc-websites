// src/sections/nav/FloatingNav.tsx
// Floats over the page: transparent and light on a dark hero, solid once the
// visitor scrolls past it (or from the start on pages without one), and it
// steps out of the way while they scroll down.
// Desktop: logo · page links · WhatsApp. Phone: logo · WhatsApp · menu.
// Pairs with a page marked `overlay` that opens on a dark hero.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, useNavScroll, WhatsAppPill } from './navShared'

export default function FloatingNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const { solid, hidden } = useNavScroll()

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,color] duration-500 ease-stitch ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${solid ? 'bg-light/95 text-ink shadow-[0_1px_0_color-mix(in_oklab,var(--c-dark)_12%,transparent)] backdrop-blur' : 'text-light'}`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        <Link to={href('')} className="group flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0 transition-transform duration-300 ease-stitch group-hover:rotate-[-6deg]" />
          <span className="line-clamp-2 font-display text-lg leading-tight md:text-xl">{boutique.brand.name}</span>
        </Link>

        <nav aria-label="Pages" className="hidden md:block">
          <PageLinks className="flex items-center gap-8" />
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppPill
            className={
              solid
                ? 'bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]'
                : 'bg-light/15 text-light hover:bg-light/25'
            }
          />
          <MobileMenu buttonClassName={solid ? 'hover:bg-ink/5' : 'hover:bg-light/15'} />
        </div>
      </div>
    </header>
  )
}

// Sits over the page rather than in the flow: pages leave room at the top.
FloatingNav.floating = true
