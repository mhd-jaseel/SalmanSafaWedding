// Static SVG art for the intro stage (frame arch, lanterns, rope tassel, hearts).

// Gradients shared by several small SVGs (rendered once, zero-size).
export function SharedDefs() {
  return (
    <svg className="intro-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ii-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9c7330" />
          <stop offset=".5" stopColor="#f3d999" />
          <stop offset="1" stopColor="#9c7330" />
        </linearGradient>
        <radialGradient id="ii-lamp" cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#fff6d6" />
          <stop offset=".55" stopColor="#f2c66a" />
          <stop offset="1" stopColor="#b9792a" />
        </radialGradient>
        <linearGradient id="ii-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b2e2f" />
          <stop offset="1" stopColor="#0f3d3e" />
        </linearGradient>
        <linearGradient id="ii-tassel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a87b31" />
          <stop offset=".45" stopColor="#f5dc9e" />
          <stop offset="1" stopColor="#a87b31" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const ARCH = 'M8 140 V72 C8 46 36 38 50 26 C64 38 92 46 92 72 V140'

// Proscenium: emerald wall with a mehrab-shaped opening, gold outlines.
// viewBox is stretched (preserveAspectRatio="none"); strokes stay crisp.
export function ArchFrame() {
  return (
    <svg className="intro-frame" viewBox="0 0 100 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={`M0 0 H100 V140 H0 Z ${ARCH} Z`} fill="url(#ii-frame)" fillRule="evenodd" />
      <g fill="none" vectorEffect="non-scaling-stroke">
        <path d="M5 140 V71 C5 43 34 34 50 21 C66 34 95 43 95 71 V140" stroke="#d4af6a" strokeOpacity=".45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={ARCH} stroke="#d4af6a" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
        <path d="M10.5 140 V73 C10.5 49 37.5 41 50 30 C62.5 41 89.5 49 89.5 73 V140" stroke="#e9d5a6" strokeOpacity=".55" strokeWidth="1" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
      </g>
      {/* spandrel rosettes */}
      <g fill="#d4af6a" opacity=".55">
        <circle cx="12" cy="18" r="1.6" />
        <circle cx="88" cy="18" r="1.6" />
        <circle cx="21" cy="30" r="1" />
        <circle cx="79" cy="30" r="1" />
        <circle cx="5" cy="40" r=".9" />
        <circle cx="95" cy="40" r=".9" />
      </g>
    </svg>
  )
}

// Smaller glowing mehrab drawn on the revealed back wall.
export function InnerArch() {
  return (
    <svg className="intro-inner-arch" viewBox="0 0 100 140" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M22 140 V84 C22 62 40 52 50 40 C60 52 78 62 78 84 V140" fill="rgba(255,240,205,.07)" stroke="#e9d5a6" strokeOpacity=".7" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <path d="M27 140 V86 C27 67 42 58 50 48 C58 58 73 67 73 86 V140" fill="none" stroke="#d4af6a" strokeOpacity=".45" strokeWidth="1" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// Fanoos lantern (hook at the top, viewBox 40x84).
export function Lantern() {
  return (
    <svg className="intro-lantern-svg" viewBox="0 0 40 84" aria-hidden="true" focusable="false">
      <circle cx="20" cy="4" r="3" fill="none" stroke="url(#ii-metal)" strokeWidth="1.6" />
      <path d="M20 7 V11" stroke="#c9a24f" strokeWidth="1.6" />
      <path d="M10 22 Q11 12 20 10 Q29 12 30 22 Z" fill="url(#ii-metal)" />
      <rect x="7.5" y="21" width="25" height="3.4" rx="1.2" fill="url(#ii-metal)" />
      <path d="M10 24.4 H30 L33 45 L28 60 H12 L7 45 Z" fill="url(#ii-lamp)" />
      <path d="M16 44 Q16 36 20 32 Q24 36 24 44 V54 H16 Z" fill="#fffaf0" opacity=".75" />
      <path d="M20 24.4 V32 M10 24.4 L7 45 L12 60 M30 24.4 L33 45 L28 60 M7 45 H33" fill="none" stroke="#8a6326" strokeWidth="1.2" />
      <path d="M12 60 H28 L24 66 H16 Z" fill="url(#ii-metal)" />
      <circle cx="20" cy="69" r="2.4" fill="#d4af6a" />
      <path d="M20 71 V81" stroke="#c97b84" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

// Rope tassel; the grip knot sits ~17% from the top (viewBox 24x60).
export function Tassel() {
  return (
    <svg className="intro-tassel" viewBox="0 0 24 60" aria-hidden="true" focusable="false">
      <circle cx="12" cy="10" r="4.4" fill="url(#ii-tassel)" />
      <path d="M5 21 Q5 13 12 13 Q19 13 19 21 Z" fill="url(#ii-tassel)" />
      <rect x="4" y="20" width="16" height="3.6" rx="1.4" fill="#c97b84" />
      <path d="M4.5 23.6 H19.5 L22 54 Q12 59 2 54 Z" fill="url(#ii-tassel)" />
      <path d="M7 26 L5.5 53 M10 26 L9.5 55 M14 26 L14.5 55 M17 26 L18.5 53" stroke="#9c7330" strokeOpacity=".55" strokeWidth=".9" />
    </svg>
  )
}

export function HeartIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 22" aria-hidden="true" focusable="false">
      <path d="M12 21 C5 15.6 1 12 1 7 C1 3.6 3.6 1 6.8 1 C9 1 10.9 2.2 12 4 C13.1 2.2 15 1 17.2 1 C20.4 1 23 3.6 23 7 C23 12 19 15.6 12 21 Z" fill="currentColor" />
      <ellipse cx="7" cy="6.4" rx="2.4" ry="1.6" fill="#fff" opacity=".45" />
    </svg>
  )
}
