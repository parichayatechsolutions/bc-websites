// src/sections/handwork/MotifsHandwork.tsx
// Six classic motifs (mango, peacock, lotus, elephant, temple and creeper)
// in alternating rows, each with where it's usually worked and a link to
// ask for it. (Lab: emb H, "Six motifs".)
//
// The meanings and placements are general craft knowledge, true of the
// motifs. Needs at least one handwork item in their services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const HANDWORK = /aari|maggam|zardosi|zardozi|mirror|bead|stone|embroidery|kantha|chikan|cutwork/i

const MOTIFS = [
  { name: 'Mango', local: 'Kairi', note: 'The curved teardrop known as paisley; fertility and plenty. Worked on sleeves, borders and all over.' },
  { name: 'Peacock', local: 'Mayil', note: 'Grace and beauty. A favourite for the back of a bridal blouse.' },
  { name: 'Lotus', local: 'Kamal', note: 'Purity; opens out well across a back or a pallu.' },
  { name: 'Elephant', local: 'Haathi', note: 'Strength and good fortune, often in a row along a border.' },
  { name: 'Temple', local: 'Gopuram', note: 'The temple-tower border of South Indian silks, repeated along the hem.' },
  { name: 'Creeper', local: 'Bel', note: 'A trailing vine that frames necklines and runs along sleeves.' },
]

export default function MotifsHandwork() {
  const { boutique } = useBoutique()
  const doesHandwork = boutique.services.groups.flatMap((g) => g.items).some((i) => HANDWORK.test(i))
  if (!doesHandwork) return null

  return (
    <section id="handwork-motifs" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Six classic motifs</h2>
        <ul className="mt-12">
          {MOTIFS.map((m, i) => (
            <li key={m.name} className={`flex flex-col gap-3 border-t border-ink/15 py-8 md:flex-row md:items-baseline md:gap-12 ${i % 2 ? 'md:flex-row-reverse md:text-right' : ''}`}>
              <h3 className="t-1 md:w-5/12">
                {m.name}
                <span className="t-small ml-3 align-middle text-muted">{m.local}</span>
              </h3>
              <div className="md:w-7/12">
                <p className="t-lead max-w-[40ch] md:inline-block">{m.note}</p>
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a ${m.name.toLowerCase()} motif in my handwork.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 flex min-h-11 w-fit items-center gap-2 font-semibold text-primary-ink ${i % 2 ? 'md:ml-auto' : ''}`}
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask for a {m.name.toLowerCase()}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
