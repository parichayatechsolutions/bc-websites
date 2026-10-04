// src/sections/nav/BrandNav.tsx
// A bar of solid brand colour with a zari border along its foot: the logo
// and name, the pages as rounded chips, and WhatsApp. Loud and proud, for
// boutiques whose colour is their sign. (Lab: nav I, "Brand bar".)
//
// Text uses the on-brand colour role, so it reads on any brand colour.
// A sticky bar that takes its own space; phones get the full-screen menu.
// No motion.

import { Link, NavLink } from 'react-router-dom'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu } from './navShared'

export default function BrandNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()

  return (
    <header className="sticky top-0 z-50 bg-primary text-on-primary">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex items-center gap-3">
          {pages.length > 1 && (
            <nav aria-label="Pages" className="hidden md:block">
              <ul className="flex items-center gap-2">
                {pages.map((page) => (
                  <li key={page.path}>
                    <NavLink
                      to={href(page.path)}
                      end
                      className={({ isActive }) =>
                        `inline-flex min-h-10 items-center rounded-full px-4 transition-colors duration-200 ease-stitch ${isActive ? 'bg-on-primary text-primary' : 'hover:bg-on-primary/10'}`
                      }
                    >
                      {page.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <a
            href={whatsappLink(boutique)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid h-11 w-11 place-items-center rounded-full border border-current/40 transition-colors duration-200 ease-stitch hover:bg-on-primary/10"
          >
            <IconBrandWhatsapp size={22} stroke={1.75} aria-hidden="true" />
          </a>
          <MobileMenu buttonClassName="hover:bg-on-primary/10" />
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </header>
  )
}
