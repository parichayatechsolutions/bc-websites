// src/sections/gallery/ZigzagGallery.tsx
// What they make, one kind per row: a photo and the kind's name and count,
// alternating left and right down the page, each with a link to ask about
// that kind. (Lab: gallery L, "Zig-zag rows".)
//
// Kinds come from photo names (work-bridal-01.jpg); hides with fewer than
// two. The note of each kind's first photo goes under its name.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ZigzagGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const work = boutique.media.work
  const captions = boutique.media.captions ?? {}
  const kinds = photoCategories(work).map((kind) => {
    const files = work.filter((f) => photoCategory(f) === kind)
    return { kind, file: files[0], count: files.length }
  })

  useMotion(root, () => {
    wipe('[data-row-photo]', { trigger: root.current })
  })

  if (kinds.length < 2) return null

  return (
    <section ref={root} id="work" className="section">
      <div className="wrap">
        <h2 className="t-1">What we make</h2>
        <ul className="mt-12 space-y-12 md:space-y-20">
          {kinds.map(({ kind, file, count }, i) => (
            <li key={kind} className="grid items-center gap-6 md:grid-cols-12 md:gap-12">
              <div data-row-photo className={`aspect-[4/3] overflow-hidden bg-paper md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                <Media file={file} alt={captions[file] ?? ''} />
              </div>
              <div className={`md:col-span-4 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                <h3 className="t-2">{kind}</h3>
                <p className="t-small mt-1 text-muted">{count === 1 ? '1 piece' : `${count} pieces`}</p>
                {captions[file] && <p className="mt-4 max-w-[34ch] text-muted">{captions[file]}</p>}
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${kind.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask about {kind.toLowerCase()}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
