// src/sections/gallery/CoverflowGallery.tsx
// Dark. Centre photo large, neighbours turned away in perspective; arrows step through.
// (Lab: gallery T, "Coverflow".)

import { useState } from 'react'
import { IconArrowLeft, IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function CoverflowGallery() {
  const { boutique } = useBoutique()
  const photos = boutique.media.work
  const [active, setActive] = useState(0)

  if (!photos.length) return null

  const len = photos.length
  const currentPhoto = photos[active] ?? photos[0]
  const currentCategory = photoCategory(currentPhoto) ?? 'Bespoke Work'

  const step = (delta: number) => {
    setActive((prev) => (prev + delta + len) % len)
  }

  return (
    <section id="work" className="relative overflow-hidden bg-dark py-16 text-light md:py-24">
      <div className="wrap text-center">
        <h2 className="t-1 text-balance">Our work</h2>
        <p className="mt-3 font-display text-xl text-accent-on-dark md:text-2xl">
          {currentCategory} · {active + 1} of {len}
        </p>
      </div>

      <div
        className="relative mx-auto my-8 h-[380px] w-full max-w-5xl md:my-10 md:h-[520px]"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {photos.map((file, i) => {
          let r = i - active
          if (r > len / 2) r -= len
          if (r < -len / 2) r += len
          const a = Math.abs(r)
          const isCenter = r === 0

          return (
            <div
              key={file}
              onClick={() => setActive(i)}
              className="absolute top-0 left-1/2 aspect-[3/4] h-full -translate-x-1/2 cursor-pointer overflow-hidden rounded-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(0%) translateX(${r * 58}%) translateZ(-${a * 150}px) rotateY(${isCenter ? 0 : r > 0 ? -38 : 38}deg) scale(${isCenter ? 1 : 0.85})`,
                zIndex: 20 - a,
                opacity: a > 2 ? 0 : isCenter ? 1 : 0.65,
                border: isCenter ? '2px solid var(--c-accent)' : '1px solid rgba(255,255,255,0.12)',
                boxShadow: isCenter ? '0 30px 60px -15px rgba(0,0,0,0.9)' : '0 10px 25px -10px rgba(0,0,0,0.5)',
                pointerEvents: a > 2 ? 'none' : 'auto',
              }}
            >
              <Media file={file} alt={isCenter ? `Work by ${boutique.brand.name} - ${currentCategory}` : ''} priority={isCenter} />
            </div>
          )
        })}
      </div>

      <div className="wrap flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-colors duration-200 hover:bg-light hover:text-dark"
          >
            <IconArrowLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-accent text-on-accent transition-transform duration-200 hover:scale-105"
          >
            <IconArrowRight size={22} aria-hidden="true" />
          </button>
        </div>

        <div>
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I loved this ${currentCategory} from your gallery and would like to consult on a similar design.`)}
            icon={IconBrandWhatsapp}
          >
            Ask about this {currentCategory.replace(/s$/i, '')}
          </Button>
        </div>
      </div>
    </section>
  )
}
