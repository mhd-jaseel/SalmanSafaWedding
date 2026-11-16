import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { animate } from 'framer-motion'
import defaultWedding from '../../data/wedding.js'
import Bride from './Bride.jsx'
import Groom from './Groom.jsx'
import HugCouple from './HugCouple.jsx'
import { ArchFrame, HeartIcon, InnerArch, Lantern, SharedDefs, Tassel } from './StageArt.jsx'
import { music } from '../Music/useMusic.js'
import './Intro.css'

/*
  Cinematic intro (~14.5 s):
    0.0  stage fades in, Bismillah glows
    0.7  bride walks in from the left, groom from the right
    3.8  they meet at centre – shy blush + heart pop
    4.9  hug – heart burst
    6.6  hold hands, then walk together to the rope on the right
   ~9.9  groom reaches up and tugs the rope twice
  ~10.6  curtain rises → names + golden shower
  ~13.6  overlay fades / zooms out → onComplete()
*/

// Pose of every character for each phase. Arm values map to CSS rules on
// .intro-arm-{l,r}[data-a=…]  (see Intro.css).
const POSES = {
  ready: { b: ['rest', 'rest'], g: ['rest', 'rest'] },
  walk: { b: ['swing', 'swing'], g: ['swing', 'swing'], walk: true, names: true },
  meet: { b: ['shy', 'shy'], g: ['rest', 'rest'], lean: 'tilt', blush: true, names: true },
  open: { b: ['open', 'open'], g: ['open', 'open'], lean: 'tilt', blush: true },
  // cheek-to-cheek cuddle: her inner arm over his shoulder, his inner arm behind her back
  hug: { b: ['rest', 'hide'], g: ['hide', 'rest'], hugging: true, sway: true, blush: true },
  hold: { b: ['rest', 'hold'], g: ['hold', 'rest'], blush: true },
  together: { b: ['swing', 'hold'], g: ['hold', 'swing'], walk: true, blush: true },
  reach: { b: ['shy', 'shy'], g: ['rest', 'reach'], blush: true },
  pull: { b: ['shy', 'shy'], g: ['rest', 'reach'], tug: true, blush: true },
  reveal: { b: ['cheer', 'cheer'], g: ['cheer', 'cheer'], hop: true, blush: true },
  outro: { b: ['cheer', 'cheer'], g: ['cheer', 'cheer'], blush: true },
}
const ORDER = Object.keys(POSES)

// Tiny deterministic PRNG so decorations are stable between renders.
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const LANTERNS = [
  { x: '7%', len: '22vh', delay: '0s', dur: '3.6s' },
  { x: '19%', len: '10vh', delay: '-1.2s', dur: '3.1s' },
  { x: '80%', len: '12vh', delay: '-0.6s', dur: '3.4s' },
]

export default function Intro({ data, onComplete }) {
  const w = data || defaultWedding
  const groomName = w?.groom?.name || 'Groom'
  const brideName = w?.bride?.name || 'Bride'
  const bismillah = w?.bismillah || 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'
  const dateLabel = w?.nikkah?.dateLabel || ''

  const [reduced] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  const [phase, setPhase] = useState('ready')
  const [center, setCenter] = useState(0) // couple centre (px from stage centre) for heart effects

  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const brideRef = useRef(null)
  const groomRef = useRef(null)
  const ropeRef = useRef(null)
  const curtLRef = useRef(null)
  const curtRRef = useRef(null)

  // onComplete guard – survives StrictMode double effects and Skip races.
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])
  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onCompleteRef.current?.()
  }, [])

  const skippingRef = useRef(false)
  const skip = useCallback(() => {
    if (doneRef.current || skippingRef.current) return
    skippingRef.current = true
    const el = rootRef.current
    if (!el) return finish()
    animate(el, { opacity: 0 }, { duration: 0.35, ease: 'easeOut' }).finished.then(finish, finish)
    setTimeout(finish, 600) // belt & braces
  }, [finish])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && skip()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [skip])

  // ---------------------------------------------------------------- sequence
  useEffect(() => {
    let cancelled = false
    const timers = new Set()
    const anims = new Set()

    const wait = (ms) =>
      new Promise((resolve) => {
        const id = setTimeout(() => {
          timers.delete(id)
          resolve()
        }, ms)
        timers.add(id)
      })
    const go = (el, keyframes, options) => {
      if (!el || cancelled) return Promise.resolve()
      const a = animate(el, keyframes, options)
      anims.add(a)
      return a.finished.catch(() => {})
    }
    const setX = (el, x) => go(el, { x }, { duration: 0 })
    const stage = (p) => !cancelled && setPhase(p)

    const run = async () => {
      const st = stageRef.current
      const bride = brideRef.current
      const groom = groomRef.current
      const rope = ropeRef.current
      if (!st || !bride || !groom || !rope) return finish()

      const W = st.clientWidth
      const C = bride.offsetWidth || W * 0.4
      const sr = st.getBoundingClientRect()
      const rr = rope.getBoundingClientRect()
      const ropeX = rr.left + rr.width / 2 - (sr.left + sr.width / 2)

      const mc = -W * 0.08 // meeting point (a touch left of centre leaves room to walk to the rope)
      const off = W / 2 + C * 0.75 // fully off-stage
      const meet = C * 0.42
      const hug = C * 0.36 // step-in distance just before the embrace scene fades in
      const hold = C * 0.4 // hand-to-hand spacing for the "hold" arm pose
      const gx = ropeX - C * 0.315 // groom x that puts his raised right hand on the tassel
      const bx = gx - hold * 2

      setCenter(mc)

      if (reduced) {
        setX(bride, mc - hold)
        setX(groom, mc + hold)
        stage('hold')
        await wait(350)
        if (cancelled) return
        go(curtLRef.current, { opacity: 0 }, { duration: 0.6 })
        go(curtRRef.current, { opacity: 0 }, { duration: 0.6 })
        stage('reveal')
        await wait(1700)
        if (cancelled) return
        await go(rootRef.current, { opacity: 0 }, { duration: 0.5 })
        if (!cancelled) finish()
        return
      }

      // Sync with audio: restart audio at 0 for the intro stage
      if (music.audio && !music.audio.paused) {
        try {
          music.audio.currentTime = 0
        } catch {}
      }

      const startWall = performance.now()
      const getAudioTime = () => {
        if (music.audio && !music.audio.paused && music.audio.currentTime > 0) {
          return music.audio.currentTime
        }
        return (performance.now() - startWall) / 1000
      }

      const waitAudio = (targetSec) =>
        new Promise((resolve) => {
          const check = () => {
            if (cancelled) return resolve()
            if (getAudioTime() >= targetSec) return resolve()
            requestAnimationFrame(check)
          }
          const remainingMs = Math.max(16, (targetSec - getAudioTime()) * 1000)
          const id = setTimeout(resolve, remainingMs + 350)
          timers.add(id)
          requestAnimationFrame(check)
        })

      setX(bride, -off)
      setX(groom, off)

      // 0.0 - 0.8s: stage fades in, Bismillah appears
      await waitAudio(0.8)
      if (cancelled) return

      // 1. Slow-motion walk in from both sides (0.8s to 4.2s)
      stage('walk')
      const walkDur = Math.max(1.5, 4.2 - getAudioTime())
      const walkIn = { duration: walkDur, ease: [0.35, 0.15, 0.45, 1] }
      go(bride, { x: [-off, mc - meet] }, walkIn)
      go(groom, { x: [off, mc + meet] }, walkIn)
      await waitAudio(4.2)
      if (cancelled) return

      // 2. Meet at center in slow motion – shy blush + heart pop (4.2s to 5.2s)
      stage('meet')
      await waitAudio(5.2)
      if (cancelled) return

      // 3. Arms open wide and step into hug (5.2s to 5.6s)
      stage('open')
      const stepDur = Math.max(0.2, 5.6 - getAudioTime())
      const stepIn = { duration: stepDur, ease: [0.4, 0, 0.3, 1] }
      go(bride, { x: mc - hug }, stepIn)
      go(groom, { x: mc + hug }, stepIn)
      await waitAudio(5.6)
      if (cancelled) return

      // 4. Embrace: slow-motion sway + heart burst (5.6s to 8.8s)
      stage('hug')
      await waitAudio(8.8)
      if (cancelled) return

      // 5. Let go → hold hands (8.8s to 9.8s)
      setX(bride, mc - hold)
      setX(groom, mc + hold)
      stage('hold')
      await waitAudio(9.8)
      if (cancelled) return

      // 6. Walk together to the rope in slow motion (9.8s to 11.0s)
      stage('together')
      const togetherDur = Math.max(0.8, 11.0 - getAudioTime())
      const together = { duration: togetherDur, ease: [0.4, 0.1, 0.4, 1] }
      go(bride, { x: bx }, together)
      go(groom, { x: gx }, together)
      await waitAudio(11.0)
      if (cancelled) return

      // 7. Reach for the tassel (11.0s to 11.5s)
      stage('reach')
      await waitAudio(11.5)
      if (cancelled) return

      // 8. Tug the rope (11.5s to 12.0s)
      stage('pull')
      await waitAudio(12.0)
      if (cancelled) return

      // 9. CURTAIN RISES AT 12.0s: Song switches to normal tempo (part after 10s kicks in!)
      const rise = { duration: 1.8, times: [0, 0.12, 1], ease: [0.55, 0, 0.25, 1] }
      go(curtLRef.current, { y: ['0%', '3%', '-104%'] }, rise)
      go(curtRRef.current, { y: ['0%', '3%', '-104%'] }, { ...rise, delay: 0.1 })
      await wait(300)
      if (cancelled) return

      // 10. Reveal celebration at full normal energy (golden shower, radiant rays, glowing names)
      stage('reveal')
      await waitAudio(16.2)
      if (cancelled) return

      // 11. Fade / zoom out to the details page while music continues seamlessly
      stage('outro')
      go(stageRef.current, { scale: 1.08 }, { duration: 1.0, ease: [0.4, 0, 0.2, 1] })
      await go(rootRef.current, { opacity: 0 }, { duration: 0.9, ease: 'easeIn' })
      if (!cancelled) finish()
    }

    run()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      timers.clear()
      anims.forEach((a) => a.stop())
      anims.clear()
    }
  }, [reduced, finish])

  // ------------------------------------------------------------- decoration
  const bokeh = useMemo(() => {
    const r = rng(7)
    return Array.from({ length: 16 }, () => ({
      left: `${(r() * 96 + 2).toFixed(1)}%`,
      top: `${(r() * 66 + 2).toFixed(1)}%`,
      '--s': `${(4 + r() * 10).toFixed(1)}px`,
      '--d': `${(-r() * 4).toFixed(2)}s`,
      '--t': `${(2.6 + r() * 2.6).toFixed(2)}s`,
    }))
  }, [])

  const hearts = useMemo(() => {
    const r = rng(42)
    const colors = ['#e8b4b8', '#c97b84', '#f2899a', '#d4af6a', '#fbd3d8']
    return Array.from({ length: 13 }, (_, i) => ({
      '--dx': `${((r() - 0.5) * 1.1).toFixed(2)}`,
      '--rise': `${(0.55 + r() * 0.5).toFixed(2)}`,
      '--sz': `${(0.06 + r() * 0.05).toFixed(3)}`,
      '--rot': `${((r() - 0.5) * 50).toFixed(0)}deg`,
      animationDelay: `${(r() * 0.7).toFixed(2)}s`,
      animationDuration: `${(1.7 + r() * 0.8).toFixed(2)}s`,
      color: colors[i % colors.length],
    }))
  }, [])

  const shower = useMemo(() => {
    const r = rng(99)
    const colors = ['#d4af6a', '#e9d5a6', '#fbf6ec', '#f3d999', '#e8b4b8']
    return Array.from({ length: 30 }, (_, i) => ({
      left: `${(r() * 100).toFixed(1)}%`,
      width: `${(4 + r() * 5).toFixed(1)}px`,
      '--drift': `${((r() - 0.5) * 60).toFixed(0)}px`,
      '--spin': `${(180 + r() * 540).toFixed(0)}deg`,
      animationDelay: `${(r() * 2).toFixed(2)}s`,
      animationDuration: `${(2.6 + r() * 1.6).toFixed(2)}s`,
      background: colors[i % colors.length],
      borderRadius: i % 3 === 0 ? '50%' : '1px',
    }))
  }, [])

  const idx = ORDER.indexOf(phase)
  const p = POSES[phase]
  const showHearts = idx >= ORDER.indexOf('hug') && idx <= ORDER.indexOf('together')
  const revealed = idx >= ORDER.indexOf('reveal')

  const charInner = (who) => {
    const isGroom = who === 'g'
    const [armL, armR] = p[who]
    const dip = p.tug && isGroom ? 'tug' : p.hop ? 'hop' : p.sway ? 'sway' : 'none'
    const Comp = isGroom ? Groom : Bride
    return (
      <>
        <span className="intro-shadow" />
        <div className="intro-lean" data-lean={p.lean || 'none'}>
          <div className={`intro-bob${p.walk ? ' is-walking' : ''}`}>
            <div className="intro-dip" data-dip={dip}>
              <Comp armL={armL} armR={armR} walking={!!p.walk} blush={!!p.blush} hug={!!p.hugging} />
            </div>
          </div>
        </div>
        <span className={`intro-name${p.names ? ' is-on' : ''}`}>{isGroom ? groomName : brideName}</span>
      </>
    )
  }

  return (
    <div
      ref={rootRef}
      className={`intro-root intro-phase-${phase}${reduced ? ' is-reduced' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${groomName} and ${brideName} wedding invitation intro`}
    >
      <SharedDefs />
      <div className="intro-stage" ref={stageRef}>
        {/* back wall revealed when the curtain rises */}
        <div className={`intro-reveal${revealed ? ' is-on' : ''}`}>
          <div className="intro-reveal-rays" />
          <div className="intro-reveal-glow" />
          <InnerArch />
          <div className="intro-title">
            <p className="intro-title-names">
              <span>{groomName}</span>
              <HeartIcon className="intro-title-heart" />
              <span>{brideName}</span>
            </p>
            <p className="intro-title-sub">We&rsquo;re getting married</p>
            {dateLabel && <p className="intro-title-date">{dateLabel}</p>}
          </div>
        </div>

        {/* velvet curtain (two halves) */}
        <div className="intro-curtain intro-curtain-l" ref={curtLRef} />
        <div className="intro-curtain intro-curtain-r" ref={curtRRef} />

        <ArchFrame />
        <div className="intro-floor" />

        <div className="intro-bokeh" aria-hidden="true">
          {bokeh.map((s, i) => (
            <i key={i} style={s} />
          ))}
        </div>

        {LANTERNS.map((l, i) => (
          <div
            key={i}
            className="intro-lantern"
            style={{ left: l.x, '--len': l.len, animationDelay: l.delay, animationDuration: l.dur }}
            aria-hidden="true"
          >
            <span className="intro-lantern-string" />
            <span className="intro-lantern-body">
              <span className="intro-lantern-glow" />
              <Lantern />
            </span>
          </div>
        ))}

        <div className="intro-rope" ref={ropeRef} data-tug={phase === 'pull' ? 'on' : 'off'} aria-hidden="true">
          <span className="intro-rope-cord" />
          <Tassel />
        </div>

        <div className={`intro-lane${phase === 'hug' ? ' is-hugging' : ''}`}>
          <div
            className={`intro-hug${phase === 'hug' ? ' is-on' : ''}`}
            style={{ transform: `translateX(${center}px)` }}
            aria-hidden="true"
          >
            <HugCouple />
          </div>
          <div className="intro-char intro-char-groom" ref={groomRef}>
            {charInner('g')}
          </div>
          <div className="intro-char intro-char-bride" ref={brideRef}>
            {charInner('b')}
          </div>

          {phase === 'meet' && (
            <span className="intro-pop" style={{ left: `calc(50% + ${center}px)` }}>
              <HeartIcon />
            </span>
          )}
          {showHearts && (
            <div className="intro-hearts" style={{ left: `calc(50% + ${center}px)` }} aria-hidden="true">
              {hearts.map((h, i) => (
                <span key={i} className="intro-heart" style={h}>
                  <HeartIcon />
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="intro-bismillah" lang="ar" dir="rtl">
          {bismillah}
        </p>

        {revealed && !reduced && (
          <div className="intro-shower" aria-hidden="true">
            {shower.map((s, i) => (
              <i key={i} style={s} />
            ))}
          </div>
        )}
      </div>

      <button type="button" className="intro-skip" onClick={skip}>
        Skip <span aria-hidden="true">&rsaquo;</span>
      </button>
    </div>
  )
}
