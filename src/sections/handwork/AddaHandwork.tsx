// src/sections/handwork/AddaHandwork.tsx
// On the adda: a wooden embroidery frame drawn with cloth stretched in it,
// and chips for each kind of handwork they do that switch the stitch shown
// on the cloth. (Lab: emb D, "On the adda".)
//
// Only works in their own services that have a drawn texture
// (stitchTextures); needs one. The texture is a drawing of the stitch,
// not their work. The cloth swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { STITCHES, Texture } from './stitchTextures'

export default function AddaHandwork() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.flatMap((g) => g.items)
  const stitches = STITCHES.filter((s) => items.some((i) => s.match.test(i)))
  const [index, setIndex] = useState(0)
  if (!stitches.length) return null
  const stitch = stitches[index] ?? stitches[0]

  return (
    <section id="handwork-adda" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">On the adda</h2>
          <p className="mt-4 max-w-[34ch] text-muted">Handwork is stretched tight on a wooden frame, the adda, and worked by hand.</p>
          {stitches.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Kind of work">
              {stitches.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${stitch.name.toLowerCase()} on my outfit.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about {stitch.name.toLowerCase()}
            </Button>
          </div>
        </div>
        <figure className="md:col-span-7">
          {/* The frame: two wooden rails with the cloth between them. */}
          <div className="rounded-sm bg-[#8a5a33] p-4 md:p-6">
            <div className="rounded-sm bg-[#a87447] p-2">
              <div key={stitch.id} className="aspect-[16/10] animate-[fade-in_700ms_var(--ease-stitch)] overflow-hidden">
                <Texture kind={stitch.id} size={28} />
              </div>
            </div>
          </div>
          <figcaption className="t-small mt-3 text-center text-muted">{stitch.name}, drawn</figcaption>
        </figure>
      </div>
    </section>
  )
}
