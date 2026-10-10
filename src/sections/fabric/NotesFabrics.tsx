// src/sections/fabric/NotesFabrics.tsx
// "Know your fabric" - Innovative couture textile archive in a slim black translucent container
// Large visual swatch cards with fabric feel tags, texture zoom, and hover scale-105 highlight.

import { useRef } from 'react'
import { IconArrowRight, IconSparkles } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import type { PhotoFile } from '../../types/boutique'

interface FabricItem {
  name: string
  feel: string
  bestFor: string
  photo: PhotoFile
}

const DEFAULT_FABRICS: FabricItem[] = [
  {
    name: 'Pure Raw Silk',
    feel: 'Structured & Rich',
    bestFor: 'Bridal blouses, architectural structure, and heavy aari & zardosi embroidery',
    photo: 'work-blouse-01.jpg',
  },
  {
    name: 'Kanchipuram Silk',
    feel: 'Heirloom Weave',
    bestFor: 'Muhurtham bridal blouses, traditional pure zari motifs, and temple borders',
    photo: 'work-bridal-01.jpg',
  },
  {
    name: 'Pure Georgette',
    feel: 'Flowing & Fluid',
    bestFor: 'Flowing lehengas, festive anarkalis, delicate pleats, and soft breezy drapes',
    photo: 'work-lehenga-01.jpg',
  },
  {
    name: 'Brocade & Katan',
    feel: 'Royal & Opulent',
    bestFor: 'Royal jackets, heavy banarasi flared skirts, and statement ceremonial wear',
    photo: 'work-bridal-02.jpg',
  },
  {
    name: 'Organza & Tissue',
    feel: 'Lightweight & Sheer',
    bestFor: 'Contemporary sheer puff sleeves, lightweight dupattas, and modern styling',
    photo: 'work-blouse-02.jpg',
  },
  {
    name: 'Chanderi Silk',
    feel: 'Subtle Luster',
    bestFor: 'Summer festive suits, lightweight boutique kurtas, and fine subtle sheen',
    photo: 'work-saree-01.jpg',
  },
]

export default function NotesFabrics({ id = 'fabrics' }: { id?: string }) {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-fabric-card]', { trigger: root.current })
  })

  const customFabrics = boutique.fabrics ?? []
  const workPhotos = boutique.media?.work || []

  const fabrics: FabricItem[] =
    customFabrics.length > 0
      ? customFabrics.map((cf, i) => {
        const defaultRef = DEFAULT_FABRICS[i % DEFAULT_FABRICS.length]
        return {
          name: cf.name,
          feel: defaultRef.feel,
          bestFor: cf.bestFor || defaultRef.bestFor,
          photo: (cf.photo || workPhotos[i % workPhotos.length] || defaultRef.photo) as PhotoFile,
        }
      })
      : DEFAULT_FABRICS.map((d, i) => ({
        ...d,
        photo: (workPhotos[i % workPhotos.length] || d.photo) as PhotoFile,
      }))

  return (
    <section
      ref={root}
      id={id}
      className="relative overflow-hidden py-20 md:py-28 text-white border-t border-b border-accent/30 bg-gradient-to-b from-[#2A0E38] via-[#1C0726] to-[#2A0E38]"
    >
      {/* Background ambient purple and gold luxury glow */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#5B2A6E]/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-white/15 pb-8">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-[1.5px] w-6 bg-accent" />
              <span>COUTURE TEXTILE ARCHIVE</span>
            </div>

            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              Know your <span className="italic text-accent font-serif">fabric</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-stone-300/85">
              Examine the weave, texture, and natural drape of each pure textile before tailoring your bespoke garment.
            </p>
          </div>

          <div className="flex items-center gap-3 md:pb-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-mono tracking-wider text-accent backdrop-blur-xs">
              <IconSparkles size={13} />
              {boutique.brand.name} Library
            </span>
          </div>
        </div>

        {/* 6 Large Fabric Cards Contiguous Matrix (No gap, seamlessly connected) */}
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 bg-[#1E0929]/70 overflow-visible">
          {fabrics.map((f) => (
            <li key={f.name} data-fabric-card className="relative flex">
              <a
                href={whatsappLink(
                  boutique,
                  `Hi ${boutique.brand.name}, I would like to inquire about stitching with ${f.name} fabric.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${f.name} on WhatsApp`}
                className="group relative z-10 flex w-full flex-col -ml-px -mt-px border border-white/15 bg-white/[0.04] p-5 md:p-6 backdrop-blur-md transition-all duration-300 ease-out hover:z-30 hover:scale-105 hover:-translate-y-2 hover:bg-[#321142]/95 hover:border-accent hover:ring-1 hover:ring-accent/80 hover:shadow-[0_25px_60px_rgba(20,5,30,0.95),0_0_35px_rgba(201,162,74,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Large Fabric Picture Box */}
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xs bg-[#240B30] border border-white/10 transition-all duration-300 group-hover:border-accent/40">
                  {/* Feel / Type Badge */}
                  <span className="absolute top-3 left-3 z-10 rounded-xs bg-[#2E0F3D]/90 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-accent border border-white/20 backdrop-blur-md">
                    {f.feel}
                  </span>

                  {/* Gradient Scrim for contrast */}
                  <div
                    className="pointer-events-none absolute inset-0 z-5 bg-gradient-to-t from-[#1C0726]/85 via-transparent to-[#1C0726]/25"
                    aria-hidden="true"
                  />

                  {/* High-Resolution Fabric Media */}
                  <div className="flex h-full w-full items-center justify-center overflow-hidden">
                    <Media
                      file={f.photo}
                      alt={f.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                    />
                  </div>
                </div>

                {/* Fabric Information */}
                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="font-serif text-2xl font-normal tracking-tight text-white transition-colors duration-200 group-hover:text-accent">
                    {f.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-stone-300/85 transition-colors duration-200 group-hover:text-white line-clamp-2">
                    {f.bestFor ? `Best for ${f.bestFor}.` : ''}
                  </p>

                  {/* Bottom Action Line */}
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between border-t border-white/10 pt-3.5 text-xs text-stone-400 transition-colors duration-200 group-hover:border-accent/40 group-hover:text-stone-200">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-accent/90">
                        Ask on WhatsApp
                      </span>
                      <IconArrowRight
                        size={15}
                        stroke={1.75}
                        className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1.5 group-hover:text-accent"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
