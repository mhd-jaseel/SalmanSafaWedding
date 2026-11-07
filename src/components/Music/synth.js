// ------------------------------------------------------------------
//  Fallback music: a soft, looping, maqam-Hijaz flavoured melody
//  built entirely with the Web Audio API (no files needed).
//  oud-like plucks + warm drone + very light daf percussion + reverb.
// ------------------------------------------------------------------

const ROOT = 293.66 // D4
const hz = (semi) => ROOT * Math.pow(2, semi / 12)

// Hijaz on D: D Eb F# G A Bb C D  -> semitones 0 1 4 5 7 8 10 12
// Each phrase = [semitone | null (rest), length in eighth-notes], 16 eighths.
const PHRASES = [
  [[7, 2], [8, 1], [7, 1], [5, 2], [4, 2], [5, 1], [4, 1], [1, 2], [0, 4]],
  [[0, 1], [1, 1], [4, 2], [5, 2], [7, 2], [8, 2], [7, 1], [5, 1], [7, 4]],
  [[12, 2], [10, 1], [8, 1], [7, 2], [8, 1], [10, 1], [8, 2], [7, 2], [5, 4]],
  [[4, 2], [5, 1], [4, 1], [1, 2], [4, 2], [1, 1], [0, 1], [-2, 2], [0, 4]],
]
const MELODY = PHRASES.flat()

// Maqsum-like pattern over one bar of 8 eighths: D T . T D . T .
const DAF = ['D', 'T', null, 't', 'd', null, 'T', null]

const EIGHTH = 0.34 // seconds (gentle tempo)
const LOOKAHEAD = 0.6
const TICK_MS = 120

function makeImpulse(ctx, seconds = 2.6, decay = 3) {
  const rate = ctx.sampleRate
  const len = Math.floor(rate * seconds)
  const buf = ctx.createBuffer(2, len, rate)
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c)
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay)
    }
  }
  return buf
}

function makeNoise(ctx, seconds = 0.5) {
  const len = Math.floor(ctx.sampleRate * seconds)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  return buf
}

/**
 * Creates the synth graph on an existing (already resumed) AudioContext.
 * Returns { start(), stop(), output } where output is a GainNode -> destination.
 */
export function createNikkahSynth(ctx) {
  const output = ctx.createGain()
  output.gain.value = 0
  output.connect(ctx.destination)

  // Gentle compressor so nothing ever spikes
  const comp = ctx.createDynamicsCompressor()
  comp.threshold.value = -20
  comp.ratio.value = 3
  comp.connect(output)

  const dry = ctx.createGain()
  dry.gain.value = 0.8
  dry.connect(comp)

  const reverb = ctx.createConvolver()
  reverb.buffer = makeImpulse(ctx)
  const wet = ctx.createGain()
  wet.gain.value = 0.45
  reverb.connect(wet).connect(comp)

  const bus = ctx.createGain() // everything musical goes here
  bus.connect(dry)
  bus.connect(reverb)

  const noise = makeNoise(ctx)

  // ---------- Drone (D2 + A2), slowly breathing ----------
  const droneGain = ctx.createGain()
  droneGain.gain.value = 0.05
  const droneFilter = ctx.createBiquadFilter()
  droneFilter.type = 'lowpass'
  droneFilter.frequency.value = 420
  droneFilter.connect(droneGain).connect(bus)
  const droneOscs = [
    [hz(-24), 'sawtooth', 0.35],
    [hz(-24) * 1.003, 'sine', 0.8],
    [hz(-17), 'sine', 0.5],
  ].map(([f, type, g]) => {
    const o = ctx.createOscillator()
    o.type = type
    o.frequency.value = f
    const gg = ctx.createGain()
    gg.gain.value = g
    o.connect(gg).connect(droneFilter)
    return o
  })
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.08
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 0.02
  lfo.connect(lfoGain).connect(droneGain.gain)

  // ---------- Oud-like pluck ----------
  function pluck(freq, t, dur, vel = 1) {
    const g = ctx.createGain()
    const f = ctx.createBiquadFilter()
    f.type = 'lowpass'
    f.Q.value = 2
    f.frequency.setValueAtTime(freq * 7, t)
    f.frequency.exponentialRampToValueAtTime(freq * 1.6, t + 0.35)
    const peak = 0.16 * vel
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(peak, t + 0.008)
    g.gain.exponentialRampToValueAtTime(peak * 0.35, t + 0.18)
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.5, dur * 1.4))
    f.connect(g).connect(bus)

    const end = t + Math.max(0.6, dur * 1.5)
    ;[
      ['triangle', 1, 1],
      ['sawtooth', 1.002, 0.25],
      ['sine', 2, 0.18],
    ].forEach(([type, mul, amp]) => {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.setValueAtTime(freq * mul * 1.012, t) // tiny pitch "snap"
      o.frequency.exponentialRampToValueAtTime(freq * mul, t + 0.05)
      const og = ctx.createGain()
      og.gain.value = amp
      o.connect(og).connect(f)
      o.start(t)
      o.stop(end)
    })
  }

  // ---------- Daf ----------
  function daf(kind, t) {
    if (kind === 'D' || kind === 'd') {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(130, t)
      o.frequency.exponentialRampToValueAtTime(55, t + 0.25)
      const v = kind === 'D' ? 0.32 : 0.18
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(v, t + 0.006)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
      o.connect(g).connect(dry)
      o.start(t)
      o.stop(t + 0.45)
    }
    // jingles / skin slap
    const s = ctx.createBufferSource()
    s.buffer = noise
    const bp = ctx.createBiquadFilter()
    bp.type = kind === 'D' || kind === 'd' ? 'bandpass' : 'highpass'
    bp.frequency.value = kind === 'D' || kind === 'd' ? 900 : 4500
    const g = ctx.createGain()
    const v = { D: 0.05, d: 0.03, T: 0.06, t: 0.03 }[kind]
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(v, t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + (kind === 'T' ? 0.14 : 0.09))
    s.connect(bp).connect(g).connect(bus)
    s.start(t)
    s.stop(t + 0.2)
  }

  // ---------- Scheduler ----------
  let timer = null
  let started = false
  let noteIdx = 0
  let nextNote = 0
  let nextBeat = 0
  let beatIdx = 0
  let loops = 0

  function schedule() {
    const horizon = ctx.currentTime + LOOKAHEAD
    while (nextNote < horizon) {
      const [semi, len] = MELODY[noteIdx]
      const dur = len * EIGHTH
      if (semi !== null) {
        const vel = 0.8 + Math.random() * 0.2
        pluck(hz(semi), nextNote, dur, vel)
        // oud tremolo ornament on long notes
        if (len >= 4) pluck(hz(semi), nextNote + dur * 0.5, dur * 0.5, vel * 0.45)
      }
      nextNote += dur
      noteIdx = (noteIdx + 1) % MELODY.length
      if (noteIdx === 0) loops++
    }
    while (nextBeat < horizon) {
      // percussion enters after the first phrase, rests every 4th loop
      const k = DAF[beatIdx % DAF.length]
      if (k && beatIdx >= 16 && loops % 4 !== 3) daf(k, nextBeat)
      nextBeat += EIGHTH
      beatIdx++
    }
  }

  return {
    output,
    start() {
      if (started) return
      started = true
      const t = ctx.currentTime + 0.1
      droneOscs.forEach((o) => o.start(t))
      lfo.start(t)
      nextNote = t + 1.2 // let the drone breathe in first
      nextBeat = nextNote
      schedule()
      timer = setInterval(schedule, TICK_MS)
    },
    stop() {
      clearInterval(timer)
      timer = null
      try {
        droneOscs.forEach((o) => o.stop())
        lfo.stop()
      } catch {
        /* already stopped */
      }
      output.disconnect()
    },
  }
}
