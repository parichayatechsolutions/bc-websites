// src/sections/nav/SplitNav.tsx
// Logo, WhatsApp and a Menu button on every screen; the menu slides in
// split in two: a photo of their work with their line on one half, the
// pages set large on the other. (Lab: nav X, "Split menu", without the
// numbers on the links, which aren't a sequence.)
//
// On phones the menu is the links half alone. The menu slides with a CSS
// transition that reduced motion turns off. Takes its own space.

import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Media from '../../components/Media'
import { useMenuState, WhatsAppPill } from './navShared'

export default function SplitNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const [open, setOpen] = useMenuState()
  const { hero } = boutique.media
  const line = boutique.highlight ?? boutique.brand.tagline

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
          {pages.length > 1 && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="h-11 cursor-pointer rounded-full border border-ink/25 px-5 text-sm font-semibold transition-colors duration-200 ease-stitch hover:border-ink"
            >
              Menu
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
            className={`fixed inset-0 z-[60] grid transition-[visibility] duration-500 md:grid-cols-2 ${open ? 'visible' : 'invisible'}`}
          >
            <div className={`relative hidden overflow-hidden bg-dark transition-transform duration-500 ease-stitch md:block ${open ? 'translate-x-0' : '-translate-x-full'}`}>
              <Media file={hero.poster ?? hero.src} alt="" />
              {line && (
                <p className="t-2 absolute inset-x-0 bottom-0 max-w-[22ch] bg-dark/80 p-8 text-light">{line}</p>
              )}
            </div>
            <div className={`flex flex-col bg-light px-6 pt-5 pb-10 text-ink transition-transform duration-500 ease-stitch md:px-14 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="ml-auto grid h-11 w-11 cursor-pointer place-items-center rounded-full hover:bg-ink/5"
              >
                <IconX size={24} stroke={1.75} aria-hidden="true" />
              </button>
              <nav className="my-auto py-10" aria-label="Pages">
                <ul className="space-y-3">
                  {pages.map((page) => (
                    <li key={page.path}>
                      <NavLink to={href(page.path)} end className={({ isActive }) => `t-1 link-stitch ${isActive ? 'is-current text-primary-ink' : 'is-quiet'}`}>
                        {page.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div>
                <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>,
          document.querySelector('.boutique') ?? document.body,
        )}
    </header>
  )
}
