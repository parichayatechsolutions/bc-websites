// src/sections/classes/CampClasses.tsx
// A summer or holiday camp: a photo of their workroom beside the camp's
// details in ruled rows (level, length, when it starts, fee) and a button
// to ask. (Lab: class P, "Summer camp".)
//
// Only for a class whose name says it's a camp (summer, holiday,
// vacation); hides otherwise. The fee only with permission; a start date
// that has passed isn't shown. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'

const today = () => new Date().toLocaleDateString('en-CA')
const long = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function CampClasses() {
  const { boutique } = useBoutique()
  const camp = (boutique.classes ?? []).find((c) => /camp|summer|holiday|vacation/i.test(c.name))
  if (!camp) return null
  const photo = boutique.media.teamAtWork ?? boutique.media.interior?.[0]
  const rows = [
    camp.level && ['For', camp.level],
    camp.length && ['How long', camp.length],
    camp.nextBatch && camp.nextBatch >= today() && ['Starts', long(camp.nextBatch)],
    boutique.permissions.showPrices && camp.fee && ['Fee', rupees(camp.fee)],
  ].filter(Boolean) as [string, string][]

  return (
    <section id="classes-camp" className="section">
      <div className={`wrap grid items-center gap-12 ${photo ? 'md:grid-cols-12 md:gap-16' : 'max-w-3xl'}`}>
        {photo && (
          <div className="aspect-[4/5] overflow-hidden bg-paper md:col-span-6">
            <Media file={photo} alt={`The workroom at ${boutique.brand.name}`} />
          </div>
        )}
        <div className={photo ? 'md:col-span-6' : ''}>
          <h2 className="t-1 text-balance">{camp.name}</h2>
          {rows.length > 0 && (
            <dl className="mt-8 border-t border-ink/15">
              {rows.map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4">
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to join the ${camp.name}.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask to join
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
