// src/sections/gallery/DeckGallery.tsx
// Dark, their work as a stack of prints, the top one in full and two
// peeking out behind; previous and next deal the deck, and the top
// piece's kind and note sit beside it. Nothing deals on its own.
// (Lab: gallery H, "Card deck".)
//
// Work photos, up to ten. Hides without any. The cards move with a CSS
// transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'
const BEHIND = ['rotate-0', 'rotate-3 translate-x-3', '-rotate-3 -translate-x-3']

export default function DeckGallery() {
  const { boutique } = useBoutique()
  const photos = boutique.media.work.slice(0, 10)
  const captions = boutique.media.captions ?? {}
  const [top, setTop] = useState(0)
  if (!photos.length) return null
  const photo = photos[top] ?? photos[0]
  const step = (by: number) => setTop((top + by + photos.length) % photos.length)

  return (
    <section id="work" className="section overflow-x-clip bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            {photos.map((f, i) => {
              const place = (i - top + photos.length) % photos.length
              if (place > 2) return null
              return (
                <div
                  key={f}
                  aria-hidden={place !== 0}
                  className={`absolute inset-0 border-[6px] border-light bg-light transition-transform duration-500 ease-stitch ${BEHIND[place]}`}
                  style={{ zIndex: 10 - place }}
                >
                  <Media file={f} alt={place === 0 ? (captions[f] ?? `Work by ${boutique.brand.name}`) : ''} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="md:col-span-6" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">Our work</h2>
          {photoCategory(photo) && <p className="t-3 mt-8 text-accent-on-dark">{photoCategory(photo)}</p>}
          {captions[photo] && <p className="t-lead mt-2 max-w-[30ch] text-light/85">{captions[photo]}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${captions[photo] ? `something like this: ${captions[photo]}` : 'a piece like one in your gallery'}.`)} icon={IconBrandWhatsapp}>
              Ask for one like it
            </Button>
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous piece" className={ROUND}>
                  <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next piece" className={ROUND}>
                  <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
