// src/sections/kids/SizesKids.tsx
// A general guide to children's sizes: the usual height, chest and length
// for each age, so a parent can check before sending measurements.
// (Lab: kids Q, "Size by age".)
//
// Common starting points, labelled as such; every child differs. Needs a
// Kids group in their services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

// Age, height (cm), chest (in), garment length for a langa or frock (in).
const SIZES = [
  ['1 to 2 years', 80, 19, 16],
  ['2 to 3 years', 92, 20, 18],
  ['3 to 4 years', 100, 21, 20],
  ['5 to 6 years', 115, 23, 24],
  ['7 to 8 years', 127, 25, 28],
  ['9 to 10 years', 138, 27, 32],
  ['11 to 12 years', 149, 29, 36],
  ['13 to 14 years', 158, 31, 39],
] as const

export default function SizesKids() {
  const { boutique } = useBoutique()
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  if (!hasKids) return null

  return (
    <section id="kids-sizes" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Children’s sizes</h2>
        <p className="mt-4 max-w-[52ch] text-muted">Usual sizes for each age, as a starting point. Every child is different, so measure if you can.</p>
        <table className="t-small mt-10 w-full border-collapse text-left tabular-nums md:text-base">
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="py-3 pr-3 font-semibold">Age</th>
              <th scope="col" className="py-3 pr-3 font-semibold">Height, cm</th>
              <th scope="col" className="py-3 pr-3 font-semibold">Chest, in</th>
              <th scope="col" className="py-3 font-semibold">Length, in</th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map(([age, height, chest, length]) => (
              <tr key={age} className="border-b border-ink/15">
                <th scope="row" className="py-3 pr-3 font-semibold text-primary-ink">
                  {age}
                </th>
                <td className="py-3 pr-3">{height}</td>
                <td className="py-3 pr-3">{chest}</td>
                <td className="py-3">{length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for my child. Here are the measurements:`)} variant="primary" icon={IconBrandWhatsapp}>
            Send measurements
          </Button>
        </div>
      </div>
    </section>
  )
}
