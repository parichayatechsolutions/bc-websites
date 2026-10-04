// src/sections/lookbook/ViewerLookbook.tsx
// A large photo beside the list of looks; choosing a look from the list
// swaps the photo and shows its note. (Lab: look F, "Split viewer".)
//
// Looks from photos look-<occasion>-<nn>.jpg, in the order the functions
// happen. Hides without any. The photo swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function ViewerLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look')
  const captions = boutique.media.captions ?? {}
  const [index, setIndex] = useState(0)
  if (!looks.length) return null
  const file = looks[index] ?? looks[0]
  const label = (f: string) => captions[f] ?? `${photoTag(f, 'look') ?? 'A'} look`

  return (
    <section id="lookbook" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <div className="aspect-[4/5] overflow-hidden bg-paper">
            <Media key={file} file={file} alt={label(file)} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
        </div>
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">The lookbook</h2>
          <ul className="mt-10 border-t border-ink/15" role="group" aria-label="Looks">
            {looks.map((f, i) => (
              <li key={f} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-3 text-left transition-colors duration-200 ease-stitch aria-pressed:text-primary-ink"
                >
                  <span>
                    <span className="t-small block text-muted">{photoTag(f, 'look')}</span>
                    {label(f)}
                  </span>
                  <IconChevronRight size={18} stroke={1.5} aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a look like this: ${label(file)}.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for this look
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
