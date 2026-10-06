import puppeteer from 'puppeteer-core'

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000/1-lavishboutique', { waitUntil: 'networkidle2' })
  const altSection = await page.$('#alterations')
  if (altSection) {
    await altSection.screenshot({ path: 'alterations-screenshot.png' })
    console.log('Saved alterations-screenshot.png')
  }
  const bridalSection = await page.$('#bridal')
  if (bridalSection) {
    await bridalSection.screenshot({ path: 'bridal-screenshot.png' })
    console.log('Saved bridal-screenshot.png')
  }
  await browser.close()
}

run()
