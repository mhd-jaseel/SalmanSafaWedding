// ---------------------------------------------------------------------------
// Up-front loading.
// The loader in index.html (#boot) stays on screen until EVERYTHING the
// invitation needs is downloaded: the intro / details / music-button code,
// the web fonts and the music file.  After that, nothing on the site has to
// wait for the network again, so it plays smoothly on slow phones too.
//
// Progress is real: each task reports how far it is, weighted by its size,
// and is fed to the inline loader driver (index.html), which draws the arch,
// the line and the count.  A safety cap makes sure a very slow
// connection never keeps guests stuck on the loader.
// ---------------------------------------------------------------------------

import { setDoorRecording } from './components/Gate/doorSound.js'

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
export function preloadAll({ chunks, music, doorSound }) {
  // the progress driver lives inline in index.html (window.__boot)
  const driver = typeof window !== 'undefined' ? window.__boot : null

  // task weights (≈ download size): code chunks + fonts are light, the song is heavy
  const tasks = []
  const add = (weight) => {
    const t = { weight, frac: 0 }
    tasks.push(t)
    return t
  }
  const report = () => {
    const total = tasks.reduce((s, t) => s + t.weight, 0)
    driver?.progress(tasks.reduce((s, t) => s + t.weight * t.frac, 0) / total)
  }
  const track = (weight, promise) => {
    const t = add(weight)
    return Promise.resolve(promise)
      .catch(() => {}) // a failed piece must not block the site; it loads on demand later
      .then(() => {
        t.frac = 1
        report()
      })
  }

  const work = [
    ...chunks.map((load) => track(1, load())),
    track(1, fontsReady()),
  ]
  if (doorSound) {
    work.push(
      track(
        1,
        fetch(doorSound)
          .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`door ${r.status}`))))
          .then(setDoorRecording),
      ),
    )
  }
  if (music) {
    const t = add(6)
    work.push(
      fetchMusic(music, (f) => {
        t.frac = Math.min(0.99, f)
        report()
      })
        .catch(() => {}) // falls back to streaming the file when tapped
        .then(() => {
          t.frac = 1
          report()
        }),
    )
  }
  report()

  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    // the driver runs the line + count up to 100, then fades the loader out
    if (driver) return driver.finish()
    document.getElementById('boot')?.remove()
  }

  const safety = new Promise((r) => setTimeout(r, SAFETY_MS))
  return Promise.race([Promise.all(work), safety]).then(finish)
}
