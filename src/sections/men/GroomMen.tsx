// src/sections/men/GroomMen.tsx
// The groom's wardrobe: one look for each function (haldi, sangeet,
// wedding, reception), in the order they happen, with the note and a link
// to plan his outfits. (Lab: men B, "Groom's wardrobe".)
//
// Looks come from photos named groom-<function>.jpg. Hides without any.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const COLUMNS = { 1: 'max-w-sm', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' } as Record<number, string>

export default function GroomMen() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const looks = byFunction(boutique.media.groom ?? [], 'groom').slice(0, 4)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-groom]', { trigger: root.current })
  })

  if (!looks.length) return null

  return (
    <section ref={root} id="groom" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">For the groom</h2>
        <ul className={`mt-12 grid gap-x-4 gap-y-10 ${COLUMNS[looks.length]}`}>
          {looks.map((f) => {
            const when = photoTag(f, 'groom')
            return (
              <li key={f}>
                <figure>
                  <div data-groom className="arch aspect-[2/3] w-full bg-paper">
                    <Media file={f} alt={captions[f] ?? `Groom's ${when?.toLowerCase() ?? ''} outfit`} />
                  </div>
                  <figcaption className="mt-4">
                    {when && <span className="t-3 block">{when}</span>}
                    {captions[f] && <span className="t-small mt-1 block text-muted">{captions[f]}</span>}
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to plan the groom's outfits for our wedding.`)} variant="primary" icon={IconBrandWhatsapp}>
            Plan his outfits
          </Button>
        </div>
      </div>
    </section>
  )
}
