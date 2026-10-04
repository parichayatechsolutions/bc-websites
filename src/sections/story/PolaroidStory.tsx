// src/sections/story/PolaroidStory.tsx
// A tilted instant photo beside the story, with what they're known for in
// a callout beneath it. Personal and a little informal.
// (Lab: story G, "Polaroid".)
//
// The photo is the owner's portrait with permission; otherwise their
// workroom or storefront, captioned as such, never a stand-in face. Needs
// the owner's story. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { joinList } from '../../app/text'
import Media from '../../components/Media'
import { useStory } from './storyShared'

export default function PolaroidStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, portrait } = useStory()
  if (!paragraphs.length) return null

  const photo = portrait ?? boutique.media.teamAtWork ?? boutique.media.storefront
  const caption = portrait ? owner.name : boutique.media.teamAtWork ? 'Our workroom' : boutique.brand.name
  const known = boutique.services.featured

  return (
    <section id="story" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {photo && (
          <figure className="mx-auto w-full max-w-xs -rotate-3 bg-light p-3 pb-5 ring-1 ring-ink/10 md:col-span-5">
            <div className="aspect-square overflow-hidden bg-paper">
              <Media file={photo} alt={caption} />
            </div>
            <figcaption className="t-3 mt-4 text-center font-display">{caption}</figcaption>
          </figure>
        )}
        <div className={photo ? 'md:col-span-7' : 'md:col-span-8'}>
          <h2 className="t-1 max-w-[12ch] text-balance">Our story</h2>
          <div className="mt-8 max-w-[56ch] space-y-4">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 font-semibold text-primary-ink">
            {owner.name}
            {owner.role && <span className="font-normal text-muted">, {owner.role}</span>}
          </p>
          {known.length > 0 && (
            <p className="mt-10 rounded-2xl bg-paper px-6 py-5">
              <span className="text-muted">Known for </span>
              <span className="font-semibold">{joinList(known, true)}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
