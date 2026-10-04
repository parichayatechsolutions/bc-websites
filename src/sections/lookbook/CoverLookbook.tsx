// src/sections/lookbook/CoverLookbook.tsx
// Dark, a magazine cover beside its contents: the cover is one look under
// a masthead with the boutique's name, and the contents list every look by
// occasion; choosing one puts it on the cover. (Lab: look D, "Cover +
// contents", without page numbers, which there aren't.)
//
// Looks from photos look-<occasion>-<nn>.jpg; up to eight. Hides without
// any. The cover swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function CoverLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look').slice(0, 8)
  const captions = boutique.media.captions ?? {}
  const [index, setIndex] = useState(0)
  if (!looks.length) return null
  const look = looks[index] ?? looks[0]
  const tag = photoTag(look, 'look')

  return (
    <section id="lookbook" className="section bg-dark text-light">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <figure className="bg-light p-3 text-ink md:col-span-6">
          <p className="t-2 border-b-2 border-ink pb-2 text-center text-balance text-primary-ink">{boutique.brand.name}</p>
          <div className="mt-3 aspect-[3/4] overflow-hidden bg-paper">
            <Media key={look} file={look} alt={captions[look] ?? ''} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
          <figcaption className="flex items-baseline justify-between gap-4 pt-3">
            <span className="t-3">{tag}</span>
            {captions[look] && <span className="t-small text-right text-muted">{captions[look]}</span>}
          </figcaption>
        </figure>
        <div className="md:col-span-6">
          <h2 className="t-1">In this lookbook</h2>
          <ul className="mt-8 border-t border-light/20" role="group" aria-label="Looks">
            {looks.map((f, i) => (
              <li key={f} className="border-b border-light/20">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="flex min-h-14 w-full cursor-pointer flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 text-left transition-colors duration-200 ease-stitch hover:text-accent-on-dark aria-pressed:text-accent-on-dark"
                >
                  <span className="t-3">{photoTag(f, 'look') ?? 'Look'}</span>
                  {captions[f] && <span className="t-small text-light/75">{captions[f]}</span>}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a look like this: ${captions[look] ?? `your ${tag?.toLowerCase() ?? ''} look`}.`)} icon={IconBrandWhatsapp}>
              Ask for this look
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
