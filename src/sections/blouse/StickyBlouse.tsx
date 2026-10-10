// src/sections/blouse/StickyBlouse.tsx
// Blouse Design Picker - Sticky Preview (Variant S from Boutique Component Lab)
// Diagrams stay put while every option scrolls past.
// Features interactive front & back vector SVG drawings that update in real-time,
// and a 1-tap WhatsApp consultation button with the tailored design summary.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { BlouseFlat } from './blouseDrawing'
import { useBlouse } from './blouseShared'

const NECKS = [
  { id: 'round', name: 'Round Neck', note: 'Classic & versatile curve' },
  { id: 'boat', name: 'Boat Neck', note: 'Wide & elegant, collarbone highlight' },
  { id: 'v', name: 'V-Neck', note: 'Sharp & elongating silhouette' },
  { id: 'square', name: 'Square Neck', note: 'Geometric frame for heavy necklaces' },
  { id: 'sweet', name: 'Sweetheart', note: 'Romantic bridal curve' },
  { id: 'high', name: 'High Collar', note: 'Royal coverage with collar aari work' },
] as const

const BACKS = [
  { id: 'u', name: 'Deep U Back', note: 'The quintessential bridal cut' },
  { id: 'vb', name: 'Deep V Cut', note: 'Dramatic back with dori tie' },
  { id: 'win', name: 'Keyhole Back', note: 'Artistic peek cutout' },
  { id: 'sq', name: 'Square Back', note: 'Structured frame for latkans' },
] as const

const SLEEVES = [
  { id: 'elbow', name: 'Elbow Length', note: 'Bridal favourite with rich maggam motifs' },
  { id: 'puff', name: 'Puff Sleeve', note: 'Heritage gathered volume' },
  { id: 'cap', name: 'Cap Sleeve', note: 'Petite shoulder cap' },
  { id: 'three', name: 'Three-Quarter', note: 'Sophisticated royal drape' },
  { id: 'none', name: 'Sleeveless', note: 'Contemporary chic look' },
] as const

const EXTRAS = [
  { id: 'piping', name: 'Contrast Piping', note: 'Fine defined seam line' },
  { id: 'latkans', name: 'Handmade Latkans', note: 'Hanging beaded tassels' },
  { id: 'aari', name: 'Aari & Maggam Work', note: 'Handcrafted zardosi embroidery' },
  { id: 'zari', name: 'Zari Border', note: 'Pure gold zari cuff lining' },
] as const

export default function StickyBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()

  const [neck, setNeck] = useState<string>('sweet')
  const [back, setBack] = useState<string>('u')
  const [sleeve, setSleeve] = useState<string>('elbow')
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['piping', 'latkans', 'aari'])

  if (stitchesBlouses === false) return null

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const activeNeck = NECKS.find((n) => n.id === neck) ?? NECKS[0]
  const activeBack = BACKS.find((b) => b.id === back) ?? BACKS[0]
  const activeSleeve = SLEEVES.find((s) => s.id === sleeve) ?? SLEEVES[0]

  const extrasText = selectedExtras
    .map((e) => EXTRAS.find((x) => x.id === e)?.name)
    .filter(Boolean)
    .join(', ')

  const summary = `${activeNeck.name} front, ${activeBack.name}, ${activeSleeve.name}${extrasText ? ` with ${extrasText}` : ''}`

  const consultHref = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I customized a blouse design on your website: ${summary}. What would be the price estimate?`,
  )

  return (
    <section
      id="blouse-designer"
      className="relative overflow-hidden pt-8 pb-12 md:pt-10 md:pb-16 border-t border-b border-ink/10 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(248, 243, 252, 0.82), rgba(240, 233, 247, 0.88)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      <div className="wrap">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-ink">
            Interactive Atelier · Custom Designer Blouse
          </p>
          <h2 className="t-1 mt-2 text-balance">
            Design your blouse <span className="font-serif italic text-primary-ink">in real-time</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted text-base">
            Pick your necklines, back silhouette, sleeve length, and embroidery finishes. Preview live and send directly to our master tailors.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Sticky Left Preview Panel */}
          <div className="lg:sticky lg:top-24 lg:col-span-5 rounded-2xl border border-ink/15 bg-white/95 p-6 md:p-8 shadow-sm backdrop-blur-xs">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">Live Vector Blueprint</span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-ink">
                Auto-Updating
              </span>
            </div>

            {/* Front & Back SVG Drawings */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Front Drawing */}
              <div className="flex flex-col items-center">
                <div className="relative aspect-[5/4] w-full rounded-xl border border-ink/10 bg-light/70 p-3 flex items-center justify-center">
                  <BlouseFlat neck={neck} sleeve={sleeve} className="text-primary fill-primary/10 stroke-primary-ink" />
                </div>
                <span className="mt-2 text-xs font-semibold tracking-wider uppercase text-muted">Front View</span>
              </div>

              {/* Back Drawing */}
              <div className="flex flex-col items-center">
                <div className="relative aspect-[5/4] w-full rounded-xl border border-ink/10 bg-light/70 p-3 flex items-center justify-center">
                  <BlouseFlat neck={back} sleeve={sleeve} back className="text-primary fill-primary/10 stroke-primary-ink" />
                </div>
                <span className="mt-2 text-xs font-semibold tracking-wider uppercase text-muted">Back View</span>
              </div>
            </div>

            {/* Selection Summary */}
            <div className="mt-6 border-t border-ink/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Your Custom Selection</p>
              <p className="mt-1 text-base font-medium leading-snug text-ink">{summary}</p>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <a
                href={consultHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-ink py-3.5 px-6 font-semibold text-on-primary-ink shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <IconBrandWhatsapp size={20} />
                <span>Send this design on WhatsApp</span>
              </a>
              <p className="mt-2 text-center text-xs text-muted">
                Free consultation · Direct fit discussion with designer
              </p>
            </div>
          </div>

          {/* Right Scrollable Options */}
          <div className="space-y-10 lg:col-span-7">
            {/* Step 1: Front Necklines */}
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-ink text-xs font-bold text-on-primary-ink">
                  1
                </span>
                <h3 className="t-2 text-ink">Choose Front Neckline</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {NECKS.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setNeck(n.id)}
                    className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                      neck === n.id
                        ? 'border-primary-ink bg-primary-ink/5 ring-1 ring-primary-ink'
                        : 'border-ink/15 bg-white/85 hover:bg-white hover:border-ink/40'
                    }`}
                  >
                    <span className="block font-medium text-ink">{n.name}</span>
                    <span className="mt-1 block text-xs text-muted leading-tight">{n.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Back Necklines */}
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-ink text-xs font-bold text-on-primary-ink">
                  2
                </span>
                <h3 className="t-2 text-ink">Choose Back Cut & Depth</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {BACKS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBack(b.id)}
                    className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                      back === b.id
                        ? 'border-primary-ink bg-primary-ink/5 ring-1 ring-primary-ink'
                        : 'border-ink/15 bg-white/85 hover:bg-white hover:border-ink/40'
                    }`}
                  >
                    <span className="block font-medium text-ink">{b.name}</span>
                    <span className="mt-1 block text-xs text-muted leading-tight">{b.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sleeve Style */}
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-ink text-xs font-bold text-on-primary-ink">
                  3
                </span>
                <h3 className="t-2 text-ink">Choose Sleeve Style</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SLEEVES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSleeve(s.id)}
                    className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 ${
                      sleeve === s.id
                        ? 'border-primary-ink bg-primary-ink/5 ring-1 ring-primary-ink'
                        : 'border-ink/15 bg-white/85 hover:bg-white hover:border-ink/40'
                    }`}
                  >
                    <span className="block font-medium text-ink">{s.name}</span>
                    <span className="mt-1 block text-xs text-muted leading-tight">{s.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Finishing Touches */}
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-ink text-xs font-bold text-on-primary-ink">
                  4
                </span>
                <h3 className="t-2 text-ink">Finishing Touches & Handwork</h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {EXTRAS.map((x) => {
                  const checked = selectedExtras.includes(x.id)
                  return (
                    <button
                      key={x.id}
                      type="button"
                      onClick={() => toggleExtra(x.id)}
                      className={`cursor-pointer flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                        checked
                          ? 'border-accent bg-accent/10 ring-1 ring-accent'
                          : 'border-ink/15 bg-white/85 hover:bg-white hover:border-ink/40'
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border transition-colors ${
                          checked
                            ? 'border-accent bg-accent text-dark'
                            : 'border-ink/30 bg-transparent'
                        }`}
                      >
                        {checked && <IconCheck size={14} stroke={2.5} />}
                      </span>
                      <div>
                        <span className="block font-medium text-ink">{x.name}</span>
                        <span className="mt-0.5 block text-xs text-muted leading-tight">{x.note}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
