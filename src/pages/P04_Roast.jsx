import { useState } from 'react'
import { motion } from 'framer-motion'
import { roast as c } from '../content.js'
import { Heading, burst } from '../components/Fx.jsx'
import { sfx } from '../audio.js'
function Card({ text, i }) {
  const [on, setOn] = useState(false)
  return (
    <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} onClick={() => { sfx.click(); setOn(!on) }} aria-pressed={on} aria-label={on ? text : 'Roast card, tap to flip'} className="flip h-44 w-full text-left bg-transparent border-0 p-0 cursor-pointer">
      <div className={`flip-inner h-full ${on ? 'on' : ''}`}>
        <div className="face glass rounded-3xl flex flex-col items-center justify-center"><span className="text-5xl">🔥</span><span className="mt-2 text-sm text-lav">Roast #{i + 1} — tap</span></div>
        <div className="face back rounded-3xl p-5 flex items-center bg-gradient-to-br from-[#ffd6e7] to-[#c9b6f2] text-plum font-medium">{text}</div>
      </div>
    </motion.button>
  )
}
export default function Roast({ next }) {
  const all = [...c.jokes, ...c.extraJokes]
  const [fin, setFin] = useState(false)
  return (
    <div className="text-center">
      <Heading sub={c.hint}>{c.title}</Heading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{all.map((t, i) => <Card key={i} i={i} text={t} />)}</div>
      <div className="mt-6">
        {!fin ? <button className="btn btn-ghost" onClick={() => { setFin(true); burst({ colors: ['#ff8a5c', '#f9a8c9', '#ffd6e7'] }); sfx.sparkle() }}>🎁 One special final roast</button>
          : <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-6 max-w-2xl mx-auto text-lg">{c.finale}</motion.p>}
      </div>
      <button className="btn mt-8" onClick={next}>{c.button}</button>
    </div>
  )
}
