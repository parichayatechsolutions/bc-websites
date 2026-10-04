// src/sections/nav/OpenNav.tsx
// A slim brand-colour strip above a solid bar, saying whether the shop is
// open right now (and until when, or when it opens next) beside the Google
// rating, so the first thing she reads is whether to come today.
// (Lab: nav G, "Open-now bar".)
//
// Open now only from the main branch's day-by-day hours (app/hours), in the
// shop's own time; without them the strip carries just the rating, and with
// neither there's no strip. Takes its own space. No motion.

import { Link } from 'react-router-dom'
import { IconStarFilled } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { useOpenState } from '../../app/hours'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function OpenNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const state = useOpenState(boutique.branches[0])
  const rating = boutique.social.googleRating

  return (
    <header className="sticky top-0 z-50 text-ink">
      {(state || rating) && (
        <div className="bg-primary text-on-primary">
          <div className="t-small mx-auto flex min-h-9 max-w-[1200px] flex-wrap items-center justify-between gap-x-6 px-5 py-1.5 md:px-10">
            {state && (
              <p className="flex items-center gap-2">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${state.open ? 'bg-on-primary' : 'border border-on-primary'}`} />
                {state.label}
              </p>
            )}
            {rating && (
              <p className="flex items-center gap-1.5 opacity-90">
                <IconStarFilled size={14} aria-hidden="true" />
                {rating.toFixed(1)} on Google
              </p>
            )}
          </div>
        </div>
      )}
      <div className="border-b border-ink/10 bg-light/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
          <Link to={href('')} className="flex min-w-0 items-center gap-3">
            <Logo className="h-10 w-10 shrink-0" />
            <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
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
      </div>
    </header>
  )
}
