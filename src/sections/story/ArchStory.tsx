// src/sections/story/ArchStory.tsx
// The story beside an arched photograph with a name plate at its foot,
// and their numbers in a ruled row beneath the story: years, their own
// stats, the rating. (Lab: story D, "Arch portrait + numbers".)
//
// The photo is the owner's portrait with permission; otherwise their
// workroom or storefront, and the plate names the boutique instead. The
// numbers come from trustFacts. Needs the owner's story.
//
// Motion: the numbers count up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustFacts } from '../trust/trustFacts'
import { useStory } from './storyShared'

export default function ArchStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, portrait } = useStory()
  const root = useRef<HTMLElement>(null)
  const facts = trustFacts(boutique).slice(0, 3)
  const photo = portrait ?? boutique.media.teamAtWork ?? boutique.media.storefront

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (!paragraphs.length) return null

  return (
    <section ref={root} id="story" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {photo && (
          <figure className="relative mx-auto w-full max-w-sm md:col-span-5">
            <div className="arch aspect-[3/4] bg-paper">
              <Media file={photo} alt={portrait ? owner.name : `${boutique.brand.name}`} />
            </div>
            <figcaption className="absolute inset-x-6 -bottom-5 bg-light px-4 py-3 text-center ring-1 ring-ink/10">
              <span className="block font-semibold">{portrait ? owner.name : boutique.brand.name}</span>
              {portrait && owner.role && <span className="t-small text-muted">{owner.role}</span>}
            </figcaption>
          </figure>
        )}
        <div className={photo ? 'md:col-span-7' : 'md:col-span-9'}>
          <h2 className="t-1 max-w-[12ch] text-balance">Our story</h2>
          <div className="mt-8 max-w-[56ch] space-y-4">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {!portrait && (
            <p className="mt-6 font-semibold">
              {owner.name}
              {owner.role && <span className="font-normal text-muted">, {owner.role}</span>}
            </p>
          )}
          {facts.length > 0 && (
            <dl className="mt-10 grid grid-cols-3 border-t-2 border-ink">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse justify-end border-r border-ink/15 py-5 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
                  <dt className="t-small mt-1 text-muted">{f.label}</dt>
                  <dd data-count className="t-2 tabular-nums text-primary-ink">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}
