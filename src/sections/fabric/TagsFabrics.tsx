// src/sections/fabric/TagsFabrics.tsx
// Each fabric they stock on a punched swing tag: a swatch, its name and
// what it's best for, hung from a thread. (Lab: fabric F, "Swatch tags".)
//
// From `fabrics`; hides without any.
//
// Motion: the tags settle from a small swing as they come into view.
// Reduced motion: hanging still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function TagsFabrics() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const fabrics = boutique.fabrics ?? []

  useMotion(root, () => {
    sway('[data-tag]', { trigger: root.current })
  })

  if (!fabrics.length) return null

  return (
    <section ref={root} id="fabrics" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Fabrics we stock</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {fabrics.map((f) => (
            <li key={f.name} data-tag className="flex flex-col items-center">
              <span aria-hidden="true" className="h-8 w-px bg-thread" />
              <div className="w-full rounded-2xl border border-ink/15 bg-light p-3 pt-2">
                <span aria-hidden="true" className="mx-auto block h-3 w-3 rounded-full border border-ink/30 bg-light" />
                <div className="mt-2 aspect-square overflow-hidden bg-paper">
                  <Media file={f.photo} alt={`${f.name} swatch`} />
                </div>
                <p className="t-3 mt-3">{f.name}</p>
                {f.bestFor && <p className="t-small mt-1 text-muted">Best for {f.bestFor}</p>}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your fabrics.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about fabrics
          </Button>
        </div>
      </div>
    </section>
  )
}
