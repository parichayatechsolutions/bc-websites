// src/sections/blouse/PhotoBlouse.tsx
// Make it yours: one of their blouses photographed beside the designer,
// so she starts from a real piece and changes the neck, back or sleeves;
// the message says which photo she began from. (Lab: blouse U, "Make it
// yours".)
//
// The photo is a blouse of theirs (work-blouse-<nn>.jpg); the drawing
// doesn't pretend to match it, it's her changes. Shows only for a
// boutique that stitches blouses and has a blouse photo. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { BACKS, BlouseFlat, describe, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

export default function PhotoBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const photo = boutique.media.work.find((f) => photoCategory(f) === 'Blouses')
  const caption = photo ? boutique.media.captions?.[photo] : undefined
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  if (!stitchesBlouses || !photo) return null

  const message = `Hi ${boutique.brand.name}, I like the blouse on your site${caption ? ` (${caption})` : ''}. Could I have one like it with ${describe(neck, back, sleeve)}?`

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <figure className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-paper">
            <Media file={photo} alt={caption ?? 'A blouse we stitched'} />
          </div>
          {caption && <figcaption className="t-small mt-3 text-muted">{caption}</figcaption>}
        </figure>
        <div className="space-y-6 md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">Make it yours</h2>
          <p className="text-muted">Start from this one and change what you like.</p>
          <Choices label="Neck" options={NECKS} value={neck} onChange={setNeck} />
          <Choices label="Back" options={BACKS} value={back} onChange={setBack} />
          <Choices label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
          <div className="grid max-w-md grid-cols-2 gap-3 bg-paper p-4">
            <div className="aspect-[5/4]">
              <BlouseFlat neck={neck} sleeve={sleeve} />
            </div>
            <div className="aspect-[5/4]">
              <BlouseFlat neck={back} sleeve={sleeve} back />
            </div>
          </div>
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Send my changes
          </Button>
        </div>
      </div>
    </section>
  )
}
