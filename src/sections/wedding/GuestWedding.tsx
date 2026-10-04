// src/sections/wedding/GuestWedding.tsx
// Going as a guest: every relation in ruled editorial rows (sister of the
// bride, cousin, friend, colleague, neighbour) with what usually suits
// someone in that place at the wedding, each a link to ask.
// (Lab: wed V, "Going as a guest".)
//
// General guidance. Shows only for a boutique that does bridal or
// occasion wear. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useWedding } from './weddingShared'

const GUESTS = [
  { who: 'Sister of the bride', wear: 'A lehenga that sits with the bride’s colours, dressed up for every function.' },
  { who: 'Cousin', wear: 'A silk saree or a light lehenga; coordinate with the other cousins if you can.' },
  { who: 'Friend of the bride', wear: 'Something festive for the sangeet, and a saree for the wedding itself.' },
  { who: 'Colleague', wear: 'A silk or georgette saree with a smart blouse: dressed up, not bridal.' },
  { who: 'Neighbour or family friend', wear: 'A classic silk saree in a warm colour.' },
]

export default function GuestWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  if (!doesBridal) return null

  return (
    <section id="wedding-guests" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Going as a guest</h2>
          <p className="text-muted">What to wear</p>
        </div>
        <ul>
          {GUESTS.map((g) => (
            <li key={g.who} className="border-b border-ink/15">
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'm going to a wedding as a ${g.who.toLowerCase()}. Could you help with my outfit?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-2 py-6 md:grid-cols-12 md:items-center md:gap-10"
              >
                <span className="t-2 md:col-span-5">{g.who}</span>
                <span className="text-muted md:col-span-6">{g.wear}</span>
                <IconArrowRight size={20} stroke={1.75} aria-hidden="true" className="hidden text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1 md:col-span-1 md:block md:justify-self-end" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
