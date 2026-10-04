// src/sections/nav/OutlineNav.tsx
// Clear over a dark hero: the logo, the pages inside one outlined pill and
// WhatsApp as an outlined circle; solid once she scrolls past the hero,
// and out of the way while she scrolls down. (Lab: nav T, "Outline pill
// links".)
//
// Pairs with a page marked `overlay` that opens on a dark hero, like
// FloatingNav. The bar changes with a CSS transition.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, useNavScroll, WhatsAppPill } from './navShared'

export default function OutlineNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { solid, hidden } = useNavScroll()

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,color] duration-500 ease-stitch ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${solid ? 'bg-light/95 text-ink backdrop-blur' : 'text-light'}`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight md:text-xl">{boutique.brand.name}</span>
        </Link>
        {pages.length > 1 && (
          <nav aria-label="Pages" className={`hidden rounded-full border px-7 py-2.5 md:block ${solid ? 'border-ink/25' : 'border-light/45'}`}>
            <PageLinks className="flex items-center gap-7" />
          </nav>
        )}
        <div className="flex items-center gap-2">
          <WhatsAppPill iconOnly className={solid ? 'border border-ink/30 hover:border-ink' : 'border border-light/50 hover:bg-light/15'} />
          <MobileMenu buttonClassName={solid ? 'hover:bg-ink/5' : 'hover:bg-light/15'} />
        </div>
      </div>
    </header>
  )
}

// Sits over the page rather than in the flow: pages leave room at the top.
OutlineNav.floating = true
