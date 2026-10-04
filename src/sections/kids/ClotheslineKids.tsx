// src/sections/kids/ClotheslineKids.tsx
// Little outfits pegged on a washing line: their children's work hanging
// from a thread with a wooden peg each, then the kinds of things they
// stitch for children and a button to ask. (Lab: kids J, "Clothesline".)
//
// Photos named work-kids-<nn>.jpg, up to four. Hides without them. On a
// phone they hang two to a line.
//
// Motion: the outfits settle from a small swing as they come into view.
// Reduced motion: hanging still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ClotheslineKids() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const photos = boutique.media.work.filter((f) => photoCategory(f) === 'Kids').slice(0, 4)
  const captions = boutique.media.captions ?? {}
  const items = boutique.services.groups.find((g) => /^kid|child/i.test(g.title))?.items ?? []

  useMotion(root, () => {
    sway('[data-outfit]', { trigger: root.current })
  })

  if (!photos.length) return null

  return (
    <section ref={root} id="kids" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">For little ones</h2>
        <div className="relative mt-14">
          <span aria-hidden="true" className="absolute inset-x-0 top-2 border-t-2 border-thread" />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
            {photos.map((f, i) => (
              <li key={f} data-outfit className={`relative flex flex-col items-center ${i % 2 ? 'md:mt-6' : ''}`}>
                {/* The peg: two slats of wood over the line. */}
                <span aria-hidden="true" className="relative z-10 flex h-7 w-4 gap-px">
                  <span className="flex-1 rounded-sm bg-primary-ink/70" />
                  <span className="flex-1 rounded-sm bg-primary-ink/70" />
                </span>
                <figure className="-mt-2 w-full">
                  <div className="aspect-[3/4] bg-paper">
                    <Media file={f} alt={captions[f] ?? 'Children’s wear we stitched'} />
                  </div>
                  {captions[f] && <figcaption className="t-small mt-3 text-muted">{captions[f]}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          {items.length > 0 && <p className="max-w-[48ch] text-muted">{items.join(' · ')}</p>}
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for my child.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about kids’ wear
          </Button>
        </div>
      </div>
    </section>
  )
}
