// src/sections/saree/UnderSaree.tsx
// Under the saree: the petticoat and what goes with it (a shapewear
// petticoat, a fall, the blouse lining), in a ruled list with what each
// does, marking the ones they stitch. (Lab: saree R, "Under the saree".)
//
// The notes are general; "We stitch this" only where their services list
// it. Needs a saree service. No motion.

import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i

const LAYERS = [
  { name: 'Cotton petticoat', match: /petticoat|underskirt|inskirt/i, note: 'The everyday base: holds the pleats and the tuck at the waist.' },
  { name: 'Shapewear petticoat', match: /shapewear|fishcut|mermaid/i, note: 'A fitted, flared cut for a slim line under silk and georgette.' },
  { name: 'Fall', match: /\bfall/i, note: 'Stitched inside the hem to weigh it down and take the wear.' },
  { name: 'Blouse lining', match: /lining|blouse/i, note: 'A soft inner layer so the blouse sits right and doesn’t scratch.' },
]

export default function UnderSaree() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.flatMap((g) => g.items)
  if (!items.some((i) => SAREE.test(i))) return null

  return (
    <section id="saree-under" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Under the saree</h2>
        <ul className="mt-10 border-t border-ink/15">
          {LAYERS.map((l) => {
            const ours = items.some((i) => l.match.test(i))
            return (
              <li key={l.name} className="grid gap-1 border-b border-ink/15 py-5 md:grid-cols-12 md:gap-8">
                <p className="t-3 md:col-span-4">{l.name}</p>
                <p className="text-muted md:col-span-5">{l.note}</p>
                <p className="t-small md:col-span-3 md:text-right">
                  {ours && (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-primary-ink">
                      <IconCheck size={16} stroke={2} aria-hidden="true" />
                      We stitch this
                    </span>
                  )}
                </p>
              </li>
            )
          })}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need a petticoat stitched for my saree.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about it
          </Button>
        </div>
      </div>
    </section>
  )
}
