// src/sections/men/EditMen.tsx
// Men's tailoring as an edit: their men's pieces in alternating photo
// rows, each with its note, and one button to ask. (Lab: men E, "The
// edit".)
//
// Photos are their work named work-men-<nn>.jpg, up to four; hides without
// any.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function EditMen() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const photos = boutique.media.work.filter((f) => photoCategory(f) === 'Men').slice(0, 4)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-men-photo]', { trigger: root.current })
  })

  if (!photos.length) return null

  return (
    <section ref={root} id="men-edit" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">For him</h2>
        <ul className="mt-12 space-y-12 md:space-y-16">
          {photos.map((f, i) => (
            <li key={f} className="grid items-center gap-6 md:grid-cols-12 md:gap-12">
              <div data-men-photo className={`aspect-[4/5] w-full max-w-md overflow-hidden bg-light/5 md:col-span-5 ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>
                <Media file={f} alt={captions[f] ?? ''} />
              </div>
              {captions[f] && <p className={`t-2 md:col-span-6 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>{captions[f]}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for a man.`)} icon={IconBrandWhatsapp}>
            Ask about men’s wear
          </Button>
        </div>
      </div>
    </section>
  )
}
