// src/sections/handwork/RowsHandwork.tsx
// The kinds of handwork they do: Aari work, Maggam work, Zardosi, etc.
// Each craft presented as a rich card with photo thumbnail, technique details,
// and hover scale-105 highlight zoom.

import { useRef } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import type { PhotoFile } from '../../types/boutique'

const CRAFTS: {
  name: string
  match: RegExp
  what: string
  suits: string
  defaultPhoto: string
}[] = [
  {
    name: 'Aari work',
    match: /aari/i,
    what: 'Fine chain-stitch embroidery worked with a hooked needle on a frame. Delicate and detailed.',
    suits: 'blouses, necklines and sleeves',
    defaultPhoto: 'closeup-01.jpg',
  },
  {
    name: 'Maggam work',
    match: /maggam/i,
    what: 'Raised embroidery with zari thread, stones and beads, worked on a wooden frame.',
    suits: 'bridal blouses',
    defaultPhoto: 'closeup-02.jpg',
  },
  {
    name: 'Zardosi',
    match: /zardosi|zardozi/i,
    what: 'Rich embroidery in metallic thread, often with sequins and beads.',
    suits: 'bridal lehengas and borders',
    defaultPhoto: 'work-bridal-01.jpg',
  },
  {
    name: 'Mirror, bead and stone work',
    match: /mirror|bead|stone/i,
    what: 'Small mirrors, beads or stones stitched in place by hand.',
    suits: 'festive wear and lehengas',
    defaultPhoto: 'work-blouse-02.jpg',
  },
  {
    name: 'Hand embroidery',
    match: /hand embroidery/i,
    what: 'Embroidery stitched entirely by hand in thread.',
    suits: 'one-of-a-kind pieces',
    defaultPhoto: 'work-blouse-03.jpg',
  },
  {
    name: 'Kantha stitch',
    match: /kantha/i,
    what: 'Running-stitch embroidery from Bengal, quiet and textured.',
    suits: 'sarees and dupattas',
    defaultPhoto: 'work-saree-01.jpg',
  },
  {
    name: 'Chikankari work',
    match: /chikan/i,
    what: 'Delicate white-on-white shadow work from Lucknow.',
    suits: 'summer kurtas and sarees',
    defaultPhoto: 'work-blouse-01.jpg',
  },
  {
    name: 'Machine embroidery',
    match: /machine embroidery/i,
    what: 'Even, repeatable patterns stitched by machine; quicker and lighter on the budget.',
    suits: 'everyday blouses and kurtis',
    defaultPhoto: 'team-at-work.jpg',
  },
]

export default function RowsHandwork({ id = 'handwork' }: { id?: string }) {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-handwork-card]', { trigger: root.current })
  })

  const matched = boutique.services.groups
    .flatMap((g) => g.items)
    .map((item) => ({ item, craft: CRAFTS.find((c) => c.match.test(item)) }))
    .filter((w): w is { item: string; craft: (typeof CRAFTS)[number] } => Boolean(w.craft))

  const works = matched.length >= 2 ? matched : CRAFTS.slice(0, 6).map((c) => ({ item: c.name, craft: c }))

  const workPhotos = boutique.media?.work || []

  return (
    <section
      ref={root}
      id={id}
      className="relative overflow-hidden py-10 md:py-14 border-t border-b border-ink/10 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(248, 243, 252, 0.80), rgba(240, 233, 247, 0.87)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      {/* Shading ambient purple gradient layers */}
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#7B2E96]/15 blur-3xl opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#6B2485]/12 blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/[0.02] to-black/[0.05]"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span className="h-[1.5px] w-6 bg-accent" />
          <span>ARTISANAL EMBROIDERY</span>
        </div>

        {/* Heading */}
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              The <span className="italic text-accent font-serif">handwork</span> we do
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-muted">
              Every motif, stitch, and stone is crafted by hand in our atelier with needle, zari, and thread.
            </p>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted md:pb-1">
            {works.length} artisanal techniques
          </p>
        </div>

        {/* Handwork Cards Grid */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {works.map(({ item, craft }, i) => {
            const photoFile = (craft.defaultPhoto || workPhotos[i % workPhotos.length] || 'closeup-01.jpg') as PhotoFile

            return (
              <li key={item} data-handwork-card className="flex">
                <a
                  href={whatsappLink(
                    boutique,
                    `Hi ${boutique.brand.name}, I would like to inquire about ${item} handwork design.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask about ${item} on WhatsApp`}
                  className="group relative flex w-full flex-col rounded-sm bg-white/92 p-5 md:p-6 border border-ink/10 shadow-sm backdrop-blur-xs transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 hover:border-accent hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#FAF6F0] border border-ink/10 transition-all duration-300 ease-out group-hover:border-accent/40">
                    <span className="absolute top-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-sm bg-white/95 text-accent shadow-xs border border-accent/20 text-xs font-mono font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex h-full w-full items-center justify-center overflow-hidden">
                      <Media
                        file={photoFile}
                        alt={item}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="flex flex-1 flex-col pt-5">
                    <h3 className="font-serif text-2xl font-normal italic tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
                      {item}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-ink/85">
                      {craft.what}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between border-t border-ink/10 pt-3 text-xs text-muted transition-colors duration-200 group-hover:border-accent/40">
                        <span className="font-medium text-muted/90 group-hover:text-ink">
                          Best for <span className="font-semibold text-primary-ink">{craft.suits}</span>
                        </span>
                        <IconArrowRight
                          size={16}
                          stroke={1.75}
                          className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1.5 group-hover:text-accent"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
