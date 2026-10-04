// src/sections/kids/OneKids.tsx
// Dark, one children's piece at a time, large, with its note beside it;
// previous and next step through the rest. Nothing moves on its own.
// (Lab: kids W, "One to love".)
//
// Photos named work-kids-<nn>.jpg, up to eight. Hides without any. The
// photo swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'

export default function OneKids() {
  const { boutique } = useBoutique()
  const photos = boutique.media.work.filter((f) => photoCategory(f) === 'Kids').slice(0, 8)
  const captions = boutique.media.captions ?? {}
  const [index, setIndex] = useState(0)
  if (!photos.length) return null
  const photo = photos[index] ?? photos[0]
  const step = (by: number) => setIndex((index + by + photos.length) % photos.length)

  return (
    <section id="kids" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="aspect-[4/5] overflow-hidden bg-light/5 md:col-span-7">
          <Media key={photo} file={photo} alt={captions[photo] ?? 'Children’s wear we stitched'} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
        </div>
        <div className="md:col-span-5" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">For little ones</h2>
          {captions[photo] && <p className="t-lead mt-6 max-w-[30ch] text-light/85">{captions[photo]}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${captions[photo] ? `something like this: ${captions[photo]}` : 'something stitched for my child'}.`)} icon={IconBrandWhatsapp}>
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
