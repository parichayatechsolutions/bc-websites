// src/sections/fabric/OccasionFabrics.tsx
// Fabrics by occasion: wedding, reception, festival or every day as chips,
// and the fabrics they stock for the one picked, each with its swatch and
// what it's best for. (Lab: fabric E, "By occasion".)
//
// From `fabrics`, matched by the words in their own "best for" notes, so
// the suggestions are theirs. Only occasions with a match appear; needs
// two. The fabrics swap with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

const OCCASIONS = [
  { name: 'Wedding', match: /wedding|bridal|bride|muhurtham|trousseau/i },
  { name: 'Reception', match: /reception|party|evening|cocktail|sangeet/i },
  { name: 'Festival', match: /festival|festive|pooja|puja|diwali|onam|eid|navratri/i },
  { name: 'Every day', match: /every ?day|daily|office|casual|summer|work/i },
]

export default function OccasionFabrics() {
  const { boutique } = useBoutique()
  const fabrics = boutique.fabrics ?? []
  const occasions = OCCASIONS.map((o) => ({ ...o, fabrics: fabrics.filter((f) => o.match.test(f.bestFor ?? '')).slice(0, 3) })).filter((o) => o.fabrics.length)
  const [index, setIndex] = useState(0)
  if (occasions.length < 2) return null
  const occasion = occasions[index] ?? occasions[0]

  return (
    <section id="fabrics" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Fabric for the occasion</h2>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Occasion">
          {occasions.map((o, i) => (
            <button
              key={o.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {o.name}
            </button>
          ))}
        </div>
        <ul key={index} className="mt-10 grid animate-[fade-in_700ms_var(--ease-stitch)] grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3" aria-live="polite">
          {occasion.fabrics.map((f) => (
            <li key={f.name}>
              <div className="aspect-square overflow-hidden bg-paper">
                <Media file={f.photo} alt={`${f.name} swatch`} />
              </div>
              <p className="t-3 mt-3">{f.name}</p>
              {f.bestFor && <p className="t-small mt-1 text-muted">Best for {f.bestFor}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'm looking for fabric for a ${occasion.name.toLowerCase()} outfit.`)}
            variant="primary"
            icon={IconBrandWhatsapp}
          >
            Ask about fabric for {occasion.name.toLowerCase()}
          </Button>
        </div>
      </div>
    </section>
  )
}
