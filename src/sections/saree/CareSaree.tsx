// src/sections/saree/CareSaree.tsx
// A saree care cheat sheet: one table of the common sarees with how to
// wash, iron and store each, set to print cleanly. (Lab: blog Y, "Care
// cheat sheet".)
//
// General care, true of the cloth. Shows only for a boutique with saree
// services. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i

const ROWS = [
  ['Silk (Kanjivaram, pattu)', 'Dry clean', 'Low, on the reverse, with a cloth', 'Folded in muslin; refold often'],
  ['Banarasi', 'Dry clean only', 'Low, on the reverse, away from the zari', 'Folded in muslin, away from damp'],
  ['Georgette, chiffon', 'Cold hand wash', 'Low or steam', 'Folded loosely'],
  ['Cotton, handloom', 'Cold, alone at first', 'Hot while damp', 'Folded or hung, out of the sun'],
  ['Organza, tissue', 'Dry clean', 'Lowest heat, with a cloth', 'Hung, or with tissue between folds'],
  ['Linen', 'Cold or lukewarm', 'Hot while damp', 'Hung'],
]

export default function CareSaree() {
  const { boutique } = useBoutique()
  const doesSarees = boutique.services.groups.flatMap((g) => g.items).some((i) => SAREE.test(i))
  if (!doesSarees) return null

  return (
    <section id="saree-care" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Saree care at a glance</h2>
        <div className="mt-10 rounded-2xl border border-ink/15 p-2 md:p-6">
          <table className="t-small w-full border-collapse text-left md:text-base">
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="py-3 pr-3 font-semibold">Saree</th>
                <th scope="col" className="py-3 pr-3 font-semibold">Wash</th>
                <th scope="col" className="hidden py-3 pr-3 font-semibold sm:table-cell">Iron</th>
                <th scope="col" className="hidden py-3 font-semibold md:table-cell">Store</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([saree, wash, iron, store]) => (
                <tr key={saree} className="border-b border-ink/15 align-top last:border-b-0">
                  <th scope="row" className="py-3 pr-3 font-semibold text-primary-ink">
                    {saree}
                  </th>
                  <td className="py-3 pr-3">
                    {wash}
                    <span className="mt-1 block text-muted sm:hidden">Iron: {iron.toLowerCase()}</span>
                    <span className="mt-1 block text-muted md:hidden">Store: {store.toLowerCase()}</span>
                  </td>
                  <td className="hidden py-3 pr-3 sm:table-cell">{iron}</td>
                  <td className="hidden py-3 md:table-cell">{store}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
