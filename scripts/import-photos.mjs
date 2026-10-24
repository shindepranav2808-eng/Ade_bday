// Usage:  npm run photos -- path/to/photos.zip   (extract + rebuild manifest)
//         npm run photos                          (just rebuild manifest from the folder)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public/images/aditi')
const ok = /\.(jpe?g|png|webp)$/i
fs.mkdirSync(dir, { recursive: true })
const zipPath = process.argv[2]
if (zipPath) {
  const { default: AdmZip } = await import('adm-zip')
  const zip = new AdmZip(path.resolve(zipPath))
  let n = 0
  for (const e of zip.getEntries()) {
    if (e.isDirectory) continue
    const parts = e.entryName.split('/')
    if (parts.some((p) => p.startsWith('.') || p === '__MACOSX')) continue
    const base = parts[parts.length - 1]
    if (!ok.test(base)) continue
    let out = base, i = 1
    while (fs.existsSync(path.join(dir, out))) { const x = path.extname(base); out = `${path.basename(base, x)}-${i++}${x}` }
    fs.writeFileSync(path.join(dir, out), e.getData()); n++
  }
  console.log(`Imported ${n} photo(s) into public/images/aditi/`)
}
const files = fs.readdirSync(dir).filter((f) => !f.startsWith('.') && ok.test(f)).sort()
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(files, null, 2))
console.log(`Gallery manifest updated: ${files.length} photo(s).`)
