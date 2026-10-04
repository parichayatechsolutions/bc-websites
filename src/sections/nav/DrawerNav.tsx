// src/sections/nav/DrawerNav.tsx
// A plain bar whose menu button opens a drawer from the left, on every
// screen: a photo of the shop at the top, the pages, where and when to find
// them, and WhatsApp. (Lab: nav N, "Drawer".)
//
// The drawer closes on Escape, a page change, a tap on the shade, or the
// close button (useMenuState). It slides with a CSS transition; with
// reduced motion it simply appears. Takes its own space.

import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { IconBrandWhatsapp, IconClock, IconMapPin, IconMenu2, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Media from '../../components/Media'
import { useMenuState, WhatsAppPill } from './navShared'

export default function DrawerNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const [open, setOpen] = useMenuState()
  const branch = boutique.branches[0]
  const photo = boutique.media.storefront ?? boutique.media.interior?.[0] ?? boutique.media.work[0]

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full transition-colors duration-200 ease-stitch hover:bg-ink/5"
          >
            <IconMenu2 size={24} stroke={1.75} aria-hidden="true" />
          </button>
          <Link to={href('')} className="flex min-w-0 items-center gap-3">
            <Logo className="h-9 w-9 shrink-0" />
            <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink">{boutique.brand.name}</span>
          </Link>
        </div>
        <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
      </div>

      {createPortal(
        <div className={`fixed inset-0 z-[60] transition-[visibility] duration-300 ${open ? 'visible' : 'invisible'}`}>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className={`absolute inset-0 cursor-pointer bg-dark/50 transition-opacity duration-300 ease-stitch ${open ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={`absolute inset-y-0 left-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-light text-ink transition-transform duration-300 ease-stitch ${
              open ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="relative h-44 shrink-0 bg-paper">
              {photo && <Media file={photo} alt="" />}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute top-3 right-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-light text-ink"
              >
                <IconX size={22} stroke={1.75} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Pages" className="px-6 pt-8">
              <ul className="space-y-2">
                {pages.map((page) => (
                  <li key={page.path}>
                    <NavLink
                      to={href(page.path)}
                      end
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => `t-2 link-stitch ${isActive ? 'is-current text-primary-ink' : 'is-quiet'}`}
                    >
                      {page.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-3 px-6 pt-10 pb-8">
              {branch && (
                <p className="flex gap-3 text-muted">
                  <IconMapPin size={20} stroke={1.5} className="mt-1 shrink-0" aria-hidden="true" />
                  {branch.area ? `${branch.area}, ${branch.city}` : branch.city}
                </p>
              )}
              {branch?.hours && (
                <p className="flex gap-3 text-muted">
                  <IconClock size={20} stroke={1.5} className="mt-1 shrink-0" aria-hidden="true" />
                  {branch.hours}
                </p>
              )}
              <div className="pt-3">
                <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.querySelector('.boutique') ?? document.body,
      )}
    </header>
  )
}
