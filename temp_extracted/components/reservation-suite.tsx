'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, MapPin } from 'lucide-react'

const locations = [
  { name: 'Downtown Flagship', address: '12, The Imperial Arcade, Connaught Place', phone: '+91 11 4100 2800' },
  { name: 'The Waterfront Haveli', address: '5, Riverfront Promenade, Khan Market', phone: '+91 11 4100 2801' },
  { name: 'Garden Conservatory', address: '18, Lodhi Gardens Estate, Lodhi Road', phone: '+91 11 4100 2802' },
]
const services = ['Lunch', 'Sunset', 'Darbar Dinner']
const times: Record<string, string[]> = { Lunch: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'], Sunset: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'], 'Darbar Dinner': ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'] }
const today = new Date().toISOString().slice(0, 10)
const steps = ['Location', 'Date & time', 'Your party', 'Preferences', 'Review']

export function ReservationSuite() {
  const [step, setStep] = useState(0)
  const [location, setLocation] = useState(0)
  const [date, setDate] = useState(today)
  const [service, setService] = useState('Darbar Dinner')
  const [time, setTime] = useState('7:30 PM')
  const [guests, setGuests] = useState('02 Patrons')
  const [satvik, setSatvik] = useState(false)
  const [jain, setJain] = useState(false)
  const [occasion, setOccasion] = useState(false)
  const [requested, setRequested] = useState(false)

  function next() {
    if (step < 4) setStep(step + 1)
    else setRequested(true)
  }
  return <main className="booking-page">
    <header className="booking-header"><Link className="wordmark" href="/"><span className="wordmark-symbol">र</span><span>RASORAA<small>THE VEGETARIAN IMPERIAL COURT</small></span></Link><Link className="booking-return" href="/"><ArrowLeft size={14}/> RETURN TO THE COURT</Link></header>
    <section className="booking-layout">
      <aside className="booking-aside"><span className="eyebrow"><span className="eyebrow-line"/> YOUR EVENING, ORCHESTRATED</span><h1>A table<br/>awaits <em>you.</em></h1><p>Some evenings deserve to be remembered before they even begin.</p><div className="booking-aside-rule"/><span className="aside-note">THE RASORAA CONCIERGE<br/>NEW DELHI · 28.6139° N</span><div className="aside-seal"><span>र</span><small>AT YOUR<br/>SERVICE</small></div></aside>
      <section className="booking-panel" aria-labelledby="booking-title">
        {requested ? <motion.div className="booking-confirmed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><span className="success-mark"><Check/></span><span className="eyebrow"><span className="eyebrow-line"/> THE CONCIERGE HAS YOUR REQUEST</span><h2 id="booking-title">Your evening<br/><em>begins here.</em></h2><p>We have received your request for {guests.toLowerCase()} at {locations[location].name} on {date} at {time}. A member of our concierge will be in touch shortly to personally complete your reservation.</p><a className="booking-next" href="/">Return to the court <ArrowRight size={16}/></a></motion.div> : <>
          <div className="booking-progress"><span>YOUR RESERVATION</span><span>0{step + 1} <i/> 05</span></div>
          <div className="step-track" aria-label={`Step ${step + 1} of 5`}>{steps.map((name, index) => <span className={index <= step ? 'step-dot current' : 'step-dot'} key={name}><i/>{name}</span>)}</div>
          <AnimatePresence mode="wait"><motion.div className="booking-step" key={step} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: .2 }}>
            {step === 0 && <><span className="step-kicker">01 — CHOOSE YOUR SANCTUARY</span><h2 id="booking-title">Where shall we<br/><em>welcome you?</em></h2><div className="choice-list">{locations.map((place, index) => <button key={place.name} className={location === index ? 'location-choice chosen' : 'location-choice'} onClick={() => setLocation(index)}><span className="choice-indicator">{location === index && <i/>}</span><span><b>{place.name}</b><small>{place.address}</small></span><MapPin size={15}/></button>)}</div></>}
            {step === 1 && <><span className="step-kicker">02 — THE DATE & SERVICE</span><h2 id="booking-title">Choose your<br/><em>hour of arrival.</em></h2><label className="booking-field"><span>THE DATE</span><input type="date" value={date} min={today} onChange={event => setDate(event.target.value)}/><Clock3 size={15}/></label><div className="session-options" role="group" aria-label="Select service">{services.map(item => <button key={item} className={service === item ? 'session-option selected' : 'session-option'} onClick={() => { setService(item); setTime(times[item][0]) }}>{item}</button>)}</div><span className="step-kicker time-kicker">AVAILABLE ARRIVAL TIMES</span><div className="time-options" role="group" aria-label="Available arrival times">{times[service].map(item => <button key={item} className={time === item ? 'time-option selected' : 'time-option'} onClick={() => setTime(item)}>{item}</button>)}</div></>}
            {step === 2 && <><span className="step-kicker">03 — YOUR PARTY</span><h2 id="booking-title">How many<br/><em>at your table?</em></h2><div className="guest-options">{['01 Patron', '02 Patrons', '03 Patrons', '04 Patrons', '05 Patrons', '06 Patrons'].map(item => <button key={item} className={guests === item ? 'guest-option selected' : 'guest-option'} onClick={() => setGuests(item)}>{item}</button>)}</div><p className="booking-hint">For private parties of seven or more, please call our concierge directly.</p><a className="concierge-phone" href={`tel:${locations[location].phone.replaceAll(' ', '')}`}>{locations[location].phone} <ArrowRight size={14}/></a></>}
            {step === 3 && <><span className="step-kicker">04 — SATVIK & JAIN PREFERENCES</span><h2 id="booking-title">A meal made<br/><em>for your way.</em></h2><p className="preference-intro">Every preference is received with care. Our kitchen will personally review your selections.</p><div className="booking-preferences"><label><input type="checkbox" checked={satvik} onChange={event => setSatvik(event.target.checked)}/><span><b>Satvik preparation</b><small>Gentle, considered ingredients in their purest form.</small></span></label><label><input type="checkbox" checked={jain} onChange={event => setJain(event.target.checked)}/><span><b>Jain, without root vegetables</b><small>Prepared in accordance with Jain dietary practice.</small></span></label><label><input type="checkbox" checked={occasion} onChange={event => setOccasion(event.target.checked)}/><span><b>A special occasion</b><small>Let our concierge know there is something to celebrate.</small></span></label></div></>}
            {step === 4 && <><span className="step-kicker">05 — REVIEW YOUR REQUEST</span><h2 id="booking-title">The details of<br/><em>your evening.</em></h2><div className="review-list"><div><span>YOUR SANCTUARY</span><b>{locations[location].name}</b><small>{locations[location].address}</small></div><div><span>DATE & SERVICE</span><b>{date} · {service}</b><small>Arrival at {time}</small></div><div><span>YOUR PARTY</span><b>{guests}</b></div><div><span>PREPARATION</span><b>{[satvik && 'Satvik', jain && 'Jain', occasion && 'Celebration'].filter(Boolean).join(' · ') || 'No special preferences'}</b></div></div><p className="booking-hint">This is a reservation request. A concierge will contact you to confirm availability.</p></>}
          </motion.div></AnimatePresence>
          <div className="booking-actions">{step > 0 && <button className="booking-back" onClick={() => setStep(step - 1)}><ArrowLeft size={15}/> PREVIOUS</button>}<button className="booking-next" onClick={next}>{step === 4 ? 'Request this table' : 'Continue'} <ArrowRight size={16}/></button></div>
          <p className="booking-footnote">A member of the Rasoraa concierge will personally confirm your request.</p>
        </>}
      </section>
    </section>
    <footer className="booking-footer"><span>© 2026 RASORAA · A HOUSE OF PURE VEGETARIAN CRAFT</span><span>+91 11 4100 2800</span></footer>
  </main>
}
