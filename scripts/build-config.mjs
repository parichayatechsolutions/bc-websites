#!/usr/bin/env node
// scripts/build-config.mjs
// Turns a filled data sheet into the config the website reads.
//
//   npm run config -- sri-lakshmi-designers     → src/sites/sri-lakshmi-designers/config.ts
//   npm run config -- --all                     → every boutique with a data.md
//   npm run config -- <slug> --dry-run          → print the config, write nothing
//
// data.md is the source of truth: edit it and run this again. A config.ts that
// was written by hand (no "Generated from data.md" header) is never replaced
// unless you add --force.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { readSheet, toConfig, toTs } from './lib/data-sheet.mjs'
import { allSlugs, dataDir, siteDir } from './lib/paths.mjs'
import { validateBoutique } from './lib/validate.mjs'
const HEADER = '// Generated from data.md by `npm run config`. Edit data.md and run it again; changes made here are overwritten.'

const args = process.argv.slice(2)
const force = args.includes('--force')
const dryRun = args.includes('--dry-run')
const all = args.includes('--all')
let slugs = args.filter((a) => !a.startsWith('--'))

if (all) {
  slugs = allSlugs().filter((slug) => existsSync(join(dataDir(slug), 'data.md')))
}
if (!slugs.length) {
  console.error('Usage: npm run config -- <folder-name> [--dry-run] [--force]   or   npm run config -- --all')
  process.exit(1)
}

let failed = false

for (const slug of slugs) {
  const sheetPath = join(dataDir(slug), 'data.md')
  const configPath = join(siteDir(slug), 'config.ts')

  if (!existsSync(sheetPath)) {
    console.error(`✗ ${slug}: no data.md in boutiques/${slug}/`)
    failed = true
    continue
  }

  const photosDir = join(dataDir(slug), 'photos')
  const photoFiles = existsSync(photosDir) ? readdirSync(photosDir).filter((f) => !f.startsWith('.')) : []
  const { config, errors, warnings } = toConfig(readSheet(readFileSync(sheetPath, 'utf8')), { slug, photoFiles })

  if (errors.length) {
    console.error(`✗ ${slug}: data.md needs fixing before a config can be made`)
    for (const e of errors) console.error(`    - ${e}`)
    failed = true
    continue
  }

  const source = `${HEADER}

import type { BoutiqueConfig } from '../../types/boutique'

const config: BoutiqueConfig = ${toTs(config)}

export default config
`

  if (dryRun) {
    console.log(source)
  } else if (existsSync(configPath) && !readFileSync(configPath, 'utf8').startsWith(HEADER) && !force) {
    console.error(`✗ ${slug}: config.ts was written by hand, so it was left alone. Add --force to replace it.`)
    failed = true
    continue
  } else {
    mkdirSync(siteDir(slug), { recursive: true })
    writeFileSync(configPath, source)
    console.log(`✓ ${slug}: wrote src/sites/${slug}/config.ts`)
  }
  for (const w of warnings) console.log(`    ! ${w}`)

  // Check what was written, so problems show up now rather than in front of the owner.
  if (!dryRun) {
    const check = await validateBoutique(slug)
    for (const e of check.errors) console.log(`    ✗ ${e}`)
    for (const w of check.warnings) console.log(`    ! ${w}`)
    failed ||= check.errors.length > 0
  }
}

process.exit(failed ? 1 : 0)
