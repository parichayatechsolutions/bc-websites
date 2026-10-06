import puppeteer from 'puppeteer-core'

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  try {
    await page.goto('https://www.instagram.com/reel/DdAq8uqhC-t/?stkn=a2k5eXNhOXpuYXc4', {
      waitUntil: 'networkidle2',
      timeout: 25000,
    })
    await new Promise((r) => setTimeout(r, 2000))
    // Close modal if present
    await page.evaluate(() => {
      const closeSvg = document.querySelector('svg[aria-label="Close"]')
      if (closeSvg) {
        const btn = closeSvg.closest('button') || closeSvg.parentElement
        if (btn) btn.click()
      }
      // Also remove any overlay backdrop
      const dialog = document.querySelector('[role="dialog"]')
      if (dialog) {
        const closeBtn = dialog.querySelector('button')
        if (closeBtn) closeBtn.click()
      }
    })
    await new Promise((r) => setTimeout(r, 2000))

    // Capture screenshot of the reel video
    await page.screenshot({
      path: 'C:\\Users\\Aravind\\.gemini\\antigravity-ide\\brain\\cb95ddd3-07f9-45d9-a72d-386c8907af24\\instagram_reel_closed.png',
    })
    console.log('Saved instagram_reel_closed.png')

    // Also get the video src or text in the page
    const text = await page.evaluate(() => document.body.innerText)
    console.log('Page text sample:\n', text.slice(0, 500))
  } catch (e) {
    console.error('Error:', e.message)
  } finally {
    await browser.close()
  }
}

main().catch(console.error)
