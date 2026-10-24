import { useState } from 'react'
import { motion } from 'framer-motion'
import { wish as c } from '../content.js'
import { Cake, Heading, burst, rain } from '../components/Fx.jsx'
import { sfx } from '../audio.js'
const COUNT = 5
export default function Wish({ next }) {
  const [lit, setLit] = useState(COUNT)
  const [done, setDone] = useState(false)
  const finish = () => { setDone(true); sfx.blow(); setTimeout(() => { sfx.cheer(); burst(); rain(1800) }, 350) }
  const snuff = () => { if (lit <= 0) return; if (lit <= 1) { setLit(0); finish() } else { sfx.blow(); setLit(lit - 1) } }
  const all = () => { setLit(0); finish() }
  return (
    <div className="text-center">
      <Heading sub={!done ? c.instruction : undefined}>{c.title}</Heading>
      <div className="pt-4"><Cake candles={COUNT} onCandle={snuff} litCount={lit} /></div>
      {!done && <p className="mt-2 text-lav">{lit} candle{lit === 1 ? '' : 's'} still glowing…</p>}
      {!done && <button className="btn mt-4" onClick={all}>💨 {c.blow}</button>}
      {done && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <p className="script text-4xl sm:text-5xl text-rose mt-6">{c.after}</p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-4 text-lg max-w-xl mx-auto">{c.reveal}</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}><button className="btn mt-8" onClick={next}>{c.button}</button></motion.div>
        </motion.div>
      )}
    </div>
  )
}
