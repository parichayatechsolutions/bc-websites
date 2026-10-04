// src/sections/reviews/reviewShared.tsx
// What the review sections share. A review is shown as the customer wrote
// it, with her first name. Stars go only with the overall Google rating,
// never on a single review: the config doesn't hold what each customer
// gave, and five stars on every quote would be invented. Likewise nothing
// is labelled "verified".

import { IconArrowRight, IconStar, IconStarFilled } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'

export function useReviews() {
  const { boutique } = useBoutique()
  const { googleRating, googleReviewCount, googleBusiness } = boutique.social
  return {
    reviews: boutique.reviews ?? boutique.testimonials ?? [],
    rating: googleRating,
    count: googleReviewCount,
    google: googleBusiness,
  }
}

/** The overall rating's stars, rounded to the nearest whole star. Decorative: say the number in text beside it. */
export function Stars({ rating, size = 20, className = '' }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) =>
        n <= Math.round(rating) ? <IconStarFilled key={n} data-star size={size} /> : <IconStar key={n} data-star size={size} stroke={1.5} />,
      )}
    </span>
  )
}

/** "4.8 on Google, from 312 reviews". */
export function ratingText(rating: number, count?: number): string {
  return `${rating.toFixed(1)} on Google${count ? `, from ${count.toLocaleString('en-IN')} reviews` : ''}`
}

/** "Read all reviews on Google", when the boutique has a Google listing. */
export function GoogleLink({ href, className = '' }: { href?: string; className?: string }) {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 font-semibold ${className}`}>
      <span className="link-stitch">Read all reviews on Google</span>
      <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
    </a>
  )
}
