// src/sections/nav/PillsNav.tsx
// A solid bar whose pages sit in one segmented pill, like a switch: the
// page you're on filled with the brand colour, the others plain beside it.
// (Lab: nav J, "Tab switcher".)
//
// On phones the pill gives way to the full-screen menu. Takes its own
// space. No motion.

import { Link, NavLink } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, WhatsAppPill } from './navShared'

export default function PillsNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex items-center gap-4">
          {pages.length > 1 && (
            <nav aria-label="Pages" className="hidden md:block">
              <ul className="flex rounded-full bg-paper p-1">
                {pages.map((page) => (
                  <li key={page.path}>
                    <NavLink
                      to={href(page.path)}
                      end
                      className={({ isActive }) =>
                        `flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-[background-color,color] duration-200 ease-stitch ${
                          isActive ? 'bg-primary-ink text-on-primary-ink' : 'hover:bg-ink/5'
                        }`
                      }
                    >
                      {page.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="flex shrink-0 items-center gap-2">
            <WhatsAppPill iconOnly className="border border-primary-ink text-primary-ink hover:bg-primary-ink hover:text-on-primary-ink" />
            <MobileMenu buttonClassName="hover:bg-ink/5" />
          </div>
        </div>
      </div>
    </header>
  )
}
