// src/sections/handwork/CareHandwork.tsx
// Caring for handwork: six short numbered notes on washing, pressing and
// storing embroidered pieces so the work lasts. Useful, and a quiet sign
// that they care what happens after the sale.
// (Lab: emb T, "Caring for handwork".)
//
// General care advice. Shows only when their services include handwork.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const HANDWORK = /aari|maggam|zardosi|zari|embroider|mirror|bead|stone|kantha|chikan/i
const NOTES = [
  'Dry clean heavy work, or hand wash gently in cold water.',
  'Never wring or twist an embroidered piece.',
  'Iron on the reverse, through a cotton cloth, never on stones.',
  'Fold with muslin between the layers, so the work doesn’t catch.',
  'Store in a cotton bag, not plastic; zari tarnishes when it can’t breathe.',
  'Air it out every few months, away from direct sun.',
]

export default function CareHandwork() {
  const { boutique } = useBoutique()
  const doesHandwork = boutique.services.groups.flatMap((g) => g.items).some((i) => HANDWORK.test(i))
  if (!doesHandwork) return null

  return (
    <section id="handwork-care" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Caring for handwork</h2>
        <ol className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {NOTES.map((note, i) => (
            <li key={note} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/15 pt-5">
              <span className="t-2 text-thread" aria-hidden="true">
                {i + 1}
              </span>
              <p className="t-lead">{note}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question about caring for my embroidered piece.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask us
          </Button>
        </div>
      </div>
    </section>
  )
}
