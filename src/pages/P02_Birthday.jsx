import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { birthday as c } from '../content.js'
import { Cake, burst } from '../components/Fx.jsx'
import { sfx } from '../audio.js'
const COLORS = ['#f9a8c9', '#c9b6f2', '#ffd6e7', '#e8b4a0', '#a6e3ff']
export default function Birthday({ next }) {
  useEffect(() => { const t = setTimeout(() => { burst(); sfx.cheer() }, 500); return () => clearTimeout(t) }, [])
  return (
    <div className="text-center relative">
      <div aria-hidden className="absolute inset-x-0 -top-10 h-40 pointer-events-none">
        {COLORS.concat(COLORS).map((col, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${6 + i * 9.5}%` }} initial={{ y: 300, opacity: 0 }} animate={{ y: [0, -14, 0], opacity: 1 }} transition={{ y: { repeat: Infinity, duration: 3 + (i % 3), delay: i * 0.2 }, opacity: { delay: i * 0.1 } }}>
            <div className="w-10 h-12 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]" style={{ background: col, boxShadow: 'inset -6px -6px 0 rgba(0,0,0,.1)' }} />
            <div className="mx-auto w-px h-10 bg-white/50" />
          </motion.div>
        ))}
      </div>
      <p className="relative pt-28 text-xl sm:text-2xl tracking-wide text-gold">{c.kicker}</p>
      <h1 className="script shimmer text-6xl sm:text-8xl leading-[1.15] pb-2 mt-2">{c.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-cream/90">{c.text}</p>
      <div className="mt-8"><Cake /></div>
      <button className="btn mt-8" onClick={next}>{c.button}</button>
    </div>
  )
}
