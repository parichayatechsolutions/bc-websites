// src/sections/classes/GlossaryClasses.tsx
// A tailoring glossary: the words she'll hear in class (dart, yoke, pico,
// fall, princess cut) with a line on each, in alphabetical order in two
// ruled columns, and a button to ask about joining. (Lab: class Y,
// "Tailoring glossary".)
//
// The meanings are general craft knowledge, true of the words. Shows only
// for a boutique that lists classes. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const TERMS = [
  { term: 'Dart', meaning: 'A folded, stitched wedge that shapes flat fabric to the body.' },
  { term: 'Fall', meaning: 'A strip stitched inside a saree’s hem to give it weight and take the wear.' },
  { term: 'Hook placket', meaning: 'The strip down a blouse opening where the hooks are sewn.' },
  { term: 'Katori', meaning: 'Bowl-shaped cups cut into a blouse front for shape and support.' },
  { term: 'Kuchu', meaning: 'Knotted or beaded tassels that finish the end of a pallu.' },
  { term: 'Lining', meaning: 'A second, inner layer that makes a garment sit and last better.' },
  { term: 'Pico', meaning: 'A rolled, stitched finish on a raw edge so it can’t fray.' },
  { term: 'Piping', meaning: 'A thin corded strip set into a seam or edge as a finish.' },
  { term: 'Princess cut', meaning: 'Long curved seams from shoulder to waist, shaping without darts.' },
  { term: 'Seam allowance', meaning: 'The extra fabric left beyond the stitch line, for letting out later.' },
  { term: 'Yoke', meaning: 'A fitted panel across the shoulders or hips that the rest hangs from.' },
]

export default function GlossaryClasses() {
  const { boutique } = useBoutique()
  if (!(boutique.classes ?? []).length) return null

  return (
    <section id="classes-glossary" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Words you’ll learn</h2>
          <p className="text-muted">A tailoring glossary</p>
        </div>
        <dl className="gap-12 md:columns-2">
          {TERMS.map(({ term, meaning }) => (
            <div key={term} className="break-inside-avoid border-b border-ink/15 py-5">
              <dt className="t-3 text-primary-ink">{term}</dt>
              <dd className="mt-1 max-w-[44ch] text-muted">{meaning}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your tailoring classes.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about classes
          </Button>
        </div>
      </div>
    </section>
  )
}
