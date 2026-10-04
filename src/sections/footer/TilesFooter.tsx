// src/sections/footer/TilesFooter.tsx
// The page ends on four big tiles, one per way to reach them: WhatsApp,
// Instagram, Google and a call, each filling a quarter of the width. Then
// the name, the pages and the credit line. (Lab: footer S, "Social tiles".)
//
// Tiles without a link (no Instagram, no Google listing) drop away. Tiles
// are links: hover shifts their colour. No motion.

import { Link } from 'react-router-dom'
import type { Icon } from '@tabler/icons-react'
import { IconBrandGoogle, IconBrandInstagram, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'

export default function TilesFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { social, contact } = boutique

  const tiles = [
    { label: 'WhatsApp', icon: IconBrandWhatsapp, href: whatsappLink(boutique) },
    social.instagram && { label: 'Instagram', icon: IconBrandInstagram, href: social.instagram },
    social.googleBusiness && { label: 'Google', icon: IconBrandGoogle, href: social.googleBusiness },
    { label: 'Call', icon: IconPhone, href: telLink(contact.phone) },
  ].filter(Boolean) as { label: string; icon: Icon; href: string }[]

  return (
    <footer className="bg-dark text-light">
      <ul className={`grid grid-cols-2 ${tiles.length > 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
        {tiles.map(({ label, icon: TileIcon, href: link }) => (
          <li key={label}>
            <a
              href={link}
              {...(link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex aspect-square flex-col items-center justify-center gap-3 border border-light/10 transition-colors duration-200 ease-stitch hover:bg-light/10 md:aspect-[4/3]"
            >
              <TileIcon size={40} stroke={1.25} className="text-accent-on-dark" aria-hidden="true" />
              <span className="t-3">{label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="t-3">{boutique.brand.name}</p>
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
        </div>
        <Credit className="mt-10 justify-between border-t border-light/15 pt-6" />
      </div>
    </footer>
  )
}
