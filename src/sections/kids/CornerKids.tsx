// src/sections/kids/CornerKids.tsx
// The kids' corner: what they stitch for children, the ages they stitch
// for, a row of their kids' work, and a button to ask. (Lab: kids A, "Who's
// it for", reworked: the config doesn't say which pieces are for girls,
// boys or babies, so it isn't split that way.)
//
// Needs a Kids group in their services; the photos are their work named
// work-kids-<nn>.jpg and drop away without them. No scroll motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function CornerKids() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^kid|child/i.test(g.title))?.items ?? []
  const photos = boutique.media.work.filter((f) => photoCategory(f) === 'Kids').slice(0, 4)
  const captions = boutique.media.captions ?? {}
  const ages = boutique.services.kidsAges

  if (!items.length) return null

  return (
    <section id="kids" className="section bg-paper">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">For the little ones</h2>
          {ages && <p className="t-lead mt-5 text-muted">Stitched for ages {ages.replace(/^ages?\s*/i, '')}.</p>}
          <ul className="mt-8 space-y-2">
            {items.map((item) => (
              <li key={item} className="t-3">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for my child.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about kids’ wear
            </Button>
          </div>
        </div>

        {photos.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 md:col-span-7">
            {photos.map((f) => (
              <li key={f}>
                <figure>
                  <div className="arch aspect-[3/4] bg-light">
                    <Media file={f} alt={captions[f] ?? ''} />
                  </div>
                  {captions[f] && <figcaption className="t-small mt-2 text-muted">{captions[f]}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
