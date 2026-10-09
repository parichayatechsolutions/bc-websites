// src/sections/fabric/NotesFabrics.tsx
// "Know your fabric": a magazine page of the fabrics they stock in two
// ruled columns, each with a small swatch, its name and what it's best for.
// For the type-led designs. (Lab: fabric P, "Fabric notes".)
//
// From `fabrics`; hides without any. No motion.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const DEFAULT_FABRICS = [
  { name: 'Pure Raw Silk', bestFor: 'Bridal blouses, structure and rich hand embroidery' },
  { name: 'Kanchipuram Silk', bestFor: 'Muhurtham blouses, traditional zari and temple borders' },
  { name: 'Pure Georgette', bestFor: 'Flowing lehengas, festive anarkalis and soft drapes' },
  { name: 'Brocade & Katan', bestFor: 'Royal jackets, heavy banarasi skirts and ceremonial wear' },
  { name: 'Organza & Tissue', bestFor: 'Contemporary sheer sleeves, dupattas and lightweight styling' },
  { name: 'Chanderi Silk', bestFor: 'Summer festive suits, lightweight kurtas and subtle sheen' },
]

export default function NotesFabrics() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-fabric-note]', { trigger: root.current })
  })

  const customFabrics = boutique.fabrics ?? []
  const fabrics = customFabrics.length > 0 ? customFabrics : DEFAULT_FABRICS.map((d, i) => ({
    name: d.name,
    bestFor: d.bestFor,
    photo: (boutique.media.work[i % boutique.media.work.length] || boutique.media.hero.src) as any,
  }))

  return (
    <section ref={root} id="fabrics" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Know your fabric</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <ul className="mt-2 gap-12 md:columns-2">
          {fabrics.map((f) => (
            <li key={f.name} data-fabric-note className="flex break-inside-avoid gap-5 border-b border-ink/15 py-6">
              <span className="block h-16 w-16 shrink-0 overflow-hidden bg-paper" aria-hidden="true">
                <Media file={f.photo} alt="" />
              </span>
              <span>
                <span className="t-3 block">{f.name}</span>
                {f.bestFor && <span className="mt-1 block text-muted">Best for {f.bestFor}.</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
