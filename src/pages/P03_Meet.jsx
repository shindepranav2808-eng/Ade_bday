import { motion } from 'framer-motion'
import { meet as c } from '../content.js'
import { Heading } from '../components/Fx.jsx'
export default function Meet({ next }) {
  return (
    <div className="text-center">
      <Heading sub={c.tagline}>{c.title}</Heading>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {c.cards.map((card, i) => (
          <motion.li key={card.label} initial={{ opacity: 0, y: 30, rotate: i % 2 ? 2 : -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: i * 0.12 }} whileHover={{ y: -6, rotate: i % 2 ? -1.5 : 1.5 }} className="glass rounded-3xl p-5">
            <h3 className="text-rose font-semibold text-lg">{card.label}</h3>
            <p className="mt-1 text-cream/90">{card.text}</p>
          </motion.li>
        ))}
      </ul>
      <button className="btn mt-8" onClick={next}>{c.button}</button>
    </div>
  )
}
