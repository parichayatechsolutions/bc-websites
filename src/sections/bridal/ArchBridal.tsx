// src/sections/bridal/ArchBridal.tsx
// Each bridal package inside a tall temple arch with a fine gold edge: its
// name, starting price and what's in it, and a link to ask. The arch
// family's packages. (Lab: bridal E, "Arch cards".)
//
// From `bridalPackages`, prices only with permission; hides without
// packages.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useBridal } from './bridalShared'

export default function ArchBridal() {
  const { packages, price, pricesShown, ask, consult } = useBridal()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (!packages.length) return null

  return (
    <section ref={root} id="bridal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Bridal packages</h2>
        <ul className={`mt-12 grid gap-6 ${packages.length > 2 ? 'md:grid-cols-3' : packages.length === 2 ? 'md:grid-cols-2' : 'max-w-md'}`}>
          {packages.map((p) => (
            <li key={p.name} data-arch className="arch flex flex-col items-center border border-accent px-6 pt-20 pb-8 text-center md:pt-24">
              <h3 className="t-2 text-primary-ink">{p.name}</h3>
              {price(p) && <p className="t-3 mt-2">{price(p)}</p>}
              {p.includes.length > 0 && <p className="mt-5 mb-6 text-muted">{capitalise(p.includes.join(', '))}.</p>}
              <a href={ask(p)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask about {p.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
            Book a bridal consult
          </Button>
          {pricesShown && <p className="t-small text-muted">Starting prices. The final price depends on your design and fabric.</p>}
        </div>
      </div>
    </section>
  )
}
