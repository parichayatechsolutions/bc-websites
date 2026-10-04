// src/sections/nav/LocalNav.tsx
// A slim dark strip with the boutique's name in their own script (Telugu,
// Kannada, Tamil, Hindi…) above a clean bar of logo, pages and WhatsApp.
// The strip is how a regular customer knows the shop; the bar is for
// everyone. (Lab: nav S, "Local-name strip".)
//
// The strip shows only with `brand.localName`; without it this is a plain
// sticky bar. Takes its own space. No motion.

import { Link } from 'react-router-dom'
import { telLink, useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function LocalNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const { localName, name } = boutique.brand

  return (
    <>
      {localName && (
        <div className="bg-dark text-light">
          <div className="mx-auto flex min-h-10 max-w-[1200px] items-center justify-between gap-4 px-5 py-1.5 md:px-10">
            <span className="font-display text-accent-on-dark">
              {localName}
            </span>
            <a href={telLink(boutique.contact.phone)} className="t-small link-stitch hidden text-light/80 sm:inline">
              {boutique.contact.phone}
            </a>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
        <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
          <Link to={href('')} className="flex min-w-0 items-center gap-3">
            <Logo className="h-10 w-10 shrink-0" />
            <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{name}</span>
          </Link>
          <div className="flex items-center gap-8">
            <nav aria-label="Pages" className="hidden md:block">
              <PageLinks className="flex items-center gap-8" />
            </nav>
            <div className="flex items-center gap-2">
              <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
              <MobileMenu buttonClassName="hover:bg-ink/5" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
