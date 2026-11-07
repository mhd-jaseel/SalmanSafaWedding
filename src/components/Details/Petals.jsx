// Floating petals & sparkles — CSS-animated, deterministic layout (no randomness on render).

const PETALS = [
  { l: 6, d: 0, t: 14, s: 1 },
  { l: 18, d: 4, t: 17, s: 0.8 },
  { l: 31, d: 8, t: 15, s: 1.1 },
  { l: 47, d: 2, t: 19, s: 0.7 },
  { l: 62, d: 6, t: 16, s: 0.95 },
  { l: 76, d: 10, t: 18, s: 0.85 },
  { l: 89, d: 3, t: 15, s: 1 },
]

const SPARKS = [
  { l: 12, t: 22, d: 0 },
  { l: 84, t: 18, d: 1.2 },
  { l: 22, t: 64, d: 2.1 },
  { l: 78, t: 58, d: 0.6 },
  { l: 50, t: 10, d: 1.7 },
  { l: 64, t: 80, d: 2.6 },
  { l: 36, t: 86, d: 0.9 },
]

export default function Petals() {
  return (
    <div className="d-petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={`p${i}`}
          className={`d-petal ${i % 3 === 0 ? 'd-petal--gold' : ''}`}
          style={{
            left: `${p.l}%`,
            animationDelay: `${p.d}s`,
            animationDuration: `${p.t}s`,
            '--s': p.s,
          }}
        />
      ))}
      {SPARKS.map((s, i) => (
        <span
          key={`s${i}`}
          className="d-spark"
          style={{ left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.d}s` }}
        />
      ))}
    </div>
  )
}
