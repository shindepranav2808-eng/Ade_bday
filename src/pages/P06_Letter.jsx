import { useEffect, useState } from 'react'
import { letter as c } from '../content.js'
import { Heading } from '../components/Fx.jsx'
function useTypewriter(text, speed = 22) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return }
    const t = setInterval(() => setN((x) => { if (x >= text.length) { clearInterval(t); return x } return x + 1 }), speed)
    return () => clearInterval(t)
  }, [text, speed])
  return [text.slice(0, n), n >= text.length]
}
export default function Letter({ next }) {
  const [stage, setStage] = useState(0)
  const [all, setAll] = useState(false)
  const last = c.paragraphs.length - 1
  const cur = c.paragraphs[stage]
  const [typed, done] = useTypewriter(all ? '' : cur)
  const shown = all ? c.paragraphs : c.paragraphs.slice(0, stage)
  const finished = all || (stage === last && done)
  return (
    <div className="text-center">
      <Heading>{c.title}</Heading>
      <article className="paper mx-auto max-w-2xl rounded-lg p-6 sm:p-10 text-left font-hand text-xl sm:text-2xl leading-[34px] max-h-[58vh] overflow-y-auto" aria-live="polite" tabIndex={0} aria-label="Letter from Pranav">
        {shown.map((p, i) => <p key={i} className="whitespace-pre-line mb-[34px]">{p}</p>)}
        {!all && <p className="whitespace-pre-line">{typed}<span className="animate-pulse">|</span></p>}
      </article>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {!finished && <>
          <button className="btn" disabled={!done || stage >= last} onClick={() => setStage(stage + 1)} style={{ opacity: done && stage < last ? 1 : 0.5 }}>{c.next}</button>
          <button className="btn btn-ghost" onClick={() => setAll(true)}>{c.skip}</button>
        </>}
        {finished && <button className="btn" onClick={next}>{c.button}</button>}
      </div>
    </div>
  )
}
