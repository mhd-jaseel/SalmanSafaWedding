// The embrace — one dedicated illustration swapped in while the couple hug.
// Pose: bride seen from BEHIND (back to the viewer), groom facing us with his
// face resting over her shoulder, both his arms wrapped around her back, her
// hand peeking over his shoulder.  viewBox 0 0 150 200, same unit scale as the
// single characters (120 x 200), feet at y≈196.
//   bride centre x = 44, groom centre x = 104, couple centre x = 75.
import Groom from './Groom.jsx'

export const HUG_W = 156
export const HUG_BRIDE_X = 44
export const HUG_GROOM_X = 111

export default function HugCouple() {
  return (
    <svg className="intro-hug-svg" viewBox="0 0 156 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ih-hijab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf3e2" />
          <stop offset="1" stopColor="#e9d3a8" />
        </linearGradient>
        <linearGradient id="ih-skirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fcf5e6" />
          <stop offset="1" stopColor="#e9d4a6" />
        </linearGradient>
        <linearGradient id="ih-sleeve" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#e8d3a4" />
        </linearGradient>
      </defs>

      {/* ---------- groom (behind): full figure, closed happy eyes, head tilted toward her */}
      <Groom
        armL="none"
        armR="none"
        hug
        blush
        x={HUG_GROOM_X - 60}
        y={-8}
        width={120}
        height={200}
        style={{ width: '120px', height: '200px', overflow: 'visible' }}
      />

      {/* ---------- bride, seen from behind (in front of him) */}
      <g transform="translate(-16 6)">
        {/* heels peeking under the lehenga */}
        <ellipse cx="49" cy="188" rx="7" ry="3.4" fill="#c9a24f" />
        <ellipse cx="71" cy="188" rx="7" ry="3.4" fill="#c9a24f" />

        {/* lehenga (back): ivory, gold vines, red hem band */}
        <path d="M42 128 Q33 160 18 185 Q60 195 102 185 Q87 160 78 128 Z" fill="url(#ih-skirt)" />
        <path d="M60 132 Q59 162 60 188 M45 132 Q38 160 27 180 M75 132 Q82 160 93 180" fill="none" stroke="#d9bf8e" strokeWidth="1.1" opacity=".7" />
        <g fill="none" stroke="#c9a24f" strokeWidth=".9" strokeLinecap="round">
          <path d="M38 176 Q40 164 38 152 M60 180 Q58 164 60 146 M82 176 Q80 164 82 152" />
          <path d="M38 160 l-3 -2 M38 168 l3 -2 M60 154 l3 -2 M60 163 l-3 -2 M60 172 l3 -2 M82 160 l3 -2 M82 168 l-3 -2" strokeWidth="1.6" />
        </g>
        <path d="M19.5 178.5 Q60 190 100.5 178.5 L102 185 Q60 195 18 185 Z" fill="#a8213b" />
        <path d="M19.5 178.5 Q60 190 100.5 178.5" fill="none" stroke="#c9a24f" strokeWidth="1.4" />
        <path d="M19 183.6 Q60 194 101 183.6" fill="none" stroke="#e6c983" strokeWidth="1.5" strokeDasharray="0.1 4" strokeLinecap="round" />

        {/* waist band */}
        <path d="M41 126 Q60 131 79 126 L79 133 Q60 138 41 133 Z" fill="#c9a24f" />

        {/* long dupatta / hijab drape down her back, red-dot + gold border */}
        <path d="M33 84 Q11 112 22 146 Q60 156 98 146 Q109 112 87 84 Z" fill="url(#ih-hijab)" />
        <path d="M23 143 Q60 152 97 143" fill="none" stroke="#c9a24f" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M24.5 139.5 Q60 148.5 95.5 139.5" fill="none" stroke="#a8213b" strokeWidth="2.2" strokeDasharray="0.1 3.6" strokeLinecap="round" />
        <path d="M44 92 Q41 118 46 136 M76 92 Q79 118 74 136" fill="none" stroke="#d8bd8a" strokeWidth="1.3" opacity=".7" strokeLinecap="round" />

        {/* back of the head (hijab) — slightly tilted toward him */}
        <g transform="rotate(6 60 104) translate(60 104) scale(0.86) translate(-60 -104)">
          <circle cx="60" cy="58" r="43" fill="url(#ih-hijab)" />
          <circle cx="60" cy="58" r="39.5" fill="none" stroke="#a8213b" strokeWidth="2.1" strokeDasharray="0.1 4.4" strokeLinecap="round" opacity=".8" />
          <path d="M26 42 Q60 10 94 42" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
          <path d="M34 78 Q60 92 86 78" fill="none" stroke="#d8bd8a" strokeOpacity=".8" strokeWidth="1.6" strokeLinecap="round" />
          {/* little gold pin where the hijab is fastened */}
          <circle cx="78" cy="86" r="2.6" fill="#d4af6a" />
          <circle cx="78" cy="86" r="1.1" fill="#a8213b" />
        </g>
      </g>

      {/* ---------- SAFA's arm: up across Salman's chest, hand resting on his shoulder */}
      <path d="M80 121 Q108 103 135 109" fill="none" stroke="#f3e6cc" strokeWidth="10.5" strokeLinecap="round" />
      <path d="M84 116 Q108 102 132 106" fill="none" stroke="#fffaf0" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <path d="M128.8 102.6 L127.2 113.4" stroke="#a8213b" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M125.6 102.4 L124.2 112.8" stroke="#c9a24f" strokeWidth="1.2" strokeLinecap="round" />
      {/* hand cupping the top of his shoulder */}
      <path d="M134 104.6 Q143 101 146.5 107 Q147.5 112.5 141 114.4 Q135.5 115 133.4 111 Z" fill="#f2c3a2" />
      <path d="M140 104 Q144.6 106 145 110.6 M137.6 105 Q141.4 107.4 141.4 112" fill="none" stroke="#d9a98c" strokeWidth=".8" strokeLinecap="round" />

      {/* ---------- SALMAN's right arm: goes round her FAR side (hidden behind her);
                     only the sleeve end peeks past her shoulder and his hand rests on her back */}
      <path d="M-3 112 Q2 108.6 8 108.4" fill="none" stroke="url(#ih-sleeve)" strokeWidth="10" strokeLinecap="round" />
      <path d="M4.6 103.4 L5.4 113.4" stroke="#d4af6a" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M7 103.2 Q17 100.6 23.4 104.4 Q26.4 108.4 22.6 112.2 Q15.4 115.2 7.6 113.6 Z" fill="#cf966b" />
      <path d="M13 103.4 Q17.6 105 18.4 108 M12.4 107.2 Q17.6 108.6 19 111.6 M11.4 110.6 Q15.4 112 16.4 113.8" fill="none" stroke="#a8724a" strokeWidth=".8" strokeLinecap="round" />

      {/* ---------- SALMAN's left arm: low around her waist, hand on her lower back */}
      <path d="M138 122 Q134 157 76 150" fill="none" stroke="url(#ih-sleeve)" strokeWidth="11" strokeLinecap="round" />
      <path d="M138 122 Q134 157 76 150" fill="none" stroke="#fffaf0" strokeWidth="4" strokeLinecap="round" opacity=".55" />
      <path d="M83 145 L81.6 155.6" stroke="#d4af6a" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="71.5" cy="149.6" rx="6.2" ry="5.4" fill="#cf966b" />
      <path d="M66.6 146.8 L70.6 147.6 M66.2 149.8 L70.4 150 M66.8 152.8 L70.6 152.4" stroke="#a8724a" strokeWidth=".8" strokeLinecap="round" />
    </svg>
  )
}
