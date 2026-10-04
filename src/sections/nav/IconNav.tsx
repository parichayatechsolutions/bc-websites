// src/sections/nav/IconNav.tsx
// Pages as small icons with their names under them, beside the logo and a
// WhatsApp button: compact and quick to scan. (Lab: nav K, "Icon nav".)
//
// Icons follow the page path (home, about, contact; anything else gets a
// plain page icon). A solid sticky bar that takes its own space; phones get
// the full-screen menu. No motion.

import { Link, NavLink } from 'react-router-dom'
import { IconFileText, IconHome, IconMapPin, IconUsers, type Icon } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, WhatsAppPill } from './navShared'

const ICONS: Record<string, Icon> = { '': IconHome, about: IconUsers, contact: IconMapPin }

export default function IconNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex items-center gap-6">
          {pages.length > 1 && (
            <nav aria-label="Pages" className="hidden md:block">
              <ul className="flex items-center gap-2">
                {pages.map((page) => {
                  const PageIcon = ICONS[page.path] ?? IconFileText
                  return (
                    <li key={page.path}>
                      <NavLink
                        to={href(page.path)}
                        end
                        className={({ isActive }) =>
                          `flex min-w-18 flex-col items-center gap-1 rounded-full px-4 py-2 transition-colors duration-200 ease-stitch hover:bg-ink/5 ${isActive ? 'text-primary-ink' : 'text-muted'}`
                        }
                      >
                        <PageIcon size={22} stroke={1.5} aria-hidden="true" />
                        <span className="t-small">{page.label}</span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
          <div className="flex items-center gap-2">
            <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
            <MobileMenu buttonClassName="hover:bg-ink/5" />
          </div>
        </div>
      </div>
    </header>
  )
}
