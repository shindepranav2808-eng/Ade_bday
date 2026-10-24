import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Cursor, Particles } from './components/Fx.jsx'
import { PAGE_NAMES } from './content.js'
import { getState, setMusic, setSfx, sfx, subscribe } from './audio.js'
import Landing from './pages/P01_Landing.jsx'
import Birthday from './pages/P02_Birthday.jsx'
import Meet from './pages/P03_Meet.jsx'
import Roast from './pages/P04_Roast.jsx'
import Gallery from './pages/P05_Gallery.jsx'
import Letter from './pages/P06_Letter.jsx'
import Reasons from './pages/P07_Reasons.jsx'
import Wish from './pages/P08_Wish.jsx'
import Gift from './pages/P09_Gift.jsx'
import Finale from './pages/P10_Finale.jsx'

const PAGES = [Landing, Birthday, Meet, Roast, Gallery, Letter, Reasons, Wish, Gift, Finale]

export default function App() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [menu, setMenu] = useState(false)
  const [snd, setSnd] = useState(getState())
  useEffect(() => subscribe(setSnd), [])
  const go = useCallback((n) => { setI((cur) => { const t = Math.max(0, Math.min(PAGES.length - 1, n)); setDir(t >= cur ? 1 : -1); return t }); setMenu(false); window.scrollTo(0, 0) }, [])
  const next = useCallback(() => { sfx.click(); go(i + 1) }, [i, go])
  const back = useCallback(() => { sfx.click(); go(i - 1) }, [i, go])
  useEffect(() => {
    const k = (e) => {
      if (e.target.closest?.('input,textarea')) return
      if (e.key === 'Escape') setMenu(false)
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])
  const Page = PAGES[i]
  const pct = ((i + 1) / PAGES.length) * 100
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-aurora min-h-dvh relative text-cream">
        <Particles />
        <Cursor />
        <div className="fixed top-0 inset-x-0 z-40 h-1.5 bg-white/10" role="progressbar" aria-valuemin={1} aria-valuemax={PAGES.length} aria-valuenow={i + 1} aria-label={`Surprise ${i + 1} of ${PAGES.length}`}>
          <motion.div className="h-full bg-gradient-to-r from-rose via-lav to-gold" animate={{ width: pct + '%' }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} />
        </div>
        <div className="fixed top-3 right-3 z-50 flex gap-1.5 sm:gap-2" style={{ top: "max(.75rem, env(safe-area-inset-top))" }}>
          <button className="btn btn-ghost !p-2.5 !text-sm" onClick={() => { sfx.click(); setMusic(!snd.music) }} aria-pressed={snd.music} aria-label={snd.music ? 'Turn music off' : 'Turn music on'}>{snd.music ? '🎵 On' : '🔇 Music'}</button>
          <button className="btn btn-ghost !p-2.5 !text-sm" onClick={() => setSfx(!snd.sfx)} aria-pressed={snd.sfx} aria-label={snd.sfx ? 'Mute sound effects' : 'Unmute sound effects'}>{snd.sfx ? '🔔' : '🔕'}</button>
          <button className="btn btn-ghost !p-2.5 !text-sm" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-label="Open page menu">☰</button>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass fixed top-16 right-3 z-50 rounded-2xl p-3 w-[min(15rem,calc(100vw-1.5rem))] max-h-[70dvh] overflow-y-auto" aria-label="Pages">
              <ul className="space-y-1">
                {PAGE_NAMES.map((n, idx) => (
                  <li key={n}><button onClick={() => go(idx)} aria-current={idx === i ? 'page' : undefined} className={`w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-white/15 ${idx === i ? 'bg-white/20 font-semibold' : ''}`}>{idx + 1}. {n}</button></li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
        <main className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-4 sm:px-8 pt-20 pb-28">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.section key={i} custom={dir} className="w-full max-w-5xl"
              initial={{ opacity: 0, x: 60 * dir, filter: 'blur(8px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -60 * dir, filter: 'blur(8px)' }} transition={{ duration: 0.45 }}>
              <Page next={next} go={go} />
            </motion.section>
          </AnimatePresence>
        </main>
        <footer className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-3 px-4 pt-6 safe-b bg-gradient-to-t from-midnight/90 via-midnight/50 to-transparent">
          <button className="btn btn-ghost !py-2 !px-4 text-sm disabled:opacity-30" onClick={back} disabled={i === 0} aria-label="Previous page">← Back</button>
          <span className="sm:hidden text-sm text-lav font-medium" aria-hidden>{i + 1} / {PAGES.length}</span>
          <div className="hidden sm:flex gap-1.5" aria-hidden>{PAGES.map((_, n) => <button key={n} tabIndex={-1} onClick={() => go(n)} className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-rose' : 'w-2 bg-white/30'}`} />)}</div>
          <button className="btn btn-ghost !py-2 !px-4 text-sm disabled:opacity-30" onClick={next} disabled={i === PAGES.length - 1} aria-label="Next page">Next →</button>
        </footer>
      </div>
    </MotionConfig>
  )
}
