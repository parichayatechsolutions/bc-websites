// src/sections/bridal/MenuBridal.tsx
// The bridal packages as a dark, framed menu card: each package's name and
// starting price joined by a dotted leader, what's in it in a line beneath,
// and a link to ask about it. (Lab: bridal K, "Bridal menu".)
//
// From `bridalPackages`; prices only with permission (without them, no
// leaders, just the names). Hides without packages. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { capitalise, joinList } from '../../app/text'
import Button from '../../components/Button'
import { useBridal } from './bridalShared'

export default function MenuBridal() {
  const { boutique } = useBoutique()
  const { packages, price, ask, consult } = useBridal()
  if (!packages.length) return null

  return (
    <section id="bridal" className="section bg-dark text-light">
      <div className="wrap max-w-3xl">
        <div className="border border-accent-on-dark/60 p-2">
          <div className="border border-accent-on-dark/60 px-6 py-10 md:px-12 md:py-14">
            <h2 className="t-1 text-center text-balance">Bridal packages</h2>
            <p className="t-small mt-2 text-center text-accent-on-dark">{boutique.brand.name}</p>
            <ul className="mt-12 space-y-8">
              {packages.map((p) => (
                <li key={p.name}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="t-3 min-w-0">{p.name}</h3>
                    {price(p) && (
                      <>
                        <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-light/35" />
                        <span className="shrink-0 tabular-nums text-accent-on-dark">{price(p)}</span>
                      </>
                    )}
                  </div>
                  {p.includes.length > 0 && <p className="t-small mt-2 max-w-[56ch] text-light/75">{capitalise(joinList(p.includes, true))}.</p>}
                  <a href={ask(p)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold">
                    <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                    <span className="link-stitch">Ask about it</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <Button href={consult} icon={IconBrandWhatsapp}>
                Book a bridal consult
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
