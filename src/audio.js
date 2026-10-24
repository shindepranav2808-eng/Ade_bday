// All sounds are generated with the Web Audio API — no audio files needed.
// To use your own song, drop it in public/audio/music.mp3 (it is picked up automatically).
let ctx
const state = { music: false, sfx: true }
const listeners = new Set()
const emit = () => listeners.forEach((f) => f({ ...state }))
export const subscribe = (f) => { listeners.add(f); return () => listeners.delete(f) }
export const getState = () => ({ ...state })

const ac = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}
function tone(freq, start, dur, { type = 'sine', vol = 0.08, dest } = {}) {
  const c = ac(), o = c.createOscillator(), g = c.createGain()
  o.type = type; o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, start)
  g.gain.exponentialRampToValueAtTime(vol, start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur)
  o.connect(g).connect(dest || c.destination); o.start(start); o.stop(start + dur + 0.05)
}
const N = { C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392, A4: 440, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784 }
export const sfx = {
  click() { if (!state.sfx) return; try { const t = ac().currentTime; tone(N.E5, t, 0.15, { vol: 0.05 }) } catch {} },
  sparkle() { if (!state.sfx) return; try { const t = ac().currentTime; [N.C5, N.E5, N.G5].forEach((f, i) => tone(f, t + i * 0.07, 0.3, { vol: 0.05 })) } catch {} },
  blow() { if (!state.sfx) return; try {
    const c = ac(), len = c.sampleRate * 0.6, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain()
    f.type = 'lowpass'; f.frequency.value = 900; g.gain.value = 0.25
    s.buffer = b; s.connect(f).connect(g).connect(c.destination); s.start() } catch {} },
  cheer() { if (!state.sfx) return; try { const t = ac().currentTime
    ;[N.C4, N.E4, N.G4, N.C5, N.E5, N.G5].forEach((f, i) => tone(f, t + i * 0.09, 0.6, { type: 'triangle', vol: 0.07 })) } catch {} },
  gift() { if (!state.sfx) return; try { const t = ac().currentTime
    ;[N.G4, N.B4, N.D5, N.G5].forEach((f, i) => tone(f, t + i * 0.12, 0.7, { type: 'triangle', vol: 0.07 })) } catch {} },
}

// Gentle "Happy Birthday" music box loop (public-domain melody).
const MELODY = [[N.C4,.5],[N.C4,.25],[N.D4,1],[N.C4,1],[N.F4,1],[N.E4,2],[N.C4,.5],[N.C4,.25],[N.D4,1],[N.C4,1],[N.G4,1],[N.F4,2],
  [N.C4,.5],[N.C4,.25],[N.C5,1],[N.A4,1],[N.F4,1],[N.E4,1],[N.D4,2],[N.B4,.5],[N.B4,.25],[N.A4,1],[N.F4,1],[N.G4,1],[N.F4,2]]
let timer, audioEl, musicGain
async function hasFile() { try { const r = await fetch('./audio/music.mp3', { method: 'HEAD' }); return r.ok && (r.headers.get('content-type') || '').includes('audio') } catch { return false } }
export async function setMusic(on) {
  state.music = on; emit()
  clearTimeout(timer)
  if (audioEl) { audioEl.pause() }
  if (!on) return
  if (await hasFile()) {
    if (!audioEl) { audioEl = new Audio('./audio/music.mp3'); audioEl.loop = true }
    audioEl.volume = 0.35; audioEl.play().catch(() => { state.music = false; emit() }); return
  }
  try {
    const c = ac(); const loop = () => {
      if (!state.music) return
      let t = c.currentTime + 0.1
      MELODY.forEach(([f, d]) => { tone(f, t, d * 0.55 + 0.4, { vol: 0.045 }); tone(f * 2, t, d * 0.4, { vol: 0.012 }); t += d * 0.55 })
      timer = setTimeout(loop, (t - c.currentTime) * 1000 + 1500)
    }
    loop()
  } catch { state.music = false; emit() }
}
export function setSfx(on) { state.sfx = on; emit() }
