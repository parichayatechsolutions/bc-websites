// src/sections/story/InkStory.tsx
// The owner's story in their own words. The words ink in as the visitor
// reads down, the way thread fills a traced pattern.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { EASE, gsap, MEDIA, SCRUB, SplitText, STAGGER, useGSAP } from '../../motion/gsap'

export default function InkStory() {
  const { boutique } = useBoutique()
  const { owner, established } = boutique
  const root = useRef<HTMLElement>(null)
  const showPhoto = boutique.permissions.showOwnerPhoto && owner.photo

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        const split = SplitText.create('[data-story-text]', { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: EASE.scroll,
            stagger: STAGGER.words,
            scrollTrigger: { trigger: '[data-story-text]', start: 'top 75%', end: 'bottom 45%', scrub: SCRUB.exact },
          },
        )
        gsap.from('[data-story-photo]', {
          yPercent: 12,
          ease: EASE.scroll,
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: SCRUB.exact },
        })
        return () => split.revert()
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  if (!owner.story) return null

  return (
    <section ref={root} className="section">
      <div className="wrap grid items-end gap-12 md:grid-cols-12">
        <blockquote className={showPhoto ? 'md:col-span-8' : 'md:col-span-10'}>
          <p data-story-text className="t-lead max-w-[34ch] text-ink">
            {owner.story}
          </p>
          <footer className="mt-10 flex items-baseline gap-4">
            <span className="t-3 text-primary-ink">{owner.name}</span>
            {owner.role && <span className="text-muted">{owner.role}</span>}
          </footer>
        </blockquote>

        {showPhoto && (
          <figure className="md:col-span-4">
            <div data-story-photo className="arch aspect-[3/4] w-full max-w-sm">
              <Media file={owner.photo} alt={owner.name} />
            </div>
            {established && (
              <figcaption className="t-small mt-4 text-muted">Stitching since {established}</figcaption>
            )}
          </figure>
        )}
      </div>
    </section>
  )
}
