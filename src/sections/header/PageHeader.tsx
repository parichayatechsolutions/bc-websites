// src/sections/header/PageHeader.tsx
// Opens an inner page (About us, Contact us) that has no hero: the page's
// name, its intro from the design's page list, and a short running stitch
// underneath. `.page-top` leaves the right amount of room for whichever
// navigation the design chose.

import { useSite } from '../../app/SiteContext'

export default function PageHeader() {
  const { current } = useSite()
  if (!current) return null

  return (
    <header className="page-top pb-12 md:pb-16">
      <div className="wrap">
        <h1 className="t-1 max-w-[16ch] text-balance">{current.label}</h1>
        {current.intro && <p className="t-lead mt-6 max-w-[40ch] text-muted">{current.intro}</p>}
        <div className="mt-10 w-24 border-b-2 border-dashed border-thread" aria-hidden="true" />
      </div>
    </header>
  )
}
