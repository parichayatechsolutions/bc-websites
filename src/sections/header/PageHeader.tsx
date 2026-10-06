// src/sections/header/PageHeader.tsx
// Opens an inner page (About us, Contact us) that has no hero: the page's
// name, its intro from the design's page list, and a short running stitch
// underneath. `.page-top` leaves the right amount of room for whichever
// navigation the design chose.
//
// Motion: page title letters rise into place from under a mask on page open.

import { useRef } from 'react'
import { useSite } from '../../app/SiteContext'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function PageHeader() {
  const { current } = useSite()
  const root = useRef<HTMLElement>(null)

  useMotion(
    root,
    () => {
      rise('[data-page-title]', { by: 'letters', delay: 0.1 })
      if (current?.intro) {
        rise('[data-page-intro]', { by: 'words', delay: 0.25 })
      }
    },
    [current?.label],
  )

  if (!current) return null

  return (
    <header ref={root} className="page-top pb-12 md:pb-16">
      <div className="wrap">
        <h1 data-page-title className="t-1 max-w-[16ch] text-balance">
          {current.label}
        </h1>
        {current.intro && (
          <p data-page-intro className="t-lead mt-6 max-w-[40ch] text-muted">
            {current.intro}
          </p>
        )}
        <div className="mt-10 w-24 border-b-2 border-dashed border-thread" aria-hidden="true" />
      </div>
    </header>
  )
}
