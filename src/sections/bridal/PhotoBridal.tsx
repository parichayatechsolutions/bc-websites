// src/sections/bridal/PhotoBridal.tsx
// A bridal piece in a tall arch beside the packages as a ruled list: each
// package's name, what's included in a line, and its starting price, then
// one button to book a consult. (Lab: bridal H, "Photo + list".)
//
// Packages from `bridalPackages`, prices only with permission; hides
// without packages. The photo is their first bridal piece, or first piece.
//
// Motion: the photo settles once as it comes into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useBridal } from './bridalShared'

export default function PhotoBridal() {
  const { boutique } = useBoutique()
  const { packages, price, pricesShown, consult } = useBridal()
  const root = useRef<HTMLElement>(null)
  const work = boutique.media.work
  const photo = work.find((f) => photoCategory(f) === 'Bridal') ?? work[0] ?? boutique.media.hero.src

  useMotion(root, () => {
    settle('[data-photo]', { trigger: root.current })
  })

  if (!packages.length) return null

  return (
    <section ref={root} id="bridal" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="arch aspect-[3/4] w-full max-w-md bg-paper md:col-span-5">
          <div data-photo className="h-full w-full">
            <Media file={photo} alt="" />
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">For the bride</h2>
          <ul className="mt-10 border-t border-ink/15">
            {packages.map((p) => (
              <li key={p.name} className="border-b border-ink/15 py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="t-3">{p.name}</h3>
                  {price(p) && <span className="text-primary-ink">{price(p)}</span>}
                </div>
                {p.includes.length > 0 && <p className="mt-2 text-muted">{capitalise(p.includes.join(', '))}.</p>}
              </li>
            ))}
          </ul>
          {pricesShown && <p className="t-small mt-4 text-muted">Starting prices. The final price depends on your design and fabric.</p>}
          <div className="mt-8">
            <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
              Book a bridal consult
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
