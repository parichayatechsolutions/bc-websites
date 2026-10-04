// src/sections/saree/IndexSaree.tsx
// Sarees we handle, as a typeset index: each kind of saree in a ruled row
// with how to care for it and which of their services it usually needs.
// (Lab: saree H, "Sarees we handle".)
//
// The care notes are general, true of the cloth. A saree's services are
// only ones they offer; a row with none still shows its care. Needs a
// saree service. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i

const KINDS = [
  { name: 'Kanjivaram and pattu silk', care: 'Dry clean; store folded in muslin and refold every few months.', needs: /fall|pico|kuchu|tassel/i },
  { name: 'Banarasi', care: 'Dry clean only; keep the zari away from damp.', needs: /fall|pico|kuchu|tassel/i },
  { name: 'Georgette and chiffon', care: 'Cold hand wash; dry flat in the shade.', needs: /fall|pico|pleat|drap/i },
  { name: 'Cotton and handloom', care: 'Cold wash on its own the first few times; starch if you like it crisp.', needs: /fall|pico/i },
  { name: 'Organza and tissue', care: 'Dry clean; iron on the lowest heat with a cloth over it.', needs: /pico|pleat|drap/i },
  { name: 'Linen', care: 'Cold or lukewarm wash; iron while damp.', needs: /fall|pico/i },
]

export default function IndexSaree() {
  const { boutique } = useBoutique()
  const services = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => SAREE.test(i)))]
  if (!services.length) return null

  return (
    <section id="saree-index" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Sarees we handle</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <dl>
          {KINDS.map((k) => {
            const usual = services.filter((s) => k.needs.test(s))
            return (
              <div key={k.name} className="grid gap-2 border-b border-ink/15 py-6 md:grid-cols-12 md:gap-10">
                <dt className="t-2 md:col-span-5">{k.name}</dt>
                <dd className="md:col-span-7">
                  <p>{k.care}</p>
                  {usual.length > 0 && <p className="t-small mt-2 text-primary-ink">Often needs {usual.join(', ').toLowerCase()}</p>}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
