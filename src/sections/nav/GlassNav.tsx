// src/sections/nav/GlassNav.tsx
// Frosted glass bar floating inset over the hero photo. (Lab: nav H, "Glass bar".)
// Sits inside a rounded glass capsule with backdrop blur and satin translucency.
// When scrolled, solidifies with readable contrast while retaining its frosted charm.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, useNavScroll, WhatsAppPill } from './navShared'

export default function GlassNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const { solid, hidden } = useNavScroll()

  return (
    <header
      className={`fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-500 ease-stitch sm:px-6 md:top-4 ${
        hidden ? '-translate-y-[150%]' : 'translate-y-0'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1160px] items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-colors duration-400 ease-stitch md:px-6 md:py-3 ${
          solid
            ? 'border-ink/15 bg-light/85 text-ink shadow-[0_8px_30px_rgb(0_0_0/0.08)] backdrop-blur-md'
            : 'border-light/30 bg-light/18 text-light shadow-[0_8px_32px_rgb(0_0_0/0.25)] backdrop-blur-md'
        }`}
      >
        <Link to={href('')} className="group flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0 transition-transform duration-300 ease-stitch group-hover:rotate-[-6deg]" />
          <span className="line-clamp-2 font-display text-base leading-tight md:text-lg">
            {boutique.brand.name}
          </span>
        </Link>

        <nav aria-label="Pages" className="hidden md:block">
          <PageLinks
            className="flex items-center gap-7 text-[15px]"
            linkClassName={solid ? 'is-quiet' : 'text-light/90 hover:text-light'}
          />
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppPill
            className={
              solid
                ? 'bg-primary-ink text-on-primary-ink hover:opacity-90'
                : 'bg-light text-dark shadow-sm hover:bg-light/90'
            }
          />
          <MobileMenu
            buttonClassName={
              solid
                ? 'text-ink hover:bg-ink/5'
                : 'text-light hover:bg-light/20'
            }
          />
        </div>
      </div>
    </header>
  )
}

// Sits over the page rather than pushing it down.
GlassNav.floating = true
