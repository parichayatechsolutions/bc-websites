// src/sections/classes/HeroClasses.tsx
// A wide photograph of their workroom with a solid card over its foot
// holding the next class: its name, when the batch starts, its length and
// a button to ask. A class page's opener. (Lab: class U, "Hero".)
//
// The class whose next batch is soonest, else the first; a start date
// that has passed isn't shown. The photo is their workroom (teamAtWork or
// an interior photo); without one, the card stands alone. Hides without
// classes. No motion.

import { IconBrandWhatsapp, IconCalendarEvent } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

const today = () => new Date().toLocaleDateString('en-CA')
const long = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function HeroClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  if (!classes.length) return null
  const upcoming = classes.filter((c) => c.nextBatch && c.nextBatch >= today()).sort((a, b) => a.nextBatch!.localeCompare(b.nextBatch!))
  const course = upcoming[0] ?? classes[0]
  const starts = course.nextBatch && course.nextBatch >= today() ? long(course.nextBatch) : undefined
  const photo = boutique.media.teamAtWork ?? boutique.media.interior?.[0]

  return (
    <section id="classes" className="section">
      <div className="wrap">
        {photo && (
          <div className="aspect-[4/3] overflow-hidden bg-paper md:aspect-[21/9]">
            <Media file={photo} alt={`The workroom at ${boutique.brand.name}`} />
          </div>
        )}
        <div className={`relative rounded-2xl bg-light p-7 ring-1 ring-ink/10 md:max-w-xl md:p-10 ${photo ? '-mt-16 mx-4 md:-mt-28 md:ml-10' : ''}`}>
          <h2 className="t-1 text-balance">Learn to stitch</h2>
          <p className="t-3 mt-4 text-primary-ink">{course.name}</p>
          {[course.level, course.length].some(Boolean) && <p className="mt-1 text-muted">{[course.level, course.length].filter(Boolean).join(' · ')}</p>}
          {starts && (
            <p className="mt-4 flex items-center gap-2">
              <IconCalendarEvent size={20} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              Next batch starts {starts}
            </p>
          )}
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to join the ${course.name} class.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask to join
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
