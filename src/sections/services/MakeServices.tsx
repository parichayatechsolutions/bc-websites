// src/sections/services/MakeServices.tsx
// "What we make" / "Our Services" - Couture showcase with 3 interactive cards
// (Blouse, Bridal, Lehengas) with photo badges, delivery info, and hover scale-105 zoom.

import { useRef } from 'react'
import { IconArrowRight, IconDiamond, IconPencil, IconSparkles } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import type { PhotoFile } from '../../types/boutique'

export default function MakeServices({ id = 'services-cards' }: { id?: string }) {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-service-card]', { trigger: root.current })
  })

  const work = boutique.media?.work || []
  const blouseFile = (work.find((f) => /blouse/i.test(f)) || 'work-blouse-01.jpg') as PhotoFile
  const bridalFile = (work.find((f) => /bridal.*01|bridal/i.test(f)) || 'work-bridal-01.jpg') as PhotoFile
  const lehengaFile = (work.find((f) => /lehenga|half|saree|bridal.*02/i.test(f)) || 'work-bridal-02.jpg') as PhotoFile

  const deliveryDays = boutique.pricing?.deliveryDays || 7
  const blouseTiming = `FROM ${deliveryDays} – ${deliveryDays + 7} WORKING DAYS`

  const cards = [
    {
      title: 'Custom Blouse Stitching',
      description:
        'Classic, princess-cut, katori and designer blouses tailored around your saree, measurements, comfort and preferred style.',
      timing: blouseTiming,
      icon: IconPencil,
      file: blouseFile,
      link: whatsappLink(boutique, `Hi ${boutique.brand.name}, I would like to inquire about Custom Blouse Stitching.`),
    },
    {
      title: 'Bridal Wear',
      description:
        'Personalised bridal blouses, lehengas, half sarees and occasion outfits created through detailed consultation, planned design work and fit refinement.',
      timing: 'CONFIRMED AT CONSULTATION',
      icon: IconDiamond,
      file: bridalFile,
      link: whatsappLink(boutique, `Hi ${boutique.brand.name}, I would like to book a bridal consultation for wedding and bridal wear.`),
    },
    {
      title: 'Lehengas and Half Sarees',
      description:
        'Custom-stitched traditional ensembles designed for weddings, functions, festive celebrations and milestone occasions.',
      timing: 'CONFIRMED AT CONSULTATION',
      icon: IconSparkles,
      file: lehengaFile,
      link: whatsappLink(boutique, `Hi ${boutique.brand.name}, I would like to inquire about custom-stitched Lehengas and Half Sarees.`),
    },
  ]

  return (
    <section
      ref={root}
      id={id}
      className="relative overflow-hidden py-10 md:py-14 border-t border-b border-ink/10 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(248, 243, 252, 0.80), rgba(240, 233, 247, 0.87)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      <div className="wrap">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span className="h-[1.5px] w-6 bg-accent" />
          <span>WHAT WE MAKE</span>
        </div>

        {/* Heading & Header Bar */}
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              Our <span className="italic text-accent font-serif">Services</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted">
              From everyday outfits to memorable celebrations, our services bring your ideas to life through thoughtful
              consultation, skilled craftsmanship and personalised attention.
            </p>
          </div>

          <a
            href="#stitching"
            className="group/btn inline-flex items-center gap-2 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:text-accent shrink-0"
          >
            <span>VIEW CUSTOM STITCHING</span>
            <IconArrowRight
              size={15}
              stroke={2}
              className="transition-transform duration-300 ease-stitch group-hover/btn:translate-x-1"
            />
          </a>
        </div>

        {/* 3 Showcase Cards */}
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          {cards.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.title} data-service-card className="flex">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask about ${item.title} on WhatsApp`}
                  className="group relative flex w-full flex-col rounded-sm transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#FBF8F3] border border-ink/10 transition-all duration-300 ease-out group-hover:border-accent/40 group-hover:shadow-xl group-hover:shadow-black/5">
                    {/* Badge Icon */}
                    <div className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-sm bg-white/95 text-accent shadow-xs border border-accent/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={16} stroke={1.75} />
                    </div>

                    {/* Centered Garment Photo */}
                    <div className="flex h-full w-full items-center justify-center p-4 md:p-6 overflow-hidden">
                      <Media
                        file={item.file}
                        alt={item.title}
                        className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="flex flex-1 flex-col pt-6 pb-2 transition-colors duration-300">
                    <h3 className="font-serif text-2xl font-normal tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-ink/80">
                      {item.description}
                    </p>

                    {/* Bottom Row */}
                    <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-[11px] font-mono uppercase tracking-[0.2em] text-muted transition-colors duration-200 group-hover:border-accent/40 group-hover:text-ink">
                      <span>{item.timing}</span>
                      <IconArrowRight
                        size={16}
                        stroke={1.75}
                        className="transition-transform duration-300 ease-stitch group-hover:translate-x-1.5 group-hover:text-accent"
                      />
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
