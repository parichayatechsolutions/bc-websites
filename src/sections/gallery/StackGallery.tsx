// src/sections/gallery/StackGallery.tsx
// One full-width photograph for each kind of work, stacked down the page,
// the kind's name set over the corner of each with a button to ask about
// it. Big and simple. (Lab: gallery V, "Full-bleed stack".)
//
// Kinds come from photo names; hides with fewer than two. Each photo sits
// under a dark veil at its foot so the name reads.
//
// Motion: each photo drifts a little inside its frame as it scrolls past.
// Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { drift } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { gsap } from '../../motion/gsap'

export default function StackGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const work = boutique.media.work
  const kinds = photoCategories(work)
    .slice(0, 5)
    .map((kind) => ({ kind, file: work.find((f) => photoCategory(f) === kind)! }))

  useMotion(root, () => {
    gsap.utils.toArray<HTMLElement>('[data-stack]').forEach((frame) => drift(frame.querySelector('[data-drift]'), { trigger: frame, amount: 6 }))
  })

  if (kinds.length < 2) return null

  return (
    <section ref={root} id="work" className="section">
      <div className="wrap">
        <h2 className="t-1">What we make</h2>
      </div>
      <ul className="mt-12 space-y-1">
        {kinds.map(({ kind, file }) => (
          <li key={kind} data-stack className="relative h-[70svh] overflow-hidden bg-paper text-light">
            <div data-drift className="absolute inset-x-0 -top-[6%] h-[112%]">
              <Media file={file} alt="" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-dark/55 py-6 md:py-8">
              <div className="wrap flex flex-wrap items-center justify-between gap-4">
                <h3 className="t-1">{kind}</h3>
                <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${kind.toLowerCase()}.`)} icon={IconBrandWhatsapp}>
                  Ask about {kind.toLowerCase()}
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
