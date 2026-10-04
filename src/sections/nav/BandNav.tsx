// src/sections/nav/BandNav.tsx
// A solid bar with a slim brand-colour band beneath it carrying their
// proof (the Google rating, usual delivery) and a "Book a fitting" link,
// so the reasons to book sit right under the name. (Lab: nav R, "CTA
// band".)
//
// The band's facts only from the config; on phones it keeps the rating
// and the link. Takes its own space. No motion.

import { Link } from 'react-router-dom'
import { IconArrowRight, IconCalendarCheck, IconStarFilled } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function BandNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const rating = boutique.social.googleRating
  const days = boutique.pricing?.deliveryDays

  return (
    <header className="sticky top-0 z-50 text-ink">
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
              <WhatsAppPill iconOnly className="border border-ink/25 hover:border-ink" />
              <MobileMenu buttonClassName="hover:bg-ink/5" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-on-primary">
        <div className="t-small mx-auto flex min-h-10 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
          <div className="flex items-center gap-6">
            {rating && (
              <span className="flex items-center gap-1.5">
                <IconStarFilled size={14} aria-hidden="true" />
                {rating.toFixed(1)} on Google
              </span>
            )}
            {days && (
              <span className="hidden items-center gap-1.5 sm:flex">
                <IconCalendarCheck size={16} stroke={1.75} aria-hidden="true" />
                Usually ready in {days} days
              </span>
            )}
          </div>
          <a
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to book a fitting.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 font-semibold"
          >
            <span className="link-stitch">Book a fitting</span>
            <IconArrowRight size={16} stroke={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
