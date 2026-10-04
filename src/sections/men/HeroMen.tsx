// src/sections/men/HeroMen.tsx
// Dark, a full-width photograph of their men's work with one line in
// large type beside it ("Cut for you, not for a size") and a button to
// ask. Opens a men's page or section. (Lab: men R, "Hero".)
//
// The line is true of made-to-measure tailoring. Photo from
// work-men-<nn>.jpg; needs one and a Men group. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function HeroMen() {
  const { boutique } = useBoutique()
  const forMen = boutique.services.groups.some((g) => /^men/i.test(g.title))
  const photo = boutique.media.work.find((f) => photoCategory(f) === 'Men')
  if (!forMen || !photo) return null
  const caption = boutique.media.captions?.[photo]

  return (
    <section id="men" className="bg-dark text-light">
      <div className="grid md:min-h-[80svh] md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden bg-light/5 md:aspect-auto">
          <Media file={photo} alt={caption ?? `Men’s tailoring by ${boutique.brand.name}`} />
        </div>
        <div className="flex flex-col justify-center px-5 py-14 md:px-[6vw]">
          <h2 className="t-hero max-w-[10ch] text-balance">Cut for you, not for a size</h2>
          {caption && <p className="t-lead mt-6 max-w-[32ch] text-light/80">{caption}</p>}
          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for a man.`)} icon={IconBrandWhatsapp}>
              Ask about men’s tailoring
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
