// src/sections/classes/LevelsClasses.tsx
// Their classes by level, in ruled columns (beginner, intermediate,
// advanced), so a student finds where to start. (Lab: class E, "Three
// levels".)
//
// From `classes`, grouped by the level they gave; needs at least two levels,
// otherwise CardsClasses suits better. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const ORDER = ['beginner', 'intermediate', 'advanced']

export default function LevelsClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  const levels = [...new Set(classes.map((c) => c.level).filter((l): l is string => Boolean(l)))].sort((a, b) => {
    const rank = (l: string) => {
      const at = ORDER.findIndex((o) => l.toLowerCase().startsWith(o))
      return at === -1 ? ORDER.length : at
    }
    return rank(a) - rank(b)
  })
  if (levels.length < 2) return null

  return (
    <section id="levels" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Where to start</h2>
        <div className={`mt-12 grid gap-10 ${levels.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {levels.map((level) => (
            <div key={level} className="border-t-2 border-primary-ink pt-6">
              <h3 className="t-2">{level}</h3>
              <ul className="mt-5 space-y-4">
                {classes
                  .filter((c) => c.level === level)
                  .map((c) => (
                    <li key={c.name}>
                      <span className="block">{c.name}</span>
                      {c.length && <span className="t-small text-muted">{c.length}</span>}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, which class should I start with?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask which to start with
          </Button>
        </div>
      </div>
    </section>
  )
}
