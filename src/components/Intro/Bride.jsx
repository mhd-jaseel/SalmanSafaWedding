// Bride (Safa) — big-head "realistic cartoon": her real face under a simple
// Kerala-style cream thattam (light shawl round the head and neck, gold border + red dots), maroon-red
// bridal lehenga with gold butas and a heavy scalloped gold hem, Kerala gold
// oddiyanam (waist belt) + layered gold necklaces, hennaed hands with bangles.
// Matches the back view in HugCouple.jsx.  Inline SVG, viewBox 0 0 120 200
// (feet at y≈196).
// Rig (unchanged, used by Intro.css): .intro-arm-l / .intro-arm-r posed via
// `data-a` (pivot at the shoulder), .intro-foot-*, .intro-head (tilt), and
// .intro-hug-arms (only visible with `hug`).

// inlined (data URI) so the face is there on the very first frame — no network wait
import safaFace from '../../assets/safa-face.webp?inline'

const RED_D = '#6e0d22'
const RED = '#9c1b34'
const GOLD = '#c9a24f'
const GOLD_L = '#ecd08a'
const GOLD_D = '#a8822f'
const SKIN = '#f2c3a2'
const HENNA = '#a4451f'

const SKIRT ='M41 130 Q30 162 13 188 Q60 201 107 188 Q90 162 79 130 Z'

function Hand({ cx, cy }) {
  return (
    <g>
      {/* bangles */}
      <path d={`M${cx - 5} ${cy - 5.6} H${cx + 5}`} stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M${cx - 5} ${cy - 4} H${cx + 5}`} stroke={RED} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill="url(#ib-skin)" />
      {/* mehndi */}
      <circle cx={cx} cy={cy + 0.4} r="2" fill="none" stroke={HENNA} strokeWidth=".55" opacity=".9" />
      <circle cx={cx} cy={cy + 0.4} r=".7" fill={HENNA} opacity=".9" />
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
        <linearGradient id="ib-skirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a1630" />
          <stop offset=".6" stopColor={RED} />
          <stop offset="1" stopColor="#7d1229" />
        </linearGradient>
        <linearGradient id="ib-blouse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a52039" />
          <stop offset="1" stopColor="#7d1229" />
        </linearGradient>
        <linearGradient id="ib-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1d998" />
          <stop offset=".5" stopColor={GOLD} />
          <stop offset="1" stopColor={GOLD_D} />
        </linearGradient>
        <radialGradient id="ib-skin" cx=".45" cy=".4" r=".65">
          <stop offset="0" stopColor="#f8d4ba" />
          <stop offset="1" stopColor={SKIN} />
        </radialGradient>
        <pattern id="ib-buta" width="11" height="12" patternUnits="userSpaceOnUse">
          <g fill={GOLD_L}>
            <circle cx="3" cy="3" r=".9" />
            <circle cx="1.8" cy="3" r=".55" opacity=".8" />
            <circle cx="4.2" cy="3" r=".55" opacity=".8" />
            <circle cx="3" cy="1.8" r=".55" opacity=".8" />
            <circle cx="3" cy="4.2" r=".55" opacity=".8" />
            <circle cx="8.5" cy="9" r=".6" opacity=".7" />
          </g>
        </pattern>
        <clipPath id="ib-skirt-clip">
          <path d={SKIRT} />
        </clipPath>
      </defs>

      {/* thattam back drape (behind everything) */}
      <path d="M27 96 Q13 128 18 164 Q60 175 102 164 Q107 128 93 96 Z" fill="#e6cfa3" />

      {/* feet (golden juttis) */}
      <g className="intro-foot intro-foot-l">
        <ellipse cx="49" cy="193" rx="8" ry="4.2" fill={GOLD} />
        <ellipse cx="47" cy="191.6" rx="3" ry="1.2" fill="#f3dfae" opacity=".8" />
      </g>
      <g className="intro-foot intro-foot-r">
        <ellipse cx="71" cy="193" rx="8" ry="4.2" fill={GOLD} />
        <ellipse cx="73" cy="191.6" rx="3" ry="1.2" fill="#f3dfae" opacity=".8" />
      </g>

      {/* ---------------- lehenga: maroon-red, pleated, gold butas, heavy hem */}
      <path d={SKIRT} fill="url(#ib-skirt)" />
      <g clipPath="url(#ib-skirt-clip)">
        <g fill={RED_D} opacity=".38">
          <path d="M45 130 L31 198 L39 198 L49 130 Z" />
          <path d="M58 130 L56 200 L63 200 L62 130 Z" />
          <path d="M71 130 L81 200 L89 199 L75 130 Z" />
        </g>
        <g fill="#c94a62" opacity=".22">
          <path d="M42 130 L18 194 L25 196 L45 130 Z" />
          <path d="M52 130 L44 199 L49 199 L55 130 Z" />
          <path d="M65 130 L70 200 L75 200 L68 130 Z" />
          <path d="M76 130 L98 196 L104 194 L78 130 Z" />
        </g>
        <rect x="0" y="130" width="120" height="72" fill="url(#ib-buta)" opacity=".75" />
        <g fill="none" stroke={GOLD} strokeWidth=".7" opacity=".75">
          <path d="M46 131 L26 196 M54 131 L48 199 M60 131 V200 M66 131 L72 199 M74 131 L94 196" />
        </g>
        <path d="M31 160 Q60 168 89 160" fill="none" stroke={GOLD} strokeWidth="1.6" />
        <path d="M31 162.6 Q60 170.6 89 162.6" fill="none" stroke={GOLD_L} strokeWidth="1.3" strokeDasharray="0.1 2.6" strokeLinecap="round" />
        {/* heavy bridal hem border */}
        <path d="M18 176 Q60 189.5 102 176 L110 192 Q60 206 10 192 Z" fill="url(#ib-gold)" />
        <path
          d="M18 176 q3 -3 6 .9 q3 -3 6 1.5 q3 -3 6 1.6 q3 -2.8 6 1.2 q3 -2.6 6 .8 q3 -2.4 6 0 q3 -2.4 6 -.8 q3 -2.6 6 -1.2 q3 -2.8 6 -1.6 q3 -3 6 -1.5 q3 -3 6 -.9"
          fill="none"
          stroke={GOLD_L}
          strokeWidth="1.1"
        />
        <path d="M15 182.5 Q60 196.5 105 182.5" fill="none" stroke={RED_D} strokeWidth="3.6" />
        <path d="M15 182.5 Q60 196.5 105 182.5" fill="none" stroke={GOLD_L} strokeWidth="2" strokeDasharray="0.1 3.4" strokeLinecap="round" />
        <path d="M12 188 Q60 202 108 188" fill="none" stroke={GOLD_D} strokeWidth=".9" />
      </g>

      {/* ---------------- blouse + gold oddiyanam (waist belt) */}
      <path d="M42 116 Q60 108 78 116 L79 132 Q60 137 41 132 Z" fill="url(#ib-blouse)" />
      <path d="M40 127 Q60 132.6 80 127 L80.6 134.6 Q60 140 39.4 134.6 Z" fill="url(#ib-gold)" />
      <path d="M40.4 131 Q60 136.6 80.2 131" fill="none" stroke={GOLD_D} strokeWidth=".5" />
      <g fill={RED}>
        {[44, 50, 56, 64, 70, 76].map((x) => (
          <circle key={x} cx={x} cy={131.4 + (1 - Math.abs(x - 60) / 16) * 1.6} r=".85" />
        ))}
      </g>
      {/* centre medallion */}
      <ellipse cx="60" cy="134" rx="4.2" ry="3.4" fill="url(#ib-gold)" stroke={GOLD_D} strokeWidth=".5" />
      <circle cx="60" cy="134" r="1.5" fill={RED} />

      {/* ---------------- thattam end thrown over one shoulder, falling to the knees */}
      <path d="M26 104 Q16 140 22 177 L31.5 174.5 Q28.5 142 34 116 Z" fill="url(#ib-cream)" />
      <path d="M25 108 Q16.4 140 21.4 175" fill="none" stroke={GOLD} strokeWidth="1.4" />
      <path d="M25.6 112 Q18.6 140 23.6 172" fill="none" stroke={RED} strokeWidth="1.6" strokeDasharray="0.1 3.6" strokeLinecap="round" opacity=".85" />
      <path d="M22 177 L31.5 174.5" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />

      {/* neck + blouse neckline */}
      <path d="M49 98 L71 98 L72 113 Q60 121 48 113 Z" fill="url(#ib-skin)" />
      <path d="M49 113.4 Q60 125 71 113.4" fill="url(#ib-skin)" />
      <path d="M49 113.4 Q60 125 71 113.4" fill="none" stroke={GOLD} strokeWidth="1" />

      {/* thattam over her right shoulder */}
      <path d="M30 95 Q17 112 24 128 Q35 134 45 131 Q47 114 50 100 Z" fill="url(#ib-cream)" />
      <path d="M45 131 Q47 114 50 100" fill="none" stroke={GOLD} strokeWidth="1.1" />

      {/* gold bridal necklaces */}
      <g transform="translate(0 6)">
        <g fill="none" strokeLinecap="round">
          <path d="M50 110 Q60 117 70 110" stroke={GOLD} strokeWidth="1.5" />
          <path d="M48 111 Q60 126 72 111" stroke={GOLD} strokeWidth="1.3" />
          <path d="M48 111 Q60 126 72 111" stroke={GOLD_L} strokeWidth="2.4" strokeDasharray="0.1 3.2" />
        </g>
        <path d="M57 123 Q60 121.4 63 123 L61.4 128 Q60 129 58.6 128 Z" fill="url(#ib-gold)" stroke={GOLD_D} strokeWidth=".4" />
        <circle cx="60" cy="125" r=".9" fill={RED} />
      </g>

      {/* ---------------- head: Safa's face under a Kerala-style thattam */}
      <g className="intro-head">
        <g transform="translate(60 106) scale(0.86) translate(-60 -106)">
          {/* hair behind the face (shows where the shawl sits loose) */}
          <path d="M38 84 L82 84 L84 112 L36 112 Z" fill="#2b1a13" />
          <path d="M60 20 C79 20 89 35 88.6 56 C88.4 74 86 86 82 94 L38 94 C34 86 31.6 74 31.4 56 C31 35 41 20 60 20 Z" fill="#2b1a13" />
          {/* neck under the jaw */}
          <path d="M50.5 90 L69.5 90 L71 116 L49 116 Z" fill="#e8b493" />
          <path d="M50.5 98 Q60 106 69.5 98 L69.5 102 Q60 108 50.5 102 Z" fill="#c98f6e" opacity=".45" />

          {/* the face */}
          <image href={safaFace} x="33" y="24.05" width="54" height="81.6" preserveAspectRatio="xMidYMid meet" />

          {/* thattam: light shawl resting round the head, hairline showing in front */}
          <path
            d="M40 104 C38.4 97 37.4 89 38 78 C36.8 66 37 56 39.4 47 C43 36 51 31.4 60 31.4 C69 31.4 77 36 80.6 47 C83 56 83.2 66 82 78 C82.6 89 81.6 97 80 104 C86 100 90 92 92 80 C95 60 93 38 83 27 C77 19.4 69 15 60 15 C51 15 43 19.4 37 27 C27 38 25 60 28 80 C30 92 34 100 40 104 Z"
            fill="url(#ib-cream)"
            opacity=".95"
          />
          {/* soft folds following the head + sheen */}
          <g fill="none" stroke="#d8bd8a" strokeLinecap="round" opacity=".8">
            <path d="M31 70 Q31 40 52 22" strokeWidth="1" />
            <path d="M89 70 Q90 46 76 26" strokeWidth=".9" />
          </g>
          <path d="M34 46 Q42 24 64 18.6" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="2.2" strokeLinecap="round" />
          {/* gold border + red dots along the front edge */}
          <path d="M40 104 C38.4 97 37.4 89 38 78 C36.8 66 37 56 39.4 47 C43 36 51 31.4 60 31.4 C69 31.4 77 36 80.6 47 C83 56 83.2 66 82 78 C82.6 89 81.6 97 80 104" fill="none" stroke={GOLD} strokeWidth="1.8" />
          <path d="M36.8 102 C35.2 96 34.2 89 34.8 78 C33.6 66 33.8 55 36.4 45.4 C40.4 33 50 28 60 28 C70 28 79.6 33 83.6 45.4 C86.2 55 86.4 66 85.2 78 C85.8 89 84.8 96 83.4 102" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="0.1 4" strokeLinecap="round" opacity=".85" />

          {/* loose wrap round the neck, carrying the shawl over to her right shoulder */}
          <path
            d="M82 99 C84 107 76 113 60 113.6 C46 114 37 110 34 103 L27 110 C32 120 46 123.4 60 123 C77 122.4 89 114 88 100 Z"
            fill="url(#ib-cream)"
          />
          <path d="M80 108 Q62 118 40 112" fill="none" stroke="#d8bd8a" strokeWidth=".9" strokeLinecap="round" opacity=".8" />
          <path d="M27 110 C32 120 46 123.4 60 123 C77 122.4 89 114 88 100" fill="none" stroke={GOLD} strokeWidth="1.5" />
          <path d="M29.6 108 C34.6 117.6 47 120.6 60 120.2 C75 119.8 85.6 113 85.2 101" fill="none" stroke={RED} strokeWidth="1.8" strokeDasharray="0.1 3.8" strokeLinecap="round" opacity=".85" />

          {/* (kept for the blush CSS hook; invisible on a real face) */}
          <g className="intro-cheeks" opacity="0" />
        </g>
      </g>

      {/* ---------------- arms: red sleeves with gold zari cuffs, hennaed hands */}
      <g className="intro-arm intro-arm-l" data-a={armL}>
        <path d="M35 118 Q30 134 33 146 L43 146 Q45 134 46 119 Z" fill="url(#ib-blouse)" />
        <path d="M33.2 140.6 H42.8 V146.4 H33.2 Z" fill="url(#ib-gold)" />
        <path d="M33.2 143.5 H42.8" stroke={RED} strokeWidth=".9" strokeDasharray="0.1 2" strokeLinecap="round" />
        <Hand cx={38} cy={151.6} />
      </g>
      <g className="intro-arm intro-arm-r" data-a={armR}>
        <path d="M85 118 Q90 134 87 146 L77 146 Q75 134 74 119 Z" fill="url(#ib-blouse)" />
        <path d="M77.2 140.6 H86.8 V146.4 H77.2 Z" fill="url(#ib-gold)" />
        <path d="M77.2 143.5 H86.8" stroke={RED} strokeWidth=".9" strokeDasharray="0.1 2" strokeLinecap="round" />
        <Hand cx={82} cy={151.6} />
      </g>

      {/* legacy embrace arms (only with `hug`; the hug scene itself is HugCouple.jsx) */}
      <g className="intro-hug-arms">
        <path d="M111 119 Q104 146 74 140" fill="none" stroke="#efdcb4" strokeWidth="11" strokeLinecap="round" />
        <ellipse cx="70" cy="139.5" rx="5.6" ry="5" fill="#d08660" />
        <path d="M83 122 C95 112 112 111 130 118" fill="none" stroke={RED} strokeWidth="10" strokeLinecap="round" />
        <path d="M125.4 111.8 L123.2 121.6" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="133" cy="118.6" rx="5.4" ry="5" fill="url(#ib-skin)" />
      </g>
    </svg>
  )
}
