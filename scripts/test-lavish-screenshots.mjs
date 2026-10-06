import puppeteer from 'puppeteer-core'
import { existsSync } from 'fs'

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const exePath = existsSync(edgePath) ? edgePath : chromePath

async function run() {
  const browser = await puppeteer.launch({ executablePath: exePath, headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/1-lavishboutique/about', { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1500))
  await page.screenshot({ path: 'C:\\Users\\Aravind\\.gemini\\antigravity-ide\\brain\\02b8643b-4245-4f0d-a485-56e4e6ac89d8\\lavish_about_header_check.png' })

  // Scroll to bridal section
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('section')).find((s) => s.textContent.includes('Muhurtham'))
    if (el) el.scrollIntoView()
  })
  await new Promise((r) => setTimeout(r, 1000))
  await page.screenshot({ path: 'C:\\Users\\Aravind\\.gemini\\antigravity-ide\\brain\\02b8643b-4245-4f0d-a485-56e4e6ac89d8\\lavish_bridal_check.png' })
  await browser.close()
  console.log('Screenshots taken successfully')
}
run().catch(console.error)
