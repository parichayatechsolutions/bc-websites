import puppeteer from 'puppeteer-core'

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  try {
    await page.goto('https://www.instagram.com/reel/DdAq8uqhC-t/?stkn=a2k5eXNhOXpuYXc4', {
      waitUntil: 'networkidle2',
      timeout: 25000,
    })
    const title = await page.title()
    const ogDesc = await page.$eval('meta[property="og:description"]', (el) => el.content).catch(() => '')
    const ogTitle = await page.$eval('meta[property="og:title"]', (el) => el.content).catch(() => '')
    console.log('Title:', title)
    console.log('OG Title:', ogTitle)
    console.log('OG Desc:', ogDesc)
    await page.screenshot({
      path: 'C:\\Users\\Aravind\\.gemini\\antigravity-ide\\brain\\cb95ddd3-07f9-45d9-a72d-386c8907af24\\instagram_reel.png',
    })
    console.log('Screenshot saved')
  } catch (e) {
    console.error('Error fetching reel:', e.message)
  } finally {
    await browser.close()
  }
}

main().catch(console.error)
