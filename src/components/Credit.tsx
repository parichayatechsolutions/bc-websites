// src/components/Credit.tsx
// The last line of every footer: copyright, demo note while unsold, and the
// Parichaya Tech Solutions credit. One component, so every site says it the
// same way.

import { useBoutique } from '../app/BoutiqueContext'

const POWERED_BY = { name: 'Parichaya Tech Solutions', url: 'https://parichayatechsolutions.com' }

export default function Credit({ className = '' }: { className?: string }) {
  const { boutique } = useBoutique()
  return (
    <div className={`t-small flex flex-wrap gap-x-8 gap-y-2 opacity-75 ${className}`}>
      <span>
        © {new Date().getFullYear()} {boutique.brand.name}
        {boutique.demo.noindex && '. Demo website'}
      </span>
      <span>
        Boutique site powered by{' '}
        {/* noopener without noreferrer, so visits show up in our analytics */}
        <a href={POWERED_BY.url} target="_blank" rel="noopener" className="link-stitch">
          {POWERED_BY.name}
        </a>
      </span>
    </div>
  )
}
