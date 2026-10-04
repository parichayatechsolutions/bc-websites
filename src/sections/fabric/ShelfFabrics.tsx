// src/sections/fabric/ShelfFabrics.tsx
// Dark, the fabrics they stock as bolts standing on a gold shelf; tapping
// a bolt lifts it off the shelf and its name and what it's best for show
// beside. (Lab: fabric B, "Fabric shelf".)
//
// From `fabrics`, up to eight; on a phone the bolts are narrower. Hides
// without any. The bolts lift with a CSS transition that reduced motion
// turns off.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function ShelfFabrics() {
  const { boutique } = useBoutique()
  const fabrics = (boutique.fabrics ?? []).slice(0, 8)
  const [index, setIndex] = useState(0)
  if (!fabrics.length) return null
  const fabric = fabrics[index] ?? fabrics[0]

  return (
    <section id="fabrics" className="section bg-dark text-light">
      <div className="wrap grid items-end gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <ul className="flex items-end gap-1.5 border-b-[6px] border-accent pt-10 md:gap-2.5" role="group" aria-label="Fabrics">
            {fabrics.map((f, i) => (
              <li key={f.name} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  aria-label={f.name}
                  className="group block w-full cursor-pointer transition-transform duration-300 ease-stitch hover:-translate-y-2 aria-pressed:-translate-y-8"
                >
                  <span className="block h-56 overflow-hidden rounded-t-md border border-light/20 md:h-72">
                    <Media file={f.photo} alt="" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-5" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">On our shelves</h2>
          <p className="t-2 mt-8 text-accent-on-dark">{fabric.name}</p>
          {fabric.bestFor && <p className="mt-2 text-light/80">Best for {fabric.bestFor}</p>}
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${fabric.name}.`)} icon={IconBrandWhatsapp}>
              Ask about this fabric
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
