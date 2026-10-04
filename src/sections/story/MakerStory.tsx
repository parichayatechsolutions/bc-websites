// src/sections/story/MakerStory.tsx
// Meet the maker: a short clip of the owner, which plays only when she
// taps it, beside the story in her words and her name.
// (Lab: story O, "Meet the maker".)
//
// Needs `media.makerVideo` (maker.mp4) and permission to show the owner,
// since the clip is her; the owner's photo is its still frame. The story
// shows beside it when there is one. The clip has the browser's controls
// and never plays or loops on its own.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { useStory } from './storyShared'

export default function MakerStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, portrait, ownVoice } = useStory()
  const clip = boutique.media.makerVideo
  if (!clip || !boutique.permissions.showOwnerPhoto) return null
  const note = boutique.media.captions?.[clip]

  return (
    <section id="story" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <figure className="md:col-span-6">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
            <Media file={clip} poster={portrait} alt={note ?? `${owner.name} on her work`} controls />
          </div>
          {note && <figcaption className="t-small mt-3 text-muted">{note}</figcaption>}
        </figure>
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[10ch] text-balance">Meet the maker</h2>
          {paragraphs.length > 0 && (
            <div className={`mt-8 max-w-[52ch] space-y-4 ${ownVoice ? 't-lead' : ''}`}>
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          )}
          <p className="mt-6 font-semibold text-primary-ink">
            {owner.name}
            {owner.role && <span className="font-normal text-muted">, {owner.role}</span>}
          </p>
        </div>
      </div>
    </section>
  )
}
