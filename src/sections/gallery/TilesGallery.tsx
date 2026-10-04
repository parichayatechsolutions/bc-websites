// src/sections/gallery/TilesGallery.tsx
// "What are you planning?" A photo tile for each kind of work; choosing one
// opens that kind's pieces below, with their notes and a way to ask.
// (Lab: gallery G, "Category tiles".)
//
// Kinds come from photo names (work-bridal-01.jpg); hides with fewer than
// two. No scroll motion; the opened pieces fade in.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function TilesGallery() {
  const { boutique } = useBoutique()
  const work = boutique.media.work
  const captions = boutique.media.captions ?? {}
  const kinds = photoCategories(work).slice(0, 6)
  const [kind, setKind] = useState(kinds[0])
  if (kinds.length < 2) return null
  const pieces = work.filter((f) => photoCategory(f) === kind)

  return (
    <section id="work" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">What are you planning?</h2>
        <ul className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6" role="group" aria-label="Kind of work">
          {kinds.map((k) => {
            const first = work.find((f) => photoCategory(f) === k)!
            return (
              <li key={k}>
                <button type="button" onClick={() => setKind(k)} aria-pressed={k === kind} className="group block w-full cursor-pointer text-left">
                  <span className="block aspect-square overflow-hidden bg-paper outline-offset-2 group-aria-pressed:outline-2 group-aria-pressed:outline-primary-ink">
                    <Media file={first} alt="" className="transition-transform duration-700 ease-stitch group-hover:scale-[1.04]" />
                  </span>
                  <span className="mt-2 block text-center group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{k}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div key={kind} className="mt-12 animate-[fade-in_700ms_var(--ease-stitch)] border-t border-ink/15 pt-10" aria-live="polite">
          <h3 className="t-2">{kind}</h3>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {pieces.map((f) => (
              <li key={f}>
                <figure>
                  <div className="aspect-[3/4] overflow-hidden bg-paper">
                    <Media file={f} alt={captions[f] ?? ''} />
                  </div>
                  {captions[f] && <figcaption className="t-small mt-2 text-muted">{captions[f]}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${kind?.toLowerCase()}.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about {kind?.toLowerCase()}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
