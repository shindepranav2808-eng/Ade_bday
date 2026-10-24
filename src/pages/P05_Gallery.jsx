import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gallery as c } from '../content.js'
import { Heading, usePhotos } from '../components/Fx.jsx'
import { sfx } from '../audio.js'
export default function Gallery({ next }) {
  const photos = usePhotos()
  const [open, setOpen] = useState(null)
  const [play, setPlay] = useState(false)
  const n = photos?.length || 0
  const cap = (p, i) => c.customCaptions[p.name] || c.captions[i % c.captions.length]
  const step = useCallback((d) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n])
  useEffect(() => {
    if (open === null) return
    const k = (e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'Escape') { setOpen(null); setPlay(false) } }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [open, step])
  useEffect(() => { if (!play) return; const t = setInterval(() => step(1), 3000); return () => clearInterval(t) }, [play, step])
  const tilt = [-2, 1.5, -1, 2, 0.5, -1.5]
  return (
    <div className="text-center">
      <Heading sub="Tap any photo to see it bigger.">{c.title}</Heading>
      {photos === null && <p>Loading memories…</p>}
      {photos && n === 0 && (
        <div className="glass rounded-3xl p-6 max-w-xl mx-auto text-left">
          <h3 className="text-rose text-xl font-semibold">No photos added yet 📷</h3>
          <p className="mt-2 text-cream/90">Run <code className="bg-black/30 px-2 py-0.5 rounded">npm run photos -- path/to/photos.zip</code> or copy JPG/PNG/WebP files into <code className="bg-black/30 px-2 py-0.5 rounded">public/images/aditi/</code>, then restart.</p>
          <div className="grid grid-cols-3 gap-3 mt-4" aria-hidden>{[0, 1, 2].map((i) => <div key={i} className="aspect-[3/4] rounded-2xl border-2 border-dashed border-rose/60 flex items-center justify-center text-3xl">💗</div>)}</div>
        </div>
      )}
      {n > 0 && (
        <>
          <div className="mb-4 flex justify-center gap-3">
            <button className="btn btn-ghost !py-2" onClick={() => { setOpen(0); setPlay(true) }}>▶ Slideshow</button>
          </div>
          <div className="masonry text-left">
            {photos.map((p, i) => (
              <motion.figure key={p.name} initial={{ opacity: 0, y: 30, rotate: tilt[i % 6] }} animate={{ opacity: 1, y: 0, rotate: tilt[i % 6] }} transition={{ delay: i * 0.08 }} whileHover={{ rotate: 0, scale: 1.03 }} className="bg-cream p-2 pb-3 rounded-2xl shadow-xl">
                <button onClick={() => { sfx.click(); setOpen(i) }} className="block w-full border-0 p-0 bg-transparent cursor-zoom-in" aria-label={`Open photo ${i + 1}`}>
                  <img src={p.src} alt={`Aditi, memory ${i + 1}`} loading="lazy" className="w-full rounded-xl block" />
                </button>
                <figcaption className="font-hand text-plum text-lg text-center mt-2 leading-tight">{cap(p, i)}</figcaption>
              </motion.figure>
            ))}
          </div>
        </>
      )}
      <AnimatePresence>
        {open !== null && photos[open] && (
          <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/85 flex flex-col items-center justify-center p-4" onClick={() => { setOpen(null); setPlay(false) }}>
            <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img key={open} src={photos[open].src} alt={`Aditi, memory ${open + 1}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mx-auto max-h-[72vh] rounded-2xl object-contain" />
              </AnimatePresence>
              <p className="font-hand text-2xl text-center mt-3">{cap(photos[open], open)}</p>
              <div className="flex justify-center items-center gap-3 mt-3">
                <button className="btn btn-ghost !py-2" onClick={() => step(-1)} aria-label="Previous photo">←</button>
                <button className="btn !py-2" onClick={() => setPlay(!play)} aria-pressed={play}>{play ? '⏸ Pause' : '▶ Play'}</button>
                <button className="btn btn-ghost !py-2" onClick={() => step(1)} aria-label="Next photo">→</button>
                <button className="btn btn-ghost !py-2" onClick={() => { setOpen(null); setPlay(false) }} aria-label="Close viewer">✕</button>
              </div>
              <p className="text-center text-sm mt-2 text-lav">{open + 1} / {n}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {n > 0 && (
        <div className="mt-10">
          <h3 className="script text-4xl text-gold mb-4">{c.favouriteTitle}</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {photos.slice(0, 3).map((p, i) => (
              <motion.div key={p.name} animate={{ y: [0, -10, 0], rotate: [-3 + i * 3, 3 - i * 2, -3 + i * 3] }} transition={{ repeat: Infinity, duration: 5 + i, ease: 'easeInOut' }} className="w-40 sm:w-48 p-2 bg-gradient-to-br from-[#ffd6e7] to-[#e8b4a0] rounded-3xl shadow-[0_0_30px_rgba(249,168,201,.6)]">
                <img src={p.src} alt={`Favourite memory ${i + 1}`} className="rounded-2xl w-full aspect-square object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <button className="btn mt-10" onClick={next}>{c.button}</button>
    </div>
  )
}
