// src/sections/classes/TeacherClasses.tsx
// Meet your teacher: the person who teaches, large (portrait only with
// their yes; their initial otherwise), with their role, years and their
// line, and the classes beneath. (Lab: class I, "Your teacher".)
//
// The teacher is a team member whose role says they teach (teacher,
// trainer, instructor); nobody is assumed to. Their line wears quotation
// marks only when it's in their own voice. Needs `classes` and a teacher;
// hides otherwise. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

const TEACHES = /teach|trainer|instructor|faculty|tutor/i
const OWN_VOICE = /\b(i|i'm|i’m|i've|i’ve|my|me|we|our|us)\b/i

export default function TeacherClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  const teacher = (boutique.team ?? []).find((p) => TEACHES.test(p.role))
  if (!classes.length || !teacher) return null
  const first = teacher.name.split(' ')[0]

  return (
    <section id="classes" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          {teacher.photo ? (
            <div className="arch aspect-[3/4] w-full max-w-xs bg-paper">
              <Media file={teacher.photo} alt={teacher.name} />
            </div>
          ) : (
            <span aria-hidden="true" className="grid aspect-square w-40 place-items-center rounded-full bg-paper font-display text-7xl text-primary-ink">
              {first.charAt(0)}
            </span>
          )}
        </div>
        <div className="md:col-span-8">
          <h2 className="t-1 max-w-[14ch] text-balance">Learn with {first}</h2>
          <p className="mt-3 text-muted">
            {teacher.role}
            {teacher.years ? ` · ${teacher.years} years` : ''}
          </p>
          {teacher.line &&
            (OWN_VOICE.test(teacher.line) ? (
              <blockquote className="t-lead mt-8 max-w-[44ch]">“{teacher.line}”</blockquote>
            ) : (
              <p className="t-lead mt-8 max-w-[44ch]">{teacher.line}</p>
            ))}
          <ul className="mt-10 border-t border-ink/15">
            {classes.map((c) => (
              <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/15 py-4">
                <span className="t-3">{c.name}</span>
                <span className="t-small text-muted">{[c.level, c.length].filter(Boolean).join(' · ')}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to join one of ${first}'s classes.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask to join
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
