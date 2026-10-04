// src/sections/nav/CircleNav.tsx
// Logo, WhatsApp and a round menu button on every screen; the menu grows
// out of the button as a circle of brand colour until it fills the
// screen, with the pages set large. (Lab: nav Y, "Circle menu".)
//
// The circle grows with a CSS clip-path transition that reduced motion
// turns off (it simply appears). Takes its own space.

import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { IconBrandWhatsapp, IconMenu2, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { useMenuState, WhatsAppPill } from './navShared'

export default function CircleNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const [open, setOpen] = useMenuState()
  // Where the button sits, so the circle grows from it: 2.75rem in from the right, 2.25rem down.
  const origin = 'calc(100% - 2.75rem) 2.25rem'

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <WhatsAppPill className="border border-ink/25 hover:border-ink" />
          {pages.length > 1 && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-primary-ink text-on-primary-ink transition-[scale] duration-200 ease-stitch hover:scale-105"
            >
              <IconMenu2 size={22} stroke={1.75} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {pages.length > 1 &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            inert={!open}
            className={`fixed inset-0 z-[60] flex flex-col bg-primary px-6 pt-5 pb-10 text-on-primary transition-[clip-path,visibility] duration-700 ease-stitch md:px-14 ${open ? 'visible' : 'invisible'}`}
            style={{ clipPath: `circle(${open ? '150%' : '0%'} at ${origin})` }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="ml-auto grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-on-primary/15 md:mr-0"
            >
              <IconX size={24} stroke={1.75} aria-hidden="true" />
            </button>
            <nav className="my-auto py-10" aria-label="Pages">
              <ul className="space-y-3">
                {pages.map((page) => (
                  <li key={page.path}>
                    <NavLink to={href(page.path)} end className={({ isActive }) => `t-hero link-stitch ${isActive ? 'is-current' : 'is-quiet'}`}>
                      {page.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={whatsappLink(boutique)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-fit items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink"
            >
              <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>,
          document.querySelector('.boutique') ?? document.body,
        )}
    </header>
  )
}
