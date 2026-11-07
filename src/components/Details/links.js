// Link helpers for maps, calendar, phone and WhatsApp.

export const mapEmbedUrl = (q) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q || '')}&output=embed`

export const directionsUrl = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q || '')}`

const toCalStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export function calendarUrl({ title, dateISO, venue, address, details, hours = 2 }) {
  const start = new Date(dateISO)
  if (Number.isNaN(start.getTime())) return null
  const end = new Date(start.getTime() + hours * 60 * 60 * 1000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title || 'Nikkah',
    dates: `${toCalStamp(start)}/${toCalStamp(end)}`,
    details: details || '',
    location: [venue, address].filter(Boolean).join(', '),
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export const digits = (phone) => String(phone || '').replace(/\D/g, '')
export const telUrl = (phone) => `tel:${String(phone || '').replace(/[^\d+]/g, '')}`
export const waUrl = (phone, text) =>
  `https://wa.me/${digits(phone)}${text ? `?text=${encodeURIComponent(text)}` : ''}`
