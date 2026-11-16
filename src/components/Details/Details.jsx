import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Countdown from './Countdown.jsx'
import Petals from './Petals.jsx'
import {
  ArchFrame,
  Crescent,
  Divider,
  EightStar,
  IconCalendar,
  IconCalPlus,
  IconClock,
  IconHeart,
  IconNav,
  IconPhone,
  IconPin,
  IconWhatsApp,
  Monogram,
  Rings,
} from './Ornaments.jsx'
import { calendarUrl, directionsUrl, mapEmbedUrl, telUrl, waUrl } from './links.js'
import './Details.css'

/* ---------------- Motion helpers ---------------- */

function useVariants() {
  const reduce = useReducedMotion()
  const y = reduce ? 0 : 28
  return {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 } },
    },
    item: {
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.8, ease: [0.22, 1, 0.36, 1] } },
    },
  }
}

const VIEWPORT = { once: true, amount: 0.2 }

function Reveal({ as = 'div', className = '', children, ...rest }) {
  const v = useVariants()
  const M = motion[as] || motion.div
  return (
    <M className={className} variants={v.container} initial="hidden" whileInView="show" viewport={VIEWPORT} {...rest}>
      {children}
    </M>
  )
}

function Item({ as = 'div', className = '', children, ...rest }) {
  const v = useVariants()
  const M = motion[as] || motion.div
  return (
    <M className={className} variants={v.item} {...rest}>
      {children}
    </M>
  )
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <Reveal className="d-head">
      {eyebrow && (
        <Item as="p" className="d-eyebrow">
          {eyebrow}
        </Item>
      )}
      <Item as="h2" className="d-title">
        {title}
      </Item>
      <Item>
        <Divider />
      </Item>
      {sub && (
        <Item as="p" className="d-sub">
          {sub}
        </Item>
      )}
    </Reveal>
  )
}

const initial = (p) => (p?.name || p?.fullName || '').trim().charAt(0).toUpperCase()

/* ---------------- Sections ---------------- */

function Hero({ data, groom, bride }) {
  const n = data.nikkah || {}
  return (
    <section className="d-section d-dark d-hero" aria-label="Invitation">
      <div className="d-pattern" aria-hidden="true" />
      <Petals />
      <div className="d-hero__frame">
        <ArchFrame className="d-hero__arch" />
        <Reveal className="d-hero__inner">
          <Item className="d-hero__crown" aria-hidden="true">
            <Crescent size={30} />
          </Item>
          {data.bismillah && (
            <Item as="p" className="d-bismillah" lang="ar" dir="rtl">
              {data.bismillah}
            </Item>
          )}
          <Item as="p" className="d-hero__pre">
            Together with their families
          </Item>
          <Item as="p" className="d-hero__pre d-hero__pre--small">
            invite you to the Nikkah of
          </Item>

          <Item as="h1" className="d-names">
            <span className="d-names__one">{groom.name}</span>
            <span className="d-names__amp" aria-label="and">
              &amp;
            </span>
            <span className="d-names__two">{bride.name}</span>
          </Item>

          <Item>
            <Divider className="d-divider--light" />
          </Item>

          {(n.dateLabel || n.timeLabel) && (
            <Item className="d-hero__date">
              {n.dateLabel && <span>{n.dateLabel}</span>}
              {n.dateLabel && n.timeLabel && <EightStar size={12} className="d-hero__dot" />}
              {n.timeLabel && <span>{n.timeLabel}</span>}
            </Item>
          )}
          {n.venue && (
            <Item as="p" className="d-hero__venue">
              {n.venue}
            </Item>
          )}
          {data.tagline && (
            <Item as="p" className="d-hero__tagline">
              {data.tagline}
            </Item>
          )}
        </Reveal>
      </div>
      <ScrollCue />
    </section>
  )
}

// "Scroll" hint at the bottom of the first screen, so guests know there is more
// below. Disappears for good once they scroll.
function ScrollCue() {
  const [gone, setGone] = useState(() => typeof window !== 'undefined' && window.scrollY > 40)
  useEffect(() => {
    if (gone) return
    const onScroll = () => {
      if (window.scrollY > 40) setGone(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [gone])
  return (
    <div className={`d-scrollcue${gone ? ' is-gone' : ''}`} aria-hidden="true">
      <span>Scroll</span>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 5.5 8 10l4.5-4.5" />
      </svg>
    </div>
  )
}

function Quote({ quote }) {
  if (!quote?.text) return null
  return (
    <section className="d-section d-light d-quote" aria-label="Quran verse">
      <Reveal className="d-container d-container--narrow">
        <Item className="d-quote__card">
          <EightStar size={34} className="d-quote__star" />
          <span className="d-quote__mark" aria-hidden="true">
            “
          </span>
          <blockquote className="d-quote__text">{quote.text}</blockquote>
          {quote.source && <cite className="d-quote__source">— {quote.source}</cite>}
        </Item>
      </Reveal>
    </section>
  )
}

function PersonCard({ person, role, tone }) {
  return (
    <Item as="article" className={`d-person d-person--${tone}`}>
      <Monogram letter={initial(person)} photo={person.photo} alt={person.fullName || person.name} tone={tone} />
      <p className="d-person__role">{role}</p>
      <h3 className="d-person__name">{person.fullName || person.name}</h3>
      {person.parents && <p className="d-person__parents">{person.parents}</p>}
      {person.from && (
        <p className="d-person__from">
          <IconPin size={16} />
          <span>{person.from}</span>
        </p>
      )}
      {person.about && <p className="d-person__about">{person.about}</p>}
    </Item>
  )
}

function Couple({ groom, bride }) {
  return (
    <section className="d-section d-ivory d-couple" aria-label="The couple">
      <div className="d-container">
        <SectionHead eyebrow="Two souls, one bond" title="The Bride & Groom" />
        <Reveal className="d-couple__grid">
          <PersonCard person={groom} role="The Groom" tone="emerald" />
          <Item className="d-couple__join" aria-hidden="true">
            <span className="d-couple__line" />
            <span className="d-couple__rings">
              <Rings size={56} />
            </span>
            <span className="d-couple__line" />
          </Item>
          <PersonCard person={bride} role="The Bride" tone="rose" />
        </Reveal>
      </div>
    </section>
  )
}

function CountdownSection({ nikkah }) {
  if (!nikkah?.dateISO) return null
  return (
    <section className="d-section d-dark d-count" aria-label="Countdown">
      <div className="d-pattern" aria-hidden="true" />
      <div className="d-container d-container--narrow">
        <SectionHead eyebrow="Counting the moments" title="Until We Say Qubool" />
        <Reveal>
          <Item>
            <Countdown dateISO={nikkah.dateISO} />
          </Item>
          {nikkah.dateLabel && (
            <Item as="p" className="d-count__date">
              {nikkah.dateLabel}
            </Item>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Story({ story }) {
  if (!Array.isArray(story) || story.length === 0) return null
  return (
    <section className="d-section d-light d-story" aria-label="Our story">
      <div className="d-container d-container--narrow">
        <SectionHead eyebrow="A love written by Allah" title="Our Story" />
        <Reveal as="ol" className="d-timeline">
          {story.map((s, i) => (
            <Item as="li" key={`${s.year}-${i}`} className={`d-timeline__item ${i % 2 ? 'is-right' : 'is-left'}`}>
              <span className="d-timeline__node" aria-hidden="true">
                <IconHeart size={14} />
              </span>
              <div className="d-timeline__card">
                {s.year && <span className="d-timeline__year">{s.year}</span>}
                {s.title && <h3 className="d-timeline__title">{s.title}</h3>}
                {s.text && <p className="d-timeline__text">{s.text}</p>}
              </div>
            </Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function EventCard({ event, featured = false, tone = 'light' }) {
  const cal = event.dateISO
    ? calendarUrl({
        title: event.calendarTitle || event.title,
        dateISO: event.dateISO,
        venue: event.venue,
        address: event.address,
        details: event.calendarDetails,
      })
    : null
  const q = event.mapQuery || [event.venue, event.address].filter(Boolean).join(', ')

  return (
    <Item as="article" className={`d-event d-event--${tone} ${featured ? 'd-event--featured' : ''}`}>
      <div className="d-event__body">
        <EightStar size={30} className="d-event__star" />
        {event.title && <h3 className="d-event__title">{event.title}</h3>}
        <ul className="d-event__meta">
          {event.dateLabel && (
            <li>
              <IconCalendar />
              <span>{event.dateLabel}</span>
            </li>
          )}
          {event.timeLabel && (
            <li>
              <IconClock />
              <span>{event.timeLabel}</span>
            </li>
          )}
          {(event.venue || event.address) && (
            <li>
              <IconPin />
              <span>
                {event.venue && <strong>{event.venue}</strong>}
                {event.venue && event.address && <br />}
                {event.address}
              </span>
            </li>
          )}
        </ul>
      </div>

      {featured && q && (
        <div className="d-map">
          <iframe
            title={`Map — ${event.venue || event.title || 'venue'}`}
            src={mapEmbedUrl(q)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}

      <div className="d-actions">
        {(event.mapUrl || q) && (
          <a className="d-btn d-btn--gold" href={event.mapUrl || directionsUrl(q)} target="_blank" rel="noopener noreferrer">
            <IconNav />
            <span>Get Directions</span>
          </a>
        )}
        {cal && (
          <a className="d-btn d-btn--ghost" href={cal} target="_blank" rel="noopener noreferrer">
            <IconCalPlus />
            <span>Add to Calendar</span>
          </a>
        )}
      </div>
    </Item>
  )
}

function Venue({ nikkah, groom, bride }) {
  if (!nikkah) return null
  const ev = {
    ...nikkah,
    title: nikkah.title || 'Nikkah',
    calendarTitle: `${nikkah.title || 'Nikkah'} — ${groom.name || ''} & ${bride.name || ''}`.trim(),
    calendarDetails: `Join us for the ${nikkah.title || 'Nikkah'} of ${groom.fullName || groom.name || ''} & ${
      bride.fullName || bride.name || ''
    }.`,
  }
  return (
    <section className="d-section d-ivory d-venue" aria-label="Nikkah venue">
      <div className="d-container d-container--narrow">
        <SectionHead eyebrow="Save the date" title="The Nikkah" />
        <Reveal>
          <EventCard event={ev} featured />
        </Reveal>
      </div>
    </section>
  )
}

function Events({ events }) {
  if (!Array.isArray(events) || events.length === 0) return null
  return (
    <section className="d-section d-dark d-events" aria-label="Celebrations">
      <div className="d-pattern" aria-hidden="true" />
      <div className="d-container">
        <SectionHead eyebrow="Celebrate with us" title={events.length > 1 ? 'Celebrations' : 'Celebration'} />
        <Reveal className={`d-events__grid ${events.length === 1 ? 'is-single' : ''}`}>
          {events.map((e, i) => (
            <EventCard key={`${e.title}-${i}`} event={e} tone="dark" />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Contacts({ contacts, groom, bride }) {
  if (!Array.isArray(contacts) || contacts.length === 0) return null
  const msg = `Assalamu alaikum! Insha'Allah, I'll be attending the Nikkah of ${groom.name || ''} & ${bride.name || ''}.`
  return (
    <section className="d-section d-light d-contact" aria-label="RSVP and contact">
      <div className="d-container">
        <SectionHead eyebrow="Kindly RSVP" title="Get in Touch" sub="We would be honoured to hear from you." />
        <Reveal className={`d-contact__grid ${contacts.length === 1 ? 'is-single' : ''}`}>
          {contacts.map((c, i) => (
            <Item as="article" key={`${c.phone}-${i}`} className="d-contact__card">
              {c.label && <p className="d-contact__label">{c.label}</p>}
              {c.name && <h3 className="d-contact__name">{c.name}</h3>}
              {c.phone && (
                <div className="d-actions d-actions--row">
                  <a className="d-btn d-btn--emerald" href={telUrl(c.phone)}>
                    <IconPhone />
                    <span>Call</span>
                  </a>
                  <a
                    className="d-btn d-btn--whatsapp"
                    href={waUrl(c.phone, msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconWhatsApp />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Closing({ data, groom, bride }) {
  return (
    <section className="d-section d-dark d-closing" aria-label="Closing">
      <div className="d-pattern" aria-hidden="true" />
      <Reveal className="d-container d-container--narrow d-closing__inner">
        <Item className="d-closing__crown" aria-hidden="true">
          <Crescent size={36} />
        </Item>
        {data.closing && (
          <Item as="p" className="d-closing__text">
            {data.closing}
          </Item>
        )}
        <Item as="p" className="d-closing__dua">
          May Allah bless this union with love, mercy and barakah. Ameen.
        </Item>
        <Item as="p" className="d-closing__names">
          {groom.name} <span className="d-names__amp d-names__amp--sm">&amp;</span> {bride.name}
        </Item>
        {data.hashtag && (
          <Item as="p" className="d-hashtag">
            {data.hashtag}
          </Item>
        )}
        <Item>
          <Divider className="d-divider--light" />
        </Item>
        <Item as="footer" className="d-footer">
          <span>Insha&rsquo;Allah, see you there</span>
          <EightStar size={10} />
          <span>Jazakallah khair</span>
        </Item>
      </Reveal>
    </section>
  )
}

/* ---------------- Page ---------------- */

export default function Details({ data }) {
  const d = data || {}
  const groom = d.groom || {}
  const bride = d.bride || {}

  return (
    <main className="d-page">
      <Hero data={d} groom={groom} bride={bride} />
      <Quote quote={d.quote} />
      <Couple groom={groom} bride={bride} />
      <CountdownSection nikkah={d.nikkah} />
      <Story story={d.story} />
      <Venue nikkah={d.nikkah} groom={groom} bride={bride} />
      <Events events={d.events} />
      <Contacts contacts={d.contacts} groom={groom} bride={bride} />
      <Closing data={d} groom={groom} bride={bride} />
    </main>
  )
}
