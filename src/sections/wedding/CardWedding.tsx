// src/sections/wedding/CardWedding.tsx
// The wardrobe plan as a wedding invitation: a framed card listing each
// function in order with what the bride often wears to it, and a button
// to plan hers with them. (Lab: wed B, "Wedding card".)
//
// General guidance (weddingShared), no dates. Shows only for a boutique
// that does bridal work. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { FUNCTIONS, useWedding } from './weddingShared'

export default function CardWedding() {
  const { boutique } = useBoutique()
  const { doesBridal, consult } = useWedding()
  if (!doesBridal) return null

  return (
    <section id="wedding" className="section bg-paper">
      <div className="wrap">
        <div className="mx-auto max-w-xl border-2 border-accent bg-light p-2">
          <div className="border border-accent/60 px-6 py-10 text-center md:px-12">
            <h2 className="t-1 font-display text-balance text-primary-ink">The wedding wardrobe</h2>
            <span aria-hidden="true" className="zari mx-auto mt-6 block w-24" />
            <ol className="mt-8 space-y-5">
              {FUNCTIONS.map((f) => (
                <li key={f.name}>
                  <p className="t-3">{f.name}</p>
                  <p className="t-small mt-1 text-muted">{f.wear}</p>
                </li>
              ))}
            </ol>
            <p className="t-small mt-10 text-muted">{boutique.brand.name}</p>
            <div className="mt-4">
              <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
                Plan yours with us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
