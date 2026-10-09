// src/sections/gallery/FeatureGallery.tsx
// One piece large, with its note and a button to ask about that exact piece
// on WhatsApp; the rest as thumbnails underneath to pick from. For the
// customer who has seen something she wants. (Lab: gallery C, "Feature +
// strip".)
//
// The thumbnails wrap into rows rather than scrolling sideways. Hides
// without work photos.
//
// Motion: the large photo uncovers once as it comes into view; picking a
// thumbnail swaps it with a CSS fade. Reduced motion: no uncovering.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { rise, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function FeatureGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const rawWork = boutique.media.work
  const work = rawWork.length > 0 ? rawWork : [boutique.media.hero.src]
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-feature]', { trigger: root.current })
    rise('[data-gallery-strip] li', { trigger: root.current })
  })

  if (!work.length) return null
  const file = work[index] ?? work[0]
  const about = captions[file] ?? photoCategory(file)
  const ask = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I saw this on your website and I'd like something like it: ${about ?? `photo ${index + 1}`}.`,
  )

  return (
    <section ref={root} id="work" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="t-1">Our work</h2>
          {work.length > 1 && (
            <p className="text-muted" aria-live="polite">
              {index + 1} of {work.length}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end md:gap-12">
          <div data-feature className="arch aspect-[4/5] w-full bg-paper md:col-span-7">
            <Media key={file} file={file} alt={about ?? ''} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
          <div className="md:col-span-5">
            {about && <p className="t-3 max-w-[24ch]">{about}</p>}
            <p className="mt-4 max-w-[36ch] text-muted">Want something like this? Send this piece on WhatsApp and we’ll plan yours.</p>
            <div className="mt-8">
              <Button href={ask} variant="primary" icon={IconBrandWhatsapp}>
                Ask about this piece
              </Button>
            </div>
          </div>
        </div>

        {work.length > 1 && (
          <ul data-gallery-strip className="mt-8 grid grid-cols-5 gap-1 md:grid-cols-10 md:gap-2" aria-label="Choose a piece">
            {work.map((f, i) => (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  aria-label={captions[f] ?? `Piece ${i + 1}`}
                  className="group block aspect-square w-full cursor-pointer overflow-hidden bg-paper opacity-60 transition-opacity duration-200 ease-stitch hover:opacity-100 aria-pressed:opacity-100 aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-primary-ink"
                >
                  <Media file={f} alt="" className="transition-transform duration-700 ease-stitch group-hover:scale-[1.04]" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
