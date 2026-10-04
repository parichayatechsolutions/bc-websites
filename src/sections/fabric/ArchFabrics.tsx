// src/sections/fabric/ArchFabrics.tsx
// Each fabric in its own tall arch with a fine gold edge, its name and what
// it's best for beneath, and a link to ask about it. The arch family's
// fabric wall. (Lab: fabric K, "Arch swatches".)
//
// From `fabrics`; hides without any.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ArchFabrics() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const fabrics = boutique.fabrics ?? []

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (!fabrics.length) return null

  return (
    <section ref={root} id="fabrics" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Our fabrics</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {fabrics.map((f) => (
            <li key={f.name} className="text-center">
              <div data-arch className="arch aspect-[2/3] border border-accent p-1.5">
                <div className="arch h-full w-full bg-paper">
                  <Media file={f.photo} alt={`${f.name} swatch`} />
                </div>
              </div>
              <p className="t-3 mt-4">{f.name}</p>
              {f.bestFor && <p className="t-small mt-1 text-muted">{f.bestFor}</p>}
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${f.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
              >
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
