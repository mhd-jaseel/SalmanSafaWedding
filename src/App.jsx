import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { wedding } from './data/wedding.js'
import Gate from './components/Gate/Gate.jsx'
import { music } from './components/Music/useMusic.js'

// ---------------------------------------------------------------------------
// Loading strategy
//  • The first bundle only contains React + the Gate (opening screen) + music
//    engine, so the opening screen paints fast.
//  • Everything heavy (intro animation, faces, details page, framer-motion)
//    lives in separate chunks that start downloading in the background as
//    soon as the Gate is on screen, so they're ready by the time guests tap.
// ---------------------------------------------------------------------------
const loadIntro = () => import('./components/Intro/Intro.jsx')
const loadDetails = () => import('./components/Details/Details.jsx')
const loadToggle = () => import('./components/Music/MusicToggle.jsx')
const Intro = lazy(loadIntro)
const Details = lazy(loadDetails)
const MusicToggle = lazy(loadToggle)

const preloadRest = () => Promise.all([loadIntro(), loadDetails(), loadToggle()]).catch(() => {})

// Stages: 'gate' -> 'intro' -> 'details'
// Add ?skip=1 to the URL to jump straight to the details page (testing).
const SKIP =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('skip')

const INTRO_SAFETY_MS = 25000 // never get stuck if the intro forgets to finish
const GATE_FADE_MS = 550

export default function App() {
  const [stage, setStage] = useState(SKIP ? 'details' : 'gate')
  const [gateMounted, setGateMounted] = useState(!SKIP)

  // Start fetching the rest of the site while the Gate is being admired.
  useEffect(() => {
    const ric = window.requestIdleCallback
    const id = ric ? ric(preloadRest, { timeout: 900 }) : setTimeout(preloadRest, 250)
    return () => (ric ? window.cancelIdleCallback?.(id) : clearTimeout(id))
  }, [])

  // Called synchronously inside the tap on the gate -> audio is unlocked.
  const startMusic = useCallback(() => music.start(wedding.music), [])

  const handleGateOpen = useCallback(() => {
    music.start(wedding.music) // no-op if already started by onTap
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
      music.start(wedding.music)
      events.forEach((e) => window.removeEventListener(e, once))
    }
    events.forEach((e) => window.addEventListener(e, once))
    return () => events.forEach((e) => window.removeEventListener(e, once))
  }, [])

  return (
    <>
      {stage !== 'gate' && (
        <Suspense fallback={<div className="app-loading" aria-hidden="true" />}>
          <Details data={wedding} />
        </Suspense>
      )}

      {stage === 'intro' && (
        <Suspense fallback={<div className="app-loading app-loading--top" aria-hidden="true" />}>
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
