// The embrace — one dedicated illustration swapped in while the couple hug.
// Pose: bride seen from BEHIND (back to the viewer) leaning into him; groom
// stands close behind her, cheek resting against her head, both arms wrapped
// round her back.  Her arm goes up over his shoulder, hennaed hand + bangles
// resting near his neck.
// Bridal look: maroon-red lehenga with heavy gold zari border + buta motifs,
// back-tie blouse with gold latkans, Kerala gold oddiyanam (waist belt), ivory
// hijab under a simple cream thattam (gold border + red dots).
// viewBox 0 0 156 200, same unit scale as the single characters (120 x 200),
// feet at y≈196.
import Groom from './Groom.jsx'

export const HUG_W = 156
export const HUG_BRIDE_X = 60
export const HUG_GROOM_X = 109

const RED_D = '#6e0d22'
const RED = '#9c1b34'
const GOLD = '#c9a24f'
const GOLD_L = '#ecd08a'
const SKIN_B = '#f2c3a2' // bride
const HENNA = '#a4451f'
const SKIN_G = '#cf966b' // groom
const SKIN_G_D = '#a8724a'

export default function HugCouple() {
  return (
    <svg className="intro-hug-svg" viewBox="0 0 156 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ih-skirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a1630" />
          <stop offset=".6" stopColor={RED} />
          <stop offset="1" stopColor="#7d1229" />
        </linearGradient>
        <linearGradient id="ih-blouse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a52039" />
          <stop offset="1" stopColor="#7d1229" />
        </linearGradient>
        <radialGradient id="ih-hijab" cx=".38" cy=".3" r=".85">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset=".65" stopColor="#f3e5c8" />
          <stop offset="1" stopColor="#dcc394" />
        </radialGradient>
        <linearGradient id="ih-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf3e2" />
          <stop offset="1" stopColor="#e6cfa0" />
        </linearGradient>
        <linearGradient id="ih-sleeve-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#e8d3a4" />
        </linearGradient>
        <linearGradient id="ih-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1d998" />
          <stop offset=".5" stopColor={GOLD} />
          <stop offset="1" stopColor="#a8822f" />
        </linearGradient>
        {/* zari buta: tiny gold flowers scattered over the lehenga */}
        <pattern id="ih-buta" width="11" height="12" patternUnits="userSpaceOnUse">
          <g fill={GOLD_L}>
            <circle cx="3" cy="3" r=".9" />
            <circle cx="1.8" cy="3" r=".55" opacity=".8" />
            <circle cx="4.2" cy="3" r=".55" opacity=".8" />
            <circle cx="3" cy="1.8" r=".55" opacity=".8" />
            <circle cx="3" cy="4.2" r=".55" opacity=".8" />
            <circle cx="8.5" cy="9" r=".6" opacity=".7" />
          </g>
        </pattern>
        <clipPath id="ih-skirt-clip">
          <path d="M43 132 Q30 160 10 186 Q60 201 112 186 Q91 160 79 132 Z" />
        </clipPath>
      </defs>

      {/* ---------- groom (behind her): cheek resting on her head, eyes closed in a smile */}
      <Groom
        armL="none"
        armR="none"
        hug
        blush
        x={HUG_GROOM_X - 60}
        y={-7}
        width={120}
        height={200}
        style={{ width: '120px', height: '200px', overflow: 'visible' }}
      />

      {/* ---------- bride, seen from behind, leaning into him */}
      <g transform="rotate(3.5 60 196)">
        {/* heels peeking under the lehenga */}
        <ellipse cx="50" cy="193" rx="7" ry="3.2" fill={GOLD} />
        <ellipse cx="70" cy="193" rx="7" ry="3.2" fill={GOLD} />

        {/* ===== lehenga: maroon-red, flared with pleats */}
        <path d="M43 132 Q30 160 10 186 Q60 201 112 186 Q91 160 79 132 Z" fill="url(#ih-skirt)" />
        <g clipPath="url(#ih-skirt-clip)">
          {/* kali pleats: soft darker / lighter panels fanning from the waist */}
          <g fill={RED_D} opacity=".38">
            <path d="M47 132 L33 196 L41 196 L51 132 Z" />
            <path d="M58 132 L56 198 L63 198 L62 132 Z" />
            <path d="M69 132 L79 198 L87 197 L73 132 Z" />
            <path d="M77 132 L100 194 L107 192 L79 132 Z" />
          </g>
          <g fill="#c94a62" opacity=".22">
            <path d="M44 132 L20 192 L27 194 L47 132 Z" />
            <path d="M53 132 L45 197 L50 197 L56 132 Z" />
            <path d="M64 132 L68 198 L73 198 L67 132 Z" />
          </g>
          {/* scattered zari butas */}
          <rect x="0" y="132" width="156" height="70" fill="url(#ih-buta)" opacity=".75" />
          {/* gold kali seams */}
          <g fill="none" stroke={GOLD} strokeWidth=".7" opacity=".75">
            <path d="M47 133 L28 194 M55 133 L50 197 M61 133 L61 198 M67 133 L72 198 M75 133 L94 195" />
          </g>
          {/* mid-skirt zari band (thin) */}
          <path d="M33 160 Q60 168 89 160" fill="none" stroke={GOLD} strokeWidth="1.6" />
          <path d="M33 162.6 Q60 170.6 89 162.6" fill="none" stroke={GOLD_L} strokeWidth="1.3" strokeDasharray="0.1 2.6" strokeLinecap="round" />

          {/* heavy bridal hem border */}
          <path d="M16 176 Q60 189.5 106 176 L114 192 Q60 206 8 192 Z" fill="url(#ih-gold)" />
          {/* scalloped top edge of the border */}
          <path
            d="M16 176 q3 -3 6 0.8 q3 -3 6 1.4 q3 -3 6 1.6 q3 -2.8 6 1.3 q3 -2.6 6 1 q3 -2.4 6 .6 q3 -2.4 6 0 q3 -2.4 6 -.6 q3 -2.6 6 -1 q3 -2.8 6 -1.3 q3 -3 6 -1.6 q3 -3 6 -1.4 q3 -3 6 -.8"
            fill="none"
            stroke={GOLD_L}
            strokeWidth="1.1"
          />
          {/* red inner stripe with gold motif dots */}
          <path d="M14 182.5 Q60 196.5 108 182.5" fill="none" stroke={RED_D} strokeWidth="3.6" />
          <path d="M14 182.5 Q60 196.5 108 182.5" fill="none" stroke={GOLD_L} strokeWidth="2" strokeDasharray="0.1 3.4" strokeLinecap="round" />
          <path d="M12 188 Q60 202 110 188" fill="none" stroke="#a8822f" strokeWidth=".9" />
        </g>

        {/* ===== blouse back (seen through the net) */}
        <path d="M37 111 Q60 103 85 111 L82 134 Q60 138 40 134 Z" fill="url(#ih-blouse)" />
        {/* deep back neck edged in gold, with the dori tie + latkans */}
        <path d="M49 110 Q61 126 73 110" fill="#e9c9a8" />
        <path d="M49 110 Q61 126 73 110" fill="none" stroke={GOLD} strokeWidth="1.3" />
        <path d="M57 119.5 Q61 121 65 119.5" fill="none" stroke={GOLD_L} strokeWidth=".8" />
        <g stroke={GOLD} strokeWidth=".7" fill="none" strokeLinecap="round">
          <path d="M61 120.5 Q58 132 57 142 M61 120.5 Q63.5 132 65 144" />
        </g>
        <g fill={GOLD}>
          <path d="M55.6 142 h2.8 l-1.4 4.6 Z" />
          <circle cx="57" cy="141.6" r="1.4" fill={RED} stroke={GOLD} strokeWidth=".6" />
          <path d="M63.6 144 h2.8 l-1.4 4.6 Z" />
          <circle cx="65" cy="143.6" r="1.4" fill={RED} stroke={GOLD} strokeWidth=".6" />
        </g>

        {/* ===== gold oddiyanam (Kerala bridal waist belt) */}
        <path d="M40 129.5 Q60 135 82 129.5 L82.6 137 Q60 142.4 39.4 137 Z" fill="url(#ih-gold)" />
        <path d="M40.4 133.4 Q60 139 82.2 133.4" fill="none" stroke="#a8822f" strokeWidth=".5" />
        <g fill={RED}>
          {[44, 49.5, 55, 60.5, 66, 71.5, 77].map((x, i) => (
            <circle key={x} cx={x} cy={133.6 + Math.sin((i / 6) * Math.PI) * 1.9} r=".9" />
          ))}
        </g>

        {/* ===== head: ivory hijab, tilted against his chest */}
        <g transform="rotate(9 64 112)">
          {/* hijab falling over the shoulders */}
          <path d="M38 90 Q28 108 33 121 Q62 129 91 121 Q96 108 86 90 Z" fill="url(#ih-hijab)" />
          <path d="M43 104 Q45 114 43 121 M81 104 Q79 114 81 121 M62 106 V125" fill="none" stroke="#d6bd8b" strokeWidth=".9" opacity=".8" />
          {/* back of the head */}
          <ellipse cx="62" cy="75" rx="28" ry="30" fill="url(#ih-hijab)" />
          <path d="M39 66 Q47 50 66 47.6" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M42 90 Q62 100 82 90" fill="none" stroke="#d6bd8b" strokeWidth="1" />
          {/* jewelled hijab pin */}
          <circle cx="84" cy="94" r="2.4" fill={GOLD} />
          <circle cx="84" cy="94" r="1" fill={RED} />
        </g>

        {/* ===== simple cream thattam laid over the head, falling down her back */}
        <g transform="rotate(9 64 112)">
          <path
            d="M62 43.6 C39 43.6 31.6 65 34.4 88 C31 108 27 128 24 148 Q62 160 100 148 C97 128 93 108 89.6 88 C92.4 65 85 43.6 62 43.6 Z"
            fill="url(#ih-net)"
          />
          {/* soft folds + sheen */}
          <path d="M47 98 Q44 124 41 150 M77 98 Q80 124 83 151" fill="none" stroke="#d6bd8b" strokeWidth="1.1" strokeLinecap="round" opacity=".8" />
          {/* where the shawl leaves the back of the head */}
          <path d="M37 90 Q62 106 87 90" fill="none" stroke="#d2b57f" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M42 96 Q62 108 82 96" fill="none" stroke="#d2b57f" strokeWidth=".9" strokeLinecap="round" opacity=".6" />
          <path d="M40 66 Q46 50 64 46.6" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2.2" strokeLinecap="round" />
          {/* gold border + red dots along the hem */}
          <path d="M25 144.4 Q62 156.4 99 144.4" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M26.4 140.6 Q62 152.4 97.6 140.6" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="0.1 3.8" strokeLinecap="round" opacity=".85" />
        </g>
      </g>

      {/* ---------- SALMAN's right arm: comes round her far side, hand spread on her upper back */}
      <path d="M26 132 Q28 127 33 125" fill="none" stroke="url(#ih-sleeve-g)" strokeWidth="9" strokeLinecap="round" />
      <path d="M31.4 120.6 L33.6 129.6" stroke="#d4af6a" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M34 121 Q40 117.6 46 118.6 L52.4 117.4 Q54.6 118 53 119.6 L47.6 121.2 L53.6 121.4 Q55.6 122.4 53.4 123.6 L47.4 124 L52.4 125.4 Q54 126.8 51.8 127.4 L46 126.8 Q40.6 130.6 35 128.8 Z"
        fill={SKIN_G}
      />
      <path d="M46.6 121 L44 121.6 M46.8 124 L44 124.2 M45.6 126.8 L43.4 126.2" stroke={SKIN_G_D} strokeWidth=".7" strokeLinecap="round" />

      {/* arms tied to his position (shifted with him) */}
      <g transform="translate(5 0)">
      {/* ---------- SALMAN's left arm: round her waist, holding her close */}
      <path d="M126 116 Q136 150 88 152" fill="none" stroke="url(#ih-sleeve-g)" strokeWidth="11" strokeLinecap="round" />
      <path d="M126 116 Q134 146 98 150.6" fill="none" stroke="#fffaf0" strokeWidth="3.4" strokeLinecap="round" opacity=".6" />
      <path d="M126 116 Q136 150 88 152" fill="none" stroke="#d9bf8e" strokeWidth=".8" strokeDasharray="0" opacity=".5" transform="translate(0 4.6)" />
      <path d="M92.4 146.4 L91.4 157.4" stroke="#d4af6a" strokeWidth="2.8" strokeLinecap="round" />
      <path
        d="M90 147 Q84 145.6 78.6 147 L72.6 146 Q70.4 146.8 72.2 148.4 L77.4 149.4 L71.4 150.4 Q69.6 151.6 71.8 152.6 L77.6 152.4 L72.8 154.4 Q71.4 156 73.6 156.2 L79.4 155 Q85 157.6 90 156 Z"
        fill={SKIN_G}
      />
      <path d="M78.2 149.4 L80.6 149.8 M78.2 152.4 L80.8 152.6 M79.4 155 L81.6 154.6" stroke={SKIN_G_D} strokeWidth=".7" strokeLinecap="round" />

      {/* ---------- SAFA's right arm: up over his shoulder, hennaed hand + bangles near his neck */}
      {/* tapered sleeve: shoulder → wrist */}
      <path d="M84 113 Q99 98.6 117 98.2 L118.4 107.8 Q104 108.4 93.4 124.6 Z" fill={RED} />
      <path d="M86.6 113.4 Q100 101 116.6 100.4" fill="none" stroke="#c94a62" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
      {/* sheer dupatta edge falling off the arm, gold border */}
      <path d="M92 121 Q103 109.6 114 108.4 Q112 120 99 129 Z" fill="url(#ih-net)" />
      <path d="M92 121 Q103 109.6 114 108.4" fill="none" stroke={GOLD} strokeWidth="1.1" />
      {/* zari cuff + stacked bangles */}
      <path d="M114.6 98 L115.6 108" stroke={GOLD} strokeWidth="2.4" strokeLinecap="round" />
      <g strokeLinecap="round">
        <path d="M118.4 98.6 L118.8 108" stroke={GOLD} strokeWidth="1.7" />
        <path d="M120.4 98.6 L120.8 107.8" stroke={RED} strokeWidth="1.5" />
        <path d="M122.2 98.8 L122.6 107.6" stroke={GOLD_L} strokeWidth="1.7" />
        <path d="M124 99.2 L124.2 107.4" stroke={GOLD} strokeWidth="1.3" />
      </g>
      {/* hand resting over the top of his shoulder, fingers curling down behind */}
      <path
        d="M124.6 99.6 Q130.6 97 135.8 99.4 Q139.8 101.6 139.6 106 L139.4 112 Q138.6 114 137.4 112 L137 108.2 L135.6 113.4 Q134.4 115.2 133.4 113 L133.6 108.6 L131.8 112.6 Q130.6 114 129.8 112 L130.4 108.2 Q127 108.6 124.8 107.4 Z"
        fill={SKIN_B}
      />
      <path d="M137 108.2 L137.4 105.6 M133.6 108.6 L134 105.8 M130.4 108.2 L130.6 106" stroke="#d9a98c" strokeWidth=".55" strokeLinecap="round" />
      {/* mehndi */}
      <g fill="none" stroke={HENNA} strokeWidth=".55" strokeLinecap="round" opacity=".9">
        <circle cx="130.4" cy="102.6" r="2.1" />
        <circle cx="130.4" cy="102.6" r=".7" fill={HENNA} />
        <path d="M126.2 101 Q127.2 103 126.4 105.6 M134.2 100.8 Q136.4 101.6 137.6 103.6" />
        <path d="M138.4 108 L138.6 111.4 M134.8 109 L134.6 112.4 M131.4 108.8 L131 111.4" strokeDasharray="0.1 1.3" strokeWidth=".8" />
      </g>
      </g>
    </svg>
  )
}
