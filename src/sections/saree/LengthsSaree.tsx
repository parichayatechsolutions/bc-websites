// src/sections/saree/LengthsSaree.tsx
// Saree lengths at a glance: the usual lengths drawn as bars, split into
// the body, the pallu and the blouse piece, so a customer knows what she's
// bringing in. (Lab: saree I, "Saree lengths".)
//
// General knowledge about sarees. Shows only when their services include
// saree work. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const SAREE = /saree|sari|fall|pico|pleat|drap/i

// Metres of body, pallu and blouse piece.
const LENGTHS = [
  { name: '5.5 metres', note: 'The usual saree, without a blouse piece', parts: [4.5, 1, 0] },
  { name: '6.3 metres', note: 'With a blouse piece woven in at one end', parts: [4.5, 1, 0.8] },
  { name: '9 yards (about 8.2 metres)', note: 'For the traditional nine-yard drapes', parts: [7.2, 1, 0] },
]
const PART_NAMES = ['Body', 'Pallu', 'Blouse piece']
const PART_COLOURS = ['bg-primary/25', 'bg-primary-ink', 'bg-accent']
const LONGEST = 8.2

export default function LengthsSaree() {
  const { boutique } = useBoutique()
  const doesSarees = boutique.services.groups.flatMap((g) => g.items).some((i) => SAREE.test(i))
  if (!doesSarees) return null

  return (
    <section id="saree-lengths" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">How long is a saree?</h2>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-hidden="true">
          {PART_NAMES.map((name, i) => (
            <li key={name} className="t-small flex items-center gap-2 text-muted">
              <span className={`h-3 w-3 ${PART_COLOURS[i]}`} />
              {name}
            </li>
          ))}
        </ul>
        <ul className="mt-10 space-y-8">
          {LENGTHS.map((l) => (
            <li key={l.name}>
              <p className="t-3">{l.name}</p>
              <p className="t-small mt-1 text-muted">
                {l.note}: {l.parts.map((m, i) => (m ? `${PART_NAMES[i].toLowerCase()} ${m} m` : '')).filter(Boolean).join(', ')}.
              </p>
              <div className="mt-3 flex h-4 gap-0.5" style={{ width: `${(l.parts.reduce((a, b) => a + b, 0) / LONGEST) * 100}%` }} aria-hidden="true">
                {l.parts.map((m, i) => (m ? <span key={i} className={PART_COLOURS[i]} style={{ flex: m }} /> : null))}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question about my saree.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about your saree
          </Button>
        </div>
      </div>
    </section>
  )
}
