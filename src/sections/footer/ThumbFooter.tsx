// src/sections/footer/ThumbFooter.tsx
// Dark: the name, pages and credit, ending in a bar of three big buttons
// within thumb's reach (Call, Directions, WhatsApp), so the last thing on
// the page is a way in. (Lab: footer Q, "Thumb bar".)
//
// Directions to the first branch. No motion.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp, IconDirections, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'

export default function ThumbFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const branch = boutique.branches[0]

  const actions = [
    { label: 'Call', href: telLink(boutique.contact.phone), icon: IconPhone, external: false },
    branch && { label: 'Directions', href: branch.mapsUrl, icon: IconDirections, external: true },
    { label: 'WhatsApp', href: whatsappLink(boutique), icon: IconBrandWhatsapp, external: true, main: true },
  ].filter(Boolean) as { label: string; href: string; icon: typeof IconPhone; external: boolean; main?: boolean }[]

  return (
    <footer className="bg-dark text-light">
      <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-8 md:px-10">
        <p className="t-2">{boutique.brand.name}</p>
        {pages.length > 1 && (
          <nav aria-label="Pages" className="mt-6">
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
        <Credit className="mt-10 justify-between" />
      </div>
      <ul className={`grid border-t border-light/15 pb-[env(safe-area-inset-bottom)] ${actions.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {actions.map(({ label, href: link, icon: ActionIcon, external, main }) => (
          <li key={label}>
            <a
              href={link}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 font-semibold transition-colors duration-200 ease-stitch ${
                main ? 'bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]' : 'border-r border-light/15 hover:bg-light/10'
              }`}
            >
              <ActionIcon size={22} stroke={1.75} aria-hidden="true" />
              <span className="t-small">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
