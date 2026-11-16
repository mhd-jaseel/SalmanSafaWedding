import { useEffect, useMemo, useRef, useState } from 'react'
import { GATE_OPEN_MS, GATE_OPEN_REDUCED_MS } from './timing.js'
import './Gate.css'

/*
  Opening screen — "the palace doors".
  Pure CSS animation (no framer-motion) so it is in the tiny first bundle and
  paints fast. Everything else on the site loads in the background meanwhile.

    onTap():  called SYNCHRONOUSLY inside the tap (start audio here).
    onOpen(): called when the doors have opened into the light.
*/

function useCountdown(iso) {
  const target = useMemo(() => (iso ? new Date(iso).getTime() : NaN), [iso])
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!Number.isFinite(target)) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [target])
  if (!Number.isFinite(target)) return null
  const diff = Math.max(0, target - now)
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor(diff / 36e5) % 24,
    m: Math.floor(diff / 6e4) % 60,
    s: Math.floor(diff / 1e3) % 60,
    done: diff === 0,
  }
}

// Subtle parallax from pointer (desktop) or device tilt (Android) -> CSS vars.
function useParallax(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let tx = 0
    let ty = 0
    const apply = () => {
      raf = 0
      el.style.setProperty('--px', tx.toFixed(3))
      el.style.setProperty('--py', ty.toFixed(3))
    }
    const queue = (x, y) => {
      tx = Math.max(-1, Math.min(1, x))
      ty = Math.max(-1, Math.min(1, y))
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onMove = (e) => queue((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    const onTilt = (e) => {
      if (e.gamma == null) return
      queue(e.gamma / 25, (e.beta - 45) / 25)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('deviceorientation', onTilt, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('deviceorientation', onTilt)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

const pad = (n) => String(n).padStart(2, '0')

function Star8({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1l2.6 4.7L19.8 4.2l-1.5 5.2L23 12l-4.7 2.6 1.5 5.2-5.2-1.5L12 23l-2.6-4.7-5.2 1.5 1.5-5.2L1 12l4.7-2.6L4.2 4.2l5.2 1.5z"
        fill="currentColor"
      />
    </svg>
  )
}

const DUST = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 41 + 5) % 100}%`,
  '--s': `${2 + ((i * 7) % 4)}px`,
  '--dur': `${9 + ((i * 13) % 9)}s`,
  '--dx': `${((i * 17) % 40) - 20}px`,
  animationDelay: `${-((i * 1.7) % 14)}s`,
}))

export default function Gate({ data, onOpen, onTap }) {
  const [opening, setOpening] = useState(false)
  const done = useRef(false)
  const rootRef = useRef(null)
  useParallax(rootRef)

  const groom = data?.groom?.name ?? 'Groom'
  const bride = data?.bride?.name ?? 'Bride'
  const cd = useCountdown(data?.nikkah?.dateISO)

  const handleOpen = () => {
    if (done.current) return
    done.current = true
    onTap?.() // keep in the gesture call stack (audio unlock)
    if (navigator.userActivation?.isActive) navigator.vibrate?.(18)
    setOpening(true)
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    setTimeout(() => onOpen?.(), reduce ? GATE_OPEN_REDUCED_MS : GATE_OPEN_MS)
  }

  return (
    <section ref={rootRef} className={`gate${opening ? ' is-opening' : ''}`} aria-label="Invitation">
      {/* ------------------------------------------------ atmosphere */}
      <div className="gate-bg" aria-hidden="true">
        <div className="gate-pattern" />
        <span className="gate-orb gate-orb--a" />
        <span className="gate-orb gate-orb--b" />
        <span className="gate-orb gate-orb--c" />
        <div className="gate-dust">
          {DUST.map((s, i) => (
            <i key={i} style={s} />
          ))}
        </div>
        <div className="gate-vignette" />
      </div>

      <div className="gate-inner">
        <p className="gate-bismillah gate-in" style={{ '--d': '0.1s' }} lang="ar" dir="rtl">
          {data?.bismillah}
        </p>

        <p className="gate-kicker gate-in" style={{ '--d': '0.3s' }}>
          <Star8 className="gate-kicker__star" />
          You&rsquo;re invited to the Nikkah of
          <Star8 className="gate-kicker__star" />
        </p>

        <h1 className="gate-names gate-in" style={{ '--d': '0.45s' }}>
          <span className="gate-shimmer">{groom}</span>
          <span className="gate-amp">&amp;</span>
          <span className="gate-shimmer">{bride}</span>
        </h1>

        {/* ------------------------------------------------ the palace doors */}
        <div className="gate-arch gate-in" style={{ '--d': '0.6s' }}>
          <svg className="gate-arch__frame" viewBox="0 -26 200 306" aria-hidden="true">
            {/* finial: crescent + star */}
            <g className="gate-finial">
              <path d="M100 -24 a9 9 0 1 0 6 15.6 a7 7 0 1 1 -6 -15.6z" fill="#d4af6a" />
              <path d="M100 -6 V2" stroke="#d4af6a" strokeWidth="1.4" />
            </g>
            <path className="gate-draw gate-draw--outer" d="M4 280 V92 A96 88 0 0 1 196 92 V280" />
            <path className="gate-draw gate-draw--inner" d="M12 280 V93 A88 80 0 0 1 188 93 V280" />
            <path className="gate-draw gate-draw--dots" d="M8 280 V92.5 A92 84 0 0 1 192 92.5 V280" />
          </svg>

          <button type="button" className="gate-portal" onClick={handleOpen} aria-label="Open the invitation">
            {/* light waiting behind the doors */}
            <span className="gate-light" aria-hidden="true">
              <span className="gate-rays" />
            </span>
            <span className="gate-door gate-door--l" aria-hidden="true">
              <span className="gate-door__panel" />
              <span className="gate-door__ring" />
            </span>
            <span className="gate-door gate-door--r" aria-hidden="true">
              <span className="gate-door__panel" />
              <span className="gate-door__ring" />
            </span>
            {/* monogram medallion on the seam */}
            <span className="gate-medal" aria-hidden="true">
              <span className="gate-medal__ring" />
              <span className="gate-medal__face">
                <span>{groom[0]}</span>
                <em>&amp;</em>
                <span>{bride[0]}</span>
              </span>
            </span>
          </button>
        </div>

        {/* ------------------------------------------------ countdown */}
        {cd && !cd.done && (
          <div className="gate-count gate-in" style={{ '--d': '0.85s' }} aria-label="Countdown to the Nikkah">
            {[
              [cd.d, 'Days'],
              [pad(cd.h), 'Hours'],
              [pad(cd.m), 'Mins'],
              [pad(cd.s), 'Secs'],
            ].map(([v, l]) => (
              <span key={l} className="gate-count__tile">
                <b>{v}</b>
                <small>{l}</small>
              </span>
            ))}
          </div>
        )}
        {data?.nikkah?.dateLabel && (
          <p className="gate-date gate-in" style={{ '--d': '0.95s' }}>
            {data.nikkah.dateLabel}
            {data?.nikkah?.venue ? <span>{data.nikkah.venue}</span> : null}
          </p>
        )}

        <div className="gate-cta gate-in" style={{ '--d': '1.1s' }}>
          <button type="button" className="gate-button" onClick={handleOpen}>
            <span className="gate-button__shine" aria-hidden="true" />
            <span className="gate-button__label">Open Invitation</span>
            <span className="gate-button__arrows" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
          <p className="gate-hint">Tap the doors &middot; sound on ♪</p>
        </div>
      </div>

      <div className="gate-flash" aria-hidden="true" />
    </section>
  )
}
