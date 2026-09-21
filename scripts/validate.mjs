#!/usr/bin/env node
// scripts/validate.mjs
// Checks boutique folders before a demo is shown to anyone.
//
//   npm run validate                   → every boutique
//   npm run validate -- priya-boutique → just that one
//
// Exits with an error if any boutique has errors; warnings alone pass.

import { existsSync } from 'node:fs'
import { allSlugs, dataDir, siteDir } from './lib/paths.mjs'
import { validateBoutique } from './lib/validate.mjs'

const requested = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const slugs = requested.length ? requested : allSlugs()

let errorCount = 0

for (const slug of slugs) {
  if (!existsSync(dataDir(slug)) && !existsSync(siteDir(slug))) {
    console.log(`✗ ${slug}: not found in boutiques/ or src/sites/`)
    errorCount++
    continue
  }
  const { errors, warnings } = await validateBoutique(slug)
  const mark = errors.length ? '✗' : '✓'
  const summary = [errors.length && `${errors.length} to fix`, warnings.length && `${warnings.length} to improve`].filter(Boolean).join(', ')
  console.log(`${mark} ${slug}${summary ? `: ${summary}` : ': ready'}`)
  for (const e of errors) console.log(`    ✗ ${e}`)
  for (const w of warnings) console.log(`    ! ${w}`)
  errorCount += errors.length
}

process.exit(errorCount ? 1 : 0)
