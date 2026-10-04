// src/sections/handwork/WeddingHandwork.tsx
// Wedding story motifs: the scenes couples ask to have worked into a
// bridal blouse (the varmala, the doli, the couple's names, the wedding
// date, a mandap, a shehnai), in ruled rows with where each usually goes.
// (Lab: emb W, "Wedding story motifs".)
//
// General bridal handwork ideas, offered to ask about. Needs bridal work
// and a handwork item in their services. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useBridal } from '../bridal/bridalShared'

const HANDWORK = /aari|maggam|zardosi|zardozi|embroider|handwork/i

const MOTIFS = [
  { name: 'The varmala', where: 'Across the back, the couple exchanging garlands.' },
  { name: 'The doli', where: 'On the back or sleeves, carried in procession.' },
  { name: 'Your names', where: 'Along the back neckline or the sleeve hem.' },
  { name: 'The wedding date', where: 'Small, inside a motif on the sleeve.' },
  { name: 'A mandap', where: 'Framing the centre of the back.' },
  { name: 'Shehnai and dhol', where: 'Around the sleeves, for the music of the day.' },
]

export default function WeddingHandwork() {
  const { boutique } = useBoutique()
  const { doesBridal } = useBridal()
  const doesHandwork = boutique.services.groups.flatMap((g) => g.items).some((i) => HANDWORK.test(i))
  if (!doesBridal || !doesHandwork) return null

  return (
    <section id="handwork-wedding" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">Your wedding, in thread</h2>
        <ul className="mt-10 border-t border-ink/15">
          {MOTIFS.map((m) => (
            <li key={m.name} className="border-b border-ink/15">
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${m.name.toLowerCase()} worked into my bridal blouse.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-1 py-5 md:grid-cols-12 md:items-center md:gap-8"
              >
                <span className="t-2 md:col-span-5">{m.name}</span>
                <span className="text-muted md:col-span-6">{m.where}</span>
                <IconArrowRight size={20} stroke={1.75} aria-hidden="true" className="hidden text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1 md:col-span-1 md:block md:justify-self-end" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
