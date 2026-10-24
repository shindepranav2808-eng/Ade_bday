import { useState } from 'react'
import { motion } from 'framer-motion'
import { reasons as c } from '../content.js'
import { Heading, burst } from '../components/Fx.jsx'
import { sfx } from '../audio.js'
export default function Reasons({ next }) {
  const [n, setN] = useState(0)
  const total = c.list.length
  const reveal = () => { if (n < total) { sfx.sparkle(); setN(n + 1); if (n + 1 === total) burst() } }
  return (
    <div className="text-center">
      <Heading sub={n < total ? c.hint : 'All ten. And there are many more. ❤️'}>{c.title}</Heading>
      <button className="btn mb-6" onClick={reveal} disabled={n >= total} style={{ opacity: n >= total ? 0.5 : 1 }}>{n === 0 ? 'Reveal the first reason ✨' : n < total ? `Reveal reason ${n + 1} of ${total}` : 'All revealed 💖'}</button>
      <ul className="grid sm:grid-cols-2 gap-4 text-left" aria-live="polite">
        {c.list.slice(0, n).map((r, i) => (
          <motion.li key={i} initial={{ opacity: 0, scale: 0.7, rotateX: -60 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ type: 'spring', stiffness: 120 }} className="glass rounded-3xl p-5 flex gap-4 items-start">
            <span className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose to-lav text-plum font-semibold flex items-center justify-center">{i + 1}</span>
            <span className="text-lg">{r}</span>
          </motion.li>
        ))}
      </ul>
      <button className="btn mt-8" onClick={next}>{c.button}</button>
    </div>
  )
}
