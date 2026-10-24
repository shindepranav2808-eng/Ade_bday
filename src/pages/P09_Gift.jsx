import { useState } from 'react'
import { motion } from 'framer-motion'
import { gift as c } from '../content.js'
import { HeartPhoto, Heading, burst, usePhotos } from '../components/Fx.jsx'
import { sfx } from '../audio.js'
export default function Gift({ next }) {
  const [open, setOpen] = useState(false)
  const photos = usePhotos()
  const pick = photos && photos.length ? photos[Math.min(1, photos.length - 1)] : null
  const doOpen = () => { if (open) return; setOpen(true); sfx.gift(); setTimeout(() => burst({ origin: { y: 0.5 } }), 500) }
  return (
    <div className="text-center">
      <Heading sub={!open ? c.hint : undefined}>{c.title}</Heading>
      <div style={{ perspective: 900 }} className="mx-auto w-52 h-52 relative mt-12">
        {[...Array(8)].map((_, i) => <span key={i} aria-hidden className="absolute text-xl floaty" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 90 - 20}%`, animationDelay: i * 0.4 + 's' }}>✨</span>)}
        <button onClick={doOpen} aria-label={open ? 'Gift box, opened' : 'Open the gift box'} className="relative block w-full h-full border-0 bg-transparent p-0 cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div className={open ? '' : 'floaty'} whileHover={open ? undefined : { scale: 1.05, rotate: -2 }} style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-x-0 bottom-0 h-36 rounded-b-xl bg-gradient-to-br from-[#f9a8c9] to-[#d96fa0] shadow-[0_0_40px_rgba(249,168,201,.7)]"><div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 bg-cream/90" /></div>
            <motion.div className="absolute inset-x-[-8px] top-[26px] h-14 rounded-xl bg-gradient-to-br from-[#ffd6e7] to-[#e08bb2]" style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d', top: 22 }} animate={open ? { rotateX: -115, y: -30, opacity: 0.0 } : { rotateX: 0 }} transition={{ duration: 1.1 }}>
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 bg-cream/90" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl">🎀</div>
            </motion.div>
          </motion.div>
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.7, duration: 0.9 }} className="mt-10">
          <p className="glass rounded-3xl p-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">{c.message}</p>
          {pick && <div className="mt-6 flex justify-center"><HeartPhoto src={pick.src} size={300} /></div>}
          <button className="btn mt-8" onClick={next}>{c.button}</button>
        </motion.div>
      )}
    </div>
  )
}
