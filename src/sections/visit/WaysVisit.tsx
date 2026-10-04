// src/sections/visit/WaysVisit.tsx
// Getting there, as three things to do: walk in with directions, ask for the
// exact pin on WhatsApp, or call ahead. The map follows, for anyone who wants
// to see where it is first. (Lab: map F, "Three ways".)
//
// Each card is one link, so the whole card is the tap target. Hover shifts
// its border and nudges the arrow, as a button's colour and icon shift.
//
// No motion: three actions should be ready to tap, not arriving.

import type { Icon } from '@tabler/icons-react'
import { IconArrowRight, IconBrandWhatsapp, IconPhone, IconRoute } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { midSentence } from '../../app/text'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

interface IWay {
  icon: Icon
  title: string
  text: string
  action: string
  href: string
}

export default function WaysVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  const { name } = boutique.brand
  const ways: IWay[] = [
    {
      icon: IconRoute,
      title: 'Walk in',
      text: `We’re ${branch.landmark ? midSentence(branch.landmark) : `in ${branch.area || branch.city}`}. Google Maps will bring you to the door.`,
      action: 'Get directions',
      href: branch.mapsUrl,
    },
    {
      icon: IconBrandWhatsapp,
      title: 'Ask for the pin',
      text: 'Message us and we’ll send our exact location.',
      action: 'Ask on WhatsApp',
      href: whatsappLink(boutique, `Hi ${name}, could you send me the location of your ${branch.name}?`),
    },
    {
      icon: IconPhone,
      title: 'Call ahead',
      text: `So we’re ready for your fitting when you arrive. ${boutique.contact.phone}`,
      action: 'Call now',
      href: telLink(boutique.contact.phone),
    },
  ]

  return (
    <section id="visit" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Three ways to find us</h2>
        <BranchPicker branches={branches} index={index} onPick={setIndex} />

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {ways.map(({ icon: WayIcon, title, text, action, href }) => (
            <li key={title}>
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col border border-ink/15 p-6 transition-colors duration-200 ease-stitch hover:border-ink md:p-8"
              >
                <WayIcon size={28} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
                <h3 className="t-3 mt-6">{title}</h3>
                <p className="mt-2 mb-6 text-muted">{text}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold text-primary-ink">
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

        <div className="mt-4 aspect-square w-full overflow-hidden bg-paper md:aspect-[16/7]">
          <MapFrame branch={branch} />
        </div>
      </div>
    </section>
  )
}
