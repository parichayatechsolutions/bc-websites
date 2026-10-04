// src/sections/kids/BoothKids.tsx
// Dark, their children's work as two photo-booth strips, each a column of
// frames on white card, tilted a little in opposite directions, beside an
// invitation to ask. (Lab: kids G, "Photo booth".)
//
// Photos named work-kids-<nn>.jpg, two to six, split between the strips.
// Hides with fewer than two. The tilt is fixed. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function BoothKids() {
  const { boutique } = useBoutique()
  const photos = boutique.media.work.filter((f) => photoCategory(f) === 'Kids').slice(0, 6)
  const captions = boutique.media.captions ?? {}
  if (photos.length < 2) return null
  const half = Math.ceil(photos.length / 2)
  const strips = [photos.slice(0, half), photos.slice(half)]

  return (
    <section id="kids" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Little ones, dressed up</h2>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for my child.`)} icon={IconBrandWhatsapp}>
              Ask about kids’ wear
            </Button>
          </div>
        </div>
        <div className="flex justify-center gap-6 md:col-span-7 md:gap-10">
          {strips.map((strip, s) => (
            <ul key={s} className={`w-[42%] max-w-48 space-y-2 bg-light p-2 pb-8 ${s ? 'mt-10 rotate-3' : '-rotate-3'}`}>
              {strip.map((f) => (
                <li key={f} className="aspect-square overflow-hidden bg-paper">
                  <Media file={f} alt={captions[f] ?? 'Children’s wear we stitched'} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
