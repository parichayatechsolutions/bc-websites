// src/sections/lookbook/OccasionLookbook.tsx
// "What's the occasion?" Chips for each function filter a grid of looks,
// each with its note and a button to ask for the same look. (Lab: look Q,
// "By occasion".)
//
// Looks come from photos named look-<occasion>-<nn>.jpg. Hides without any;
// the chips show only with two or more occasions. No scroll motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'

const ALL = 'All'

export default function OccasionLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look')
  const captions = boutique.media.captions ?? {}
  const occasions = [...new Set(looks.map((f) => photoTag(f, 'look')).filter((o): o is string => Boolean(o)))]
  const [shown, setShown] = useState(ALL)

  if (!looks.length) return null
  const visible = shown === ALL ? looks : looks.filter((f) => photoTag(f, 'look') === shown)

  return (
    <section id="lookbook" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Looks for every occasion</h2>
        {occasions.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Occasion">
            {[ALL, ...occasions].map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setShown(o)}
                aria-pressed={o === shown}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {o}
              </button>
            ))}
          </div>
        )}

        <ul className="mt-10 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((f) => {
            const occasion = photoTag(f, 'look')
            return (
              <li key={f}>
                <figure>
                  <div className="aspect-[3/4] overflow-hidden bg-paper">
                    <Media file={f} alt={captions[f] ?? ''} />
                  </div>
                  <figcaption className="mt-4">
                    {occasion && <span className="t-small text-primary-ink">{occasion}</span>}
                    {captions[f] && <span className="mt-1 block">{captions[f]}</span>}
                  </figcaption>
                </figure>
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a look like this: ${captions[f] ?? `your ${occasion?.toLowerCase() ?? ''} look`}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask for this look</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
