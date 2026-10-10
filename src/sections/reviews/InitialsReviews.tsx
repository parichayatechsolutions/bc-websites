// src/sections/reviews/InitialsReviews.tsx
// Luxury Testimonials & Client Reviews Showcase
// Features overall Google rating badge, category filters, verified client cards,
// highlight spotlight, and responsive grid with interactive hover scale.

import { useRef, useState } from 'react'
import {
  IconArrowRight,
  IconBrandGoogle,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconPencil,
  IconQuote,
  IconSparkles,
  IconStarFilled,
} from '@tabler/icons-react'
import { useMotion } from '../../motion/useMotion'
import { rise } from '../../motion/moves'
import { ratingText, Stars, useReviews } from './reviewShared'

const initial = (name: string) => name.trim().charAt(0).toUpperCase()

function categorizeReview(text: string): 'bridal' | 'handwork' | 'fitting' | 'delivery' | 'other' {
  if (/bridal|wedding|marriage|muhurtham|lehenga/i.test(text)) return 'bridal'
  if (/maggam|aari|zardosi|embroider|stone|bead|handwork/i.test(text)) return 'handwork'
  if (/fit|trial|fitting|alteration|neckline|armhole/i.test(text)) return 'fitting'
  if (/delivery|time|urgent|fast|schedule|punctual/i.test(text)) return 'delivery'
  return 'other'
}

function getReviewCategoryLabel(text: string): string {
  const cat = categorizeReview(text)
  switch (cat) {
    case 'bridal':
      return 'Bridal & Occasion Wear'
    case 'handwork':
      return 'Aari & Maggam Detailing'
    case 'fitting':
      return 'Precision Fit & Alterations'
    case 'delivery':
      return 'Express & On-Time Delivery'
    default:
      return 'Bespoke Tailoring'
  }
}

export default function InitialsReviews({ id = 'reviews' }: { id?: string }) {
  const { reviews: rawReviews, rating, count, google } = useReviews()
  const root = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<'all' | 'bridal' | 'handwork' | 'fitting' | 'delivery'>('all')
  const [expanded, setExpanded] = useState(false)

  const fallbackReviews = [
    {
      name: 'Mamtha K.',
      text: 'The customer service was outstanding, and the blouse was exactly what I was looking for. Very impressed with the embroidery quality and first-trial fit!',
    },
    {
      name: 'Shalini Shalu',
      text: 'It\'s a very good ambience! The outfits are really fantabulous. Loved the intricate bridal blouse embroidery and sweet finishing in Kengeri.',
    },
    {
      name: 'Ananya R.',
      text: 'Amazing bridal blouse work. The maggam detailing was so neat and exact to the reference picture I gave. Delivered right on time!',
    },
    {
      name: 'Sowmya',
      text: 'Great boutique in Kengeri Satellite Town. Stitching quality is top notch and they deliver exactly on the promised date.',
    },
    {
      name: 'Pooja Rani',
      text: 'Understands individual body types and suggests the most flattering necklines and sleeve lengths. Perfect craftsmanship on my silk saree blouses.',
    },
    {
      name: 'Tejashwini N.',
      text: 'Good service and dependable delivery. Stitched my saree blouse right on time with neat finishing and zero complaints.',
    },
    {
      name: 'Rashmi V.',
      text: 'Very polite and talented designer. My blouse came out with a perfect fit on the very first try without needing any alterations.',
    },
    {
      name: 'Deepa M.',
      text: 'Very responsive and got my daughter\'s lehenga stitched within three days. Excellent finishing and fair pricing.',
    },
    {
      name: 'Sahana M.',
      text: 'Outstanding customer service and fabric handling. Got my wedding lehenga stitched here and the compliments were non-stop!',
    },
    {
      name: 'Divya',
      text: 'Loved the finishing of my silk saree blouse. Aari handwork is very neat and looks luxurious.',
    },
  ]

  const reviews = rawReviews.length > 0 ? rawReviews : fallbackReviews

  useMotion(root, () => {
    rise('[data-review-card]', { trigger: root.current })
  })

  // Featured review for spotlight banner
  const featured = reviews.find((r) => /bridal|maggam|wedding/i.test(r.text)) || reviews[0]

  // Filter reviews (exclude featured review from the grid below so it is not shown twice)
  const baseReviews = reviews.filter((r) => r.text !== featured?.text)
  const filtered = filter === 'all' ? baseReviews : baseReviews.filter((r) => categorizeReview(r.text) === filter)
  const displayedReviews = expanded ? filtered : filtered.slice(0, 6)

  const filterTabs = [
    { id: 'all', label: 'All Reviews' },
    { id: 'bridal', label: 'Bridal & Lehengas' },
    { id: 'handwork', label: 'Aari & Maggam' },
    { id: 'fitting', label: 'Fit & Alterations' },
    { id: 'delivery', label: 'On-Time Delivery' },
  ] as const

  return (
    <section
      ref={root}
      id={id}
      className="relative overflow-hidden py-10 md:py-14 border-t border-b border-accent/25 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(248, 243, 252, 0.80), rgba(240, 233, 247, 0.87)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      {/* Background Ambient Purple Warmth Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-[#7B2E96]/15 blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-[#6B2485]/10 blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-ink/10 pb-8">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-[1.5px] w-6 bg-accent" />
              <span>CLIENT TESTIMONIALS & REVIEWS</span>
            </div>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              What customers <span className="italic text-accent font-serif">say</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-muted">
              Authentic stories and experiences from brides and couture patrons who celebrated their moments in our handcrafted garments.
            </p>
          </div>

          {/* Google Rating Badge & Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-accent/30 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-ink/10 shadow-2xs">
                <IconBrandGoogle size={22} className="text-[#4285F4]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-lg font-bold text-ink">
                    {rating ? rating.toFixed(1) : '5.0'}
                  </span>
                  <div className="flex gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <IconStarFilled key={s} size={13} />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] font-medium text-muted">
                  {ratingText(rating ?? 5.0, count ?? 57)}
                </div>
              </div>
            </div>

            {google && (
              <div className="flex items-center gap-2">
                <a
                  href={google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white/70 px-4 py-2 text-xs font-semibold text-ink shadow-2xs backdrop-blur-xs transition-colors hover:border-accent hover:bg-white hover:text-accent"
                >
                  <span>Read on Google</span>
                  <IconArrowRight size={14} />
                </a>
                <a
                  href={google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-primary-ink px-4 py-2 text-xs font-semibold text-on-primary-ink shadow-2xs transition-colors hover:bg-accent hover:text-black"
                >
                  <IconPencil size={14} />
                  <span>Write Review</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Featured Spotlight Quote Card */}
        {featured && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-accent/35 bg-white/90 p-6 md:p-10 shadow-xl shadow-ink/5 backdrop-blur-md transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-ink/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-serif text-lg font-bold text-accent">
                  {initial(featured.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg md:text-xl font-bold text-ink">{featured.name}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                      <IconCheck size={11} stroke={2.5} />
                      <span>Verified Client</span>
                    </span>
                  </div>
                  <div className="text-xs text-muted">
                    {getReviewCategoryLabel(featured.text)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <IconStarFilled key={s} size={16} />
                  ))}
                </div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Featured Review
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <IconQuote size={36} className="shrink-0 text-accent/30" />
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic leading-snug text-ink/90">
                “{featured.text}”
              </blockquote>
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2.5" role="group" aria-label="Review filter">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              aria-pressed={filter === tab.id}
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-ink/20 bg-white/75 px-5 py-2 text-xs md:text-sm font-medium tracking-wide text-ink backdrop-blur-xs transition-all duration-300 hover:border-accent hover:bg-white hover:text-accent aria-pressed:border-accent aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink aria-pressed:shadow-md"
            >
              <span>{tab.label}</span>
              {tab.id === 'all' && (
                <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-bold">
                  {reviews.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Multi-Card Testimonial Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedReviews.map((r, i) => (
            <figure
              key={r.name + i}
              data-review-card
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-accent/20 bg-white/85 p-6 shadow-sm shadow-ink/5 backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-ink/10"
            >
              <div>
                {/* Header: Avatar, Name, Verified Badge & Stars */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-primary-ink font-serif text-sm font-bold text-on-primary-ink shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      {initial(r.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-ink group-hover:text-accent transition-colors">
                        {r.name}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                        <IconCheck size={12} stroke={2.5} />
                        <span>Verified Customer</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <IconStarFilled key={s} size={13} />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <blockquote className="mt-4 text-xs sm:text-sm leading-relaxed text-ink/80 italic font-sans">
                  “{r.text}”
                </blockquote>
              </div>

              {/* Card Footer: Category Tag & Google Icon */}
              <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                  <IconSparkles size={12} />
                  <span>{getReviewCategoryLabel(r.text)}</span>
                </span>
                <IconBrandGoogle size={14} className="text-muted/60" />
              </div>
            </figure>
          ))}
        </div>

        {/* Expand / Collapse Button if more than 6 reviews */}
        {filtered.length > 6 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent/40 bg-white/90 px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-ink shadow-sm backdrop-blur-xs transition-all duration-300 hover:border-accent hover:bg-primary-ink hover:text-on-primary-ink hover:shadow-md"
            >
              <span>{expanded ? 'Show Less Reviews' : `View All ${filtered.length} Reviews`}</span>
              {expanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
