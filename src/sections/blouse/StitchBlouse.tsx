// src/sections/blouse/StitchBlouse.tsx
// Stitch line Blouse Design Picker (Lab: Variant V, "Stitch line")
// Four steps strung on a dashed thread; the picked step opens below.
// Includes live SVG blouse drawings (Front & Back) with gold zari borders, piping,
// embroidery and latkans, with a 1-tap WhatsApp consultation button.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useBlouse } from './blouseShared'

type Point = [number, number]

const NECKS = [
  ['round', 'Round', 'Classic and easy to wear with any saree', 'round neck'],
  ['boat', 'Boat', 'Wide and shallow, shows the collarbone', 'boat neck'],
  ['v', 'V-neck', 'Lengthens the neck', 'V-neck'],
  ['square', 'Square', 'A neat frame for a necklace', 'square neck'],
  ['sweet', 'Sweetheart', 'A soft curve for bridal and party wear', 'sweetheart neck'],
  ['high', 'High neck', 'Covers the neck; leaves room for handwork on the collar', 'high neck'],
] as const

const BACKS = [
  ['u', 'Deep U', 'The most asked-for bridal back', 'deep U back'],
  ['vb', 'Deep V', 'Dramatic, often finished with a dori tie', 'deep V back'],
  ['win', 'Keyhole', 'A small opening with more coverage', 'keyhole back'],
  ['sq', 'Low square', 'A clean frame for back embroidery', 'low square back'],
] as const

const SLV = [
  ['none', 'Sleeveless', 'Light and cool for summer functions', 'no sleeves'],
  ['cap', 'Cap', 'Just covers the shoulder', 'cap sleeves'],
  ['puff', 'Puff', 'Gathered at the top for a playful shape', 'puff sleeves'],
  ['elbow', 'Elbow', 'The bridal favourite, room for sleeve work', 'elbow-length sleeves'],
  ['three', 'Three-quarter', 'Graceful and covered', 'three-quarter sleeves'],
] as const

const EXTRAS = [
  ['Piping', 'A thin contrast edge on the neck and sleeves'],
  ['Latkans', 'Tassels that hang from the back tie'],
  ['Dori tie', 'Adjustable strings at the back'],
  ['Aari work', 'Fine needle embroidery'],
  ['Maggam work', 'Raised bridal embroidery with stones and beads'],
  ['Zari border', 'A gold border on the sleeves'],
] as const

const FN: Record<string, [Point, Point, string]> = {
  round: [[80, 28], [120, 28], 'C 118 52 82 52 80 28'],
  boat: [[68, 31], [132, 31], 'C 120 43 80 43 68 31'],
  v: [[80, 28], [120, 28], 'L 100 66 L 80 28'],
  square: [[80, 28], [120, 28], 'L 120 50 L 80 50 L 80 28'],
  sweet: [[80, 28], [120, 28], 'C 123 50 107 57 100 46 C 93 57 77 50 80 28'],
  high: [[88, 22], [112, 22], 'C 110 31 90 31 88 22'],
}

const FBK: Record<string, [Point, Point, string, number, string?]> = {
  u: [[80, 28], [120, 28], 'C 121 106 79 106 80 28', 84],
  vb: [[80, 28], [120, 28], 'L 100 108 L 80 28', 104],
  win: [[82, 28], [118, 28], 'C 116 40 84 40 82 28', 36, ' M 100 50 C 113 50 113 72 100 80 C 87 72 87 50 100 50 Z'],
  sq: [[78, 28], [122, 28], 'L 122 84 L 78 84 L 78 28', 84],
}

const FS: Record<string, [Point[], Point[] | null]> = {
  none: [[[60, 33], [56, 50], [60, 66]], null],
  cap: [[[50, 36], [38, 58], [50, 66]], [[41, 53], [53, 61]]],
  puff: [[[50, 36], [38, 37], [29, 47], [31, 60], [42, 66], [55, 68]], [[33, 56], [45, 63]]],
  elbow: [[[50, 36], [26, 100], [40, 106]], [[29, 92], [43, 98]]],
  three: [[[50, 36], [18, 132], [32, 137]], [[20, 124], [34, 129]]],
}

const mir = (p: Point): Point => [200 - p[0], p[1]]
const pt = (p: Point) => `${p[0]} ${p[1]}`

function flat(neckOrBackIdx: number, sleeveIdx: number, back: boolean, ex: number[]) {
  const N = back ? FBK[BACKS[neckOrBackIdx][0]] || FBK.u : FN[NECKS[neckOrBackIdx][0]] || FN.round
  const [sl, cuff] = FS[SLV[sleeveIdx][0]] || FS.elbow
  const left = sl.map(pt).join(' L ')
  const right = sl.slice().reverse().map((p) => pt(mir(p))).join(' L ')
  const d = `M ${pt(N[0])} L ${left} L 64 76 L 68 139 Q 100 147 132 139 L 136 76 L ${right} L ${pt(N[1])} ${N[2]} Z${N[4] || ''}`
  const neckCurve = `M ${pt(N[1])} ${N[2]}`
  const has = (i: number) => ex.includes(i)
  const band = has(5)
    ? `M 69 131 Q 100 139 131 131${cuff ? ` M ${pt(cuff[0])} L ${pt(cuff[1])} M ${pt(mir(cuff[0]))} L ${pt(mir(cuff[1]))}` : ''}`
    : ''
  const ty = (back ? N[3] : 0) ?? 0
  const tie = back && (has(1) || has(2)) ? `M 97 ${ty} L 93 ${ty + 26} M 103 ${ty} L 107 ${ty + 26}` : ''
  const tassel =
    back && has(1)
      ? [93, 107].map((x) => `M ${x - 3} ${ty + 26} L ${x + 3} ${ty + 26} L ${x} ${ty + 36} Z`).join(' ')
      : ''
  return { d, band, pipe: has(0) ? neckCurve : '', beads: has(3) || has(4) ? neckCurve : '', tie, tassel }
}

export default function StitchBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()

  // 0: Neck, 1: Back, 2: Sleeves, 3: Extras
  const [bst, setBst] = useState<number>(3)
  const [bn, setBn] = useState<number>(0) // Round neck
  const [bb, setBb] = useState<number>(1) // Deep V back
  const [bs, setBs] = useState<number>(2) // Puff sleeves
  const [bx, setBx] = useState<number[]>([3, 4, 5]) // Aari work, Maggam work, Zari border

  if (!stitchesBlouses) return null

  const exOn = bx.map((i) => EXTRAS[i][0])
  const exSummary = exOn.length ? exOn.join(', ') : 'None'

  const steps = [
    { label: 'NECK', value: NECKS[bn][1] },
    { label: 'BACK', value: BACKS[bb][1] },
    { label: 'SLEEVES', value: SLV[bs][1] },
    { label: 'EXTRAS', value: exSummary },
  ]

  const front = flat(bn, bs, false, bx)
  const back = flat(bb, bs, true, bx)

  // Message for WhatsApp
  const exMsgText = exOn.length ? `, with ${exOn.join(', ').toLowerCase()}` : ''
  const waMsg = `Hi ${boutique.brand.name}, I would like a blouse with a ${NECKS[bn][3]}, ${BACKS[bb][3]} and ${SLV[bs][3]}${exMsgText}. What would it cost?`
  const waHref = whatsappLink(boutique, waMsg)

  return (
    <section
      id="blouse"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: 'var(--c-paper)',
        color: 'var(--c-ink)',
        padding: 'clamp(4.5rem, 11cqw, 9rem) 0',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(1.25rem, 5cqw, 4rem)', boxSizing: 'border-box' }}>
        {/* Eyebrow */}
        <p
          style={{
            margin: '0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.24em',
            textTransform: 'uppercase',
            color: 'var(--c-primary-ink)',
          }}
        >
          <span style={{ width: 32, height: 1, background: 'currentColor' }} />
          DESIGN YOUR BLOUSE
        </p>

        {/* Heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--f-display)',
            fontWeight: 400,
            fontSize: 'clamp(2.3rem, 5.6cqw, 4.6rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.012em',
            textWrap: 'balance',
          }}
        >
          Stitch it <em style={{ fontStyle: 'italic', color: 'var(--c-thread)' }}>step by step</em>
        </h2>

        {/* Thread and Steps */}
        <div style={{ position: 'relative', marginTop: 44 }}>
          {/* Dashed connector thread */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '4%',
              right: '4%',
              top: 27,
              borderTop: '2px dashed var(--c-thread)',
            }}
          />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8 }}>
            {steps.map((st, i) => {
              const active = i === bst
              return (
                <button
                  key={st.label}
                  type="button"
                  onClick={() => setBst(i)}
                  style={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                    textAlign: 'center',
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--f-display)',
                      fontSize: 22,
                      background: active ? 'var(--c-primary-ink)' : 'var(--c-paper)',
                      color: active ? 'var(--c-on-primary-ink)' : 'var(--c-primary-ink)',
                      boxShadow: '0 0 0 1.5px var(--c-primary-ink)',
                      transition: 'background-color 250ms, color 250ms',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: '.18em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      color: 'var(--c-primary-ink)',
                    }}
                  >
                    {st.label}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--f-display)',
                      fontSize: 'clamp(1rem, 1.8cqw, 1.3rem)',
                      lineHeight: 1.2,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {st.value}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content area: Option cards on left, Blouse drawings + CTA on right */}
        <div
          style={{
            marginTop: 36,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(28px, 4cqw, 48px)',
            alignItems: 'flex-start',
          }}
        >
          {/* Options Grid */}
          <div style={{ flex: '2 1 380px', minWidth: 0 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(130px, 14cqw, 160px), 1fr))',
                gap: 12,
              }}
            >
              {bst === 0 &&
                NECKS.map(([key, name, note], i) => {
                  const on = i === bn
                  const dg = flat(i, bs, false, bx)
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBn(i)}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        padding: 12,
                        borderRadius: 18,
                        background: 'var(--c-light)',
                        boxShadow: on
                          ? '0 0 0 2px var(--c-primary-ink)'
                          : '0 0 0 1px color-mix(in oklab, var(--c-ink) 12%, transparent)',
                        transition: 'box-shadow 200ms',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '5/4',
                          background: 'var(--c-light)',
                          borderRadius: 10,
                        }}
                      >
                        <svg
                          viewBox="0 0 200 160"
                          aria-hidden="true"
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                        >
                          <path
                            d={dg.d}
                            fillRule="evenodd"
                            style={{
                              fill: 'color-mix(in oklab, var(--c-primary) 12%, var(--c-light))',
                              stroke: 'var(--c-primary-ink)',
                              strokeWidth: 1.6,
                              strokeLinejoin: 'round',
                              transition: 'd 500ms',
                            }}
                          />
                          <path
                            d="M 85 141 L 89 106 M 115 141 L 111 106"
                            style={{
                              fill: 'none',
                              stroke: 'var(--c-primary-ink)',
                              strokeWidth: 1,
                              strokeDasharray: '3 3',
                              opacity: 0.55,
                            }}
                          />
                          <path d={dg.band} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 4, strokeLinecap: 'round' }} />
                          <path d={dg.pipe} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 2.6, strokeLinejoin: 'round' }} />
                          <path
                            d={dg.beads}
                            style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 3.4, strokeDasharray: '0 6.5', strokeLinecap: 'round' }}
                          />
                          <path d={dg.tie} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 1.6, strokeLinecap: 'round' }} />
                          <path d={dg.tassel} style={{ fill: 'var(--c-accent)', stroke: 'none' }} />
                        </svg>
                      </div>
                      <span style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: '1.2rem', lineHeight: 1.15 }}>{name}</span>
                      <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--c-muted)' }}>{note}</span>
                    </button>
                  )
                })}

              {bst === 1 &&
                BACKS.map(([key, name, note], i) => {
                  const on = i === bb
                  const dg = flat(i, bs, true, bx)
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBb(i)}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        padding: 12,
                        borderRadius: 18,
                        background: 'var(--c-light)',
                        boxShadow: on
                          ? '0 0 0 2px var(--c-primary-ink)'
                          : '0 0 0 1px color-mix(in oklab, var(--c-ink) 12%, transparent)',
                        transition: 'box-shadow 200ms',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '5/4',
                          background: 'var(--c-light)',
                          borderRadius: 10,
                        }}
                      >
                        <svg
                          viewBox="0 0 200 160"
                          aria-hidden="true"
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                        >
                          <path
                            d={dg.d}
                            fillRule="evenodd"
                            style={{
                              fill: 'color-mix(in oklab, var(--c-primary) 12%, var(--c-light))',
                              stroke: 'var(--c-primary-ink)',
                              strokeWidth: 1.6,
                              strokeLinejoin: 'round',
                              transition: 'd 500ms',
                            }}
                          />
                          <path
                            d="M 85 141 L 89 106 M 115 141 L 111 106"
                            style={{
                              fill: 'none',
                              stroke: 'var(--c-primary-ink)',
                              strokeWidth: 1,
                              strokeDasharray: '3 3',
                              opacity: 0.55,
                            }}
                          />
                          <path d={dg.band} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 4, strokeLinecap: 'round' }} />
                          <path d={dg.pipe} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 2.6, strokeLinejoin: 'round' }} />
                          <path
                            d={dg.beads}
                            style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 3.4, strokeDasharray: '0 6.5', strokeLinecap: 'round' }}
                          />
                          <path d={dg.tie} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 1.6, strokeLinecap: 'round' }} />
                          <path d={dg.tassel} style={{ fill: 'var(--c-accent)', stroke: 'none' }} />
                        </svg>
                      </div>
                      <span style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: '1.2rem', lineHeight: 1.15 }}>{name}</span>
                      <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--c-muted)' }}>{note}</span>
                    </button>
                  )
                })}

              {bst === 2 &&
                SLV.map(([key, name, note], i) => {
                  const on = i === bs
                  const dg = flat(bn, i, false, bx)
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBs(i)}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        padding: 12,
                        borderRadius: 18,
                        background: 'var(--c-light)',
                        boxShadow: on
                          ? '0 0 0 2px var(--c-primary-ink)'
                          : '0 0 0 1px color-mix(in oklab, var(--c-ink) 12%, transparent)',
                        transition: 'box-shadow 200ms',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '5/4',
                          background: 'var(--c-light)',
                          borderRadius: 10,
                        }}
                      >
                        <svg
                          viewBox="0 0 200 160"
                          aria-hidden="true"
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                        >
                          <path
                            d={dg.d}
                            fillRule="evenodd"
                            style={{
                              fill: 'color-mix(in oklab, var(--c-primary) 12%, var(--c-light))',
                              stroke: 'var(--c-primary-ink)',
                              strokeWidth: 1.6,
                              strokeLinejoin: 'round',
                              transition: 'd 500ms',
                            }}
                          />
                          <path
                            d="M 85 141 L 89 106 M 115 141 L 111 106"
                            style={{
                              fill: 'none',
                              stroke: 'var(--c-primary-ink)',
                              strokeWidth: 1,
                              strokeDasharray: '3 3',
                              opacity: 0.55,
                            }}
                          />
                          <path d={dg.band} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 4, strokeLinecap: 'round' }} />
                          <path d={dg.pipe} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 2.6, strokeLinejoin: 'round' }} />
                          <path
                            d={dg.beads}
                            style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 3.4, strokeDasharray: '0 6.5', strokeLinecap: 'round' }}
                          />
                          <path d={dg.tie} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 1.6, strokeLinecap: 'round' }} />
                          <path d={dg.tassel} style={{ fill: 'var(--c-accent)', stroke: 'none' }} />
                        </svg>
                      </div>
                      <span style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: '1.2rem', lineHeight: 1.15 }}>{name}</span>
                      <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--c-muted)' }}>{note}</span>
                    </button>
                  )
                })}

              {bst === 3 &&
                EXTRAS.map(([name, note], i) => {
                  const on = bx.includes(i)
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setBx((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        padding: 14,
                        borderRadius: 18,
                        background: 'var(--c-light)',
                        boxShadow: on
                          ? '0 0 0 2px var(--c-primary-ink)'
                          : '0 0 0 1px color-mix(in oklab, var(--c-ink) 12%, transparent)',
                        transition: 'box-shadow 200ms',
                      }}
                    >
                      <span style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: '1.2rem', lineHeight: 1.15 }}>{name}</span>
                      <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--c-muted)' }}>{note}</span>
                    </button>
                  )
                })}
            </div>
          </div>

          {/* Front & Back SVG Drawings + WhatsApp button */}
          <div style={{ flex: '1 1 240px', minWidth: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(12px, 2cqw, 24px)' }}>
              {/* Front Figure */}
              <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '5/4', background: 'var(--c-paper)' }}>
                  <svg
                    viewBox="0 0 200 160"
                    aria-hidden="true"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                  >
                    <path
                      d={front.d}
                      fillRule="evenodd"
                      style={{
                        fill: 'color-mix(in oklab, var(--c-primary) 12%, var(--c-light))',
                        stroke: 'var(--c-primary-ink)',
                        strokeWidth: 1.6,
                        strokeLinejoin: 'round',
                        transition: 'd 500ms',
                      }}
                    />
                    <path
                      d="M 85 141 L 89 106 M 115 141 L 111 106"
                      style={{
                        fill: 'none',
                        stroke: 'var(--c-primary-ink)',
                        strokeWidth: 1,
                        strokeDasharray: '3 3',
                        opacity: 0.55,
                      }}
                    />
                    <path d={front.band} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 4, strokeLinecap: 'round' }} />
                    <path d={front.pipe} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 2.6, strokeLinejoin: 'round' }} />
                    <path
                      d={front.beads}
                      style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 3.4, strokeDasharray: '0 6.5', strokeLinecap: 'round' }}
                    />
                    <path d={front.tie} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 1.6, strokeLinecap: 'round' }} />
                    <path d={front.tassel} style={{ fill: 'var(--c-accent)', stroke: 'none' }} />
                  </svg>
                </div>
                <span
                  style={{
                    font: '600 11px ui-monospace, Menlo, monospace',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--c-muted)',
                  }}
                >
                  Front
                </span>
              </figure>

              {/* Back Figure */}
              <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '5/4', background: 'var(--c-paper)' }}>
                  <svg
                    viewBox="0 0 200 160"
                    aria-hidden="true"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                  >
                    <path
                      d={back.d}
                      fillRule="evenodd"
                      style={{
                        fill: 'color-mix(in oklab, var(--c-primary) 12%, var(--c-light))',
                        stroke: 'var(--c-primary-ink)',
                        strokeWidth: 1.6,
                        strokeLinejoin: 'round',
                        transition: 'd 500ms',
                      }}
                    />
                    <path
                      d="M 85 141 L 89 106 M 115 141 L 111 106"
                      style={{
                        fill: 'none',
                        stroke: 'var(--c-primary-ink)',
                        strokeWidth: 1,
                        strokeDasharray: '3 3',
                        opacity: 0.55,
                      }}
                    />
                    <path d={back.band} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 4, strokeLinecap: 'round' }} />
                    <path d={back.pipe} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 2.6, strokeLinejoin: 'round' }} />
                    <path
                      d={back.beads}
                      style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 3.4, strokeDasharray: '0 6.5', strokeLinecap: 'round' }}
                    />
                    <path d={back.tie} style={{ fill: 'none', stroke: 'var(--c-accent)', strokeWidth: 1.6, strokeLinecap: 'round' }} />
                    <path d={back.tassel} style={{ fill: 'var(--c-accent)', stroke: 'none' }} />
                  </svg>
                </div>
                <span
                  style={{
                    font: '600 11px ui-monospace, Menlo, monospace',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--c-muted)',
                  }}
                >
                  Back
                </span>
              </figure>
            </div>

            {/* WhatsApp Action Button */}
            <div style={{ marginTop: 20 }}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  minHeight: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  borderRadius: 999,
                  padding: '0 26px',
                  fontSize: 15,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  background: 'var(--c-primary-ink)',
                  color: 'var(--c-on-primary-ink)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                  transition: 'transform 200ms ease',
                }}
              >
                <IconBrandWhatsapp size={20} />
                <span>Send this design</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
