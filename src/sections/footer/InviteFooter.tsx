// src/sections/footer/InviteFooter.tsx
// The page ends on one invitation: a block of brand colour saying "Planning
// something? Let's talk." with the WhatsApp button, then a compact row of
// the logo, the pages and every way to reach them, and the credit line.
// (Lab: footer E, "Big invitation".)
//
// On the light page colour, so it suits pages that already end on a dark
// section. No motion.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'

export default function InviteFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()

  return (
    <footer className="bg-light pt-16 pb-10 text-ink md:pt-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8 bg-primary p-8 text-on-primary md:p-14">
          <p className="t-1 max-w-[14ch] text-balance">Planning something? Let’s talk.</p>
          <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
            Chat on WhatsApp
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-8">
          <Link to={href('')} className="flex min-w-0 items-center gap-3">
            <Logo className="h-10 w-10 shrink-0" />
            <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink">{boutique.brand.name}</span>
          </Link>
          {pages.length > 1 && (
            <nav aria-label="Pages">
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {pages.map((p) => (
                  <li key={p.path}>
                    <Link to={href(p.path)} className="link-stitch is-quiet">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <SocialLinks on="light" />
        </div>

        <Credit className="mt-12 justify-between border-t border-ink/10 pt-6" />
      </div>
    </footer>
  )
}
