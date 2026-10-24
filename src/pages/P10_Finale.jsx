import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { finale as c, FROM } from '../content.js'
import { Heading, burst, rain, usePhotos } from '../components/Fx.jsx'
import { getState, setMusic, sfx, subscribe } from '../audio.js'
export default function Finale({ go }) {
  const photos = usePhotos()
  const [snd, setSnd] = useState(getState())
  useEffect(() => subscribe(setSnd), [])
  useEffect(() => { const t = setTimeout(() => { burst(); rain(2200); sfx.cheer() }, 600); return () => clearTimeout(t) }, [])
  return (
    <div className="text-center">
      {photos && photos.length > 0 && (
        <div className="flex justify-center -space-x-4 mb-6" aria-hidden={false}>
          {photos.slice(0, 4).map((p, i) => <motion.img key={p.name} src={p.src} alt={`Aditi, memory ${i + 1}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, rotate: (i - 1.5) * 6 }} transition={{ delay: i * 0.2 }} className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-cream shadow-xl" />)}
        </div>
      )}
      <Heading>{c.title}</Heading>
      <div className="glass rounded-3xl p-5 sm:p-10 max-w-2xl mx-auto text-left space-y-4 text-base sm:text-lg leading-relaxed">
        {c.paragraphs.map((p, i) => <motion.p key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.5 }}>{p}</motion.p>)}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + c.paragraphs.length * 0.5 }}>
          <p>{c.signoff}</p>
          <p className="script text-4xl text-rose mt-2">{c.signature}</p>
        </motion.div>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + (c.paragraphs.length + 1) * 0.5 }} className="script text-3xl sm:text-4xl text-gold mt-8">{c.madeBy}</motion.p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button className="btn" onClick={() => go(5)}>Read the letter again</button>
        <button className="btn" onClick={() => go(4)}>View our memories</button>
        <button className="btn" onClick={() => go(0)}>Replay the surprise</button>
        <button className="btn btn-ghost" onClick={() => setMusic(!snd.music)} aria-pressed={snd.music}>{snd.music ? 'Turn the music off' : 'Turn the music on'}</button>
      </div>
      <span className="sr-only">From {FROM}</span>
    </div>
  )
}
