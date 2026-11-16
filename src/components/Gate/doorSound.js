// Door-opening sound for the Gate.
//
// 1. If a real recording is configured (wedding.doorSound, e.g.
//    '/sfx/door-open.mp3'), it is downloaded behind the loader and played.
// 2. Otherwise a realistic sound is synthesized — no bells or beeps:
//      • metal latch / bolt clack (resonant metal partials)
//      • two old wooden doors creaking on their hinges (stick-slip friction
//        pulses through wood-body resonances), one per side, panned L / R
//      • low rumble of heavy doors moving air
//      • a soft bump as they swing fully open
//    all sent through a generated hall reverb.
// Timed to the gate animation (doors open over ~1.3 s) and finished before
// the music starts.  Must be called inside the tap (unlocked AudioContext).

let recorded = null // ArrayBuffer of the recording (from preload)
let decoded = null // AudioBuffer once decoded

/** Called by the preloader with the downloaded recording. */
export const setDoorRecording = (arrayBuffer) => {
  recorded = arrayBuffer
}

const rand = (a, b) => a + Math.random() * (b - a)

// Buffers are built ahead of time (prepareDoorSound, called after the loader)
// so the tap itself only schedules playback — no heavy work in the gesture.
const SR = 44100
const cache = {}
function makeBuf(ctx, channels, len, sampleRate = SR) {
  try {
    return new AudioBuffer({ numberOfChannels: channels, length: len, sampleRate })
  } catch {
    return ctx ? ctx.createBuffer(channels, len, sampleRate) : null // very old Safari
  }
}
const cached = (key, build) => cache[key] || (cache[key] = build())

function noise(ctx, seconds, brown = false) {
  const len = Math.floor(SR * seconds)
  const buf = makeBuf(ctx, 1, len)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1
    if (brown) {
      last = (last + 0.02 * w) / 1.02
      d[i] = last * 3.5
    } else d[i] = w
  }
  return buf
}

// Hall impulse response: decaying stereo noise with early reflections.
// NOTE: a ConvolverNode only accepts a buffer at the context's own sample
// rate, so this one is built per rate (most phones run at 48 kHz).
function hall(ctx, sr, seconds = 1.8) {
  const len = Math.floor(sr * seconds)
  const buf = makeBuf(ctx, 2, len, sr)
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c)
    for (let i = 0; i < len; i++) {
      const t = i / sr
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t / seconds, 2.6) * Math.exp(-t * 2.2)
    }
    // a few early reflections off stone walls
    ;[0.011, 0.023, 0.037, 0.052].forEach((t, k) => {
      d[Math.floor((t + c * 0.003) * sr)] += 0.6 / (k + 1)
    })
  }
  return buf
}

/**
 * Hinge creak: friction "stick-slip" pulses whose rate wanders like a real
 * hinge under load.  `rate(t)` gives the pulse rate in Hz over the creak.
 */
function creakBuffer(ctx, seconds, rate, env) {
  const sr = SR
  const len = Math.floor(sr * seconds)
  const buf = makeBuf(ctx, 1, len)
  const d = buf.getChannelData(0)
  let phase = 0
  let wobble = 0
  for (let i = 0; i < len; i++) {
    const t = i / sr
    wobble += (Math.random() - 0.5) * 0.002
    wobble *= 0.9995
    phase += (rate(t / seconds) * (1 + wobble * 8)) / sr
    const e = env(t / seconds)
    if (phase >= 1) {
      phase -= Math.floor(phase)
      // a short, slightly irregular slip impulse
      const a = e * rand(0.55, 1)
      for (let k = 0; k < 18 && i + k < len; k++) d[i + k] += a * Math.exp(-k / 3.2) * (k % 2 ? -0.6 : 1)
    }
    d[i] += (Math.random() * 2 - 1) * 0.035 * e // wood grit
  }
  return buf
}

function woodCreak(ctx, dest, at, { key, seconds, rate, env, pan, body }) {
  const src = ctx.createBufferSource()
  src.buffer = cached(key, () => creakBuffer(ctx, seconds, rate, env))
  const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null
  if (p) p.pan.value = pan
  const mix = ctx.createGain()
  mix.gain.value = 0.9
  // wood body resonances give the creak its "old door" voice
  body.forEach(([f, q, g]) => {
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = f
    bp.Q.value = q
    const bg = ctx.createGain()
    bg.gain.value = g
    src.connect(bp).connect(bg).connect(mix)
  })
  const hp = ctx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 180
  mix.connect(hp)
  if (p) hp.connect(p).connect(dest)
  else hp.connect(dest)
  src.start(at)
  src.stop(at + seconds + 0.05)
}

const creakEnv = (x) => Math.min(1, x / 0.12) * Math.pow(1 - x, 0.6) * (0.75 + 0.25 * Math.sin(x * 19))
const CREAK_L = {
  key: 'creakL',
  seconds: 1.0,
  pan: -0.45,
  rate: (x) => 38 + 60 * Math.sin(Math.PI * Math.min(1, x * 1.15)) + 18 * x,
  env: creakEnv,
  body: [
    [420, 7, 1],
    [880, 9, 0.8],
    [1640, 11, 0.45],
  ],
}
const CREAK_R = {
  key: 'creakR',
  seconds: 0.95,
  pan: 0.45,
  rate: (x) => 52 + 46 * Math.sin(Math.PI * Math.min(1, x * 1.05)) - 12 * x,
  env: creakEnv,
  body: [
    [470, 7, 1],
    [960, 9, 0.75],
    [1820, 12, 0.4],
  ],
}

/** Build all synthesized buffers ahead of time (call when the page is idle). */
export function prepareDoorSound(sampleRate = 48000) {
  if (recorded) return
  try {
    cached(`hall@${sampleRate}`, () => hall(null, sampleRate))
    cached('click', () => noise(null, 0.08))
    cached('air', () => noise(null, 1.4, true))
    cached('bump', () => noise(null, 0.25))
    ;[CREAK_L, CREAK_R].forEach((c) => cached(c.key, () => creakBuffer(null, c.seconds, c.rate, c.env)))
  } catch {
    /* built on demand at tap time instead */
  }
}

function synthesize(ctx, out) {
  const t = ctx.currentTime + 0.02

  // dry path + hall reverb (the reverb is optional: if it can't be set up,
  // the door still sounds, just without the room)
  const bus = ctx.createGain()
  const dry = ctx.createGain()
  dry.gain.value = 0.9
  bus.connect(dry).connect(out)
  try {
    const sr = ctx.sampleRate
    const verb = ctx.createConvolver()
    verb.buffer = cached(`hall@${sr}`, () => hall(ctx, sr))
    const wet = ctx.createGain()
    wet.gain.value = 0.4
    bus.connect(verb)
    verb.connect(wet).connect(out)
  } catch {
    /* no reverb */
  }

  // 1. latch: lift + bolt release (two metallic clacks)
  ;[
    [0, 0.5],
    [0.07, 0.34],
  ].forEach(([dt, amp]) => {
    const s = ctx.createBufferSource()
    s.buffer = cached('click', () => noise(ctx, 0.08))
    const g = ctx.createGain()
    g.gain.setValueAtTime(amp, t + dt)
    g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.07)
    ;[
      [1850, 14, 0.9],
      [3120, 18, 0.7],
      [4870, 22, 0.5],
      [760, 6, 0.6],
    ].forEach(([f, q, gg]) => {
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = f * rand(0.97, 1.03)
      bp.Q.value = q
      const bg = ctx.createGain()
      bg.gain.value = gg * 2.2
      s.connect(bp).connect(bg).connect(g)
    })
    g.connect(bus)
    s.start(t + dt)
    s.stop(t + dt + 0.09)
  })

  // 2. the two doors creaking open (left a touch before right)
  woodCreak(ctx, bus, t + 0.13, CREAK_L)
  woodCreak(ctx, bus, t + 0.21, CREAK_R)

  // 3. heavy doors moving air
  const air = ctx.createBufferSource()
  air.buffer = cached('air', () => noise(ctx, 1.4, true))
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(180, t + 0.1)
  lp.frequency.linearRampToValueAtTime(520, t + 0.9)
  const ag = ctx.createGain()
  ag.gain.setValueAtTime(0.0001, t + 0.1)
  ag.gain.exponentialRampToValueAtTime(0.5, t + 0.6)
  ag.gain.exponentialRampToValueAtTime(0.001, t + 1.35)
  air.connect(lp).connect(ag).connect(bus)
  air.start(t + 0.1)
  air.stop(t + 1.45)

  // 4. soft wooden bump as the doors reach the wall
  const bump = ctx.createBufferSource()
  bump.buffer = cached('bump', () => noise(ctx, 0.25))
  const blp = ctx.createBiquadFilter()
  blp.type = 'lowpass'
  blp.frequency.value = 320
  const bg = ctx.createGain()
  const tb = t + 1.18
  bg.gain.setValueAtTime(0.0001, tb)
  bg.gain.exponentialRampToValueAtTime(0.9, tb + 0.008)
  bg.gain.exponentialRampToValueAtTime(0.001, tb + 0.22)
  bump.connect(blp).connect(bg).connect(bus)
  bump.start(tb)
  bump.stop(tb + 0.25)
}

export function playDoorOpen(ctx) {
  if (!ctx) return
  try {
    ctx.resume?.()
    // loud and clear, but a compressor keeps the peaks from clipping
    const out = ctx.createGain()
    out.gain.value = 3.2
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -14
    comp.knee.value = 8
    comp.ratio.value = 6
    comp.attack.value = 0.003
    comp.release.value = 0.2
    out.connect(comp).connect(ctx.destination)
    const cleanup = () =>
      setTimeout(() => {
        out.disconnect()
        comp.disconnect()
      }, 3500)

    if (recorded || decoded) {
      const play = (buf) => {
        out.gain.value = 1 // a real recording plays at its own level
        const s = ctx.createBufferSource()
        s.buffer = buf
        s.connect(out)
        s.start()
        cleanup()
      }
      if (decoded) return play(decoded)
      // decodeAudioData detaches its input, so hand it a copy
      ctx
        .decodeAudioData(recorded.slice(0))
        .then((buf) => {
          decoded = buf
          play(buf)
        })
        .catch(() => {
          synthesize(ctx, out)
          cleanup()
        })
      return
    }
    synthesize(ctx, out)
    cleanup()
  } catch {
    /* sound is a nice-to-have; never break the tap */
  }
}
