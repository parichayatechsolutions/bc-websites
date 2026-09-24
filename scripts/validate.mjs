#!/usr/bin/env node
// scripts/validate.mjs
// Checks boutique folders before a demo is shown to anyone.
//
//   npm run validate                   → every boutique
//   npm run validate -- priya-boutique → just that one
//
// Exits with an error if any boutique has errors; warnings alone pass.

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { allSlugs, dataDir, siteDir } from './lib/paths.mjs'
import { listedSlugs } from './lib/directory.mjs'
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

// The demo directory is generated, so it can fall behind the configs.
if (!requested.length) {
  const listed = listedSlugs()
  const expected = allSlugs().filter((slug) => existsSync(join(siteDir(slug), 'config.ts')))
  if (listed === null) {
    console.log('! No src/app/directory-data.ts yet. Make it with: npm run config -- --all')
  } else {
    const missing = expected.filter((s) => !listed.includes(s))
    const extra = listed.filter((s) => !expected.includes(s))
    if (missing.length || extra.length) {
      console.log(`! src/app/directory-data.ts is out of date (${[missing.length && `${missing.length} missing`, extra.length && `${extra.length} no longer here`].filter(Boolean).join(', ')}). Run: npm run config -- --all`)
    }
  }
}

process.exit(errorCount ? 1 : 0)
