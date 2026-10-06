// scratch/shot-templates.mjs
import puppeteer from 'puppeteer-core'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = 'C:\\Users\\Aravind\\.gemini\\antigravity-ide\\brain\\cb95ddd3-07f9-45d9-a72d-386c8907af24'

const templates = ['arch', 'noir', 'jaali', 'trousseau', 'pallu']

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })

  for (const t of templates) {
    const url = `http://localhost:3000/1-lavishboutique/d/${t}`
    console.log(`Taking screenshot for ${t}: ${url}`)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 1200))
    const dest = path.join(outDir, `template_${t}.png`)
    await page.screenshot({ path: dest })
    console.log(`Saved ${dest}`)
  }

  // Also take screenshot of the designs chooser page
  await page.goto('http://localhost:3000/1-lavishboutique/designs', { waitUntil: 'networkidle2', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: path.join(outDir, 'template_chooser.png') })
  console.log(`Saved template_chooser.png`)

  await browser.close()
}

main().catch(console.error)
