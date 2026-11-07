// inlined (data URI) so the face is there on the very first frame — no network wait
import salmanFace from '../../assets/salman-face.webp?inline'

// Chibi groom — inline SVG, viewBox 0 0 120 200 (feet at y≈196).
// Same arm rig as the bride: .intro-arm-l / .intro-arm-r posed via `data-a`.
// Legs (.intro-leg-*) swing while walking.

export default function Groom({ armL = 'rest', armR = 'rest', walking = false, blush = false, hug = false, ...svgProps }) {
  const cls = `intro-svg intro-svg-groom${walking ? ' is-walking' : ''}${blush ? ' is-blush' : ''}${hug ? ' is-hug' : ''}`
  return (
    <svg className={cls} viewBox="0 0 120 200" aria-hidden="true" focusable="false" {...svgProps}>
      <defs>
        <linearGradient id="ig-sher" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#e8d3a4" />
        </linearGradient>
        <linearGradient id="ig-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdf6e6" />
          <stop offset="1" stopColor="#e2c58a" />
        </linearGradient>
        <radialGradient id="ig-skin" cx=".5" cy=".4" r=".65">
          <stop offset="0" stopColor="#e6a67e" />
          <stop offset="1" stopColor="#d08660" />
        </radialGradient>
        <linearGradient id="ig-neck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8f4c2e" />
          <stop offset=".45" stopColor="#c47a55" />
          <stop offset="1" stopColor="#d08660" />
        </linearGradient>
      </defs>

      {/* legs (churidar) + mojari shoes */}
      <g className="intro-leg intro-leg-l">
        <rect x="45" y="168" width="11" height="24" rx="4" fill="#f4ead6" />
        <path d="M41 193 Q41 188.5 49 188.5 Q57 188.5 57 192.5 Q57 196.5 49 196.5 Q43 196.5 39 194 Q38 191.5 41 193 Z" fill="#b8863b" />
      </g>
      <g className="intro-leg intro-leg-r">
        <rect x="64" y="168" width="11" height="24" rx="4" fill="#f4ead6" />
        <path d="M79 193 Q79 188.5 71 188.5 Q63 188.5 63 192.5 Q63 196.5 71 196.5 Q77 196.5 81 194 Q82 191.5 79 193 Z" fill="#b8863b" />
      </g>

      {/* neck (behind the head; its base is hidden by the collar drawn after the head) */}
      <path d="M50.5 92 L69.5 92 L70.5 114 Q60 117 49.5 114 Z" fill="url(#ig-neck)" />

      {/* sherwani */}
      <path d="M37 116 Q60 108 83 116 L88 174 Q60 181 32 174 Z" fill="url(#ig-sher)" />
      <path d="M83 116 L88 174 Q80 176.5 72 177.5 Q79 150 76 117 Z" fill="#c9a24f" opacity=".14" />
      <path d="M33 170 Q60 177 87 170" fill="none" stroke="#d4af6a" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 119 V176" stroke="#d4af6a" strokeWidth="1.4" />
      <g fill="#c9a24f">
        <circle cx="60" cy="126" r="1.9" />
        <circle cx="60" cy="135" r="1.9" />
        <circle cx="60" cy="144" r="1.9" />
        <circle cx="60" cy="153" r="1.9" />
        <circle cx="60" cy="162" r="1.9" />
      </g>
      {/* rose stole over the shoulder */}
      <path d="M38 117 L47 113 L87 162 L82 171 Z" fill="#c97b84" />
      <path d="M38 117 L82 171 M47 113 L87 162" stroke="#d4af6a" strokeWidth="1" />
      {/* head — Salman's face (cut out from his cartoon portrait), big-head cartoon style.
          Chin sits at y≈104 on top of the neck; the collar below tucks the neck in. */}
      <g className="intro-head">
        <image href={salmanFace} x="22" y="19.6" width="76" height="91.1" preserveAspectRatio="xMidYMid meet" />
      </g>

      {/* sherwani band collar — drawn OVER the neck + chin edge so the head sits inside the dress */}
      <path d="M46 106 Q60 113.5 74 106 L75.5 115.5 Q60 123.5 44.5 115.5 Z" fill="url(#ig-sher)" />
      <path d="M46 106 Q60 113.5 74 106" fill="none" stroke="#d4af6a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M45 115.6 Q60 123.6 75 115.6" fill="none" stroke="#d4af6a" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M60 113.6 V122.5" stroke="#c9a24f" strokeWidth="1.3" />
      <ellipse cx="60" cy="110.2" rx="11" ry="2.2" fill="#000" opacity=".16" />

      {/* arms */}
      <g className="intro-arm intro-arm-l" data-a={armL}>
        <path d="M35 118 Q30 134 33 148 L43 148 Q45 134 46 119 Z" fill="url(#ig-sher)" />
        <path d="M33.2 145 H42.8" stroke="#d4af6a" strokeWidth="3" />
        <circle cx="38" cy="152" r="5" fill="url(#ig-skin)" />
      </g>
      <g className="intro-arm intro-arm-r" data-a={armR}>
        <path d="M85 118 Q90 134 87 148 L77 148 Q75 134 74 119 Z" fill="url(#ig-sher)" />
        <path d="M77.2 145 H86.8" stroke="#d4af6a" strokeWidth="3" />
        <circle cx="82" cy="152" r="5" fill="url(#ig-skin)" />
      </g>
    </svg>
  )
}
