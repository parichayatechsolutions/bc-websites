// scripts/lib/photo-prompts.mjs
// Builds the Gemini prompts for one boutique's photographs, from that
// boutique's own details — what they stitch, the colours in their logo, their
// city — so the images match the shop rather than being generic Indian
// fashion stock.
//
// Three rules the prompts always carry, and why:
//
//   No faces.    A generated "owner" would be a photograph of a person who
//                does not exist, presented as a real named person. We don't
//                make those. Hands, backs and garments only; the owner's
//                photo is real or the site leaves it out.
//   No text.     Generated lettering on a shopfront or a label is the
//                fastest way for an image to look fake.
//   ai-* names.  Every generated file is named so it can always be told from
//                a real one, and the validator can stop a sold site running
//                on them.

/** Colour names Gemini understands, and roughly where they sit in RGB. */
const NAMED = {
  maroon: '#7A1F2B', wine: '#5E1A2E', crimson: '#B3261E', 'rani pink': '#C2185B', pink: '#D8577E',
  magenta: '#A0206E', purple: '#5B2A6E', lavender: '#9C88C4', 'peacock blue': '#0F5E73',
  navy: '#1F2A55', 'royal blue': '#2B4BA8', teal: '#1F7A7A', 'bottle green': '#1F4D3A',
  'emerald green': '#2E6B4F', 'mint green': '#8CC7A9', mustard: '#C99A2E', gold: '#C9A24A',
  saffron: '#E0B000', orange: '#D2691E', peach: '#F2B38F', copper: '#B06A3B', brown: '#6B4226',
  black: '#1A1A1A', ivory: '#F3EDE3', silver: '#9CA3AF',
}

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

/** "#5B2A6E" → "purple". Gemini does better with a word than a hex code. */
export function colourName(hex) {
  if (!/^#[0-9a-f]{6}$/i.test(hex ?? '')) return 'deep red'
  const [r, g, b] = rgb(hex)
  let best = 'deep red'
  let closest = Infinity
  for (const [name, value] of Object.entries(NAMED)) {
    const [x, y, z] = rgb(value)
    const distance = (r - x) ** 2 + (g - y) ** 2 + (b - z) ** 2
    if (distance < closest) {
      closest = distance
      best = name
    }
  }
  return best
}

const SHARED =
  'Photorealistic, shot on a 50mm lens, soft natural daylight, no harsh shadows, no flash. No people and no faces. No text, no lettering, no logos, no watermarks, no signage. Not over-saturated.'

/** What each kind of work photo shows. `c` is the brand colour's name, `a` the accent's. */
const GARMENTS = {
  bridal: (c, a) =>
    `A finished Indian bridal blouse in ${c} silk, covered in dense hand aari and maggam embroidery with ${a} zari thread, small mirrors and bead work, displayed on a plain dress form against a warm off-white wall. Three-quarter view, the embroidery catching the light.`,
  lehenga: (c, a) =>
    `A finished Indian bridal lehenga skirt in ${c} raw silk with a wide ${a} zari border and hand embroidery, hung so the pleats fall open, against a warm off-white wall. Full length, the border sharp and the fabric heavy.`,
  saree: (c, a) =>
    `A silk saree in ${c} with a broad ${a} zari border and a richly woven pallu, draped over a wooden stand against a warm off-white wall. The border and pallu clearly visible.`,
  blouse: (c, a) =>
    `A designer saree blouse in ${c} silk with neat hand embroidery and ${a} piping at the neck and sleeves, on a plain dress form against a warm off-white wall. Close enough to read the stitching.`,
  gown: (c, a) =>
    `An Indo-Western evening gown in ${c} with ${a} hand embellishment at the bodice, hung against a warm off-white wall so the drape and the can-can volume show.`,
  western: (c, a) =>
    `A tailored Indo-Western outfit in ${c} with restrained ${a} detailing, on a plain dress form against a warm off-white wall. Clean lines, precise fit.`,
  kids: (c, a) =>
    `A small child's traditional South Indian pattu langa in ${c} silk with a ${a} zari border, on a child-size dress form against a warm off-white wall. No child, no face — the garment only.`,
  men: (c, a) =>
    `A men's silk kurta in ${c} with fine ${a} thread work at the placket and collar, on a plain dress form against a warm off-white wall.`,
}

const FALLBACK = (c, a) =>
  `A finished Indian garment in ${c} silk with hand embroidery in ${a} thread, on a plain dress form against a warm off-white wall, lit so the stitching reads clearly.`

/** The photographs that aren't of a finished piece. */
const SCENES = {
  storefront: ({ city }) =>
    `The outside of a small tailoring and ethnic wear boutique on a neighbourhood street in ${city}, India. Glass frontage with garments visible inside, late afternoon daylight, a clean and cared-for shop. Straight on, eye level. Absolutely no readable signage, lettering or brand names anywhere in the frame.`,
  interior: () =>
    `Inside a small Indian tailoring boutique: bolts of silk stacked on wooden shelves, finished garments on a hanging rail, a cutting table with brown paper patterns and tailor's chalk. Warm daylight from a side window. Tidy, lived-in, no people.`,
  'team-at-work': () =>
    `Hands guiding fabric under the needle of a sewing machine in an Indian tailoring workshop, thread spools and fabric scraps around. Shot from above and slightly behind, so no face is visible. Warm working light, shallow depth of field.`,
  closeup: ({ accent }) =>
    `Macro close-up of hand aari embroidery in progress on silk: ${accent} zari thread, tiny mirrors and beads, the aari needle resting on the fabric. Raking daylight so the thread casts a shadow. No hands, no face.`,
}

const RATIOS = {
  storefront: '4:3',
  interior: '3:2',
  'team-at-work': '3:2',
  closeup: '1:1',
  work: '4:5',
}

/** "work-bridal-01.jpg" → { kind: 'work', category: 'bridal', n: '01' } */
function readName(file) {
  const stem = file.replace(/\.[^.]+$/, '')
  const work = stem.match(/^work-(?:([a-z]+)-)?(\d+)$/i)
  if (work) return { kind: 'work', category: (work[1] ?? '').toLowerCase(), n: work[2] }
  const scene = stem.match(/^([a-z-]+?)-?(\d*)$/i)
  return { kind: (scene?.[1] ?? stem).toLowerCase(), category: '', n: scene?.[2] ?? '' }
}

/**
 * Every prompt for one boutique: { file, aiFile, title, prompt, ratio }.
 * `file` is the name the site expects; `aiFile` is what a generated stand-in
 * is saved as until a real photograph replaces it.
 */
export function promptsFor(config) {
  const colour = colourName(config.brand?.colors?.primary)
  const accent = colourName(config.brand?.colors?.accent)
  const city = config.branches?.[0]?.city ?? 'Bengaluru'
  const captions = config.media?.captions ?? {}

  const wanted = [
    config.media?.storefront,
    ...(config.media?.interior ?? []),
    config.media?.teamAtWork,
    ...(config.media?.work ?? []),
    ...(config.media?.closeups ?? []),
  ].filter(Boolean)

  return [...new Set(wanted)].map((file) => {
    const { kind, category } = readName(file)
    const scene = SCENES[kind] ?? SCENES[kind.replace(/-\d+$/, '')]

    const body = scene
      ? scene({ city, accent })
      : (GARMENTS[category] ?? FALLBACK)(colour, accent)

    // What the team wrote about this photo tells Gemini what it really is.
    const note = captions[file] ? ` The piece is: ${captions[file]}.` : ''
    const ratio = RATIOS[kind] ?? RATIOS.work

    return {
      file,
      aiFile: `ai-${file.replace(/\.[^.]+$/, '')}.jpg`,
      title: category ? `${category[0].toUpperCase()}${category.slice(1)} — ${file}` : file,
      prompt: `${body}${note} ${SHARED} Aspect ratio ${ratio}.`,
      ratio,
    }
  })
}

/** The whole photos-prompt.md for one boutique. */
export function sheetFor(config) {
  const prompts = promptsFor(config)
  const name = config.brand?.name ?? config.slug
  const colour = colourName(config.brand?.colors?.primary)
  const accent = colourName(config.brand?.colors?.accent)

  const blocks = prompts
    .map(
      (p) => `### ${p.title}

Save as \`${p.aiFile}\` — or, once ${name} gives you the real photograph, \`${p.file}\`.

\`\`\`
${p.prompt}
\`\`\`
`,
    )
    .join('\n')

  return `# Photographs for ${name}

Generated by \`npm run prompts\`. Don't edit by hand — change the boutique's
\`data.md\` and run it again.

These prompts are written from this boutique's own details: their colours
(${colour} and ${accent}), what they stitch, and their city. Paste one into
Gemini, generate, and drop the image into this folder.

## Before you start

**Real photographs always beat generated ones.** Five real pictures from the
owner's phone — the storefront, their best piece, a close-up of the handwork,
someone working, and inside the shop — will sell better than thirty generated
ones. Use these only to fill the gaps until the real ones arrive.

**Naming.** Save a generated image as \`ai-<name>.jpg\`, exactly as each block
below says. The \`ai-\` prefix is how we can always tell generated from real,
and the site refuses to go live for a boutique that has bought it while
generated images are still in place.

**No faces, ever.** These prompts never ask for a person. A generated picture
of "the owner" would be a photograph of someone who does not exist presented
as a real, named woman. If the owner is happy to be photographed, use a real
photograph; otherwise the site simply leaves that out.

**No text in the image.** Generated signboards and labels are the fastest way
for a picture to look fake, so every prompt rules them out. Check the result
and regenerate if any lettering appears.

## The prompts

${blocks}`
}
