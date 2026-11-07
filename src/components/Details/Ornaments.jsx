// Pure-SVG ornaments & icons (gold line-art, Islamic geometry).
import { useId } from 'react'

const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

/** 8-point star (Rub el Hizb style): two overlapping squares + circle. */
export function EightStar({ size = 28, className = '', filled = false }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <g {...stroke} strokeWidth="1.3">
        <rect x="9" y="9" width="22" height="22" fill={filled ? 'currentColor' : 'none'} fillOpacity={filled ? 0.12 : 0} />
        <rect x="9" y="9" width="22" height="22" transform="rotate(45 20 20)" />
        <circle cx="20" cy="20" r="5" />
        <circle cx="20" cy="20" r="1.4" fill="currentColor" />
      </g>
    </svg>
  )
}

/** Horizontal section divider: tapered lines, diamonds and a central star. */
export function Divider({ className = '' }) {
  return (
    <div className={`d-divider ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 28" width="240" height="28">
        <defs>
          <linearGradient id="d-fade-l" x1="0" x2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="d-fade-r" x1="1" x2="0">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line x1="0" y1="14" x2="92" y2="14" stroke="url(#d-fade-l)" strokeWidth="1" />
        <line x1="148" y1="14" x2="240" y2="14" stroke="url(#d-fade-r)" strokeWidth="1" />
        <path d="M86 14l4-4 4 4-4 4z M146 14l4-4 4 4-4 4z" fill="currentColor" transform="translate(-4 0)" />
        <g {...stroke} strokeWidth="1.1" transform="translate(106 0)">
          <rect x="6" y="6" width="16" height="16" />
          <rect x="6" y="6" width="16" height="16" transform="rotate(45 14 14)" />
          <circle cx="14" cy="14" r="2" fill="currentColor" />
        </g>
      </svg>
    </div>
  )
}

/** Gold Islamic arch frame (stretches to its container). */
export function ArchFrame({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 300 440" preserveAspectRatio="none" aria-hidden="true">
      <g {...stroke} vectorEffect="non-scaling-stroke">
        <path
          d="M8 440 V176 C8 104 70 52 150 8 C230 52 292 104 292 176 V440"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M22 440 V182 C22 116 80 70 150 26 C220 70 278 116 278 182 V440"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}

/** Arch-shaped monogram avatar with an initial (or a photo, if provided). */
export function Monogram({ letter = '', photo, alt = '', tone = 'emerald' }) {
  const id = `d-mono-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <div className={`d-mono d-mono--${tone}`}>
      <svg viewBox="0 0 160 200" className="d-mono__svg" aria-hidden={photo ? 'true' : undefined} role={photo ? undefined : 'img'} aria-label={photo ? undefined : alt}>
        <defs>
          <clipPath id={`${id}-clip`}>
            <path d="M14 196 V84 C14 46 44 20 80 8 C116 20 146 46 146 84 V196 Z" />
          </clipPath>
          <radialGradient id={`${id}-bg`} cx="50%" cy="30%" r="80%">
            <stop offset="0" stopColor={tone === 'rose' ? '#f6dfe0' : '#1d5a5a'} />
            <stop offset="1" stopColor={tone === 'rose' ? '#e8b4b8' : '#0a2a2b'} />
          </radialGradient>
        </defs>
        <path d="M14 196 V84 C14 46 44 20 80 8 C116 20 146 46 146 84 V196 Z" fill={`url(#${id}-bg)`} />
        {photo ? (
          <image href={photo} x="0" y="0" width="160" height="200" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id}-clip)`} />
        ) : (
          <>
            {/* subtle geometric lattice */}
            <g clipPath={`url(#${id}-clip)`} opacity="0.18" stroke="#d4af6a" strokeWidth="0.6" fill="none">
              {[0, 1, 2, 3, 4].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <g key={`${r}-${c}`} transform={`translate(${c * 44 - 4} ${r * 44 + 10})`}>
                    <rect x="8" y="8" width="20" height="20" />
                    <rect x="8" y="8" width="20" height="20" transform="rotate(45 18 18)" />
                  </g>
                ))
              )}
            </g>
            <text
              x="80"
              y="138"
              textAnchor="middle"
              className="d-mono__letter"
              fill={tone === 'rose' ? '#8f4a53' : '#e9d5a6'}
            >
              {letter}
            </text>
          </>
        )}
        <path d="M14 196 V84 C14 46 44 20 80 8 C116 20 146 46 146 84 V196" fill="none" stroke="#d4af6a" strokeWidth="2" />
        <path d="M5 199 V82 C5 40 38 12 80 -1 C122 12 155 40 155 82 V199" fill="none" stroke="#d4af6a" strokeWidth="0.8" strokeOpacity="0.7" />
        <g transform="translate(70 -3)" fill="none" stroke="#d4af6a" strokeWidth="1">
          <rect x="5" y="5" width="10" height="10" fill="#fbf6ec" />
          <rect x="5" y="5" width="10" height="10" transform="rotate(45 10 10)" />
        </g>
      </svg>
    </div>
  )
}

/** Two interlocking rings with a small heart — used between bride & groom. */
export function Rings({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g {...stroke} strokeWidth="1.6">
        <circle cx="25" cy="36" r="13" />
        <circle cx="39" cy="36" r="13" />
        <path d="M19 18l3-5h6l3 5-6 5z M19 18h12" strokeWidth="1.2" />
      </g>
      <path d="M44 9.5c-1.2-1.8-3.8-1.2-3.8.8 0 1.5 2.3 2.9 3.8 4.1 1.5-1.2 3.8-2.6 3.8-4.1 0-2-2.6-2.6-3.8-.8z" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

/** Small decorative crescent + star. */
export function Crescent({ size = 34, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M26 6a14 14 0 1 0 8 25A12 12 0 1 1 26 6z" fill="currentColor" />
      <path d="M31 12l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3z" fill="currentColor" />
    </svg>
  )
}

/* ---------------- Icons (24px line) ---------------- */
const Icon = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth="1.6">
    {children}
  </svg>
)

export const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Icon>
)
export const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
)
export const IconPin = (p) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </Icon>
)
export const IconNav = (p) => (
  <Icon {...p}>
    <path d="M20.5 3.5L3.5 10.6l7 2.4 2.4 7z" />
  </Icon>
)
export const IconCalPlus = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5" />
  </Icon>
)
export const IconPhone = (p) => (
  <Icon {...p}>
    <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
  </Icon>
)
export const IconWhatsApp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3z"
    />
  </svg>
)
export const IconHeart = (p) => (
  <Icon {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
  </Icon>
)
