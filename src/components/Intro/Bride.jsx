// Bride (Safa) — big-head "realistic cartoon": her real face inside an ivory
// hijab, a sheer red net dupatta over it with a gold zari border, maroon-red
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

// face opening of the hijab (head-group coords): gently arched over the forehead,
// hugging the cheeks, closing under the chin — sits just inside the photo's oval edge
const HIJAB_OPENING =
  'M60 40.5 C72 40.5 80.6 46 82.2 58 C83.6 74 78.4 91 70 98.6 Q60 105 50 98.6 C41.6 91 36.4 74 37.8 58 C39.4 46 48 40.5 60 40.5 Z'

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
        <radialGradient id="ib-hood" cx=".42" cy=".3" r=".8">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset=".7" stopColor="#f3e5c8" />
          <stop offset="1" stopColor="#e1c895" />
        </radialGradient>
        <linearGradient id="ib-skirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a1630" />
          <stop offset=".6" stopColor={RED} />
          <stop offset="1" stopColor="#7d1229" />
        </linearGradient>
        <linearGradient id="ib-blouse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a52039" />
          <stop offset="1" stopColor="#7d1229" />
        </linearGradient>
        <linearGradient id="ib-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c83a55" stopOpacity=".3" />
          <stop offset="1" stopColor="#a8213b" stopOpacity=".62" />
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
        <pattern id="ib-sequin" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r=".45" fill="#f7e2a6" />
          <circle cx="4.5" cy="4.5" r=".35" fill="#f7e2a6" opacity=".7" />
        </pattern>
        <clipPath id="ib-skirt-clip">
          <path d={SKIRT} />
        </clipPath>
      </defs>

      {/* net dupatta back drape (behind everything) */}
      <path d="M27 96 Q13 128 18 164 Q60 175 102 164 Q107 128 93 96 Z" fill="#8f1a33" opacity=".55" />

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

      {/* ---------------- net dupatta: side panels falling to the knees */}
      <path d="M26 104 Q16 140 22 177 L31.5 174.5 Q28.5 142 34 116 Z" fill="url(#ib-net)" />
      <path d="M94 104 Q104 140 98 177 L88.5 174.5 Q91.5 142 86 116 Z" fill="url(#ib-net)" />
      <path d="M26 104 Q16 140 22 177 L31.5 174.5 Q28.5 142 34 116 Z" fill="url(#ib-sequin)" opacity=".8" />
      <path d="M94 104 Q104 140 98 177 L88.5 174.5 Q91.5 142 86 116 Z" fill="url(#ib-sequin)" opacity=".8" />
      <path d="M25 108 Q16.4 140 21.4 175" fill="none" stroke={GOLD} strokeWidth="1.8" />
      <path d="M95 108 Q103.6 140 98.6 175" fill="none" stroke={GOLD} strokeWidth="1.8" />
      <path d="M22 177 L31.5 174.5 M98 177 L88.5 174.5" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />
      {/* tassels */}
      <g fill={GOLD}>
        <path d="M24.4 176.4 l-1.3 4.6 h2.6 Z" />
        <circle cx="24.4" cy="182.4" r="1.2" />
        <path d="M95.6 176.4 l-1.3 4.6 h2.6 Z" />
        <circle cx="95.6" cy="182.4" r="1.2" />
      </g>

      {/* hijab front over the shoulders / chest */}
      <path d="M28 95 Q17 112 24 128 Q42 138 60 136.5 Q78 138 96 128 Q103 112 92 95 Z" fill="url(#ib-hood)" />
      <path d="M34 104 Q46 118 60 120 Q74 118 86 104" fill="none" stroke="#dcc396" strokeWidth=".9" opacity=".8" />
      {/* net dupatta edge across the chest */}
      <path d="M23.6 117 Q36 133 60 134.6 Q84 133 96.4 117 L97.6 122 Q85 138.6 60 139.6 Q35 138.6 22.4 122 Z" fill="url(#ib-net)" />
      <path d="M23.6 117 Q36 133 60 134.6 Q84 133 96.4 117" fill="none" stroke={GOLD} strokeWidth="1.3" />
      <path d="M22.4 122 Q35 138.6 60 139.6 Q85 138.6 97.6 122" fill="none" stroke={GOLD} strokeWidth="1.4" />

      {/* layered gold bridal necklaces worn over the hijab */}
      <g fill="none" strokeLinecap="round">
        <path d="M46 108 Q60 119 74 108" stroke={GOLD} strokeWidth="1.6" />
        <path d="M46.6 108.8 Q60 120.6 73.4 108.8" stroke={GOLD_L} strokeWidth="1.1" strokeDasharray="0.1 2.2" />
        <path d="M42 110 Q60 129 78 110" stroke={GOLD} strokeWidth="1.4" />
        <path d="M42 110 Q60 129 78 110" stroke={GOLD_L} strokeWidth="2.6" strokeDasharray="0.1 3.2" />
      </g>
      <g fill="url(#ib-gold)" stroke={GOLD_D} strokeWidth=".4">
        <path d="M57 118 Q60 116.4 63 118 L61.4 123.4 Q60 124.4 58.6 123.4 Z" />
        <path d="M56.4 126.6 Q60 124.6 63.6 126.6 L62 132 Q60 133.4 58 132 Z" />
      </g>
      <circle cx="60" cy="120" r=".9" fill={RED} />
      <circle cx="60" cy="128.6" r="1" fill={RED} />

      {/* ---------------- head: hijab hood + Safa's face, net dupatta over it */}
      <g className="intro-head">
        <g transform="translate(60 106) scale(0.86) translate(-60 -106)">
          {/* the face (drawn first; the hijab below covers everything outside a snug face opening) */}
          <image href={safaFace} x="33" y="24.05" width="54" height="81.6" preserveAspectRatio="xMidYMid meet" />

          {/* ivory hijab: rounded over the crown, falling straight past the cheeks to the
              shoulders, with a face-shaped opening (forehead → under the chin) */}
          <path
            fillRule="evenodd"
            fill="url(#ib-hood)"
            d={`M60 12 C85 12 100 31 100 58 C100 82 95 100 88 112 L32 112 C25 100 20 82 20 58 C20 31 35 12 60 12 Z ${HIJAB_OPENING}`}
          />
          {/* under-chin wrap + fabric folds */}
          <g fill="none" stroke="#d6bd8b" strokeLinecap="round">
            <path d="M42 98 Q60 113 78 98" strokeWidth="1.2" />
            <path d="M46 104.6 Q60 114 74 104.6" strokeWidth=".9" opacity=".7" />
            <path d="M30.6 62 Q28 86 35 108 M89.4 62 Q92 86 85 108" strokeWidth="1" opacity=".75" />
            <path d="M25 70 Q25 92 31 110 M95 70 Q95 92 89 110" strokeWidth=".8" opacity=".55" />
          </g>
          {/* inner cap edge hugging the face, with a fine gold line */}
          <path d={HIJAB_OPENING} fill="none" stroke="#e9d6ae" strokeWidth="2.2" />
          <path d={HIJAB_OPENING} fill="none" stroke={GOLD} strokeWidth=".7" transform="translate(60 70) scale(1.07 1.05) translate(-60 -70)" />

          {/* sheer red net dupatta laid over the head, front edge set back over the forehead */}
          <path
            d="M60 8 C87 8 103 30 103 58 C103 83 98 101 91 113 L83 113 C89 98 92.6 80 91.6 60 C90.6 37 78 23 60 23 C42 23 29.4 37 28.4 60 C27.4 80 31 98 37 113 L29 113 C22 101 17 83 17 58 C17 30 33 8 60 8 Z"
            fill="url(#ib-net)"
          />
          <path
            d="M60 8 C87 8 103 30 103 58 C103 83 98 101 91 113 L83 113 C89 98 92.6 80 91.6 60 C90.6 37 78 23 60 23 C42 23 29.4 37 28.4 60 C27.4 80 31 98 37 113 L29 113 C22 101 17 83 17 58 C17 30 33 8 60 8 Z"
            fill="url(#ib-sequin)"
            opacity=".75"
          />
          {/* gold zari border along the dupatta's front edge */}
          <path d="M37 113 C31 98 27.4 80 28.4 60 C29.4 37 42 23 60 23 C78 23 90.6 37 91.6 60 C92.6 80 89 98 83 113" fill="none" stroke={GOLD} strokeWidth="2.4" />
          <path d="M34.4 112 C29 98 25.6 80 26.4 60 C27.6 35 41 20.6 60 20.6 C79 20.6 92.4 35 93.6 60 C94.4 80 91 98 85.6 112" fill="none" stroke={GOLD_L} strokeWidth="1.3" strokeDasharray="0.1 3" strokeLinecap="round" />
          {/* soft sheen on the crown */}
          <path d="M30 40 Q40 17 66 13" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="2.2" strokeLinecap="round" />

          {/* jewelled hijab pin at the side */}
          <circle cx="84" cy="94" r="3" fill="url(#ib-gold)" />
          <circle cx="84" cy="94" r="1.3" fill={RED} />

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
