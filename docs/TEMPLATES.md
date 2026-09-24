# Template plan

Five templates, each a complete look *and* a complete page shape. Written down
so the work can be picked up one template at a time, in any session, without
re-deciding what was already settled.

Read [DESIGN.md](DESIGN.md) first: everything here obeys it. Where this plan
needs a rule changed, it says so and the change goes in DESIGN.md's decision
log before any code is written.

## Why five, and why these five

A boutique owner says yes when they see **their own work looking expensive**.
Not when the site is novel. So every template is judged on one question: does
this make *their* photos, *their* name and *their* twenty years look like
money?

What we have today is four looks sitting on one identical page shape
(hero → gallery → services → reviews). Different skins, same site. The five
below each get their own shape, chosen by what the boutique actually has to
show.

| # | Template | For a boutique whose pitch is | Page shape | Status |
|---|---|---|---|---|
| 1 | **Vitrine** | Range — "look at everything we make" | Lookbook: work in a categorised grid, photo first | New |
| 2 | **Arch** | Bridal — the big occasion | Ceremonial: one long reveal, deep brand colour | Restructure |
| 3 | **Atelier** | The owner — "she's stitched for twenty years" | Story: the person, the craft, the making, in order | Restructure |
| 4 | **Ledger** | New or thin — three photos, no story yet | One page, single scroll, oversized type doing the work | Restructure |
| 5 | **Wardrobe** | Rental — lehengas and gowns on rent | Collection with availability enquiry | New |

**Poster** stays as an alternate skin for Arch rather than a sixth template:
it is ceremonial in the same way, and five strong beats six thin.

**Wardrobe is not speculative.** Ayaana rents wedding lehengas, Anarghya has
"luxury bridal & occasion wear rental collections", Petals has a "rental
collection of ready designer gowns". Renting is a different transaction from
stitching and needs a different page.

**Ledger-as-one-page matters most right now**, because no boutique has photos
yet. A three-page site padded with placeholders looks worse than one honest
page.

## How each template gets designed

Four stages, in order, and each one is looked at and approved before the next
starts. Design decisions get made once, on purpose, instead of being
improvised inside the code.

### 1. Moodboard

What this template *feels* like, before any pixel of it is real: the mood in
words, reference imagery, textures, the kind of boutique it's for and the kind
it isn't. Where reference images are needed they come as Gemini prompts, since
we generate our own rather than lifting other studios' work.

Output: `docs/templates/<id>.md` (so later sessions can read the reasoning)
plus a page to actually look at.

### 2. Colours and type

The palette roles — which colour is the ground, which carries the brand, what
the rules and ornaments are drawn in — tested against **real boutique
colours**, not invented ones. Our palette is derived from each boutique's own
two brand colours, so a template has to hold up in deep maroon, in yellow and
black (Petals) and in pale pink alike.

The font pair, set at the sizes it will really be used at, with the boutique's
actual name in it — "Sarika Designer and Boutique" is 26 characters and that
is the test, not "Lorem".

Output: the palette roles and the pair added to `src/theme/fonts.ts`, both
shown on the same page.

### 3. Site map

Which pages, what is on each, in what order, and what happens when a boutique
is missing a piece of it. Written as a list of the components each page is
built from, so it maps directly onto `Design.tsx`.

This is also where the data gaps surface: if the map calls for something the
`data.md` sheet doesn't collect, it gets added to the sheet, the parser and
the validator before building starts.

### 4. Build

Only now is code written. New looks become components in `src/sections/`,
never markup inside a `Design.tsx`.

Finished means: applied to `sample-boutique` and two real boutiques, and
looked at on desktop, on a phone, and with reduced motion.

## What makes each one different

Today a design chooses its navigation, its footer, its sections and a font
pair. That isn't enough to stop five templates feeling like one. Each template
gets its own **style set**, applied the way colours already are — as CSS
variables on `.boutique`, so components read them and no component is forked
per template.

| | Vitrine | Arch | Atelier | Ledger | Wardrobe |
|---|---|---|---|---|---|
| **Display face** | Cormorant Garamond | Rozha One | Fraunces | Bodoni Moda | Instrument Serif |
| **Body face** | Jost | Mukta | Karla | Inter Tight | Instrument Sans |
| **Ground** | Light, neutral | Deep brand colour | Warm paper | White, stark | Light with brand tint |
| **Shape** | Square | Temple arch | Soft | Square, zero radius | Rounded |
| **Icon stroke** | 1.25 hairline | 1.5 | 1.25 | 2 | 1.5 |
| **Icon holder** | Circle outline | Filled pill | None — icon beside text | Square | Soft rectangle |
| **Rules** | Hairline | Dashed thread | Dashed thread | Heavy | Hairline |
| **Ornament** | None | Arch motif | Running stitch | None | Hanger rail |
| **Motion** | Photos reveal on scroll | Arch opens (pinned) | Text inks in | Type only, near-still | Collection slides |
| **Pace** | Spacious | Dramatic | Slow | Stark | Brisk |

No boutique design uses DM Sans: that is the font of our own pages (the
directory and the design cards), and keeping it separate stops our chrome and
their site looking related.

## What we'll need to build first

These are shared foundations. None of the five can be finished without them,
so they come before template work.

### A. Style tokens per design

Each `src/designs/<id>/Design.tsx` gains a `style` export beside `fonts`:

```ts
export const style: IDesignStyle = {
  ground: 'paper',            // page background: light | paper | dark | brand
  shape: 'soft',              // arch | square | soft
  icon: { stroke: 1.25 },     // weight every Tabler icon inherits
  holder: 'none',             // circle | pill | square | soft | none
  rule: 'stitch',             // hairline | stitch | heavy
  ornament: 'stitch',         // arch | stitch | rail | none
}
```

`themeStyle()` writes these as CSS variables (`--shape-radius`,
`--rule-style`, `--icon-stroke`…) exactly as it already does for colours and
fonts. Components read the variables. Nothing is forked per template.

### B. Icons — one set, five treatments

DESIGN.md settles Tabler as the only icon set, and WhatsApp, call and
directions must stay instantly recognisable. So the set doesn't change; the
treatment does — stroke weight, size, and the shape the icon sits in, all from
the style tokens above. Each template also gets one **ornament**: a small
drawn motif (arch, running stitch, hanger rail) that is its alone.

### C. Font pairs

`src/theme/fonts.ts` goes from four pairs to five, as tabled above, each with
a line on why it suits a boutique.

## What data is missing

Every new field changes all five of these together, as CLAUDE.md requires:
`src/types/boutique.ts`, the data sheet template, `scripts/lib/data-sheet.mjs`,
`scripts/lib/validate.mjs`, and `sample-boutique`.

| Need | For | How |
|---|---|---|
| **Photo categories** | Vitrine's grid filters | From the file name — `work-bridal-01.jpg`, `work-blouse-02.jpg`. No new field for the team to fill; the photo prompt file tells them the names. |
| **Photo captions** | Vitrine, Wardrobe | Optional "Photo notes" block in `data.md`: file name → one line ("Bridal blouse, aari work, 12 days"). |
| **Making steps** | Atelier | `process?: { title, text }[]`. Today `StickyProcess` hard-codes five generic steps, which is the same on 500 sites. Ask the boutique how *they* work. |
| **Rental** | Wardrobe | `rental?: { items, startingAt?, deposit?, duration? }` and a new data sheet section. |
| **Occasions** | Arch | `occasions?: string[]` — wedding, reception, engagement, festival, housewarming. |

Everything else the five need — story, stats, reviews, rating, branches,
prices, delivery days, languages — is already collected.

## Photos

No template closes a deal on placeholder textures. Each boutique needs **five
photos**, not thirty:

1. The storefront, so they recognise their own shop
2. Their single best finished piece, on a plain wall
3. A close-up of handwork — aari, maggam, zardosi
4. The owner at work
5. Inside the shop

A phone camera in daylight is fine. No flash, plain background.

### `photos-prompt.md`

Until real photos arrive, `boutiques/<slug>/photos/photos-prompt.md` holds the
prompts to paste into Gemini — **written for that boutique**, using their own
services, their own colours and their own city, not a generic list. It is
generated by a script from their `data.md`, so it is never out of date:

```
npm run prompts -- <slug>      # or --all
```

Rules the generator follows:

- Generated files are named `ai-*.jpg`, so they are always identifiable.
- **No faces.** Hands, backs, and garments only. A generated "owner" would be
  a photograph of a person who does not exist, presented as a real named
  person — we don't make those. The owner's photo is real or the template
  leaves it out.
- No text, no logos, no signage in the image: generated lettering is the
  fastest way to look fake.
- The garment, fabric and colours come from the boutique's own data, so the
  images match what they actually stitch.

**AI photos are for the demo only.** The validator gains an error: a boutique
marked sold must not still be using `ai-*` images. Real work replaces them
before the site goes live.

## Order of work

Foundations first, then one template at a time. Each template is finished —
built, applied to `sample-boutique` and two real boutiques, and looked at on
desktop, phone and reduced motion — before the next one starts.

| Step | What | Why this order |
|---|---|---|
| 0 | Style tokens, fonts, icon treatments, `photos-prompt.md` generator | Nothing else can be finished without them |
| 1 | **Vitrine** | Biggest gap; it is what these boutiques actually sell on, and it makes collecting photos pay off |
| 2 | **Ledger** as one-page | What most of the 30 should ship as today |
| 3 | **Atelier** as story | Needs the new `process` data |
| 4 | **Arch** restructured | Already strong; restructuring is the smaller job |
| 5 | **Wardrobe** | Needs the new rental data and rental boutiques identified |

## Settled

**The five replace the current four.** Arch, Atelier and Ledger are
restructured; Poster becomes Arch's alternate skin; Vitrine and Wardrobe are
new. No boutique keeps a page shape that isn't one of the five.

**Five boutiques rent**, found in what they already told us, so nobody needs
sending back out to ask:

| Boutique | In their own words |
|---|---|
| 17-ayaanadesigners | "Bridal Wear, Rental Couture & Custom Designer Dresses" |
| 21-dharyadesigner | "Luxury Bridal Couture… & Designer Rentals"; photoshoot gown rentals |
| 28-petalsdesigner | "Designer Blouses, Bridal Embroidery & Gown Rentals" |
| 18-anarghyadesigner | "exclusive bridal rental collection" |
| 2-vastravinyasaki | "Costumes on rent" (secondary to stitching) |

Four of the five put rental in their tagline. That is 17% of the thirty
collected, so on the order of eighty of the five hundred. Their rental
sections get filled from what is already in their sheets; only the prices and
deposit need asking.

**We write the making steps**, not the field team. They come from what the
owner already said in their sheet — the story, what they are known for, their
delivery time — and are checked with the owner when the demo is shown. A
generic five-step process repeated on five hundred sites is worse than none.
