import { motion } from 'framer-motion'
import { landing as c } from '../content.js'
import { sfx } from '../audio.js'
import { usePhotos } from '../components/Fx.jsx'
const POS = ['-left-2 top-0 -rotate-12', 'right-0 top-6 rotate-6', 'left-2 bottom-0 rotate-3', 'right-2 bottom-2 -rotate-6']
export default function Landing({ next }) {
  const photos = usePhotos()
  return (
    <div className="text-center relative py-6">
      <div aria-hidden className="hidden md:block absolute inset-0 pointer-events-none">
        {(photos || []).slice(0, 4).map((p, i) => (
          <motion.img key={p.name} src={p.src} alt="" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 0.95, scale: 1, y: [0, -10, 0] }} transition={{ opacity: { delay: 2.4 + i * 0.3 }, scale: { delay: 2.4 + i * 0.3 }, y: { repeat: Infinity, duration: 5 + i, delay: i } }} className={`absolute w-36 lg:w-44 aspect-[3/4] object-cover p-2 pb-8 bg-cream rounded-md shadow-2xl ${POS[i]}`} />
        ))}
      </div>
      <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="script shimmer text-7xl sm:text-8xl lg:text-9xl leading-[1.15] pb-2">{c.hey}</motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 text-xl sm:text-2xl text-lav">{c.sub}</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-4 mx-auto max-w-xl text-base sm:text-lg text-cream/90">{c.promise}</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} className="mt-10">
        <button className="btn text-lg animate-pulse" onClick={() => { sfx.sparkle(); next() }}>{c.button}</button>
      </motion.div>
    </div>
  )
}
