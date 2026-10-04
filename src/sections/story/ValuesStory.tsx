// src/sections/story/ValuesStory.tsx
// What they stand by, as three cards with an icon each (made to measure,
// usually ready in so many days, the handwork they do), under the opening
// of the owner's story. (Lab: story M, "Values".)
//
// The cards are trustPromises, so each is backed by their data; the
// story's first sentence only when there is one, signed only when it's
// in the owner's own voice. Needs two cards. No
// motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { trustPromises } from '../trust/trustFacts'
import { useStory } from './storyShared'

export default function ValuesStory() {
  const { boutique } = useBoutique()
  const { owner, first, ownVoice } = useStory()
  const values = trustPromises(boutique)
    .filter((p) => !/whatsapp/i.test(p.title))
    .slice(0, 3)
  if (values.length < 2) return null

  return (
    <section id="story" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">What we stand by</h2>
        {first && (
          <p className="t-lead mt-6 max-w-[48ch] text-muted">
            {first}
            {ownVoice && <span className="whitespace-nowrap"> — {owner.name}</span>}
          </p>
        )}
        <ul className={`mt-12 grid gap-4 ${values.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl bg-paper p-7 md:p-8">
              <Icon size={32} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              <h3 className="t-3 mt-6">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
