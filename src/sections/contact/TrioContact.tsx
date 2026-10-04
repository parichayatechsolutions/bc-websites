// src/sections/contact/TrioContact.tsx
// The simplest contact section there is: three big cards, WhatsApp, Call
// and Visit, each showing its number or place in large type. WhatsApp
// comes first and is filled, as the main way in. (Lab: contact D, "Reach
// us trio".)
//
// Each card is one link, so the whole card is the tap target; hover shifts
// its colour and nudges the arrow, as a button does. No motion.

import type { Icon } from '@tabler/icons-react'
import { IconArrowRight, IconBrandWhatsapp, IconMapPin, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'

interface ICard {
  icon: Icon
  label: string
  big: string
  action: string
  href: string
  filled?: boolean
}

export default function TrioContact() {
  const { boutique } = useBoutique()
  const { contact, branches } = boutique
  const branch = branches[0]

  const cards: ICard[] = [
    { icon: IconBrandWhatsapp, label: 'WhatsApp', big: contact.whatsapp, action: 'Chat on WhatsApp', href: whatsappLink(boutique), filled: true },
    { icon: IconPhone, label: 'Call', big: contact.phone, action: 'Call now', href: telLink(contact.phone) },
    ...(branch
      ? [{ icon: IconMapPin, label: 'Visit', big: branch.area || branch.city, action: 'Get directions', href: branch.mapsUrl }]
      : []),
  ]

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <h2 className="t-1">Reach us your way</h2>
        {branch?.hours && <p className="mt-4 text-muted">Open {branch.hours}</p>}

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map(({ icon: CardIcon, label, big, action, href, filled }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group flex h-full flex-col p-6 transition-colors duration-200 ease-stitch md:p-8 ${
                  filled
                    ? 'bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]'
                    : 'border border-ink/15 hover:border-ink'
                }`}
              >
                <span className="flex items-center gap-3">
                  <CardIcon size={24} stroke={1.5} aria-hidden="true" />
                  {label}
                </span>
                <span className="t-2 mt-8 mb-8 break-words">{big}</span>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold">
                  {action}
                  <IconArrowRight
                    size={18}
                    stroke={1.75}
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-stitch group-hover:translate-x-1"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
