// src/sections/blouse/SendBlouse.tsx
// "Saw a design you love?" A dashed card inviting her to send the photo
// on WhatsApp, beside a three-tap builder for when she'd rather pick:
// neck, back and sleeves, read back as a sentence. (Lab: blouse Y, "Send a
// design".)
//
// Shows only for a boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconPhotoUp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BACKS, describe, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

export default function SendBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  if (!stitchesBlouses) return null

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-8 md:grid-cols-2">
        <a
          href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I saw a blouse design I love. Here's the photo:`)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary-ink/50 p-10 text-center transition-[border-color,background-color] duration-200 ease-stitch hover:border-primary-ink hover:bg-paper"
        >
          <IconPhotoUp size={48} stroke={1.25} className="text-primary-ink" aria-hidden="true" />
          <span className="t-2 text-balance">Saw a design you love?</span>
          <span className="text-muted">Send us the photo on WhatsApp.</span>
          <span className="link-stitch mt-2 font-semibold text-primary-ink">Send the photo</span>
        </a>
        <div className="space-y-5 rounded-2xl bg-paper p-6 md:p-8">
          <h2 className="t-2">Or pick in three taps</h2>
          <Choices label="Neck" options={NECKS} value={neck} onChange={setNeck} />
          <Choices label="Back" options={BACKS} value={back} onChange={setBack} />
          <Choices label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
          <p aria-live="polite">A blouse with {describe(neck, back, sleeve)}.</p>
          <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
            Send this design
          </Button>
        </div>
      </div>
    </section>
  )
}
