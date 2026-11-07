// Bride (Safa) — big-head "realistic cartoon": her real face inside a cream
// hijab with a red-dot + gold border, ivory lehenga with gold vines and a red
// hem band.  Inline SVG, viewBox 0 0 120 200 (feet at y≈196).
// Rig (unchanged, used by Intro.css): .intro-arm-l / .intro-arm-r posed via
// `data-a` (pivot at the shoulder), .intro-foot-*, .intro-head (tilt), and
// .intro-hug-arms (only visible with `hug`).

// inlined (data URI) so the face is there on the very first frame — no network wait
import safaFace from '../../assets/safa-face.webp?inline'

const RED = '#a8213b'
const GOLD = '#c9a24f'
const GOLD_SOFT = '#e6c983'
const SLEEVE = '#f3e6cc'
const SKIN = '#f2c3a2'

function Vine({ x, y = 150, h = 32, flip = false }) {
  const s = flip ? -1 : 1
  return (
    <g fill={GOLD} stroke={GOLD} strokeLinecap="round">
      <path d={`M${x} ${y + h} Q${x + 2 * s} ${y + h / 2} ${x} ${y}`} fill="none" strokeWidth=".9" />
      {[0.15, 0.38, 0.6, 0.82].map((t, i) => {
        const yy = y + h * t
        const side = i % 2 ? 1 : -1
        return (
          <ellipse
            key={t}
            cx={x + side * 2.6}
            cy={yy}
            rx="2.6"
            ry="1.1"
            stroke="none"
            transform={`rotate(${side * -35} ${x + side * 2.6} ${yy})`}
            opacity=".85"
          />
        )
      })}
      <circle cx={x} cy={y - 1.2} r="1.4" stroke="none" />
    </g>
  )
}

export default function Bride({ armL = 'rest', armR = 'rest', walking = false, blush = false, hug = false }) {
  const cls = `intro-svg intro-svg-bride${walking ? ' is-walking' : ''}${blush ? ' is-blush' : ''}${hug ? ' is-hug' : ''}`
  return (
    <svg className={cls} viewBox="0 0 120 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ib-cream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf3e2" />
          <stop offset="1" stopColor="#ecd8b0" />
        </linearGradient>
        <radialGradient id="ib-hood" cx=".42" cy=".3" r=".8">
          <stop offset="0" stopColor="#fdf7ea" />
          <stop offset=".7" stopColor="#f1e2c2" />
          <stop offset="1" stopColor="#e3cb9a" />
        </radialGradient>
        <linearGradient id="ib-skirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fcf5e6" />
          <stop offset=".75" stopColor="#f1e1bf" />
          <stop offset="1" stopColor="#e6cf9f" />
        </linearGradient>
        <radialGradient id="ib-skin" cx=".45" cy=".4" r=".65">
          <stop offset="0" stopColor="#f8d4ba" />
          <stop offset="1" stopColor={SKIN} />
        </radialGradient>
      </defs>

      {/* hijab back drape (behind everything) */}
      <path d="M29 96 Q14 128 20 162 Q60 172 100 162 Q106 128 91 96 Z" fill="#e6cfa3" />

      {/* feet (golden juttis) */}
      <g className="intro-foot intro-foot-l">
        <ellipse cx="49" cy="193" rx="8" ry="4.2" fill={GOLD} />
        <ellipse cx="47" cy="191.6" rx="3" ry="1.2" fill="#f3dfae" opacity=".8" />
      </g>
      <g className="intro-foot intro-foot-r">
        <ellipse cx="71" cy="193" rx="8" ry="4.2" fill={GOLD} />
        <ellipse cx="73" cy="191.6" rx="3" ry="1.2" fill="#f3dfae" opacity=".8" />
      </g>

      {/* ---------------- lehenga: ivory, gold vines, red hem band */}
      <path d="M41 130 Q30 162 14 188 Q60 200 106 188 Q90 162 79 130 Z" fill="url(#ib-skirt)" />
      <g fill="none" stroke="#d9bf8e" strokeWidth="1" opacity=".7" strokeLinecap="round">
        <path d="M47 134 Q42 160 31 186" />
        <path d="M73 134 Q78 160 89 186" />
        <path d="M60 136 V193" opacity=".5" />
      </g>
      <Vine x={36} y={153} h={26} />
      <Vine x={60} y={146} h={36} flip />
      <Vine x={84} y={153} h={26} flip />
      {/* hem band */}
      <path d="M17.5 181 Q60 193 102.5 181 L106 188 Q60 200 14 188 Z" fill={RED} />
      <path d="M17.5 181 Q60 193 102.5 181" fill="none" stroke={GOLD} strokeWidth="1.4" />
      <path d="M15.5 186.6 Q60 198.4 104.5 186.6" fill="none" stroke={GOLD_SOFT} strokeWidth="1.5" strokeDasharray="0.1 4" strokeLinecap="round" />

      {/* ---------------- bodice + waist band */}
      <path d="M42 116 Q60 108 78 116 L79 132 Q60 137 41 132 Z" fill="#f4e7cd" />
      <path d="M41 127.5 Q60 132.5 79 127.5 L79 133 Q60 138 41 133 Z" fill={GOLD} />
      <path d="M41.5 130.3 Q60 135.3 78.5 130.3" fill="none" stroke={RED} strokeWidth="1" strokeDasharray="0.1 2.6" strokeLinecap="round" />

      {/* ---------------- dupatta: side panels falling to the knees */}
      <path d="M26 104 Q16 140 22 177 L31.5 174.5 Q28.5 142 34 116 Z" fill="url(#ib-cream)" />
      <path d="M94 104 Q104 140 98 177 L88.5 174.5 Q91.5 142 86 116 Z" fill="url(#ib-cream)" />
      <path d="M24.6 108 Q16.2 140 21 175" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="0.1 3.6" strokeLinecap="round" />
      <path d="M95.4 108 Q103.8 140 99 175" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="0.1 3.6" strokeLinecap="round" />
      <path d="M22 177 L31.5 174.5 M98 177 L88.5 174.5" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />

      {/* dupatta over the shoulders / chest */}
      <path d="M28 95 Q17 112 24 128 Q42 140 60 138.5 Q78 140 96 128 Q103 112 92 95 Z" fill="url(#ib-cream)" />
      <path d="M23.6 117 Q36 133 60 134.6 Q84 133 96.4 117" fill="none" stroke={GOLD} strokeWidth="1.1" />
      <path d="M23.4 121.4 Q35.6 137 60 138.2 Q84.4 137 96.6 121.4" fill="none" stroke={RED} strokeWidth="2.1" strokeDasharray="0.1 3.4" strokeLinecap="round" />
      <path d="M34 104 Q46 118 60 120 Q74 118 86 104" fill="none" stroke="#dcc396" strokeWidth=".9" opacity=".8" />

      {/* ---------------- head: hijab hood + Safa's face */}
      <g className="intro-head">
        <g transform="translate(60 106) scale(0.86) translate(-60 -106)">
          <ellipse cx="60" cy="62" rx="42" ry="50" fill="url(#ib-hood)" />
          {/* soft folds + sheen */}
          <path d="M26 46 Q40 18 70 15" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M24 78 Q26 98 40 108 M96 78 Q94 98 80 108" fill="none" stroke="#d8bd8a" strokeWidth="1" opacity=".7" />
          {/* outer hood border: red dots + gold thread */}
          <ellipse cx="60" cy="62" rx="38.6" ry="46.6" fill="none" stroke={RED} strokeWidth="2.1" strokeDasharray="0.1 4.4" strokeLinecap="round" opacity=".85" />

          {/* the face */}
          <image href={safaFace} x="33" y="24.05" width="54" height="81.6" preserveAspectRatio="xMidYMid meet" />

          {/* face-opening band (covers the photo edge): cream band, red dots, gold line */}
          <ellipse cx="60" cy="66" rx="26.6" ry="40" fill="none" stroke="#f3e5c8" strokeWidth="4.2" />
          <ellipse cx="60" cy="66" rx="28.4" ry="41.8" fill="none" stroke={RED} strokeWidth="2.2" strokeDasharray="0.1 4" strokeLinecap="round" />
          <ellipse cx="60" cy="66" rx="25" ry="38.4" fill="none" stroke={GOLD} strokeWidth=".8" />
          <ellipse cx="60" cy="66" rx="30.6" ry="44" fill="none" stroke={GOLD} strokeWidth=".7" opacity=".7" />
          {/* gold hijab pin */}
          <circle cx="85.5" cy="92" r="2.8" fill={GOLD} />
          <circle cx="85.5" cy="92" r="1.2" fill={RED} />

          {/* (kept for the blush CSS hook; invisible on a real face) */}
          <g className="intro-cheeks" opacity="0" />
        </g>
      </g>

      {/* ---------------- arms: cream sleeves, red + gold cuffs */}
      <g className="intro-arm intro-arm-l" data-a={armL}>
        <path d="M35 118 Q30 134 33 146 L43 146 Q45 134 46 119 Z" fill={SLEEVE} stroke="#e0c897" strokeWidth=".6" />
        <path d="M33.2 141.2 H42.8 V146.4 H33.2 Z" fill={RED} />
        <path d="M33.2 141.2 H42.8 M33.2 146.4 H42.8" stroke={GOLD} strokeWidth="1.1" />
        <circle cx="38" cy="151" r="5" fill="url(#ib-skin)" />
      </g>
      <g className="intro-arm intro-arm-r" data-a={armR}>
        <path d="M85 118 Q90 134 87 146 L77 146 Q75 134 74 119 Z" fill={SLEEVE} stroke="#e0c897" strokeWidth=".6" />
        <path d="M77.2 141.2 H86.8 V146.4 H77.2 Z" fill={RED} />
        <path d="M77.2 141.2 H86.8 M77.2 146.4 H86.8" stroke={GOLD} strokeWidth="1.1" />
        <circle cx="82" cy="151" r="5" fill="url(#ib-skin)" />
      </g>

      {/* legacy embrace arms (only with `hug`; the hug scene itself is HugCouple.jsx) */}
      <g className="intro-hug-arms">
        <path d="M111 119 Q104 146 74 140" fill="none" stroke="#efdcb4" strokeWidth="11" strokeLinecap="round" />
        <ellipse cx="70" cy="139.5" rx="5.6" ry="5" fill="#d08660" />
        <path d="M83 122 C95 112 112 111 130 118" fill="none" stroke={SLEEVE} strokeWidth="10" strokeLinecap="round" />
        <path d="M125.4 111.8 L123.2 121.6" stroke={RED} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="133" cy="118.6" rx="5.4" ry="5" fill="url(#ib-skin)" />
      </g>
    </svg>
  )
}
