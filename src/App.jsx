import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { wedding } from './data/wedding.js'
import Gate from './components/Gate/Gate.jsx'
import { music } from './components/Music/useMusic.js'
import { musicSrc, preloadAll } from './preload.js'

// ---------------------------------------------------------------------------
// Loading strategy
//  • The first bundle only contains React + the Gate (opening screen) + music
//    engine, so the opening screen paints fast.
//  • Everything heavy (intro animation, faces, details page, framer-motion)
//    lives in separate chunks; they, the fonts and the song are all
//    downloaded while the loader is up, so nothing stalls after it fades.
// ---------------------------------------------------------------------------
// Once a chunk has been downloaded its component is kept here and rendered
// directly — React.lazy would otherwise still suspend for a frame on first use.
const ready = {}
const keep = (key, load) => () =>
  load().then((m) => {
    ready[key] = m.default
    return m
  })
const loadIntro = keep('intro', () => import('./components/Intro/Intro.jsx'))
const loadDetails = keep('details', () => import('./components/Details/Details.jsx'))
const loadToggle = keep('toggle', () => import('./components/Music/MusicToggle.jsx'))
const LazyIntro = lazy(loadIntro)
const LazyDetails = lazy(loadDetails)
const LazyToggle = lazy(loadToggle)

// Everything is downloaded up front behind the loader (see src/preload.js),
// so after it fades nothing waits on the network again.
let preloadStarted = false
const startPreload = () => {
  if (preloadStarted) return
  preloadStarted = true
  preloadAll({ chunks: [loadIntro, loadDetails, loadToggle], music: wedding.music })
}

// Shown only if a piece somehow still isn't ready (e.g. the safety cap hit on a very slow network).
const Waiting = ({ top = false }) => (
  <div className={`app-loading${top ? ' app-loading--top' : ''}`} role="status" aria-label="Loading">
    <span className="app-loading-ring" aria-hidden="true" />
  </div>
)

// Stages: 'gate' -> 'intro' -> 'details'
// Add ?skip=1 to the URL to jump straight to the details page (testing).
const SKIP =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('skip')

const INTRO_SAFETY_MS = 25000 // never get stuck if the intro forgets to finish
const GATE_FADE_MS = 550

export default function App() {
  const Intro = ready.intro || LazyIntro
  const Details = ready.details || LazyDetails
  const MusicToggle = ready.toggle || LazyToggle
  const [stage, setStage] = useState(SKIP ? 'details' : 'gate')
  const [gateMounted, setGateMounted] = useState(!SKIP)

  // Download the whole site behind the loader, then reveal the Gate.
  useEffect(startPreload, [])

  // Called synchronously inside the tap on the gate -> audio is unlocked.
  const startMusic = useCallback(() => music.start(musicSrc(wedding.music)), [])

  const handleGateOpen = useCallback(() => {
    music.start(musicSrc(wedding.music)) // no-op if already started by onTap
    window.scrollTo(0, 0)
    setStage('intro')
    setTimeout(() => setGateMounted(false), GATE_FADE_MS + 50)
  }, [])

  const handleIntroDone = useCallback(() => setStage('details'), [])

  // Lock page scroll while the intro curtain plays.
  useEffect(() => {
    if (stage !== 'intro') return
    document.body.classList.add('is-locked')
    const t = setTimeout(() => setStage('details'), INTRO_SAFETY_MS)
    return () => {
      document.body.classList.remove('is-locked')
      clearTimeout(t)
    }
  }, [stage])

  // ?skip=1 : start music on the first tap anywhere.
  useEffect(() => {
    if (!SKIP) return
    const events = ['click', 'touchend', 'keydown']
    const once = () => {
      music.start(musicSrc(wedding.music))
      events.forEach((e) => window.removeEventListener(e, once))
    }
    events.forEach((e) => window.addEventListener(e, once))
    return () => events.forEach((e) => window.removeEventListener(e, once))
  }, [])

  return (
    <>
      {stage !== 'gate' && (
        <Suspense fallback={<Waiting />}>
          <Details data={wedding} />
        </Suspense>
      )}

      {stage === 'intro' && (
        <Suspense fallback={<Waiting top />}>
          <Intro data={wedding} onComplete={handleIntroDone} />
        </Suspense>
      )}

      {gateMounted && (
        <div className={`app-gate${stage !== 'gate' ? ' is-leaving' : ''}`}>
          <Gate data={wedding} onTap={startMusic} onOpen={handleGateOpen} />
        </div>
      )}

      {stage !== 'gate' && (
        <Suspense fallback={null}>
          <MusicToggle src={wedding.music} />
        </Suspense>
      )}
    </>
  )
}
