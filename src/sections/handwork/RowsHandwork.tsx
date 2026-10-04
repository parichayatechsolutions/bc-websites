// src/sections/handwork/RowsHandwork.tsx
// The kinds of handwork they do, each explained: what the work is and what
// it suits, in alternating rows, so a customer can tell aari from maggam
// before she asks. (Lab: emb A, "Kinds of handwork", without the lab's
// times per work (DaysHandwork shows the shop's own), and without textures,
// since a photo matched to the wrong work would mislead.)
//
// Only the works in their own services; the explanations are general craft
// knowledge, true of the work itself. Hides with fewer than two. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

const CRAFTS: { match: RegExp; what: string; suits: string }[] = [
  { match: /aari/i, what: 'Fine chain-stitch embroidery worked with a hooked needle on a frame. Delicate and detailed.', suits: 'blouses, necklines and sleeves' },
  { match: /maggam/i, what: 'Raised embroidery with zari thread, stones and beads, worked on a wooden frame.', suits: 'bridal blouses' },
  { match: /zardosi|zardozi/i, what: 'Rich embroidery in metallic thread, often with sequins and beads.', suits: 'bridal lehengas and borders' },
  { match: /mirror|bead|stone/i, what: 'Small mirrors, beads or stones stitched in place by hand.', suits: 'festive wear and lehengas' },
  { match: /machine embroidery/i, what: 'Even, repeatable patterns stitched by machine; quicker and lighter on the budget.', suits: 'everyday blouses and kurtis' },
  { match: /hand embroidery/i, what: 'Embroidery stitched entirely by hand in thread.', suits: 'one-of-a-kind pieces' },
  { match: /kantha/i, what: 'Running-stitch embroidery from Bengal, quiet and textured.', suits: 'sarees and dupattas' },
  { match: /chikan/i, what: 'Delicate white-on-white shadow work from Lucknow.', suits: 'summer kurtas and sarees' },
]

export default function RowsHandwork() {
  const { boutique } = useBoutique()
  const works = boutique.services.groups
    .flatMap((g) => g.items)
    .map((item) => ({ item, craft: CRAFTS.find((c) => c.match.test(item)) }))
    .filter((w): w is { item: string; craft: (typeof CRAFTS)[number] } => Boolean(w.craft))

  if (works.length < 2) return null

  return (
    <section id="handwork" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">The handwork we do</h2>
        <ul className="mt-12">
          {works.map(({ item, craft }, i) => (
            <li key={item} className="grid gap-4 border-t border-ink/15 py-10 md:grid-cols-12 md:gap-10">
              <h3 className={`t-2 md:col-span-5 ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>{item}</h3>
              <div className={`md:col-span-6 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
                <p className="t-lead max-w-[36ch]">{craft.what}</p>
                <p className="mt-3 text-muted">Best for {craft.suits}.</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
