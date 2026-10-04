// src/sections/lookbook/DeckLookbook.tsx
// Dark, the looks as a stack of prints, the top one in full and two
// peeking behind; previous and next deal the deck, and the top look's
// occasion and note sit beside it. Nothing deals on its own.
// (Lab: look O, "Look deck".)
//
// Looks from photos look-<occasion>-<nn>.jpg, in the order the functions
// happen; up to ten. Hides without any. The cards move with a CSS
// transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'
const BEHIND = ['rotate-0', 'rotate-3 translate-x-3', '-rotate-3 -translate-x-3']

export default function DeckLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look').slice(0, 10)
  const captions = boutique.media.captions ?? {}
  const [top, setTop] = useState(0)
  if (!looks.length) return null
  const look = looks[top] ?? looks[0]
  const tag = photoTag(look, 'look')
  const step = (by: number) => setTop((top + by + looks.length) % looks.length)

  return (
    <section id="lookbook" className="section overflow-x-clip bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
            {looks.map((f, i) => {
              const place = (i - top + looks.length) % looks.length
              if (place > 2) return null
              return (
                <div
                  key={f}
                  aria-hidden={place !== 0}
                  className={`absolute inset-0 border-[6px] border-light bg-light transition-transform duration-500 ease-stitch ${BEHIND[place]}`}
                  style={{ zIndex: 10 - place }}
                >
                  <Media file={f} alt={place === 0 ? (captions[f] ?? `${photoTag(f, 'look') ?? ''} look`) : ''} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="md:col-span-6" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">The lookbook</h2>
          {tag && <p className="t-2 mt-8 text-accent-on-dark">{tag}</p>}
          {captions[look] && <p className="t-lead mt-2 max-w-[30ch] text-light/85">{captions[look]}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a look like this: ${captions[look] ?? `your ${tag?.toLowerCase() ?? ''} look`}.`)} icon={IconBrandWhatsapp}>
              Ask for this look
            </Button>
            {looks.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous look" className={ROUND}>
                  <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next look" className={ROUND}>
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
