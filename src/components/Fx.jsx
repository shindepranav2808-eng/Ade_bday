import { useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'

export const burst = (o = {}) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.65 }, colors: ['#f9a8c9', '#c9b6f2', '#ffd6e7', '#e8b4a0', '#fff4e8'], ...o })
}
export const rain = (ms = 2500) => {
  const end = Date.now() + ms
  ;(function f() { confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 } }); confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 } }); if (Date.now() < end) requestAnimationFrame(f) })()
}

const STARS = Array.from({ length: 40 }, (_, i) => [(i * 37.7) % 100, (i * 61.3) % 100, (i % 7) * 0.45])
const GLYPHS = ['❤', '✦', '✿', '❀', '✧', '♥', '•']
export function Particles({ density = 22 }) {
  const items = useMemo(() => Array.from({ length: density }, (_, i) => ({
    id: i, g: GLYPHS[i % GLYPHS.length], left: Math.random() * 100, size: 10 + Math.random() * 22,
    dur: 12 + Math.random() * 14, delay: -Math.random() * 20, op: 0.25 + Math.random() * 0.45,
    hue: ['#f9a8c9', '#c9b6f2', '#ffd6e7', '#e8b4a0'][i % 4],
  })), [density])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <span className="orb w-72 h-72 bg-pink-500 -top-16 -left-16" />
      <span className="orb w-80 h-80 bg-violet-500 bottom-0 -right-20" style={{ animationDelay: '-8s' }} />
      <span className="orb w-60 h-60 bg-amber-300/70 top-1/3 left-1/2" style={{ animationDelay: '-4s', opacity: .2 }} />
      {STARS.map((s, i) => <span key={'s' + i} className="star" style={{ left: s[0] + '%', top: s[1] + '%', animationDelay: s[2] + 's' }} />)}
      {items.map((p) => (
        <span key={p.id} style={{ left: p.left + '%', fontSize: p.size, color: p.hue, opacity: p.op, animation: `rise ${p.dur}s linear ${p.delay}s infinite` }} className="absolute bottom-[-40px]">{p.g}</span>
      ))}
      <style>{`@keyframes rise { to { transform: translateY(-115vh) rotate(360deg); } }`}</style>
    </div>
  )
}

export function Cursor() {
  const [dots, setDots] = useState([])
  const id = useRef(0)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let last = 0
    const mv = (e) => {
      const now = performance.now(); if (now - last < 45) return; last = now
      const d = { id: id.current++, x: e.clientX, y: e.clientY, g: GLYPHS[id.current % 4] }
      setDots((a) => [...a.slice(-12), d]); setTimeout(() => setDots((a) => a.filter((x) => x.id !== d.id)), 700)
    }
    window.addEventListener('pointermove', mv); return () => window.removeEventListener('pointermove', mv)
  }, [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      {dots.map((d) => <span key={d.id} className="absolute text-rose" style={{ left: d.x, top: d.y, animation: 'fadeup .7s forwards' }}>{d.g}</span>)}
      <style>{`@keyframes fadeup { from { opacity: 1; transform: translate(-50%,-50%) scale(1); } to { opacity: 0; transform: translate(-50%,-120%) scale(.3); } }`}</style>
    </div>
  )
}

export function usePhotos() {
  const [photos, setPhotos] = useState(null)
  useEffect(() => {
    fetch('./images/aditi/manifest.json').then((r) => (r.ok ? r.json() : [])).catch(() => [])
      .then((l) => setPhotos(l.map((f) => ({ name: f, src: './images/aditi/' + encodeURIComponent(f) }))))
  }, [])
  return photos
}

export function Heading({ children, sub }) {
  return (
    <header className="text-center mb-6">
      <h2 className="script shimmer text-5xl sm:text-6xl lg:text-7xl leading-[1.15] pb-1">{children}</h2>
      {sub && <p className="mt-2 text-lav/90 text-sm sm:text-base">{sub}</p>}
    </header>
  )
}

export function Cake({ lit = true, onCandle, candles = 5, litCount }) {
  const isLit = (i) => (litCount !== undefined ? i < litCount : lit)
  return (
    <div className="relative mx-auto w-64 select-none scale-[.88] sm:scale-100 origin-bottom" style={{ height: 230 }} role="img" aria-label="Birthday cake">
      <div className="absolute bottom-0 left-0 right-0 h-24 rounded-2xl bg-gradient-to-b from-[#ffd6e7] to-[#f49ac1] shadow-[0_10px_30px_rgba(0,0,0,.4)]">
        <div className="absolute -top-3 left-0 right-0 h-8 rounded-t-2xl bg-cream" style={{ clipPath: 'polygon(0 0,100% 0,100% 55%,92% 100%,84% 55%,75% 100%,66% 55%,58% 100%,50% 55%,41% 100%,33% 55%,25% 100%,16% 55%,8% 100%,0 55%)' }} />
        <div className="absolute bottom-3 left-0 right-0 text-center script text-2xl text-[#7a2a58]">Happy Birthday</div>
      </div>
      <div className="absolute bottom-24 left-6 right-6 h-20 rounded-2xl bg-gradient-to-b from-[#e8d9ff] to-[#b79af0] shadow-lg">
        <div className="absolute -top-2 left-0 right-0 h-5 rounded-t-2xl bg-cream" />
      </div>
      <div className="absolute left-0 right-0 flex justify-center gap-4" style={{ bottom: 176 }}>
        {Array.from({ length: candles }).map((_, i) => (
          <button key={i} type="button" onClick={onCandle} disabled={!onCandle || !isLit(i)} aria-label={`Candle ${i + 1}${isLit(i) ? ', tap to blow out' : ', blown out'}`} className="relative flex flex-col items-center bg-transparent border-0 p-0 cursor-pointer disabled:cursor-default">
            <span className="h-5 w-3 -mb-1 relative">
              {isLit(i) ? <span className="flame absolute inset-0 block rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-400 to-yellow-200 shadow-[0_0_16px_6px_rgba(255,200,100,.7)]" /> : <span className="absolute left-1/2 -translate-x-1/2 text-xs opacity-60" style={{ animation: 'fadeup .2s' }}>💨</span>}
            </span>
            <span className="block w-2.5 h-11 rounded-sm" style={{ background: ['#f9a8c9', '#c9b6f2', '#fff4e8', '#e8b4a0', '#a6e3ff'][i % 5] }} />
          </button>
        ))}
      </div>
    </div>
  )
}

export function HeartPhoto({ src, size = 300 }) {
  return (
    <svg width={size} height={size * 0.92} viewBox="0 0 100 92" role="img" aria-label="Aditi in a heart-shaped frame" className="floaty drop-shadow-[0_0_20px_rgba(249,168,201,.8)]">
      <defs><clipPath id="heartClip"><path d="M50 90 C10 58 2 38 2 25 C2 10 14 2 26 2 C38 2 46 9 50 17 C54 9 62 2 74 2 C86 2 98 10 98 25 C98 38 90 58 50 90Z" /></clipPath></defs>
      <image href={src} x="-5" y="-5" width="110" height="102" preserveAspectRatio="xMidYMid slice" clipPath="url(#heartClip)" />
      <path d="M50 90 C10 58 2 38 2 25 C2 10 14 2 26 2 C38 2 46 9 50 17 C54 9 62 2 74 2 C86 2 98 10 98 25 C98 38 90 58 50 90Z" fill="none" stroke="#ffd6e7" strokeWidth="2.5" />
    </svg>
  )
}
