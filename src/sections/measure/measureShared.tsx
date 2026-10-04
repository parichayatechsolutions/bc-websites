// src/sections/measure/measureShared.tsx
// The ten blouse measurements, how to take each, and where the tape goes on
// the drawing (the same flat blouse as the blouse designer: round neck,
// deep U back, elbow sleeves). Shared by the measurement guide and form.
//
// Shows only for a boutique that stitches blouses (useBlouse).

import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { BlouseFlat } from '../blouse/blouseDrawing'

export interface IMeasure {
  id: string
  name: string
  how: string
  /** Where the tape lies, on the 200 × 160 drawing. */
  tape: string
  back?: boolean
}

export const MEASURES: IMeasure[] = [
  { id: 'bust', name: 'Bust', how: 'Around the fullest part of the chest. Keep the tape level across the back.', tape: 'M 60 84 L 140 84' },
  { id: 'under', name: 'Under bust', how: 'Just below the bust, snug but not tight.', tape: 'M 64 112 L 136 112' },
  { id: 'waist', name: 'Waist', how: 'Where the blouse will end, about two inches below the under bust.', tape: 'M 66 139 L 134 139' },
  { id: 'shoulder', name: 'Shoulder', how: 'From one shoulder tip to the other, across the back.', tape: 'M 50 30 L 150 30', back: true },
  { id: 'armhole', name: 'Armhole', how: 'All the way round the arm where it meets the shoulder.', tape: 'M 50 36 Q 53 60 64 76' },
  { id: 'sleeve', name: 'Sleeve length', how: 'From the shoulder tip down to where you want the sleeve to end.', tape: 'M 44 33 L 20 97' },
  { id: 'round', name: 'Sleeve round', how: 'Around the arm where the sleeve will end.', tape: 'M 26 100 L 40 106' },
  { id: 'fneck', name: 'Front neck depth', how: 'From the shoulder line down to where you want the front neck to dip.', tape: 'M 100 28 L 100 52' },
  { id: 'bneck', name: 'Back neck depth', how: 'From the shoulder line down to where you want the back to dip.', tape: 'M 100 28 L 100 106', back: true },
  { id: 'length', name: 'Blouse length', how: 'From the shoulder down to where the blouse ends.', tape: 'M 162 36 L 162 141' },
]

/** The blouse with one measurement's tape line drawn on it, front or back as the measurement needs. */
export function TapeDrawing({ measure }: { measure: IMeasure }) {
  return (
    <BlouseFlat neck={measure.back ? 'u' : 'round'} sleeve="elbow" back={measure.back}>
      <path d={measure.tape} fill="none" strokeWidth={2.6} strokeLinecap="round" strokeDasharray="5 4" style={{ stroke: 'var(--c-thread)' }} />
    </BlouseFlat>
  )
}

/** The WhatsApp message: every measurement, filled where she gave a value. */
export function useSendMeasurements() {
  const { boutique } = useBoutique()
  return (values: Record<string, string> = {}, unit = 'inches') => {
    const lines = MEASURES.map((m) => `${m.name}: ${values[m.id]?.trim() || ''}`).join('\n')
    return whatsappLink(boutique, `Hi ${boutique.brand.name}, here are my blouse measurements (in ${unit}):\n${lines}`)
  }
}
