// src/sections/footer/MapFooter.tsx
// Dark: the first branch's map as a tile with their logo pinned to its
// corner, and every contact detail beside it (address, hours, phone,
// email, WhatsApp), then the pages and the credit.
// (Lab: footer F, "Map + info".)
//
// Rows without data drop away. No motion.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp, IconClock, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import { MapFrame } from '../visit/mapShared'

export default function MapFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const branch = boutique.branches[0]
  const { contact } = boutique

  const rows = [
    branch && { icon: IconMapPin, content: `${branch.address}, ${branch.city} ${branch.pincode}` },
    branch?.hours && { icon: IconClock, content: branch.hours },
    { icon: IconPhone, content: contact.phone, href: telLink(contact.phone) },
    contact.email && { icon: IconMail, content: contact.email, href: `mailto:${contact.email}` },
    { icon: IconBrandWhatsapp, content: 'Chat on WhatsApp', href: whatsappLink(boutique), external: true },
  ].filter(Boolean) as { icon: typeof IconMapPin; content: string; href?: string; external?: boolean }[]

  return (
    <footer className="bg-dark pt-16 pb-10 text-light">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          {branch && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-light/5 md:col-span-6">
              <MapFrame branch={branch} />
              <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-light p-1.5">
                <Logo className="h-10 w-10" />
              </span>
            </div>
          )}
          <div className={branch ? 'md:col-span-6' : 'md:col-span-12'}>
            <p className="t-2">{boutique.brand.name}</p>
            <ul className="mt-6 space-y-4">
              {rows.map(({ icon: Icon, content, href: link, external }) => (
                <li key={content} className="flex gap-3">
                  <Icon size={20} stroke={1.5} className="mt-0.5 shrink-0 text-accent-on-dark" aria-hidden="true" />
                  {link ? (
                    <a href={link} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="link-stitch break-words">
                      {content}
                    </a>
                  ) : (
                    <span>{content}</span>
                  )}
                </li>
              ))}
            </ul>
            {pages.length > 1 && (
              <nav aria-label="Pages" className="mt-10">
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
        </div>
        <Credit className="mt-14 justify-between border-t border-light/15 pt-6" />
      </div>
    </footer>
  )
}
