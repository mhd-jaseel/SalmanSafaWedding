// Bride (Safa) — big-head "realistic cartoon": her real face under a simple
// Kerala-style maroon net dupatta (loose over the head and both shoulders, gold zari border), maroon-red
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
        <linearGradient id="ib-dup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b42a46" stopOpacity=".86" />
          <stop offset="1" stopColor="#8a1630" stopOpacity=".94" />
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

      {/* dupatta back drape (behind everything) */}
      <path d="M27 96 Q13 128 18 164 Q60 175 102 164 Q107 128 93 96 Z" fill="#6e0d22" />

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

      {/* ---------------- dupatta ends falling over both shoulders to the knees */}
      <path d="M26 104 Q16 140 22 177 L31.5 174.5 Q28.5 142 34 116 Z" fill="url(#ib-dup)" />
      <path d="M94 104 Q104 140 98 177 L88.5 174.5 Q91.5 142 86 116 Z" fill="url(#ib-dup)" />
      <path d="M33.4 117 Q28.4 142 31 174" fill="none" stroke={GOLD} strokeWidth="1.6" />
      <path d="M86.6 117 Q91.6 142 89 174" fill="none" stroke={GOLD} strokeWidth="1.6" />
      <path d="M22 177 L31.5 174.5 M98 177 L88.5 174.5" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />

      {/* neck + blouse neckline */}
      <path d="M49 98 L71 98 L72 113 Q60 121 48 113 Z" fill="url(#ib-skin)" />
      <path d="M49 113.4 Q60 125 71 113.4" fill="url(#ib-skin)" />
      <path d="M49 113.4 Q60 125 71 113.4" fill="none" stroke={GOLD} strokeWidth="1" />

      {/* dupatta over both shoulders */}
      <path d="M30 95 Q17 112 24 128 Q35 134 45 131 Q47 114 50 100 Z" fill="url(#ib-dup)" />
      <path d="M90 95 Q103 112 96 128 Q85 134 75 131 Q73 114 70 100 Z" fill="url(#ib-dup)" />
      <path d="M45 131 Q47 114 50 100 M75 131 Q73 114 70 100" fill="none" stroke={GOLD} strokeWidth="1.6" />

      {/* gold bridal necklaces */}
      <g transform="translate(0 2)">
        <g fill="none" strokeLinecap="round">
          <path d="M50 108 Q60 116 70 108" stroke={GOLD} strokeWidth="1.5" />
          <path d="M48 110 Q60 126 72 110" stroke={GOLD} strokeWidth="1.3" />
          <path d="M48 110 Q60 126 72 110" stroke={GOLD_L} strokeWidth="2.4" strokeDasharray="0.1 3.2" />
        </g>
        <path d="M57 123 Q60 121.4 63 123 L61.4 128 Q60 129 58.6 128 Z" fill="url(#ib-gold)" stroke={GOLD_D} strokeWidth=".4" />
        <circle cx="60" cy="125" r=".9" fill={RED} />
      </g>

      {/* ---------------- head: Safa's face, maroon net dupatta resting loosely on her head */}
      <g className="intro-head">
        <g transform="translate(60 106) scale(0.86) translate(-60 -106)">
          {/* hair framing the face, falling behind the shoulders */}
          <path d="M60 20 C78 20 90 33 90.6 54 C91 72 91 92 89 114 Q80 104 68 101 L52 101 Q40 104 31 114 C29 92 29 72 29.4 54 C30 33 42 20 60 20 Z" fill="#2b1a13" />
          {/* neck under the jaw */}
          <path d="M50.5 90 L69.5 90 L71 116 L49 116 Z" fill="#e8b493" />
          <path d="M50.5 98 Q60 106 69.5 98 L69.5 102 Q60 108 50.5 102 Z" fill="#c98f6e" opacity=".45" />

          {/* the face */}
          <image href={safaFace} x="33" y="24.05" width="54" height="81.6" preserveAspectRatio="xMidYMid meet" />

          {/* dupatta: sheer maroon net laid loosely over the head, hair showing in front */}
          <path
            d="M26 120 C28 104 28 86 29 68 C30 42 42 23 60 23 C78 23 90 42 91 68 C92 86 92 104 94 120 L104 120 C106 96 106 72 103 52 C99 26 82 12 60 12 C38 12 21 26 17 52 C14 72 14 96 16 120 Z"
            fill="url(#ib-dup)"
          />
          {/* soft folds + sheen */}
          <g fill="none" stroke="#5a0a1b" strokeLinecap="round" opacity=".5">
            <path d="M22 60 Q20 90 22 118 M98 60 Q100 90 98 118" strokeWidth="1.1" />
          </g>
          <path d="M26 44 Q36 22 62 16" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2.4" strokeLinecap="round" />
          {/* gold zari border along the front edge */}
          <path d="M26 120 C28 104 28 86 29 68 C30 42 42 23 60 23 C78 23 90 42 91 68 C92 86 92 104 94 120" fill="none" stroke={GOLD} strokeWidth="2.6" />
          <path d="M23.4 120 C25.4 104 25.4 86 26.4 68 C27.6 39.6 40.6 20.4 60 20.4 C79.4 20.4 92.4 39.6 93.6 68 C94.6 86 94.6 104 96.6 120" fill="none" stroke={GOLD_L} strokeWidth="1.2" strokeDasharray="0.1 2.8" strokeLinecap="round" />

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
