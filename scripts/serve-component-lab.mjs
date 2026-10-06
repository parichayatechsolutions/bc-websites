// scripts/serve-component-lab.mjs
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const labDir = path.resolve(rootDir, 'docs', 'BoutiqueComponentLab')
const boutiquesDir = path.resolve(rootDir, 'boutiques')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
  let pathname = decodeURIComponent(parsedUrl.pathname)

  // Root or /lab redirects/serves Component Library.dc.html
  if (pathname === '/' || pathname === '/lab' || pathname === '/lab/') {
    pathname = '/Component Library.dc.html'
  }

  // Handle photos: /photos/<slug>/<file> -> boutiques/<slug>/photos/<file>
  if (pathname.startsWith('/photos/')) {
    const parts = pathname.slice('/photos/'.length).split('/')
    if (parts.length >= 2) {
      const slug = parts[0]
      const file = parts.slice(1).join('/')
      const targetPhoto = path.join(boutiquesDir, slug, 'photos', file)
      if (fs.existsSync(targetPhoto) && fs.statSync(targetPhoto).isFile()) {
        const ext = path.extname(targetPhoto).toLowerCase()
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        return fs.createReadStream(targetPhoto).pipe(res)
      }
    }
  }

  // Look in docs/BoutiqueComponentLab
  const labFile = path.join(labDir, pathname)
  if (fs.existsSync(labFile) && fs.statSync(labFile).isFile()) {
    const ext = path.extname(labFile).toLowerCase()
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
    })
    return fs.createReadStream(labFile).pipe(res)
  }

  // Fallback: look in root directory
  const rootFile = path.join(rootDir, pathname)
  if (fs.existsSync(rootFile) && fs.statSync(rootFile).isFile()) {
    const ext = path.extname(rootFile).toLowerCase()
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
    })
    return fs.createReadStream(rootFile).pipe(res)
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end(`Not found: ${pathname}`)
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`\n==================================================`)
  console.log(` Boutique Component Lab is live on local server!`)
  console.log(` URL: http://localhost:${PORT}/`)
  console.log(` Serving from: ${labDir}`)
  console.log(`==================================================\n`)
})
