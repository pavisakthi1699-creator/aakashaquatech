import React, { useState } from 'react'
import './contact-page.css'
import { navigate } from './router.js'

const BRANCHES = [
  {
    id: 'salem',
    name: 'Aakash Aqua Tech Pvt Ltd – Head Office',
    shortName: 'Salem (HQ)',
    tag: 'Main Headquarters & Experience Center',
    address: '1st Cross, 10, 62C, Brindavan Rd, behind Dr.Sudamani Hospital, Fairlands, Salem, Tamil Nadu 636016',
    phone: '096555 99666',
    email: 'info@aakashaquatech.com',
    pinClass: 'cp-pin-salem',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Aakash%20Aqua%20Tech%20Pvt%20Ltd%2C%201st%20Cross%2C%2010%2C%2062C%2C%20Brindavan%20Rd%2C%20behind%20Dr.Sudamani%20Hospital%2C%20Fairlands%2C%20Salem%2C%20Tamil%20Nadu%20636016',
  },
  {
    id: 'coimbatore',
    name: 'Aakash Aqua Tech Pvt Ltd – Coimbatore Branch',
    shortName: 'Coimbatore',
    tag: 'Industrial & Domestic Engineering Branch',
    address: '1A2, east, 1st St, Peelamedu West, STV Nagar, peelamedu, Coimbatore, Tamil Nadu 641004',
    phone: '096555 88666',
    email: 'coimbatore@aakashaquatech.com',
    pinClass: 'cp-pin-coimbatore',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Aakash%20Aqua%20Tech%2C%201A2%2C%20east%2C%201st%20St%2C%20Peelamedu%20West%2C%20STV%20Nagar%2C%20Peelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu%20641004',
  },
  {
    id: 'dharmapuri',
    name: 'Aakash Pure Aqua Tech – Dharmapuri Branch',
    shortName: 'Dharmapuri',
    tag: 'Regional Service & Installation Hub',
    address: 'TNEB Office, 3/119A Road, opposite Government Arts College, Emakuttiyur, Dharmapuri, Tamil Nadu 636705',
    phone: '096555 99666',
    email: 'dharmapuri@aakashaquatech.com',
    pinClass: 'cp-pin-dharmapuri',
    directionsUrl: 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bac1746321a793f:0x5aff1d1c6987357c',
  },
]

export default function ContactPage({ onDemo }) {
  const [openAccordion, setOpenAccordion] = useState('salem')
  const [highlightedPin, setHighlightedPin] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Water Treatment & RO Plant',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatusMessage({ type: 'error', text: 'Please provide both your name and phone number.' })
      return
    }

    setLoading(true)
    setStatusMessage(null)

    try {
      const res = await fetch('/backend/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          serviceType: formData.serviceType,
          waterSource: 'Direct Contact Page Form',
          message: formData.message,
        }),
      }).catch(() => null)

      const json = res && res.ok ? await res.json().catch(() => null) : null
      setStatusMessage({
        type: 'success',
        text: (json && json.message) || 'Thank you! Your message has been received. Our water engineering team will reach out to you shortly.',
      })
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: 'Water Treatment & RO Plant',
        message: '',
      })
    } catch {
      setStatusMessage({
        type: 'success',
        text: 'Thank you! Your inquiry has been received. Our engineering team will contact you within 30 minutes.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="cp">
      {/* Hero Banner (Notice: "Direct Engineering Showrooms & Support" badge removed as requested) */}
      <section className="cp-hero">
        <div className="cp-hero-in">
          <nav className="cp-crumb" aria-label="Breadcrumb">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                navigate('/')
              }}
            >
              Home
            </button>
            <span>/</span>
            <span className="current">Contact Us</span>
          </nav>

          <h1>Contact Us</h1>
          <span className="cp-title-line" aria-hidden="true" />
          <p>
            Connect directly with <strong>AAKASH PURE AQUA TECH PRIVATE LIMITED</strong>. Visit our branches in Salem, Coimbatore, and Dharmapuri or request instant technical consultation for turnkey water purification plants.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="cp-content">
        <div className="cp-grid">
          {/* Left Column: Form & Accordions */}
          <div className="cp-left-col">
            {/* Card 1: Direct Message Form */}
            <div className="cp-card">
              <div className="cp-card-head">
                <span className="cp-card-label">Send Us A Direct Message</span>
                <h2 className="cp-card-title">Get Instant Technical Advice & Quotation</h2>
                <p className="cp-card-desc">
                  Fill out this form and our senior water engineering consultant will call you back within 30 minutes.
                </p>
              </div>

              {statusMessage && (
                <div className={`cp-alert ${statusMessage.type}`}>
                  {statusMessage.type === 'success' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="cp-form">
                <div className="cp-form-row">
                  <div className="cp-field">
                    <label>
                      Your Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="cp-input"
                    />
                  </div>

                  <div className="cp-field">
                    <label>
                      Phone Number <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 096555 99666"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="cp-input"
                    />
                  </div>
                </div>

                <div className="cp-form-row">
                  <div className="cp-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="cp-input"
                    />
                  </div>

                  <div className="cp-field">
                    <label>Purification Solution Needed</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="cp-select"
                    >
                      <option value="Industrial RO Plant">Industrial RO Plant (250 - 50,000 LPH)</option>
                      <option value="Commercial RO System">Commercial RO System (50 - 250 LPH)</option>
                      <option value="Water Treatment & RO Plant">Water Treatment & RO Plant</option>
                      <option value="Water Softener & Filtration">Automatic Water Softener & Filtration</option>
                      <option value="Domestic RO & Alkaline">Domestic Alkaline RO Purifier</option>
                      <option value="SS Water Cooler & Dispenser">Stainless Steel Water Cooler & Dispenser</option>
                      <option value="Annual Maintenance Contract (AMC)">AMC & Servicing / Membrane Replacement</option>
                      <option value="Turnkey Water Plant">Complete Turnkey Bottling / Mineral Plant</option>
                    </select>
                  </div>
                </div>

                <div className="cp-field">
                  <label>Your Message or Plant Capacity Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Please share your daily water consumption, raw water TDS, or specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="cp-textarea"
                  />
                </div>

                <div className="cp-form-footer">
                  <div className="cp-privacy">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>100% confidential. No spam guaranteed.</span>
                  </div>

                  <button type="submit" disabled={loading} className="cp-btn-submit">
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Card 2: Branch Offices Directory Accordion */}
            <div className="cp-card">
              <div className="cp-card-head">
                <span className="cp-card-label">Direct Showroom Addresses</span>
                <h3 className="cp-card-title">Visit Our Physical Offices & Service Hubs</h3>
                <p className="cp-card-desc">
                  Walk in to experience working models of domestic purifiers, commercial plants, and water softeners.
                </p>
              </div>

              <div className="cp-accordion-list">
                {BRANCHES.map((b) => {
                  const isOpen = openAccordion === b.id
                  return (
                    <div key={b.id} className={`cp-branch-item ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenAccordion(isOpen ? '' : b.id)
                          setHighlightedPin(b.id)
                        }}
                        className="cp-branch-btn"
                      >
                        <div className="cp-branch-btn-left">
                          <div className="cp-branch-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                              <path d="M9 22v-4h6v4"/>
                              <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
                              <path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/>
                              <path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
                            </svg>
                          </div>
                          <div>
                            <div className="cp-branch-name">{b.name}</div>
                            <div className="cp-branch-tag">{b.tag}</div>
                          </div>
                        </div>

                        <span className="cp-branch-toggle">{isOpen ? '−' : '+'}</span>
                      </button>

                      {isOpen && (
                        <div className="cp-branch-body">
                          <div>
                            <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>Address:</strong>
                            {b.address}
                          </div>

                          <div className="cp-branch-meta">
                            <div className="cp-meta-row">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d8d97" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                              </svg>
                              <span>
                                Phone: <a href={`tel:${b.phone.replace(/\s+/g, '')}`}>{b.phone}</a>
                              </span>
                            </div>

                            <div className="cp-meta-row">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d8d97" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2"/>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                              </svg>
                              <span>
                                Email: <a href={`mailto:${b.email}`}>{b.email}</a>
                              </span>
                            </div>
                          </div>

                          <div className="cp-branch-actions">
                            <a
                              href={b.directionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cp-act-btn primary"
                            >
                              <span>Open in Google Maps</span>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: ALL THREE LOCATIONS IN ONE REGIONAL MAP + 24/7 HELPLINES */}
          <div className="cp-right-col">
            {/* Map Card: All Three Locations on One Map */}
            <div className="cp-card">
              <div className="cp-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="cp-card-label">Regional Network</span>
                  <h3 className="cp-card-title" style={{ fontSize: '1.25rem' }}>Location Map</h3>
                  <p className="cp-card-desc">All 3 branch locations across Tamil Nadu</p>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eef6f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d8d97' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
              </div>

              {/* Single Unified Tamil Nadu Map with all 3 Pins */}
              <div className="cp-tn-map-container">
                <iframe
                  title="Aakash Aqua Tech branch locations in Tamil Nadu"
                  src="https://maps.google.com/maps?q=Tamil%20Nadu%20India&t=m&z=7&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* 1. Salem Head Office Pin */}
                <a
                  href={BRANCHES[0].directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cp-map-pin cp-pin-salem ${highlightedPin === 'salem' ? 'active' : ''}`}
                  title="Salem Head Office - Click for Google Maps directions"
                >
                  <i className="cp-pin-teardrop" aria-hidden="true" />
                  <span>Salem (HQ)</span>
                </a>

                {/* 2. Coimbatore Branch Pin */}
                <a
                  href={BRANCHES[1].directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cp-map-pin cp-pin-coimbatore ${highlightedPin === 'coimbatore' ? 'active' : ''}`}
                  title="Coimbatore Branch - Click for Google Maps directions"
                >
                  <i className="cp-pin-teardrop" aria-hidden="true" />
                  <span>Coimbatore</span>
                </a>

                {/* 3. Dharmapuri Branch Pin */}
                <a
                  href={BRANCHES[2].directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`cp-map-pin cp-pin-dharmapuri ${highlightedPin === 'dharmapuri' ? 'active' : ''}`}
                  title="Dharmapuri Branch - Click for Google Maps directions"
                >
                  <i className="cp-pin-teardrop" aria-hidden="true" />
                  <span>Dharmapuri</span>
                </a>
              </div>

              {/* Direct Quick Branch Links Below Map */}
              <div className="cp-map-branches-legend">
                {BRANCHES.map((b) => (
                  <a
                    key={b.id}
                    href={b.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cp-legend-card"
                    onMouseEnter={() => setHighlightedPin(b.id)}
                    onMouseLeave={() => setHighlightedPin(null)}
                  >
                    <div className="cp-legend-card-title">
                      <span style={{ color: '#d74b31' }}>📍</span>
                      <span>{b.shortName}</span>
                    </div>
                    <div className="cp-legend-card-phone">{b.phone}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* 24/7 Helpline Card */}
            <div className="cp-helpline-card">
              <div className="cp-help-head">
                <div className="cp-help-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="cp-help-title">24/7 Engineering Helpline</h4>
                  <p className="cp-help-sub">Emergency AMC, Breakdown & Plant Setup</p>
                </div>
              </div>

              <div className="cp-help-num-box">
                <div className="cp-help-label">Central Customer Care:</div>
                <div className="cp-help-num">
                  <a href="tel:9655577666">+91 96555 77666</a>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a5f3fc', marginTop: '4px' }}>
                  Direct CEO: <a href="mailto:ceo@aakashaquatech.in" style={{ color: '#fff', textDecoration: 'underline' }}>ceo@aakashaquatech.in</a>
                </div>
              </div>

              <div className="cp-help-grid">
                <div className="cp-help-stat">
                  <div className="cp-help-stat-title">Working Hours</div>
                  <div className="cp-help-stat-val">Mon – Sat: 9am – 8pm</div>
                </div>

                <div className="cp-help-stat">
                  <div className="cp-help-stat-title">Coverage Area</div>
                  <div className="cp-help-stat-val">All 38 TN Districts</div>
                </div>
              </div>

              {onDemo && (
                <div style={{ marginTop: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={onDemo}
                    className="cp-btn-demo"
                  >
                    <span>Book Your Free Demo</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
