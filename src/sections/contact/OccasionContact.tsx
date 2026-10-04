// src/sections/contact/OccasionContact.tsx
// What's the occasion? A tile for each (wedding, reception, festival,
// party, office, every day); tapping one opens WhatsApp with the message
// already written for it. (Lab: contact L, "Occasion picker".)
//
// Always shown. No motion.

import { IconBriefcase, IconCake, IconConfetti, IconHeart, IconSparkles, IconSun } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const OCCASIONS = [
  { name: 'A wedding', icon: IconHeart },
  { name: 'A reception', icon: IconConfetti },
  { name: 'A festival', icon: IconSparkles },
  { name: 'A party', icon: IconCake },
  { name: 'The office', icon: IconBriefcase },
  { name: 'Every day', icon: IconSun },
]

export default function OccasionContact() {
  const { boutique } = useBoutique()

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">What’s the occasion?</h2>
        <p className="mt-4 text-muted">Tap one and WhatsApp opens with the message written.</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {OCCASIONS.map(({ name, icon: Icon }) => (
            <li key={name}>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need an outfit stitched for ${name.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-28 flex-col justify-between gap-4 rounded-2xl border border-ink/15 p-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-primary-ink hover:bg-primary-ink hover:text-on-primary-ink md:min-h-36 md:p-7"
              >
                <Icon size={30} stroke={1.5} className="text-primary-ink transition-colors duration-200 ease-stitch group-hover:text-on-primary-ink" aria-hidden="true" />
                <span className="t-3">For {name.toLowerCase()}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
