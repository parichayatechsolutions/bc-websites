// src/sections/handwork/CompareHandwork.tsx
// Hand or machine? The two kinds of work side by side on how they look, how
// long they take, the detail, the feel and the cost, so a customer can
// choose before she asks. (Lab: emb Q, "Hand or machine?".)
//
// General knowledge about the two, not the boutique's own prices or times.
// Shows only when their services list both machine embroidery and a hand
// craft. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const ROWS = [
  { what: 'Look', hand: 'Raised, rich, a little irregular in the way handmade things are', machine: 'Flat, even and regular' },
  { what: 'Time', hand: 'Days to weeks, depending on how much work', machine: 'Hours to a day or two' },
  { what: 'Detail', hand: 'Stones, beads, zari and fine shading', machine: 'Repeating patterns and borders' },
  { what: 'Feel', hand: 'Heavier, with texture you can feel', machine: 'Lighter and smoother' },
  { what: 'Cost', hand: 'More, because of the hours', machine: 'Less' },
]
const HAND = /aari|maggam|zardosi|hand embroider/i

export default function CompareHandwork() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.flatMap((g) => g.items)
  const both = items.some((i) => /machine embroider/i.test(i)) && items.some((i) => HAND.test(i))
  if (!both) return null

  return (
    <section id="hand-or-machine" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Hand or machine?</h2>
        <dl className="mt-12">
          <div className="grid grid-cols-2 gap-4 border-b-2 border-ink pb-3 md:grid-cols-12" aria-hidden="true">
            <span className="hidden md:col-span-2 md:block" />
            <span className="t-3 md:col-span-5">By hand</span>
            <span className="t-3 md:col-span-5">By machine</span>
          </div>
          {ROWS.map((r) => (
            <div key={r.what} className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-ink/15 py-5 md:grid-cols-12">
              <dt className="col-span-2 font-semibold text-primary-ink md:col-span-2">{r.what}</dt>
              <dd className="md:col-span-5">
                <span className="sr-only">By hand: </span>
                {r.hand}
              </dd>
              <dd className="text-muted md:col-span-5">
                <span className="sr-only">By machine: </span>
                {r.machine}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could you help me choose between hand and machine work?`)} variant="primary" icon={IconBrandWhatsapp}>
            Help me choose
          </Button>
        </div>
      </div>
    </section>
  )
}
