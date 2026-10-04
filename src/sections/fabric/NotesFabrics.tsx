// src/sections/fabric/NotesFabrics.tsx
// "Know your fabric": a magazine page of the fabrics they stock in two
// ruled columns, each with a small swatch, its name and what it's best for.
// For the type-led designs. (Lab: fabric P, "Fabric notes".)
//
// From `fabrics`; hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

export default function NotesFabrics() {
  const { boutique } = useBoutique()
  const fabrics = boutique.fabrics ?? []
  if (!fabrics.length) return null

  return (
    <section id="fabrics" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Know your fabric</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <ul className="mt-2 gap-12 md:columns-2">
          {fabrics.map((f) => (
            <li key={f.name} className="flex break-inside-avoid gap-5 border-b border-ink/15 py-6">
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
