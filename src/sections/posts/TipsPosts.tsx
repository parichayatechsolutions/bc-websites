// src/sections/posts/TipsPosts.tsx
// One-minute tips: dark, short clips as cards in a grid, each titled by
// its note, each playing only when she taps it. (Lab: blog N, "One-minute
// tips", as a wrapping grid rather than a sideways rail, which would
// scroll the page on a phone.)
//
// From `media.tipVideos` (tip-01.mp4…), up to six; hides without any. A
// tip without a note has no title (the validator flags it). The clips have
// the browser's controls and never loop.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function TipsPosts() {
  const { boutique } = useBoutique()
  const tips = (boutique.media.tipVideos ?? []).slice(0, 6)
  const captions = boutique.media.captions ?? {}
  if (!tips.length) return null

  return (
    <section id="tips" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">One-minute tips</h2>
        <ul className={`mt-12 grid gap-x-4 gap-y-8 ${tips.length > 1 ? 'grid-cols-2 lg:grid-cols-3' : 'max-w-xs'}`}>
          {tips.map((f) => (
            <li key={f}>
              <figure>
                <div className="aspect-[9/14] overflow-hidden rounded-2xl bg-light/5">
                  <Media file={f} alt={captions[f] ?? 'A tip from our workroom'} controls />
                </div>
                {captions[f] && <figcaption className="t-3 mt-3 text-pretty">{captions[f]}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question after watching your tips.`)} icon={IconBrandWhatsapp}>
            Ask us anything
          </Button>
        </div>
      </div>
    </section>
  )
}
