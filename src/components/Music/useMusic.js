// ------------------------------------------------------------------
//  Background music engine (singleton) + React hook.
//
//  music.start(src) MUST be called synchronously inside a user gesture
//  (click / tap handler) — that is what unlocks audio on mobile.
//
//  1. Tries to play `src` (e.g. /music/nikkah.mp3) with an <audio> element,
//     looping, fading in to ~0.7.
//  2. If the file is missing / fails / stalls, falls back to a soft
//     synthesized Hijaz melody (see synth.js) on the Web Audio API.
// ------------------------------------------------------------------
import { useSyncExternalStore } from 'react'
import { createNikkahSynth } from './synth.js'

const FILE_VOLUME = 0.7
const SYNTH_VOLUME = 0.55
const FADE_IN = 0.5 // s
const FADE_OUT = 0.4 // s
const FILE_TIMEOUT_MS = 9000 // give up on the mp3 if it hasn't started by then

class MusicEngine {
  state = { started: false, playing: false, source: null } // source: 'file' | 'synth' | null
  listeners = new Set()
  ctx = null
  audio = null
  synth = null
  fadeRaf = 0
  pauseTimer = 0
  pausedByVisibility = false
  userPaused = false

  constructor() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibility)
      window.addEventListener('pagehide', () => this.suspendNow())
    }
  }

  // ---------- store plumbing ----------
  subscribe = (fn) => {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
  getState = () => this.state
  set(patch) {
    this.state = { ...this.state, ...patch }
    this.listeners.forEach((fn) => fn())
  }

  getCurrentTime = () => {
    if (this.audio && Number.isFinite(this.audio.currentTime)) {
      return this.audio.currentTime
    }
    return 0
  }

  // ---------- public API ----------
  /**
   * Call synchronously from a tap/click handler. Safe to call repeatedly.
   * `delay` (ms): the song is unlocked right away (muted, inside the gesture —
   * mobile browsers require that) but only becomes audible, from the start,
   * after the delay, e.g. once the gate's light has faded.
   */
  start = (src, { delay = 0 } = {}) => {
    if (this.state.started) return
    this.set({ started: true })
    this.userPaused = false
    const startAt = performance.now() + delay
    const later = (fn) => {
      const wait = startAt - performance.now()
      if (wait <= 0) return fn()
      clearTimeout(this.delayTimer)
      this.pendingStart = fn
      this.delayTimer = setTimeout(() => {
        this.pendingStart = null
        fn()
      }, wait)
    }

    // Unlock Web Audio inside the gesture (needed for the fallback later).
    this.unlockContext()

    if (!src) {
      later(() => this.useSynth())
      return
    }

    const audio = new Audio()
    this.audio = audio
    audio.loop = false
    audio.preload = 'auto'
    audio.volume = 0
    // muted until the delay is over (volume is read-only on iOS, `muted` is not)
    audio.muted = delay > 0
    audio.setAttribute('playsinline', '')
    let settled = false

    audio.addEventListener('ended', () => {
      this.set({ playing: false })
    })

    const fail = () => {
      if (settled) return
      settled = true
      clearTimeout(timeout)
      try {
        audio.pause()
        audio.removeAttribute('src')
        audio.load()
      } catch {
        /* ignore */
      }
      this.audio = null
      later(() => this.useSynth())
    }
    const ok = () => {
      if (settled) return
      settled = true
      clearTimeout(timeout)
      this.set({ source: 'file' })
      later(() => {
        // begin from the top, now audible
        try {
          if (audio.currentTime > 0) audio.currentTime = 0
        } catch {
          /* ignore */
        }
        audio.muted = false
        if (this.userPaused || document.hidden) {
          audio.pause()
          this.pausedByVisibility = document.hidden && !this.userPaused
          this.set({ playing: false })
          return
        }
        if (audio.paused) audio.play().catch(() => {})
        this.set({ playing: true })
        this.fadeAudio(FILE_VOLUME, FADE_IN)
        // File works: the Web Audio context is not needed, let it sleep.
        this.ctx?.suspend().catch(() => {})
      })
    }

    const timeout = setTimeout(fail, FILE_TIMEOUT_MS)
    audio.addEventListener('error', fail, { once: true })
    audio.src = src
    // play() is called synchronously within the gesture.
    const p = audio.play()
    if (p && typeof p.then === 'function') p.then(ok, fail)
    else audio.addEventListener('playing', ok, { once: true })
  }

  pause = () => {
    this.userPaused = true
    this.pausedByVisibility = false
    this.fadeOutAndStop()
  }

  resume = () => {
    this.userPaused = false
    this.pausedByVisibility = false
    // still waiting for the delayed start? start it now instead
    if (this.pendingStart) {
      const fn = this.pendingStart
      this.pendingStart = null
      clearTimeout(this.delayTimer)
      return fn()
    }
    this.resumeNow(true)
  }

  /** Toggle; if music was never started (e.g. ?skip=1), starts it. */
  toggle = (src) => {
    if (!this.state.started) return this.start(src)
    if (this.state.playing) this.pause()
    else this.resume()
  }

  // ---------- internals ----------
  unlockContext() {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    try {
      // iOS: let Web Audio play even when the ringer switch is on silent.
      if (navigator.audioSession) navigator.audioSession.type = 'playback'
    } catch {
      /* ignore */
    }
    try {
      if (!this.ctx) this.ctx = new AC()
      const ctx = this.ctx
      ctx.resume?.()
      // play one silent sample — required by older iOS to fully unlock
      const b = ctx.createBuffer(1, 1, 22050)
      const s = ctx.createBufferSource()
      s.buffer = b
      s.connect(ctx.destination)
      s.start(0)
    } catch {
      this.ctx = null
    }
  }

  useSynth() {
    const ctx = this.ctx
    if (!ctx) {
      this.set({ source: null, playing: false })
      return
    }
    if (!this.synth) {
      this.synth = createNikkahSynth(ctx)
      this.synth.start()
    }
    this.set({ source: 'synth' })
    if (this.userPaused || document.hidden) {
      this.pausedByVisibility = document.hidden && !this.userPaused
      ctx.suspend().catch(() => {})
      this.set({ playing: false })
      return
    }
    ctx.resume().catch(() => {})
    this.rampSynth(SYNTH_VOLUME, FADE_IN)
    this.set({ playing: true })
  }

  rampSynth(target, seconds) {
    const g = this.synth?.output.gain
    if (!g || !this.ctx) return
    const now = this.ctx.currentTime
    g.cancelScheduledValues(now)
    g.setValueAtTime(g.value, now)
    g.linearRampToValueAtTime(target, now + seconds)
  }

  fadeAudio(target, seconds, done) {
    const audio = this.audio
    cancelAnimationFrame(this.fadeRaf)
    if (!audio) return done?.()
    const from = audio.volume
    const t0 = performance.now()
    const step = (t) => {
      const k = Math.min(1, (t - t0) / (seconds * 1000))
      try {
        audio.volume = from + (target - from) * k
      } catch {
        /* iOS: volume is read-only, ignore */
      }
      if (k < 1) this.fadeRaf = requestAnimationFrame(step)
      else done?.()
    }
    this.fadeRaf = requestAnimationFrame(step)
  }

  fadeOutAndStop() {
    const { source } = this.state
    this.set({ playing: false })
    clearTimeout(this.pauseTimer)
    if (source === 'file' && this.audio) {
      const audio = this.audio
      this.fadeAudio(0, FADE_OUT)
      // timer (not rAF callback) so it still fires on iOS where volume is fixed
      this.pauseTimer = setTimeout(() => {
        if (!this.state.playing) audio.pause()
      }, FADE_OUT * 1000 + 30)
    } else if (source === 'synth' && this.ctx) {
      this.rampSynth(0, FADE_OUT)
      this.pauseTimer = setTimeout(() => {
        if (!this.state.playing) this.ctx.suspend().catch(() => {})
      }, FADE_OUT * 1000 + 30)
    }
  }

  suspendNow() {
    const { source, playing } = this.state
    if (!playing) return
    clearTimeout(this.pauseTimer)
    cancelAnimationFrame(this.fadeRaf)
    if (source === 'file') this.audio?.pause()
    if (source === 'synth') this.ctx?.suspend().catch(() => {})
    this.set({ playing: false })
  }

  resumeNow(fade) {
    const { source } = this.state
    clearTimeout(this.pauseTimer)
    if (source === 'file' && this.audio) {
      const audio = this.audio
      if (audio.ended || audio.currentTime >= 64) {
        audio.currentTime = 0
      }
      if (fade) {
        try {
          audio.volume = 0
        } catch {
          /* ignore */
        }
      }
      const p = audio.play()
      this.set({ playing: true })
      this.fadeAudio(FILE_VOLUME, fade ? 1.2 : 0.6)
      p?.catch?.(() => this.set({ playing: false }))
    } else if (source === 'synth' && this.ctx) {
      this.ctx.resume().catch(() => {})
      this.rampSynth(SYNTH_VOLUME, fade ? 1.2 : 0.6)
      this.set({ playing: true })
    }
  }

  onVisibility = () => {
    if (document.hidden) {
      if (this.state.playing) {
        this.pausedByVisibility = true
        this.suspendNow()
      }
    } else if (this.pausedByVisibility && !this.userPaused) {
      this.pausedByVisibility = false
      this.resumeNow(true)
    }
  }
}

export const music = new MusicEngine()

/** React hook: { started, playing, source, start, toggle, pause, resume } */
export function useMusic() {
  const state = useSyncExternalStore(music.subscribe, music.getState, music.getState)
  return {
    ...state,
    start: music.start,
    toggle: music.toggle,
    pause: music.pause,
    resume: music.resume,
  }
}

export default useMusic
