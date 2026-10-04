// src/sections/classes/PosterClasses.tsx
// A workshop poster for their next class: the name set huge on the brand
// colour, then the level, length, start date and fee in a ruled grid, the
// boutique's name at the foot like a printed bill. (Lab: class K,
// "Workshop poster".)
//
// The class whose next batch is soonest, else the first listed; a start
// date that has passed isn't shown, and the fee only with permission.
// Hides without classes. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { fitDisplay } from '../../theme/theme'

const today = () => new Date().toLocaleDateString('en-CA')
const long = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function PosterClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  if (!classes.length) return null

  const upcoming = classes.filter((c) => c.nextBatch && c.nextBatch >= today()).sort((a, b) => a.nextBatch!.localeCompare(b.nextBatch!))
  const course = upcoming[0] ?? classes[0]
  const starts = course.nextBatch && course.nextBatch >= today() ? long(course.nextBatch) : undefined
  const facts = [
    course.level && { label: 'Level', value: course.level },
    course.length && { label: 'Length', value: course.length },
    starts && { label: 'Starts', value: starts },
    boutique.permissions.showPrices && course.fee && { label: 'Fee', value: rupees(course.fee) },
  ].filter((f): f is { label: string; value: string } => Boolean(f))

  return (
    <section id="classes" className="section">
      <div className="wrap max-w-4xl">
        <div className="bg-primary p-8 text-on-primary md:p-14">
          <h2 className="t-hero text-balance" style={fitDisplay(course.name, 9, 7)}>
            {course.name}
          </h2>
          {facts.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 border-t-2 border-on-primary/40 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-on-primary/25 py-4 pr-4">
                  <dt className="t-small opacity-80">{f.label}</dt>
                  <dd className="mt-1 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to join the ${course.name} class.`)} variant="accent" icon={IconBrandWhatsapp}>
              Ask to join
            </Button>
            <p className="font-display text-lg">{boutique.brand.name}</p>
          </div>
        </div>
        {classes.length > 1 && (
          <p className="mt-6 text-muted">Also: {classes.filter((c) => c !== course).map((c) => c.name).join(' · ')}</p>
        )}
      </div>
    </section>
  )
}
