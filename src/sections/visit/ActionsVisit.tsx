// src/sections/visit/ActionsVisit.tsx
// A wide map with three action cards overlapping its foot: directions,
// WhatsApp and a call, each a single tap. On a phone the cards stack under
// the map. (Lab: map X, "Map + actions".)
//
// The first branch. Cards are links: hover shifts their border, as a
// button's colour shifts. No motion.

import type { Icon } from '@tabler/icons-react'
import { IconArrowRight, IconBrandWhatsapp, IconDirections, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { MapFrame } from './mapShared'

export default function ActionsVisit() {
  const { boutique } = useBoutique()
  const branch = boutique.branches[0]
  if (!branch) return null

  const actions: { icon: Icon; title: string; text: string; href: string }[] = [
    { icon: IconDirections, title: 'Directions', text: branch.area || branch.city, href: branch.mapsUrl },
    { icon: IconBrandWhatsapp, title: 'WhatsApp', text: boutique.contact.whatsapp, href: whatsappLink(boutique) },
    { icon: IconPhone, title: 'Call', text: boutique.contact.phone, href: telLink(boutique.contact.phone) },
  ]

  return (
    <section id="visit" className="section">
      <div className="wrap">
        <h2 className="t-1">Find us</h2>
        {branch.hours && <p className="mt-3 text-muted">Open {branch.hours}</p>}
        <div className="mt-10 aspect-[4/3] w-full overflow-hidden bg-paper md:aspect-[21/9]">
          <MapFrame branch={branch} />
        </div>
        <ul className="relative grid gap-3 md:-mt-16 md:grid-cols-3 md:px-8">
          {actions.map(({ icon: ActionIcon, title, text, href }) => (
            <li key={title} className="mt-3 md:mt-0">
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 border border-ink/15 bg-light p-5 transition-colors duration-200 ease-stitch hover:border-ink"
              >
                <ActionIcon size={26} stroke={1.5} className="shrink-0 text-primary-ink" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="t-3 block">{title}</span>
                  <span className="t-small block truncate text-muted">{text}</span>
                </span>
                <IconArrowRight size={18} stroke={1.75} aria-hidden="true" className="shrink-0 text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
