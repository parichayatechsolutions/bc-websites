// src/sections/footer/CardsFooter.tsx
// The page ends on the brand colour with three cards (Visit, Chat,
// Follow), each a single tap to directions, WhatsApp or Instagram; then
// the name, the pages and the credit. (Lab: footer K, "Three cards".)
//
// Follow only with an Instagram; then two cards. No motion.

import { Link } from 'react-router-dom'
import { IconBrandInstagram, IconBrandWhatsapp, IconMapPin, type Icon } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import { useInstagram } from '../instagram/igShared'

export default function CardsFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const ig = useInstagram()
  const branch = boutique.branches[0]

  const cards = [
    branch && { title: 'Visit', line: `${branch.area || branch.city}`, href: branch.mapsUrl, icon: IconMapPin },
    { title: 'Chat', line: 'On WhatsApp', href: whatsappLink(boutique), icon: IconBrandWhatsapp },
    ig && { title: 'Follow', line: ig.handle, href: ig.href, icon: IconBrandInstagram },
  ].filter(Boolean) as { title: string; line: string; href: string; icon: Icon }[]

  return (
    <footer className="bg-primary pt-16 pb-10 text-on-primary">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <ul className={`grid gap-4 ${cards.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {cards.map(({ title, line, href: link, icon: CardIcon }) => (
            <li key={title}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-32 items-center gap-5 rounded-2xl bg-light p-6 text-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
              >
                <CardIcon size={32} stroke={1.5} className="shrink-0 text-primary-ink" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="t-3 block">{title}</span>
                  <span className="block truncate text-muted">{line}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
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
        <Credit className="mt-10 justify-between border-t border-on-primary/20 pt-6" />
      </div>
    </footer>
  )
}
