// src/sections/kids/MatchingKids.tsx
// Matching outfits: two arched photos side by side for each pair (mother
// and daughter, or siblings), with their note and a button to ask for a
// matching set. (Lab: kids B, "Mother and daughter".)
//
// Pairs come from photos match-<nn>-a.jpg with match-<nn>-b.jpg. Hides
// without a pair.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function MatchingKids() {
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
        <h2 className="t-1 max-w-[12ch] text-balance">Made to match</h2>
        <ul className="mt-12 space-y-12">
          {pairs.map((p) => (
            <li key={p.first} className="grid max-w-3xl grid-cols-2 gap-3">
              {[p.first, p.second].map((f) => (
                <figure key={f}>
                  <div data-match className="arch aspect-[3/4] bg-paper">
                    <Media file={f} alt={captions[f] ?? ''} />
                  </div>
                  {captions[f] && <figcaption className="t-small mt-2 text-muted">{captions[f]}</figcaption>}
                </figure>
              ))}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like matching outfits made.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a matching set
          </Button>
        </div>
      </div>
    </section>
  )
}
