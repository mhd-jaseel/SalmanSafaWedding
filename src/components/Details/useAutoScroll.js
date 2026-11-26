import { useEffect } from 'react'

// Slowly scrolls the invitation down on its own, like a film credit roll.
//  • Starts a moment after `enabled` turns true (i.e. once the intro is done).
//  • Any touch / wheel / key / click from the guest pauses it; it picks up
//    again from wherever they left off after a few quiet seconds.
//  • Stops for good at the bottom of the page.
//  • Skipped entirely for people who prefer reduced motion.
const SPEED_PX_PER_S = 75
const START_DELAY_MS = 1000
const RESUME_AFTER_MS = 3000

export default function useAutoScroll(enabled) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    let raf = 0
    let last = 0
    let pos = window.scrollY // float accumulator (scrollY is rounded)
    let paused = true
    let done = false
    let timer = setTimeout(resume, START_DELAY_MS)

    function step(now) {
      if (paused || done) return
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      const max = root.scrollHeight - window.innerHeight
      pos = Math.min(pos + (SPEED_PX_PER_S * dt) / 1000, max)
      window.scrollTo({ top: pos, behavior: 'instant' })
      if (pos >= max - 1) {
        done = true
        stopListening()
        return
      }
      raf = requestAnimationFrame(step)
    }

    function resume() {
      if (done) return
      paused = false
      last = 0
      pos = window.scrollY // continue from where the guest left it
      raf = requestAnimationFrame(step)
    }

    function onUser() {
      paused = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      timer = setTimeout(resume, RESUME_AFTER_MS)
    }

    const events = ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown']
    const opts = { passive: true }
    events.forEach((e) => window.addEventListener(e, onUser, opts))
    function stopListening() {
      events.forEach((e) => window.removeEventListener(e, onUser, opts))
    }

    return () => {
      done = true
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      stopListening()
    }
  }, [enabled])
}
