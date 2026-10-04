// src/sections/nav/MenuNav.tsx
// As little as a navigation can be: the logo and name, a WhatsApp button
// and a "Menu" pill, on every screen size. The menu opens full screen with
// the pages large, and where to find them, their hours and WhatsApp beside.
// The navigation that survives a 40-character name, since nothing else
// competes with it for the bar. (Lab: nav E, "Menu button", without its
// numbers: pages aren't a sequence.)
//
// A solid sticky bar that takes its own space, so pages needn't be marked
// `overlay`. The menu closes on Escape or a page change (useMenuState).

import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { IconBrandWhatsapp, IconClock, IconMapPin, IconMenu2, IconPhone, IconX } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { useMenuState, WhatsAppPill } from './navShared'

export default function MenuNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const [open, setOpen] = useMenuState()
  const branch = boutique.branches[0]

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
        <Link to={href('')} className="group flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0 transition-transform duration-300 ease-stitch group-hover:rotate-[-6deg]" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <WhatsAppPill iconOnly className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/25 px-4 font-semibold transition-[background-color,scale] duration-200 ease-stitch hover:bg-ink/5 active:scale-[0.97]"
          >
            Menu
            <IconMenu2 size={20} stroke={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`fixed inset-0 z-[60] overflow-y-auto bg-dark text-light transition-[opacity,visibility] duration-300 ease-stitch ${
            open ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <div className="mx-auto flex min-h-full max-w-[1200px] flex-col px-5 pt-5 pb-10 md:px-10">
            <div className="flex h-13 items-center justify-between gap-4">
              <span className="line-clamp-1 font-display text-lg text-accent-on-dark">{boutique.brand.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-light/10 px-4 font-semibold transition-colors duration-200 ease-stitch hover:bg-light/20"
              >
                Close
                <IconX size={20} stroke={1.75} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-12 grid flex-1 gap-14 md:grid-cols-12 md:items-end">
              <nav aria-label="Pages" className="md:col-span-7">
                <ul className="space-y-3">
                  {pages.map((page) => (
                    <li key={page.path}>
                      <NavLink
                        to={href(page.path)}
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) => `t-1 link-stitch ${isActive ? 'is-current text-accent-on-dark' : 'is-quiet'}`}
                      >
                        {page.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-4 md:col-span-5">
                {branch && (
                  <p className="flex gap-3 text-light/80">
                    <IconMapPin size={22} stroke={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {branch.area ? `${branch.area}, ${branch.city}` : branch.city}
                  </p>
                )}
                {branch?.hours && (
                  <p className="flex gap-3 text-light/80">
                    <IconClock size={22} stroke={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {branch.hours}
                  </p>
                )}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row md:flex-col lg:flex-row">
                  <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                    Chat on WhatsApp
                  </Button>
                  <Button href={telLink(boutique.contact.phone)} variant="outline-light" icon={IconPhone}>
                    Call {boutique.contact.phone}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.querySelector('.boutique') ?? document.body,
      )}
    </header>
  )
}
