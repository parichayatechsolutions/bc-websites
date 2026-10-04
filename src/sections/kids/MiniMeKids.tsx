// src/sections/kids/MiniMeKids.tsx
// Big and small: each matching pair standing side by side on one
// baseline, the first photo tall and the second shorter, like the grown-up
// and the little one, with their note beneath. (Lab: kids R, "Mini me".)
//
// Pairs from photos match-<nn>-a.jpg with match-<nn>-b.jpg; up to two.
// Hides without a pair.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function MiniMeKids() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const pairs = (boutique.media.matching ?? []).slice(0, 2)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-match]', { trigger: root.current })
  })

  if (!pairs.length) return null

  return (
    <section ref={root} id="matching" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Big and small, matching</h2>
        <ul className="mt-12 grid gap-14 md:grid-cols-2">
          {pairs.map((pair) => {
            const note = captions[pair.first] ?? captions[pair.second]
            return (
              <li key={pair.first}>
                <figure>
                  <div className="flex items-end gap-3 border-b-2 border-ink">
                    <div data-match className="aspect-[2/3] w-[58%] overflow-hidden bg-paper">
                      <Media file={pair.first} alt={note ?? 'Matching outfit'} />
                    </div>
                    <div data-match className="aspect-[2/3] w-[40%] overflow-hidden bg-paper">
                      <Media file={pair.second} alt={note ? `${note}, the smaller one` : 'The matching smaller outfit'} />
                    </div>
                  </div>
                  {note && <figcaption className="t-3 mt-4">{note}</figcaption>}
                </figure>
              </li>
            )
          })}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like matching outfits, one for me and one for my child.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a matching pair
          </Button>
        </div>
      </div>
    </section>
  )
}
