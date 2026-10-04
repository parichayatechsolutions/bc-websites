// src/sections/fabric/BandFabrics.tsx
// On the brand colour between two zari borders, the fabrics they stock as
// swatches each in a fine double gold frame, with name and use beneath.
// (Lab: fabric I, "Brand band".)
//
// From `fabrics`, up to eight. Hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

export default function BandFabrics() {
  const { boutique } = useBoutique()
  const fabrics = (boutique.fabrics ?? []).slice(0, 8)
  if (!fabrics.length) return null

  return (
    <section id="fabrics" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="section">
        <div className="wrap">
          <h2 className="t-1 max-w-[12ch] text-balance">Our fabrics</h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {fabrics.map((f) => (
              <li key={f.name}>
                <div className="border border-accent p-1">
                  <div className="border border-accent/60 p-1">
                    <div className="aspect-square overflow-hidden bg-paper">
                      <Media file={f.photo} alt={`${f.name} swatch`} />
                    </div>
                  </div>
                </div>
                <p className="t-3 mt-4">{f.name}</p>
                {f.bestFor && <p className="t-small mt-1 opacity-85">Best for {f.bestFor}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
