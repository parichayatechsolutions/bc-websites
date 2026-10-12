// src/sections/services/ShowcaseServices.tsx
// Exact layout matching reference:
// Header: "Multiple services. One coordinated process."
// Left: Numbered clean service list (01 to 09, no scrollbar, active arrow highlight)
// Center: Product picture floating with soft shadow & gold hover glow
// Right: Turnaround eyebrow, serif title, bespoke tailoring details, availability & store/chat buttons
// Auto-rotates every 4 seconds, immediate change on click, pauses on hover.

import { useEffect, useRef, useState } from 'react'
import {
  IconBrandWhatsapp,
  IconMapPin,
  IconNeedleThread,
} from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

interface IServiceItem {
  id: string
  name: string
  photo: string
  turnaround: string
  description: string
}

const SERVICES_LIST: IServiceItem[] = [
  {
    id: 'blouse-stitching',
    name: 'Custom Blouse Stitching',
    photo: 'work-blouse-01.jpg',
    turnaround: 'FROM 7 – 14 WORKING DAYS',
    description:
      'Neckline and back design, sleeve style, padding and lining, closure, dori and finishing details are chosen with you and cut to your own measurements. Aari or computer embroidery can be added where the design and fabric allow.',
  },
  {
    id: 'bridal-wear',
    name: 'Bridal Wear',
    photo: 'work-bridal-01.jpg',
    turnaround: 'FROM 10 – 20 WORKING DAYS',
    description:
      'Pure silk bridal blouses engineered with 14 anatomical body measurements for a snug, all-day fit. Includes structured princess darts, double-stitched let-out margins, custom latkans, and 2 pre-wedding trial sessions.',
  },
  {
    id: 'lehengas-half-sarees',
    name: 'Lehengas and Half Sarees',
    photo: 'work-lehenga-01.jpg',
    turnaround: 'FROM 7 – 14 WORKING DAYS',
    description:
      '16 to 24 kali flared festive lehengas and traditional South Indian langa voni sets with high-density layered can-can skirts, adjustable drawstrings, and heirloom contrast zari border craftsmanship.',
  },
  {
    id: 'frocks-anarkalis',
    name: 'Long Frocks and Anarkalis',
    photo: 'work-blouse-03.jpg',
    turnaround: 'FROM 5 – 10 WORKING DAYS',
    description:
      'Floor-length flare, proportionate bodice cut, and graceful twirl geometry. We balance the shoulder slope and armhole drape with soft butter-crepe lining for breathable comfort at family gatherings.',
  },
  {
    id: 'kurtis-ethnic-sets',
    name: 'Kurtis and Ethnic Sets',
    photo: 'work-saree-01.jpg',
    turnaround: 'FROM 4 – 7 WORKING DAYS',
    description:
      'Straight-cut kurtis, festive tunics, palazzos, and gather churidars stitched with reinforced overlocked seams and clean edge piping for everyday professional elegance and festive occasions.',
  },
  {
    id: 'kids-ethnic-wear',
    name: "Kids' Ethnic Wear",
    photo: 'work-kids-01.jpg',
    turnaround: 'FROM 3 – 5 WORKING DAYS',
    description:
      'Traditional pure silk pattu pavadai choli sets and party frocks stitched with hypoallergenic inner mulmul lining and generous 2-inch let-out margins so the garment grows with your child.',
  },
  {
    id: 'aari-handwork',
    name: 'Aari Handwork',
    photo: 'closeup-01.jpg',
    turnaround: 'FROM 7 – 12 WORKING DAYS',
    description:
      'Delicate needlework with antique gold coils, kundan stones, and floral vines. Every motif is drawn to scale and hand-embroidered by resident artisans before cutting and final assembly.',
  },
  {
    id: 'computer-embroidery',
    name: 'Computer Embroidery',
    photo: 'work-bridal-02.jpg',
    turnaround: 'FROM 4 – 7 WORKING DAYS',
    description:
      'High-definition multi-head computer embroidery replicating intricate zari florals, cord cording, and symmetrical necklines tailored to your pattern with micrometer-level precision.',
  },
  {
    id: 'fabric-painting',
    name: 'Fabric and Garment Painting',
    photo: 'after-01.jpg',
    turnaround: 'FROM 5 – 8 WORKING DAYS',
    description:
      'Artisanal hand-painted floral, peacock, and traditional Indian motifs created directly on raw silk, tussar, or organza fabrics by master artists with color-fast textile pigments.',
  },
]

export default function ShowcaseServices() {
  const { boutique } = useBoutique()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<number | null>(null)

  const current = SERVICES_LIST[activeIdx]
  const branch = boutique.branches[0]
  const areaCity = branch ? `${branch.area}, ${branch.city}` : boutique.brand.name

  // Auto-slide every 4 seconds (4000ms), immediately pauses on hover
  useEffect(() => {
    if (isPaused) return

    timerRef.current = window.setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES_LIST.length)
    }, 4000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIdx, isPaused])

  const handleSelect = (idx: number) => {
    setActiveIdx(idx)
  }

  const waMessage = `Hi ${boutique.brand.name}, I would like to consult about your ${current.name} service. Could you share details?`

  return (
    <section
      id="services"
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background:
          'linear-gradient(to bottom, color-mix(in oklab, var(--c-paper) 95%, var(--c-primary) 5%), color-mix(in oklab, var(--c-light) 96%, var(--c-primary) 4%))',
        color: 'var(--c-ink)',
        borderTop: '1px solid color-mix(in oklab, var(--c-ink) 10%, transparent)',
        borderBottom: '1px solid color-mix(in oklab, var(--c-ink) 10%, transparent)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="wrap">
        {/* Header matching reference */}
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-ink leading-[1.08] text-balance">
            Multiple services. One coordinated <em className="italic text-accent font-normal">process.</em>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink/75 leading-relaxed max-w-2xl font-light">
            Most {boutique.brand.name} services are crafted at our bespoke studio in {areaCity}. Every garment is
            individually cut to your 14 anatomical measurements, with personalized trial fittings and heirloom
            craftsmanship.
          </p>
        </div>

        {/* 3-Column Layout Matching Reference */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Numbered Service List (No scrollbar, clean bordered rows) */}
          <div className="lg:col-span-4 border-t border-ink/10">
            {SERVICES_LIST.map((svc, i) => {
              const isActive = i === activeIdx
              const num = String(i + 1).padStart(2, '0')
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left py-3.5 px-3 flex items-center justify-between border-b border-ink/10 transition-colors duration-200 group cursor-pointer ${
                    isActive
                      ? 'bg-[color-mix(in_oklab,var(--c-accent)_14%,var(--c-paper))] text-ink'
                      : 'hover:bg-ink/[0.02] text-ink/70 hover:text-ink'
                  }`}
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span
                      className={`text-xs font-mono shrink-0 transition-colors ${
                        isActive ? 'text-accent font-bold' : 'text-muted/65 group-hover:text-muted'
                      }`}
                    >
                      {num}
                    </span>
                    <span
                      className={`text-sm sm:text-base truncate transition-colors ${
                        isActive ? 'font-semibold text-ink' : 'font-normal'
                      }`}
                    >
                      {svc.name}
                    </span>
                  </div>
                  {isActive && (
                    <span className="text-accent text-sm font-bold shrink-0 ml-2">
                      →
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Center Column: Clean Garment Picture with Soft Shadow & Gold Ambient Glow */}
          <div className="lg:col-span-4 flex items-center justify-center p-2">
            <div
              className="relative w-full aspect-[4/5] max-w-[380px] rounded-2xl overflow-hidden flex items-center justify-center group transition-transform duration-500 hover:scale-[1.03]"
              style={{
                boxShadow: '0 20px 45px -15px color-mix(in oklab, var(--c-primary) 20%, transparent)',
              }}
            >
              {/* Warm golden ambient hover glow */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-20 group-hover:opacity-60"
                style={{
                  background:
                    'radial-gradient(circle at center, color-mix(in oklab, var(--c-accent) 45%, transparent) 0%, transparent 70%)',
                }}
              />

              {/* Photo with smooth transition */}
              <div key={current.id} className="h-full w-full overflow-hidden">
                <Media
                  file={current.photo as any}
                  alt={current.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Subtle gold border on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-accent/40" />
            </div>
          </div>

          {/* Right Column: Tailoring Description & Availability matching reference */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 pl-0 lg:pl-2">
            <div>
              {/* Eyebrow: Turnaround */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <IconNeedleThread size={15} />
                <span>{current.turnaround}</span>
              </div>

              {/* Service Title */}
              <h3 className="font-display text-3xl sm:text-4xl text-ink font-normal mt-3 leading-tight">
                {current.name}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-ink/80 leading-relaxed font-light">
                {current.description}
              </p>

              <hr className="my-6 border-ink/10" />

              {/* Availability Note */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">AVAILABLE AT</p>
                <p className="mt-1 text-sm text-ink/90 font-medium">
                  {boutique.brand.name} studio ({areaCity})
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={whatsappLink(boutique, waMessage)} variant="primary" icon={IconBrandWhatsapp}>
                Chat with us
              </Button>
              {branch?.mapsUrl && (
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/80 hover:text-ink px-4 py-3 rounded-full border border-ink/20 hover:border-ink transition-colors"
                >
                  <IconMapPin size={15} />
                  Find a store
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
