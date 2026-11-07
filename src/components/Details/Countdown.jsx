import { useEffect, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')

function diff(target) {
  const ms = target - Date.now()
  if (!(ms > 0)) return null
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

export default function Countdown({ dateISO }) {
  const target = new Date(dateISO).getTime()
  const valid = Number.isFinite(target)
  const [left, setLeft] = useState(() => (valid ? diff(target) : null))

  useEffect(() => {
    if (!valid) return undefined
    setLeft(diff(target))
    const id = setInterval(() => {
      const d = diff(target)
      setLeft(d)
      if (!d) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [target, valid])

  if (!valid) return null

  if (!left) {
    return (
      <p className="d-countdown__done" role="status">
        Alhamdulillah, today is the day!
      </p>
    )
  }

  const tiles = [
    ['Days', left.days],
    ['Hours', left.hours],
    ['Minutes', left.minutes],
    ['Seconds', left.seconds],
  ]

  return (
    <div className="d-countdown" role="timer" aria-live="off">
      {tiles.map(([label, value]) => (
        <div className="d-countdown__tile" key={label}>
          <span className="d-countdown__num">{label === 'Days' ? value : pad(value)}</span>
          <span className="d-countdown__label">{label}</span>
        </div>
      ))}
    </div>
  )
}
