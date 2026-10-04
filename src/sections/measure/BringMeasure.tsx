// src/sections/measure/BringMeasure.tsx
// The simplest way to get the fit right: bring a blouse that already fits,
// or come in to be measured. A photo of the workroom beside it, the hours,
// and buttons to come or to ask. (Lab: measure U, "Bring a blouse".)
//
// Shows only for a boutique that stitches blouses. The photo is their team
// at work or an interior shot, and drops away without one. No motion.

import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { useBlouse } from '../blouse/blouseShared'

export default function BringMeasure() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  if (!stitchesBlouses) return null
  const photo = boutique.media.teamAtWork ?? boutique.media.interior?.[0]
  const branch = boutique.branches[0]

  return (
    <section id="measure" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {photo && (
          <div className="arch aspect-[3/4] max-w-md bg-paper md:col-span-5">
            <Media file={photo} alt="" />
          </div>
        )}
        <div className={photo ? 'md:col-span-7' : 'md:col-span-8'}>
          <h2 className="t-1 max-w-[14ch] text-balance">Not sure of your measurements?</h2>
          <p className="t-lead mt-6 max-w-[34ch] text-muted">Bring a blouse that fits you well. It’s often the most accurate starting point. Or come in and be measured.</p>
          {branch?.hours && <p className="mt-6">Open {branch.hours}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to come in to be measured.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask on WhatsApp
            </Button>
            {branch && (
              <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
                Get directions
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
