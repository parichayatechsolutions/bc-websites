// src/sections/header/PageHeader.tsx
// Opens an inner page (About us, Contact us) that has no hero: the page's
// name, its intro from Site.tsx, and a short running stitch underneath.
// Leaves room at the top for a floating navigation.

import { useSite } from '../../app/SiteContext'

export default function PageHeader() {
  const { current } = useSite()
  if (!current) return null

  return (
    <header className="pb-12 pt-36 md:pb-16 md:pt-44">
      <div className="wrap">
        <h1 className="t-1 max-w-[16ch] text-balance">{current.label}</h1>
        {current.intro && <p className="t-lead mt-6 max-w-[40ch] text-muted">{current.intro}</p>}
        <div className="mt-10 w-24 border-b-2 border-dashed border-thread" aria-hidden="true" />
      </div>
    </header>
  )
}
