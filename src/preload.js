// ---------------------------------------------------------------------------
// Up-front loading.
// The loader in index.html (#boot) stays on screen until EVERYTHING the
// invitation needs is downloaded: the intro / details / music-button code,
// the web fonts and the music file.  After that, nothing on the site has to
// wait for the network again, so it plays smoothly on slow phones too.
//
// Progress is real: each task reports how far it is, weighted by its size,
// and drives the gold ring + percentage.  A safety cap makes sure a very slow
// connection never keeps guests stuck on the loader.
// ---------------------------------------------------------------------------

const SAFETY_MS = 30000 // reveal the site after this even if music is still downloading
const FONT_TIMEOUT_MS = 8000

let musicUrl = null // blob: URL of the fully downloaded song (null until ready)

/** Song URL to play: the downloaded copy when ready, else the network file. */
export const musicSrc = (fallback) => musicUrl || fallback

const fontsReady = () => {
  if (typeof document === 'undefined' || !document.fonts) return Promise.resolve()
  const link = document.querySelector('link[href*="fonts.googleapis.com/css2"]')
  // the Google Fonts sheet is loaded non-blocking; wait for its @font-face rules
  const sheet = new Promise((resolve) => {
    if (!link || link.rel === 'stylesheet') return resolve()
    link.addEventListener('load', resolve, { once: true })
    link.addEventListener('error', resolve, { once: true })
  })
  const load = sheet.then(() =>
    Promise.all(
      [
        '400 1em "Great Vibes"',
        '500 1em "Cormorant Garamond"',
        'italic 500 1em "Cormorant Garamond"',
        '400 1em Poppins',
        '400 1em Amiri',
      ].map((f) => document.fonts.load(f).catch(() => {})),
    ),
  )
  return Promise.race([load, new Promise((r) => setTimeout(r, FONT_TIMEOUT_MS))])
}

/** Download the song with byte progress and keep it as a blob: URL. */
const fetchMusic = async (src, onFrac) => {
  if (!src) return
  const res = await fetch(src)
  if (!res.ok) throw new Error(`music ${res.status}`)
  const total = Number(res.headers.get('content-length')) || 0
  let blob
  if (res.body && total) {
    const reader = res.body.getReader()
    const chunks = []
    let got = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      got += value.length
      onFrac(got / total)
    }
    blob = new Blob(chunks, { type: res.headers.get('content-type') || 'audio/mpeg' })
  } else {
    blob = await res.blob()
  }
  musicUrl = URL.createObjectURL(blob)
}

/**
 * Load everything, animating #boot, then fade it out.
 * @param {{ chunks: (() => Promise<unknown>)[], music?: string }} opts
 */
export function preloadAll({ chunks, music }) {
  const boot = typeof document !== 'undefined' ? document.getElementById('boot') : null
  const arc = document.getElementById('boot-arc')
  const pctEl = document.getElementById('boot-pct')

  // task weights (≈ download size): code chunks + fonts are light, the song is heavy
  const tasks = []
  const add = (weight) => {
    const t = { weight, frac: 0 }
    tasks.push(t)
    return t
  }
  const total = () => tasks.reduce((s, t) => s + t.weight, 0)

  let shown = 0
  const render = () => {
    const p = tasks.reduce((s, t) => s + t.weight * t.frac, 0) / total()
    const pct = Math.min(100, Math.round(p * 100))
    if (pct < shown) return // never go backwards
    shown = pct
    if (boot && !boot.classList.contains('is-det')) boot.classList.add('is-det')
    if (arc) arc.style.strokeDashoffset = String(100 - pct)
    if (pctEl) pctEl.textContent = String(pct)
  }
  const track = (weight, promise) => {
    const t = add(weight)
    return Promise.resolve(promise)
      .catch(() => {}) // a failed piece must not block the site; it loads on demand later
      .then(() => {
        t.frac = 1
        render()
      })
  }

  const work = [
    ...chunks.map((load) => track(1, load())),
    track(1, fontsReady()),
  ]
  if (music) {
    const t = add(6)
    work.push(
      fetchMusic(music, (f) => {
        t.frac = Math.min(0.99, f)
        render()
      })
        .catch(() => {}) // falls back to streaming the file when tapped
        .then(() => {
          t.frac = 1
          render()
        }),
    )
  }
  render()

  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    if (!boot) return
    boot.classList.add('is-done')
    setTimeout(() => boot.remove(), 700)
  }

  const all = Promise.all(work).then(() => {
    // let the ring visibly reach 100% before fading
    tasks.forEach((t) => (t.frac = 1))
    render()
    return new Promise((r) => setTimeout(r, 350))
  })
  const safety = new Promise((r) => setTimeout(r, SAFETY_MS))
  return Promise.race([all, safety]).then(finish)
}
