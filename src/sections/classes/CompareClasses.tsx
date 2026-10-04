// src/sections/classes/CompareClasses.tsx
// Their classes compared in one table: level, length, next batch and fee
// side by side, so a student can choose at a glance.
// (Lab: class O, "Compare classes".)
//
// From `classes`; needs two or more. A batch that has started shows as
// "Ask us"; fees only with permission. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function CompareClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  if (classes.length < 2) return null
  const today = new Date().toLocaleDateString('en-CA')
  const showFees = boutique.permissions.showPrices && classes.some((c) => c.fee)

  return (
    <section id="classes" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Compare our classes</h2>
        <table className="t-small mt-12 w-full border-collapse text-left md:text-base">
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="py-3 pr-3 font-semibold">Class</th>
              <th scope="col" className="hidden py-3 pr-3 font-semibold sm:table-cell">Level</th>
              <th scope="col" className="py-3 pr-3 font-semibold">Length</th>
              <th scope="col" className="py-3 pr-3 font-semibold">Next batch</th>
              {showFees && <th scope="col" className="py-3 font-semibold">Fee</th>}
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c.name} className="border-b border-ink/15 align-top">
                <th scope="row" className="py-4 pr-3 font-semibold text-primary-ink">
                  {c.name}
                  {c.level && <span className="block font-normal text-muted sm:hidden">{c.level}</span>}
                </th>
                <td className="hidden py-4 pr-3 sm:table-cell">{c.level ?? '–'}</td>
                <td className="py-4 pr-3">{c.length ?? '–'}</td>
                <td className="py-4 pr-3">
                  {c.nextBatch && c.nextBatch >= today ? new Date(`${c.nextBatch}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Ask us'}
                </td>
                {showFees && <td className="py-4 tabular-nums">{c.fee ? rupees(c.fee) : '–'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to know more about your classes.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about classes
          </Button>
        </div>
      </div>
    </section>
  )
}
