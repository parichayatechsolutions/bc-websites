// src/sections/services/ShowcaseServices.tsx
// Comprehensive 3-column interactive services showcase for Regal:
// Left: All boutique service names & categories
// Center: High-definition service picture with gold-glow hover effects & animations
// Right: Professional bespoke tailoring details, turnaround, pricing, and WhatsApp consultation
// Automatically rotates every 4 seconds or changes immediately upon click/interaction.

import { useEffect, useRef, useState } from 'react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandWhatsapp,
  IconCheck,
  IconClock,
  IconNeedleThread,
  IconSparkles,
} from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'

interface IServiceItem {
  id: string
  name: string
  category: string
  photo: string
  badge: string
  tagline: string
  description: string
  startingPrice?: number
  turnaround: string
  features: string[]
}

const SERVICES_CATALOG: IServiceItem[] = [
  {
    id: 'bridal-blouse',
    name: 'Bridal & Muhurtham Blouses',
    category: 'Bridal Couture',
    photo: 'work-bridal-01.jpg',
    badge: 'Bridal Bestseller',
    tagline: 'Pure silk bridal blouses engineered with 14 anatomical body measurements for a snug, all-day fit.',
    description:
      'Handcrafted on pure Kanchipuram and Banarasi silks with structured princess seams, custom cup padding, and sweat-resistant inner lining. Includes 2 complimentary trial fittings before the wedding.',
    startingPrice: 4500,
    turnaround: '5–7 days',
    features: [
      '14 anatomical measurements for zero-armhole bunching',
      'Double-stitched reinforced seam margins (up to 3 inches)',
      'Custom handcrafted latkans and matching dori tie',
      'Complimentary pre-wedding trial session',
    ],
  },
  {
    id: 'designer-cutwork',
    name: 'Designer Cutwork & Pattern Blouses',
    category: 'Designer Blouses',
    photo: 'work-blouse-02.jpg',
    badge: 'Trending Design',
    tagline: 'Artisanal scalloped borders, keyhole back cutouts, and delicate pearl drop detailing.',
    description:
      'Choose from over 30 neckline cuts including sweetheart, deep square, boat, and sheer illusion backs. Custom piping and bead embellishments crafted to pair seamlessly with your festive sarees.',
    startingPrice: 950,
    turnaround: '4–5 days',
    features: [
      'Hand-cut scallop edges and geometric window cutouts',
      'Contrast piping and artisanal zari sleeve cuffs',
      'Custom cup padding addition and bra-strap anchors',
      'Perfect saree-border matching & styling advice',
    ],
  },
  {
    id: 'maggam-aari',
    name: 'Royal Maggam & Aari Embroidery',
    category: 'Handwork & Craft',
    photo: 'work-bridal-02.jpg',
    badge: 'Artisanal Craft',
    tagline: 'Traditional South Indian wooden cot handwork with antique gold zardosi and kundan stones.',
    description:
      'Our skilled karigars mount fabric onto wooden maggam cots, embroidering intricate temple jaals, floral vines, and peacock medallions needle-by-needle using antique coils and metallic threads.',
    startingPrice: 2500,
    turnaround: '6–8 days',
    features: [
      'Authentic antique gold, bright gold, and silver zari',
      'Raised 3D embossed zardosi and kundan stone setting',
      'Skin-safe inner turpai lining preventing thread scratches',
      'Custom design sketch preview before needlework begins',
    ],
  },
  {
    id: 'bridal-lehengas',
    name: 'Bespoke Lehengas & Reception Gowns',
    category: 'Lehengas & Gowns',
    photo: 'work-lehenga-01.jpg',
    badge: 'Grand Volume',
    tagline: '16-kali flared lehengas and structured reception gowns with layered can-can volume.',
    description:
      'Custom tailored with proportionate waist kalis, concealed zip closures, high-density can-can skirts, and shimmering sequin work that catches function lights effortlessly.',
    startingPrice: 3500,
    turnaround: '7–10 days',
    features: [
      'Custom 16 to 24 kali panels for breathtaking 360° spin',
      'Inbuilt double-layer can-can mesh for ballroom volume',
      'Adjustable drawstring waistband with designer latkans',
      'Custom lightweight dupatta styling & border attachment',
    ],
  },
  {
    id: 'half-saree',
    name: 'Traditional Half-Sarees (Langa Voni)',
    category: 'Traditional Wear',
    photo: 'work-lehenga-02.jpg',
    badge: 'Festive Classic',
    tagline: 'Timeless South Indian pavadai dhavani sets for puberty ceremonies, festivals, and weddings.',
    description:
      'Tailored with contrasting silk borders, pleating that stays in position, and fitted blouses that honor tradition while ensuring young women feel confident and poised.',
    startingPrice: 2200,
    turnaround: '5–6 days',
    features: [
      'Authentic pleated skirt with wide zari border finish',
      'Traditional dhavani pallu pleat anchors',
      'Breathable cotton-silk inner lining',
      'Coordinated blouse styling with matching piping',
    ],
  },
  {
    id: 'kids-wear',
    name: 'Kids Pattu Pavadai & Festive Wear',
    category: 'Kids Ethnic',
    photo: 'work-kids-01.jpg',
    badge: 'Comfort Fit',
    tagline: 'Pure silk traditional pavadai sets and frocks tailored soft for gentle children’s skin.',
    description:
      'Designed with extra inner seam allowance so the garment can be loosened as your child grows. Seamless inner edges ensure zero itching or irritation during festivals.',
    startingPrice: 650,
    turnaround: '3–4 days',
    features: [
      'Extra 2-inch let-out margins for child growth',
      'Hypoallergenic soft mulmul and butter-crepe lining',
      'Lightweight comfortable fit that kids love wearing',
      'Festive pattu pavadai choli & twirl-friendly frocks',
    ],
  },
  {
    id: 'salwar-kurti',
    name: 'Salwars, Anarkalis & Daily Kurtis',
    category: 'Salwar & Suits',
    photo: 'work-blouse-03.jpg',
    badge: 'Flawless Drape',
    tagline: 'Everyday elegance to festive heavy Anarkalis tailored to your exact height and proportions.',
    description:
      'Straight-cut suits, flared floor-length Anarkalis, churidars, and palazzo sets stitched with crisp neckline geometry and balanced shoulder drapes for office and casual celebrations.',
    startingPrice: 500,
    turnaround: '3–5 days',
    features: [
      'Sharp shoulder slope & non-gaping front necklines',
      'Custom sleeve lengths (cap, elbow, or 3/4th)',
      'Comfort-waist pants, palazzos, and gather churidars',
      'Overlocked durability seams for long everyday life',
    ],
  },
  {
    id: 'alterations-care',
    name: 'Precision Alterations & Saree Finishing',
    category: 'Garment Care',
    photo: 'after-01.jpg',
    badge: 'Same-Day Care',
    tagline: 'Loosen or tighten pre-bought dresses, replace zippers, add padding, and perfect saree fall.',
    description:
      'Give ill-fitting clothes a second life. We reshape armholes, take in waists, adjust lehenga lengths, add structured chest pads, and execute fine saree fall & pico edging.',
    startingPrice: 120,
    turnaround: '1–2 days',
    features: [
      'Blouse side tightening & loosening in 24 hours',
      'Chest cup padding insertion and bra-line refitting',
      'Invisible hem finishing and zipper replacements',
      'Neat saree fall stitching with color-matched threads',
    ],
  },
  {
    id: 'express-tailoring',
    name: 'Express 48-Hour Urgent Stitching',
    category: 'Priority Service',
    photo: 'team-at-work.jpg',
    badge: '48-Hour Guarantee',
    tagline: 'Last-minute wedding invitation or urgent function? Get your blouse ready in 48 hours.',
    description:
      'Our dedicated express cutting table prioritizes your fabric immediately without compromising stitch accuracy, seam margins, or trial finish.',
    startingPrice: 650,
    turnaround: '48 hours',
    features: [
      'Priority master tailor cutting queue allocation',
      'Live WhatsApp measurement verification',
      'Guaranteed delivery on the promised hour',
      'Includes emergency trial adjustment if needed',
    ],
  },
]

export default function ShowcaseServices() {
  const { boutique } = useBoutique()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<number | null>(null)
  const progressTimerRef = useRef<number | null>(null)

  const current = SERVICES_CATALOG[activeIdx]

  // Auto-slide every 4 seconds (4000ms) with smooth progress bar
  useEffect(() => {
    if (isPaused) return

    setProgress(0)
    const startTime = Date.now()
    const duration = 4000

    progressTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
    }, 40)

    timerRef.current = window.setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES_CATALOG.length)
    }, duration)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
    }
  }, [activeIdx, isPaused])

  const handleSelect = (idx: number) => {
    setActiveIdx(idx)
    setProgress(0)
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SERVICES_CATALOG.length) % SERVICES_CATALOG.length)
    setProgress(0)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SERVICES_CATALOG.length)
    setProgress(0)
  }

  const waMessage = `Hi ${boutique.brand.name}, I am interested in your ${current.name} service. Could you share more details on design and consultation?`

  return (
    <section
      id="services"
      className="relative overflow-hidden py-10 md:py-14"
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p
            style={{
              margin: '0 0 10px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: 'var(--c-primary-ink)',
            }}
          >
            <IconSparkles size={16} />
            Complete Tailoring Catalogue
          </p>
          <h2 className="t-1 text-balance text-ink">Boutique Services & Specialities</h2>
          <p className="mt-3 text-base text-ink/80 md:text-lg">
            From heirloom bridal blouses and antique maggam jaals to swift same-day alterations, crafted to your exact
            anatomy.
          </p>

          {/* 4-second auto-rotation indicator */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
            <span>
              Showing {activeIdx + 1} of {SERVICES_CATALOG.length}
            </span>
            <div className="w-28 h-1.5 rounded-full bg-ink/10 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono lowercase">({isPaused ? 'paused' : 'auto 4s'})</span>
          </div>
        </div>

        {/* 3-Column Interactive Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Left List of All Services (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2 max-h-[620px] overflow-y-auto pr-2 custom-scroll">
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1 px-3">Select a Specialty</p>
            {SERVICES_CATALOG.map((svc, idx) => {
              const isSelected = idx === activeIdx
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`group relative text-left p-3.5 rounded-xl transition-all duration-300 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-light shadow-md border-l-4 border-l-primary ring-1 ring-ink/10 text-ink'
                      : 'bg-paper/60 hover:bg-light/80 text-ink/75 hover:text-ink border border-ink/5'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-primary-ink">
                      {svc.category}
                    </span>
                    <span className={`block text-sm md:text-base font-semibold leading-tight mt-0.5 ${isSelected ? 'text-ink font-bold' : ''}`}>
                      {svc.name}
                    </span>
                  </div>

                  {/* Indicator pip */}
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 transition-transform duration-300 ${
                      isSelected ? 'bg-primary scale-125' : 'bg-ink/20 group-hover:bg-ink/40'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Column 2: Center Service Picture Showcase (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div
              className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                boxShadow:
                  '0 24px 50px -15px color-mix(in oklab, var(--c-primary) 35%, transparent), 0 0 0 1px color-mix(in oklab, var(--c-accent) 40%, transparent)',
                border: '2px solid color-mix(in oklab, var(--c-accent) 70%, transparent)',
              }}
            >
              {/* Photo with zoom on hover */}
              <div className="h-full w-full overflow-hidden">
                <Media
                  file={current.photo as any}
                  alt={current.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Shaded gold background vignette on hover */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-20 group-hover:opacity-40"
                style={{
                  background:
                    'radial-gradient(circle at center, color-mix(in oklab, var(--c-accent) 45%, transparent) 0%, rgba(20,5,30,0.8) 100%)',
                }}
              />

              {/* Gold luxury border glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl transition-all duration-500 opacity-60 group-hover:opacity-100"
                style={{
                  boxShadow: 'inset 0 0 25px color-mix(in oklab, var(--c-accent) 55%, transparent)',
                }}
              />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 999,
                    background: 'color-mix(in oklab, var(--c-paper) 92%, transparent)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--c-primary-ink)',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '.04em',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    border: '1px solid color-mix(in oklab, var(--c-accent) 40%, transparent)',
                  }}
                >
                  <IconSparkles size={14} />
                  {current.badge}
                </span>
              </div>

              {/* Next/Prev quick overlay arrows */}
              <div className="absolute inset-x-3 bottom-4 z-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrev()
                  }}
                  aria-label="Previous service"
                  className="h-10 w-10 rounded-full bg-light/90 hover:bg-light text-ink grid place-items-center shadow-md backdrop-blur transition-transform active:scale-95"
                >
                  <IconArrowLeft size={18} />
                </button>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-dark/75 text-light backdrop-blur">
                  {current.category}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  aria-label="Next service"
                  className="h-10 w-10 rounded-full bg-primary hover:bg-primary-ink text-on-primary grid place-items-center shadow-md transition-transform active:scale-95"
                >
                  <IconArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Right Service Content & Tailoring Information (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-light/95 p-6 md:p-8 rounded-2xl border border-ink/10 shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-ink">
                <IconNeedleThread size={16} />
                <span>{current.category}</span>
              </div>

              <h3 className="t-2 mt-2 text-ink font-display font-medium leading-tight">{current.name}</h3>

              <p className="mt-3 text-sm font-medium leading-relaxed text-ink/85 italic border-l-2 border-primary pl-3">
                "{current.tagline}"
              </p>

              <p className="mt-4 text-sm text-ink/80 leading-relaxed">{current.description}</p>

              {/* Tailoring Feature Checklist */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2.5">Craft Highlights</p>
                <ul className="space-y-2 text-xs md:text-sm text-ink">
                  {current.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className="h-4 w-4 rounded-full bg-primary/10 text-primary-ink grid place-items-center shrink-0 mt-0.5">
                        <IconCheck size={12} stroke={2.5} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Meta & WhatsApp CTA */}
            <div className="mt-8 pt-6 border-t border-ink/10">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Turnaround
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ink mt-0.5">
                    <IconClock size={16} className="text-primary" />
                    {current.turnaround}
                  </span>
                </div>
                {current.startingPrice && (
                  <div className="text-right">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Starting from
                    </span>
                    <span className="text-lg font-bold text-primary-ink tabular-nums mt-0.5">
                      {rupees(current.startingPrice)}
                    </span>
                  </div>
                )}
              </div>

              <Button href={whatsappLink(boutique, waMessage)} variant="primary" icon={IconBrandWhatsapp} className="w-full justify-center">
                Consult on {current.name.split(' ')[0]}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
