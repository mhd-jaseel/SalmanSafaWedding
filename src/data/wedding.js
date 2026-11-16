// ============================================================
//  WEDDING DATA — edit ONLY this file to change all details.
// ============================================================

export const wedding = {
  groom: {
    name: 'Salman',
    fullName: 'Salmanul Faris VP',
    parents: 'S/o Sulaiman & Sahira',
    from: 'Valiyapeediakkal, Vengad Edayur Road',
  },
  bride: {
    name: 'Safa',
    fullName: 'Safa Nasri',
    parents: 'D/o Jaleel AP & Sujeera CP',
    from: 'Athikkaparambil',
  },

  // Shown on the hero / quote section
  tagline: 'Two hearts, one story — written by Allah.',
  quote: {
    text: 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.',
    source: 'Surah Ar-Rum 30:21',
  },
  bismillah: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',

  // Love-story timeline
  story: [
    { year: '2026', title: 'Nikkah', text: "Beginning forever, with Allah's blessings." },
  ],

  // Main event — ISO date/time with timezone (used for the countdown)
  nikkah: {
    title: 'Nikkah Ceremony',
    dateISO: '2026-12-12T11:00:00+05:30',
    dateLabel: 'Saturday, 12 December 2026',
    timeLabel: '11:00 AM',
    venue: 'Vengad Melmuri Juma Masjid',
    address: 'Vengad, Melmuri, Kerala',
    // Google Maps search query or "lat,lng"
    mapQuery: 'Vengad Melmuri Juma Masjid',
    mapUrl: 'https://maps.app.goo.gl/QGCJaVxkDZM2L6BK7?g_st=iw',
  },

  // Other events (optional — empty array hides the section)
  events: [],

  // Contact for RSVP / directions (shown after the location, with Call + WhatsApp buttons).
  // Keep the country code (+91) so the WhatsApp link works.
  contacts: [
    {
      label: "Groom's Family",
      name: 'Sulaiman',
      phone: '+91 80787 71179',
    },
  ],

  hashtag: '#SalmanWedsSafa',
  closing: 'Your presence and duas are the greatest gift to us.',

  // Background music. Put your MP3 at public/music/nikkah.mp3.
  // If the file is missing, a soft synthesized melody plays instead.
  music: '/music/nikkah.mp3',

  // Door-opening sound when the gate is tapped. To use a REAL recording, put
  // an MP3 at public/sfx/door-open.mp3 and set: doorSound: '/sfx/door-open.mp3'
  // (keep it short, ~1.5–2 s). Left empty, a realistic door sound is synthesized.
  doorSound: '',
}

export default wedding
