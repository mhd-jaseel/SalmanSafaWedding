// ============================================================
//  WEDDING DATA — edit ONLY this file to change all details.
//  (Placeholder data for now — replace with the real details.)
// ============================================================

export const wedding = {
  groom: {
    name: 'Salman',
    fullName: 'Muhammed Salman',
    parents: 'S/o Abdul Rahman & Fathima',
    from: 'Malappuram, Kerala',
    about: 'Engineer by profession, dreamer by heart.',
  },
  bride: {
    name: 'Safa',
    fullName: 'Safa Nasrin',
    parents: 'D/o Muhammed Ali & Sajitha',
    from: 'Kozhikode, Kerala',
    about: 'Designer with a smile that lights up every room.',
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
    { year: '2019', title: 'First Hello', text: 'A chance meeting that felt like destiny.' },
    { year: '2021', title: 'Best Friends', text: 'Endless talks, shared dreams and laughter.' },
    { year: '2025', title: 'The Promise', text: 'Both families said Alhamdulillah.' },
    { year: '2026', title: 'Nikkah', text: 'Beginning forever, with Allah’s blessings.' },
  ],

  // Main event — ISO date/time with timezone (used for the countdown)
  nikkah: {
    title: 'Nikkah Ceremony',
    dateISO: '2026-12-20T11:00:00+05:30',
    dateLabel: 'Sunday, 20 December 2026',
    timeLabel: '11:00 AM',
    venue: 'Juma Masjid',
    address: 'Main Road, Malappuram, Kerala 676505',
    // Google Maps search query or "lat,lng"
    mapQuery: 'Malappuram Juma Masjid, Kerala',
  },

  // Other events (optional — empty array hides the section)
  events: [
    {
      title: 'Walima / Reception',
      dateLabel: 'Sunday, 20 December 2026',
      timeLabel: '12:30 PM onwards',
      venue: 'Grand Convention Centre',
      address: 'Kottakkal Road, Malappuram, Kerala',
      mapQuery: 'Convention Centre Malappuram',
    },
  ],

  // Contact for RSVP / directions
  contacts: [
    { label: 'Groom’s Family', name: 'Abdul Rahman', phone: '+919876543210' },
  ],

  hashtag: '#SalmanWedsSafa',
  closing: 'Your presence and duas are the greatest gift to us.',

  // Background music. Put your MP3 at public/music/nikkah.mp3.
  // If the file is missing, a soft synthesized melody plays instead.
  music: '/music/nikkah.mp3',
}

export default wedding
