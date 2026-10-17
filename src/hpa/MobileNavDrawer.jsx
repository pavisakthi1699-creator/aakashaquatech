import React, { useState, useEffect } from 'react'
import { navigate } from './router.js'
import { WA, PHONE } from './data.js'

export function MobileNavDrawer({
  isOpen,
  onClose,
  onOpenDemo,
  onOpenSearch,
  onOpenLogin,
}) {
  const [openSection, setOpenSection] = useState('domestic')

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleLink = (path) => {
    onClose()
    navigate(path)
  }

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? '' : id))
  }

  const domesticItems = [
    { title: 'RO Water Purifiers', path: '/shop/domestic/ro', badge: 'Best Seller', img: '/images/mega-menu/ro-water-purifiers.png' },
    { title: 'UV Water Purifiers', path: '/shop/domestic/uv', badge: 'Active UV', img: '/images/mega-menu/uv-water-purifiers.png' },
    { title: 'Alkaline Water Purifiers', path: '/shop/domestic/alkaline', badge: 'pH 8.5+', img: '/images/mega-menu/alkaline.png' },
    { title: 'Gravity Non-Electric', path: '/shop/domestic/gravity', badge: 'Eco', img: '/images/mega-menu/gravity-water-purifiers.png' },
    { title: 'Under Sink RO Systems', path: '/shop/domestic/undersink', badge: 'Space Saving', img: '/images/mega-menu/under-sink.png' },
  ]

  const wtpItems = [
    { title: 'Water Softener', path: '/shop/wtp/softner', badge: 'Zero Scale', img: '/images/mega-menu/softner.png' },
    { title: 'Iron Remover Filter', path: '/shop/wtp/iron', badge: 'Clear Water', img: '/images/mega-menu/iron-remover.png' },
    { title: 'Sand Media Filter', path: '/shop/wtp/sand', badge: 'Multi-grade', img: '/images/mega-menu/sand-filter.png' },
    { title: 'FRP Pressure Vessels', path: '/shop/wtp/vessel', badge: 'Pentair', img: '/images/mega-menu/vessel.png' },
    { title: 'Stainless Steel Tanks', path: '/shop/wtp/sstank', badge: 'SS 304/316', img: '/images/mega-menu/ss-tank.png' },
    { title: 'DM Plant Systems', path: '/shop/wtp/dm', badge: 'High Purity', img: '/images/mega-menu/dm-plant.png' },
  ]

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={`mobile-drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Left-to-Right Slide & Fade Panel */}
      <aside
        className={`mobile-nav-drawer-panel ${isOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="drawer-top-header">
          <a
            href="/"
            className="drawer-brand"
            onClick={(e) => {
              e.preventDefault()
              handleLink('/')
            }}
          >
            <img
              src="/images/aakash-official-logo.png"
              alt="Aakash Aqua Tech"
              className="drawer-logo-img"
              onError={(e) => {
                e.target.src = 'https://aakashaquatech.in/wp-content/uploads/2026/07/IMG_5770-1003x1024.png'
              }}
            />
            <div className="drawer-brand-text">
              <span className="drawer-brand-title">Aakash Aqua Tech</span>
              <span className="drawer-brand-sub">Pure Water Solutions • Est. 1991</span>
            </div>
          </a>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search Quick Tap */}
        {onOpenSearch && (
          <div className="drawer-search-wrap">
            <button
              type="button"
              className="drawer-search-btn"
              onClick={() => {
                onClose()
                onOpenSearch()
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search RO models, filters, spares...</span>
            </button>
          </div>
        )}

        {/* Drawer Scrollable Content */}
        <div className="drawer-scroll-body">
          {/* Main Quick Links */}
          <div className="drawer-nav-group">
            <button
              type="button"
              className="drawer-main-link"
              onClick={() => handleLink('/')}
            >
              <span className="drawer-link-icon">🏠</span>
              <span className="drawer-link-text">Home</span>
            </button>
          </div>

          {/* Section: Domestic RO (Accordion) */}
          <div className="drawer-accordion-block">
            <button
              type="button"
              className={`drawer-accordion-header ${openSection === 'domestic' ? 'active' : ''}`}
              onClick={() => toggleSection('domestic')}
            >
              <div className="drawer-acc-title-wrap">
                <span className="drawer-link-icon">💧</span>
                <span className="drawer-acc-title">Domestic RO Purifiers</span>
              </div>
              <span className="drawer-acc-arrow">{openSection === 'domestic' ? '▲' : '▼'}</span>
            </button>

            {openSection === 'domestic' && (
              <div className="drawer-accordion-content">
                <button
                  type="button"
                  className="drawer-sub-all"
                  onClick={() => handleLink('/shop/domestic')}
                >
                  <span>Explore All Domestic RO Models →</span>
                </button>
                {domesticItems.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    className="drawer-sub-item"
                    onClick={() => handleLink(item.path)}
                  >
                    <img src={item.img} alt="" className="drawer-sub-thumb" />
                    <div className="drawer-sub-info">
                      <span className="drawer-sub-title">{item.title}</span>
                      <span className="drawer-sub-badge">{item.badge}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct Link: SS Water Dispenser */}
          <div className="drawer-nav-group">
            <button
              type="button"
              className="drawer-main-link"
              onClick={() => handleLink('/shop/dispenser')}
            >
              <span className="drawer-link-icon">🚰</span>
              <span className="drawer-link-text">SS Water Dispenser</span>
              <span className="drawer-pill-badge">BIS Certified</span>
            </button>
          </div>

          {/* Direct Link: Commercial RO System */}
          <div className="drawer-nav-group">
            <button
              type="button"
              className="drawer-main-link"
              onClick={() => handleLink('/shop/industrial')}
            >
              <span className="drawer-link-icon">🏭</span>
              <span className="drawer-link-text">Commercial RO Plant</span>
              <span className="drawer-pill-badge">100–3000 LPH</span>
            </button>
          </div>

          {/* Section: Water Treatment Plant (WTP) (Accordion) */}
          <div className="drawer-accordion-block">
            <button
              type="button"
              className={`drawer-accordion-header ${openSection === 'wtp' ? 'active' : ''}`}
              onClick={() => toggleSection('wtp')}
            >
              <div className="drawer-acc-title-wrap">
                <span className="drawer-link-icon">⚙️</span>
                <span className="drawer-acc-title">Water Treatment (WTP)</span>
              </div>
              <span className="drawer-acc-arrow">{openSection === 'wtp' ? '▲' : '▼'}</span>
            </button>

            {openSection === 'wtp' && (
              <div className="drawer-accordion-content">
                <button
                  type="button"
                  className="drawer-sub-all"
                  onClick={() => handleLink('/shop/wtp')}
                >
                  <span>Explore All WTP Equipment →</span>
                </button>
                {wtpItems.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    className="drawer-sub-item"
                    onClick={() => handleLink(item.path)}
                  >
                    <img src={item.img} alt="" className="drawer-sub-thumb" />
                    <div className="drawer-sub-info">
                      <span className="drawer-sub-title">{item.title}</span>
                      <span className="drawer-sub-badge">{item.badge}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct Link: Spares & Filters */}
          <div className="drawer-nav-group">
            <button
              type="button"
              className="drawer-main-link"
              onClick={() => handleLink('/shop/spares')}
            >
              <span className="drawer-link-icon">🔧</span>
              <span className="drawer-link-text">Spares &amp; Filter Media</span>
            </button>
          </div>

          {/* Direct Link: Heat Pump */}
          <div className="drawer-nav-group">
            <button
              type="button"
              className="drawer-main-link"
              onClick={() => handleLink('/shop/heatpump')}
            >
              <span className="drawer-link-icon">♨️</span>
              <span className="drawer-link-text">Heat Pump Water Heater</span>
              <span className="drawer-pill-badge">Energy Saver</span>
            </button>
          </div>

          {/* Divider */}
          <div className="drawer-divider" />

          {/* Company Links */}
          <div className="drawer-nav-group">
            <button
              type="button"
              className="drawer-main-link"
              onClick={() => handleLink('/about')}
            >
              <span className="drawer-link-icon">ℹ️</span>
              <span className="drawer-link-text">About Us</span>
            </button>
            <button
              type="button"
              className="drawer-main-link"
              onClick={() => handleLink('/contact')}
            >
              <span className="drawer-link-icon">📍</span>
              <span className="drawer-link-text">Contact &amp; Showrooms</span>
            </button>
          </div>

          {/* Book Free Demo Card */}
          <div className="drawer-promo-card">
            <div className="drawer-promo-badge">Free Service</div>
            <h4 className="drawer-promo-title">Need Water TDS Testing?</h4>
            <p className="drawer-promo-desc">
              Book a 100% free home demo and water quality test by our certified water engineer.
            </p>
            <button
              type="button"
              className="drawer-promo-btn"
              onClick={() => {
                onClose()
                if (onOpenDemo) onOpenDemo()
              }}
            >
              Book Free Demo Now
            </button>
          </div>
        </div>

        {/* Drawer Bottom Action Buttons */}
        <div className="drawer-bottom-actions">
          <a href={`tel:${PHONE.replace(/\s+/g, '')}`} className="drawer-action-call">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>Call Support</span>
          </a>
          <a
            href={`${WA}?text=${encodeURIComponent('Hello Aakash Aqua Tech, I would like to inquire about water purifiers and services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-action-wa"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </aside>
    </>
  )
}

export default MobileNavDrawer
